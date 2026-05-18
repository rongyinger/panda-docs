---
title: Claude Code 怎么接入熊猫算力？
date: 2026-05-18
category: 常见问题
tags: [Claude Code, 接入教程]
---

## 方法一：环境变量配置（推荐）

```bash
export ANTHROPIC_API_KEY="你的熊猫算力Key"
export ANTHROPIC_BASE_URL="https://c.pandatoken.com"
```

加入 `~/.bashrc` 或 `~/.zshrc` 永久生效：

```bash
echo 'export ANTHROPIC_API_KEY="你的Key"' >> ~/.zshrc
echo 'export ANTHROPIC_BASE_URL="https://c.pandatoken.com"' >> ~/.zshrc
source ~/.zshrc
```

## 方法二：config.toml 配置

找到 Claude Code 配置文件（通常在 `~/.claude/config.toml`）：

```toml
[api]
key = "你的熊猫算力Key"
base_url = "https://c.pandatoken.com"
```

## 常见报错

**model not found**
检查模型名称是否正确，Claude Code 默认使用 `claude-opus-4-5`，确认平台支持该模型。

**wire_api 错误**
在 config.toml 中添加：
```toml
[api]
wire_api = "anthropic"
```

**context 超限**
使用 `/compact` 命令压缩上下文，或开启新会话。
