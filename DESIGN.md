# 栏栏菜谱 · 主页重构设计文档（PM + UI 设计稿）

> 版本：v1.0 ｜ 日期：2026-07-30 ｜ 角色：产品经理 + UI 设计师 → 交付开发
> 参考：下厨房（xiachufang.com）信息架构、卡片范式；保留本站「可爱、暖色、圆润」基因。
> 技术约束：纯静态 HTML/CSS/JS，GitHub Pages 直出，动画用 anime.js（CDN 引入），无构建步骤。

---

## 1. 项目背景与目标

### 1.1 现状问题
- 主页只有 hero 图 + 一排分类按钮 + 卡片网格，**缺少导航与搜索**，信息层级扁平。
- 卡片偏「图标卡」而非「菜谱卡」，和主流菜谱站（下厨房/美食杰）的**照片卡范式**差距明显，用户第一眼难以建立「这是一个菜谱站」的认知。
- 可爱风有，但**精致度不够**，圆角/阴影/留白随意，显得像 demo 而非成品。

### 1.2 设计目标
1. **像真正的菜谱站**：补上顶部导航 + 搜索，建立「浏览 → 筛选 → 看菜」的标准动线。
2. **照片卡范式**：把卡片改造成「大图区 + 标题 + 元信息」的下厨房式卡片，一眼可扫。
3. **可爱但不幼稚**：暖橙主色、圆润卡片、emoji 装饰，克制留白，避免廉价的卡通感。
4. **丝滑交互**：用 anime.js 做入场 stagger、hover 弹性、弹窗 timeline，全程可降级。

### 1.3 成功度量（验收）
- 首屏 1 秒内让用户明白「这是栏栏的菜谱站」且能搜/能筛。
- 卡片 hover、筛选切换、弹窗开合动画顺滑无卡顿（60fps）。
- 移动端单列、桌面多列，断点正常。

---

## 2. 信息架构（IA）

```
顶部导航栏 (sticky)
  ├─ Logo：🍳 栏栏菜谱
  ├─ 搜索框（实时按标题过滤）
  └─ 右侧：可爱头像/emoji 占位（未来可接「关于/收藏」）

Hero 横幅
  ├─ 背景：用户提供插画（couple+pets）
  ├─ 标题：栏栏的私房菜谱
  ├─ 副标题：把爱，做成一道道菜 🧡
  └─ 标签：🍳家常 · 🍲汤羹 · 🍰甜品 · 🥢小食

分类快速导航（chip 行，可 sticky）
  └─ 全部 / 家常菜 / 汤羹 / 早餐 / 甜品 / 小食（按数据动态，无内容则隐藏）

菜谱网格
  ├─ 区块标题：「全部菜谱 · 共 N 道」
  └─ 照片卡 × N（grid 自适应列数）

页脚
  └─ Made with 🧡 by LanLan · 记录每一次厨房的小幸福
```

---

## 3. 视觉规范（Design Tokens）

### 3.1 色彩
| Token | 值 | 用途 |
|---|---|---|
| `--bg` | `#FFF8F0` | 页面底色（奶油） |
| `--surface` | `#FFFFFF` | 卡片/弹窗底 |
| `--primary` | `#FF7A59` | 主色（珊瑚橙，按钮/激活态/强调） |
| `--primary-soft` | `#FFE8DE` | 主色浅底（标签/激活底） |
| `--accent` | `#FFB088` | 辅色（渐变/点缀） |
| `--ink` | `#4A3B35` | 主文字（暖棕） |
| `--ink-soft` | `#8D7B72` | 次要文字/元信息 |
| `--line` | `rgba(255,122,89,0.14)` | 描边/分隔线 |
| `--shadow` | `0 4px 16px rgba(93,64,55,0.08)` | 卡片静息阴影 |
| `--shadow-hover` | `0 18px 44px rgba(255,122,89,0.20)` | 卡片 hover 阴影 |

