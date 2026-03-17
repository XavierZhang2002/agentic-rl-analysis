## 各算法公式详解与深度剖析

> **阅读说明**: 本章以初学者友好的方式，逐一推导每个算法的核心公式。涉及难以理解的概念时，会用 **「📖 初学者补充」** 模块单独讲解。所有公式符号遵循各算法原始论文惯例。

---

### 一、PPO — Proximal Policy Optimization

> **论文**: *Proximal Policy Optimization Algorithms* (Schulman et al., 2017)
> **地位**: 整条演进路线的起点，ChatGPT/InstructGPT 的核心算法

#### 1.1 核心思想

PPO 的目标是：在更新策略（policy）时，不要走得太远——既要改善策略，又要让新策略和旧策略保持"接近"（proximal）。它通过一个**裁剪的替代目标函数 (clipped surrogate objective)** 来实现这一点。

#### 1.2 核心公式

**PPO 目标函数**:

$$
\mathcal{J}_{\text{PPO}}(\theta) = \mathbb{E}_{q \sim P(Q),\, o \sim \pi_{\theta_{\text{old}}}(\cdot|q)} \left[ \frac{1}{|o|} \sum_{t=1}^{|o|} \min \left( r_t(\theta) \hat{A}_t, \; \text{clip}\big(r_t(\theta),\, 1-\varepsilon,\, 1+\varepsilon\big) \hat{A}_t \right) \right]
$$

其中：

- $r_t(\theta)$ 是**重要性采样比率 (importance sampling ratio)**：

$$
r_t(\theta) = \frac{\pi_\theta(o_t \mid q, o_{<t})}{\pi_{\theta_{\text{old}}}(o_t \mid q, o_{<t})}
$$

- $\hat{A}_t$ 是**优势函数 (advantage)**，由 GAE 估计（见下文）
- $\varepsilon$ 是裁剪超参数，通常取 $0.2$
- $\text{clip}(x, a, b) = \max(a, \min(x, b))$

---

> **📖 初学者补充：什么是策略（Policy）？**
>
> 在 RL 中，策略 $\pi_\theta$ 就是一个"决策规则"。对于 LLM 来说，策略就是模型本身——给定问题 $q$ 和已经生成的 token $o_{<t}$，策略输出下一个 token $o_t$ 的概率分布 $\pi_\theta(o_t \mid q, o_{<t})$。
>
> **训练目标**：调整模型参数 $\theta$，使得模型更倾向于生成高奖励的回答。

---

> **📖 初学者补充：什么是重要性采样比率 $r_t(\theta)$？**
>
> 在训练过程中，我们用**旧策略** $\pi_{\theta_{\text{old}}}$ 生成数据（采样 rollout），但要用这些数据去更新**新策略** $\pi_\theta$。由于数据来自旧策略而非新策略，直接用这些数据计算梯度会有偏差。
>
> $r_t(\theta)$ 就是用来矫正这个偏差的系数：
> - $r_t = 1$：新旧策略对这个 token 的评价一致
> - $r_t > 1$：新策略比旧策略更倾向于生成这个 token
> - $r_t < 1$：新策略降低了这个 token 的概率

---

> **📖 初学者补充：什么是优势函数 $\hat{A}_t$ ？为什么不直接用奖励？**
>
> 假设模型生成了一个回答并获得奖励 $R=0.8$。这个 0.8 是好是坏？没有参照物就无法判断。
>
> **优势函数** = "这个动作比平均水平好多少"：
> $$\hat{A}_t = Q(s_t, a_t) - V(s_t)$$
> - $Q(s_t, a_t)$：在状态 $s_t$ 下采取动作 $a_t$ 的预期总回报
> - $V(s_t)$：在状态 $s_t$ 下的平均预期回报（baseline）
>
> - $\hat{A}_t > 0$：这个动作超出预期，应该**鼓励**
> - $\hat{A}_t < 0$：这个动作低于预期，应该**抑制**

---

**PPO 使用 GAE (Generalized Advantage Estimation) 来计算优势函数**：

$$
\hat{A}_t^{\text{GAE}(\gamma, \lambda)} = \sum_{l=0}^{T-t-1} (\gamma \lambda)^l \, \delta_{t+l}
$$

其中 TD 误差 (temporal difference error)：

$$
\delta_l = R_l + \gamma \, V_\psi(s_{l+1}) - V_\psi(s_l)
$$

- $V_\psi$ 是**价值网络 (Critic)**，一个与策略模型同等规模的独立网络
- $\gamma$ 是折扣因子（LLM 场景通常取 $1.0$）
- $\lambda$ 控制偏差-方差权衡（通常取 $0.95$）

---

> **📖 初学者补充：什么是 GAE？为什么需要它？**
>
> 计算优势有两个极端方式：
> 1. **Monte Carlo（MC）**：用实际总回报减去 $V(s_t)$，无偏但**方差很大**（一个样本的随机性全部保留）
> 2. **TD(0)**：只看一步 $\delta_t = R_t + \gamma V(s_{t+1}) - V(s_t)$，方差小但**有偏**（依赖 $V$ 的准确性）
>
> GAE 通过参数 $\lambda$ 在两者之间插值：
> - $\lambda = 1$：等价于 MC（无偏高方差）
> - $\lambda = 0$：等价于 TD(0)（有偏低方差）
> - $\lambda = 0.95$：常用折中

---

**PPO 的 KL 惩罚**（用于防止策略偏离参考模型过远）：

$$
r_t^{\text{reward}} = r_\varphi(q, o_{\leq t}) - \beta \log \frac{\pi_\theta(o_t \mid q, o_{<t})}{\pi_{\text{ref}}(o_t \mid q, o_{<t})}
$$

其中 $r_\varphi$ 是奖励模型，$\pi_{\text{ref}}$ 是参考策略（通常为 SFT 后的初始模型），$\beta$ 是 KL 惩罚系数。

#### 1.3 裁剪机制的直觉

`min(r·A, clip(r)·A)` 的效果是**双向限制**：

| 情况 | $\hat{A}_t > 0$（好动作） | $\hat{A}_t < 0$（坏动作） |
|------|--------------------------|--------------------------|
| $r_t$ 太大 | 被裁剪到 $1+\varepsilon$，防止过度增加概率 | 不裁剪，允许自由减少概率 |
| $r_t$ 太小 | 不裁剪，允许自由增加概率 | 被裁剪到 $1-\varepsilon$，防止过度减少概率 |

**核心思想**：当变化方向与优势方向一致时不阻碍，但当变化幅度过大时果断裁剪。

#### 1.4 PPO 的问题

1. **需要 4 个模型同时在 GPU 上**：策略模型 + 参考模型 + 奖励模型 + 价值网络（Critic），显存开销巨大
2. **Critic 训练困难**：LLM 场景中奖励通常只在最后一个 token 给出（稀疏奖励），但 Critic 需要在每个 token 位置给出准确的价值估计
3. **长序列中 Critic 不准**：对于长 Chain-of-Thought (CoT) 推理，Critic 估计的误差会累积

---

### 二、GRPO — Group Relative Policy Optimization

> **论文**: *DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models* (Shao et al., 2024)
> **地位**: Value-Free RL 路线的开创者，RLVR 范式的确立，DeepSeek-R1 的核心算法

#### 2.1 核心思想

GRPO 的核心洞察：**不需要价值网络**。取而代之的是，对同一个问题采样一组（Group）回答，用组内的相对奖励来估计优势。

#### 2.2 核心公式

**GRPO 目标函数**:

