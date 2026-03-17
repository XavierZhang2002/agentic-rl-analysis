# 2026.3.10 Agentic RL 阅读笔记

昨天阅读了以下论文，都是Agentic RL主题下的：

## 论文清单

### 1. ARLArena (SAMPO)
**核心发现**:
- 测试四个维度：IS clipping, dynamic filtering, advantage assignment, loss aggregation
- 发现ARL对IS clipping非常敏感，必须采用sequence-level裁剪，且不能过于宽松
- **训练崩溃的原因**：(adv<0, IS clipping较小)轨迹的累积
- 细粒度的credit assignment+轨迹过滤也会产生正向效果
- 轨迹过滤和**Advantage Collapse问题息息相关**
- 在损失聚合上，token-mean和seq-mean-token-mean是最常用的两种方式

### 2. EMPO2
**核心贡献**:
- **解决探索效率的问题**
- 三种混合模式训练：on-policy-w/o-tips; on-policy-w/-tips; off-policy-w/del-tips
- tips来自Agent对自己失败轨迹的总结，相当于一种成功轨迹的数据自增强

### 3. SeeUPO
**核心贡献**:
- **解决multi-turn任务下，训练稳定性和收敛的问题**
- 证明了传统的算法（PPO，GRPO）no-critic和训练收敛不可得兼
- SeeUPO通过"多智能体建模"把多轮博弈转为团队单轮博弈
- 采用逆序更新算法，解决了这个trade-off

### 4. GiGPO
**核心贡献**:
- **面向credit assignment**
- 无需额外rollout的细粒度信用分配
- 通过**Anchor State Grouping（锚点状态分组）**实现
- 核心思想：利用同一任务下多条rollout轨迹中自然重复出现的相同环境状态（anchor states），将这些状态作为"锚点"，聚合来自不同轨迹但在该状态下采取的不同动作，从而构建step-level的动作比较组

### 5. IGPO
**核心贡献**:
- **面向credit assignment和Advantage Collapse**
- 构造**turn-level的信息增益奖励**
- 在每一个交互轮次t，计算模型产生正确答案的概率
- 当轮奖励被定义为该概率相对于上一轮的边际增加量
- 如果本轮的搜索或思考让模型对正确答案更有信心，奖励为正；反之则为负

### 6. ProRL
**核心贡献**:
- **解决熵崩塌和训练稳定性的问题**
- 算法上创新不多，主要是提出了一套训练配方（recipe）

### 7. ProxMO
**核心贡献**:
- **面向credit assignment**
- 基于GiGPO的改进
- episode-level考虑问题难度
- step-level沿用anchor state，但是使用更宽松的状态分组聚合

### 8. ReGFT
**核心贡献**:
- **解决探索效率的问题**
- 该方法**本质是SFT而不是RL**
- 主要是为了解决ReFT在面对"难题"时的局限性

**ReFT的局限性**:
- ReFT依赖于模型自身生成的正确轨迹
- 如果模型完全无法独立解决某个难题（采样不到正确答案），ReFT就无法获得训练数据

**ReGFT的改进**:
- ReGFT通过引入**人工参考答案（Reference Solutions）作为引导（Hint）**，帮助模型生成它原本无法独立生成的正确推理路径

### 9. ELPO
**核心贡献**:
- **面向credit assignment和奖励稀疏问题**
- 关注错误轨迹，通过二分法识别关键错误的step
- 通过细粒度的优势归因，计算分支级和轨迹级的advantage
- 在IS clipping上，放宽critic error步骤后的裁剪率，允许更强力的纠正性更新

**核心洞察**:
- ELPO的贡献在于它不再仅仅依赖"对或错"的最终结果
- 而是通过**主动探索**来定位推理链条中的关键失效点
- 这种"向不可挽回的错误学习"的方法，显著增强了LLM智能体在长程、多步决策任务中的可靠性和纠错能力

---

## 综合总结

综合这些ARL的论文，大部分关注三个问题：

1. **奖励稀疏和信用分配**
2. **训练稳定性和收敛**
3. **探索效率**

所做的改进主要在识别和细分优势，步骤归因，这也是multi-turn RL的关键缺陷，no-critic（GRAE）的RL算法本身就存在优势归因的难点，再加上multi-turn任务超长的rollout，更放大了这一缺陷，因此，高质量的reward和合适的credit assignment是非常必要的。

另一个问题是训练稳定性，SeeUPO认为，之前的RL算法适合单步任务，但是在multi-turn任务上，no-critic和稳定收敛不可得兼。这部分难以总结。

在探索效率和经验利用上，也有很多工作关注，EMPO2, ReGFT, ELPO都属此类。怎么去最大化的让探索更有价值，怎么让当前的经验发挥更大价值，也影响训练效果。

另外，ARLArena(SAMPO)这篇论文带来很大的启示，为了稳定的、收敛的训练，需要关注四个维度，即IS clipping, dynamic filtering, advantage assignment, loss aggregation。

---

**阅读日期**: 2026-03-10
