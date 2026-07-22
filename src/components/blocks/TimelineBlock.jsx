import React from 'react';

export default function TimelineBlock({ block }) {
  if (!block) return null;

  const { dayLabel, mainTheme, items, notes } = block;

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6 animate-fadeIn">
      
      {/* 1. 頂部大標題 */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
          {dayLabel || 'DAY 1'}
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          {mainTheme || '本日行程項目'}
        </h2>
      </div>

      {/* 2. 垂直時間軸節點流 */}
      {items && items.length > 0 && (
        <div className="relative pl-4 space-y-8 mt-4">
          <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-100"></div>

          {items.map((item, idx) => (
            <div key={idx} className="relative flex items-start space-x-4 group">
              <div className="relative z-10 flex items-center justify-center w-4 h-4 mt-1.5">
                <div className="w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_0_2px_rgba(59,130,246,0.3)]"></div>
              </div>

              <div className="space-y-1 flex-1">
                <span className="text-sm font-bold text-blue-500 block leading-none">
                  {item.time}
                </span>
                <h4 className="text-lg font-bold text-slate-800 tracking-tight">
                  {item.event}
                </h4>
                {/* 🎯 加上 whitespace-pre-line 讓行程描述支援換行 */}
                {item.description && (
                  <p className="text-sm text-slate-400 font-medium leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. 底部移動備忘 */}
      {notes && (
        /* 🎯 加上 whitespace-pre-line 讓移動備忘支援換行 */
        <div className="bg-slate-50 border border-slate-100/50 rounded-xl p-3 px-4 text-xs font-semibold text-slate-500 leading-relaxed whitespace-pre-line">
          {notes}
        </div>
      )}

    </div>
  );
}