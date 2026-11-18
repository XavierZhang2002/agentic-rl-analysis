---
title: LLM Post-Training 与 Agentic RL 研究
description: 系统梳理大语言模型后训练与 Agentic RL 的算法原理、工业实践与前沿方向
hide:
  - navigation
tags:
  - 首页
  - Post-Training
  - Agentic RL
---

# LLM Post-Training 与 Agentic RL 研究

<p class="byline">by <strong><a href="https://github.com/XavierZhang2002">zhenliang</a></strong> & <strong>opencode</strong> · 2026.03 初版 · 2026.11 校订 · 基于 70+ 篇论文与 16 份模型技术报告</p>

!!! note "内容覆盖"
    算法部分覆盖 PPO → SAPO（2025.11），模型部分覆盖至 **2026.03**；2026 Q2–Q4 的模型与算法更新正在补充，详见 [更新日志](./changelog.md)。

---

<div class="grid cards" markdown>

-   :material-flask:{ .lg .middle } **Post-Training 技术报告**

    ---

    从 PPO 到 SAPO 的算法演进，DeepSeek / Qwen / Kimi / GLM-5 等主流模型的训练实践，以及行业共识与个人思考。

    - 7 种核心算法的公式推导与对比
    - 6 大模型系列的 Post-Training 深度解读
    - 6 大行业共识 · 5 大核心挑战 · 9 条个人观点

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

    [:octicons-arrow-right-24: 技术演进时间线](./post-training/ch3/3.1-timeline-paradigms.md)

-   :material-chart-bar: **深入算法**

    ---

    [:octicons-arrow-right-24: GRPO → SAPO 六大算法](./post-training/ch1/1.5-grpo.md)

    [:octicons-arrow-right-24: Agentic RL 算法](./agentic-rl/ch1/1.1-overview.md)

-   :material-office-building: **工业实践**

    ---

    [:octicons-arrow-right-24: 跨模型训练经验](./post-training/ch2/2.8-cross-model.md)

    [:octicons-arrow-right-24: 行业共识与挑战](./post-training/ch3/3.2-challenges-future.md)

</div>
