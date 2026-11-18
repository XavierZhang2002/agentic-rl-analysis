---
title: Post-Training 技术报告
description: 系统梳理大语言模型后训练的算法原理、工业实践与趋势展望
tags:
  - Post-Training
  - RLHF
  - RLVR
---

# Post-Training 技术报告

<p class="byline">by <strong><a href="https://github.com/XavierZhang2002">zhenliang</a></strong> & <strong>opencode</strong></p>

---

<div class="grid cards" markdown>

-   :material-flask:{ .lg .middle } **1. 算法基础**

    ---

    RLHF 与 RLVR 两大范式，PPO → GRPO → DAPO → VAPO → CISPO → GSPO → SAPO 的完整演进，含公式推导与初学者补充。

    [:octicons-arrow-right-24: 开始阅读](./ch1/1.1-training-landscape.md)

-   :material-office-building:{ .lg .middle } **2. 技术报告深度解读**

    ---

    DeepSeek R1/V3.2、Kimi K1.5/K2、Qwen3、MiniMax M1/M2.5、GLM-5、Seed1.5 等 6 大系列的训练策略与工程经验，附 10 条跨模型共性总结与数据工程专题。

    [:octicons-arrow-right-24: 开始阅读](./ch2/2.1-deepseek.md)

-   :material-crystal-ball:{ .lg .middle } **3. 演进路线与趋势展望**

    ---

    从 InstructGPT 到 Agentic RL 的四代范式变迁，6 大行业共识与 5 大核心挑战，9 条个人分析与思考。

    [:octicons-arrow-right-24: 开始阅读](./ch3/3.1-timeline-paradigms.md)

</div>

---

!!! tip "阅读建议"
    - **30 分钟了解全貌** — [1.1 训练全景](./ch1/1.1-training-landscape.md) + [1.2 两大范式](./ch1/1.2-rlhf-rlvr.md) + [3.1 时间线](./ch3/3.1-timeline-paradigms.md)
    - **深入算法** — [1.5 GRPO](./ch1/1.5-grpo.md) 到 [1.10 SAPO](./ch1/1.10-sapo.md)，六大算法逐篇阅读
    - **工业实践** — [2.8 跨模型经验](./ch2/2.8-cross-model.md) + [3.2 行业共识](./ch3/3.2-challenges-future.md)
