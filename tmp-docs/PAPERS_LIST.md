# 调研论文完整列表

**总计**: 47篇论文  
**时间跨度**: 2024-08 至 2026-03  
**更新日期**: 2026-03-09

**挑战标签说明**:
- 🎯 奖励信号质量
- ⚡ 训练稳定性
- 🔍 探索效率
- 🎲 信用分配

---

| # | 论文标题 | arXiv | 机构 | 核心挑战 | 内容概括 |
|---|----------|-------|------|----------|----------|
| 1 | **GRPO**: DeepSeek-R1 | 2501.12948 | DeepSeek | ⚡ | 组相对奖励消除值函数，简化训练pipeline，定义行业标准（Nature发表） |
| 2 | **DAPO**: Decoupled Clip and Dynamic Sampling | 2503.14476 | 字节/清华 | ⚡🎯🔍 | 解耦clip控制IS ratio + 动态采样，AIME 50分，开源系统 |
| 3 | **LUFFY**: Learning under Off-Policy Guidance | 2504.14945 | 字节/港大 | 🔍🎯 | Mixed-policy GRPO突破on-policy局限，OOD +6.2分 |
| 4 | **GMPO**: Geometric-Mean Policy Optimization | 2507.20673 | 微软 | ⚡🎯 | 几何平均抑制outlier tokens，IS ratio稳定，已开源 |
| 5 | **ProRL**: Reference Policy Reset | 2505.24864 | 清华 | 🔍⚡ | 周期性重置参考策略，证明RL可探索新策略空间 |
| 6 | **Step-GRPO**: Step-wise Reasoning Rewards | 2503.12937 | - | 🎯🎲 | 步骤级推理奖励，理解错误路径，细粒度反馈 |
| 7 | **EDGE-GRPO**: Entropy-Driven Advantage | 2507.21848 | - | 🎯⚡ | 熵驱动advantage解决advantage collapse，梯度稳定 |
| 8 | **ARPO**: Entropy-Aware Rollout PO | 2507.19849 | 百度 | 🎲🎯 | 熵自适应rollout + 步骤级信用分配，工具使用平衡 |
| 9 | **TreePo**: Tree-structured Self-guided Rollout | 2508.17445 | 快手 | 🔍⚡ | 树结构rollout，前缀共享+早停，节省22-43% GPU |
| 10 | **DARS**: Difficulty Adaptive Rollout Sampling | 2508.13755 | 阿里云 | 🔍🎯 | 难度自适应采样，困难问题增加rollouts，避免中等样本主导 |
| 11 | **CHORD**: Dynamic Weight Coordination | 2508.11408 | - | ⚡ | 动态权重协调SFT和RL，避免破坏响应模式 |
| 12 | **VAPO**: Value-based Augmented PPO | 2504.05118 | 字节/清华 | ⚡🎯🎲 | 自适应KL + 方差控制，解决value bias和异构序列，AIME 60.4 |
| 13 | **VinePPO**: Unbiased Value Estimation | 2410.01679 | - | ⚡🎲 | 无偏MC估计替代value network，消除credit misattribution |
| 14 | **PF-PPO**: Policy Filtration PPO | 2409.06957 | - | 🎯⚡ | 基于不确定性过滤噪声奖励，只用高置信度样本 |
| 15 | **ARLArena**: Unified Framework for Stable ARL | 2602.21534 | UCLA | ⚡ | Policy gradient 4维分解，系统分析不稳定源，提出SAMPO |
| 16 | **SeeUPO**: Sequence-Level with Convergence | 2602.06554 | 阿里 | ⚡🎲 | **首个multi-turn收敛保证**，backward induction，AppWorld +43% |
| 17 | **ProxMO**: Proximity-Based Multi-Turn | 2602.19225 | 腾讯/港理工 | 🎲🎯 | 难度感知信用分配，语义邻近性baseline，plug-and-play |
| 18 | **ReGFT**: Reference Guided Fine-Tuning | 2603.01223 | CMU | 🎯🔍 | 参考解法引导轨迹合成，解决困难问题reward sparsity |
| 19 | **IGPO**: Information Gain-based PO | 2510.14967 | 阿里 | 🎯🎲 | Turn-level内在奖励（信息增益），无需外部RM |
| 20 | **EMPO²**: Memory-Augmented Exploration | 2602.23008 | Microsoft | 🔍⚡ | **记忆增强探索，+128.6%**，Hybrid on/off-policy，**ICLR 2026** |
| 21 | **AceCoder**: Test Case Synthesis | 2502.01718 | - | 🎯 | 自动化测试用例合成，解决代码领域奖励稀缺 |
| 22 | **ToRL**: Tool-integrated RL | 2503.23383 | - | 🔍🎯 | Reward-driven发现emergent tool-use，AIME +14% |
| 23 | **LADDER**: Self-guided Learning | 2503.00735 | - | 🔍🎯 | 自生成课程学习，递归简化问题，1%→82% |
| 24 | **START**: Tool-integrated Long CoT | 2503.04625 | - | 🎯 | Hint-infer刺激工具使用，增加中间正反馈 |
| 25 | **WebThinker**: Deep Web Explorer | 2504.21776 | - | 🔍 | Think-Search-Draft策略，深度研究Agent |
| 26 | **R1-Searcher**: RL-trained Search | 2503.05592 | - | 🔍 | 两阶段RL训练搜索能力，自主调用搜索 |
| 27 | **ZeroSearch**: Simulated Search Engine | 2505.04588 | - | 🔍🎯 | LLM模拟搜索引擎，避免API噪声和成本 |
| 28 | **SSRL**: Self-Search RL | 2508.10874 | - | 🔍 | 增强内部知识利用，offline训练，成本降至零 |
| 29 | **VCPO**: Variance-Controlled Off-Policy RL | 2602.17616 | MIT | ⚡ | ESS动态学习率 + OPOB基线，异步稳定，**已开源** |
| 30 | **ELPO**: Error-Localized PO | 2602.09598 | 阿里 | 🎲🎯 | 二分搜索定位first irrecoverable step，精确归因 |
| 31 | **CM2**: Checklist Rewards | 2602.12268 | 字节 | 🎯🎲 | 7维度细粒度奖励，multi-turn密集反馈，**已开源** |
| 32 | **Agent World Model**: Synthetic Environments | 2602.10090 | Snowflake | - | 代码驱动合成1000环境，可扩展性，**已开源** |
| 33 | **ASTER**: Interaction-Dense Cold Start | 2602.01204 | 上海AI Lab | 🔍 | 避免Interaction Collapse，高交互密度冷启动 |
| 34 | **Tool-R0**: Zero-Data Self-Play | 2602.21320 | Amazon AGI | 🔍 | Generator-Solver自博弈，零数据训练 |
| 35 | **Dr. MAS**: Multi-Agent Stability | 2602.08847 | NExT++ | ⚡ | Agent-wise归一化，多智能体梯度稳定，理论证明 |
| 36 | **SGE**: Strategy-Guided Exploration | 2603.02045 | DeepMind | 🔍 | 策略空间探索（语言策略），解决base model无法解决的任务 |
| 37 | **OTB**: Optimal Token Baseline | 2602.07078 | 阿里 | ⚡ | Token级最优基线，Logit-Gradient Proxy减少方差 |
| 38 | **DART**: Disentangled Tuning | 2602.00994 | 蚂蚁 | - | LoRA解耦reasoning和tool-use，证明梯度冲突 |
| 39 | **ASTRA**: Automated Synthesis | 2601.21558 | 链家 | - | MCP自动合成轨迹，可验证环境，**已开源** |
| 40 | **Tongyi DeepResearch** | 2510.24701 | 阿里云 | - | Agentic Mid+Post-training，30.5B参数，SOTA |
| 41 | **GLM-5**: Agentic Engineering | 2602.15763 | 智谱AI | - | 异步RL基础设施，LMArena #1，**已开源** |
| 42 | **ABE**: Automated Build Environments | 2508.08791 | 字节/复旦 | - | 自动化环境构建，可扩展性，**已开源** |
| 43 | **GEM**: Text-to-Trajectory Synthesis | 2601.10355 | 美团/人大 | - | 文本合成轨迹，数据生成，BFCL +16.5% |
| 44 | **DeepSWE**: Open-source SWE Agent | - | - | 🎯 | 软件工程Agent，outcome reward可验证 |
| 45 | **Satori**: Outcome-based Math RL | - | - | 🎯 | 数学推理Agent，outcome reward |
| 46 | **β-DPO**: Dynamic KL Coefficient | - | - | ⚡ | DPO动态KL，训练稳定性 |
| 47 | **SimPO**: Sequence Average Log-prob | - | - | 🎯 | 隐式reward设计 |

