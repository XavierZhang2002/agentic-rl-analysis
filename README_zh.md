<div align="center">

# LLM Post-Training & Agentic RL

**系统性梳理大语言模型后训练与 Agentic RL 的算法原理、工业实践与前沿方向**

[![在线阅读](https://img.shields.io/badge/在线阅读-blue?style=for-the-badge&logo=materialformkdocs&logoColor=white)](https://XavierZhang2002.github.io/agentic-rl-analysis)
[![论文](https://img.shields.io/badge/70%2B_Papers-purple?style=for-the-badge&logo=arxiv&logoColor=white)](#)
[![模型](https://img.shields.io/badge/16_Model_Reports-teal?style=for-the-badge&logo=huggingface&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#)

[English](README.md) | [中文](README_zh.md)

<sub>最后更新 **2026-11** · 算法内容覆盖 PPO → SAPO（2025.11），模型内容覆盖至 2026.03 · 更新记录见 [更新日志](docs/changelog.md)</sub>

</div>

---

## 概述

本仓库包含两份独立但互补的技术调研报告，覆盖 70+ 篇论文与 16 份模型技术报告（DeepSeek / Qwen / Kimi / GLM-5 等），系统解构 2024–2026 年 LLM 后训练领域的核心进展。

### Post-Training 技术报告

> 六章一体：基础 → 算法 → 训练经济学 → 数据与工程 → 厂商档案 → 趋势

| 章节 | 内容 |
|:-----|:-----|
| **1. 基础：流程与范式** | 训练三阶段；RLHF / DPO / RLVR；流程范式（三段式、四五段式、专家+合并）；奖励谱系（规则 → ORM → GRM → actor-as-GRM） |
| **2. 算法主线** | PPO → GRPO → DAPO → VAPO → CISPO → GSPO → SAPO，以及 2026 的信任域新解法（DPPO / TRM / LPO / OTB） |
| **3. 训练经济学** | rollout 分配、免 Critic 稠密信号、OPD/MOPD 合并 |
| **4. 数据、环境与工程** | 数据工程、环境合成、一致性与基础设施（TITO / QAT / 异步）、验证器与 16 个失败模式 |
| **5. 厂商档案** | DeepSeek、Kimi、Qwen、MiniMax、GLM、Seed、LongCat、Ling/Ring、闭源 |
| **6. 全景与趋势** | 2026 技术报告全景、跨模型共识与挑战、时间线与个人判断 |

### Agentic RL 调研报告

> 多轮交互 · 工具使用 · 长程规划场景下的 RL 算法，47 篇论文系统分析

| 章节 | 内容 |
|:-----|:-----|
| **算法与挑战** | 奖励信号、训练稳定性、探索效率、信用分配四大挑战及对应方案 |
| **全景与展望** | 技术路线分析 · 产业观察 · 未来预测 |

## 快速开始

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