主色比旧版更亮一档（#FF7A59），更贴近下厨房的暖橙，但保留可爱感。

### 3.2 字体与字号
- 字体族：`"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif`
- 大标题：clamp(2.2rem, 6vw, 3.4rem)，字重 800，字间距 0.04em
- 卡片标题：1.15rem / 700
- 正文：0.95rem / 1.7 行高
- 元信息：0.8rem / 500

### 3.3 圆角 / 间距 / 阴影
- 卡片圆角 `--radius: 24px`；chip/标签 `999px`；图片区 `18px`。
- 间距走 4 倍数栅格：卡片 gap `1.6rem`；区块上下 padding `2.5rem`。
- 阴影统一上面两个 token，禁止多套阴影混用。

### 3.4 分类配色（卡片「照片区」渐变底）
每个分类给一抹独特渐变，让网格有节奏感：
- 家常菜：`linear-gradient(135deg,#FFE0C7,#FFC9A8)`
- 汤羹：`linear-gradient(135deg,#D7F0E8,#Bfe6da)`
- 早餐：`linear-gradient(135deg,#FFF1C9,#FFE0A0)`
- 甜品：`linear-gradient(135deg,#FCDDEC,#F7C8E0)`
- 小食：`linear-gradient(135deg,#E6E0FF,#CFC4FF)`
（在 JS 里用 `category` 映射到对应 class。）

---

## 4. 组件规范

### 4.1 顶部导航栏 `.nav`
- 高 64px，sticky top:0，半透明 `rgba(255,248,240,0.85)` + `backdrop-filter: blur(10px)`，底部 1px `--line`。
- 左：logo emoji + 「栏栏菜谱」粗体。
- 中：搜索框（圆角 999px，left 🔍 图标，placeholder「搜搜今天吃什么…」），max-width 420px，focus 时边框变主色。
- 右：emoji 头像占位（不接真实登录）。
- 移动端：logo 左、搜索占满剩余宽度、头像隐藏。

### 4.2 Hero 横幅 `.hero`
- 全宽，min-height 360px（移动 280px），背景 `assets/hero.jpg` cover。
- 底部加 `linear-gradient(180deg, rgba(74,59,53,0) 30%, rgba(74,59,53,0.55))` 提升文字可读性。
- 内容居中：大标题 + 副标题（白字 + 轻投影）+ 一排类别标签 pill。
- 入场：标题 fade-up（anime）。

### 4.3 分类导航 `.cat-bar`
- 一行 chip，居中，可 `position: sticky; top:64px`（吸在导航下）。
- chip：白底、--ink-soft 文字、1px --line；激活态：主色渐变底 + 白字 + 主色阴影。
- 点击：anime spring 缩放回弹（scale 0.92→1）。

### 4.4 菜谱照片卡 `.recipe-card`
结构：
```
.recipe-card
  ├─ .card-photo  (渐变底 + 大 emoji + 右上角 ♡ 收藏按钮)
  └─ .card-body
       ├─ .card-title
       ├─ .card-meta (⏱ 时间 · 📌 难度)
       └─ .card-foot (查看做法 →)
```
- `.card-photo`：aspect-ratio 4/3，圆角 18px，emoji font-size 3.4rem + drop-shadow。
- 收藏 ♡：默认描边，点击填充主色 + anime pop；状态存内存（刷新重置，符合纯静态）。
- hover：anime spring 上浮 -8px + scale 1.02 + 阴影增强；emoji 轻微放大。
- 卡片入场：stagger spring（opacity/translateY/scale/rotate），emoji 单独 pop。

### 4.5 弹窗 `.modal`
- 背景遮罩 `rgba(74,59,53,0.45)` + blur(3px)。
- 卡片 max-width 560px，max-height 85vh，圆角 24px，右侧超细滚动条（沿用现有克制方案）。
- 头部：分类 badge（主色 pill）+ 标题 + 元信息行。
- 身体：食材（网格 chip）+ 做法（有序列表）+ 小贴士（左色条卡片）。
- 开合：timeline（遮罩淡入 → 卡片 spring 缩放 → 头部/身体/关闭按钮 stagger 渐入）；关闭 easeInQuart 收。

