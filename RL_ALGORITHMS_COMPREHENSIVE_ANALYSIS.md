# LLM RL 算法综合分析 (2022-2025)

**主线演进**: PPO → GRPO → DAPO → VAPO → CISPO → GSPO → SAPO  
**时间范围**: 2022-2025  
**最后更新**: 2026-03-10

---

## 一、演进总览

### 1.1 时间线总表

| 算法 | 时间 | 机构 | 核心创新 | 解决的问题 | 代表模型 |
|:----:|:----:|:----:|:---------|:-----------|:--------:|
| **PPO** | 2022 | OpenAI | Value-Based + Critic + GAE | - | ChatGPT |
| **GRPO** | 2024 Q4 | DeepSeek | Value-Free + Group Baseline | Critic训练困难/显存高 | DeepSeek-R1 |
| **DAPO** | 2025-03 | ByteDance | Clip-Higher + Dynamic Sampling | 熵崩塌/长度作弊 | - |
| **VAPO** | 2025-04 | ByteDance | Value-Based + Length-Adaptive GAE | Value Bias/异构长度 | - |
| **CISPO** | 2025-06 | MiniMax | Clip IS Weight (保留梯度) | Hard Clip梯度丢失 | MiniMax-M1 |
| **GSPO** | 2025-07 | Alibaba | Sequence-Level Optimization | Token-Level IS高方差 | Qwen3 |
| **SAPO** | 2025-11 | Alibaba | Soft Adaptive Gating | Hard Clip不稳定 | Qwen3-VL |

### 1.2 演进路线图

```
                                ROOT
                              PPO (2022)
                         Actor-Critic + Value
                          + RM + Clip Objective
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌──────────────┐     ┌──────────────┐      ┌──────────────┐
   │  Branch 1    │     │  Branch 2    │      │  Branch 3    │
   │ Value-Free   │     │ Value-Based  │      │ Clip Optim.  │
   │ (GRPO家族)   │     │ (PPO家族)    │      │ (Soft Clip)  │
   └──────────────┘     └──────────────┘      └──────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
```

**技术演进时间轴**:
```
2022        2024        2025-03     2025-04     2025-06     2025-07     2025-11
  │           │           │           │           │           │           │
  ▼           ▼           ▼           ▼           ▼           ▼           ▼
 PPO        GRPO        DAPO        VAPO        CISPO       GSPO        SAPO
Value      Value       Engineer    Value       Soft        Sequence    Soft
-Based     -Free       +OpenSrc    -Based      -Gate       -Level      -Adaptive
+ Critic               Dynamic     +Long       (IS         Optimiza    Gating
                       Sampling    CoT         Weight)     tion
```

---

## 二、各算法详细简介

### 2.1 PPO (2022) - 起点

| 属性 | 内容 |
|------|------|
| **代表** | InstructGPT, ChatGPT |
| **核心** | Actor-Critic + Reward Model + GAE |
| **问题** | 需要 Value Network, 显存占用高 (4个模型) |

```
PPO: Advantage = Q(s,a) - V(s)  [需要 Critic网络估计V(s)]
```

---

### 2.2 GRPO (2024 Q4-2025 Q1) - 分水岭 ⭐

| 属性 | 内容 |
|------|------|
| **论文** | DeepSeekMath / DeepSeek-R1 |
| **机构** | DeepSeek |
| **核心创新** | **消除 Critic，使用 Group Baseline** |

```
GRPO: Advantage = R_i - mean(R)  [组内相对奖励]
```

**历史地位**: Value-Free RL 的起点，RLVR (Reinforcement Learning with Verifiable Reward) 范式的确立

---

### 2.3 DAPO (2025-03) - 工程化标杆 ⭐

| 属性 | 内容 |
|------|------|
| **论文** | DAPO: An Open-Source LLM RL System at Scale |
| **机构** | ByteDance Seed + Tsinghua AIR |
| **arXiv** | 2503.14476 |
| **地位** | **首个完全开源的大规模 RL 系统** |

**四大核心改进**:

| 改进 | 方案 | 效果 |
|------|------|------|
| **Clip-Higher** | 非对称裁剪: 下限 0.2, 上限 0.28 | 鼓励探索 |
| **Dynamic Sampling** | 过滤准确率 0% 或 100% 的样本 | 只训练有效样本 |
| **Token-Level Loss** | 归一化所有 token 损失 | 防止长度作弊 |
| **Overlong Filtering** | 软长度惩罚 + 硬截断 | 控制输出长度 |

