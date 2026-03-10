# Agentic RL 训练算法核心挑战深度报告

**研究范围**: 47篇Agentic RL训练算法论文（2024-2026 Q1）  
**最后更新**: 2026-03-09

---

## 执行摘要

基于对47篇论文的系统性分析，当前领域面临**四大核心挑战**：

| 排名 | 核心挑战 | 出现频率 | 主要表现形式 |
|------|----------|----------|--------------|
| **1** | **奖励信号质量** | 68% | 稀疏奖励、噪声奖励、advantage collapse |
| **2** | **训练稳定性** | 53% | IS ratio极端化、梯度不稳定、收敛保证 |
| **3** | **探索效率** | 44% | 探索不足、On-policy局限、冷启动 |
| **4** | **信用分配** | 44% | 长视野归因、token/step级精度、multi-turn归因 |

**2026 Q1关键突破**: SeeUPO（首个multi-turn收敛保证）、EMPO²（记忆增强探索，+128.6%）、ARLArena（系统分析框架）

---

## 挑战一：奖励信号质量 (68%论文提及)

### 问题本质

Agentic RL面临的最根本问题是**如何设计高质量的学习信号**。Agent任务通常是长程的（数百步推理、多轮交互），但rewards仅在最终成败时才可用，导致：

- **稀疏奖励** (16篇): 中间过程无反馈信号
- **噪声奖励** (4篇): 外部reward model反馈不准确
- **Advantage collapse** (3篇): GRPO组内相同reward导致advantage为零

### 代表性论文及解决方案

#### 1.1 稀疏奖励问题

| 论文 | 核心洞察 | 技术方案 | 关键成果 |
|------|----------|----------|----------|
| **Step-GRPO** | 规则化推理步骤可评估 | 设计Reasoning Accuracy Reward和Validity Reward，为每个推理步骤提供细粒度反馈 | 解决稀疏奖励，提升数学推理 |
| **ARPO** | 熵信号可作为过程监督 | 结合熵自适应rollout和步骤级奖励 | 无需外部RM，多轮场景稳定性提升 |
| **LADDER** | 难度自适应的课程学习 | 递归生成progressively simpler variants，从简单问题获得更频繁的正奖励 | 自生成课程，无需人工设计 |
| **IGPO** ⭐ | 信息增益可作为内在奖励，**面向credit assignment和Advantage Collapse**。构造turn-level信息增益奖励：在每一个交互轮次t，计算模型产生正确答案的概率，当轮奖励被定义为该概率相对于上一轮的边际增加量 | Turn-level reward = 策略产生正确答案概率的边际增加。如果本轮搜索让模型对正确答案更有信心，奖励为正；反之则为负。**无需外部RM**，完全intrinsic |
| **ReGFT** (ICLR 2026) | 参考解法可引导轨迹生成，**本质是SFT而非RL**。解决ReFT局限：当模型完全无法独立解决某个难题（采样不到正确答案）时，ReFT无法获得训练数据 | 引入人工参考答案作为引导（Hint），帮助模型生成它原本无法独立生成的正确推理路径。提供部分人工参考解法，模型生成自己的推理trace | 解决困难问题冷启动和reward sparsity |

**2026趋势**: IGPO和ReGFT代表了减少对外部reward model依赖的方向。

#### 1.2 噪声奖励问题

| 论文 | 核心方案 |
|------|----------|
| **PF-PPO** | 基于reward model的不确定性过滤不可靠样本，只用高置信度奖励训练 |
| **ZeroSearch** | 用LLM作为retrieval module，避免真实搜索API的噪声文档 |

#### 1.3 Advantage Collapse问题

| 论文 | 核心方案 |
|------|----------|
| **EDGE-GRPO** | 引入熵项打破组内相同reward导致的advantage=0问题 |
| **DARS** | 多阶段rollout，针对困难问题增加采样，避免中等难度样本主导训练 |
| **ProxMO** | Success-rate-aware动态调整梯度强度，proximity-based通过语义加权导出baseline |

---

## 挑战二：训练稳定性 (53%论文提及)

### 问题本质

长程推理和Agent任务的**梯度方差爆炸**和**策略震荡**：

- **IS ratio极端化** (6篇): Importance sampling权重过大/过小
- **Outlier tokens** (4篇): 个别token的极端奖励主导更新
- **Value估计偏差** (3篇): Value network在长CoT中不准确

