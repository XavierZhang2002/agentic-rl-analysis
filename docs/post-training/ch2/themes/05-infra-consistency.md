---
title: 2.5 RL 基础设施与一致性：五个框架、六个机制
description: 2026 年 Agentic RL 的基础设施已形成一套规范：TITO、双侧 IS、partial rollout、有界 staleness、全流程 QAT、微虚机环境。本节对比 Forge / Slime / DORA / ASystem / QwenGyre 五个框架。
tags:
  - 基础设施
  - 异步 RL
  - TITO
  - QAT
  - 2026
---

# 2.5 RL 基础设施与一致性

!!! abstract "本节摘要"
    2026 年，"基础设施"不再是算法之外的东西——它就是算法能不能跑起来的前提。头部厂商的框架在六个机制上高度收敛：**TITO、双侧 token 级 IS、partial rollout、有界 staleness、全流程 QAT、微虚机环境**。本节对比五个框架，并给出"自研还是用开源"的判断依据。

---

## 一、六个已收敛的机制

### 1. TITO（Token-in-Token-out）

**问题**：推理引擎把 token 解码成文本，训练侧再 encode 回去，会在 token 边界、空白/归一化、截断、特殊 token 位置上产生细微错位——**污染单 token 概率估计**，而且不报错。

**做法**：训练侧直接消费推理引擎的 token id 流，中间件记录 token 与元数据。

**代表**：GLM-5 的 TITO Gateway；Kimi K3 的引擎侧直接对接。

### 2. 双侧 token 级 IS + clip

异步下，一条轨迹生成期间推理引擎可能已更新多次，无法追踪历史策略。做法是**丢弃 $\pi_{\theta_{\text{old}}}$**，用 rollout 期间的对数概率作行为代理：

$$
r_t(\theta) = \frac{\pi_\theta(y_t)}{\pi_{\text{rollout}}(y_t)}, \qquad \text{mask}_t = \mathbb{1}\left[r_t \in [1-\varepsilon_l,\ 1+\varepsilon_h]\right]
$$

区间外**整 token 屏蔽梯度**。代表：GLM-5、SAO（[2607.07508](https://arxiv.org/abs/2607.07508)）。

### 3. Partial rollout + 有界 staleness

- **Partial rollout**：一条长轨迹不必一次性跑完，可以按 token 预算切片，边生成边训练。
- **有界 staleness**：`max_staleness × consumer_batch_size` 作为上界；超出即丢弃。
- **代表**：Ling/Ring 的 ASystem（全局 token 预算 $\Phi$ 门控）；Kimi K3 的 partial rollout。

### 4. 全流程 QAT

训练侧与 rollout 侧用**同一套量化**，把"训推不一致"从源头消除：

- **Kimi K3**：MXFP4 权重 / MXFP8 激活，贯穿 SFT 与 RL。
- **TRACE**（[2610.07767](https://arxiv.org/abs/2610.07767)，Qwen）：用 rollout 侧真实量化结果反向指导训练侧舍入，rollout 最高 **5.4×**。

### 5. 调度与合并

- **Prefix-tree merging**：同一 prompt 的多条 rollout 共享前缀，合并后 40× 加速（Forge）。
- **Windowed FIFO**：`W=0.3N` 的窗口，在吞吐与分布一致性之间取参（Forge）。
- **PD 分离 + MTP + 全局 L3 KV cache**：降低多轮解码延迟（Slime）。

### 6. 环境执行层

- **微虚机**：Kimi K3 的 AgentENV（Firecracker），checkpoint/resume **133/49 ms**，累计 5,121 万 sandbox。
- **容器化**：GLM-5 的 Terminal 任务用 Harbor 格式，Docker 构建精度 >90%。

## 二、五个框架对比

| 框架 | 厂商 | 核心设计 | 公开数字 |
|---|---|---|---|
| **Forge** | MiniMax | Agent/Gateway+DataPool/Rollout+Train 三模块解耦 | 10 万+ scaffold；prefix merge 40×；日处理百万级样本 |
| **Slime** | GLM | SGLang 生成 + Megatron 训练；TITO；心跳容灾 | 1K+ 并发 rollout；INT4 QAT |
| **DORA** | LongCat | 全流式异步 | request load ratio **63%**；比同步快 **2–4×**（官方承认是控 staleness 的代价） |
| **ASystem** | Ling / Ring | partial rollout + 有界 stale | 吞吐接近异步、稳定性等同同步 |
| **QwenGyre** | Qwen | 弹性 GPU 重分配 + 轨迹重建/部分打分/去重 | 700K token/rollout；48 步 NL2Repo 52.5%→58.5%；**1.78×** 加速 |
| verl / TRL | 开源社区 | 通用 RL 框架；DPPO、GSPO 等已有实现 | 生态最广，但异步/一致性需自己补 |

!!! note "一个反直觉的数字"
    LongCat 的 DORA 把 request load ratio 压到 **63%**——意味着它主动放弃了 37% 的吞吐，换取 staleness 可控。**异步不是"越快越好"，而是"在一致性约束下尽量快"。**

## 三、自研还是用开源

| 你的情况 | 建议 |
|---|---|
| 单机 8 卡以内、同步训练 | verl / TRL 足够，别自研 |
| 多机、需要 MoE + 异步 | 在 verl 上补 TITO 与双侧 IS，不必重写 |
| 有超长轨迹（agent、1M 上下文） | 需要 partial rollout + 微虚机，考虑自研或改 Kimi 的 AgentENV |
| 需要训推量化一致 | 必须有 QAT 支持；开源框架这块普遍弱 |
| 团队 <5 人 | 用开源，把精力放在数据与环境上 |

## 四、五个"必须有"的监控指标

1. **训推 logprob 偏差**：同一批样本在 rollout 引擎与训练引擎上的 logprob 差（应接近 0）。
2. **staleness 分布**：不是平均值，是 P99——长尾决定稳定性。
3. **clip 命中率**：token 级被屏蔽的比例；过高说明策略漂移快。
4. **环境失败率**：因环境问题（非模型）失败的样本占比；超过 5% 就要查环境。
5. **有效样本率**：一轮 rollout 中真正进入训练的样本比例。

## 开放问题

1. **异步的理论边界**：staleness 多大仍然"等价于同步"？目前只有经验值。
2. **框架的可移植性**：五个框架都是自研，社区无法复现；是否会出现统一抽象？
3. **成本**：微虚机 + 1M 上下文的单样本成本是多少？公开报告几乎不谈钱。

## 参考资料

- **Forge**：[MiniMax 技术博客](https://www.minimax.io/blog/forge-scalable-agent-rl-en-1779896141)
- **Slime / GLM-5**：[2602.15763](https://arxiv.org/abs/2602.15763)
- **DORA / LongCat**：[2601.16725](https://arxiv.org/abs/2601.16725)
- **ASystem / Ling-Ring 2.6**：[2606.15079](https://arxiv.org/abs/2606.15079)
- **QwenGyre**：[2609.33848](https://arxiv.org/abs/2609.33848) · **TRACE**：[2610.07767](https://arxiv.org/abs/2610.07767)
- **Kimi K3**：[技术报告](https://github.com/MoonshotAI/Kimi-K3)
- **相关章节**：[1.15 一致性与验证器](../../ch1/1.15-consistency-and-verifier.md) · [2.6 失败模式](./06-failure-modes.md)