$$
\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{q \sim P(Q),\, \{o_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}(\cdot|q)} \left[ \frac{1}{G} \sum_{i=1}^{G} \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} \left( \min\!\left( r_{i,t}(\theta)\, \hat{A}_{i,t},\; \text{clip}\!\left(r_{i,t}(\theta),\, 1\!-\!\varepsilon,\, 1\!+\!\varepsilon\right) \hat{A}_{i,t} \right) - \beta\, \mathbb{D}_{\text{KL}}[\pi_\theta \| \pi_{\text{ref}}] \right) \right]
$$

其中重要性采样比率（逐 token）：

$$
r_{i,t}(\theta) = \frac{\pi_\theta(o_{i,t} \mid q, o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t} \mid q, o_{i,<t})}
$$

**与 PPO 的关键区别——优势函数的计算方式**:

$$
\hat{A}_{i,t} = \tilde{r}_i = \frac{R_i - \text{mean}(\mathbf{R})}{\text{std}(\mathbf{R})}
$$

其中 $\mathbf{R} = \{R_1, R_2, \ldots, R_G\}$ 是同一问题下 $G$ 个采样回答的奖励集合。

---

> **📖 初学者补充：Group Relative 是什么意思？**
>
> 举个例子：对问题 "求 $\sqrt{144}$"，模型生成 8 个回答（Group Size $G=8$）：
>
> | 回答 | 正确? | 奖励 $R_i$ |
> |------|-------|-----------|
> | $o_1$: "12" | ✅ | +1 |
> | $o_2$: "14" | ❌ | -1 |
> | $o_3$: "12" | ✅ | +1 |
> | $o_4$: "11" | ❌ | -1 |
> | ... | ... | ... |
>
> 计算：$\text{mean}(\mathbf{R}) = 0$，$\text{std}(\mathbf{R}) = 1$
>
> - 正确回答：$\hat{A} = (1 - 0)/1 = +1$（鼓励）
> - 错误回答：$\hat{A} = (-1 - 0)/1 = -1$（抑制）
>
> 这就是 "Group Relative"：优势是**相对于同组其他回答**的，不需要额外的 Critic 网络来估计。

---

**GRPO 的 KL 散度估计器**（无偏估计）：

$$
\mathbb{D}_{\text{KL}}[\pi_\theta \| \pi_{\text{ref}}] = \frac{\pi_{\text{ref}}(o_{i,t} \mid q, o_{i,<t})}{\pi_\theta(o_{i,t} \mid q, o_{i,<t})} - \log \frac{\pi_{\text{ref}}(o_{i,t} \mid q, o_{i,<t})}{\pi_\theta(o_{i,t} \mid q, o_{i,<t})} - 1
$$

此估计器保证非负（$x - \log x - 1 \geq 0$，$\forall x > 0$）。

#### 2.3 为什么这么设计

| 设计决策 | 动机 | 解决的问题 |
|----------|------|-----------|
| 消除 Critic 网络 | Critic 在 LLM 稀疏奖励场景下训练困难且不准确 | 4 模型 → 3 模型，节省约 25% 显存 |
| 组内相对奖励 | 奖励模型本身就是在"比较"数据上训练的，相对比较天然吻合 | 无需绝对准确的价值估计 |
| 保留 PPO 裁剪 | 裁剪仍然是稳定训练的有效手段 | 防止策略突变 |
| KL 惩罚改为直接加在损失上 | 避免将 KL 混入奖励后又被 Group Relative 归一化冲淡 | 更干净的正则化 |

#### 2.4 GRPO 的局限

1. **Hard Clipping 丢失梯度**：被裁剪的 token 梯度变为 0，某些稀有但重要的推理词（如 "however", "wait"）可能永远学不到
2. **Token-Level IS 高方差**：逐 token 的重要性采样权重在长序列中波动剧烈
3. **长序列中 Group Baseline 精度不足**：同一组所有 token 共享同一个优势值，无法区分序列内部不同位置的贡献

---

> **📖 深入理解：为什么 Hard Clipping 会让被裁剪 token 的梯度变为 0？**
>
> 这是一个初看令人困惑的问题：$\text{clip}(r, 1-\varepsilon, 1+\varepsilon)$ 把 $r$ 限制在 $[0.8, 1.2]$（取 $\varepsilon=0.2$），被裁剪后应该是一个**非零常数**（如 $1.2$），为什么梯度会是 0？
>
> **关键在于 `min` 操作，而不是 `clip` 本身。** 让我们逐步推导。
>
> 回忆 PPO/GRPO 的目标函数对单个 token 的贡献：
>
> $$L_t = \min\!\big(r_t \hat{A}_t,\; \text{clip}(r_t, 1\!-\!\varepsilon, 1\!+\!\varepsilon) \cdot \hat{A}_t\big)$$
>
> **情况一**：$\hat{A}_t > 0$（好 token，我们想增加它的概率）
>
> 当 $r_t > 1 + \varepsilon$ 时（新策略已经大幅增加了这个 token 的概率）：
> - 左项 = $r_t \cdot \hat{A}_t$（很大的正数）
> - 右项 = $(1+\varepsilon) \cdot \hat{A}_t$（较小的正数，是常数）
> - $\min$ 取**右项**（更小的那个），即 $(1+\varepsilon) \cdot \hat{A}_t$
>
> 此时 $L_t = (1+\varepsilon) \cdot \hat{A}_t$，这是一个**关于 $\theta$ 的常数**！（$1+\varepsilon$ 和 $\hat{A}_t$ 都不依赖于 $\theta$）
>
> 所以 $\nabla_\theta L_t = 0$。
>
> **情况二**：$\hat{A}_t < 0$（坏 token，我们想降低它的概率）
>
> 当 $r_t < 1 - \varepsilon$ 时（新策略已经大幅降低了这个 token 的概率）：
> - 左项 = $r_t \cdot \hat{A}_t$（正数，因为 $r_t > 0$，$\hat{A}_t < 0$，但 $r_t$ 小所以绝对值小，整体是负数但绝对值小）
> - 右项 = $(1-\varepsilon) \cdot \hat{A}_t$（更大的负数，因为 $(1-\varepsilon) > r_t$ 在此处不成立——实际上 $(1-\varepsilon)$ 是固定值 $0.8$，而 $r_t < 0.8$）
>
> 更直觉地理解：$\hat{A}_t < 0$ 时，$r \hat{A}$ 对 $r$ 递减。$\min$ 选较小者：
> - 当 $r < 1-\varepsilon$：$\text{clip}(r) = 1-\varepsilon > r$，所以 $\text{clip}(r) \cdot \hat{A}_t < r \cdot \hat{A}_t$（因为 $\hat{A}_t < 0$）
> - $\min$ 取右项 $(1-\varepsilon)\hat{A}_t$，又是**关于 $\theta$ 的常数**
>
> 再次 $\nabla_\theta L_t = 0$。
>
> **总结公式：PPO 的裁剪等价于一个二值掩码**
>
> $$\nabla_\theta L_t = \underbrace{M_t}_{\in \{0,1\}} \cdot \hat{A}_t \cdot \nabla_\theta \log \pi_\theta(o_t \mid \cdots)$$
>
> $$M_t = \begin{cases} 0, & \hat{A}_t > 0 \text{ 且 } r_t > 1+\varepsilon \quad \text{(已经够鼓励了，停止)} \\ 0, & \hat{A}_t < 0 \text{ 且 } r_t < 1-\varepsilon \quad \text{(已经够抑制了，停止)} \\ 1, & \text{otherwise} \quad \text{(继续更新)} \end{cases}$$
>
> **注意**：$r_t$ 本身确实是一个 $[0, +\infty)$ 的连续值，但问题不在于 $r_t$ 被截断成什么值，而在于 `min` 操作选择了**不含 $\theta$ 的常数项**作为输出。一旦 `min` 选了常数项，无论那个常数是 $1.2$ 还是 $0.8$，对 $\theta$ 求导都是 0。
>
> **对稀有推理词的影响**：
>
> 像 "However"、"Wait" 这样的词在基座模型中概率可能只有 $\pi_{\text{old}} = 0.005$。如果 RL 训练让模型学到"在这里说 However 很好"（$\hat{A}_t > 0$），模型概率增长到 $\pi_\theta = 0.01$，则 $r_t = 0.01/0.005 = 2.0$，远超 $1+\varepsilon = 1.2$。此时 $M_t = 0$，这个 token **完全没有梯度**——尽管 $r_t = 2.0$ 对应的绝对概率只有 1%，离"学会"还差很远。