---

## 挑战标签统计

| 挑战 | 标签 | 论文数 | 频率 |
|------|------|--------|------|
| 奖励信号质量 | 🎯 | 23 | 68% |
| 训练稳定性 | ⚡ | 18 | 53% |
| 探索效率 | 🔍 | 15 | 44% |
| 信用分配 | 🎲 | 15 | 44% |

---

## 重点论文（Top 10）

1. **DeepSeek-R1** (⚡) - GRPO行业标准，Nature
2. **GLM-5** - LMArena #1，商业成功
3. **EMPO²** (🔍⚡) - 探索突破+128.6%，ICLR 2026
4. **SeeUPO** (⚡🎲) - 首个multi-turn收敛保证
5. **VCPO** (⚡) - MIT，异步稳定性
6. **ARLArena** (⚡) - UCLA，系统框架
7. **DAPO** (⚡🎯🔍) - 字节，开源系统
8. **GMPO** (⚡🎯) - 微软，几何平均
9. **Tongyi** - 阿里，技术报告
10. **CM2** (🎯🎲) - 字节，Checklist方法

---

## 关键术语

- **GRPO**: Group Relative Policy Optimization
- **TIR**: Tool-Integrated Reasoning
- **ESS**: Effective Sample Size（VCPO）
- **SAMPO**: Stable Agentic PO（ARLArena）
- **EMPO²**: Exploratory Memory-Augmented Optimization
- **Advantage collapse**: 组内相同奖励问题
- **First Irrecoverable Step**: 关键错误步骤（ELPO）
- **Interaction Collapse**: 交互密度下降（ASTER）

---

## 机构统计

| 机构 | 论文数 |
|------|--------|
| 阿里巴巴/阿里云 | 5 |
| 字节跳动 | 4 |
| 微软 | 2 |
| 其他中国机构 | 17+ |
| **中国总计** | **28+ (60%)** |

**开源率**: 8-9/47 = **17-19%**