### 4.6 滚动条（全局 + 弹窗）
- 宽 5px，轨道透明，滑块 `rgba(255,122,89,0.3)`，hover `0.5`。克制、不抢戏。

---

## 5. 交互动效规范（anime.js 参数）

| 场景 | 目标 | 参数 |
|---|---|---|
| 卡片入场 | `.recipe-card` | `opacity[0→1], translateY[36→0], scale[0.94→1], rotate[-1→0]`, `delay: stagger(80)`, `easing: spring(1,75,14,0)` |
| emoji pop | `.card-emoji` | `scale[0→1.2→1], rotate[-30→10→0]`, `stagger(80,{start:200})`, `spring(1,70,10,0)` |
| 卡片 hover | `.recipe-card` | `translateY:-8, scale:1.02`, `boxShadow → hover`, `400ms`, `spring(1,80,12,0)` |
| 分类点击 | `.filter-btn` | `scale[1→0.92→1]`, `400ms`, `spring(1,80,12,0)` |
| 弹窗开 | 遮罩/卡/头体 | timeline：`backdrop 250ms linear` → `card spring(1,70,12,0) 700ms` → `头/体/关闭 stagger(80) spring` |
| 弹窗关 | 卡/遮罩 | `opacity→0, translateY:30, scale:0.9`, `easeInQuart 350ms` 后 `display:none` |
| 收藏点击 | ♡ | `scale[1→1.3→1]`, `300ms`, `spring` |

**降级**：`typeof anime === 'undefined'` 时，所有动画跳过，内容直接可见（不白屏、不卡住）。
**无障碍**：`prefers-reduced-motion: reduce` 时关闭 anime，仅保留瞬时状态切换。

---

## 6. 响应式

| 断点 | 列数 | 导航 | 备注 |
|---|---|---|---|
| ≥1024 | 3–4 列 | 完整（logo+搜索+头像） | 容器 max 1100px |
| 640–1023 | 2 列 | 完整，搜索收窄 | — |
| <640 | 1 列 | logo + 全宽搜索，头像隐藏 | hero 高度 280px，卡片图区更方 |

---

## 7. 数据约定（开发须知）
- 菜谱数据在 `script.js` 的 `recipes` 数组，字段：`id, title, emoji, category, categoryLabel, time, difficulty, ingredients[], steps[], tip`。
- 分类 chip **根据 recipes 实际出现的 category 动态生成**（避免空分类）。
- 新增菜只需往数组 push，无需改结构。

---

## 8. 开发验收清单
- [ ] 顶部导航 sticky + 半透明毛玻璃，含 logo / 搜索 / 头像占位。
- [ ] 搜索框实时按标题过滤（输入即筛，无结果显空态）。
- [ ] Hero 用 provided 插画 + 底部渐变压暗 + 标题/标签入场动画。
- [ ] 分类 chip 动态生成、激活态、点击 spring 回弹。
- [ ] 卡片改为「照片区 + 标题 + 元信息 + 收藏」范式，分类渐变底生效。
- [ ] hover / 入场 / 弹窗 / 收藏 动画符合 §5 参数，且 anime 缺失可降级。
- [ ] 滚动条克制（5px、透明轨道）。
- [ ] 三档断点正常，移动端单列。
- [ ] 键盘可达（Enter/Space 开卡、Esc 关弹窗），focus 样式可见。
- [ ] 提交并部署 GitHub Pages，链接可访问。

---

## 9. 后续可扩展（不在本次范围）
- 收藏持久化（localStorage）。
- 菜谱详情独立页 / 路由。
- 时令食材圆图区、话题专题区（仿下厨房）。
- 真实菜品照片替换 emoji 图区。
