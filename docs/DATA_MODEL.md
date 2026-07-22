# Travel OS Data Model & Relationships (資料模型與關係說明書)

本系統的核心目標是優化「單一維護者手動在 VS Code/Cursor 編輯行程」的最高效率，移除巢狀結構，建立高度可讀、不可變的旅遊知識系統。

## 🧬 資料實體階層關係 (Mermaid Diagram)

```mermaid
graph TD
    Trip[1. trip.json - 行程配置根設定] --> Overview[Overview - 富總覽模型]
    Trip --> Summary[Summary - 富總結模型]
    Trip --> DayFiles[dayFiles - 每日 JSON 檔名索引陣列]
    
    DayFiles --> DayEntity[2. dayX.json - 獨立天數檔案]
    DayEntity --> FlattenedBlocks[blocks - 扁平化區塊陣列]
    
    FlattenedBlocks --> CommonMetadata[3. 通用中繼資料: id, type, title, visible, collapsed]
    FlattenedBlocks --> BusinessFields[4. 平鋪業務欄位: name, checkIn, items, file]
    
    BusinessFields -.-> ExtMarkdown[5. 外部獨立 .md 檔案]
    Knowledge[6. data/knowledge/ - 全域知識庫] -.-> ImmutableNote[完全隔離快照, 零程式依賴串接]
    Assets[7. src/assets/ - 結構化資產庫] -.-> ManualLink[手動相對路徑字串參照]