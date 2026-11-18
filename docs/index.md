---
title: LLM Post-Training 与 Agentic RL 研究
description: 系统梳理大语言模型后训练与 Agentic RL 的算法原理、工业实践与前沿方向
hide:
  - navigation
---

# LLM Post-Training 与 Agentic RL 研究

<p class="byline">by <strong><a href="https://github.com/XavierZhang2002">zhenliang</a></strong> & <strong>opencode</strong> · 2026.03 初版 · 2026.11 重构 · 基于 100+ 篇论文与 18 个模型代</p>

!!! note "内容覆盖"
    **Post-Training 技术报告**覆盖至 2026 年 11 月（算法至 DPPO/TRM/LPO、模型至 DeepSeek-V4 / Kimi K3 / GLM-5.3 / MiniMax M3 / LongCat-2.5 / Qwen4-Max）；**Agentic RL 调研报告**覆盖至 2026 Q1。

---

<div class="grid cards" markdown>

-   :material-flask:{ .lg .middle } **Post-Training 技术报告**

    ---

    六章一体：从训练范式到算法主线，再到训练经济学、数据环境、厂商档案与趋势判断。

    - 2 大范式 · 6 条流程范式
    - 7 个算法的完整推导 + 信任域新解法
    - 预算分配 / 稠密信号 / OPD 合并
    - 数据与环境 · 基础设施 · 16 个失败模式
    - 9 家厂商档案 · 6 条共识与 5 个挑战

    [:octicons-arrow-right-24: 开始阅读](./post-training/index.md){ .md-button }

-   :material-robot:{ .lg .middle } **Agentic RL 调研报告**

    ---

    多轮交互、工具使用、长程规划场景下的 RL 算法设计，47 篇论文的系统性分析。

    - 四大核心挑战与对应算法方案
    - GLM-5 / Kimi K2 的 Agentic 工程实践
    - 技术路线分析 · 产业观察 · 未来预测

    [:octicons-arrow-right-24: 开始阅读](./agentic-rl/index.md){ .md-button }

</div>

---

<div class="grid cards" markdown>

-   :material-target: **快速入门**

    ---

    [:octicons-arrow-right-24: 训练全景与两大范式](./post-training/ch1/1.1-training-landscape.md)

    [:octicons-arrow-right-24: 演进时间线与五代范式](./post-training/ch6/6.2-evolution.md)

-   :material-chart-bar: **深入算法**

    ---

    [:octicons-arrow-right-24: 算法主线：PPO → SAPO](./post-training/ch2/2.1-ppo.md)

    [:octicons-arrow-right-24: 信任域的新解法](./post-training/ch2/2.7-trust-region-2026.md)

-   :material-office-building: **工业实践**

    ---

    [:octicons-arrow-right-24: 基础设施与一致性](./post-training/ch4/4.3-infra-consistency.md)

    [:octicons-arrow-right-24: 厂商档案总览](./post-training/ch5/5.1-deepseek.md)

</div>
