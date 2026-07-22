import React from 'react';

export default function HotelBlock({ block }) {
  if (!block) return null;

  const {
    title,
    name,
    address,
    stayDuration,
    roomType,
    bookingNumber,
    price,
    notes,
    mapUrl
  } = block;

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6 space-y-4 hover:shadow-md transition-shadow animate-fadeIn">
      
      {/* 1. 頂部圖案/圖片區塊 */}
      <div className="w-full h-40 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
        <span className="text-3xl">🏨</span>
      </div>

      {/* 2. 小分類標籤 */}
      <div className="text-xs font-bold text-blue-600 tracking-wide">
        {title || '東京住宿'}
      </div>

      {/* 3. 飯店名稱 */}
      <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-snug">
        {name}
      </h3>

      {/* 4. 基本地址與入住時間 */}
      <div className="space-y-1.5 text-sm text-slate-500 font-medium border-b border-slate-100 pb-3">
        {address && (
          <p className="flex items-start gap-1 text-slate-600">
            <span className="shrink-0">📍</span>
            <span className="leading-relaxed">{address}</span>
          </p>
        )}
        {stayDuration && (
          <p className="text-xs font-bold text-blue-600/80 bg-blue-50 px-2.5 py-1 rounded-lg inline-block">
            📅 {stayDuration}
          </p>
        )}
      </div>

      {/* 5. 訂房詳細資訊區塊 (房型 / 預約號 / 價格 / 筆記) */}
      <div className="space-y-2 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 text-xs font-medium text-slate-600">
        {roomType && (
          <div className="flex items-start gap-1.5">
            <span className="text-slate-400 shrink-0">🛏️ 房型：</span>
            {/* 🎯 加上 whitespace-pre-line 讓房型支援換行 */}
            <span className="font-semibold text-slate-800 whitespace-pre-line">{roomType}</span>
          </div>
        )}
        {bookingNumber && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 shrink-0">🎫 訂單編號：</span>
            <span className="font-mono font-bold text-slate-700">{bookingNumber}</span>
          </div>
        )}
        {price && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 shrink-0">💰 費用：</span>
            <span className="font-bold text-emerald-600">{price}</span>
          </div>
        )}
        {notes && (
          /* 🎯 加上 whitespace-pre-line 讓備忘/介紹文字支援 \n 與 \n\n 換行 */
          <div className="pt-1.5 border-t border-slate-200/60 text-slate-500 leading-relaxed whitespace-pre-line">
            💡 {notes}
          </div>
        )}
      </div>

      {/* 6. Google Maps 導航按鈕 */}
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-sm transition-colors text-center mt-auto"
        >
          Google Maps
        </a>
      )}
    </div>
  );
}