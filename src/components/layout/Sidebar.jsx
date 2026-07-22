import React from 'react';

export default function Sidebar({ days = [], currentDayIndex, onDayChange }) {
  if (!days || days.length === 0) return null;

  return (
    <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
      {days.map((day, idx) => {
        const isActive = idx === currentDayIndex;
        return (
          <button
            key={day.dayNumber || idx}
            onClick={() => onDayChange(idx)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center space-x-1.5 border ${
              isActive
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 ring-2 ring-blue-400/40'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
            }`}
          >
            <span className="font-mono tracking-tight">Day {day.dayNumber || idx + 1}</span>
            <span className="opacity-50">·</span>
            {/* 🎯 限制最大寬度 max-w-[120px] 避免按鈕過長跑版 */}
            <span className="truncate max-w-[120px] tracking-tight">
              {day.theme || '行程'}
            </span>
          </button>
        );
      })}
    </div>
  );
}