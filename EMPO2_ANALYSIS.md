# EMPO² 论文深度分析

**论文**: Exploratory Memory-Augmented LLM Agent via Hybrid On- and Off-Policy Optimization  
**arXiv**: 2602.23008 | **会议**: ICLR 2026 (Accepted) | **机构**: Microsoft Research + KAIST  
**作者**: Zeyuan Liu, Jeonghye Kim, Xufang Luo, Dongsheng Li, Yuqing Yang  
**GitHub**: agent-lightning/empo2

---

## 一、核心问题

### 探索是LLM Agent的关键瓶颈

**问题陈述**:
- 当前LLM Agent依赖**利用预训练知识**，而非系统性探索
- 在需要**发现新状态**的环境中失败
- GRPO等方法过早收敛到次优解，无法持续探索

**具体案例** (ScienceWorld):
```
任务: 打开红色灯泡
问题: 当前房间没有红色灯泡 → 需要探索其他房间
GRPO行为: 重复尝试"focus on red bulb" → 失败 → 不改变策略 → 训练停滞
EMPO²行为: 记忆失败经验 → 探索其他房间 → 找到灯泡 → 完成任务
```

---

## 二、解决方案：EMPO² 框架

### 2.1 核心思想

**双重更新范式**:
1. **Parametric更新**: RL优化策略参数（长期能力）
2. **Non-parametric更新**: 外部记忆存储经验（短期适应）

**关键创新**: Non-parametric更新不仅补充，而且**增强**参数学习的效率

### 2.2 混合RL框架

#### Rollout阶段（2种模式）

| 模式 | 概率 | 描述 |
|------|------|------|
| **(1) 无记忆Prompting** | p | 仅基于当前状态和任务 |
| **(2) 记忆增强Prompting** | 1-p | 检索相关tips，条件于tips生成动作 |

**默认**: p = 0.25（75%使用记忆）

#### Update阶段（2种模式）

对于模式(2)的轨迹，随机选择：

| 更新模式 | 概率 | IS Ratio计算 | 作用 |
|---------|------|-------------|------|
| **(a) On-policy** | 1-q | π(a\|s,u,tips) / π_old(a\|s,u,tips) | 学习使用记忆 |
| **(b) Off-policy** | q | π(a\|s,u) / π_old(a\|s,u,tips) | 内化记忆知识 |

**默认**: q = 2/3（67% off-policy）

#### 三种组合模式

```
Mode 1: On-policy无记忆
    Rollout: 无tips
    Update: π(a|s,u) / π_old(a|s,u)
    
Mode 2: On-policy有记忆
    Rollout: 有tips
    Update: π(a|s,u,tips) / π_old(a|s,u,tips)
    
Mode 3: Off-policy ⭐
    Rollout: 有tips (Teacher)
    Update: π(a|s,u) / π_old(a|s,u,tips) (Student)
    → Reward-guided knowledge distillation
```

### 2.3 关键技术

#### 1. Self-Generated Memory

**Tip生成**:
- 每个episode结束后，策略πθ生成reflective tip
- Prompt: "总结轨迹、获得的信息、距离完成任务的距离"
- 存储到memory buffer M

**Tip检索**:
- 基于cosine similarity（阈值>0.5）
- 返回Top-10 by score

#### 2. Off-Policy Stabilization

**问题**: Off-policy训练易不稳定，可能collapse（梯度→NaN）

**解决**: Token masking机制
```
仅对 π_θ(a|s,u) ≥ δ 的token更新
抑制低概率token的advantage项
```

**原理**: 低概率token放大梯度幅度，通过unbounded likelihood ratio

#### 3. Intrinsic Reward for Exploration

**定义**: r_intrinsic = 1/n
- n = 相似历史状态的数量
- 鼓励探索新状态

**效果**: 维持policy entropy，避免过早收敛

---

## 三、实验结果

### 3.1 ScienceWorld（19个任务）

| 方法 | 平均Return | vs GRPO |
|------|-----------|---------|
| Qwen2.5-7B-Instruct | -61.3 | - |
| Reflexion (Non-param) | 17.1 | - |
| Retrospex (Offline RL) | 33.8 | - |
| GRPO (Online RL) | 33.2 | - |
| **EMPO²** | **75.9** | **+128.6%** ⬆️ |

**突破性成绩**:
- 7个任务达到满分100分
- power-component: 15.1 → 94.3
- Classification任务: 全部100分

### 3.2 WebShop

| 方法 | Score | Success Rate |
|------|-------|--------------|
| GRPO | 79.3 | 66.1% |
| GiGPO w/ std | 84.4 | 72.8% |
| GiGPO w/o std | 86.2 | 75.2% |
| **EMPO²** | **88.3** | **76.9%** |

**提升**: +11.3% over GRPO, +2.4% over best GiGPO

### 3.3 OOD适应性（Few-shot，无参数更新）

| 迁移场景 | GRPO | EMPO² | 提升 |
|---------|------|-------|------|
| Biology 1 → Biology 2 | -6.2 | 22.5 | +137.5% |
| Biology 2 → Electricity | -21.4 | 32.3 | +74.9% |
| Electricity → Chemistry | 18.9 | 88.1 | +177.9% |

**关键**: 仅需几次试用+记忆，无需参数更新

---

## 四、核心贡献

### 1. 探索机制创新

**Non-parametric updates bootstrap parametric updates**:
- 记忆引导探索新状态
- 参数学习内化探索经验
- 双重更新相互促进

### 2. Hybrid On/Off-Policy

**Off-policy作为knowledge distillation**:
- Tips-conditioned policy作为Teacher
- Base policy作为Student
- Reward-guided selective distillation

### 3. 训练稳定性

