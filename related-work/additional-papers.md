# 其他重要的Agentic RL相关工作

## 基础工作（Pre-2025）

### 1. ReAct: Synergizing Reasoning and Acting in Language Models
- **Authors**: Yao et al.
- **Year**: 2022
- **arXiv**: 2210.03629
- **Contribution**: 提出Reasoning + Acting的循环范式
- **Significance**: 所有后续Agentic RL工作的基础
- **Relation**: 四篇工作都在ReAct的基础上进行改进

### 2. Reflexion: Self-Reflective Agents
- **Authors**: Shinn et al.
- **Year**: 2023
- **Contribution**: 引入自我反思机制
- **Significance**: 解决Agent从错误中学习的问题
- **Relation**: GLM-5的Preserved Thinking可视为其演进

### 3. Voyager: An Open-Ended Embodied Agent
- **Authors**: Wang et al. (Microsoft)
- **Year**: 2023
- **Contribution**: 终身学习能力的Agent
- **Significance**: 展示了Agent的持续改进能力
- **Relation**: 与GEM的数据合成思想相通

## 同期相关工作（2025-2026）

### 4. OpenManus / MetaGPT等开源框架
- **Type**: 开源项目
- **Contribution**: 实际可运行的Agent系统
- **Significance**: 验证了Agentic RL技术的可行性
- **Relation**: 可作为四篇工作的测试平台

### 5. Claude Code / Copilot等商业产品
- **Type**: 商业应用
- **Contribution**: 将Agent技术产品化
- **Significance**: 证明了Agentic RL的市场价值
- **Relation**: Ralph Loop等技术源自这些产品的实践

## 补充性技术

### 6. RLHF系列工作
- **Papers**: InstructGPT, ChatGPT, Claude等
- **Contribution**: 人类反馈强化学习
- **Significance**: Agentic RL的基础训练方法
- **Relation**: 四篇工作都基于RLHF进行扩展

### 7. Tool Learning Survey
- **Type**: 综述文章
- **Contribution**: 系统性总结Tool Learning进展
- **Significance**: 提供领域全景
- **Relation**: 可作为阅读四篇工作的前置知识

### 8. WebArena / OSWorld等评测环境
- **Type**: 评测基准
- **Contribution**: 标准化的Agent评测
- **Significance**: 让不同方法可比较
- **Relation**: ABE的自动化环境构建可用于生成此类评测环境

## 值得关注的方向

### 方向1：多模态Agent
- **Papers**: 视觉-语言结合的Agent
- **Trend**: Agent不仅处理文本，还处理图像、视频
- **Potential**: 与GEM的文本合成结合，扩展到多模态数据

### 方向2：多智能体协作
- **Papers**: Multi-agent collaboration
- **Trend**: 多个Agent协同完成任务
- **Challenge**: 通信协议、任务分配、冲突解决

### 方向3：长期记忆
- **Papers**: Memory-augmented agents
- **Trend**: Agent可以记住长期信息
- **Connection**: 与GLM-5的Preserved Thinking相关

### 方向4：安全与对齐
- **Papers**: Safe tool use, aligned agents
- **Importance**: Agentic RL必须考虑安全性
- **Gap**: 四篇工作对此涉及较少

## 推荐阅读顺序

### 入门级
1. ReAct (基础概念)
2. Tool Learning Survey (领域概览)
3. 本仓库的四篇deep-dive分析

### 进阶级
1. Tongyi DeepResearch (训练框架)
2. GLM-5 (推理模式)
3. ABE (环境构建)
4. GEM (数据合成)

### 专家级
1. 对比四篇工作的异同
2. 思考如何组合使用
3. 探索新的研究方向

## 持续关注列表

- [ ] Agentic RL的开源实现
- [ ] 新的自动化环境构建工具
- [ ] 数据合成的质量评估方法
- [ ] Mid-training的理论分析
- [ ] Thinking Format的自动选择策略
- [ ] 跨领域迁移学习
- [ ] 实时自适应Agent

---

**Last Updated**: 2026-03-02  
**Next Review**: 2026-04-01