### 代表性论文及解决方案

#### 2.1 IS Ratio控制

| 论文 | 核心洞察 | 技术方案 | 创新点 |
|------|----------|----------|--------|
| **DAPO** | clip机制应解耦控制 | Decoupled clipping机制独立控制IS ratio上下界，动态调整采样策略避免极端值 | **字节跳动**，工业界大规模实践 |
| **GMPO** | 几何平均对outliers不敏感 | Token reward的几何平均替代算术平均，IS ratio更稳定 | 阿里巴巴，数学推理优化 |
| **ProRL** | 定期重置可防止偏离，**解决熵崩塌和训练稳定性问题** | Reference policy周期性重置，防止policy偏离过远导致IS ratio失控。提出一套完整的训练配方（recipe） | 长期RL训练突破推理边界 |
| **LUFFY** | Off-policy数据需正则化 | 在mixed-policy训练中加入IS正则化项，避免过拟合off-policy数据 | 结合SFT和RL的稳定性方案 |

#### 2.2 方差控制

| 论文 | 核心洞察 | 技术方案 | 关键成果 |
|------|----------|----------|----------|
| **VCPO** (ICLR 2026) | 有效样本大小可预测方差 | ESS动态学习率 + 闭式最小方差基线(OPOB) | **动态学习率调整**，方差减少显著 |
| **VAPO** | KL系数应自适应 | Value-based增强PPO，自适应调整KL系数平衡探索与稳定性 | 阿里通义，KL自适应控制 |
| **OTB** | Logit-Gradient可作为代理 | Token级最优基线，用forward-pass概率近似梯度范数 | 计算效率与稳定性兼顾 |

#### 2.3 收敛保证与系统框架 ⭐ (2026 Q1突破)

| 论文 | 核心洞察 | 技术方案 | 理论贡献 |
|------|----------|----------|----------|
| **SeeUPO** ⭐ | Multi-turn可建模为顺序决策 | Sequence-level sequential update + backward induction | **首个multi-turn收敛保证** (ICLR 2026)，证明REINFORCE+GRAE可收敛到全局最优 |
| **ARLArena** (SAMPO) | 训练崩溃源于负优势+宽松IS裁剪轨迹的累积 | 系统测试4个维度：IS clipping, dynamic filtering, advantage assignment, loss aggregation。发现**ARL对IS clipping极度敏感**，必须采用sequence-level裁剪且不能过于宽松 | 细粒度credit assignment+轨迹过滤可产生正向效果，轨迹过滤与Advantage Collapse问题息息相关 |

**SeeUPO的核心洞察**: 证明了传统算法（PPO、GRPO）在multi-turn任务上**no-critic和训练收敛不可得兼**。通过"多智能体建模"把多轮博弈转为团队单轮博弈，将multi-turn建模为顺序执行的multi-agent bandit，通过backward induction反向逐轮更新策略，保证单调改进和全局最优。这是**理论上首次**证明multi-turn场景的收敛性。

---

## 挑战三：探索效率 (44%论文提及)

### 问题本质

如何在**巨大的语言动作空间**中高效探索有效策略：

- **探索不足** (4篇): LLM依赖预训练知识，无法发现新状态
- **On-policy局限** (3篇): 只能学习模型当前能力范围内的策略
- **计算成本高** (5篇): 大量rollouts导致训练缓慢
- **困难样本欠采样** (3篇): 简单样本主导训练

### 代表性论文及解决方案

#### 3.1 突破On-policy局限

| 论文 | 核心洞察 | 技术方案 | 关键成果 |
|------|----------|----------|----------|
| **LUFFY** | Off-policy demonstrations可提供探索信号 | Mixed-Policy GRPO结合off-policy demonstrations和on-policy rollouts | 学习超出当前能力的推理模式，OOD提升6.2分 |
| **ProRL** | 延长训练可突破推理边界 | 长期RL训练（持续更新reference policy） | 证明延长训练可突破base model推理边界 |

#### 3.2 计算效率优化

| 论文 | 核心方案 | 效率提升 |
|------|----------|----------|
| **TreePo** | 前缀共享+早停剪枝的树结构自引导rollout | **节省22%-43% GPU时间** |
| **ZeroSearch** | 用LLM作为retrieval module，避免真实搜索API | 成本降低到零 |
| **SSRL** | 不依赖外部搜索引擎，完全offline训练 | 成本降低到零 |

