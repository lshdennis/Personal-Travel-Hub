import React from 'react';

export default function NavigationSidebar({ activeTab, setActiveTab, tripTitle }) {
  // 左側導覽列選單列表
  const menuItems = [
    { id: 'dashboard', label: '我的旅程', icon: '🏠' },
    { id: 'overview', label: '概覽', icon: '👤' },
    { id: 'timeline', label: '時間軸', icon: '⏱️' },
    { id: 'hotel', label: '住宿', icon: '🏨' },
    { id: 'transport', label: '交通', icon: '↔️' },
    { id: 'restaurant', label: '餐廳', icon: '🍴' },
    { id: 'packing', label: '打包', icon: '✔️' },
    { id: 'notes', label: '備忘', icon: '✏️' },
  ];

  return (
    <aside className="w-64 bg-slate-50/50 border-r border-slate-100 p-6 flex flex-col justify-between min-h-screen shrink-0">
      <div className="space-y-8">
        {/* 1. LOGO 標題區 */}
        <div className="flex items-center space-x-3 px-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-blue-500/20">
            PT
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block">PERSONAL</span>
            <span className="text-base font-black text-slate-800 tracking-tight block -mt-1">Travel Hub</span>
          </div>
        </div>

        {/* 2. 當前行程名稱標籤 */}
        {tripTitle && (
          <div className="px-3.5 py-2.5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-2">
            <span className="text-xs">📌</span>
            <span className="text-xs font-bold text-slate-700 truncate">{tripTitle}</span>
          </div>
        )}

        {/* 3. 左側選單列表 */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white border border-blue-600 shadow-md shadow-blue-500/25 ring-2 ring-blue-400/40 scale-[1.02]'
                    : 'text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 border border-transparent'
                }`}
              >
                <span className="text-lg leading-none">{item.icon}</span>
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}