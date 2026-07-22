export function validateTripConfig(config) {
  if (!config) throw new Error("行程設定檔內容為空");
  if (!config.id || !config.title || !config.dayFiles || !config.overview || !config.summary) {
    throw new Error("行程設定檔格式損毀：缺少必要根節點欄位");
  }
  if (config.schemaVersion === undefined || config.schemaVersion < 2) {
    throw new Error("偵測到舊版資料。目前系統核心運作於 Version 2 扁平化規格。");
  }
  return true;
}

export function validateDayData(dayData, fileName) {
  if (!dayData || !dayData.blocks) throw new Error(`檔案 ${fileName} 格式錯誤：缺少 blocks 陣列`);
  return true;
}