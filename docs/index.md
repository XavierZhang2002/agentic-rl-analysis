---
title: 首页
description: LLM Post-Training 与 Agentic RL 研究知识库
---

# LLM Post-Training 与 Agentic RL 研究

**作者**: Xavier | **最后更新**: 2026-03-17

---

本知识库包含两份独立但互补的技术报告，系统梳理大语言模型后训练（Post-Training）与 Agentic 强化学习的算法原理、工业实践与发展方向。

## 📚 Post-Training 技术报告

覆盖大语言模型后训练的完整技术栈：

- **第一章**: [算法与基本原理](./post-training/01-算法与基本原理.md) — RLHF 与 RLVR 两大范式，PPO/GRPO/DAPO/VAPO/CISPO/GSPO/SAPO 算法详解
- **第二章**: [技术报告解读与训练经验](./post-training/02-技术报告解读与训练经验.md) — DeepSeek-R1/V3、Qwen3、Kimi K2、GLM-5 等 10+ 模型的 Post-Training 实践
- **第三章**: [发展路线与方向思考](./post-training/03-发展路线与方向思考.md) — 范式演变、核心挑战、未来展望与个人观点

**核心论文索引**: 包含 mid-training survey (arXiv:2510.23081)、post-training survey (arXiv:2503.06072) 及 2025-2026 主流算法和技术报告 arXiv ID。

---

## 🤖 Agentic RL 调研报告

聚焦多轮交互、工具使用、长程规划场景的强化学习算法：

- **第一篇**: [算法与关键技术](./agentic-rl/01-算法与关键技术.md) — 四大核心挑战（奖励信号 68%、训练稳定性 53%、探索效率 44%、信用分配 44%）及对应算法
- **第二篇**: [综合分析与展望](./agentic-rl/02-综合分析与展望.md) — 技术路线、产业观察、个人观点与未来预测

**核心发现**: SeeUPO（首个 multi-turn 收敛保证）、EMPO²（记忆增强探索 +128.6%）、ARLArena（系统稳定性框架）。

---

## 📄 PDF 版本

由于 Markdown 对 LaTeX 公式的渲染支持有限，本知识库同时提供 PDF 版本以便更好地阅读数学公式：

- **Post-Training 报告**: [pdfs/post-training-report/](./pdfs.md#post-training-报告)
- **Agentic RL 报告**: [pdfs/agentic-rl-report/](./pdfs.md#agentic-rl-报告)

PDF 使用 pandoc + xelatex 生成，支持中文（PingFang SC 字体）。

---

## 快速导航

<div class="grid" markdown>

<div class="grid-item" markdown>
### 🎯 快速了解
- [Post-Training 概述](./post-training/index.md)
- [Agentic RL 概述](./agentic-rl/index.md)
- [第二章：技术报告解读](./post-training/02-技术报告解读与训练经验.md) — 工业实践
</div>

<div class="grid-item" markdown>
### 📊 深入算法
- [第一章：算法与基本原理](./post-training/01-算法与基本原理.md) — 六大算法详解
- [第一篇：Agentic RL 算法](./agentic-rl/01-算法与关键技术.md) — 四大挑战
</div>

<div class="grid-item" markdown>
### 🔮 未来方向
- [第三章：发展路线与方向思考](./post-training/03-发展路线与方向思考.md)
- [第二篇：综合分析与展望](./agentic-rl/02-综合分析与展望.md)
</div>

</div>

---

**License**: MIT | **维护者**: Xavier Zhang