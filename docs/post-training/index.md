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

-   :material-flask: **第一章：算法与基本原理**

    ---

    从大模型训练全景出发，深入 Post-Training 的两大范式与主流算法

    - 大模型训练全景（Pre/Mid/Post-Training）
    - RLHF 与 RLVR 两大范式对比
    - GRPO → DAPO → VAPO → CISPO → GSPO → SAPO 六大算法
    - 全部算法公式速查表与演进逻辑

    [:octicons-arrow-right-24: 阅读第一章](./01-算法与基本原理.md)

-   :material-office-building: **第二章：技术报告解读与训练经验**

    ---

    聚焦 2025-2026 年主流大模型技术报告的深度解读

    - DeepSeek-R1/V3、Qwen3、Kimi K1.5/K2
    - Seed1.5-Thinking、LLaMA 3.1/4、GLM-5
    - Gemini 2.5、OpenAI o 系列
    - 9 条跨模型训练经验总结

    [:octicons-arrow-right-24: 阅读第二章](./02-技术报告解读与训练经验.md)

-   :material-crystal-ball: **第三章：发展路线与方向思考**

    ---

    技术演进的宏观分析与个人思考

    - 从 InstructGPT 到 Agentic RL 的三年时间线
    - 四代范式演变（SFT-Only → RLHF → RLVR → Agentic RL）
    - 核心技术挑战与未来发展方向
    - 6 条个人观点（💭 标记）

    [:octicons-arrow-right-24: 阅读第三章](./03-发展路线与方向思考.md)

</div>

---

!!! tip "阅读建议"
    - **快速了解全貌**: 阅读本页 + 第一章前两节（训练全景 + 两大范式）+ 第三章时间线
    - **深入算法细节**: 第一章第五至十节（GRPO → SAPO 六大算法，含完整公式推导和 📖 初学者补充）
    - **了解工业实践**: 第二章各模型解读 + 第十节跨模型经验总结
    - **把握未来方向**: 第三章的范式演变 + 发展方向 + 个人观点（💭 标记）

---

*本报告基于截至 2026 年 3 月的公开论文和技术博客撰写。*