---

### 三、DAPO — Decoupled Clip and Dynamic sAmpling Policy Optimization

> **论文**: *DAPO: An Open-Source LLM Reinforcement Learning System at Scale* (ByteDance Seed & Tsinghua AIR, 2025)
> **arXiv**: 2503.14476
> **地位**: 首个完全开源的大规模 RL 系统，AIME 2024 达到 50%

#### 3.1 核心公式

**DAPO 目标函数**:

$$
\mathcal{J}_{\text{DAPO}}(\theta) = \mathbb{E}_{(q,a)\sim\mathcal{D},\, \{o_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}(\cdot|q)} \left[ \frac{1}{\sum_{i=1}^{G}|o_i|} \sum_{i=1}^{G} \sum_{t=1}^{|o_i|} \min\!\left( r_{i,t}(\theta)\, \hat{A}_{i,t},\; \text{clip}\!\left(r_{i,t}(\theta),\, 1\!-\!\varepsilon_{\text{low}},\, 1\!+\!\varepsilon_{\text{high}}\right) \hat{A}_{i,t} \right) \right]
$$

$$
\text{s.t.} \quad 0 < \big|\{o_i \mid \text{is\_equivalent}(a, o_i)\}\big| < G
$$

其中优势和 IS 比率的计算与 GRPO 相同：

$$
r_{i,t}(\theta) = \frac{\pi_\theta(o_{i,t} \mid q, o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t} \mid q, o_{i,<t})}, \qquad \hat{A}_{i,t} = \frac{R_i - \text{mean}(\{R_j\}_{j=1}^G)}{\text{std}(\{R_j\}_{j=1}^G)}
$$

#### 3.2 四大核心改进详解

**改进 ①：Clip-Higher（非对称裁剪）**

GRPO/PPO 使用对称裁剪 $[1-\varepsilon, 1+\varepsilon]$，其中 $\varepsilon = 0.2$。DAPO 将上下界解耦：

$$
\text{clip}(r_{i,t}(\theta),\; 1 - \varepsilon_{\text{low}},\; 1 + \varepsilon_{\text{high}})
$$

实验设定：$\varepsilon_{\text{low}} = 0.2$，$\varepsilon_{\text{high}} = 0.28$。

---

> **📖 初学者补充：为什么要非对称裁剪？**
>
> 考虑一个概率很低的 token（比如 "wait"，$\pi_{\text{old}} = 0.01$）：
> - 对称裁剪时，它最多增加到 $0.01 \times 1.2 = 0.012$（只增加了 $0.002$）
> - 而一个高概率 token（$\pi_{\text{old}} = 0.9$）可以增加到 $0.9 \times 1.2 = 1.08$
>
> 对称裁剪对低概率的"探索性" token **极度不友好**——它们几乎无法提升自己的概率。
>
> Clip-Higher 放宽上界到 $1.28$，给这些 token 更多增长空间。而下界保持 $0.2$，因为如果放大下界，token 概率会被压到 0，导致采样空间坍塌。

---

**改进 ②：Dynamic Sampling（动态采样）**

约束条件 $0 < |\{o_i \mid \text{is\_equivalent}(a, o_i)\}| < G$ 的含义是：

- 过滤掉 **100% 全对** 的 prompt（所有回答都正确 → 优势全为 0 → 梯度为 0）
- 过滤掉 **0% 全错** 的 prompt（所有回答都错误 → 优势全为 0 → 梯度为 0）
- 只保留"有对有错"的 prompt，确保**每个 batch 的每个 prompt 都有有效梯度**

实现方式：过采样 → 过滤 → 直到 batch 填满有效样本。

**改进 ③：Token-Level Policy Gradient Loss（全局 Token 归一化）**

GRPO 的原始聚合方式（sample-level）：

$$
\mathcal{L}_{\text{GRPO}} = \frac{1}{G} \sum_{i=1}^{G} \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} L_{i,t} \quad \text{(先按样本平均，再跨样本平均)}
$$

DAPO 的改进（token-level）：

$$
\mathcal{L}_{\text{DAPO}} = \frac{1}{\sum_{i=1}^{G} |o_i|} \sum_{i=1}^{G} \sum_{t=1}^{|o_i|} L_{i,t} \quad \text{(所有 token 一起平均)}
$$

---

> **📖 初学者补充：为什么 Loss 聚合方式很重要？**
>
> Sample-level 下，一个 100-token 和一个 1000-token 的回答**权重相同**。这意味着长回答中每个 token 的贡献只有短回答的 $1/10$。
>
> 问题：
> - 如果高质量长回答的 token 贡献被稀释，模型学不到长推理链中的关键模式
> - 如果低质量长回答（乱码、重复）的惩罚被稀释，模型会倾向于输出更长的垃圾来"稀释"惩罚
>
> Token-level 让每个 token 无论出现在长还是短回答中，**权重一致**。

---

> **📖 深入理解：策略梯度 Loss 的聚合方式全景对比**
>
> 在 RL 训练中，一个 batch 包含多个 prompt，每个 prompt 采样多个回答，每个回答包含多个 token。如何把所有 token 的损失聚合成最终的标量 loss，**直接决定了每个 token 在梯度更新中的权重**。以下是目前主要的聚合方式：
>
> **方式 ①：Sample-Level 归一化（GRPO 默认）**
>
> $$\mathcal{L} = \frac{1}{G} \sum_{i=1}^{G} \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} L_{i,t}$$
>
> 每个样本（回答）的 token 先在**样本内部**取平均 $\frac{1}{|o_i|}$，然后再跨样本取平均 $\frac{1}{G}$。
>
> | 优点 | 缺点 |
> |------|------|
> | 每个样本对梯度的贡献相等，不受长度影响 | 长回答中每个 token 的权重被稀释（1000-token 回答中每个 token 权重 = 100-token 回答的 1/10） |
> | 直觉上公平——每个"回答"被平等对待 | 模型可以输出冗长的低质量回答来"稀释"负面梯度 |
> | 与传统 NLP Loss（如 cross-entropy 按句子平均）一致 | 无法区分"因为推理链长所以长"和"因为灌水所以长" |
>
> **方式 ②：Token-Level 归一化（DAPO 采用）**
>
> $$\mathcal{L} = \frac{1}{\sum_{i=1}^{G} |o_i|} \sum_{i=1}^{G} \sum_{t=1}^{|o_i|} L_{i,t}$$
>
> 把所有 token 拉平，用**全局 token 总数**做分母。每个 token 不论来自哪个样本，权重一致。
>
> | 优点 | 缺点 |
> |------|------|
> | 每个 token 贡献平等，长回答得到更多梯度信号 | 长回答对梯度的影响远大于短回答（1000-token 回答贡献 = 10 个 100-token 回答之和） |
> | 对长 CoT 推理友好：长推理链中的模式能被充分学习 | 如果某些 prompt 的回答特别长，可能主导整个 batch 的梯度方向 |
> | 惩罚不会被"稀释"——垃圾长回答中每个 token 都被同等惩罚 | 不同 prompt 之间的梯度贡献不均匀 |
>
> **方式 ③：Prompt-Level 归一化（某些实现中使用）**
>
> $$\mathcal{L} = \frac{1}{|B|} \sum_{q \in B} \frac{1}{G} \sum_{i=1}^{G} \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} L_{i,t}$$
>
> 先在每个 prompt 内做 sample-level 平均，再跨 prompt 平均。保证每个 prompt 的贡献相同。
>
> | 优点 | 缺点 |
> |------|------|
> | 不同难度的 prompt 贡献均衡 | 叠加了 sample-level 的缺点（长回答 token 被稀释） |
> | 避免简单 prompt（大量正确回答）主导梯度 | 计算上需要按 prompt 分组，实现稍复杂 |
>
> **方式 ④：Sequence-Level（GSPO 的方式）**
>
> $$\mathcal{L} = \frac{1}{G} \sum_{i=1}^{G} f(s_i) \cdot \hat{A}_i$$
>
> 完全不在 token 维度做聚合——直接用序列级 IS 比率 $s_i$ 和序列级优势 $\hat{A}_i$，每个序列是一个不可分割的单元。
>
> | 优点 | 缺点 |
> |------|------|
> | 与奖励粒度完全匹配（奖励也是 sequence-level） | 序列内部的 token 无法被区分性地加权（好 token 坏 token 同权） |
> | IS 方差最低（几何平均平滑了 token 间波动） | 无法做 token-level credit assignment |
> | 对 MoE 训练友好（不受单 token 路由切换影响） | 依赖序列长度归一化（$1/|y_i|$ 次方）保持尺度一致 |
>
> **实际效果对比（以 DAPO 论文消融为参考）**：
>
> | 聚合方式 | AIME 2024 得分 | 备注 |
> |----------|---------------|------|
> | Token-Level（DAPO） | **50.0** | 最优 |
> | Sample-Level（GRPO 默认） | 43.0 | 低 7 分 |
>
> **选择建议**：
> - **短回答任务**（分类、简答）→ Sample-Level 即可，差异不大
> - **长 CoT 推理**（数学、代码） → Token-Level 或 Sequence-Level 更优
> - **混合长短任务** → Token-Level 是较好的默认选择

