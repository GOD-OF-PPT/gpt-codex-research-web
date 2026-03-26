# GPT Codex Team 采购席位调研报告 - 演示网页

基于调研报告数据构建的 Next.js 演示网页，已部署至 Vercel。

**在线访问：** https://gpt-codex-research-web.vercel.app

**调研报告仓库：** https://github.com/GOD-OF-PPT/team-gpt-research

## 内容概览

- **结论摘要**：推荐采购方案（Business 45席，月度约 $2,000）
- **模型对比**：GPT-5.4 Pro / GPT-5.4 / GPT-5.3-Codex / GPT-5.4-mini / Claude 系列
- **采购方案**：三种方案对比 + 官方订阅 vs OpenRouter API 成本分析
- **限额风险**：充分性分析 + 内部实测数据 + 应对策略
- **常见问题**：Q1–Q4 折叠展开解答

## 技术栈

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Plus Jakarta Sans 字体
- 部署：Vercel

## 本地运行

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 数据来源

- OpenAI 官方定价页：https://developers.openai.com/codex/pricing
- Codex Rate Card：https://help.openai.com/en/articles/20001106-codex-rate-card
- GitHub Discussions #2251：社区使用限额反馈
- OpenRouter 实时抓取（2026年3月26日）
- 内部实测：全新 Business 账号5小时限额用例
