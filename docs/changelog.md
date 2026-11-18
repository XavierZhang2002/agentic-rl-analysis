---
title: 更新日志
description: 本技术报告的版本记录、内容覆盖范围与后续更新计划。
tags:
  - 更新日志
  - 版本
---

# 更新日志

<p class="byline">当前版本 <strong>v1.1</strong> · 最近校订 2026-11-18</p>

---

## 内容覆盖范围

| 部分 | 覆盖区间 | 说明 |
|------|----------|------|
| 算法基础（ch1） | 2017 – 2025.11 | PPO → GRPO → DAPO → VAPO → CISPO → GSPO → SAPO |
| 模型解读（ch2） | 2024.12 – 2026.03 | DeepSeek V3/R1/V3.2、Kimi K1.5/K2/K2.5、Qwen2.5/3/3.5、MiniMax 01/M1/M2/M2.5/M2.7、GLM-5、Seed1.5/2.0 |
| Agentic RL | 2024.08 – 2026 Q1 | 47 篇论文 |
| 引用文献 | — | 75 篇 arXiv 论文，编号均经逐一校验可解析 |

!!! warning "关于时效性"
    模型部分的内容截至 **2026 年 3 月**。2026 Q2–Q4 的模型发布（DeepSeek-V4、Kimi K3、MiniMax M3、GLM-6 等）与算法进展**尚未纳入**，正在补充中。算法基础部分（ch1）讨论的是优化目标与信任域设计，属于相对稳定的内容，不受此影响。

---

## v1.1 — 2026-11-18

**校订与维护性更新**

- 🐛 修复 `3.2 行业共识与核心挑战` 结尾「挑战关系总览」的 Mermaid 关系图：原节点缺少 ID，在页面上会渲染为语法错误；同时修正正文中「MoE 不稳定」被误标为「挑战三」的编号错误
- 🔗 修复 GSPO 一节中失效的 AReaL 文档链接（上游路径已变更）
- 📊 统计口径更新：README 徽章由 `50+ Papers / 12+ Models` 修正为 `70+ Papers / 16 Model Reports`，与正文实际引用数量一致
- 📄 新增本页（更新日志），明确内容覆盖区间与更新计划
- 🔒 构建可复现：新增 `requirements.txt` 锁定 mkdocs-material / pymdown-extensions 版本，CI 改为按锁定版本安装，避免上游大版本升级导致站点构建失败

## v1.0 — 2026-03

- 首次发布：Post-Training 技术报告（3 章 14 节）+ Agentic RL 调研报告（2 章 7 节）
- 配套上线 GitHub Pages 站点与 GitHub Actions 自动部署

---

## 计划中

- [ ] **ch2 补写 2026 Q2–Q4**：DeepSeek-V4（2026.04）、MiniMax M3（2026.06）、GLM-6（2026.06）、Kimi K3（2026.07）等模型的后训练披露
- [ ] **ch1 补写 2026 年算法**：GTPO（turn-level 奖励分配，ACL 2026）、rollout allocation（Pilot-Commit 等）方向
- [ ] **ch3 时间线延伸**至 2026.11
- [ ] **2.7 闭源模型**更新：GPT-5.6 / Gemini 3.1 / Claude Opus 4.6 等可考证信息
- [ ] 英文摘要页（当前正文为中文）

!!! tip "勘误与建议"
    发现事实错误、失效链接或希望补充的方向，欢迎开 Issue 或直接提 PR。
