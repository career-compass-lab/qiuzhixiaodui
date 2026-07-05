# 求职小队 - 职业优势与倾向测评

> 基于 AI 的职业规划测评小程序，**免费测评 → 引导加企业微信 → 私域沉淀**的完整闭环。

## 📋 项目简介

本项目是一个移动端 H5 应用，模拟 [manyanyueli.com](https://manyanyueli.com/) 的产品形态，
做的是 **"AI 驱动的职业优势与倾向测评"**，用户完成 50 题测评后查看雷达图与基础摘要，
**解锁完整报告需要添加企业微信**，作为求职服务机构的私域引流工具。

## ✨ 功能特性

- 📱 **手机号登录**（短信验证码，开发环境固定 `123456`）
- 📝 **50 题四选一测评**（7 大职业能力维度）
- 📊 **雷达图可视化**（HTML5 Canvas 自绘）
- 🤖 **AI 报告生成**（支持 DeepSeek API，可降级到本地模板）
- 🔐 **加企微解锁完整报告**（核心转化点）
- 🎨 **移动端 H5 体验**（antd-mobile + 响应式设计）

## 🏗️ 技术栈

| 层级 | 选型 |
|---|---|
| 前端框架 | React 18 + Vite |
| 路由 | React Router 7 |
| UI 库 | antd-mobile 5 |
| HTTP | Axios |
| 后端 | Node.js + Express |
| 数据库 | SQLite (better-sqlite3) |
| AI 模型 | DeepSeek API（可选）|

## 📁 目录结构

```
qiuzhi-xiaodui/
├── src/
│   ├── pages/
│   │   ├── Portal.jsx        # 首页（品牌+登录+评价+关注区）
│   │   ├── Survey.jsx        # 答题页（50题四选一）
│   │   └── Result.jsx        # 结果页（雷达图+摘要+解锁）
│   ├── data/
│   │   └── questions.js      # 50道题目 + 7个维度定义
│   ├── api/
│   │   └── index.js          # Axios 封装
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── index.js              # Express 后端
│   ├── .env                  # 环境变量（DeepSeek API Key）
│   └── data.db               # SQLite 数据库（运行时生成）
└── package.json
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
cd server && npm install && cd ..
```

### 2. 启动后端（端口 3001）

```bash
npm run dev:server
```

### 3. 启动前端（端口 3000）

```bash
npm run dev
```

### 4. 一键启动（同时跑前后端）

```bash
npm run dev:all
```

### 5. 访问

打开浏览器（推荐 Chrome 移动端模拟器）：

```
http://localhost:3000
```

## 📱 使用流程

1. 打开首页 → 输入手机号 → 输入验证码（**123456**）→ 点击「开始测评」
2. 进入答题页 → 依次回答 50 题（四选一）
3. 完成最后一题 → 跳转到结果页
4. 看到基础摘要 + 雷达图
5. 点击「我已添加，解锁完整报告」→ 查看 AI 生成的完整报告

## 🔧 配置

### DeepSeek API（可选）

在 `server/.env` 中配置：

```bash
DEEPSEEK_API_KEY=your-api-key
```

> 不填则使用本地预制模板生成报告（已包含完整的文案与建议）。

### 替换企业微信二维码

将你的企业微信二维码图片放在 `public/qrcode.png`，然后修改 `src/pages/Portal.jsx` 和 `src/pages/Result.jsx`：

```jsx
// 替换 <div className={styles.qrBox}>...</div>
<img src="/qrcode.png" alt="企业微信" className={styles.qrImage} />
```

并更新对应 CSS 让图片有合适的尺寸。

### 修改题目与维度

编辑 `src/data/questions.js`：
- `dimensions` 数组：修改维度定义（key、label、desc）
- `questions` 数组：修改/添加题目（每题 4 个选项，1-5 分）

> ⚠️ 题目数量需要同步更新 `Result.jsx` 中的进度条和题号显示。

## 🌐 部署方案

### 方案一：单服务器部署（推荐新手）

1. 购买阿里云/腾讯云轻量应用服务器（约 ¥50/月）
2. 安装 Node.js 环境
3. 上传代码，执行 `npm run build` 生成静态文件
4. 用 `pm2` 或 `nohup` 启动后端服务
5. 用 Nginx 反向代理 + 静态文件托管

### 方案二：Serverless 部署（推荐上线）

- **前端**：Vercel / Cloudflare Pages（免费）
- **后端**：阿里云函数计算 / 腾讯云 CloudBase（按调用付费）
- **数据库**：腾讯云开发 CloudBase / 阿里云表格存储
- **AI**：DeepSeek API（按 token 付费）

### 方案三：纯静态 + 第三方 BaaS

- **前端**：Vercel/Netlify 部署静态文件
- **后端能力**：使用 Supabase / LeanCloud 提供登录与数据存储
- **AI**：DeepSeek API

## 📊 7 大测评维度

| 维度 | 描述 |
|---|---|
| 学习能力 | 快速学习新知识和技能的能力 |
| 沟通表达 | 清晰传达信息与有效倾听的能力 |
| 抗压韧性 | 面对压力与挫折时的应对能力 |
| 执行力 | 将计划转化为行动与结果的能力 |
| 团队协作 | 与他人高效合作达成目标的能力 |
| 创新思维 | 产生新想法与创造性解决问题的能力 |
| 领导潜力 | 影响他人、统筹全局的潜在能力 |

## 📞 联系方式

- 项目维护：求职小队
- 部署问题：参考部署方案文档
- 商务合作：扫码添加企业微信（首页和结果页均可扫码）

---

**注意**：本项目为演示版本，请根据实际需求进行二次开发。
