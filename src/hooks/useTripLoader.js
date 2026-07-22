import { useState, useEffect } from 'react';
import { validateTripConfig, validateDayData } from '../utils/tripValidator';

export function useTripLoader(tripId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    async function loadTripPipeline() {
      setLoading(true);
      setError(null);
      try {
        // 1. 固定基礎路徑，明確指定 .json 副檔名讓 Vite 能做精準靜態分析
        const configModule = await import(`../data/trips/${tripId}/trip.json`);
        const config = configModule.default || configModule;
        validateTripConfig(config);
        
        // 2. 並行載入天數資料流
        const dayPromises = config.dayFiles.map(async (fileName) => {
          // 去除字串可能帶有的副檔名，統一在靜態模板中補上 .json 確保 Vite 分析順暢
          const cleanFileName = fileName.replace('.json', '');
          const dayModule = await import(`../data/trips/${tripId}/days/${cleanFileName}.json`);
          const dayData = dayModule.default || dayModule;
          validateDayData(dayData, fileName);

          // 3. 外部 Markdown 資產攔截與純文字讀取
          const processedBlocks = await Promise.all(
            dayData.blocks.map(async (block) => {
              if (block.type === 'markdown' && block.file) {
                try {
                  // 精準擷取檔名，去除開頭的 ./ 與結尾的 .md
                  const cleanPath = block.file.replace(/^\.\//, '').replace('.md', '');
                  
                  // 使用 Vite 認可的 /* @vite-ignore */ 或是全靜態分析。
                  // 這裡我們直接改用標準的 fetch，最適合處理非結構化的動態純文字資產，完全避開編譯器干預
                  const mdRes = await fetch(`/src/data/trips/${tripId}/${cleanPath}.md`);
                  if (!mdRes.ok) throw new Error();
                  const mdText = await mdRes.text();
                  
                  return { ...block, text: mdText };
                } catch (mdErr) {
                  return { ...block, text: `⚠️ 讀取外部 Markdown 失敗: 找不到檔案 [${block.file}]` };
                }
              }
              return block;
            })
          );

          return { ...dayData, blocks: processedBlocks };
        });
        
        const daysData = await Promise.all(dayPromises);
        setTripData({ ...config, days: daysData });
      } catch (err) {
        setError(`資料載入失敗，請確認 [src/data/trips/${tripId}/] 目錄下檔案是否完整。內部訊息: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadTripPipeline();
  }, [tripId]);

  return { tripData, loading, error };
}