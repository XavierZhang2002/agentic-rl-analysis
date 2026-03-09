# 调研论文完整列表

**调研范围**: 34篇算法核心论文 + 15篇应用论文  
**时间跨度**: 2024-08 至 2026-03  
**更新日期**: 2026-03-09

---

## 一、GRPO家族（10篇）

| 序号 | 论文标题 | arXiv | 机构 | 内容概括 |
|------|----------|-------|------|----------|
| 1 | **GRPO**: DeepSeek-R1 | 2501.12948 | DeepSeek | Group Relative Policy Optimization，用组相对奖励消除值函数，定义行业标准 |
| 2 | **DAPO**: Decoupled Clip and Dynamic Sampling | 2503.14476 | 字节/清华 | 解耦clip机制+动态采样，AIME 50分，开源训练系统 |
| 3 | **LUFFY**: Learning to Reason under Off-Policy Guidance | 2504.14945 | 字节/港大 | Mixed-policy GRPO，结合off-policy guidance，OOD任务+6.2分 |
| 4 | **GMPO**: Geometric-Mean Policy Optimization | 2507.20673 | 微软 | Token reward几何平均替代算术平均，对outliers不敏感，Pass@1 +4.1% |
| 5 | **ProRL**: Reference Policy Reset | 2505.24864 | 清华 | 周期性重置参考策略，证明RL可探索新策略空间，延长训练突破推理边界 |
| 6 | **Step-GRPO**: Step-wise Reasoning Rewards | 2503.12937 | - | 基于规则的步骤级推理奖励，学习理解错误路径而非仅模仿成功 |
| 7 | **EDGE-GRPO**: Entropy-Driven Advantage | 2507.21848 | - | 熵驱动advantage，解决稀疏奖励导致的advantage collapse |
| 8 | **ARPO**: Entropy-Aware Rollout | 2507.19849 | 百度 | 熵自适应rollout + 步骤级信用分配，平衡推理与工具使用 |
| 9 | **TreePo**: Tree-structured Self-guided Rollout | 2508.17445 | 快手 | 前缀共享+早停剪枝，节省22-43% GPU时间 |
| 10 | **DARS**: Difficulty Adaptive Rollout Sampling | 2508.13755 | 阿里云 | 难度自适应多阶段rollout，为困难问题分配更多采样 |
| 11 | **CHORD**: Dynamic Weight Coordination | 2508.11408 | - | 动态权重协调on-policy RL和off-policy expert data |

---

## 二、PPO/DPO家族（5篇）

| 序号 | 论文标题 | arXiv | 机构 | 内容概括 |
|------|----------|-------|------|----------|
| 12 | **VAPO**: Value-based Augmented PPO | 2504.05118 | 字节/清华 | 自适应KL惩罚+方差控制，解决value bias和异构序列，AIME 60.4分 |
| 13 | **VinePPO**: Unbiased Value Estimation | 2410.01679 | - | 无偏MC估计替代value network，消除value bias，速度+3.0x |
| 14 | **PF-PPO**: Policy Filtration PPO | 2409.06957 | - | 基于reward可靠性的策略过滤，只用高置信度奖励，HumanEval +7.9% |
| 15 | **β-DPO**: Dynamic KL Coefficient | - | - | DPO的动态KL系数，适应训练动态 |
| 16 | **SimPO**: Sequence Average Log-prob | - | - | 序列平均log-prob作为隐式reward |

---

## 三、2026 Q1新增论文（6篇）⭐

| 序号 | 论文标题 | arXiv | 机构 | 会议 | 内容概括 |
|------|----------|-------|------|------|----------|
| 17 | **ARLArena**: Unified Framework for Stable ARL | 2602.21534 | UCLA | - | 系统分析框架，分解policy gradient为4个设计维度，提出SAMPO稳定算法 |
| 18 | **SeeUPO**: Sequence-Level with Convergence Guarantees | 2602.06554 | 阿里 | - | 首个multi-turn收敛保证，顺序更新+backward induction，AppWorld +43.3% |
| 19 | **ProxMO**: Proximity-Based Multi-Turn Optimization | 2602.19225 | 腾讯/港理工 | - | 难度感知信用分配，success-rate调制+邻近性聚合，plug-and-play |
| 20 | **ReGFT**: Reference Guided Fine-Tuning | 2603.01223 | CMU | - | 人工参考解法引导轨迹合成，解决困难问题冷启动，提升RL性能上限 |
| 21 | **IGPO**: Information Gain-based PO | 2510.14967 | 阿里 | - | Turn-level内在奖励（信息增益），无需外部RM，密集反馈 |
| 22 | **EMPO²**: Memory-Augmented Exploration | 2602.23008 | Microsoft | ICLR 2026 | Hybrid on/off-policy + 自生成记忆，ScienceWorld +128.6%，探索机制突破 |

