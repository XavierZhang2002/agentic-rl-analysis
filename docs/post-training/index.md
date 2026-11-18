---
title: Post-Training 技术报告
description: 章节索引与内容覆盖范围。
---

# Post-Training 技术报告

<p class="byline">by <strong><a href="https://github.com/XavierZhang2002">zhenliang</a></strong> & <strong>opencode</strong> · 2026.03 初版 · 2026.11 校订</p>

!!! abstract "一句话定位"
    本报告回答一个具体问题：**后训练的能力从哪里来、成本花在哪里**——从 PPO 到 SAPO 的算法主线只是前半程，2026 年的胜负手已经转移到合并（OPD/MOPD）、一致性（MoE/QAT）与预算分配（rollout allocation）。

## 一、章节地图

| 章 | 页 | 关键词 | 入口 |
|---|---|---|---|
| 第 1 章 基础 | 1.1–1.4 | 训练全景、RLHF/RLVR、流程范式、奖励谱系 | [1.1](ch1/1.1-training-landscape.md) |
| 第 2 章 算法主线 | 2.1–2.7 | 信任域与目标函数：PPO → SAPO → DPPO/TRM/LPO | [2.1](ch2/2.1-ppo.md) |
| 第 3 章 训练经济学 | 3.1–3.3 | 预算分配、免 Critic 稠密信号、OPD/MOPD | [3.1](ch3/3.1-rollout-allocation.md) |
| 第 4 章 数据与环境 | 4.1–4.4 | 数据工程、环境工程、基础设施一致性、验证器 | [4.1](ch4/4.1-data-engineering.md) |
| 第 5 章 厂商档案 | 5.1–5.9 | DeepSeek / Kimi / Qwen / MiniMax / GLM / Seed / LongCat / Ling / 闭源 | [5.1](ch5/5.1-deepseek.md) |
| 第 6 章 全景与演进 | 6.1–6.2 | 技术报告全景与披露分级、时间线、五代范式、2025/2026 对比维度 | [6.1](ch6/6.1-overview-2026.md) |
| 附录 A | A | 算法公式速查（含 2026 算法） | [附录 A](appendix/a-cheatsheet.md) |

## 二、覆盖范围

!!! note "范围与约定"
    内容覆盖至 **2026-11**（最新条目为 2026-11-16 的 Qwen4-Max），披露分级见 [6.1](ch6/6.1-overview-2026.md)。正文中的「2026」指 2026-01 至 2026-11；披露不足的模型统一写"未披露"，不做推测。
