import React from 'react';
import BlockRenderer from '../blocks/BlockRenderer';

export default function DayView({ currentDayData, filterType = 'all' }) {
  if (!currentDayData || !currentDayData.blocks) return null;

  const blocks = currentDayData.blocks;

  // 🎯 精準過濾邏輯
  const filteredBlocks = blocks.filter(block => {
    if (filterType === 'all' || filterType === 'dashboard' || filterType === 'timeline') {
      return true;
    }
    
    // 交通分頁：同時放行一般交通 (transport) 與 航班 (flight)
    if (filterType === 'transport') {
      return block.type === 'transport' || block.type === 'flight';
    }
    
    // 住宿分頁：若有住宿卡片，才放行 markdown
    if (filterType === 'hotel') {
      const hasHotel = blocks.some(b => b.type === 'hotel');
      return block.type === 'hotel' || (hasHotel && block.type === 'markdown');
    }

    // 餐廳分頁：只有當當天「有餐廳卡片」時，才放行 markdown
    if (filterType === 'restaurant') {
      const hasRestaurant = blocks.some(b => b.type === 'restaurant');
      return block.type === 'restaurant' || (hasRestaurant && block.type === 'markdown');
    }

    return block.type === filterType;
  });

  // 🎯 動態圖示與文字字典
  const emptyStateMap = {
    transport: { icon: '🚆', label: '本日無交通卡片資料' },
    hotel: { icon: '🏨', label: '本日無住宿資料' },
    restaurant: { icon: '🍽️', label: '本日無餐廳資料' },
    default: { icon: 'ℹ️', label: '本日行程無相關內容' }
  };

  if (filteredBlocks.length === 0) {
    const emptyInfo = emptyStateMap[filterType] || emptyStateMap.default;

    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm w-full space-y-2 animate-fadeIn">
        {/* 🎯 根據分頁動態呈現對應圖示 */}
        <span className="text-4xl">{emptyInfo.icon}</span>
        <p className="text-sm font-bold text-slate-500">{emptyInfo.label}</p>
        <p className="text-xs text-slate-400">請切換至其他天數或分頁查看。</p>
      </div>
    );
  }

  const isGridView = filterType === 'hotel' || filterType === 'restaurant' || filterType === 'transport';

  return (
    <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 gap-6 items-start" : "space-y-4"}>
      {filteredBlocks.map(block => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}