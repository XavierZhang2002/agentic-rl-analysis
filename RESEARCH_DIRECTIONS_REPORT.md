# Agentic RL 研究方向综述报告

**基于 Awesome-AgenticLLM-RL-Papers 仓库分析**  
**参考来源**: https://github.com/XavierZhang2002/Awesome-AgenticLLM-RL-Papers  
**Survey论文**: [ArXiv 2509.02547](https://arxiv.org/abs/2509.02547) - The Landscape of Agentic Reinforcement Learning for LLMs: A Survey

---

## 一、研究方向总览

Agentic RL（智能体强化学习）是将强化学习应用于训练大型语言模型（LLM）作为自主智能体的研究领域。根据仓库中的论文分类，可以将研究方向分为以下几大类：

| 研究方向 | 论文数量 | 主要场景 |
|---------|---------|----------|
| **算法改进** | 40+ | 训练稳定性、样本效率 |
| **搜索与研究智能体** | 15+ | 信息检索、深层研究 |
| **代码智能体** | 25+ | 代码生成、软件工程 |
| **数学推理智能体** | 20+ | 数学推理、定理证明 |
| **GUI智能体** | 15+ | 图形界面交互 |
| **多智能体系统** | 15+ | 协作与通信 |
| **具身智能体** | 10+ | 机器人、游戏环境 |

---

## 二、各研究方向详解

### 2.1 算法改进方向

**解决的问题**：如何更高效、更稳定地训练LLM智能体

#### 2.1.1 PPO家族

| 方法 | 年份 | 核心创新 | 代表论文 |
|------|------|----------|----------|
| PPO | 2017 | 策略比率裁剪 | [Paper](https://arxiv.org/abs/1707.06347) |
| VAPO | 2025 | 自适应KL惩罚+方差控制 | [Paper](https://arxiv.org/abs/2504.05118) |
| PF-PPO | 2024 | 策略过滤 | [Paper](https://arxiv.org/abs/2409.06957) |
| VinePPO | 2024 | 无偏价值估计 | [Paper](https://arxiv.org/abs/2410.01679) |
| PSGPO | 2024 | 过程监督 | [Paper](https://openreview.net/forum?id=Cn5Z0MUPZT) |

**核心问题**：PPO在LLM训练中的方差过大，需要裁剪和限制更新幅度

#### 2.1.2 DPO家族（偏好优化）

| 方法 | 年份 | 核心创新 | 代表论文 |
|------|------|----------|----------|
| DPO | 2024 | 隐式奖励相关策略 | [Paper](https://proceedings.neurips.cc/paper_files/paper/2023/file/a85b405ed65c6477a4fe8302b5e06ce7-Paper-Conference.pdf) |
| β-DPO | 2024 | 动态KL系数 | [Paper](https://openreview.net/forum?id=ZfBuhzE556) |
| SimPO | 2024 | 序列平均对数概率作为隐式奖励 | [Paper](https://openreview.net/forum?id=3Tzcot1LKb) |
| IPO | 2024 | LLMs作为偏好分类器 | [Paper](https://proceedings.mlr.press/v238/gheshlaghi-azar24a.html) |
| KTO | 2024 | 教师-学生logit知识迁移 | [Paper](https://openreview.net/forum?id=iUwHnoENnl) |
| Step-DPO | 2024 | 步骤级偏好 | [Paper](https://arxiv.org/abs/2406.18629) |

**核心问题**：基于人类偏好的优化，不需要显式奖励函数

#### 2.1.3 GRPO家族（当前主流）

| 方法 | 年份 | 核心创新 | 代表论文 |
|------|------|----------|----------|
| GRPO | 2025 | 基于群体的相对奖励，消除价值估计 | [Paper](https://arxiv.org/abs/2501.12948) |
| DAPO | 2025 | 解耦裁剪+动态采样 | [Paper](https://arxiv.org/abs/2503.14476) |
| LUFFY | 2025 | 混合策略GRPO+离策略推理指导 | [Paper](https://arxiv.org/abs/2504.14945) |
| GSPO | 2025 | 序列级裁剪与优化 | [Paper](https://arxiv.org/pdf/2507.18071) |
| GMPO | 2025 | _token级奖励的几何平均 | [Paper](https://arxiv.org/abs/2507.20673) |
| ProRL | 2025 | 参考策略重置 | [Paper](https://arxiv.org/pdf/2505.24864) |
| Posterior-GRPO | 2025 | 仅奖励成功过程 | [Paper](https://arxiv.org/pdf/2508.05170) |
| Step-GRPO | 2025 | 基于规则的推理奖励 | [Paper](https://arxiv.org/pdf/2503.12937) |
| EDGE-GRPO | 2025 | 熵驱动优势+错误修正 | [Paper](https://arxiv.org/pdf/2507.21848) |
| ARPO | 2025 | 熵感知智能体 rollout + 步骤级信用分配 | [Paper](https://arxiv.org/pdf/2507.19849) |
| TreePo | 2025 | 自引导rollout，减少计算负担 | [Paper](https://arxiv.org/pdf/2508.17445) |

**核心创新**：GRPO通过组内相对奖励消除值函数估计的需要，大幅简化训练流程

---

### 2.2 搜索与研究智能体

**解决的问题**：训练LLM进行复杂的信息检索、深层研究和多步推理

#### 代表性方法

| 方法 | 基座模型 | 核心创新 | 论文 |
|------|----------|----------|------|
| WebThinker | QwQ-32B | 深度研究智能体，思考如何搜索 | [Paper](https://arxiv.org/abs/2504.21776) |
| WebSailor | Qwen2.5-72B | 基于反馈的迭代搜索 | [Paper](https://arxiv.org/abs/2507.02592) |
| R1-Searcher | Qwen2.5-7B | 强化学习训练搜索策略 | [Paper](https://arxiv.org/abs/2503.05592) |
| Search-R1 | Qwen2.5-3B/7B | 搜索能力强化 | [Paper](https://arxiv.org/abs/2503.09516) |
| ZeroSearch | Qwen2.5-3B/7B | 无需搜索引擎的搜索训练 | [Paper](https://arxiv.org/abs/2505.04588) |
| DeepRetrieval | Qwen2.5-3B | 外部检索增强 | [Paper](https://arxiv.org/pdf/2503.00223) |

#### 工业界产品

| 产品 | 厂商 | 特点 |
|------|------|------|
| Deep Research | OpenAI | 自主深层研究 |
| DeepResearch | Perplexity | AI驱动研究 |
| DeepResearch | Google Gemini | 多模态研究 |
| Kimi-Researcher | 月之暗面 | Kimi K2驱动 |
| Grok DeepSearch | xAI | Grok3驱动 |

---

### 2.3 代码智能体

**解决的问题**：训练LLM生成高质量代码、自动化软件工程

#### 2.3.1 代码生成

| 方法 | 奖励类型 | 基座模型 | 论文 |
|------|----------|----------|------|
| AceCoder | Outcome | Qwen2.5-Coder-7B | [Paper](https://arxiv.org/abs/2502.01718) |
| DeepCoder-14B | Outcome | DeepSeek-R1-14B | [Blog](https://pretty-radio-b75.notion.site/DeepCoder-A-Fully-Open-Source-14B-Coder-at-O3-mini-Level-1cf81902c14680b3bee5eb349a512a51) |
| CURE | Outcome | Qwen2.5-7B/14B | [Paper](https://arxiv.org/abs/2506.03136) |
| Absolute Zero | Outcome | Qwen2.5-7B/14B | [Paper](https://arxiv.org/abs/2505.03335) |
| StepCoder | Process | DeepSeek-Coder-6.7B | [Paper](https://aclanthology.org/2024.acl-long.251/) |
| CodeBoost | Process | Qwen2.5-Coder-7B | [Paper](https://arxiv.org/abs/2508.05242) |
| CodeFavor | Process | Mistral-NeMo-12B | [Paper](https://arxiv.org/abs/2410.03837) |

#### 2.3.2 软件工程

| 方法 | 基座模型 | 特点 | 论文 |
|------|----------|------|------|
| DeepSWE | Qwen3-32B | 开源SOTA软件工程智能体 | [Blog](https://pretty-radio-b75.notion.site/DeepSWE-Training-a-Fully-Open-sourced-State-of-the-Art-Coding-Agent-by-Scaling-RL-22281902c1468193aabbe9a8c59bbe33) |
| SWE-RL | Llama-3.3-70B | Facebook Research | [Paper](https://arxiv.org/abs/2502.18449) |
| Satori-SWE | Qwen-2.5-Math-7B | 自我反思式训练 | [Paper](https://openreview.net/forum?id=j4FXxMiDjL) |
| SWEET-RL | Llama-3.1-8B/70B | 过程级奖励 | [Paper](https://arxiv.org/abs/2503.15478) |
| DeepAnalyze | DeepSeek-R1-8B | Bug定位与分析 | [Paper](https://arxiv.org/abs/2510.16872) |

#### 核心挑战
- **长程任务**：代码项目涉及多文件、多步骤
- **可验证性**：如何判断代码正确性（测试用例、编译器）
- **信用分配**：Bug定位到具体错误行

---

### 2.4 数学推理智能体

**解决的问题**：训练LLM进行复杂数学推理、定理证明

#### 2.4.1 非形式化数学推理

| 方法 | 奖励类型 | 特点 | 论文 |
|------|----------|------|------|
| ToRL | Outcome | 工具强化学习 | [Paper](https://arxiv.org/abs/2503.23383) |
| ZeroTIR | Outcome | 零样本工具集成推理 | [Paper](https://arxiv.org/abs/2505.07773) |
| TTRL | Outcome | 思维树强化学习 | [Paper](https://arxiv.org/abs/2504.16084) |
| Satori | Outcome | 自我反思式 | [Paper](https://openreview.net/forum?id=j4FXxMiDjL) |
| rStar2-Agent | Outcome | 蒙特卡洛树搜索 | [Paper](https://arxiv.org/abs/2508.20722) |
| LADDER | Process | 步骤级信用分配 | [Paper](https://arxiv.org/abs/2503.00735) |
| SWiRL | Process | 过程监督 | [Paper](https://arxiv.org/abs/2504.04736) |

#### 2.4.2 形式化数学推理

| 方法 | 特点 | 论文 |
|------|------|------|
| DeepSeek-Prover-v1.5 | Lean证明 | [Paper](https://openreview.net/forum?id=I4YAIwrsXa) |
| Kimina-Prover | 形式化证明 | [Paper](https://arxiv.org/abs/2504.11354) |
| Lean-STaR | 形式化+过程监督 | [Paper](https://openreview.net/forum?id=SOWZ59UyNc) |
| ProofNet++ | 形式化证明 | [Paper](https://arxiv.org/abs/2505.24230) |

#### 核心挑战
- **奖励稀疏**：只有对错，难有中间信号
- **形式化验证**：需要证明助手（Lean、Coq）
- **推理长度**：数学证明可能非常长

---

### 2.5 GUI智能体

**解决的问题**：训练LLM与图形用户界面交互，操作软件和网页

#### 方法分类

| 方法 | 范式 | 环境 | 论文 |
|------|------|------|------|
| GUI-R1 | RL | Static | [Paper](https://arxiv.org/pdf/2504.10458) |
| UI-R1 | RL | Static | [Paper](https://arxiv.org/abs/2503.21620) |
| DiGiRL | RL | Interactive | [Paper](https://proceedings.neurips.cc/paper_files/paper/2024/file/1704ddd0bb89f159dfe609b32c889995-Paper-Conference.pdf) |
| UI-TARS | RL | Interactive | [Paper](https://arxiv.org/abs/2501.12326) |
| WebAgent-R1 | RL | Interactive | [Paper](https://openreview.net/forum?id=KqrYTALRjH) |
| ZeroGUI | RL | Interactive | [Paper](https://arxiv.org/pdf/2505.23762) |

#### 核心挑战
- **视觉理解**：需要理解GUI截图
- **动作空间**：点击、输入、滚动等
- **状态跟踪**：GUI状态变化跟踪

---

### 2.6 多智能体系统

**解决的问题**：训练多个LLM智能体协作解决问题

#### 2.6.1 无RL多智能体（基于提示）

| 方法 | 特点 | 论文 |
|------|------|------|
| CAMEL | 角色扮演智能体 | [Paper](https://dl.acm.org/doi/10.5555/3666122.3668386) |
| MetaGPT | 软件开发多智能体 | [Paper](https://openreview.net/forum?id=VtmBAGCN7o) |
| MAD | 多智能体辩论 | [Paper](https://aclanthology.org/2024.emnlp-main.992/) |
| MoA | Mixture of Agents | [Paper](https://openreview.net/forum?id=h0ZfDIrj7T) |

#### 2.6.2 基于RL的多智能体训练

| 方法 | 动态 | 训练 | RL算法 | 论文 |
|------|------|------|--------|------|
| GPTSwarm | ✗ | ✗ | Policy Gradient | [Paper](https://openreview.net/forum?id=uTC9AFXIhg) |
| MaAS | ✓ | ✗ | Policy Gradient | [Paper](https://openreview.net/forum?id=imcyVlzpXh) |
| MAPoRL | ✓ | ✓ | PPO | [Paper](https://aclanthology.org/2025.acl-long.1459/) |
| ReMA | ✓ | ✓ | MAMRP | [Paper](https://arxiv.org/abs/2503.09501) |
| FlowReasoner | ✓ | ✓ | GRPO | [Paper](https://arxiv.org/abs/2504.15257) |
| LERO | ✓ | ✓ | MLPO | [Paper](https://arxiv.org/abs/2503.21807) |
| OWL | ✓ | ✓ | DPO | [Paper](https://arxiv.org/abs/2505.23885) |

#### 核心挑战
- **通信协议**：智能体间如何通信
- **信用分配**：团队成功如何分配奖励
- **动态架构**：不同任务需要不同配置

---

### 2.7 具身智能体

**解决的问题**：训练LLM在物理或模拟环境中执行任务

#### 代表性环境

| 环境 | 能力 | 特点 |
|------|------|------|
| ALFWorld | 规划+推理 | 文本游戏+具身 |
| OSWorld | GUI+OS | 真实OS模拟 |
| WebArena | Web交互 | 网站自动化 |
| AndroidWorld | 移动GUI | Android模拟 |
| Crafter | 游戏 | 视觉+记忆 |
| SMAC | 游戏+多智能体 | 星际争霸 |

#### 核心挑战
- **真实环境交互**：需要与物理世界或模拟器交互
- **长程规划**：多步骤任务
- **状态空间**：高维观察空间

---

## 三、核心挑战总结

### 3.1 训练稳定性

| 挑战 | 解决方案 | 代表方法 |
|------|----------|----------|
| 方差爆炸 | 组相对奖励、裁剪 | GRPO、DAPO |
| 异步训练 | 动态学习率、方差控制 | VCPO、VAPO |
| 梯度不稳定 | Agent-wise归一化 | Dr. MAS |

### 3.2 信用分配

| 挑战 | 解决方案 | 代表方法 |
|------|----------|----------|
| 长程任务 | 步骤级奖励 | Step-GRPO、ARPO |
| 过程监督 | 中间信号 | LADDER、SWiRL |
| 错误定位 | 二分搜索 | ELPO |

### 3.3 环境构建

| 挑战 | 解决方案 | 代表方法 |
|------|----------|----------|
| 数据稀缺 | 合成环境 | Agent World Model |
| 验证困难 | 可执行环境 | ASTRA、ABE |
| 规模限制 | 自动化构建 | GEM |

### 3.4 探索效率

| 挑战 | 解决方案 | 代表方法 |
|------|----------|----------|
| 动作空间大 | 策略空间探索 | SGE |
| 稀疏奖励 | 自博弈 | Tool-R0 |
| 冷启动 | 高密度交互 | ASTER |

---

## 四、 benchmark与评估环境

### 4.1 代码任务

| Benchmark | 评估内容 | 论文 |
|-----------|----------|------|
| HumanEval | 代码生成 | [Paper](https://arxiv.org/abs/2107.03374) |
| MBPP | 代码生成 | [Paper](https://arxiv.org/abs/2108.07732) |
| BigCodeBench | 代码生成 | [Paper](https://openreview.net/forum?id=YrycTjllL0) |
| SWE-bench | 软件工程 | [Paper](https://openreview.net/forum?id=VTF8yNQM66) |
| SWE-rebench | 软件工程 | [Paper](https://arxiv.org/abs/2505.20411) |
| MLE-Bench | 机器学习工程 | [Paper](https://openreview.net/forum?id=6s5uXNWGIh) |

### 4.2 推理任务

| Benchmark | 评估内容 | 论文 |
|-----------|----------|------|
| AIME | 数学竞赛 | - |
| MATH | 数学 | - |
| GPQA | 科学推理 | - |

### 4.3 Agent任务

| Benchmark | 评估内容 | 论文 |
|-----------|----------|------|
| AgentBench | 多场景智能体 | [Paper](https://openreview.net/forum?id=zAdUB0aCTQ) |
| WebArena | Web智能体 | [Paper](https://openreview.net/forum?id=oKn9c6ytLx) |
| OSWorld | OS智能体 | [Paper](https://proceedings.neurips.cc/paper_files/paper/2024/file/5d413e48f84dc61244b6be550f1cd8f5-Paper-Conference.pdf) |
| τ-bench | 工具使用 | [Paper](https://arxiv.org/abs/2506.07982) |

---

## 五、训练框架

### 5.1 Agentic RL专用框架

| 框架 | 特点 | 论文 |
|------|------|------|
| Verifiers | 可验证环境 | [Code](https://github.com/willccbb/verivers) |
| SkyRL | 真实世界长程训练 | [Blog](https://novasky-ai.notion.site/skyrl-v0) |
| AREAL | 异步训练 | [Paper](https://openreview.net/forum?id=qJ0okaW9Z9) |
| AgentFly | 可扩展异步执行 | [Paper](https://arxiv.org/abs/2507.14897) |
| Agent Lightning | 解耦分层RL | [Paper](https://arxiv.org/abs/2508.03680) |

### 5.2 RLHF框架

| 框架 | 特点 |
|------|------|
| OpenRLHF | 高性能可扩展RLHF |
| TRL | Hugging Face RLHF |
| HybridFlow | 流式实验管理 |
| SLiMe | 高性能异步RL |

---

## 六、研究趋势与未来方向

### 6.1 当前趋势

1. **GRPO成为主流**：组相对奖励简化训练，无需值函数
2. **过程监督兴起**：从结果奖励到步骤级信号
3. **异步训练普及**：提高吞吐量，但需要新的稳定性方法
4. **自博弈训练**：减少对人工数据的依赖
5. **多模态融合**：视觉+语言+工具的联合训练

### 6.2 未来方向

1. **长期记忆**：如何在大规模任务中保持状态
2. **持续学习**：在线更新而不遗忘
3. **安全性**：RL训练过程中的对齐问题
4. **可扩展性**：千亿参数模型的RL训练
5. **真实世界部署**：从模拟到真实的迁移

---

## 七、总结

Agentic RL是一个快速发展的领域，核心目标是训练LLM作为能够自主推理、规划和执行任务的智能体。根据Awesome-AgenticLLM-RL-Papers仓库的调研，主要研究方向包括：

1. **算法改进**：PPO→DPO→GRPO的演进，解决训练稳定性问题
2. **垂直应用**：搜索、代码、数学、GUI、多智能体等场景
3. **基础设施**：benchmark环境、训练框架的完善

当前工业界（OpenAI、Google、Anthropic、阿里等）和学术界共同推动该领域快速发展，已涌现出大量高质量论文和开源项目。

---

**参考仓库**: https://github.com/XavierZhang2002/Awesome-AgenticLLM-RL-Papers  
**Survey论文**: [The Landscape of Agentic Reinforcement Learning for LLMs: A Survey](https://arxiv.org/abs/2509.02547)

**报告生成日期**: 2026-03-09
