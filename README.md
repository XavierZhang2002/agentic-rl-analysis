<div align="center">

# LLM Post-Training & Agentic RL

**A systematic survey of LLM post-training algorithms, industrial practices, and frontier directions.**

[![Read Online](https://img.shields.io/badge/Read_Online-blue?style=for-the-badge&logo=materialformkdocs&logoColor=white)](https://XavierZhang2002.github.io/agentic-rl-analysis)
[![Papers](https://img.shields.io/badge/70%2B_Papers-purple?style=for-the-badge&logo=arxiv&logoColor=white)](#)
[![Models](https://img.shields.io/badge/16_Model_Reports-teal?style=for-the-badge&logo=huggingface&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#)

[English](README.md) | [中文](README_zh.md)

<sub>Last updated **2026-11** · 算法内容覆盖 PPO → SAPO（2025.11），模型内容覆盖至 2026.03 · 更新记录见 [CHANGELOG](docs/changelog.md)</sub>

</div>

---

## Overview

Two independent but complementary technical surveys covering 70+ papers and 16 model technical reports (DeepSeek / Qwen / Kimi / GLM-5, etc.), systematically deconstructing core advances in LLM post-training from 2024–2026.

### Post-Training Technical Report

> Six chapters in one narrative: foundations → algorithms → training economics → data & infra → vendor profiles → outlook

| Chapter | Content |
|:--------|:--------|
| **1. Foundations** | Training stages; RLHF / DPO / RLVR; pipeline paradigms (3-stage, 4–5-stage, expert+merge); reward lineage (rule → ORM → GRM → actor-as-GRM) |
| **2. Algorithms** | PPO → GRPO → DAPO → VAPO → CISPO → GSPO → SAPO, plus the 2026 solutions (DPPO / TRM / LPO / OTB) |
| **3. Training economics** | Rollout allocation, critic-free dense signals, OPD/MOPD merging |
| **4. Data, environment & infrastructure** | Data engineering, environment synthesis, consistency (TITO / QAT / async), verifiers and 16 failure modes |
| **5. Vendor profiles** | DeepSeek, Kimi, Qwen, MiniMax, GLM, Seed, LongCat, Ling/Ring, closed-source |
| **6. Outlook** | 2026 report landscape, cross-model consensus & challenges, timeline and personal takes |

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
