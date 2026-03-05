# Agentic RL Analysis

基于15篇论文（2025-2026）的Agentic Reinforcement Learning研究分析。

---

## 📄 核心文档

### [STATE_OF_THE_ART.md](STATE_OF_THE_ART.md) - 研究现状
基于15篇论文原文的核心发现：
- **4大技术挑战**: 训练稳定性、信用分配、可扩展性、探索效率
- **6个技术趋势**: 异步训练、策略空间探索、零数据训练、过程奖励、能力解耦、自动化合成

### [papers/all-papers.md](papers/all-papers.md) - 论文总结
15篇论文的详细总结，包含：基本信息、核心问题、方法、实验结果、关键洞察。

### [papers/insights.md](papers/insights.md) - 综合洞察
基于全部15篇论文的系统性分析：挑战验证、趋势分析、术语汇总、研究空白。

---

## 📊 核心发现

| 挑战 | 关键论文 | 核心方法 |
|------|----------|----------|
| **训练稳定性** | VCPO, Dr. MAS, OTB, GLM-5 | 方差控制、异步RL基础设施 |
| **信用分配** | ELPO, CM2, DART, ASTRA | 错误定位、过程奖励、解耦训练 |
| **可扩展性** | Agent World Model, Tool-R0, ASTER, GEM, ABE | 合成环境、自博弈、文本合成 |
| **探索效率** | SGE, Tool-R0 | 策略空间探索、自动课程 |

---

## 📁 文件结构

```
agentic-rl-analysis/
├── STATE_OF_THE_ART.md    # 研究现状（基于15篇论文）
├── papers/
│   ├── all-papers.md      # 全部15篇论文详细总结
│   └── insights.md        # 综合洞察与分析
├── README.md              # 本文件
└── LICENSE                # MIT许可证
```

---

## 🔑 关键术语

- **TIR**: Tool-Integrated Reasoning
- **Interaction Collapse**: 交互崩溃
- **ESS**: Effective Sample Size
- **First Irrecoverable Step**: 首个不可恢复步骤
- **Checklist Rewards**: 清单奖励
- **Disentangled Tuning**: 解耦微调

---

## 📖 阅读路径

1. **快速了解** → [STATE_OF_THE_ART.md](STATE_OF_THE_ART.md)
2. **详细论文** → [papers/all-papers.md](papers/all-papers.md)
3. **系统分析** → [papers/insights.md](papers/insights.md)

---

**Last Updated**: 2026-03-05  
**License**: MIT