**效果**:
- **AIME 2024**: 50% (vs R1-Zero 47%)
- **训练步数**: 仅需 R1-Zero 的 50%
- **完全开源**: ✅

---

### 2.4 VAPO (2025-04) - Value-Based 回归 ⭐

| 属性 | 内容 |
|------|------|
| **论文** | VAPO: Efficient and Reliable RL for Advanced Reasoning |
| **机构** | ByteDance Seed |
| **arXiv** | 2504.05118 |

**核心观点**:
> "Value-Free 方法虽然简单，但 Value-Based 在长 CoT 中有独特优势"

**7 项核心技术**:
1. **Value Pretraining** - 防止 value model 崩溃 (50步预热)
2. **Decoupled GAE** - value 和 policy 使用不同 λ
3. **Length-Adaptive GAE** - 动态调整: `λ = 1 - 1/(α·l)`
4. **Clip-Higher** (from DAPO)
5. **Token-Level Loss** (from DAPO)
6. **Positive-Example LM Loss** - 对正确回答加入模仿学习
7. **Group-Sampling** (from GRPO)

**关键区别**: VAPO 基于 **PPO** (NOT GRPO)，是唯一跨分支融合的算法

**效果**:
- **AIME 2024**: **60.4%** (Qwen2.5-32B)
- **训练步数**: 仅 5,000 步
- **稳定性**: 多次运行无崩溃

---

### 2.5 CISPO (2025-06) - Soft Gating 先声 ⭐

| 属性 | 内容 |
|------|------|
| **论文** | MiniMax-M1: Scaling Test-Time Compute Efficiently |
| **机构** | MiniMax |
| **arXiv** | 2506.13585 |

**核心问题**:
GRPO/PPO 的 **Hard Clipping** 导致梯度丢失：
- 稀有推理控制词 (however, recheck, wait, aha) 初始概率很低
- 更新后这些 token 可能有极大的 importance ratio
- **Hard Clip 会完全移除这些梯度**

**核心创新: Clip IS Weight (而非 Token Objective)**

```
GRPO/PPO:  min(r * A, clip(r) * A)      [被 clip 的 token 梯度为 0]
CISPO:     sg(clip(r)) * A * log π      [所有 token 都有梯度]
```

**关键差异**:

| 算法 | Clip 对象 | 梯度保留 |
|------|----------|----------|
| PPO/GRPO | Objective | 被 clip 的 token 梯度为 0 |
| **CISPO** | **IS Weight** | **所有 token 都有梯度** |

---

### 2.6 GSPO (2025-07) - 序列级优化 ⭐

| 属性 | 内容 |
|------|------|
| **论文** | Group Sequence Policy Optimization |
| **机构** | Alibaba (Qwen Team) |
| **arXiv** | 2507.18071 |

**核心问题**:
GRPO 的 **Token-Level Importance Sampling** 有问题：
- 奖励是 Sequence-Level 的
- 但重要性采样是 Token-Level 的
- 导致 **高方差梯度** 和 **模型崩溃**

**核心创新: Sequence-Level Optimization**

```
GRPO:  r = π_θ(a_t|s_t) / π_old(a_t|s_t)        [Token-level]
GSPO:  r_seq = π_θ(sequence) / π_old(sequence)  [Sequence-level]

实际计算: r_seq = exp((log π(seq) - log π_old(seq)) / |seq|)
```

**关键改进**:

| 改进 | 说明 |
|------|------|
| **Sequence-Level Importance Ratio** | 基于序列似然而非 token 似然 |
| **Sequence-Level Clipping** | 对整个序列进行裁剪 |
| **MoE 稳定性** | 无需 Routing Replay 即可稳定训练 MoE |

**应用**: 应用于 **Qwen3** 模型

---

### 2.7 SAPO (2025-11) - Soft Adaptive Gating ⭐

| 属性 | 内容 |
|------|------|
| **论文** | Soft Adaptive Policy Optimization |
| **机构** | Alibaba (Qwen Team) |
| **arXiv** | 2511.20347 |

**核心问题**:
GRPO/GSPO 的 **Hard Clipping** 问题：
- 硬裁剪会突然丢失梯度信号
- 难以在稳定性和有效学习间平衡