#### 3.3 难度自适应探索

| 论文 | 核心方案 |
|------|----------|
| **DARS** | 多阶段采样策略，为低准确度困难问题动态分配更多rollouts |
| **LADDER** | 模型自己生成progressively easier problems，递归生成简化变体 |
| **ReGFT** | 用部分人工参考解法引导模型生成轨迹，保持在模型推理空间内 |

#### 3.4 记忆增强探索 ⭐ (ICLR 2026突破)

| 论文 | 核心洞察 | 技术方案 | 关键成果 |
|------|----------|----------|----------|
| **EMPO²** ⭐ | 外部记忆可实现系统性探索 | Hybrid on/off-policy + 自生成记忆: Agent对失败轨迹总结生成tips（成功轨迹的数据自增强），三种训练模式：on-policy-w/o-tips; on-policy-w/-tips; off-policy-w/del-tips。Self-generated tips存储探索经验，记忆增强prompting引导探索新状态，off-policy内化记忆知识到参数，intrinsic reward鼓励新状态发现 | **ScienceWorld +128.6%**, WebShop +11.3%, OOD场景平均+136% |

**EMPO²的核心洞察**: 探索不足是LLM Agent的关键瓶颈。通过parametric（参数学习）+ non-parametric（外部记忆）双重更新，实现系统性探索而非依赖预训练知识。

---

## 挑战四：信用分配 (44%论文提及)

### 问题本质

长程Agentic任务中，**如何将最终奖励精确归因到每个决策步骤**：

- **Token/Step级归因不足** (6篇): 轨迹级奖励无法区分各步骤贡献
- **长视野推理归因** (4篇): 数百步推理中早期错误的定位
- **Multi-turn归因** (6篇): 多轮对话中各轮贡献不清

### 代表性论文及解决方案

#### 4.1 Token/Step级归因

| 论文 | 核心洞察 | 技术方案 | 创新点 |
|------|----------|----------|--------|
| **ELPO** (ICLR 2026) | 二分搜索可定位关键错误 | 通过rollout tree和binary search精确定位first irrecoverable step，分层优势归因。在IS clipping上，**放宽critic error步骤后的裁剪率**，允许更强力的纠正性更新 | **精确定位错误步骤**，向不可挽回的错误学习 |
| **GiGPO** | 相同环境状态可作为锚点 | **Anchor State Grouping（锚点状态分组）**: 利用同一任务下多条rollout轨迹中自然重复出现的相同环境状态（anchor states），将这些状态作为"锚点"，聚合来自不同轨迹但在该状态下采取的不同动作，构建step-level的动作比较组 | **无需额外rollout**的细粒度信用分配 |
| **Step-GRPO** | 步骤可独立评估 | 为CoT中每个推理步骤设计独立的Reasoning Accuracy Reward和Validity Reward | 步骤级过程监督 |
| **ARPO** | 熵信号可用于步骤级归因 | 结合熵信号和步骤级奖励，多轮工具交互中每个action都获得精确反馈 | 多轮场景步骤级反馈 |
| **VinePPO** | MC estimates可消除value bias | 完全移除value network，用完整trajectory return替代value估计 | 消除value bias导致的misattribution |
| **CM2** | Checklist可多维度评估 | 7个细粒度评估组件，turn-level密集反馈 | 多维度过程监督 |

#### 4.2 Multi-turn专项归因 ⭐ (2026 Q1突破)

**问题特殊性**: Multi-turn场景中，各轮交互存在依赖关系，简单的outcome reward无法区分各轮贡献。

| 论文 | 核心洞察 | 技术方案 | 关键成果 |
|------|----------|----------|----------|
| **SeeUPO** ⭐ | 证明了传统算法（PPO、GRPO）在multi-turn任务上**no-critic和训练收敛不可得兼**。通过"多智能体建模"把多轮博弈转为团队单轮博弈 | 将multi-turn建模为顺序执行的multi-agent bandit，通过backward induction反向逐轮更新策略，保证单调改进和全局最优 | **首个multi-turn收敛保证** (AppWorld +43.3%, BFCL +24.1%) |
| **ProxMO** (ICLR 2026) | **基于GiGPO改进**：episode-level考虑问题难度，step-level使用更宽松的状态分组聚合 | Step级沿用anchor state但通过连续语义加权导出baseline，替代discrete batch统计，episode-level难度感知 | Plug-and-play工业解决方案 |
| **IGPO** | 信息增益可度量每轮贡献，**面向credit assignment和Advantage Collapse**。构造turn-level信息增益奖励：当轮奖励定义为模型产生正确答案概率相对于上一轮的边际增加量 | Turn-level reward = 策略产生正确答案概率的边际增加。如果本轮搜索让模型对正确答案更有信心，奖励为正；反之则为负 | **无需外部RM**的intrinsic reward |

