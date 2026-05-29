# Claude Code 用量监控工具全攻略：再也不怕 Token 不知不觉耗光

> 本文整理自以下来源：
> - [Claude Code 必备的用量监控工具：claude-monitor 实践指南 · 知乎](https://zhuanlan.zhihu.com/p/1940522991755719148)
> - [Token 花在哪了？Claude Code 消耗监控统计神器（四种实用方法） · 腾讯云](https://cloud.tencent.com/developer/article/2623892)
> - [Claude Code 利用 ccusage 统计使用情况 · Verne in GitHub](https://blog.einverne.info/post/2025/08/claude-code-ccusage.html)
>
> 原文观点仅代表作者个人意见。

---

## 前言

用 Claude Code 开发时，你有没有过这些困惑：

- 当前会话到底还剩多少 Token 用量？
- 什么时候这次会话才会重置？
- 今天已经花了多少钱了？
- 如果现在切换成 Opus，会不会导致接下来几小时都用不了？

**不知道消耗情况，就没办法主动节省。** 本文整理了目前最实用的几款 Claude Code 用量监控工具，以及它们各自的定位和用法。

---

## 测评场景汇总

### 1. ccusage：最主流的历史消耗分析工具

**适合场景：** 查看历史数据、按日/月统计、计算 API 成本

ccusage 是目前使用最广泛的 Claude Code 用量分析工具，通过读取本地 `~/.claude/projects` 目录下的 JSONL 日志文件，生成详细的消耗报告。**所有数据处理在本地完成，不上传任何信息。**

**安装与基础用法：**
```bash
# 使用 npx（无需安装）
npx ccusage daily      # 查看每日统计
npx ccusage weekly     # 查看每周统计
npx ccusage monthly    # 查看月度统计
npx ccusage session    # 查看会话统计

# 或全局安装（更快）
npm install -g ccusage
ccusage daily
```

**输出示例：**
```
┌─────────────────────────────────────────────────────────┐
│ Claude Code Usage Report - Daily                        │
├────────────────┼───────────┼───────────┼───────────────┤
│ Date           │ Tokens    │ Cost      │ % Used        │
├────────────────┼───────────┼───────────┼───────────────┤
│ 2026-05-28     │ 156,789   │ $2.34     │ 23.4%         │
│ 2026-05-27     │ 203,456   │ $3.05     │ 30.5%         │
└─────────────────────────────────────────────────────────┘
```

**设置预算提醒：**
```bash
ccusage --budget 50    # 月预算 $50，超出时提醒
```

**推荐：用 `bunx` 替代 `npx` 运行，速度快 2-3 倍：**
```bash
bunx ccusage@latest daily
```

**结论：** 历史统计最全面，适合每天收工后回顾消耗，或者月底对账。

---

### 2. claude-monitor：实时监控 + 预测耗尽时间

**适合场景：** 实时掌握当前会话用量，避免突然断连

claude-monitor 是一个终端实时仪表盘，提供：
- 几乎实时的 Token 用量显示
- 会话窗口开始时间 & 重置时间
- **当前会话平均消耗速率 + 预计耗尽时间**（ML 预测）
- 按天/月汇总的用量表格

**安装：**
```bash
pip install claude-monitor
claude-monitor
```

**⚠️ 2026 年注意：** 原项目作者今年未维护，实际测算价格约为官方的 3 倍，**建议改用 ccusage 查看历史数据**：
```bash
npx ccusage daily      # 查看当天用量
npx ccusage --help     # 查看更多选项
```

**结论：** 实时监控体验好，但目前维护状态不佳；日常查用量推荐 ccusage。

---

### 3. ccusage 状态栏集成：编码时随时可见消耗

**适合场景：** 不想切换窗口，直接在 Claude Code 状态栏看用量

在 `~/.claude/settings.json` 中添加以下配置：

```json
{
  "statusLine": {
    "type": "command",
    "command": "bunx ccusage@latest statusline",
    "padding": 0
  }
}
```

配置完成后，Claude Code 底部状态栏会实时显示：
- 当前使用的模型名称
- 本次会话 Token 消耗量
- 5 小时窗口内的累计用量百分比

**结论：** 零成本配置，强烈推荐，随时知道自己用了多少。

---

### 4. Claude Code 内置 `/cost` 命令

**适合场景：** 快速查看当前会话花费，无需任何安装

直接在 Claude Code 中输入：
```
/cost
```

会显示当前会话的 Token 消耗和 API 费用估算。

**结论：** 最轻量，但数据粒度较粗，仅显示当前会话，无历史记录。

---

## 工具对比总结

| 工具 | 实时监控 | 历史统计 | 安装难度 | 维护状态 | 推荐度 |
|------|----------|----------|----------|----------|--------|
| **ccusage** | ❌ | ✅ 按日/月/会话 | 极低（npx） | ✅ 活跃 | ⭐⭐⭐⭐⭐ |
| **状态栏集成** | ✅ | ❌ | 低（改配置） | ✅ 活跃 | ⭐⭐⭐⭐⭐ |
| **claude-monitor** | ✅ 含预测 | ✅ | 低（pip） | ⚠️ 停更 | ⭐⭐⭐ |
| **内置 /cost** | ✅ | ❌ | 无需安装 | ✅ 官方 | ⭐⭐⭐ |

---

## 原文总结

**推荐组合：ccusage 状态栏集成（实时） + ccusage daily（每日复盘）**

这是目前成本最低、维护最活跃的组合方案。配置一次状态栏集成，每天用 `npx ccusage daily` 看一眼，基本上就能对自己的消耗情况心中有数。

知道花了多少，才能决定是否值得优化——监控是省钱的第一步。

---

## 🐼 熊猫算力视角

通过熊猫算力平台调用 Claude API，消耗记录同样可以在控制台实时查看，国内直连，无需额外配置监控工具也能掌握用量。

👉 [登录熊猫算力控制台 →](https://pandatoken.cn)
