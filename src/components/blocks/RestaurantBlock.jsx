import React from 'react';

export default function RestaurantBlock({ block }) {
  if (!block) return null;

  const { title, name, category, notes, description, mapUrl } = block;
  const displayName = name || title || '未命名餐廳';
  const displayNotes = notes || description || '暫無備忘筆記。';

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-6 space-y-4 hover:shadow-md transition-shadow animate-fadeIn">
      
      <div className="w-full h-40 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
        <span className="text-3xl">☕</span>
      </div>

      <div className="text-xs font-bold text-amber-600 tracking-wide">
        {title || '美食探店'}
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-snug truncate">
          {displayName}
        </h3>
        {category && (
          <p className="text-xs font-semibold text-slate-400">
            🏷️ {category}
          </p>
        )}
      </div>

      {/* 🎯 加上 whitespace-pre-line 讓隨手筆記支援換行 */}
      <div className="flex-1 text-sm text-slate-600 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-100/50 leading-relaxed whitespace-pre-line">
        {displayNotes}
      </div>

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