# 島作選物 DAOZAO｜商店形象網站（作品集範例 #2）

以純 HTML / CSS / JavaScript 打造的台灣在地選物店形象網站，無框架、無建置流程，下載即可開啟，可直接部署到 GitHub Pages 或 Netlify。

- 展示重點：**商品展示與分類**、**前端購物車（加入／數量／小計／免運門檻）**、**品牌故事**、**聯絡表單驗證**、**RWD 響應式設計**
- 技術：純靜態（HTML5 + CSS3 + 原生 JS），零依賴、零建置
- 設計調性：明亮暖色系、無襯線字體，與作品集 #1（餐廳・墨綠金色）明顯區隔

---

## 1. 檔案結構

```
store-website/
├── index.html          # 單頁式網站（語意化標籤、SEO / Open Graph meta）
├── css/
│   └── style.css       # 全部樣式（CSS 變數、Grid/Flex、三段 RWD 斷點）
├── js/
│   └── main.js         # 互動邏輯（選單、捲動動畫、商品渲染/分類/排序、購物車、表單驗證）
├── preview/            # 實機渲染截圖
└── README.md           # 本說明文件
```

---

## 2. 本機預覽

```bash
# 方法 A：Python（macOS / Linux 內建）
cd store-website
python3 -m http.server 8080
# 開啟 http://localhost:8080

# 方法 B：Node.js
npx serve store-website
```

> 網站圖片來自 Unsplash 圖床，需連網才會顯示；離線時會退回品牌色底。

---

## 3. 部署到 GitHub Pages

1. 建立新的 GitHub repository，例如 `daozao-select`。
2. 把 `store-website/` **裡面的內容**上傳到 repo 根目錄（`index.html` 必須在根目錄）。

   ```bash
   cd store-website
   git init
   git add .
   git commit -m "feat: 島作選物形象網站"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/daozao-select.git
   git push -u origin main
   ```

3. 到 repo 的 **Settings → Pages**：Source 選 `Deploy from a branch`，Branch 選 `main`、資料夾 `/ (root)` → Save。
4. 等 1～2 分鐘，網址為 `https://<你的帳號>.github.io/daozao-select/`。

> 全站使用相對路徑（`css/style.css`、`js/main.js`），在子目錄網址下也能正常運作。

---

## 4. 部署到 Netlify（最快，支援拖曳）

1. 前往 <https://app.netlify.com/drop>
2. 直接把整個 `store-website` 資料夾拖進去，幾秒後即得到上線網址。
3. （改版自動化）Netlify → **Add new site → Import an existing project** → 選 GitHub repo → Build command 留空、Publish directory 填 `.`。

---

## 5. 內容替換指南

| 想改的東西 | 到哪裡改 |
| --- | --- |
| 店名 / 標語 / 地址 / 電話 | `index.html`（搜尋 `島作選物`、`02-2555-1234`） |
| 商品資料（名稱、價格、分類、圖片、庫存） | `js/main.js` 最上方的 `PRODUCTS` 陣列 |
| 免運門檻 | `js/main.js` 的 `FREE_SHIP` 常數（預設 1200） |
| 品牌色 | `css/style.css` 的 `:root` 變數（`--clay`、`--sage`、`--cream`） |
| 職人推薦語 | `index.html` 的 `#makers` 區塊 |
| SEO 標題與描述 | `index.html` 的 `<meta name="description">`、`og:*` |

---

## 6. 表單串接（目前為前端示範）

`js/main.js` 的送出處理只做**前端驗證 + 顯示成功訊息**，未真的送出資料。要收到真實來訊，二選一：

- **Netlify Forms**：於 `<form>` 加上 `netlify` 與 `name="contact"` 屬性，Netlify 會自動收集。
- **自有 API / 第三方**：在 `main.js` 送出成功前加入 `fetch("/api/contact", { method:"POST", ... })`，可接 Google Apps Script、Formspree 或自架 API。

---

## 7. 購物車說明（前端示範）

- 加入商品、調整數量、移除、即時計算小計與免運進度，皆為純前端狀態（`Map`），重新整理即清空。
- 「前往結帳」為示範按鈕，不會產生真實訂單。
- 若要接真實金流，建議串接綠界 ECPay / 藍新 NewebPay，或 Shopify / Snipcart 等服務。

---

## 8. 相容性與無障礙

- 支援現代瀏覽器（Chrome / Edge / Safari / Firefox 最新版）。
- 語意化標籤、`aria-*`、鍵盤焦點樣式（`:focus-visible`）、購物車 `aria-live` 數量提示。
- 尊重 `prefers-reduced-motion`。

---

*本網站為作品集示範用途，店名、地址、電話、商品與職人皆為虛構。*
