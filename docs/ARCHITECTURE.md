# Travel OS Core Architecture Specification (Rev2.2 - 定案版架構說明書)

本文件詳實記錄本系統在 Rev2.2 演進後的底層工程設計。

---

## 🧠 1. 核心設計哲學：徹底扁平化
我們將區塊的「中繼資料」與「業務數據」平鋪在同一個頂層級別。這使得 `BlockRenderer` 的調度職責極端純粹化：
```jsx
export default function BlockRenderer({ block }) {
  if (!block || block.visible === false) return null;
  const Component = blockRegistry[block.type];
  return <Component {...block}/>;
}