---

**改进 ④：Overlong Reward Shaping（超长输出奖励塑形）**

$$
R_{\text{length}}(y) = \begin{cases} 0, & |y| \leq L_{\max} - L_{\text{cache}} \\ \frac{(L_{\max} - L_{\text{cache}}) - |y|}{L_{\text{cache}}}, & L_{\max} - L_{\text{cache}} < |y| \leq L_{\max} \\ -1, & |y| > L_{\max} \end{cases}
$$

- $L_{\max}$：最大生成长度（如 16384）
- $L_{\text{cache}}$：缓冲区大小（如 4096）
- 在缓冲区内**线性惩罚**，超出最大长度则直接 $-1$

**设计动机**：直接给截断样本 $-1$ 的惩罚会引入噪声——一个推理正确但还没写完的回答会被冤枉。软惩罚让模型学到"尽量在限制内完成"，而非"长就是错"。

#### 3.3 移除 KL 散度

DAPO 完全移除了 KL 惩罚项。理由：在长 CoT 推理场景中，模型分布需要大幅偏离初始模型才能涌现复杂推理行为，KL 约束反而是障碍。

#### 3.4 基于规则的奖励

$$
R(\hat{y}, y) = \begin{cases} +1, & \text{is\_equivalent}(\hat{y}, y) \\ -1, & \text{otherwise} \end{cases}
$$

直接用答案正确性作为奖励，避免了奖励模型的 reward hacking 问题。

---

### 四、VAPO — Value-Augmented Policy Optimization

> **论文**: *VAPO: Efficient and Reliable Reinforcement Learning for LLM Reasoning with Verifiable Rewards* (ByteDance Seed, 2025)
> **arXiv**: 2504.05118
> **地位**: 唯一的跨分支融合算法（PPO + GRPO + DAPO），AIME 2024 达到 60.4%

#### 4.1 核心思想

VAPO 的核心论点："Value-Free（如 GRPO）在短任务上够用，但在**长 CoT 推理**中，Value-Based 有不可替代的优势——只是需要修好 Critic。"

#### 4.2 核心公式

**VAPO 总损失函数**:

$$
\mathcal{L}(\theta) = \mathcal{L}_{\text{PPO}}(\theta) + \mu \cdot \mathcal{L}_{\text{NLL}}(\theta)
$$

其中 $\mu = 0.1$。

**PPO 部分**（采用 Clip-Higher + Token-Level Loss）：

$$
\mathcal{L}_{\text{PPO}}(\theta) = -\frac{1}{\sum_{i=1}^{G} |o_i|} \sum_{i=1}^{G} \sum_{t=1}^{|o_i|} \min\!\left( r_{i,t}(\theta)\, \hat{A}_{i,t}^{\text{GAE}},\; \text{clip}\!\left(r_{i,t}(\theta),\, 1\!-\!\varepsilon_{\text{low}},\, 1\!+\!\varepsilon_{\text{high}}\right) \hat{A}_{i,t}^{\text{GAE}} \right)
$$

注意这里的 $\hat{A}_{i,t}^{\text{GAE}}$ 是由**价值网络 + GAE** 计算的（非 Group Relative），且使用了下文的 Length-Adaptive 方案。

**正样本模仿学习损失 (Positive-Example LM Loss)**：

$$
\mathcal{L}_{\text{NLL}}(\theta) = -\frac{1}{\sum_{o_i \in \mathcal{T}} |o_i|} \sum_{o_i \in \mathcal{T}} \sum_{t=1}^{|o_i|} \log \pi_\theta(a_t \mid s_t)
$$

其中 $\mathcal{T}$ 是当前 batch 中**回答正确的样本集合**。

---

> **📖 初学者补充：为什么要加模仿学习损失？**
>
> 在复杂推理任务中，大部分采样回答是**错误的**。传统策略梯度只是"抑制错误回答"，对"鼓励正确回答"的效率很低（需要正确回答出现足够多次才有足够的梯度信号）。
>
> $\mathcal{L}_{\text{NLL}}$ 相当于一个"自我模仿学习 (self-imitation learning)"：对正确回答做 supervised fine-tuning，直接最大化其对数似然。这样即使正确回答占比很小，也能被充分利用。
>
> 去掉这个损失，AIME 2024 得分从 60 降到 54（下降 6 分）。

---

#### 4.3 VAPO 的三大 Critic 修复技术

**技术 ①：Value Pretraining（价值预训练）**

在 RL 正式开始前，先用 Monte Carlo 回报对价值模型预训练约 50 步。

**问题**：从奖励模型初始化 Critic 会引入**正向偏置 (positive initialization bias)**——奖励模型被训练在 `<EOS>` 位置打分，倾向于给早期 token 较低的分数。但 Critic 需要对所有 token 给出准确的期望累积回报。这个偏差在长序列开头尤其严重。

**效果**：没有 Value Pretraining，AIME 得分从 60 暴跌到 11（几乎完全崩溃）。

**技术 ②：Decoupled GAE（解耦 GAE）**

对 Critic 更新和 Policy 更新使用**不同的 $\lambda$ 值**：

- **Critic 更新**：$\lambda_{\text{critic}} = 1.0$（等价于 Monte Carlo，无偏但高方差）
- **Policy 更新**：$\lambda_{\text{policy}} = 0.95$（或使用下文的 Length-Adaptive 版本）

---

