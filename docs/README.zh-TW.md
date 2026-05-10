
<div align="center">

# Mars Blog
> 個人部落格
> 
> ![Node.js >= 22](https://img.shields.io/badge/node.js-%3E%3D22-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue)
![Astro](https://img.shields.io/badge/Astro-6.3.1-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
>
> [![Stars](https://img.shields.io/github/stars/mayuhaos/mayuhaos.github.io?style=social)](https://github.com/mayuhaos/mayuhaos.github.io/stargazers)
>
> **QQ：1757442521**
> 
> **郵箱：yhqzzl@foxmail.com**

</div>


---

🚀 快速指南：
[**🖥️線上預覽**](https://mayuhaos.github.io/)

⚡ 靜態網站生成：基於 Astro 的超快載入速度和 SEO 優化

🎨 現代化設計：簡潔美觀的介面，支援自訂主題色

📱 行動裝置友好：完美的響應式體驗，行動端專項優化

🔧 高度可配置：大部分功能模組均可透過配置檔案自訂

## ✨ 功能特性

### 核心功能

- [x] **Astro + Tailwind CSS** - 基於現代技術棧的超快靜態網站生成
- [x] **流暢動畫** - Swup 頁面過渡動畫，提供絲滑的瀏覽體驗
- [x] **響應式設計** - 完美適配桌面端、平板和行動裝置
- [x] **多語言支援** - i18n 國際化
- [x] **全文搜尋** - 基於 Pagefind 的客戶端搜尋

### 個性化
- [x] **動態側邊欄** - 支援單側邊欄、雙側邊欄配置
- [x] **文章佈局** - 支援列表、網格（多列/瀑布流）佈局
- [x] **字型管理** - 支援自訂字型，豐富的字型選擇器
- [x] **亮暗色模式** - 支援亮色/暗色/跟隨系統三種模式
- [x] **桌布模式** - 橫幅、全螢幕、透明、純色背景
- [x] **主題色自訂** - 360° 色相調節

## 🚀 快速開始

### 環境要求

- Node.js ≥ 22
- pnpm ≥ 9

### 本地開發部署

1. **克隆倉庫：**
   ```bash
   git clone https://github.com/mayuhaos/mayuhaos.github.io.git
   cd mayuhaos.github.io
   ```

2. **安裝依賴：**
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **啟動開發伺服器：**
   ```bash
   pnpm dev
   ```
   部落格將在 `http://localhost:4321` 可用

## 🙏 致謝

感謝開源社區的貢獻。

## 📝 許可協議

本專案遵循 [MIT license](https://mit-license.org/) 開源協議

- Copyright (c) 2026 [Mars](https://github.com/mayuhaos) - Mars Blog

## 🧞 指令

| Command                    | Action                                              |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | 安裝依賴                               |
| `pnpm dev`                 | 在 `localhost:4321` 啟動本地開發伺服器        |
| `pnpm build`               | 構建網站至 `./dist/`            |
| `pnpm preview`             | 本地預覽已構建的網站        |
| `pnpm new-post <filename>` | 建立新文章                                   |