**核心创新: Soft Gating 机制**

```
GRPO/GSPO:  Hard Clip - 超过阈值直接截断，梯度为0
SAPO:       Soft Gate - 使用温度控制的 sigmoid 平滑衰减梯度
```

**Soft Gate Function**:
```
正样本 (A > 0):  g⁺_t = σ(τ_pos · (r_t - 1)) · (4/τ_pos)
负样本 (A < 0):  g⁻_t = σ(τ_neg · (r_t - 1)) · (4/τ_neg)

Loss: L_SAPO = -g_t · A
```

**关键特性**:

| 特性 | 说明 |
|------|------|
| **非对称温度** | τ_neg > τ_pos，负样本梯度衰减更快 |
| **连续信任域** | 避免 Hard Clip 的突变 |
| **Token 级自适应性** | 违规 token 只降低权重，不完全丢弃 |

**应用**: 应用于 **Qwen3-VL**

---

## 三、四维对比总表

**分析维度**:
1. IS Ratio稳定性 (Clip方式 + Level)
2. 样本选择 (Dynamic Sampling)
3. Loss聚合 (Token vs Sequence)
4. Baseline估计 (Value vs Group)

### 3.1 综合对比表

| 算法 | 发布时间 | 机构 | IS Ratio稳定性 | 样本选择 | Loss聚合 | Baseline估计 | Value Model |
|:----:|:--------:|:----:|:--------------|:--------:|:--------:|:------------:|:-----------:|
| **PPO** | 2022 | OpenAI | Hard Clip Objective<br>Token-Level<br>`min(r·A, clip(r)·A)` | ❌ 标准采样<br>无过滤 | Token-Level<br>逐token计算 | Value Model<br>GAE估计 | ✅ 有 |
| **GRPO** | 2024 Q4 | DeepSeek | Hard Clip Objective<br>Token-Level<br>`min(r·A, clip(r)·A)` | ❌ 标准Group采样<br>G个样本全用 | Token-Level<br>`1/|o| Σ L_t` | Group Relative<br>`A=(R-mean)/std` | ❌ 无 |
| **DAPO** | 2025-03 | ByteDance | **Clip-Higher**<br>Token-Level<br>非对称: `clip(r, 1-0.2, 1+0.28)` | ✅ **Dynamic Sampling**<br>过滤0%/100%样本 | **Token-Level全局**<br>`1/(Σ|o_i|) Σ_i Σ_t L_{i,t}` | Group Relative | ❌ 无 |
| **VAPO** | 2025-04 | ByteDance | **Clip-Higher**<br>Token-Level | ✅ **Dynamic Sampling** | Token-Level | **Value Model**<br>1. Pretrain 50步<br>2. **Decoupled GAE**<br>3. **Length-Adaptive GAE**<br>`λ=1-1/(α·l)` | ✅ 有 |
| **CISPO** | 2025-06 | MiniMax | **Hard Clip IS Weight**<br>Token-Level<br>`sg(clip(r))·A·logπ`<br>**保留所有梯度** | ❌ 标准Group采样 | Token-Level | Group Relative | ❌ 无 |
| **GSPO** | 2025-07 | Alibaba | Hard Clip<br>**Sequence-Level**<br>`r_seq=exp((logπ(seq)-logπ_old(seq))/|seq|)` | ❌ 标准Group采样 | **Sequence-Level**<br>`mean(L_seq)` | Group Relative | ❌ 无 |
| **SAPO** | 2025-11 | Alibaba | **Soft Gating**<br>**Sequence-Level**<br>`g·A` where `g=σ(τ·(r-1))·(4/τ)`<br>非对称温度: `τ_neg>τ_pos` | ❌ 标准Group采样 | **Sequence-Level** | Group Relative | ❌ 无 |

### 3.2 改进维度演进

#### IS Ratio稳定性演进

| 演进阶段 | 算法 | Clip方式 | Level | 特点 |
|:--------:|:----:|:--------:|:-----:|:----:|
| 1 | PPO/GRPO | Hard Clip Objective | Token | 被clip则梯度为0 |
| 2 | DAPO/VAPO | **Clip-Higher** | Token | 非对称，允许更大正向更新 |
| 3 | CISPO | **Hard Clip IS Weight** | Token | clip权重但保留梯度 |
| 4 | GSPO | Hard Clip | **Sequence** | 低方差，适合MoE |
| 5 | SAPO | **Soft Gating** | **Sequence** | 平滑衰减，最优稳定性 |