> **📖 初学者补充：为什么要解耦 $\lambda$？**
>
> 回忆 GAE 公式中，奖励信号从序列末尾向前传播时会以 $\lambda^{T-t}$ 的速度衰减。
>
> 对于长序列（比如 $T-t = 100$ 步），$0.95^{100} \approx 0.006$——奖励信号几乎衰减为零！
>
> - **Critic 侧**：用 $\lambda = 1.0$ 确保 Critic 看到无偏的回报信号，训练目标准确
> - **Policy 侧**：用较小的 $\lambda$ 降低方差，加速收敛
>
> 如果两者用同一个 $\lambda$，要么 Critic 训练不准（$\lambda < 1$），要么 Policy 更新方差太大（$\lambda = 1$）。
>
> 去掉 Decoupled GAE，得分从 60 降到 33（下降 27 分），是除 Value Pretraining 外影响最大的组件。

---

**技术 ③：Length-Adaptive GAE（长度自适应 GAE）**

核心设计约束：

$$
\sum_{t=0}^{\infty} \lambda_{\text{policy}}^t \approx \frac{1}{1 - \lambda_{\text{policy}}} = \alpha \cdot l
$$

解出：

$$
\boxed{\lambda_{\text{policy}} = 1 - \frac{1}{\alpha \cdot l}}
$$

其中 $l$ 是输出序列长度，$\alpha$ 是超参数（实验中取 $\alpha = 0.05$）。

**设计动机**：固定的 $\lambda = 0.95$ 对不同长度的序列**一视同仁**，但实际上：
- 短序列（$l=20$）：$\lambda$ 足够大，奖励信号传播良好
- 长序列（$l=500$）：$0.95^{500} \approx 0$，奖励信号完全消失

Length-Adaptive GAE 让 GAE 系数之和（$\frac{1}{1-\lambda}$）与序列长度成正比，确保无论长短序列，TD 误差的贡献都均匀分布。

**效果**：去掉此组件，得分从 60 降到 45（下降 15 分）。

#### 4.4 VAPO 的技术来源总结

| 技术 | 来源 | 创新/继承 |
|------|------|-----------|
| Value Model + GAE | PPO | 继承 |
| Group Sampling | GRPO | 继承 |
| Clip-Higher | DAPO | 继承 |
| Token-Level Loss | DAPO | 继承 |
| Dynamic Sampling | DAPO | 继承 |
| Value Pretraining | **VAPO 原创** | 创新 |
| Decoupled GAE | **VAPO 原创** | 创新 |
| Length-Adaptive GAE | **VAPO 原创** | 创新 |
| Positive-Example LM Loss | **VAPO 原创** | 创新 |

#### 4.5 消融实验汇总

| 移除的组件 | AIME 2024 得分 | 下降幅度 |
|-----------|---------------|---------|
| 完整 VAPO | **60.4** | — |
| 移除 Value Pretraining | 11 | −49 |
| 移除 Decoupled GAE | 33 | −27 |
| 移除 Length-Adaptive GAE | 45 | −15 |
| 移除 Clip-Higher | 46 | −14 |
| 移除 Token-Level Loss | 53 | −7 |
| 移除 Positive-Example LM Loss | 54 | −6 |
| 移除 Group Sampling | 55 | −5 |
| 原始 PPO（无任何改进） | 5 | −55 |

---

### 五、CISPO — Clipped Importance Sampling Policy Optimization

> **论文**: *MiniMax-M1: Scaling Test-Time Compute Efficiently with Thinking Models* (MiniMax, 2025)
> **arXiv**: 2506.13585
> **地位**: 首次提出"裁剪 IS 权重而非裁剪目标"的范式，应用于 MiniMax-M1

#### 5.1 核心问题

PPO/GRPO 的 Hard Clipping 存在一个**被忽视的严重缺陷**：

一些对推理至关重要的"分岔"词（如 "However"、"Recheck"、"Wait"、"Aha"），在基座模型中**初始概率很低**。RL 训练中当这些 token 被选中时，$r_{i,t}$ 往往会很大（新策略给它们的概率远超旧策略）。PPO 的 `min(r·A, clip(r)·A)` 会将它们**硬裁剪**，使得梯度变为 **0**。

在 MiniMax 的设置中（每个生成 batch 进行 16 轮 off-policy 更新），这些 token 在**第 1 轮就被裁剪出局**，剩下 15 轮完全没有梯度——关键推理能力因此无法涌现。

---

> **📖 深入理解：为什么"第 1 轮就被裁剪出局，剩下 15 轮没有梯度"？**
>
> 这需要理解 off-policy 多轮更新的机制。让我们用一个具体例子走完整个过程。
>
> **背景设定**：
> - 旧策略 $\pi_{\theta_{\text{old}}}$ 对 token "However" 的概率：$\pi_{\text{old}}(\text{However}) = 0.003$（稀有词）
> - 裁剪范围 $\varepsilon = 0.2$，即 $r$ 被限制在 $[0.8, 1.2]$
> - 该 token 的优势 $\hat{A} > 0$（它是一个好的推理转折词）
> - 每个 batch 的数据由 $\pi_{\theta_{\text{old}}}$ **采样一次**，然后用这批数据做 **16 轮**梯度更新
>
> **第 1 轮更新**：
> - 策略梯度告诉模型"增加 However 的概率"，模型将其概率从 $0.003$ 提升到 $0.004$
> - $r = 0.004 / 0.003 = 1.33 > 1.2$
> - **已经超过裁剪阈值！** PPO 的 $\min$ 操作选择常数项 → 梯度 = 0
>
> **第 2~16 轮更新**：
> - $r$ 的分母 $\pi_{\theta_{\text{old}}}$ 始终是 $0.003$（**不更新**，因为旧策略在整个 batch 内是固定的）
> - $r$ 的分子 $\pi_\theta$ 已经 $\geq 0.004$，所以 $r \geq 1.33 > 1.2$
> - 每一轮 $M_t = 0$，梯度**全部为零**
> - "However" 这个 token 在剩余 15 轮中**完全学不到任何东西**
>
> **关键洞察**：对于稀有 token，$r_t$ 飙升得特别快，因为分母 $\pi_{\text{old}}$ 很小。一个概率只有 0.3% 的词，只需要绝对概率增加 0.06%（从 0.3% 到 0.36%），$r$ 就已经达到 1.2 被裁剪了。但 0.36% 离"学会"这个词还差得远。
>
> **与高频词的对比**：
>
> | token | $\pi_{\text{old}}$ | 需要增加到多少触发裁剪 ($r > 1.2$) | 绝对增量 |
> |-------|-------------------|------------------------------------|---------|
> | "the" | 0.15 | 0.18 | +0.03 |
> | "However" | 0.003 | 0.0036 | +0.0006 |
> | "Wait" | 0.001 | 0.0012 | +0.0002 |
>
> 高频词 "the" 需要绝对概率增加 3% 才触发裁剪，低频词 "Wait" 只需增加 0.02% 就被裁剪。**裁剪机制对低频词极度不公平**——它们实际上几乎没有增长空间。
>
> 这就是为什么说这些 token 被"裁剪出局"了：不是说 token 本身被丢弃了，而是**它们的梯度被永久置零**，在整个 batch 的训练周期内再也无法获得任何学习信号。

---

#### 5.2 核心公式

**CISPO 目标函数**:

$$
\mathcal{J}_{\text{CISPO}}(\theta) = \mathbb{E}_{(q,a)\sim\mathcal{D},\, \{o_i\} \sim \pi_{\theta_{\text{old}}}(\cdot|q)} \left[ \frac{1}{\sum_{i=1}^{G}|o_i|} \sum_{i=1}^{G} \sum_{t=1}^{|o_i|} \text{sg}\!\left(\hat{r}_{i,t}(\theta)\right) \cdot \hat{A}_{i,t} \cdot \log \pi_\theta(o_{i,t} \mid q, o_{i,<t}) \right]
$$

其中**裁剪的 IS 权重**：

$$
\hat{r}_{i,t}(\theta) = \text{clip}\!\left(r_{i,t}(\theta),\; 1 - \varepsilon_{\text{low}}^{\text{IS}},\; 1 + \varepsilon_{\text{high}}^{\text{IS}}\right)
$$

