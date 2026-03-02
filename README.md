# Agentic RL Analysis

深度分析Agentic Reinforcement Learning（智能体化强化学习）领域的最新研究进展。

## 📚 核心论文

### 四篇关键工作

1. **Tongyi DeepResearch** (阿里, 2025.11)
   - **贡献**: Mid-training阶段 + 三级环境建模（Prior/Simulated/Real-world）
   - **创新**: 不确定性注入、自动数据合成pipeline
   - [Deep Dive →](deep-dive/01-tongyi-deepresearch.md)

2. **GLM-5** (智谱, 2026.02)
   - **贡献**: 三种思考格式（Interleaved/Preserved/Turn-level Thinking）
   - **创新**: 从Vibe Coding到Agentic Engineering的范式转变
   - [Deep Dive →](deep-dive/02-glm-5.md)

3. **ABE** (字节/复旦, 2025.09)
   - **贡献**: Automated Build Environments自动化环境构建
   - **创新**: 五步pipeline构建低成本、可验证的训练环境
   - [Deep Dive →](deep-dive/03-abe.md)

4. **GEM** (美团/人大, 2026.01)
   - **贡献**: 从文本自动合成tool-use数据
   - **创新**: 四阶段数据合成 + Refinement复杂度增强
   - [Deep Dive →](deep-dive/04-gem.md)

### 横向对比
- [四篇工作对比分析](deep-dive/00-comparison-summary.md) - 系统性对比、互补性分析、实践建议

## 📁 仓库结构

```
agentic-rl-analysis/
├── papers/              # 论文PDF和原文
│   └── initial-search.md # arXiv论文检索结果
├── deep-dive/          # 深度分析文章
│   ├── 00-comparison-summary.md  # 横向对比总结
│   ├── 01-tongyi-deepresearch.md
│   ├── 02-glm-5.md
│   ├── 03-abe.md
│   └── 04-gem.md
├── related-work/       # 相关工作调研
│   ├── github-research.md    # GitHub仓库调研
│   └── additional-papers.md  # 其他重要工作
├── assets/             # 图片、图表等资源
├── README.md           # 本文件
└── LICENSE             # 许可证
```

## 🔍 分析维度

- **训练阶段设计**（Mid-training, SFT, RL）
- **环境建模**（Prior/Simulated/Real-world）
- **数据合成**（自动构建、复杂度提升）
- **奖励机制**（可验证性、稳定性）
- **思考格式**（推理过程的组织方式）

## 🎯 核心洞察

### 1. Mid-training已成为标配
Tongyi和GLM-5都强调了在Pre-training和RL之间增加Mid-training阶段的重要性，专门培养模型的agentic偏好。

### 2. 环境工程是基础
ABE证明：自动化构建低成本、高稳定性的训练环境是Agentic RL工业化的关键。

### 3. 数据合成质量 > 数量
GEM通过Refinement主动增加数据复杂度，说明合成数据需要精心设计，而非简单堆砌。

### 4. 推理模式需要灵活性
GLM-5的三种Thinking Format提供了从简单查询到复杂编程的完整推理模式选择框架。

## 📖 推荐阅读

### 前置知识
- [ReAct](https://arxiv.org/abs/2210.03629): Agent基础范式
- [Tool Learning Survey](https://arxiv.org/abs/2304.08354): 领域全景

### 相关环境
- [WebArena](https://arxiv.org/abs/2307.13854): Web环境评测
- [OSWorld](https://arxiv.org/abs/2404.07972): 操作系统环境

### 开源项目
- [OpenManus](https://github.com/OpenManus/OpenManus): 开源Agent框架
- [MetaGPT](https://github.com/geekan/MetaGPT): 多智能体框架

## 🚀 快速开始

### 阅读建议
1. **新手**: 先看[对比分析](deep-dive/00-comparison-summary.md)了解全貌
2. **进阶**: 选择感兴趣的单篇deep-dive深入阅读
3. **专家**: 思考如何组合四篇工作的优点

### 实践路线图
```
Phase 1: GEM(数据) + ABE(环境) → 快速原型
Phase 2: Tongyi(训练) → 完整框架
Phase 3: GLM-5(推理) → 产品化部署
```

## 📊 研究趋势

### 短期（6个月内）
- Mid-training成为标准实践
- 自动化工具普及
- 成本优化受重视

### 中期（1年内）
- 标准化Pipeline出现
- 多模态扩展
- 动态环境支持

### 长期（2年+）
- 全自动训练流程
- 跨领域迁移
- 人类级鲁棒性

## 🤝 贡献

欢迎贡献！可以通过以下方式参与：
- 提交新的Agentic RL论文分析
- 补充相关工作调研
- 完善对比分析
- 分享实践经验

## 📄 许可证

[MIT](LICENSE)

---

**Last Updated**: 2026-03-02  
**Maintainer**: Agentic RL Analysis Team

**Acknowledgments**: 
- arXiv Research Skill for paper retrieval
- 阿里云开发者社区的系列文章启发
- Claude Code for analysis assistance
