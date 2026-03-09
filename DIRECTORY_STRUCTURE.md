# 目录结构说明

```
agentic-rl-analysis/
│
├── README.md                              # 📖 项目导航（入口文件）
│
├── CORE_CHALLENGES_DEEP_REPORT.md         # 🎯 【主报告】核心挑战深度分析
│   └── 基于28篇算法论文，4大核心挑战 + 频率统计 + 解决方案映射
│
├── RESEARCH_DIRECTIONS_REPORT.md          # 🔬 研究方向综述
│   └── 基于500+论文Survey，7大研究方向分类
│
├── INFLUENCE_ASSESSMENT.md                # 📊 影响力评估
│   └── 15篇核心论文的开源、机构、影响力统计
│
├── papers/
│   ├── all-papers.md                      # 📚 15篇核心论文详细总结
│   │   └── 每篇论文的问题、方法、结果、洞察
│   │
│   └── full-text/                         # 📄 论文PDF全文（124MB）
│       ├── vcpo.pdf
│       ├── elpo.pdf
│       ├── cm2.pdf
│       └── ... (共15篇)
│
├── assets/                                # 🖼️ 图表素材（未使用）
│
└── LICENSE                                # ⚖️ MIT许可证
```

---

## 文件关系

```
                    README.md
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
CORE_CHALLENGES    RESEARCH_DIRS    INFLUENCE
   (主报告)          (方向综述)       (影响力)
        │               │               │
        └───────────────┴───────────────┘
                        │
                        ▼
                papers/all-papers.md
                   (原始数据)
                        │
                        ▼
                papers/full-text/
                  (PDF全文)
```

---

## 阅读建议

| 目标 | 推荐文件 |
|------|----------|
| **快速了解核心挑战** | CORE_CHALLENGES_DEEP_REPORT.md（执行摘要） |
| **了解研究方向** | RESEARCH_DIRECTIONS_REPORT.md |
| **查看具体论文** | papers/all-papers.md |
| **了解影响力/开源** | INFLUENCE_ASSESSMENT.md |

---

## 已清理的文件

- ❌ CORE_CHALLENGES_REPORT.md（初版，已被DEEP_REPORT取代）
- ❌ STATE_OF_THE_ART.md（基于15篇abstract，已过时）
- ❌ papers/insights.md（与DEEP_REPORT重复）
