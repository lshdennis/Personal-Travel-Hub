import React from 'react';

export default function Overview({ tripData }) {
  // 防禦型安全檢查：確保主設定檔存在
  if (!tripData) return null;

  const { title, startDate, endDate, overview, summary } = tripData;

  return (
    <div className="space-y-8 max-w-5xl animate-fadeIn">
      {/* 1. 夢幻漸層/封面大橫幅 (Hero Banner) */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-8 md:p-12 min-h-[240px] flex flex-col justify-between">
        {/* 背景光暈效果 */}
        <div className="absolute inset-0 bg-opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 space-y-2">
          <p className="text-xs md:text-sm font-bold tracking-widest uppercase opacity-75">
            {startDate} — {endDate}
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {title || '未命名行程'}
          </h1>
          <p className="text-lg opacity-90 font-medium max-w-xl">
            {overview?.subtitle || ''}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2 mt-6">
          {overview?.tags?.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide">
              # {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 2. 四大核心微型數據指標卡片 (Metric Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">旅行日期</span>
          <span className="text-2xl font-black text-slate-800 mt-2">
            {tripData.dayFiles?.length || 0} 天
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">首站目的地</span>
          <span className="text-2xl font-black text-slate-800 mt-2 truncate">
            {overview?.title || '未設定'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">預算規劃</span>
          <span className="text-2xl font-black text-slate-800 mt-2">
            {summary?.budget?.total ? `${summary.budget.total.toLocaleString()} ${summary.budget.currency}` : '未編列'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">行程狀態</span>
          <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg mt-2 inline-block self-start">
            ● 準備就緒
          </span>
        </div>
      </div>

      {/* 3. 雙欄位：行程簡介與亮點備忘錄 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 左側：宏觀簡介 (2/3 寬度) */}
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            📝 行程摘要說明
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            {overview?.description || '這個行程尚未填寫詳細的巨觀簡介。你可以直接編輯該行程資料夾底下的 `trip.json` 來補齊豐富的敘述！'}
          </p>
        </div>

        {/* 右側：預期亮點 (1/3 寬度) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            🌟 本次預期亮點
          </h3>
          {overview?.highlights && overview.highlights.length > 0 ? (
            <ul className="space-y-2">
              {overview.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="text-blue-500 mt-0.5">✔</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-xs italic">尚未設定精選亮點卡片</p>
          )}
        </div>
      </div>
    </div>
  );
}