# Tongyi DeepResearch: Agentic Training with Three-Level Environment Modeling

**Paper**: Tongyi DeepResearch Technical Report  
**Authors**: Tongyi DeepResearch Team et al. (阿里通义团队)  
**Date**: 2025-11  
**arXiv**: [2510.24701](https://arxiv.org/abs/2510.24701v2)  
**Institution**: Alibaba Cloud

---

## 1. 核心贡献

### 1.1 Mid-Training阶段的重要性

**核心观点**：在预训练（Pre-training）和SFT/RL（Post-training）之间，存在一个关键的**Mid-training**阶段，专门用于培养模型的agentic能力。

**为什么需要Mid-training？**
- Agentic数据分布（long-horizon任务）与常见的task数据分布差异巨大
- 直接在post-training阶段混入agent数据，模型难以形成稳定的agentic偏好
- Mid-training提供了一个"缓冲带"，让模型先适应long-context和agent行为模式

**训练流程**：
```
Pre-training → Mid-training (agentic偏好) → Multi-turn RL (潜力释放)
```

### 1.2 自动数据合成Pipeline

**Post-training阶段的数据合成流程**：

#### Stage 1: Graph Construction（知识图谱构建）
- 通过Random Walks获取Web中真实世界的知识
- 构建高度互联的知识图谱
- **关键**：模拟真实研究中的信息检索过程

#### Stage 2: Subgraph Sampling（子图采样）
- 从知识图谱中抽取Subgraph
- 生成初步的QA pairs
- 确保问题的多样性和复杂性

#### Stage 3: Uncertainty Injection（不确定性注入）
- **原子操作**：合并具有相似属性的实体
- 增加问题的不确定性，提高任务难度
- 基于集合论对信息搜索问题进行形式化建模
- **目的**：减少推理过程中的shortcut和结构冗余

### 1.3 三级环境建模

这是本文最具创新性的贡献之一。

| 环境类型 | 特点 | 优势 | 局限 | 应用阶段 |
|---------|------|------|------|---------|
| **Prior World** | 纯文本推演，无实际交互 | 零成本、无限扩展、稳定性极佳 | 缺乏真实反馈信号 | Mid-training |
| **Simulated** | 本地构建真实世界的可控副本 | 低成本、快速响应、可复现 | 数据覆盖受限，存在sim-to-real gap | SFT/RL初期 |
| **Real-world** | 真实API调用，真实数据分布 | 绝对的数据分布保真度 | 昂贵交互成本、探索风险 | RL后期/评估 |

**环境选择策略**：
- **Early阶段**：Prior World培养基础能力
- **Middle阶段**：Simulated环境快速迭代
- **Late阶段**：Real-world验证和精调

---

## 2. 技术细节

### 2.1 数据合成中的形式化建模

使用集合论对信息搜索问题进行建模：
- **实体集合**：$E = {e_1, e_2, ..., e_n}$
- **关系集合**：$R \subseteq E \times E$
- **查询**：$q \subseteq E$，目标是从图谱中检索满足条件的子集

**Uncertainty Injection**操作：
- 随机选择两个相似实体 $e_i, e_j$ 进行合并
- 这会改变图的连通性，增加推理路径的不确定性

### 2.2 Multi-turn RL设计

**奖励函数设计**：
- 不仅仅是最终答案正确性
- 包含过程奖励：信息检索的全面性、推理步骤的合理性
- **长期信用分配**：处理long-horizon任务中的稀疏奖励问题

**优势**：
- Mid-training已经培养了agentic偏好，RL阶段可以专注于"释放潜力"
- Multi-turn设计模拟真实研究场景中的迭代过程

---

## 3. 实验与效果

### 3.1 主要评估任务

- **Deep Research**：长程信息检索与研究任务
- **对比基准**：与传统搜索引擎、其他Agent模型对比

### 3.2 关键结果

（注：原文Technical Report中应包含具体数值，此处基于博客描述总结）

- Mid-training显著提升了agentic任务的表现
- 三级环境建模有效平衡了训练成本和效果
- Uncertainty Injection增加了数据质量，减少了shortcut学习

---

## 4. 创新点评析

### 4.1 Mid-training概念

**意义**：
- 类似人类学习：先读教材（pre-training）→ 专项训练（mid-training）→ 实战演练（RL）
- 为agentic能力提供了专门的"预适应"阶段

**局限性**：
- 增加了训练复杂度（三个阶段）
- Mid-training的数据配比、学习率等超参数需要精心设计

### 4.2 三级环境

**意义**：
- 系统性地解决了Agent训练中"环境不稳定"和"成本高昂"的问题
- Prior World的提出具有启发性：不交互也能训练？

**局限性**：
- Simulated环境的构建成本高
- sim-to-real gap仍然是一个挑战
- Prior World到Simulated的过渡策略未详细说明

### 4.3 Uncertainty Injection

**意义**：
- 数据增强的新思路：不是简单地加噪声，而是结构化地增加推理难度

**局限性**：
- 实体合并的策略（相似度阈值、合并频率）对效果影响大
- 过度注入可能导致问题无解

---

## 5. 与后续工作的关联

### 5.1 与GLM-5的关系

GLM-5同样采用了Mid-training策略，说明这已成为业界共识。
- Tongyi更侧重环境建模
- GLM-5更侧重思考格式的多样性

### 5.2 与ABE的关系

ABE专注于Simulated环境的自动化构建，可以看作是对Tongyi"Simulated Environment"的深入优化。

### 5.3 与GEM的关系

GEM专注于数据合成，补充了Tongyi数据pipeline中的text-to-trajectory环节。

---

## 6. 对我们的启示

### 6.1 训练阶段设计

Agentic能力的训练不是一蹴而就的，需要：
1. **Pre-training**：通用能力
2. **Mid-training**：Agentic偏好（新阶段！）
3. **Post-training**：SFT + RL精调

### 6.2 环境工程的重要性

训练环境是Agentic RL的核心瓶颈：
- 需要平衡成本、稳定性和真实性
- **Prior World**的提出：也许可以先用纯文本推演降低初始成本

### 6.3 数据质量 > 数量

Tongyi通过Uncertainty Injection主动增加数据复杂度，说明：
- 简单的合成数据会导致shortcut学习
- 需要精心设计数据生成策略

---

## 7. 关键引用

```bibtex
@article{tongyi2025deepresearch,
  title={Tongyi DeepResearch Technical Report},
  author={Tongyi DeepResearch Team and others},
  journal={arXiv preprint arXiv:2510.24701},
  year={2025}
}
```

---

**Analysis Date**: 2026-03-02  
**Analyst**: Claude Code + arxiv-research skill
