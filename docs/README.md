# MkDocs 网站配置

本目录包含用于构建静态网站的 MkDocs 配置文件。

## 文件结构

```
agentic-rl-analysis/
├── mkdocs.yml              # MkDocs 主配置文件
├── docs/                   # 网站内容目录
│   ├── index.md           # 首页
│   ├── post-training/     # Post-Training 报告
│   │   ├── index.md
│   │   ├── 01-算法与基本原理.md
│   │   ├── 02-技术报告解读与训练经验.md
│   │   └── 03-发展路线与方向思考.md
│   ├── agentic-rl/        # Agentic RL 报告
│   │   ├── index.md
│   │   ├── 01-算法与关键技术.md
│   │   └── 02-综合分析与展望.md
│   ├── javascripts/       # JavaScript 文件
│   │   └── mathjax.js     # MathJax 配置
│   └── stylesheets/       # 自定义 CSS
│       └── extra.css      # 额外样式
└── .github/workflows/     # GitHub Actions
    └── ci.yml             # 自动部署配置
```

## 快速开始

### 1. 安装依赖

```bash
pip install mkdocs-material pymdown-extensions
```

### 2. 本地预览

```bash
mkdocs serve
```

然后访问 http://127.0.0.1:8000

### 3. 构建网站

```bash
mkdocs build
```

网站将生成在 `site/` 目录。

### 4. 部署到 GitHub Pages

```bash
mkdocs gh-deploy
```

或推送到 main 分支，GitHub Actions 会自动部署。

## 配置说明

### mkdocs.yml 关键配置

- **主题**: Material Design，支持暗/亮模式切换
- **导航**: 三级导航（首页 → 报告 → 章节）
- **数学公式**: MathJax 3 支持行内 $...$ 和块级 $$...$$
- **搜索**: 支持中文搜索和关键词高亮
- **扩展**: 支持表格、脚注、任务列表、代码高亮等

### 特性

- ✅ 响应式设计，支持移动端
- ✅ 深色/浅色模式自动切换
- ✅ 代码块复制功能
- ✅ 页面内搜索
- ✅ 文档间快速跳转
- ✅ 数学公式完美渲染
- ✅ 中文排版优化

## 更新内容

添加新页面：
1. 在 `docs/` 下创建 `.md` 文件
2. 在 `mkdocs.yml` 的 `nav` 部分添加链接
3. 重新运行 `mkdocs serve` 预览

## 故障排除

**数学公式不渲染？**
- 确保公式使用正确的 LaTeX 语法
- 行内公式用 `$...$`，块级用 `$$...$$`

**链接失效？**
- 检查相对路径是否正确
- MkDocs 使用相对于 docs/ 目录的路径

**样式不生效？**
- 清除浏览器缓存
- 检查 CSS 文件是否有语法错误