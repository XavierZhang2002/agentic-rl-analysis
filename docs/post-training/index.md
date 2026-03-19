---
title: Post-Training 技术报告
description: 系统梳理大语言模型后训练的算法原理、工业实践与未来方向
---

# LLM Post-Training 技术报告

!!! info "报告信息"
    **作者**: Xavier | **最后更新**: 2026-03-17  
    **定位**: 面向有一定机器学习基础的读者，系统梳理大语言模型后训练（Post-Training）的算法原理、工业实践与未来方向

---

## 报告结构

<div class="grid cards" markdown>

-   :material-flask: **1. 算法基础**

    ---

    从大模型训练全景出发，深入 Post-Training 的两大范式与主流算法

    - 大模型训练全景（Pre/Mid/Post-Training）
    - RLHF 与 RLVR 两大范式对比
    - GRPO → DAPO → VAPO → CISPO → GSPO → SAPO 六大算法
    - 全部算法公式速查表与演进逻辑

    [:octicons-arrow-right-24: 开始阅读](./ch1/1.1-training-landscape.md)

-   :material-office-building: **2. 技术报告深度解读**

    ---

    聚焦 2025-2026 年主流大模型技术报告的深度解读

    - DeepSeek-R1/V3、Qwen3、Kimi K1.5/K2
    - Seed1.5-Thinking、LLaMA 3.1/4、GLM-5
    - Gemini 2.5、OpenAI o 系列
    - 9 条跨模型训练经验总结

    [:octicons-arrow-right-24: 开始阅读](./ch2/2.1-deepseek.md)

-   :material-crystal-ball: **3. 演进路线与趋势展望**

    ---

    技术演进的宏观分析与个人思考

    - 从 InstructGPT 到 Agentic RL 的三年时间线
    - 四代范式演变（SFT-Only → RLHF → RLVR → Agentic RL）
    - 六大行业共识与五大核心挑战
    - 9 条个人观点与分析（💭 标记）

    [:octicons-arrow-right-24: 开始阅读](./ch3/3.1-timeline-paradigms.md)

</div>

---

!!! tip "阅读建议"
    - **快速了解全貌**: 阅读本页 + [1.1 大模型训练全景](./ch1/1.1-training-landscape.md) + [1.2 两大范式](./ch1/1.2-rlhf-rlvr.md) + [3.1 时间线](./ch3/3.1-timeline-paradigms.md)
    - **深入算法细节**: [1.5 GRPO](./ch1/1.5-grpo.md) → [1.10 SAPO](./ch1/1.10-sapo.md) 六大算法（含完整公式推导和 📖 初学者补充）
    - **了解工业实践**: 第二章各模型解读 + [2.8 跨模型经验总结](./ch2/2.8-cross-model.md)
    - **把握未来方向**: [3.1 范式变迁](./ch3/3.1-timeline-paradigms.md) + [3.2 共识与挑战](./ch3/3.2-challenges-future.md) + [3.3 个人分析](./ch3/3.3-opinions.md)（💭 标记）

---

*本报告基于截至 2026 年 3 月的公开论文和技术博客撰写。*