**2026 Q1突破总结**:
- **SeeUPO**提供**首个理论保证**: Multi-turn RL可以收敛到全局最优
- **ProxMO**提供**工业解决方案**: 语义邻近性软聚合，无需修改模型架构
- **IGPO**提供**自包含方案**: 完全基于模型内部belief updates，无需外部reward model

---

## 挑战之间的相互关系

```
奖励信号质量
    ↓ (直接影响)
训练稳定性 ←→ 信用分配
    ↓ (制约)
探索效率
```

**关键洞察**: 奖励信号是源头（稀疏/噪声导致方差爆炸），信用分配是桥梁（精确归因改善奖励质量），探索效率受制约（不稳定训练限制探索）。

---

## 结论

### 四大核心挑战的本质

Agentic RL的挑战源于一个**根本性矛盾**:

> **Agent任务的长程性、开放性、交互性** vs **RL算法对短程、可验证、单步决策的假设**

| Agent任务特征 | RL算法假设 | 产生的挑战 |
|--------------|------------|-----------|
| 长程推理（数百步） | 短程决策（10-100步） | 信用分配困难、方差爆炸（稳定性） |
| 开放式目标 | 可验证奖励 | 奖励稀疏、难以设计（奖励质量） |
| 多步骤交互 | 单步反馈 | 延迟反馈、归因不清（信用分配） |
| 巨大动作空间 | 小动作空间 | 探索低效（探索效率） |

### 2026 Q1关键突破

| 突破 | 论文 | 解决的挑战 | 意义 |
|------|------|------------|------|
| **首个收敛保证** | SeeUPO | 训练稳定性 + 信用分配 | **理论上证明multi-turn RL可收敛** |
| **记忆增强探索** | EMPO² | 探索效率 | **+128.6%提升**，parametric+non-parametric双重更新 |
| **系统分析框架** | ARLArena | 训练稳定性 | 首个ARL稳定性系统分析工具 |
| **Intrinsic reward** | IGPO | 奖励信号质量 + 信用分配 | 无需外部RM，自包含解决方案 |
| **语义邻近性** | ProxMO | 信用分配 | Plug-and-play工业方案 |

### 综合洞察

综合这些论文，改进主要聚焦三个问题：

1. **奖励稀疏和信用分配**: GiGPO、IGPO、ELPO、ProxMO等通过Anchor State Grouping、信息增益奖励、二分搜索定位关键错误、语义邻近性软聚合等机制，实现细粒度信用分配。这也是multi-turn RL的关键缺陷——no-critic（GRAE）算法本身存在优势归因难点，加上multi-turn任务超长的rollout更放大了这一缺陷。

2. **训练稳定性和收敛**: SeeUPO证明了传统算法（PPO、GRPO）在multi-turn任务上no-critic和稳定收敛不可得兼。ARLArena揭示了训练崩溃的真正原因：负优势+宽松IS裁剪轨迹的累积。为了稳定的、收敛的训练，需要关注四个维度：IS clipping、dynamic filtering、advantage assignment、loss aggregation。

3. **探索效率和经验利用**: EMPO2、ReGFT、ELPO都关注如何让探索更有价值、如何让当前经验发挥更大价值。EMPO2通过失败轨迹总结生成tips实现数据自增强；ReGFT通过人工参考答案作为hint解决难题冷启动；ELPO通过向不可挽回的错误学习增强可靠性。

---

**报告生成日期**: 2026-03-10  
**论文分析数量**: 47篇  
**核心挑战**: 奖励信号质量(68%)、训练稳定性(53%)、探索效率(44%)、信用分配(44%)  
**重点论文**: SeeUPO (收敛保证), EMPO² (探索突破), ARLArena (系统框架), IGPO (intrinsic reward), ProxMO (语义邻近性), GiGPO (锚点状态分组), ELPO (错误定位), ProRL (训练配方)
