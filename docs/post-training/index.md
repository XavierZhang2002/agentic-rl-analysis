---
title: Post-Training 技术报告
description: 以后训练为中心的技术导读：一句话定位、三条阅读路径、章节地图与版本时效。
tags:
  - Post-Training
  - 导读
  - RLVR
---

# Post-Training 技术报告

<p class="byline">by <strong><a href="https://github.com/XavierZhang2002">zhenliang</a></strong> & <strong>opencode</strong> · 2026.03 初版 · 2026.11 校订</p>

!!! abstract "一句话定位"
    本报告回答一个具体问题：**后训练的能力从哪里来、成本花在哪里**——从 PPO 到 SAPO 的算法主线只是前半程，2026 年的胜负手已经转移到合并（OPD/MOPD）、一致性（MoE/QAT）与预算分配（rollout allocation）。

本页是导读，不承担方法论。三条路径互相独立，按角色选一条即可；每页开头都有摘要，时间有限时可以只读摘要与表格。

## 一、三条阅读路径

### A 算法线：信任域怎么演进（约 90 分钟）

[2.1 PPO](ch2/2.1-ppo.md) → [2.2 GRPO](ch2/2.2-grpo.md) → [2.3 DAPO](ch2/2.3-dapo.md) → [2.4 VAPO](ch2/2.4-vapo.md) → [2.5 CISPO/GSPO](ch2/2.5-cispo-gspo.md) → [2.6 SAPO](ch2/2.6-sapo.md) → [2.7 新解法](ch2/2.7-trust-region-2026.md)

**产出**：能画出"硬裁剪 → 裁权重 → 序列级 → 软门控 → 散度/listwise"的谱系，并对给定模型规模与架构选出训练方案。

### B 机制线：为什么跑不起来（约 120 分钟）

[1.3 流程范式](ch1/1.3-pipeline-paradigms.md)、[1.4 奖励设计](ch1/1.4-reward-lineage.md) → [3.1 预算分配](ch3/3.1-rollout-allocation.md)、[3.2 稠密信号](ch3/3.2-dense-signal.md)、[3.3 合并](ch3/3.3-merging-opd-mopd.md) → [4.1 数据](ch4/4.1-data-engineering.md)、[4.2 环境](ch4/4.2-environment.md)、[4.3 一致性](ch4/4.3-infra-consistency.md)、[4.4 验证器](ch4/4.4-verifier-failures.md)

**产出**：能写出一条 3–5 阶段的 pipeline，并附带数据、环境、一致性、验证器四张验收清单。

### C 厂商线：证据与成本结构（约 60 分钟，精读 3 家）

[5.1 DeepSeek](ch5/5.1-deepseek.md) → [5.2 Kimi](ch5/5.2-kimi.md) → [5.3 Qwen](ch5/5.3-qwen.md) → [5.4 MiniMax](ch5/5.4-minimax.md) → [5.5 GLM](ch5/5.5-glm.md) → [5.6 Seed](ch5/5.6-seed.md) → [5.7 LongCat](ch5/5.7-longcat.md) → [5.8 Ling/Ring](ch5/5.8-ling-ring.md) → [5.9 闭源](ch5/5.9-closed-source.md)

**产出**：能填出一张"模型 → 阶段数 → 算法 → 合并/一致性/异步 → 成本"的对照表，并判断哪些做法可复现。

!!! tip "阅读约定"
    正文中的「2026」指 2026-01 至 2026-11；披露不足的模型统一写"未披露"，不做推测；个人判断集中在 [6.3](ch6/6.3-timeline-opinions.md)。

## 二、章节地图

| 章 | 页 | 关键词 | 入口 |
|---|---|---|---|
| 第 1 章 基础 | 1.1–1.4 | 训练全景、RLHF/RLVR、流程范式、奖励谱系 | [1.1](ch1/1.1-training-landscape.md) |
| 第 2 章 算法主线 | 2.1–2.7 | 信任域与目标函数：PPO → SAPO → DPPO/TRM/LPO | [2.1](ch2/2.1-ppo.md) |
| 第 3 章 训练经济学 | 3.1–3.3 | 预算分配、免 Critic 稠密信号、OPD/MOPD | [3.1](ch3/3.1-rollout-allocation.md) |
| 第 4 章 数据与环境 | 4.1–4.4 | 数据工程、环境工程、基础设施一致性、验证器 | [4.1](ch4/4.1-data-engineering.md) |
| 第 5 章 厂商档案 | 5.1–5.9 | DeepSeek / Kimi / Qwen / MiniMax / GLM / Seed / LongCat / Ling / 闭源 | [5.1](ch5/5.1-deepseek.md) |
| 第 6 章 全景与趋势 | 6.1–6.3 | 技术报告全景、跨模型共识、时间线与判断 | [6.1](ch6/6.1-overview-2026.md) |
| 附录 A | A | 算法公式速查（含 2026 算法） | [附录 A](appendix/a-cheatsheet.md) |

## 三、时效与版本

!!! note "覆盖范围"
    内容覆盖至 **2026-11**（最新条目为 2026-11-16 的 Qwen4-Max）；披露分级见 [6.1](ch6/6.1-overview-2026.md)，版本差异、勘误与后续计划见 [更新日志](../changelog.md)。
