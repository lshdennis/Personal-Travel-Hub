import React from 'react';
import HotelBlock from './HotelBlock';
import RestaurantBlock from './RestaurantBlock';
import TimelineBlock from './TimelineBlock';
import MarkdownBlock from './MarkdownBlock';
import TransportBlock from './TransportBlock'; // 🎯 引入交通元件
import FlightBlock from './FlightBlock'; // 🎯 引入航班組件

export default function BlockRenderer({ block }) {
  if (!block || block.visible === false) return null;

  switch (block.type) {
    case 'hotel':
      return <HotelBlock block={block} />;

    case 'restaurant':
      return <RestaurantBlock block={block} />;

    case 'transport': // 🎯 新增：對接交通卡片
      return <TransportBlock block={block} />;

    case 'flight': // 🎯 處理航班卡片
      return <FlightBlock block={block} />;
    
      case 'timeline':
      return <TimelineBlock block={block} />;

    case 'markdown':
      return <MarkdownBlock block={block} />;

    default:
      return (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-400">
          ℹ️ 未知卡片型態 [{block.type}]: {block.title || '未命名區塊'}
        </div>
      );
  }
}