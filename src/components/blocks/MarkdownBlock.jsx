import React from 'react';

export default function MarkdownBlock({ block }) {
  if (!block) return null;

  const { title, content } = block;

  return (
    <div className="col-span-1 md:col-span-2 w-full bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-4 animate-fadeIn my-2">
      {title && (
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
          📝 {title}
        </h3>
      )}
      
      {/* 🎯 關鍵升級：whitespace-pre-line 讓 \n 與 \n\n 完美強制換行與分段 */}
      <div className="text-sm text-slate-600 font-medium leading-relaxed space-y-3 whitespace-pre-line break-words">
        {content}
      </div>
    </div>
  );
}