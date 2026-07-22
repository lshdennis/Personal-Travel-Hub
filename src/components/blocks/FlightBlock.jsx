import React from 'react';

export default function FlightBlock({ block }) {
  if (!block) return null;

  const {
    title,
    airline,
    flightNumber,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    time,
    terminal,
    departureTerminal,
    arrivalTerminal,
    notes,
    mapUrl
  } = block;

  // 🎯 解析航廈：若有單獨設定則優先使用；若用 \n 隔開則自動拆分成陣列
  const terminalList = terminal
    ? terminal.split('\n').map(t => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6 space-y-4 hover:shadow-md transition-shadow animate-fadeIn">
      
      {/* 1. 頂部飛機視覺區 */}
      <div className="w-full h-36 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500">
        <span className="text-4xl">✈️</span>
      </div>

      {/* 2. 小標題與航空公司 */}
      <div className="space-y-1">
        <div className="text-xs font-bold text-sky-600 tracking-wide uppercase">
          {title || '航班資訊'}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">
            {airline}
          </h3>
          {flightNumber && (
            <span className="px-2.5 py-1 bg-sky-100 text-sky-700 text-xs font-mono font-bold rounded-lg">
              {flightNumber}
            </span>
          )}
        </div>
      </div>

      {/* 3. 起降機場、飛行時間與航廈對齊區 */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 text-xs">
        <div className="flex items-center justify-between font-bold text-slate-700">
          {/* 出發地 */}
          <div className="text-left">
            <span className="text-base text-slate-900 block">{departureAirport || '出發地'}</span>
            <span className="text-sky-600 font-mono text-xs">{departureTime}</span>
          </div>

          {/* 飛行時間與飛機圖示 */}
          <div className="flex flex-col items-center justify-center px-2">
            <span className="text-sky-400 text-lg leading-none">✈︎</span>
            {time && (
              <span className="text-[10px] font-bold text-sky-600/80 bg-sky-100/60 px-2 py-0.5 rounded-full mt-1 shrink-0 whitespace-nowrap">
                {time}
              </span>
            )}
          </div>

          {/* 目的地 */}
          <div className="text-right">
            <span className="text-base text-slate-900 block">{arrivalAirport || '目的地'}</span>
            <span className="text-sky-600 font-mono text-xs">{arrivalTime}</span>
          </div>
        </div>

        {/* 🎯 質感升級：航廈區塊 (左右雙欄對齊 或 列表對齊) */}
        {(departureTerminal || arrivalTerminal) ? (
          <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-slate-600 font-medium">
            <div className="flex items-center gap-1">
              <span className="text-sky-500">📍</span>
              <span>{departureTerminal}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sky-500">📍</span>
              <span>{arrivalTerminal}</span>
            </div>
          </div>
        ) : terminalList.length > 0 && (
          <div className="pt-2.5 border-t border-slate-200/60 space-y-1.5">
            {terminalList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <span className="text-sky-500 text-sm shrink-0">📍</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. 備忘 / 提醒 */}
      {notes && (
        <div className="flex-1 text-xs text-slate-500 font-medium bg-slate-50/50 p-3 rounded-xl border border-slate-100/60 leading-relaxed whitespace-pre-line">
          💡 {notes}
        </div>
      )}

      {/* 5. 相關連結按鈕 */}
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-sm transition-colors text-center mt-auto"
        >
          查看航班動態 / 機場資訊
        </a>
      )}
    </div>
  );
}