---
title: Agentic RL 调研报告
description: 聚焦多轮交互、工具使用、长程规划场景的强化学习算法研究
---

# Agentic RL 调研报告

!!! info "报告信息"
    **作者**: Xavier | **最后更新**: 2026-03-17  
    **定位**: 面向有 RL 基础的读者，系统梳理 Agentic RL（多轮交互、工具使用、长程规划场景下的强化学习）的算法设计、核心挑战与发展方向  
    **数据来源**: 47 篇论文（2024-2026 Q1）的系统性分析

---

## 报告结构

<div class="grid cards" markdown>

-   :material-flask: **1. 算法与核心挑战**

    ---

    从推理 RL 到 Agentic RL 的本质变化，以及有影响力的算法介绍

    - 核心矛盾与四大挑战（奖励 68%、稳定性 53%、探索 44%、信用分配 44%）
    - 奖励信号：IGPO、CM2 及其他方案
    - 训练稳定性：SeeUPO、ARLArena/SAMPO、VCPO
    - 探索效率与信用分配：EMPO²、GiGPO、ELPO、ProxMO
    - Agentic 工程实践与算法速查

    [:octicons-arrow-right-24: 开始阅读](./ch1/1.1-overview.md)

-   :material-crystal-ball: **2. 全景分析与展望**

    ---

    主观评价、分析与未来展望

    - 2024-2026 领域发展时间线
    - 三条技术路线比较与分析
    - 产业观察：落地产品、开源生态、中美对比
    - 6 条个人核心判断（💭 标记）
    - 短期/中期/长期未来预测

    [:octicons-arrow-right-24: 开始阅读](./ch2/2.1-landscape.md)

</div>

---

## 与 Post-Training 报告的关系

!!! note "两份报告的定位"
    本报告聚焦 **Agentic RL 的专项算法和挑战**，是对 [Post-Training 技术报告](../post-training/index.md) 的补充。

| 内容 | Post-Training 报告 | 本报告 |
|------|-------------------|--------|
| GRPO/DAPO/VAPO 等基础算法 | 详细公式推导 | 简要引用 |
| 单轮推理 RL | 主要焦点 | 作为背景 |
| 多轮/Agentic RL | 第三章部分讨论 | **核心焦点** |
| 工业技术报告解读 | 10+ 模型深度解读 | GLM-5/Kimi K2 的工程实践 |
| 47 篇论文系统分析 | 未覆盖 | **核心内容** |

---

## 核心论文索引

| 算法 | arXiv | 核心贡献 | 影响力 |
|------|-------|----------|--------|
| SeeUPO | 2602.06554 | 首个 multi-turn 收敛保证 | Tier 2 |
| EMPO² | 2602.23008 | 记忆增强探索 +128.6% | Tier 2 |
| ARLArena | 2602.21534 | 系统性稳定性分析框架 | Tier 3 |
| IGPO | 2510.14967 | 信息增益内在奖励 | Tier 4 |
| GiGPO | — | 锚点状态分组 | Tier 4 |
| ELPO | 2602.09598 | 二分搜索错误定位 | Tier 3 |
| ProxMO | 2602.19225 | 语义邻近性软聚合 | Tier 3 |
| VCPO | 2602.17616 | ESS 动态学习率 | Tier 3 |
| LUFFY | 2504.14945 | Off-policy 混合策略 | Tier 4 |
| CM2 | 2602.12268 | 多维度 Checklist 奖励 | Tier 4 |
| GLM-5 | 2602.15763 | 异步 Agent RL 基础设施 | Tier 1 |
| Kimi K2 | 2507.20534 | 大规模工具使用训练 | Tier 1 |

---

!!! tip "阅读建议"
    - **快速了解**: 读本页 + [1.1 核心矛盾](./ch1/1.1-overview.md) + [2.2 个人观点](./ch2/2.2-outlook.md)
    - **深入算法**: [1.2 奖励与稳定性](./ch1/1.2-reward-stability.md) + [1.3 探索与信用分配](./ch1/1.3-exploration-credit.md)，每节聚焦一个挑战和对应的关键算法
    - **工程视角**: [1.4 工程实践](./ch1/1.4-engineering.md)（GLM-5/Kimi K2）+ [2.1 产业观察](./ch2/2.1-landscape.md)
    - **研究方向**: [2.1 技术路线分析](./ch2/2.1-landscape.md) + [2.2 未来预测](./ch2/2.2-outlook.md)

---

*本报告基于截至 2026 年 3 月的公开论文和技术博客撰写。*