#### 样本选择策略

| 算法 | 策略 | 说明 |
|:----:|:----:|:----:|
| PPO/GRPO/CISPO/GSPO/SAPO | ❌ 标准采样 | Group内所有样本参与训练 |
| **DAPO/VAPO** | ✅ **Dynamic Sampling** | 过滤准确率0%或100%的prompt |

#### Loss聚合方式

| 方式 | 算法 | 公式/说明 |
|:----:|:----:|:---------:|
| Token-Level (局部) | PPO/GRPO/CISPO | `1/|o| Σ L_t` |
| Token-Level (全局) | DAPO/VAPO | `1/(Σ|o_i|) Σ_i Σ_t L_{i,t}` |
| Sequence-Level | GSPO/SAPO | `mean(L_seq)` |

#### Baseline估计方法

| 方法 | 算法 | 细节 |
|:----:|:----:|:----:|
| Value Model + GAE | PPO | 独立Critic网络 |
| Value Model + Adaptive GAE | **VAPO** | 1. Pretrain 2. Decoupled λ 3. Length-Adaptive λ |
| Group Relative | GRPO/DAPO/CISPO/GSPO/SAPO | `A=(R-mean(R))/std(R)` |

---

## 四、演进路线图详解

### 4.1 三大分支架构

```
                                ROOT
                              PPO (2022)
                         Actor-Critic + Value
                          + RM + Clip Objective
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌──────────────┐     ┌──────────────┐      ┌──────────────┐
   │  Branch 1    │     │  Branch 2    │      │  Branch 3    │
   │ Value-Free   │     │ Value-Based  │      │ Clip Optim.  │
   │ (GRPO家族)   │     │ (PPO家族)    │      │ (Soft Clip)  │
   └──────────────┘     └──────────────┘      └──────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
```

### 4.2 Branch 1: Value-Free 路线 (GRPO 家族)

```
GRPO (2024 Q4-2025 Q1) [DeepSeek]
│
├── 核心: 消除 Value Model
│   └── Advantage = R_i - mean(R)  [Group Baseline]
│
├── 针对问题: Critic 训练困难、显存占用高
│
└── 子节点:
    │
    ├── DAPO (2025-03) [ByteDance] ⭐开源
    │   ├── 基于: GRPO
    │   ├── 改进:
    │   │   ├── Clip-Higher (非对称裁剪: 0.2/0.28)
    │   │   ├── Dynamic Sampling (过滤0%/100%样本)
    │   │   ├── Token-Level Loss
    │   │   └── Overlong Filtering (长度控制)
    │   └── 效果: AIME 50%, 训练步数减半
    │
    ├── CISPO (2025-06) [MiniMax]
    │   ├── 基于: GRPO
    │   ├── 改进: Clip IS Weight (而非 Objective)
    │   │   └── 原问题: Hard Clip 丢失梯度
    │   │       └── 稀有词(recheck/aha)梯度为0
    │   ├── 方案: sg(clip(r))·A·logπ
    │   └── 效果: 所有token保留梯度，涌现反思能力
    │
    ├── GSPO (2025-07) [Alibaba] ⭐Qwen3核心
    │   ├── 基于: GRPO
    │   ├── 改进: Sequence-Level Optimization
    │   │   ├── Token IS → Sequence IS
    │   │   │   └── r_seq = exp((logπ(seq)-logπ_old(seq))/|seq|)
    │   │   └── Token Clip → Sequence Clip
    │   ├── 针对问题: Token-Level IS 高方差
    │   └── 效果: MoE训练稳定，无需Routing Replay
    │
    └── SAPO (2025-11) [Alibaba] ⭐Qwen3-VL核心
        ├── 基于: GSPO (Sequence-Level思想)
        ├── 改进: Soft Gating 替代 Hard Clip
        │   ├── Hard: 超过阈值梯度=0
        │   └── Soft: sigmoid平滑衰减
        │       ├── g⁺ = σ(τ_pos·(r-1))·(4/τ_pos)
        │       └── g⁻ = σ(τ_neg·(r-1))·(4/τ_neg)
        ├── 非对称温度: τ_neg > τ_pos
        └── 效果: 训练更稳定，Pass@1更高
```

