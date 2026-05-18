---
title: Zed 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [Zed, AI编辑器, 编程助手]
---

## 什么是 Zed

Zed 是一款用 Rust 编写的高性能代码编辑器，内置 AI 助手功能，启动速度极快，支持多人实时协作。对追求极致性能的开发者非常友好。

## 安装 Zed

访问 [zed.dev](https://zed.dev) 下载安装，支持 macOS 和 Linux。

## 配置熊猫算力

打开 Zed 配置文件（`Cmd+,` 或 `Ctrl+,`），添加以下内容：

```json
{
  "language_models": {
    "openai": {
      "api_url": "https://c.pandatoken.com/v1",
      "available_models": [
        {
          "name": "claude-sonnet-4-6",
          "display_name": "Claude Sonnet 4.6",
          "max_tokens": 200000
        },
        {
          "name": "claude-opus-4-7",
          "display_name": "Claude Opus 4.7",
          "max_tokens": 200000
        },
        {
          "name": "deepseek-v4-pro",
          "display_name": "DeepSeek V4 Pro",
          "max_tokens": 64000
        }
      ]
    }
  },
  "assistant": {
    "default_model": {
      "provider": "openai",
      "model": "claude-sonnet-4-6"
    },
    "version": "2"
  }
}
```

## 设置 API Key

在终端执行：

```bash
# macOS/Linux
echo 'export ZED_OPENAI_API_KEY="你的熊猫算力Key"' >> ~/.zshrc
source ~/.zshrc
```

或在 Zed 设置中直接填写 API Key：
进入 **Settings → Assistant → API Key**，填入你的熊猫算力 Key。

## 使用 AI 助手

- `Ctrl+Enter`：打开 AI 助手面板
- 选中代码后按 `Ctrl+Enter`：对选中代码提问
- 在 AI 面板输入需求，如"解释这段代码"、"帮我写单元测试"

::: tip
Zed 的 AI 功能专注于代码场景，配合 `claude-sonnet-4-6` 日常使用，性价比最高。
:::
