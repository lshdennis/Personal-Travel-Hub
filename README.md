# Multi Trip Travel OS (Rev2.2 - 最終架構定案版)

本專案是一個可容納「跨年份、多地區、高達數十個旅遊計畫」的個人長途旅行知識系統（Travel OS）。系統核心哲學是 **內容至上、極簡與防禦性設計**，旨在優化「手動透過 VS Code/Cursor 直接維護行程」的終極體驗。

---

## 🛠️ 1. 系統架構特性 (Architecture Overview)
- **徹底扁平化 (Flattened Blocks)**：全面移除舊版 JSON 的 `"content": {}` 巢狀外殼。所有業務參數與中繼資料平鋪於物件第一層，手動編輯時游標移動深度減少 50% 以上。
- **資料驅動與 UI 解耦 (Generic UI)**：React 元件層與頂層佈局完全由 JSON 資料結構動態映射驅動，代碼層不包含任何硬編碼（Hardcoded）行程字串。
- **故障安全防禦 (Validation & Fail-safe)**：內建輕量化驗證管線。當手動編輯 JSON 損毀、漏填必要 metadata 或填錯區塊類型時，系統會啟動隔離，呈現精準的錯誤捕捉看板，絕不白屏死當。

---

## 📂 2. 專案目錄結構 (Folder Structure)

```text
src/
├── assets/                  # 結構化靜態資產庫 (images, photos, maps, pdf, tickets, screenshots)
├── components/
│   ├── layout/              # 頁面框架版面組件 (TripLayout, Sidebar, Overview, DayView, Summary)
│   └── blocks/              # 扁平化泛用卡片組件庫 (BlockRenderer, HotelBlock, MarkdownBlock 等)
├── hooks/
│   └── useTripLoader.js     # 核心並行 Pipeline 資料載入 Hook
├── utils/
│   └── tripValidator.js     # 防禦型資料驗證器
└── data/
    ├── knowledge/           # 全域常用知識庫字典目錄 (預留)
    └── trips/
        └── japan-2026/      # 獨立旅遊計畫快照模組
            ├── trip.json    # 專案根配置主設定檔 (Schema Version 2)
            ├── days/        # 每日行程區塊獨立 JSON 存放區
            └── markdown/    # 外部長文攻略攻略 .md 存放區