---

## 四、数学/代码Agent论文（6篇）

| 序号 | 论文标题 | arXiv | 机构 | 内容概括 |
|------|----------|-------|------|----------|
| 23 | **AceCoder**: Test Case Synthesis | 2502.01718 | - | 大规模自动化测试用例合成，解决代码领域奖励稀缺，Llama-8B +10分 |
| 24 | **DeepSWE**: Open-source SWE Agent | - | - | 开源SOTA软件工程智能体，大规模RL训练系统 |
| 25 | **Satori**: Outcome-based RL | - | - | Qwen-2.5-Math-7B，outcome-based RL用于数学和SWE |
| 26 | **ToRL**: Tool-integrated RL | 2503.23383 | - | Tool-integrated RL，reward-driven发现emergent behaviors，AIME +14% |
| 27 | **LADDER**: Self-guided Learning | 2503.00735 | - | 递归生成progressively simpler variants，自引导学习，Llama-3B 1%→82% |
| 28 | **START**: Tool-integrated Long CoT | 2503.04625 | - | Hint-infer刺激工具使用，GPQA 63.6%, AIME 66.7% |

---

## 五、搜索Agent论文（4篇）

| 序号 | 论文标题 | arXiv | 机构 | 内容概括 |
|------|----------|-------|------|----------|
| 29 | **WebThinker**: Deep Web Explorer | 2504.21776 | QwQ-32B | Think-Search-Draft策略，在线DPO，知识密集型任务 |
| 30 | **R1-Searcher**: RL-trained Search | 2503.05592 | Qwen2.5-7B | 两阶段outcome-based RL，自主调用搜索，超越GPT-4o-mini RAG |
| 31 | **ZeroSearch**: Simulated Search Engine | 2505.04588 | - | LLM模拟搜索引擎，curriculum-based rollout，7B达到真实搜索性能 |
| 32 | **SSRL**: Self-Search RL | 2508.10874 | - | Format/rule-based rewards，增强内部知识利用，成本有效的sim-to-real |

---

## 六、核心应用论文（15篇）

| 序号 | 论文标题 | arXiv | 机构 | GitHub | 内容概括 |
|------|----------|-------|------|--------|----------|
| 33 | **VCPO**: Variance-Controlled Off-Policy RL | 2602.17616 | MIT | ✅ | ESS动态学习率+OPOB基线，异步训练稳定，2.5x加速 |
| 34 | **ELPO**: Error-Localized Policy Optimization | 2602.09598 | 阿里 | 待开源 | 二分搜索定位first irrecoverable step，TIR任务突破 |
| 35 | **CM2**: Checklist Rewards | 2602.12268 | 字节 | ✅ | 7细粒度评估组件，τ-Bench +8, BFCL +10 |
| 36 | **Agent World Model**: Synthetic Environments | 2602.10090 | Snowflake | ✅ | 代码驱动合成1000环境，SQLite后端，跨域泛化 |
| 37 | **ASTER**: Interaction-Dense Cold Start | 2602.01204 | 上海AI Lab | - | 避免Interaction Collapse，4K高交互轨迹，AIME 90% |
| 38 | **Tool-R0**: Zero-Data Self-Play | 2602.21320 | Amazon AGI | - | Generator-Solver自博弈，参数分离关键，92.5%提升 |
| 39 | **Dr. MAS**: Multi-Agent Stability | 2602.08847 | NExT++ | - | Agent-wise归一化，消除多智能体梯度尖峰 |
| 40 | **SGE**: Strategy-Guided Exploration | 2603.02045 | DeepMind | - | 策略空间探索（语言策略），解决base model无法解决的任务 |
| 41 | **OTB**: Optimal Token Baseline | 2602.07078 | 阿里 | - | Logit-Gradient Proxy，token级方差缩减，65% token节省 |
| 42 | **DART**: Disentangled Tuning | 2602.00994 | 蚂蚁 | - | LoRA解耦reasoning和tool-use，避免梯度冲突 |
| 43 | **ASTRA**: Automated Synthesis | 2601.21558 | 链家 | ✅ | MCP服务自动合成轨迹，可验证环境构建 |
| 44 | **Tongyi DeepResearch**: Technical Report | 2510.24701 | 阿里云 | 开源 | Agentic Mid-training + Post-training，30.5B参数，Humanity's Last Exam SOTA |
| 45 | **GLM-5**: Agentic Engineering | 2602.15763 | 智谱AI | ✅ | DSA稀疏注意力，异步RL基础设施，LMArena #1开源模型 |
| 46 | **ABE**: Automated Build Environments | 2508.08791 | 字节/复旦 | ✅ | 5阶段环境构建pipeline，自动化生成可执行环境 |
| 47 | **GEM**: Text-to-Trajectory Synthesis | 2601.10355 | 美团/人大 | - | 4阶段合成pipeline，10K轨迹低成本生成，BFCL +16.5% |

