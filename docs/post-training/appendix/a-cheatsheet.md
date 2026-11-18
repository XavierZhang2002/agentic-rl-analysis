---
title: 附录 A 算法公式速查
description: DPO / PPO / GRPO / DAPO / VAPO / CISPO / GSPO / SAPO / DPPO / TRM / LPO / OTB / SAO 十三个算法的核心式、机制一句话与出处，附五条选型速查。
---

# 附录 A 算法公式速查

!!! abstract "本节摘要"
    一页对照十三个算法：核心式、机制、出处。符号沿用正文——$r_{i,t}$ 是 token 级 IS 比率，$s_i$ 是序列级比率，$\hat{A}$ 是优势，$\text{sg}(\cdot)$ 是 stop-gradient，$\sigma$ 是 sigmoid。表后的选型速查与 [2.7 信任域与目标函数的新解法](../ch2/2.7-trust-region-2026.md) 的决策表一致，论证不在此重复。

## 一、公式总表

| 算法 | 核心式 | 一句话机制 | 出处 arXiv |
|---|---|---|---|
| **DPO** | $\mathcal{L}=-\mathbb{E}\left[\log\sigma\!\left(\beta\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\text{ref}}(y_w\mid x)}-\beta\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\text{ref}}(y_l\mid x)}\right)\right]$ | 离线偏好对回归成隐式奖励，不用 RM 也不用在线采样 | [2305.18290](https://arxiv.org/abs/2305.18290) |
| **PPO** | $\min\!\left(r_t\hat{A}_t,\ \text{clip}(r_t,1\!-\!\varepsilon,1\!+\!\varepsilon)\hat{A}_t\right)$ | Actor-Critic + GAE，token 级对称裁剪限制单步步长 | [1707.06347](https://arxiv.org/abs/1707.06347) |
| **GRPO** | $\min\!\left(r_{i,t}\hat{A}_i,\ \text{clip}(r_{i,t})\hat{A}_i\right)$，$\hat{A}_i=\frac{R_i-\text{mean}(\mathbf{R})}{\text{std}(\mathbf{R})}$ | 去 Critic 与 RM，用组内标准化奖励当优势 | [2402.03300](https://arxiv.org/abs/2402.03300) |
| **DAPO** | $\min\!\left(r_{i,t}\hat{A}_{i,t},\ \text{clip}(r_{i,t},1\!-\!\varepsilon_{\text{low}},1\!+\!\varepsilon_{\text{high}})\hat{A}_{i,t}\right)$ | Clip-Higher（0.2/0.28）+ 动态采样 + 全局 token 归一化 + 超长塑形，去掉 KL | [2503.14476](https://arxiv.org/abs/2503.14476) |
| **VAPO** | $\mathcal{L}=\mathcal{L}_{\text{PPO}}+\mu\mathcal{L}_{\text{NLL}}$，$\mu=0.1$ | 修 Critic（值预训练 / 解耦 GAE / 长度自适应）+ 对正确样本加 NLL | [2504.05118](https://arxiv.org/abs/2504.05118) |
| **CISPO** | $\text{sg}\!\left(\text{clip}(r_{i,t})\right)\cdot\hat{A}_{i,t}\cdot\log\pi_\theta(o_{i,t}\mid q,o_{i,<t})$ | 裁 IS 权重而不是目标，越界 token 仍有被压小的梯度 | [2506.13585](https://arxiv.org/abs/2506.13585) |
| **GSPO** | $\min\!\left(s_i\hat{A}_i,\ \text{clip}(s_i,1\!-\!\varepsilon,1\!+\!\varepsilon)\hat{A}_i\right)$，$s_i=\left(\frac{\pi_\theta(y_i\mid q)}{\pi_{\theta_{\text{old}}}(y_i\mid q)}\right)^{1/\lvert y_i\rvert}$ | IS 粒度升到序列几何平均，$\varepsilon\sim10^{-4}$，MoE 路由噪声按 $O(1/\sqrt{N})$ 摊平 | [2507.18071](https://arxiv.org/abs/2507.18071) |
| **SAPO** | $\frac{4}{\tau}\sigma\!\left(\tau(r-1)\right)\hat{A}_i$，$\tau_{\text{pos}}=1.0,\ \tau_{\text{neg}}=1.05$ | 平滑 S 形软门控替代硬裁剪，边界处梯度连续且永不为零 | [2511.20347](https://arxiv.org/abs/2511.20347) |
| **DPPO** | $\max_\theta\mathbb{E}[\hat{A}_t]\ \text{s.t.}\ \hat{D}_{\text{TV}}(\pi_\theta\,\Vert\,\pi_{\theta_{\text{old}}})\le\delta$ | 不信 ratio，直接用样本估散度并约束 | [2602.04879](https://arxiv.org/abs/2602.04879) |
| **TRM** | $m(y)=\mathbb{1}\!\left[\max_t\left\lvert\log\frac{\pi_\theta(y_t)}{\pi_{\theta_{\text{old}}}(y_t)}\right\rvert\le\delta\right]$，$\mathcal{L}=m(y)\hat{A}(y)\log\pi_\theta(y)$ | 整序列 mask 替代逐 token clip，界从 $O(T^2)$ 收紧到 $O(T)$ | [2512.23075](https://arxiv.org/abs/2512.23075) |
| **LPO** | $\pi_{\text{new}}=\arg\min_{\pi\in\Delta^{G-1}}\text{KL}(\pi\,\Vert\,\pi_{\text{ref}})-\eta\,\mathbb{E}_\pi[\hat{A}]$ | 把 group-based PG 看成响应单纯形上的目标投影，做 listwise 优化 | [2605.06139](https://arxiv.org/abs/2605.06139) |
| **OTB** | $\hat{A}_t^{\text{OTB}}=\hat{A}_t-b_t^{*}$，$b_t^{*}=\arg\min_b\text{Var}[\hat{A}_t-b]$ | 最优 token baseline 压方差：N=4 达 N=32 效果，token 省约 65% | [2602.07078](https://arxiv.org/abs/2602.07078) |
| **SAO** | $\mathcal{L}=\sum_t\text{mask}_t\hat{A}_t\log\pi_\theta(y_t)$，$\text{mask}_t=\mathbb{1}[r_t\in[1\!-\!\varepsilon_l,1\!+\!\varepsilon_h]]$ | 单 rollout（采样成本降到 $1/G$）+ 价值模型补组内信息 + 双侧 token 裁剪，异步稳定千步 | [2607.07508](https://arxiv.org/abs/2607.07508) |

!!! info "怎么读这张表"
    - **同一族**：PPO → GRPO → DAPO → CISPO → SAPO 都在 token 级改 $f(r)$ 的形状（对称 → 非对称 → 裁权重 → 软门控）；GSPO 换的是粒度，DPPO / TRM / LPO 换的是约束对象或层级。
    - 逐项推导见 [2.1 PPO](../ch2/2.1-ppo.md)、[2.2 GRPO](../ch2/2.2-grpo.md)、[2.3 DAPO](../ch2/2.3-dapo.md)、[2.4 VAPO](../ch2/2.4-vapo.md)、[2.5 CISPO 与 GSPO](../ch2/2.5-cispo-gspo.md)、[2.6 SAPO](../ch2/2.6-sapo.md)。
## 二、梯度形态速查

同一个 $\hat{A}$，各算法乘上去的系数不同——这才是它们行为差异的真正来源：

| 算法 | 乘在 $\nabla_\theta\log\pi_\theta$ 上的系数 | 比率出界时 |
|---|---|---|
| **PPO / GRPO** | $r_{i,t}\hat{A}_{i,t}$（区内 $\min$ 取 $r$） | 梯度 **= 0**，等价一个二值 mask |
| **CISPO** | $\text{sg}\!\left(\text{clip}(r_{i,t})\right)\hat{A}_{i,t}$ | 权重被夹住，**梯度保留** |
| **GSPO** | $s_i\hat{A}_i$（整条序列共享一个系数） | 序列级裁剪，一次只影响一条序列 |
| **SAPO** | $4p(1-p)\hat{A}_i$，$p=\sigma(\tau(r-1))$ | 平滑衰减，**永不为 0** |

## 三、关键超参与默认值

| 符号 | 含义 | 出处与取值 |
|---|---|---|
| $\varepsilon$ | 对称裁剪阈值 | PPO / GRPO $0.2$ |
| $\varepsilon_{\text{low}},\ \varepsilon_{\text{high}}$ | 非对称上下界 | DAPO $0.2$ / $0.28$ |
| $\varepsilon_{\text{left}},\ \varepsilon_{\text{right}}$ | 序列级裁剪阈值 | GSPO $3\times10^{-4}$ / $4\times10^{-4}$ |
| $\mu$ | 正样本 NLL 损失权重 | VAPO $0.1$ |
| $\tau_{\text{pos}},\ \tau_{\text{neg}}$ | 软门控温度 | SAPO $1.0$ / $1.05$ |
| $\beta$ | KL / 参考策略约束强度 | GRPO 保留；DAPO 起明确移除（$\beta=0$） |

## 四、三处最容易混的地方

1. **GSPO 的 $\varepsilon$ 小三个数量级不是调出来的**：$s_i$ 是 $|y_i|$ 个 log-ratio 的平均，方差比 token 级小 $\sqrt{N}$ 倍，所以 $3\times10^{-4}/4\times10^{-4}$ 的区间并不比 GRPO 的 $0.2$ 更紧。
2. **CISPO 与 PPO 只差"裁谁"**：边界照旧存在，但被裁剪的标量进了 $\text{sg}()$，梯度不再归零——这是"权重衰减"而不是"硬停"。
3. **DPPO 与 PPO 只差"约束什么量"**：一旦认定 ratio 只是散度的带噪估计，clip 形状的精细化就成了次要问题，这也是 2026 年把 SAPO 之后的路线重新打开的原因。

!!! tip "一句话"
    ratio 的形状之争已不是主战场：**先保证 rollout 与 training 一致，再决定约束什么量、在哪一层约束。**

## 参考资料

- 各算法原始论文的 arXiv 号见上表；演进链与四条 2026 路线见 [2.7 信任域与目标函数的新解法](../ch2/2.7-trust-region-2026.md)。
- 一致性侧的实现与五个框架对比见 [4.3 基础设施与一致性](../ch4/4.3-infra-consistency.md)。
