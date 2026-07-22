import React, { useState } from 'react';

export default function PackingPanel({ packingData = [] }) {
  // 使用 Local State 紀錄勾選狀態
  const [categories, setCategories] = useState(packingData);

  const toggleItem = (catIdx, itemIdx) => {
    const newCategories = [...categories];
    newCategories[catIdx].items[itemIdx].checked = !newCategories[catIdx].items[itemIdx].checked;
    setCategories(newCategories);
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <span className="text-3xl">🧳</span>
        <p className="text-sm text-slate-400 mt-2 font-medium">尚未設定打包清單項目</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl animate-fadeIn">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800">行李打包檢查清單</h1>
        <p className="text-slate-500 mt-1 text-sm">出發前的最後確認，點擊可即時切換勾選狀態。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>{cat.category}</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {cat.items.filter(i => i.checked).length} / {cat.items.length}
              </span>
            </h3>

            <div className="space-y-2.5">
              {cat.items.map((item, itemIdx) => (
                <div
                  key={item.id || itemIdx}
                  onClick={() => toggleItem(catIdx, itemIdx)}
                  className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all ${
                    item.checked ? 'bg-slate-50 text-slate-400 line-through' : 'hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    item.checked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {item.checked && <span className="text-xs font-bold">✓</span>}
                  </div>
                  <span className="text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}