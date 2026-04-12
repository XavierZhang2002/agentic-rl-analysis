<div align="center">

# LLM Post-Training & Agentic RL

**A systematic survey of LLM post-training algorithms, industrial practices, and frontier directions.**

[![Read Online](https://img.shields.io/badge/Read_Online-blue?style=for-the-badge&logo=materialformkdocs&logoColor=white)](https://XavierZhang2002.github.io/agentic-rl-analysis)
[![Papers](https://img.shields.io/badge/50%2B_Papers-purple?style=for-the-badge&logo=arxiv&logoColor=white)](#)
[![Models](https://img.shields.io/badge/12%2B_Models-teal?style=for-the-badge&logo=huggingface&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#)

[English](README.md) | [中文](README_zh.md)

</div>

---

## Overview

Two independent but complementary technical surveys covering 50+ papers and 12+ model technical reports (DeepSeek / Qwen / Kimi / GLM-5, etc.), systematically deconstructing core advances in LLM post-training from 2024–2026.

### Post-Training Technical Report

> The full algorithm evolution: PPO → GRPO → DAPO → VAPO → CISPO → GSPO → SAPO

| Chapter | Content |
|:--------|:--------|
| **Algorithm Foundations** | RLHF & RLVR paradigms, derivations and comparisons of 7 core algorithms |
| **Deep Dives** | Post-training practices of 6 major model families, cross-model insights & data engineering |
| **Trends & Outlook** | 6 industry consensuses · 5 core challenges · 9 personal perspectives |

### Agentic RL Survey

> RL algorithms for multi-turn interaction, tool use, and long-horizon planning — 47 papers systematically analyzed

| Chapter | Content |
|:--------|:--------|
| **Algorithms & Challenges** | Reward signals, training stability, exploration efficiency, credit assignment |
| **Landscape & Outlook** | Technical roadmap analysis · industry observations · future predictions |

## Quick Start

```bash
pip install mkdocs-material pymdown-extensions
mkdocs serve            # http://127.0.0.1:8000
```

Deploy to GitHub Pages:

```bash
mkdocs gh-deploy
```

Pushing to `main` also triggers automatic deployment via GitHub Actions.

## License

MIT · **zhenliang**
