---
title: Agentic RL 调研报告
description: 多轮交互、工具使用、长程规划场景的强化学习算法研究
---

# Agentic RL 调研报告

<p class="byline">基于 47 篇论文（2024-2026 Q1）的系统性分析</p>

---

<div class="grid cards" markdown>

-   :material-flask: **1. 算法与核心挑战**

    ---

    从推理 RL 到 Agentic RL 的本质变化，四大核心挑战（奖励信号、训练稳定性、探索效率、信用分配）及代表性算法。

    [:octicons-arrow-right-24: 开始阅读](./ch1/1.1-overview.md)

-   :material-crystal-ball: **2. 全景分析与展望**

    ---

    2024-2026 领域时间线，三条技术路线对比，产业观察（落地产品、开源生态），6 条个人判断与未来预测。

    [:octicons-arrow-right-24: 开始阅读](./ch2/2.1-landscape.md)

</div>

---

## 与 Post-Training 报告的关系

| 内容 | Post-Training 报告 | 本报告 |
|------|-------------------|--------|
| GRPO/DAPO/VAPO 等基础算法 | 详细推导 | 简要引用 |
| 单轮推理 RL | 核心焦点 | 背景知识 |
| 多轮 Agentic RL | 趋势讨论 | **核心焦点** |
| 47 篇 Agentic 论文分析 | 未覆盖 | **核心内容** |

---

??? abstract "核心论文索引"

    | 算法 | arXiv | 核心贡献 | 影响力 |
    |------|-------|----------|--------|
    | GLM-5 | 2602.15763 | 异步 Agent RL 基础设施 | Tier 1 |
    | Kimi K2 | 2507.20534 | 大规模工具使用训练 | Tier 1 |
    | SeeUPO | 2602.06554 | 首个 multi-turn 收敛保证 | Tier 2 |
    | EMPO² | 2602.23008 | 记忆增强探索 +128.6% | Tier 2 |
    | ARLArena | 2602.21534 | 系统性稳定性分析框架 | Tier 3 |
    | ELPO | 2602.09598 | 二分搜索错误定位 | Tier 3 |
    | ProxMO | 2602.19225 | 语义邻近性软聚合 | Tier 3 |
    | VCPO | 2602.17616 | ESS 动态学习率 | Tier 3 |
    | IGPO | 2510.14967 | 信息增益内在奖励 | Tier 4 |
    | LUFFY | 2504.14945 | Off-policy 混合策略 | Tier 4 |
    | CM2 | 2602.12268 | 多维度 Checklist 奖励 | Tier 4 |

---

!!! tip "阅读建议"
    - **快速了解** — 本页 + [1.1 核心矛盾](./ch1/1.1-overview.md) + [2.2 个人观点](./ch2/2.2-outlook.md)
    - **深入算法** — [1.2 奖励与稳定性](./ch1/1.2-reward-stability.md) + [1.3 探索与信用分配](./ch1/1.3-exploration-credit.md)
    - **工程视角** — [1.4 工程实践](./ch1/1.4-engineering.md) + [2.1 产业观察](./ch2/2.1-landscape.md)
