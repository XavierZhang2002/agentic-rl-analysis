# 调研论文完整列表

**总计**: 47篇论文  
**时间跨度**: 2024-08 至 2026-03  
**更新日期**: 2026-03-09

---

| # | 论文标题 | arXiv | 机构 | 内容概括 |
|---|----------|-------|------|----------|
| 1 | **GRPO**: DeepSeek-R1 | 2501.12948 | DeepSeek | Group Relative Policy Optimization，用组相对奖励消除值函数，定义行业标准，Nature发表 |
| 2 | **DAPO**: Decoupled Clip and Dynamic Sampling | 2503.14476 | 字节/清华 | 解耦clip机制+动态采样，AIME 50分，开源训练系统（基于verl） |
| 3 | **LUFFY**: Learning under Off-Policy Guidance | 2504.14945 | 字节/港大 | Mixed-policy GRPO，结合off-policy demonstrations，OOD任务+6.2分 |
| 4 | **GMPO**: Geometric-Mean Policy Optimization | 2507.20673 | 微软 | Token reward几何平均替代算术平均，对outliers不敏感，已开源 |
| 5 | **ProRL**: Reference Policy Reset | 2505.24864 | 清华 | 周期性重置参考策略，证明RL可探索新策略空间 |
| 6 | **Step-GRPO**: Step-wise Reasoning Rewards | 2503.12937 | - | 基于规则的步骤级推理奖励，学习理解错误路径 |
| 7 | **EDGE-GRPO**: Entropy-Driven Advantage | 2507.21848 | - | 熵驱动advantage，解决advantage collapse问题 |
| 8 | **ARPO**: Entropy-Aware Rollout PO | 2507.19849 | 百度 | 熵自适应rollout + 步骤级信用分配，平衡推理与工具使用 |
| 9 | **TreePo**: Tree-structured Self-guided Rollout | 2508.17445 | 快手 | 前缀共享+早停剪枝，节省22-43% GPU时间 |
| 10 | **DARS**: Difficulty Adaptive Rollout Sampling | 2508.13755 | 阿里云 | 难度自适应多阶段rollout，为困难问题分配更多采样 |
| 11 | **CHORD**: Dynamic Weight Coordination | 2508.11408 | - | 动态权重协调on-policy RL和off-policy expert data |
| 12 | **VAPO**: Value-based Augmented PPO | 2504.05118 | 字节/清华 | 自适应KL惩罚+方差控制，解决value bias，AIME 60.4分 |
| 13 | **VinePPO**: Unbiased Value Estimation | 2410.01679 | - | 无偏MC估计替代value network，消除value bias，速度+3.0x |
| 14 | **PF-PPO**: Policy Filtration PPO | 2409.06957 | - | 基于reward可靠性的策略过滤，过滤噪声奖励，HumanEval +7.9% |
| 15 | **ARLArena**: Unified Framework for Stable ARL | 2602.21534 | UCLA | 系统分析框架，分解policy gradient为4个设计维度，提出SAMPO稳定算法 |
| 16 | **SeeUPO**: Sequence-Level with Convergence Guarantees | 2602.06554 | 阿里 | 首个multi-turn收敛保证，顺序更新+backward induction，AppWorld +43.3% |
| 17 | **ProxMO**: Proximity-Based Multi-Turn Optimization | 2602.19225 | 腾讯/港理工 | 难度感知信用分配，success-rate调制+邻近性聚合，plug-and-play |
| 18 | **ReGFT**: Reference Guided Fine-Tuning | 2603.01223 | CMU | 人工参考解法引导轨迹合成，解决困难问题冷启动，提升RL性能上限 |
| 19 | **IGPO**: Information Gain-based PO | 2510.14967 | 阿里 | Turn-level内在奖励（信息增益），无需外部RM，密集反馈 |
| 20 | **EMPO²**: Memory-Augmented Exploration | 2602.23008 | Microsoft | Hybrid on/off-policy + 自生成记忆，ScienceWorld +128.6%，**ICLR 2026** |
| 21 | **AceCoder**: Automated Test Case Synthesis | 2502.01718 | - | 大规模测试用例合成pipeline，解决代码奖励稀缺，Llama-8B +10分 |
| 22 | **ToRL**: Tool-integrated RL | 2503.23383 | - | Tool-integrated RL，reward-driven发现emergent behaviors，AIME +14% |
| 23 | **LADDER**: Self-guided Learning | 2503.00735 | - | 递归生成progressively simpler variants，Llama-3B 1%→82% |
| 24 | **START**: Tool-integrated Long CoT | 2503.04625 | - | Hint-infer刺激工具使用，GPQA 63.6%, AIME 66.7% |
| 25 | **WebThinker**: Deep Web Explorer | 2504.21776 | - | Think-Search-Draft策略，在线DPO，QwQ-32B |
| 26 | **R1-Searcher**: RL-trained Search | 2503.05592 | - | 两阶段outcome-based RL，自主调用搜索，Qwen2.5-7B |
| 27 | **ZeroSearch**: Simulated Search Engine | 2505.04588 | - | LLM模拟搜索引擎，curriculum-based rollout，7B达到真实搜索性能 |
| 28 | **SSRL**: Self-Search RL | 2508.10874 | - | Format/rule-based rewards，增强内部知识，offline训练 |
| 29 | **VCPO**: Variance-Controlled Off-Policy RL | 2602.17616 | MIT | ESS动态学习率+OPOB基线，异步训练稳定，2.5x加速，**已开源** |
| 30 | **ELPO**: Error-Localized Policy Optimization | 2602.09598 | 阿里 | 二分搜索定位first irrecoverable step，TIR任务突破 |
| 31 | **CM2**: Checklist Rewards for Multi-Turn Tool Use | 2602.12268 | 字节 | 7细粒度评估组件，τ-Bench +8, BFCL +10，**已开源** |
| 32 | **Agent World Model**: Synthetic Environments | 2602.10090 | Snowflake | 代码驱动合成1000环境，SQLite后端，跨域泛化，**已开源** |
| 33 | **ASTER**: Interaction-Dense Cold Start | 2602.01204 | 上海AI Lab | 避免Interaction Collapse，4K高交互轨迹，AIME 90% |
| 34 | **Tool-R0**: Zero-Data Self-Play | 2602.21320 | Amazon AGI | Generator-Solver自博弈，参数分离关键，92.5%提升 |
| 35 | **Dr. MAS**: Multi-Agent Stability | 2602.08847 | NExT++ | Agent-wise归一化，消除多智能体梯度尖峰，理论证明 |
| 36 | **SGE**: Strategy-Guided Exploration | 2603.02045 | DeepMind | 策略空间探索（语言策略），mixed-temperature采样 |
| 37 | **OTB**: Optimal Token Baseline | 2602.07078 | 阿里 | Logit-Gradient Proxy，token级方差缩减，65% token节省 |
| 38 | **DART**: Disentangled Tuning | 2602.00994 | 蚂蚁 | LoRA解耦reasoning和tool-use，证明梯度冲突 |
| 39 | **ASTRA**: Automated Synthesis | 2601.21558 | 链家 | MCP服务自动合成轨迹，可验证环境构建，**已开源** |
| 40 | **Tongyi DeepResearch**: Technical Report | 2510.24701 | 阿里云 | Agentic Mid+Post-training，30.5B参数，Humanity's Last Exam SOTA |
| 41 | **GLM-5**: from Vibe Coding to Agentic Engineering | 2602.15763 | 智谱AI | DSA稀疏注意力，异步RL基础设施，LMArena #1，**已开源** |
| 42 | **ABE**: Automated Build Environments | 2508.08791 | 字节/复旦 | 5阶段环境构建pipeline，自动化生成可执行环境，**已开源** |
| 43 | **GEM**: Text-to-Trajectory Synthesis | 2601.10355 | 美团/人大 | 4阶段合成pipeline，10K轨迹低成本生成，BFCL +16.5% |
| 44 | **DeepSWE**: Open-source SWE Agent | - | - | 开源SOTA软件工程智能体，大规模RL训练系统 |
| 45 | **Satori**: Outcome-based Math RL | - | - | Qwen-2.5-Math-7B，outcome-based RL用于数学和SWE |
| 46 | **β-DPO**: Dynamic KL Coefficient | - | - | DPO的动态KL系数，适应训练动态 |
| 47 | **SimPO**: Sequence Average Log-prob | - | - | 序列平均log-prob作为隐式reward |

---

## 统计数据

| 类别 | 数量 |
|------|------|
| **总论文数** | 47篇 |
| **GRPO家族** | 11篇 |
| **2026 Q1新增** | 6篇（含ICLR 2026） |
| **已开源** | 8-9篇（17-19%） |
| **中国机构** | 28+篇（60%+） |
| **顶会论文** | 2篇（ICLR 2026, Nature） |

---

## 重点论文（Top 10）

1. **DeepSeek-R1** - GRPO行业标准，Nature
2. **GLM-5** - LMArena #1，商业成功
3. **EMPO²** - 探索突破，ICLR 2026
4. **SeeUPO** - 首个收敛保证
5. **VCPO** - MIT，异步稳定性
6. **ARLArena** - UCLA，系统框架
7. **DAPO** - 字节，开源系统
8. **GMPO** - 微软，几何平均
9. **Tongyi** - 阿里，技术报告
10. **CM2** - 字节，Checklist方法

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