$\text{sg}(\cdot)$ 是 **stop-gradient 操作**（梯度截断，将括号内的表达式视为常数）。

---

> **📖 初学者补充：什么是 stop-gradient $\text{sg}(\cdot)$？**
>
> 在自动微分框架（PyTorch/JAX）中，$\text{sg}(x)$ 的前向传播值等于 $x$，但**反向传播时梯度为 0**，即 $\frac{\partial}{\partial \theta}\text{sg}(x) = 0$。
>
> 效果：$\text{sg}(\hat{r}_{i,t})$ 在计算损失时**作为权重参与**，但梯度**只通过 $\log\pi_\theta(\cdot)$ 流回参数** $\theta$。
>
> 这意味着 IS 权重只是一个"不参与梯度计算的标量乘子"。

---

#### 5.3 PPO vs CISPO：梯度行为对比

**PPO 的等效行为**：

PPO 的 `min(r·A, clip(r)·A)` 实际上等价于对每个 token 施加一个**二值掩码** $M_{i,t}$：

$$
M_{i,t} = \begin{cases} 0, & \hat{A}_{i,t} > 0 \text{ 且 } r_{i,t} > 1 + \varepsilon \\ 0, & \hat{A}_{i,t} < 0 \text{ 且 } r_{i,t} < 1 - \varepsilon \\ 1, & \text{otherwise} \end{cases}
$$

当 $M_{i,t} = 0$ 时，该 token 的梯度**完全为零**。

**CISPO 的行为**：

CISPO 永远不会将任何 token 的梯度置零。IS 权重被裁剪后通过 $\text{sg}()$ 作为常数标量，但 $\log\pi_\theta(\cdot)$ 始终可微：

$$
\nabla_\theta \mathcal{J}_{\text{CISPO}} \propto \sum_{i,t} \underbrace{\text{sg}(\hat{r}_{i,t})}_{\text{裁剪后的标量权重}} \cdot \hat{A}_{i,t} \cdot \underbrace{\nabla_\theta \log \pi_\theta(o_{i,t} \mid \cdots)}_{\text{始终有梯度}}
$$

| 算法 | 裁剪对象 | 被裁剪 token 的梯度 |
|------|----------|-------------------|
| PPO/GRPO | 目标函数 $r \cdot A$ | **= 0**（完全丢失） |
| CISPO | IS 权重 $r$（在 sg 内） | **≠ 0**（权重被限制但梯度保留） |

#### 5.4 为什么这么设计

CISPO 的梯度形式等价于 REINFORCE with IS correction，但 IS 权重被裁剪并截断梯度：

1. **PPO 裁剪目标** → 被裁剪的 token 梯度归零 → 稀有推理词无法学到
2. **CISPO 裁剪权重** → 所有 token 都有梯度 → 稀有推理词也能学到（只是权重被限制）

DAPO 试图通过放大上界（$\varepsilon_{\text{high}} = 0.28$）来缓解这个问题，但在 16 轮 off-policy 更新的场景下效果有限。CISPO 从根本上解决了这个问题。

**代价**：CISPO 的梯度存在轻微偏差（因为 IS 权重被裁剪了，严格来说不再是无偏估计），但实验表明这个偏差对性能没有负面影响。

---

### 六、GSPO — Group Sequence Policy Optimization

> **论文**: *Group Sequence Policy Optimization* (Alibaba / Qwen Team, 2025)
> **arXiv**: 2507.18071
> **地位**: 将优化粒度从 Token-Level 提升到 Sequence-Level，应用于 Qwen3

#### 6.1 核心问题

GRPO 的 Token-Level 重要性采样存在**理论缺陷**：

- 重要性采样原理要求：用 $\pi_{\text{old}}(z)$ 采样的 $z$ 需要**多次采样取平均**，权重 $\pi_\theta(z)/\pi_{\text{old}}(z)$ 才能正确矫正分布
- 但 GRPO 在每个 token 位置 $t$ 只有**一个样本** $o_{i,t}$（来自条件分布 $\pi_{\theta_{\text{old}}}(\cdot \mid q, o_{i,<t})$）
- 因此 token-level IS 权重 $w_{i,t}$ **无法完成预期的分布矫正**，反而引入高方差噪声
- 更关键的是：**奖励是 sequence-level 的，但 IS 矫正是 token-level 的**——优化单元与奖励单元不匹配

---

> **📖 深入理解："分岔词"的分布问题 —— 为什么 Token-Level IS 对推理至关重要的词伤害最大？**
>
> 这个问题贯穿 CISPO、GSPO、SAPO 三篇论文，是理解后续所有改进的关键。让我们从头梳理完整的因果链。
>
> **第一步：什么是"分岔词"？为什么它们概率低？**
>
> 在大模型生成推理过程时，大部分 token 是"流畅续写"——它们的概率由语言模型的统计规律决定，通常比较高（如 "is"、"the"、"equal to" 等）。但有一些特殊的词会**改变推理方向**：
>
> - **"However"** → 推翻前面的推导，开始纠错
> - **"Wait"** → 暂停当前思路，重新检查
> - **"Alternatively"** → 尝试完全不同的解题路径
> - **"Recheck"** → 回头验证之前的步骤
>
> 这些词在 SFT 训练数据中出现频率很低（因为大多数训练文本是流畅叙述，不会频繁自我纠正），所以**基座模型赋予它们的初始概率很低**。例如在某个推理位置：
> - $\pi_{\text{old}}(\text{"Therefore"}) = 0.35$（高概率，继续推导）
> - $\pi_{\text{old}}(\text{"However"}) = 0.003$（低概率，但可能是正确的选择）
>
> **第二步：为什么 RL 训练中这些词的 $r_{i,t}$ 会变得很大？**
>
> 假设模型生成了一条包含 "However" 的推理链，恰好得到了正确答案（$\hat{A} > 0$）。策略梯度会推动模型增加 "However" 的概率。
>
> 但由于基数极小，哪怕概率只增加了一点点，$r$ 就会飙升：
>
> $$r = \frac{\pi_\theta(\text{"However"})}{\pi_{\text{old}}(\text{"However"})} = \frac{0.006}{0.003} = 2.0$$
>
> 这里 "However" 的概率只从 0.3% 增加到 0.6%（仍然是极小的概率），但 $r = 2.0$ 已经**远超裁剪阈值** $1 + \varepsilon = 1.2$。
>
> 相比之下，高频词 "Therefore" 即使概率从 35% 增加到 42%，$r = 0.42/0.35 = 1.2$，**刚好在裁剪边界**。
>
> **第三步：Token-Level IS 如何放大这个问题？**
>
> 在 GRPO 的 Token-Level IS 中，每个 token 有自己的权重 $w_{i,t} = r_{i,t}$。一个长度为 500 的序列中：
> - 498 个普通 token：$r \approx 1.0$，权重正常
> - 1 个 "However"：$r = 5.0$，权重是普通 token 的 5 倍
> - 1 个 "Wait"：$r = 8.0$，权重是普通 token 的 8 倍
>
> 这两个极端权重会**主导整个序列的梯度方向**，造成高方差。更糟糕的是，如果使用 PPO 裁剪，这两个 token 直接**梯度归零**（参见上文 CISPO 5.1 的详细解释），而它们恰恰是推理链中最关键的。
>
> **GSPO 的解决方案**：用序列级 IS 比率 $s_i$（几何平均）替代 token-level $w_{i,t}$：
>
> $$s_i = \exp\!\left(\frac{1}{500}\sum_{t=1}^{500} \log r_{i,t}\right)$$
>
> 那两个极端 token 的影响被**分摊到 500 个 token 上**：$\log(5.0)/500 + \log(8.0)/500 \approx 0.003 + 0.004 = 0.007$，几乎不影响 $s_i$ 的值。所有 token 获得**统一的权重** $s_i \approx 1.01$，不再有个别 token 被单独裁剪出局。
>
> **CISPO 的解决方案**：保留 token-level IS，但把裁剪后的 $r$ 放进 $\text{sg}()$，让梯度只通过 $\log \pi$ 流回——即使 $r$ 被裁剪成常数 $1.2$，$\nabla \log \pi$ 始终非零。
>
> **SAPO 的解决方案**：用连续的 sigmoid 软门控替代硬裁剪——$r$ 越偏离 1，权重越小但**永远不为零**。
>
> **三种方案的共同目标**：确保"分岔词"这类低频但高价值的 token 在训练中不被梯度丢失机制所扼杀。