---

## 七、论文统计分析

### 7.1 时间分布

| 时间段 | 论文数 | 代表论文 |
|--------|--------|----------|
| 2024-08-10 | 3 | ABE, PF-PPO, VinePPO |
| 2025-01 | 2 | GRPO, GEM |
| 2025-02 | 8 | VCPO, ELPO, CM2, AWM, ASTER, Tool-R0, Dr.MAS, OTB, DART, ASTRA, GLM-5 |
| 2025-03 | 3 | DAPO, Step-GRPO, SGE |
| 2025-04-05 | 4 | VAPO, LUFFY, ProRL, ZeroSearch |
| 2025-07-08 | 5 | GMPO, EDGE-GRPO, ARPO, TreePo, DARS |
| 2025-10 | 2 | IGPO, Tongyi |
| 2026-02-03 | 6 | ARLArena, SeeUPO, ProxMO, EMPO², ReGFT (CMU), SGE |

**发表高峰**: 2025年2月（8篇）

### 7.2 机构分布

| 机构 | 论文数 | 代表论文 |
|------|--------|----------|
| 阿里巴巴/阿里云 | 5 | SeeUPO, IGPO, ELPO, OTB, DARS |
| 字节跳动 | 4 | DAPO, LUFFY, CM2, ABE |
| 微软 | 2 | GMPO, EMPO² |
| DeepSeek | 1 | GRPO |
| 智谱AI | 1 | GLM-5 |
| MIT | 1 | VCPO |
| UCLA | 1 | ARLArena |
| CMU | 1 | ReGFT |
| DeepMind | 1 | SGE |
| 清华 | 2 | ProRL, DAPO |
| 其他 | 10+ | - |

**中国机构主导**: 占比60%+

### 7.3 开源情况

| 论文 | GitHub | 状态 |
|------|--------|------|
| GLM-5 | zai-org/GLM-5 | ✅ 完整开源 |
| VCPO | mit-han-lab/vcpo | ✅ 已开源 |
| GMPO | callsys/GMPO | ✅ 已开源 |
| CM2 | namezhenzhang/CM2-RLCR-Tool-Agent | ✅ 已开源 |
| Agent World Model | Snowflake-Labs/agent-world-model | ✅ 已开源 |
| ASTRA | LianjiaTech/astra | ✅ 已开源 |
| ABE | bytedance/FTRL | ✅ 已开源 |
| DAPO | verl-project/verl | ✅ 基于verl |
| ELPO | - | ⏳ 即将开源 |
| 其他 | - | ❌ 未开源 |

**开源率**: 8-9/47 = **17-19%**（GRPO家族开源率低）

### 7.4 会议/期刊

| 论文 | 发表状态 |
|------|----------|
| EMPO² | ICLR 2026 ✅ |
| DeepSeek-R1 | Nature ✅ |
| 其他 | arXiv preprint |

---

## 八、按核心挑战分类

### 挑战1：奖励信号质量（23篇，68%）

**稀疏奖励**: Step-GRPO, ARPO, LADDER, START, IGPO, ReGFT, EDGE-GRPO, DARS, VAPO, ToRL, WebThinker, R1-Searcher, 等