**Token masking**:
- 抑制低概率token
- 防止off-policy collapse
- 梯度稳定

---

## 五、与现有挑战的关系

### 直接解决的核心挑战

| 挑战 | EMPO²的贡献 | 机制 |
|------|------------|------|
| **探索效率** ⭐ | 记忆引导探索，避免重复失败 | Self-generated tips + intrinsic reward |
| **训练稳定性** | Off-policy稳定化 | Token masking |
| **泛化能力** | OOD快速适应 | Memory-based few-shot |
| **On-policy局限** | Hybrid on/off-policy | Off-policy knowledge distillation |

### 在挑战框架中的定位

**主要贡献维度**:
1. **探索效率**（挑战三）- 核心焦点
2. **训练稳定性**（挑战二）- Off-policy稳定化
3. **泛化能力**（次要挑战七）- OOD适应

**独特性**: 首个系统性解决**探索不足**问题的框架

---

## 六、方法论对比

### vs Reflexion

| 维度 | Reflexion | EMPO² |
|------|-----------|-------|
| 参数更新 | ❌ 仅记忆 | ✅ 记忆+参数 |
| 目标 | 下次试用更高奖励 | 内化探索能力 |
| 长期性 | 短期适应 | 长期进化 |

### vs GRPO

| 维度 | GRPO | EMPO² |
|------|------|-------|
| 探索 | 依赖预训练知识 | 主动探索新状态 |
| 记忆 | ❌ 无 | ✅ Self-generated |
| 训练模式 | On-policy only | Hybrid on/off |
| 收敛 | 易过早收敛 | 持续改进 |

---

## 七、消融实验关键发现

### 1. 模式组合的必要性

去除任一组件 → 性能显著下降:
- 去除off-policy: 无法内化记忆知识
- 去除on-policy w/ memory: 无法学习使用记忆

**结论**: 三种模式缺一不可

### 2. Intrinsic Reward的作用

- 移除intrinsic reward → 训练停滞在较低水平
- 不同scale (0.5x, 1x, 2x, RND) → 最终性能相近
- 主要影响学习动态，而非最终结果

### 3. 计算成本

**Memory开销**: +19% rollout时间
- Tip generation: 22.5s
- Memory storage: 27.9s
- Retrieval: 6.1s

**总训练时间**: 由于response更长（更多探索推理），略高于GRPO，但**时间效率仍优于GRPO**

---

## 八、影响力评估

### 学术意义

| 维度 | 评分 | 理由 |
|------|------|------|
| **创新性** | ⭐⭐⭐⭐⭐ | 首个系统解决探索问题的hybrid框架 |
| **理论** | ⭐⭐⭐⭐ | Off-policy as knowledge distillation视角 |
| **实验** | ⭐⭐⭐⭐⭐ | 128.6%提升，7个任务满分 |
| **会议** | ⭐⭐⭐⭐⭐ | ICLR 2026 Accepted |
| **机构** | ⭐⭐⭐⭐ | Microsoft Research |

### 预测影响力

**⭐⭐⭐⭐⭐ 极高影响力潜力**

**理由**:
1. **解决核心痛点**: 探索不足是公认瓶颈
2. **显著性能提升**: 128.6%是巨大突破
3. **ICLR 2026**: 顶会背书
4. **Microsoft**: 工业界落地潜力
5. **开源**: agent-lightning/empo2

---

## 九、局限性与未来方向

### 论文自述的局限

1. **检索机制简单**: 目前用cosine similarity，可改进
2. **模型规模**: 仅测试Qwen2.5-7B，未验证大模型
3. **领域覆盖**: 主要在Embodied环境，未测试数学/代码

### 未来方向（论文建议）

- 扩展到更多模型家族和规模
- 应用于数学、代码、多跳QA、多模态RL
- 探索其他off-policy技术（beyond importance sampling）

---

## 十、关键洞察

### 1. 探索 vs 利用的新视角

**传统RL**: Exploration via random noise  
**EMPO²**: Exploration via memory-guided systematic search

### 2. Parametric vs Non-parametric

**不是二选一，而是协同**:
- Non-parametric: 快速适应，引导探索
- Parametric: 长期内化，泛化能力
- 结合: 短期引导 + 长期学习

### 3. Off-policy作为知识蒸馏

**重新诠释off-policy**:
- Teacher: Tips-conditioned policy
- Student: Base policy
- Distillation: Reward-guided selective

---

## 十一、纳入报告建议

### 建议添加到挑战三（探索效率）

**位置**: 3.1 突破On-policy局限

**理由**:
- 核心聚焦探索问题
- 128.6%提升证明有效性
- ICLR 2026背书

### 新增小节：3.4 记忆增强探索

| 论文 | 核心方案 | 如何解决 |
|------|----------|----------|
| **EMPO²** (2602.23008) | Hybrid on/off-policy + 自生成记忆 | 记忆存储探索经验，on-policy学习使用记忆，off-policy内化知识到参数；intrinsic reward鼓励新状态发现 |

### 更新统计

**探索效率挑战**:
- 论文数: 14/33 → 15/34
- 频率: 42% → 44%

---

## 十二、关键引用

> "Exploration remains the key bottleneck for large language model agents trained with reinforcement learning."

> "While memory is utilized during learning, moving toward more generalizable intelligence requires reducing dependence on external memory and instead embedding its benefits directly into the model's parameters."

> "Unlike GRPO, which converges prematurely to a suboptimal solution, EMPO² leverages continuous exploration and successfully solves the task."

---

**重要性**: ⭐⭐⭐⭐⭐ 极高  
**推荐纳入主报告**: ✅ 强烈推荐  
**分类**: 探索效率 + 训练稳定性 + 泛化能力
