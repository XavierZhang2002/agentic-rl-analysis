<div align="center">

# LLM Post-Training & Agentic RL

**系统性梳理大语言模型后训练与 Agentic RL 的算法原理、工业实践与前沿方向**

[![Read Online](https://img.shields.io/badge/Read_Online-blue?style=for-the-badge&logo=materialformkdocs&logoColor=white)](https://XavierZhang2002.github.io/agentic-rl-analysis)
[![Papers](https://img.shields.io/badge/50%2B_Papers-purple?style=for-the-badge&logo=arxiv&logoColor=white)](#)
[![Models](https://img.shields.io/badge/12%2B_Models-teal?style=for-the-badge&logo=huggingface&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#)

</div>

---

## Overview

本仓库包含两份独立但互补的技术调研报告，覆盖 50+ 篇论文与 12+ 模型技术报告（DeepSeek / Qwen / Kimi / GLM-5 等），系统解构 2024–2026 年 LLM 后训练领域的核心进展。

### Post-Training 技术报告

> PPO → GRPO → DAPO → VAPO → CISPO → GSPO → SAPO 的算法演进全景

| 章节 | 内容 |
|:-----|:-----|
| **算法基础** | RLHF 与 RLVR 两大范式，7 种核心算法的公式推导与对比 |
| **深度解读** | 6 大模型系列的 Post-Training 实践，跨模型经验与数据工程专题 |
| **趋势展望** | 6 大行业共识 · 5 大核心挑战 · 9 条个人观点 |

### Agentic RL 调研报告

> 多轮交互 · 工具使用 · 长程规划场景下的 RL 算法，47 篇论文系统分析

| 章节 | 内容 |
|:-----|:-----|
| **算法与挑战** | 奖励信号、训练稳定性、探索效率、信用分配四大挑战及对应方案 |
| **全景与展望** | 技术路线分析 · 产业观察 · 未来预测 |

## Quick Start

```bash
pip install mkdocs-material pymdown-extensions
mkdocs serve            # http://127.0.0.1:8000
```

部署至 GitHub Pages：

```bash
mkdocs gh-deploy
```

推送到 `main` 分支亦可触发 GitHub Actions 自动部署。

## License

MIT · **zhenliang**
