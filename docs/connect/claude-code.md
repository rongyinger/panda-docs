---
title: Claude Code 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [Claude Code, 开发工具, CLI]
---

## 什么是 Claude Code

Claude Code 是 Anthropic 官方出品的命令行 AI 编程助手，支持代码生成、文件操作、终端命令执行，是目前最强的 AI 编程工具之一。通过熊猫算力接入，国内用户无需代理即可使用。

## 安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

确认安装成功：
```bash
claude --version
```

## 方法一：环境变量配置（推荐）

```bash
# 设置 API Key 和 base_url
export ANTHROPIC_API_KEY="你的熊猫算力Key"
export ANTHROPIC_BASE_URL="https://c.pandatoken.com"
```

永久生效（加入 shell 配置文件）：

```bash
# bash 用户
echo 'export ANTHROPIC_API_KEY="你的Key"' >> ~/.bashrc
echo 'export ANTHROPIC_BASE_URL="https://c.pandatoken.com"' >> ~/.bashrc
source ~/.bashrc

# zsh 用户
echo 'export ANTHROPIC_API_KEY="你的Key"' >> ~/.zshrc
echo 'export ANTHROPIC_BASE_URL="https://c.pandatoken.com"' >> ~/.zshrc
source ~/.zshrc
```

Windows PowerShell：
```powershell
$env:ANTHROPIC_API_KEY="你的Key"
$env:ANTHROPIC_BASE_URL="https://c.pandatoken.com"
```

## 方法二：config.toml 配置

找到配置文件路径：
- macOS/Linux：`~/.claude/config.toml`
- Windows：`C:\Users\你的用户名\.claude\config.toml`

写入以下内容：

```toml
[api]
key = "你的熊猫算力Key"
base_url = "https://c.pandatoken.com"
```

## 启动使用

```bash
# 在项目目录下启动
cd your-project
claude
```

## 常见报错处理

**model not found**
检查模型名称，推荐使用：
```bash
claude --model claude-sonnet-4-6
```

**wire_api 错误**
在 config.toml 中添加：
```toml
[api]
wire_api = "anthropic"
```

**上下文超限（context_length_exceeded）**
在对话中输入 `/compact` 压缩上下文，或开启新会话。

**账单莫名上涨**
Opus 4.7 默认推理深度为 xhigh，消耗是普通模式的 2 倍。日常开发建议指定 Sonnet：
```bash
claude --model claude-sonnet-4-6
```

::: tip 省 Token 建议
每完成一个独立任务后输入 `/compact` 压缩上下文。对话越长消耗越大，及时压缩可节省 60%-80% 的 Token。
:::
