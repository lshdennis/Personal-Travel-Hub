import React from 'react';

export default function TransportBlock({ block }) {
  if (!block) return null;

  const {
    title,
    name,
    category,
    departure,
    arrival,
    time,
    notes,
    mapUrl
  } = block;

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6 space-y-4 hover:shadow-md transition-shadow animate-fadeIn">
      
      {/* 1. 頂部交通圖案區 */}
      <div className="w-full h-36 bg-blue-50/50 rounded-2xl flex items-center justify-center text-blue-500">
        <span className="text-4xl">🚌</span>
      </div>

      {/* 2. 分類標籤 */}
      <div className="text-xs font-bold text-blue-600 tracking-wide uppercase">
        {title || '交通接駁'}
      </div>

      {/* 3. 路線 / 車號名稱 */}
      <div className="space-y-1">
        <h3 className="text-xl font-black text-slate-800 tracking-tight leading-snug">
          {name || '交通路線'}
        </h3>
        {category && (
          <p className="text-xs font-semibold text-slate-400">
            🏷️ {category}
          </p>
        )}
      </div>

      {/* 4. 起終點與時間區塊 */}
      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2 text-xs font-medium text-slate-600">
        {(departure || arrival) && (
          <div className="flex items-center justify-between font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100">
            <span>{departure || '出發地'}</span>
            <span className="text-blue-500">➔</span>
            <span>{arrival || '目的地'}</span>
          </div>
        )}
        {time && (
          <div className="flex items-center gap-1.5 text-blue-600 font-semibold pt-1">
            <span>⏰ 時間：</span>
            <span>{time}</span>
          </div>
        )}
      </div>

      {/* 5. 隨手筆記 / 預約提醒 (支援 \n 換行) */}
      {notes && (
        <div className="flex-1 text-xs text-slate-500 font-medium bg-slate-50/50 p-3 rounded-xl border border-slate-100/60 leading-relaxed whitespace-pre-line">
          💡 {notes}
        </div>
      )}

      {/* 6. 預約或路線地圖按鈕 */}
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-sm transition-colors text-center mt-auto"
        >
          查看路線 / 訂票網站
        </a>
      )}
    </div>
  );
}