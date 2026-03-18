---
title: PDF 版本下载
description: 提供技术报告的 PDF 版本以便离线阅读和更好地查看数学公式
---

# PDF 版本

由于网页渲染对复杂数学公式的支持有限，我们同时提供 PDF 版本以便更好地阅读。

---

## Post-Training 报告

| 章节 | PDF 下载 |
|------|---------|
| README（报告概述） | [README.pdf](../../pdfs/post-training-report/README.pdf) |
| 第一章：算法与基本原理 | [01-算法与基本原理.pdf](../../pdfs/post-training-report/01-算法与基本原理.pdf) |
| 第二章：技术报告解读与训练经验 | [02-技术报告解读与训练经验.pdf](../../pdfs/post-training-report/02-技术报告解读与训练经验.pdf) |
| 第三章：发展路线与方向思考 | [03-发展路线与方向思考.pdf](../../pdfs/post-training-report/03-发展路线与方向思考.pdf) |

---

## Agentic RL 报告

| 章节 | PDF 下载 |
|------|---------|
| README（报告概述） | [README.pdf](../../pdfs/agentic-rl-report/README.pdf) |
| 第一篇：算法与关键技术 | [01-算法与关键技术.pdf](../../pdfs/agentic-rl-report/01-算法与关键技术.pdf) |
| 第二篇：综合分析与展望 | [02-综合分析与展望.pdf](../../pdfs/agentic-rl-report/02-综合分析与展望.pdf) |

---

## 生成说明

PDF 使用 `pandoc` + `xelatex` 生成，配置如下：

- **中文字体**: PingFang SC
- **数学字体**: Latin Modern Math
- **代码字体**: JetBrains Mono

### 生成命令

```bash
# Post-Training 报告
cd post-training-report
pandoc README.md -o ../pdfs/post-training-report/README.pdf --pdf-engine=xelatex -V CJKmainfont="PingFang SC"
pandoc 01-算法与基本原理.md -o ../pdfs/post-training-report/01-算法与基本原理.pdf --pdf-engine=xelatex -V CJKmainfont="PingFang SC"
pandoc 02-技术报告解读与训练经验.md -o ../pdfs/post-training-report/02-技术报告解读与训练经验.pdf --pdf-engine=xelatex -V CJKmainfont="PingFang SC"
pandoc 03-发展路线与方向思考.md -o ../pdfs/post-training-report/03-发展路线与方向思考.pdf --pdf-engine=xelatex -V CJKmainfont="PingFang SC"

# Agentic RL 报告
cd agentic-rl-report
pandoc README.md -o ../pdfs/agentic-rl-report/README.pdf --pdf-engine=xelatex -V CJKmainfont="PingFang SC"
pandoc 01-算法与关键技术.md -o ../pdfs/agentic-rl-report/01-算法与关键技术.pdf --pdf-engine=xelatex -V CJKmainfont="PingFang SC"
pandoc 02-综合分析与展望.md -o ../pdfs/agentic-rl-report/02-综合分析与展望.pdf --pdf-engine=xelatex -V CJKmainfont="PingFang SC"
```

---

**提示**: 建议在线阅读时使用网页版（搜索和导航更方便），离线阅读或需要详细查看公式时使用 PDF 版本。