### 4.3 Branch 2: Value-Based 回归路线 (PPO 家族)

```
VAPO (2025-04) [ByteDance] ⭐AIME 60.4%
│
├── 基于: PPO (保留 Value Model + Actor-Critic)
│   └── NOT基于 GRPO!
│
├── 吸收的技术 (Cross-branch融合):
│   ├── From GRPO: Group Sampling
│   ├── From DAPO: 
│   │   ├── Clip-Higher
│   │   ├── Token-Level Loss
│   │   └── Dynamic Sampling
│   └── 自主创新:
│       ├── Value Pretraining (50步预热)
│       ├── Decoupled GAE (value/policy不同λ)
│       └── Length-Adaptive GAE (λ=1-1/(α·l))
│
├── 针对问题: 
│   ├── PPO Value Model在长CoT不准
│   └── GRPO Value-Free在长CoT有局限
│
└── 效果:
    ├── AIME 2024: 60.4% (Qwen2.5-32B)
    ├── 训练步数: 仅5,000步
    └── 稳定性: 多次运行无崩溃
```

### 4.4 技术交叉融合图

```
                            DAPO (03)
                         [ByteDance]
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         │  Clip-Higher       │  Dynamic Sampling  │  Token-Loss
         │  Dynamic Sampling  │  Token-Loss        │
         │                    │                    │
         ▼                    ▼                    ▼
    CISPO (06)            VAPO (04)              SAPO (11)
    [MiniMax]            [ByteDance]            [Alibaba]
         │                    │                    │
         │               (Value-Based回归)         │
         │                    │                    │
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                              ▼
                         未来融合算法?
                         (2026 Prediction)
                         ├── Value-Based
                         ├── Sequence-Level
                         └── Soft Gating
```

---

## 五、问题 → 解决方案 映射

```
问题1: Critic训练困难/显存高
├── 解决: GRPO (消除Critic)
│   └── DAPO (工程化优化)
│   └── CISPO (梯度保留)
│   └── GSPO (低方差)
│   └── SAPO (稳定训练)
│
问题2: Value Model在长CoT不准
├── 解决: VAPO
│   ├── Value Pretraining
│   └── Length-Adaptive GAE
│
问题3: Hard Clip丢失梯度
├── 解决分支:
│   ├── CISPO (Clip IS Weight)
│   └── SAPO (Soft Gating)
│
问题4: Token-Level IS高方差
├── 解决: GSPO (Sequence-Level)
│
问题5: 输出过长/Length Hacking
├── 解决: DAPO (Overlong Filtering)
│
问题6: MoE训练不稳定
├── 解决: GSPO (无需Routing Replay)
│   └── SAPO (Soft Gating进一步稳定)
```

---

## 六、核心结论

### 6.1 两大独立分支

```
Branch 1 (Value-Free):  GRPO → DAPO → CISPO → GSPO → SAPO
Branch 2 (Value-Based): PPO → VAPO
```

### 6.2 技术融合点

- **VAPO** 是唯一跨分支融合的算法
  - 基于 PPO (Value-Based)
  - 吸收了 GRPO (Group Sampling)
  - 吸收了 DAPO (Clip-Higher/Dynamic Sampling)

### 6.3 关键演进方向

| 维度 | 演进路径 | 最佳实践 |
|:----:|:---------|:---------|
| **Clip技术** | Hard Clip → Clip-Higher → Hard Clip IS Weight → Soft Gating | SAPO |
| **优化Level** | Token-Level → Sequence-Level | GSPO/SAPO |
| **样本选择** | 标准采样 → Dynamic Sampling | DAPO/VAPO |
| **Baseline** | Value Model → Group Relative → Value+Adaptive | VAPO |

### 6.4 机构贡献

| 机构 | 算法 | 时间 | 特点 |
|:----:|:----:|:----:|:----:|
| **ByteDance** | DAPO, VAPO | 2025-03/04 | 工程化标杆，开源先驱 |
| **MiniMax** | CISPO | 2025-06 | 梯度保留创新 |
| **Alibaba** | GSPO, SAPO | 2025-07/11 | Sequence-Level，Soft Gating |
| **DeepSeek** | GRPO | 2024 | Value-Free起点 |
| **OpenAI** | PPO | 2022 | 基础框架 |

---

**报告整理**: Xavier Zhang  
**最后更新**: 2026-03-10
