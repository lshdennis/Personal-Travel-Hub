import React from 'react';

export default function Summary({ data }) {
  if (!data || !data.budget) return null;
  return (
    <div className="mt-8 pt-4 border-t border-slate-200 text-right text-xs text-slate-400 font-mono">
      預算總結預留：{data.budget.total} {data.budget.currency}
    </div>
  );
}