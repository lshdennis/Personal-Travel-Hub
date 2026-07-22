import React from 'react';

export default function Dashboard({ onSelectTrip, activeTripId }) {
  // 🎯 行程選單中央註冊中心：未來有新行程，直接在這裡補上一行，畫面就會自動長出卡片！
  const allTrips = [
    {
      id: 'japan-2026',
      title: '日本東京秋季紅葉之旅',
      subtitle: '東京深度攝影、涉谷探店與關東紅葉狩り',
      date: '2026-11-15 — 2026-11-20',
      badge: '🍁 紅葉季',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'TH-26',
      title: '2026 泰國曼谷避暑奢華之旅',
      subtitle: '精品咖啡浪潮、設計酒店與高空酒吧微醺時光',
      date: '2026-12-01 — 2026-12-05',
      badge: '🌴 奢華度假',
      color: 'from-teal-500 to-emerald-600'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl animate-fadeIn">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800">我的中樞旅程大廳</h1>
        <p className="text-slate-500 mt-1 text-sm">請選擇您想要檢視或編輯的個人核心旅遊計畫。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allTrips.map((trip) => {
          const isCurrent = trip.id === activeTripId;
          return (
            <div 
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              className={`group relative rounded-3xl overflow-hidden shadow-sm border p-6 bg-white cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                isCurrent ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-100'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-slate-400 tracking-wide bg-slate-50 px-2.5 py-1 rounded-md">
                  📅 {trip.date}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full text-white bg-gradient-to-r ${trip.color}`}>
                  {trip.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {trip.title}
              </h3>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                {trip.subtitle}
              </p>

              <div className="mt-6 flex justify-between items-center text-xs font-bold pt-4 border-t border-slate-50">
                <span className={isCurrent ? 'text-blue-600' : 'text-slate-400'}>
                  {isCurrent ? '● 當前檢視中' : '進入行程 ➔'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}