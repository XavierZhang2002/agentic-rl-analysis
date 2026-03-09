# Agentic RL 研究分析

**研究范围**: 基于40+篇Agentic RL论文（2024-2026）的系统性分析  
**最后更新**: 2026-03-09

---

## 📄 核心报告

### 🎯 [CORE_CHALLENGES_DEEP_REPORT.md](CORE_CHALLENGES_DEEP_REPORT.md)
**Agentic RL训练算法核心挑战深度报告**（主报告）

基于28篇算法论文的系统分析，识别出4大核心挑战：
1. **奖励信号质量** (71%论文) - 稀疏奖励、噪声、advantage collapse
2. **训练稳定性** (54%论文) - IS ratio极端化、方差爆炸
3. **探索效率** (46%论文) - On-policy局限、计算成本
4. **信用分配** (43%论文) - 长视野归因、步骤级精度

包含：
- ✅ 28篇论文的挑战-方案映射
- ✅ 频率统计验证
- ✅ 算法演进脉络（4阶段）
- ✅ 挑战关系图
- ✅ 未来研究方向

---

### 🔬 [RESEARCH_DIRECTIONS_REPORT.md](RESEARCH_DIRECTIONS_REPORT.md)
**Agentic RL研究方向综述**

基于Awesome-AgenticLLM-RL-Papers仓库（500+论文），梳理7大研究方向：
- 算法改进（GRPO/PPO/DPO家族）
- 搜索与研究智能体
- 代码智能体
- 数学推理智能体
- GUI智能体
- 多智能体系统
- 具身智能体

---

### 📊 [INFLUENCE_ASSESSMENT.md](INFLUENCE_ASSESSMENT.md)
**影响力评估报告**

评估15篇核心论文的：
- 开源项目统计（8/15已开源）
- 机构分布（阿里3篇、字节2篇）
- 影响力排名（GLM-5、Tongyi、VCPO前三）
- GitHub资源链接

---

### 📚 [papers/all-papers.md](papers/all-papers.md)
**15篇核心论文详细总结**

包含每篇论文的：
- 基本信息（标题、作者、机构）
- 核心问题与方法
- 实验结果与关键洞察
- GitHub链接

---

## 🗂️ 目录结构

```
agentic-rl-analysis/
├── README.md                              # 本文件（导航）
├── CORE_CHALLENGES_DEEP_REPORT.md         # 【主报告】核心挑战深度分析
├── RESEARCH_DIRECTIONS_REPORT.md          # 研究方向综述
├── INFLUENCE_ASSESSMENT.md                # 影响力评估
├── papers/
│   ├── all-papers.md                      # 15篇论文详细总结
│   └── full-text/                         # 论文PDF（124MB）
│       ├── vcpo.pdf
│       ├── elpo.pdf
│       ├── ... (共15篇)
└── LICENSE                                # MIT许可证
```

---

## 📖 推荐阅读路径

### 路径1：快速了解核心挑战
1. 阅读 **CORE_CHALLENGES_DEEP_REPORT.md** 的"执行摘要"部分
2. 查看"核心挑战统计"表格
3. 浏览"算法演进脉络"

### 路径2：深入理解特定挑战
1. 从 **CORE_CHALLENGES_DEEP_REPORT.md** 选择感兴趣的挑战
2. 查看该挑战下的"代表性论文及解决方案"表格
3. 从 **papers/all-papers.md** 阅读对应论文的详细分析

### 路径3：了解研究方向
1. 阅读 **RESEARCH_DIRECTIONS_REPORT.md**
2. 查看7大研究方向和代表方法
3. 结合 **INFLUENCE_ASSESSMENT.md** 了解工业应用情况

---

## 🔑 核心发现

### 算法演进（4个阶段）

1. **消除值函数** (2025年初) - GRPO
2. **稳定性增强** (2025 Q1-Q2) - DAPO, GMPO, ProRL
3. **过程监督** (2025 Q2-Q3) - Step-GRPO, ARPO, EDGE-GRPO
4. **效率与泛化** (2025 Q3-Q4) - LUFFY, TreePo, DARS

### 关键洞察

1. **奖励信号**是源头问题，71%论文在解决各种奖励问题
2. **GRPO家族**成为主流，解决训练稳定性
3. **过程监督**兴起，从结果奖励走向步骤级奖励
4. **Off-policy方法**突破on-policy局限
5. **工业界主导**，中国公司活跃（阿里、字节、智谱）

---

## 📊 统计数据

| 类别 | 数量 |
|------|------|
| 分析论文总数 | 28篇算法 + 15篇应用 |
| 开源项目 | 8/15 (53%) |
| GRPO家族论文 | 10篇 |
| 中国机构论文 | 8/15 |

---

## 🔗 相关资源

- **Survey论文**: [The Landscape of Agentic RL (ArXiv 2509.02547)](https://arxiv.org/abs/2509.02547)
- **论文仓库**: [Awesome-AgenticLLM-RL-Papers](https://github.com/XavierZhang2002/Awesome-AgenticLLM-RL-Papers)
- **本仓库**: [github.com/XavierZhang2002/agentic-rl-analysis](https://github.com/XavierZhang2002/agentic-rl-analysis)

---

## 🔖 关键术语

- **GRPO**: Group Relative Policy Optimization
- **TIR**: Tool-Integrated Reasoning
- **IS ratio**: Importance Sampling ratio
- **ESS**: Effective Sample Size
- **Advantage collapse**: 组内优势为零
- **Credit assignment**: 信用分配
- **First irrecoverable step**: 首个不可恢复步骤

---

**License**: MIT  
**维护者**: Xavier Zhang
