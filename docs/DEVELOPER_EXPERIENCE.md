# ⏱️ 10 分鐘全新行程快速擴充指南 (Developer Experience)

本系統的核心設計宗旨為 **「零 React 代碼干預」**。當你需要新增一年、跨多年或多個完全獨立的旅遊計畫時，未來的維護者只需使用 `templates/` 目錄下的標準 JSON 骨架進行複製貼上，即可在 10 分鐘內完成配置。

---

## 🚀 3 步驟極速新建工作流 (Workflow)

### 1. 建立獨立快照資料夾
在檔案總管中，直接打開 `src/data/trips/`，新建一個具備唯一語意識別碼的資料夾：
> 📁 `src/data/trips/[你的行程ID]/` （例如：`uk-2027`）
>   ├── 📁 `days/`
>   └── 📁 `markdown/`

### 2. 初始化主控設定檔
1. 複製 `templates/trip.template.json` 檔案。
2. 貼進剛建立的 `src/data/trips/[你的行程ID]/` 資料夾中，並將檔名重新命名為 **`trip.json`**。
3. 修改裡面的 `"id"`, `"title"`, `"startDate"` 等基本欄位。

### 3. 配置天數卡片流
1. 複製 `templates/day.template.json` 檔案。
2. 貼進你的 `src/data/trips/[你的行程ID]/days/` 資料夾中，重新命名為 **`day1.json`**。
3. 根據當天的住宿、交通時間軸需求，自由在 `blocks` 陣列中新增、刪除物件。所有欄位皆在第一層平鋪，修改完畢直接存檔。

---

## 💡 頂層接入與行程切換
當你建立好全新的行程資料夾（例如 `uk-2027`）後，想要讓網頁畫面切換成這個新行程，你只需要打開專案根目錄的 **`src/App.jsx`**，找到最上方這一行核心控制狀態：

```javascript
const [activeTripId, setActiveTripId] = useState('TH-26');