---

#### 6.2 核心公式

**GSPO 目标函数**:

$$
\mathcal{J}_{\text{GSPO}}(\theta) = \mathbb{E}_{q \sim \mathcal{D},\, \{y_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}(\cdot|q)} \left[ \frac{1}{G} \sum_{i=1}^{G} \min\!\left( s_i(\theta)\, \hat{A}_i,\; \text{clip}\!\left(s_i(\theta),\, 1\!-\!\varepsilon,\, 1\!+\!\varepsilon\right) \hat{A}_i \right) \right]
$$

**序列级重要性采样比率 (Sequence-Level IS Ratio)**:

$$
\boxed{s_i(\theta) = \left(\frac{\pi_\theta(y_i \mid q)}{\pi_{\theta_{\text{old}}}(y_i \mid q)}\right)^{1/|y_i|} = \exp\!\left(\frac{1}{|y_i|} \sum_{t=1}^{|y_i|} \log \frac{\pi_\theta(y_{i,t} \mid q, y_{i,<t})}{\pi_{\theta_{\text{old}}}(y_{i,t} \mid q, y_{i,<t})}\right)}
$$

**优势函数**（与 GRPO 相同，Group Relative）：

$$
\hat{A}_i = \frac{R_i - \text{mean}(\{R_j\}_{j=1}^G)}{\text{std}(\{R_j\}_{j=1}^G)}
$$

---

> **📖 初学者补充：$s_i(\theta)$ 的几何含义**
>
> $s_i(\theta)$ 实际上是**逐 token IS 比率的几何平均数**（geometric mean）。
>
> 为什么要取 $1/|y_i|$ 次方？
> 1. 如果直接用 $\pi_\theta(y_i|q) / \pi_{\theta_{\text{old}}}(y_i|q)$，这是所有 token 概率比的**乘积**。对于长序列，哪怕每个 token 的比率都接近 1，乘积也可能变得极大或极小（因为是指数级别累积的）。
> 2. 取 $1/|y_i|$ 次方后，不同长度的序列的 IS 比率在**同一数值尺度**上，不需要为不同长度设置不同的裁剪范围。
>
> 类比：如果你考试 5 科，每科比上次高 10%，那总分比上次高 $1.1^5 = 1.61$（61% 提升），但**平均每科**仍然只提升 10%。$s_i$ 衡量的就是"平均每 token"的变化。

---

#### 6.3 GRPO vs GSPO 梯度对比

**GRPO 梯度**（逐 token 加权）：

$$
\nabla_\theta \mathcal{J}_{\text{GRPO}} \propto \sum_i \hat{A}_i \cdot \frac{1}{|y_i|} \sum_t \underbrace{w_{i,t}(\theta)}_{\text{每个 token 不同}} \cdot \nabla_\theta \log \pi_\theta(y_{i,t} \mid \cdots)
$$

**GSPO 梯度**（全序列统一加权）：

$$
\nabla_\theta \mathcal{J}_{\text{GSPO}} \propto \sum_i \underbrace{s_i(\theta)}_{\text{整个序列统一}} \cdot \hat{A}_i \cdot \frac{1}{|y_i|} \sum_t \nabla_\theta \log \pi_\theta(y_{i,t} \mid \cdots)
$$

**关键区别**：GRPO 给同一序列内的不同 token **不等权重**（$w_{i,t}$ 各不相同，噪声很大）；GSPO 给同一序列内的所有 token **相同权重**（$s_i$ 是序列级的标量），消除了 token 间的不一致性。

#### 6.4 裁剪范围

由于 $s_i(\theta)$ 经过了 $1/|y_i|$ 归一化，其数值范围远比 token-level $w_{i,t}$ 紧凑。实验中 GSPO 使用极小的裁剪范围：

$$
\varepsilon_{\text{left}} = 3 \times 10^{-4}, \quad \varepsilon_{\text{right}} = 4 \times 10^{-4}
$$

（对比 GRPO 的 $\varepsilon = 0.2 \sim 0.28$，差了三个数量级）

#### 6.5 MoE 训练稳定性

在 MoE（Mixture of Experts）模型中，每次梯度更新后约 10% 的专家激活会改变。这导致：
- **GRPO**：同一 token 在 $\pi_\theta$ 和 $\pi_{\theta_{\text{old}}}$ 中使用不同的专家子网络 → $w_{i,t}$ 剧烈波动 → 需要 **Routing Replay**（缓存并回放旧策略的路由决策，开销大）
- **GSPO**：只关心**序列整体似然**，不受个别 token 专家切换的影响 → **无需 Routing Replay**

---

### 七、SAPO — Soft Adaptive Policy Optimization

> **论文**: *Soft Adaptive Policy Optimization* (Alibaba / Qwen Team, 2025)
> **arXiv**: 2511.20347
> **地位**: 用连续的 Soft Gating 替代所有先前算法的 Hard Clipping，应用于 Qwen3-VL

#### 7.1 核心问题

**所有**先前算法（PPO/GRPO/DAPO/CISPO/GSPO）都使用某种形式的 **Hard Clipping**：

$$
\text{clip}(r, 1-\varepsilon, 1+\varepsilon)
$$

Hard Clipping 的本质问题：
- 在裁剪边界处存在**不连续的梯度跳变**（从有梯度突然变为 0）
- 难以平衡**稳定性**（需要紧裁剪）和**有效学习**（需要松裁剪）
- 对于 GSPO，一个序列中如果有几个极端 off-policy 的 token，会导致 $s_i$ 超过裁剪阈值，**整个序列的梯度被抹杀**

#### 7.2 核心公式

**SAPO 目标函数**:

$$
\mathcal{J}_{\text{SAPO}}(\theta) = \mathbb{E}_{q \sim \mathcal{D},\, \{y_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}(\cdot|q)} \left[ \frac{1}{G} \sum_{i=1}^{G} \frac{1}{|y_i|} \sum_{t=1}^{|y_i|} f_{i,t}\!\big(r_{i,t}(\theta)\big) \cdot \hat{A}_{i,t} \right]
$$

**Soft Gating 函数**:

$$
\boxed{f_{i,t}(x) = \sigma\!\left(\tau_{i,t} \cdot (x - 1)\right) \cdot \frac{4}{\tau_{i,t}}}
$$

其中 $\sigma(z) = \frac{1}{1 + e^{-z}}$ 是 sigmoid 函数，温度参数 $\tau_{i,t}$ **根据优势符号自适应选择**：

$$
\tau_{i,t} = \begin{cases} \tau_{\text{pos}}, & \hat{A}_{i,t} > 0 \\ \tau_{\text{neg}}, & \hat{A}_{i,t} \leq 0 \end{cases}
$$

实验设定：$\tau_{\text{pos}} = 1.0$，$\tau_{\text{neg}} = 1.05$（**非对称温度**，$\tau_{\text{neg}} > \tau_{\text{pos}}$）。

---

