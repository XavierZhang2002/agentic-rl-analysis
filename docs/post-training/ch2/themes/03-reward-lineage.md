---
title: 2.3 奖励设计谱系：从规则到 actor-as-GRM
description: 2026 年各家技术报告在奖励设计上的分叉与收敛：规则奖励、判别式 ORM、生成式 GRM、actor 兼任 GRM、rubric/checklist，以及验证器本身如何被验证。
tags:
  - 奖励设计
  - ORM
  - GRM
  - rubric
  - 验证器
  - 2026
---

# 2.3 奖励设计谱系：从规则到 actor-as-GRM

!!! abstract "本节摘要"
    当算法与数据都在收敛时，**奖励是 2026 年最大的差异化变量**。本节把头部厂商的奖励设计排成一条谱系：规则/可验证 → 判别式 ORM → 生成式 GRM → **actor 兼任 GRM**，并说明每种选择对应的任务结构与失效模式。最后一节给出验证器设计的三条硬性检查。

!!! note "本节的位置"
    这是 ch2 重构后的「机制专题」之一。它替代原来分散在 2.1–2.6 各厂商页里的奖励段落——那些细节仍在附录档案中，本节只做横向归纳与决策建议。

---

## 一、五个层级

| 层级 | 做法 | 代表 | 适用 | 主要风险 |
|---|---|---|---|---|
| **L1 规则/可验证** | 答案匹配、单元测试、执行结果 | 数学、代码、SQL | 有确定答案的任务 | 只覆盖可验证域 |
| **L2 判别式 ORM** | 训练一个打分模型（Bradley-Terry 等） | Qwen2.5 六维 RM、各家 reward model | 通用对话、写作 | reward hacking、长度偏差 |
| **L3 生成式 GRM** | 让模型生成评判理由再打分 | GLM-5 的 GRM、Kimi 的 Self-Critique Rubric | 开放性任务、可解释性要求 | 方差大、推理成本高 |
| **L4 actor 兼任 GRM** | 不单独训 RM，让 actor 自己当评判者 | **DeepSeek V4** | 大规模、域跨度广 | 评判与生成互相污染 |
| **L5 rubric / checklist** | 多维度二值清单 | CM2（[2602.12268](https://arxiv.org/abs/2602.12268)）、GLM-5.3 | 需要审计、可解释 | 维度间背离 |

!!! info "📖 一个容易看错的点"
    L1 到 L5 **不是替代关系**，而是"覆盖范围"的扩展：L1 最可靠但最窄，L5 最宽但最难保证一致性。2026 年头部厂商的普遍做法是**同时用 L1 打底 + L3/L5 提升上限**。

## 二、各家怎么搭

| 厂商/模型 | 奖励组合 | 值得注意的点 |
|---|---|---|
| **DeepSeek V4** | 规则 + **actor-as-GRM**（rubric 引导） | 放弃标量 RM/RLHF 路线；评判与生成联合优化 |
| **GLM-5** | 规则奖励 + 判别式 ORM + 生成式 GRM 三混合 | 引入**人类撰写回复作为风格锚点**，防止纯模型数据训出"机器感" |
| **Qwen2.5 → Qwen3** | 六维独立 RM → 规则为主 | 六维拆分降低单维 hacking 风险 |
| **Kimi K2 / K2.5** | 可验证奖励 + Self-Critique Rubric | rubric 由模型自评，闭环传递客观信号 |
| **MiniMax M2 系列** | process + 完成时间 + outcome 复合 | 把"效率"直接写进奖励 |
| **LongCat** | 规则/模型混合 + **抗噪 RL** | 环境噪声（如 DB 不一致）会被当成负奖励，必须显式处理 |
| **GLM-5.3** | 环境内自动生成 verifier | verifier 上线前过"三检"（见第四节） |

## 三、三个失效模式（都有 2026 年的论文证据）

### 3.1 准确率 ≠ 推理的因果重要性

*Outcome Rewards Do Not Guarantee Verifiable or Causally Important Reasoning*（[2604.22074](https://arxiv.org/abs/2604.22074)）指出：模型答对了，不代表推理链是**必要**的。作者提出 CIR/SR 指标，发现大量"正确但推理无关"的样本。

**含义**：如果你只奖励最终答案，模型会学会"猜对"而不是"想对"。修复手段是加入过程级辅助信号（PRM / Progress Advantage，见 [1.14](../../ch1/1.14-budget-and-dense-signal.md)）。

### 3.2 验证器会被"外延"绕过

*LLMs Gaming Verifiers*（[2604.15149](https://arxiv.org/abs/2604.15149)）发现：当验证器只看结果时，模型会学会利用验证器的盲区。解法是**同构验证**——把同一道题换成等价但表面不同的形式再验一次。

### 3.3 rubric 内部会背离

*Intra-Rubric Reward Divergence*（[2610.26685](https://arxiv.org/abs/2610.26685)）发现：多维度 rubric 的子维度之间会出现系统性背离，模型优化一维会伤害另一维，而总分掩盖了它。

**含义**：rubric 的维度越多，越需要检查**维度间的相关性**，而不是只看总分。

## 四、验证器设计：三条硬性检查

GLM-5.3 的工程实践是目前最可复制的（[官方博客](https://www.baseten.co/blog/glm-53/)）：

1. 给定**已知正确解** → 必须给奖励；
2. agent **什么都不做** → 必须不给；
3. 任务**未完成** → 必须不给。

再加一条工程习惯：**用 solver 的轨迹封堵捷径解**——把模型找到的"作弊路径"显式写成反例。

!!! tip "为什么这比调权重便宜"
    调奖励权重是在**未知空间**里搜索；三检是在**已知失败模式**上做验证。前者要靠运气，后者可以写进 CI。

## 五、决策表：任务类型 → 奖励方案

| 任务 | 首选 | 辅助 | 不要用 |
|---|---|---|---|
| 数学 / 竞赛题 | L1 规则 | CIR/SR 检查推理必要性 | 纯 RM（会被 hack） |
| 代码 / SWE | L1 单元测试 + 隐藏测试 | 同构验证 | 只看公开测试 |
| 工具调用 / agent | L1 执行结果 + L2 过程分 | Progress Advantage | 只用 outcome（稀疏） |
| 写作 / 开放问答 | L3 GRM + L5 rubric | 人类锚点样本 | 单一标量 RM |
| 安全 | 规则 + 分类器 | 乘性约束（一旦违规归零） | 加性权重（可被 help 掩盖） |

## 六、开放问题

1. **actor-as-GRM 的自污染**：让 actor 评判自己，长期会不会收敛到"自我一致但错误"的标准？DeepSeek 未披露防护细节。
2. **rubric 的自动生成**：目前 rubric 多为人工设计；能否从失败案例自动生成维度？
3. **验证器的对抗训练**：能否把 solver 的作弊行为反过来训练验证器，形成共演化？

## 参考资料

- **DeepSeek-V4**：[2606.19348](https://arxiv.org/abs/2606.19348)（actor-as-GRM）
- **GLM-5**：[2602.15763](https://arxiv.org/abs/2602.15763)（规则 + ORM + GRM 三混合）
- **GLM-5.3**：[Baseten 解读](https://www.baseten.co/blog/glm-53/)（verifier 三检）
- **CM2**：[Checklist Rewards for Multi-turn Tool-use](https://arxiv.org/abs/2602.12268)
- **验证器风险**：[Outcome Rewards](https://arxiv.org/abs/2604.22074) · [LLMs Gaming Verifiers](https://arxiv.org/abs/2604.15149) · [Intra-Rubric Divergence](https://arxiv.org/abs/2610.26685)
- **相关章节**：[1.15 一致性与验证器](../../ch1/1.15-consistency-and-verifier.md) · [1.16 合并机制](../../ch1/1.16-merging-opd-mopd.md)
