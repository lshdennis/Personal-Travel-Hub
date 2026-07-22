import React, { useState, useEffect } from 'react';
import { useTripLoader } from './hooks/useTripLoader';
import TripLayout from './components/layout/TripLayout';

export default function App() {
  // 🎯 核心升級：一進網頁，立刻偵測網址有沒有帶 `?trip=xxx` 的參數
  // 例如：https://lshdennis.github.io/Personal-Travel-Hub/?trip=TH-26
  const getInitialTripId = () => {
    const params = new URLSearchParams(window.location.search);
    const urlTripId = params.get('trip');
    return urlTripId || 'japan-2026'; // 如果網址沒帶參數，預設顯示日本
  };

  const [activeTripId, setActiveTripId] = useState(getInitialTripId);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const { tripData, loading, error } = useTripLoader(activeTripId);

  // 🎯 監聽 activeTripId 的變化，當你在大廳換旅程時，自動同步更新瀏覽器網址列
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (activeTripId === 'japan-2026' && !params.get('trip')) {
      // 保持根網址乾淨
      return;
    }
    
    // 動態將網址更新為 `?trip=你的ID`，但不會觸發網頁重新整理（優雅的 SPA 體驗）
    const newUrl = `${window.location.pathname}?trip=${activeTripId}${window.location.hash}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }, [activeTripId]);

  if (loading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#64748b', backgroundColor: '#f8fafc', fontWeight: 500 }}>環境初始化中...</div>;
  
  if (error) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '16px' }}>
        <div style={{ maxWidth: '28rem', width: '100%', backgroundColor: '#ffffff', border: '1px solid #fee2e2', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '30px' }}>⚠️</span>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginTop: '8px' }}>旅遊資料庫載入中斷</h3>
          <p style={{ fontSize: '14px', color: '#dc2626', backgroundColor: '#fef2f2', padding: '12px', borderRadius: '8px', border: '1px solid #fee2e2', fontFamily: 'monospace', marginTop: '12px', textAlign: 'left', overflowWrap: 'break-word' }}>{error}</p>
          <button 
            onClick={() => setActiveTripId('japan-2026')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-700"
          >
            🏠 返回預設日本行程
          </button>
        </div>
      </div>
    );
  }

  return (
    <TripLayout 
      tripData={tripData} 
      currentDayIndex={currentDayIndex} 
      onDayChange={setCurrentDayIndex}
      activeTripId={activeTripId}
      onSelectTrip={(id) => {
        setCurrentDayIndex(0); 
        setActiveTripId(id);
      }}
    />
  );
}