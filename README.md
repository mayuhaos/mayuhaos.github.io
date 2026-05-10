
<div align="center">

# Mars Blog
> 个人博客
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
> **邮箱：yhqzzl@foxmail.com**

</div>


---

🚀 快速指南：
[**🖥️在线预览**](https://mayuhaos.github.io/)

⚡ 静态站点生成: 基于Astro的超快加载速度和SEO优化

🎨 现代化设计: 简洁美观的界面，支持自定义主题色

📱 移动友好: 完美的响应式体验，移动端专项优化

🔧 高度可配置: 大部分功能模块均可通过配置文件自定义

## ✨ 功能特性

### 核心功能

- [x] **Astro + Tailwind CSS** - 基于现代技术栈的超快静态站点生成
- [x] **流畅动画** - Swup 页面过渡动画，提供丝滑的浏览体验
- [x] **响应式设计** - 完美适配桌面端、平板和移动设备
- [x] **多语言支持** - i18n 国际化，UI支持简体中文、繁体中文、英文、日文、俄语
- [x] **全文搜索** - 基于 Pagefind 的客户端搜索，支持文章内容索引

### 个性化
- [x] **动态侧边栏** - 支持配置单侧边栏、双侧边栏
- [x] **文章布局** - 支持配置(单列)列表、网格(多列/瀑布流)布局
- [x] **字体管理** - 支持自定义字体，丰富的字体选择器
- [x] **页脚配置** - HTML 内容注入，完全自定义
- [x] **亮暗色模式** - 支持亮色/暗色/跟随系统三种模式
- [x] **导航栏自定义** - Logo、标题、链接全面自定义
- [x] **壁纸模式切换** - 横幅壁纸、全屏壁纸、全屏透明壁纸、纯色背景
- [x] **主题色自定义** - 360° 色相调节

## 🚀 快速开始

### 环境要求

- Node.js ≥ 22
- pnpm ≥ 9

### 本地开发部署

1. **克隆仓库：**
   ```bash
   git clone https://github.com/mayuhaos/mayuhaos.github.io.git
   cd mayuhaos.github.io
   ```

2. **安装依赖：**
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **启动开发服务器：**
   ```bash
   pnpm dev
   ```
   博客将在 `http://localhost:4321` 可用

## 🙏 致谢

感谢开源社区的贡献。

## 📝 许可协议

本项目遵循 [MIT license](https://mit-license.org/) 开源协议

- Copyright (c) 2026 [Mars](https://github.com/mayuhaos) - Mars Blog

## 📖 配置说明

编辑 `src/config/` 目录下的配置文件自定义博客设置。

## 🧞 指令

下列指令均需要在项目根目录执行：

| Command                    | Action                                              |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | 安装依赖                               |
| `pnpm dev`                 | 在 `localhost:4321` 启动本地开发服务器        |
| `pnpm build`               | 构建网站至 `./dist/`            |
| `pnpm preview`             | 本地预览已构建的网站        |
| `pnpm new-post <filename>` | 创建新文章                                   |
