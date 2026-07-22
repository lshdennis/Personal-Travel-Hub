import React from 'react';

export default function NotesPanel({ notesData = [] }) {
  if (!notesData || notesData.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <span className="text-3xl">✏️</span>
        <p className="text-sm text-slate-400 mt-2 font-medium">暫無任何備忘事項</p>
      </div>
    );
  }

  const colorMap = {
    blue: 'border-blue-200 bg-blue-50/30 text-blue-900',
    amber: 'border-amber-200 bg-amber-50/30 text-amber-900',
    emerald: 'border-emerald-200 bg-emerald-50/30 text-emerald-900',
    purple: 'border-purple-200 bg-purple-50/30 text-purple-900'
  };

  return (
    <div className="space-y-8 max-w-5xl animate-fadeIn">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800">重要旅遊備忘錄</h1>
        <p className="text-slate-500 mt-1 text-sm">交通劃位、退稅規定與隨身注意事項。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {notesData.map((note) => {
          const colorClass = colorMap[note.color] || colorMap.blue;
          return (
            <div
              key={note.id}
              className={`p-6 rounded-3xl border shadow-sm space-y-3 flex flex-col justify-between bg-white ${colorClass}`}
            >
              <div className="space-y-2">
                <h3 className="text-base font-bold tracking-tight">
                  {note.title}
                </h3>
                {/* 🎯 加上 whitespace-pre-line 讓備忘卡片內文支援換行 */}
                <p className="text-sm leading-relaxed opacity-90 whitespace-pre-line">
                  {note.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}