**噪声奖励**: PF-PPO, ZeroSearch

**Advantage collapse**: EDGE-GRPO, DARS, ProxMO

### 挑战2：训练稳定性（18篇，53%）

**IS ratio控制**: DAPO, GMPO, ProRL, LUFFY

**方差控制**: VCPO, VAPO, OTB

**收敛保证**: SeeUPO ⭐, ARLArena

**Off-policy稳定**: EMPO²

### 挑战3：探索效率（15篇，44%）

**探索不足**: EMPO² ⭐

**On-policy局限**: LUFFY, ProRL

**计算效率**: TreePo, ZeroSearch, SSRL

**难度自适应**: DARS, LADDER, ReGFT

### 挑战4：信用分配（15篇，44%）

**步骤级归因**: ELPO, Step-GRPO, ARPO, VinePPO, CM2

**Multi-turn归因**: SeeUPO, ProxMO, IGPO

---

## 九、重点技术报告

### 9.1 工业界技术报告

| 报告 | 公司 | 内容 |
|------|------|------|
| Tongyi DeepResearch | 阿里云 | 30.5B参数，Agentic Mid+Post-training |
| GLM-5 Technical Report | 智谱AI | DSA注意力，异步RL基础设施，200+作者 |
| DeepSeek-R1 | DeepSeek | GRPO算法详解，Nature发表 |

### 9.2 Survey论文

| Survey | arXiv | 覆盖 |
|--------|-------|------|
| The Landscape of Agentic RL | 2509.02547 | 500+论文综述 |

---

## 十、关键术语索引

| 术语 | 来源论文 | 定义 |
|------|----------|------|
| **GRPO** | DeepSeek-R1 | Group Relative Policy Optimization |
| **TIR** | 多篇 | Tool-Integrated Reasoning |
| **ESS** | VCPO | Effective Sample Size，异步训练方差预测 |
| **Interaction Collapse** | ASTER | 交互密度下降导致训练失败 |
| **First Irrecoverable Step** | ELPO | 导致最终失败的关键错误步骤 |
| **Checklist Rewards** | CM2 | 多维度细粒度奖励评估 |
| **Advantage Collapse** | EDGE-GRPO | 组内相同奖励导致advantage=0 |
| **SAMPO** | ARLArena | Stable Agentic Policy Optimization |
| **EMPO²** | Microsoft | Exploratory Memory-Augmented Optimization |

---

## 十一、论文影响力Top 10

| 排名 | 论文 | 影响力指标 |
|------|------|-----------|
| 1 | DeepSeek-R1 (GRPO) | Nature发表，行业标准，10+后续工作 |
| 2 | GLM-5 | LMArena #1，商业成功，开源 |
| 3 | Tongyi DeepResearch | SOTA成绩，开源模型 |
| 4 | VCPO | MIT，系统性方法，已开源 |
| 5 | GMPO | 几何平均创新，已开源 |
| 6 | EMPO² | ICLR 2026，+128.6%，探索突破 |
| 7 | SeeUPO | 首个收敛保证，理论突破 |
| 8 | DAPO | AIME 50分，开源系统 |
| 9 | ARLArena | UCLA，系统框架 |
| 10 | CM2 | 字节，Checklist方法，已开源 |

---

## 十二、阅读建议

### 按研究兴趣

**算法理论**: SeeUPO (收敛保证), ARLArena (系统框架), VCPO (异步稳定性)

**工业应用**: GLM-5, Tongyi, DAPO, CM2

**探索创新**: EMPO² (记忆增强), LADDER (自引导), Tool-R0 (自博弈)

**Multi-turn**: SeeUPO, ProxMO, IGPO, CM2

### 按机构

**阿里系**: SeeUPO, IGPO, ELPO, OTB, DARS, Tongyi

**字节系**: DAPO, LUFFY, CM2, ABE

**学术界**: VCPO (MIT), ARLArena (UCLA), ReGFT (CMU)

**国际大厂**: EMPO² (Microsoft), SGE (DeepMind), Tool-R0 (Amazon)

---

**总计**: 47篇论文（34篇算法 + 13篇应用）  
**覆盖时间**: 2024-08 至 2026-03  
**重点会议**: ICLR 2026 (EMPO²)  
**开源项目**: 8-9个