> **📖 初学者补充：Soft Gating 的直觉**
>
> 把 $f(x)$ 想象成一个"通过率"：
> - 当 $r_{i,t} = 1$（on-policy，新旧策略一致）：$f(1) = \sigma(0) \cdot 4/\tau = 0.5 \cdot 4/\tau = 2/\tau$。经过归一化后，梯度权重为 1。
> - 当 $r_{i,t}$ 偏离 1：$\sigma$ 饱和，$f$ 值逐渐趋向 0 或 $4/\tau$，梯度权重**平滑衰减**
>
> 对比 Hard Clipping：
> ```
> Hard Clip:   ████████|       （边界处突然跳变为 0）
> Soft Gate:   ████████████▓▒░ （平滑衰减到接近 0）
> ```

---

#### 7.3 梯度权重分析

对 $f_{i,t}$ 求导可得梯度权重 (gradient weight)：

$$
w_{i,t}(\theta) = 4 \cdot p_{i,t}(\theta) \cdot \big(1 - p_{i,t}(\theta)\big)
$$

其中：

$$
p_{i,t}(\theta) = \sigma\!\left(\tau_{i,t} \cdot (r_{i,t}(\theta) - 1)\right)
$$

这个权重函数具有以下性质：
- 在 $r = 1$（on-policy）处取最大值 $w = 1$
- 随 $r$ 偏离 1 **平滑对称衰减**
- 等价于 $\text{sech}^2$ 函数：$w = \text{sech}^2(\tau/2 \cdot (r-1))$

#### 7.4 为什么要非对称温度？

论文从 logit 级梯度分析得出：

- **正优势**（$\hat{A} > 0$）：更新是**聚焦的**——增加采样 token 的 logit，降低其他 token 的 logit，方差小
- **负优势**（$\hat{A} < 0$）：更新是**发散的**——降低采样 token 的 logit，但提升**所有其他 token**（词表大小 ~100K+）的 logit，梯度被分散到大量无关 token，方差大且不稳定

$\tau_{\text{neg}} > \tau_{\text{pos}}$ 使得**负样本的梯度衰减更快**，抑制这种高方差效应。

实验验证：$\tau_{\text{neg}} = 1.05 > \tau_{\text{pos}} = 1.0$ 最稳定；$\tau_{\text{neg}} < \tau_{\text{pos}}$ 会导致训练提前崩溃。

#### 7.5 与 GSPO 的联系：Token-Level → Sequence-Level 的自然坍缩

论文证明了一个优雅的理论结果：在温和条件下（小步更新 + 序列内 token 变化分散度较低），SAPO 的 token-level soft gate 会**自动近似坍缩为 sequence-level gate**：

$$
\nabla_\theta \mathcal{J}_{\text{SAPO}} \approx \mathbb{E}\left[ \frac{1}{G} \sum_i \text{sech}^2\!\left(\frac{\tau_i}{2} \cdot \log s_i(\theta)\right) \cdot \nabla_\theta \log s_i(\theta) \cdot \hat{A}_i \right]
$$

其中 $s_i(\theta)$ 就是 GSPO 的序列级 IS 比率。

**含义**：SAPO 不需要显式地在 token-level 和 sequence-level 之间做选择——它在 token-level 定义，但自然地表现出 sequence-level 的行为。而且它用连续的 $\text{sech}^2$ 替代了 GSPO 的硬裁剪。

#### 7.6 统一视角：三种 Gating 函数

论文提出了一个统一框架，所有算法都可以写成：

$$
\mathcal{J}(\theta) = \mathbb{E}\left[\frac{1}{|y_i|}\sum_t f_{i,t}\!\big(r_{i,t}(\theta)\big) \cdot \hat{A}_{i,t}\right]
$$

| 算法 | $f_{i,t}(r)$ 形式（$\hat{A} > 0$ 时） | 边界行为 |
|------|--------------------------------------|---------|
| **GRPO** | $\min(r, 1+\varepsilon)$ | 超过 $1+\varepsilon$ 后**水平截断** |
| **GSPO** | $\min(s_i, 1+\varepsilon)$（序列级） | 超过 $1+\varepsilon$ 后**水平截断** |
| **SAPO** | $\frac{4}{\tau}\sigma(\tau(r-1))$ | **平滑 S 形饱和**，从不完全截断 |

对应的梯度（$f'$）：

| 算法 | $f'_{i,t}(r)$（$\hat{A} > 0$ 时） | 行为 |
|------|----------------------------------|------|
| **GRPO** | $\begin{cases}1, & r \leq 1+\varepsilon \\ 0, & r > 1+\varepsilon\end{cases}$ | 二值开关 |
| **SAPO** | $\text{sech}^2(\tau/2 \cdot (r-1))$ | 连续钟形曲线 |

---

### 八、全部算法公式速查表

| 算法 | 目标函数核心 | 优势函数 | IS 粒度 | 裁剪/门控 |
|------|------------|---------|---------|----------|
| **PPO** | $\min(r_t A_t, \text{clip}(r_t) A_t)$ | GAE + Critic ($V_\psi$) | Token | 对称硬裁剪 $[1\!-\!\varepsilon, 1\!+\!\varepsilon]$ |
| **GRPO** | $\min(r_{i,t} \hat{A}_i, \text{clip}(r_{i,t}) \hat{A}_i)$ | Group Relative | Token | 对称硬裁剪 |
| **DAPO** | $\min(r_{i,t} \hat{A}_i, \text{clip}(r_{i,t}, 1\!-\!\varepsilon_l, 1\!+\!\varepsilon_h) \hat{A}_i)$ | Group Relative | Token | **非对称**硬裁剪 |
| **VAPO** | 同 DAPO + $\mu \cdot \mathcal{L}_{\text{NLL}}$ | GAE + **Adaptive** Critic | Token | 非对称硬裁剪 |
| **CISPO** | $\text{sg}(\text{clip}(r_{i,t})) \cdot \hat{A}_i \cdot \log\pi$ | Group Relative | Token | 裁剪**IS 权重**（保留梯度） |
| **GSPO** | $\min(s_i \hat{A}_i, \text{clip}(s_i) \hat{A}_i)$ | Group Relative | **Sequence** | 硬裁剪（极小 $\varepsilon$） |
| **SAPO** | $\frac{4}{\tau}\sigma(\tau(r_{i,t}\!-\!1)) \cdot \hat{A}_i$ | Group Relative | Token → Seq | **Soft Gating**（连续 sigmoid） |

---

### 九、演进逻辑总结：每一步解决了什么问题

```
PPO ─────────────────── 稳定的策略优化框架
  │ 问题: Critic训练困难、显存占用过高(4模型)
  │
  ▼
GRPO ────────────────── 消除Critic, 用Group Relative替代
  │ 问题: Hard Clip丢失梯度 + 熵崩塌 + Token-Level IS高方差
  │
  ├──▶ DAPO ──────────── 非对称裁剪 + 动态采样 + Token归一化
  │      │                 (工程化解决GRPO实际训练中的一系列问题)
  │      │ 问题: 裁剪本身的梯度丢失问题仍未根治
  │      │
  │      ├──▶ CISPO ───── 裁剪IS权重而非目标函数 → 所有token保留梯度
  │      │                 (从根本上解决梯度丢失)
  │      │
  │      └──▶ GSPO ────── Token-Level → Sequence-Level
  │             │           (从根本上解决IS高方差 + MoE不稳定)
  │             │ 问题: 硬裁剪在序列级仍有突变
  │             │
  │             └──▶ SAPO ── Soft Gating替代Hard Clip
  │                           (连续信任域, 非对称温度, 自然坍缩到序列级)
  │
  └──▶ VAPO ──────────── 回归Value-Based, 修好Critic
                           (Value预训练 + 解耦GAE + 长度自适应GAE)
                           (证明: 修好后的Value-Based在长CoT上更强)
```
