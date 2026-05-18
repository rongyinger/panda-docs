---
title: Continue.dev 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [Continue, VS Code, JetBrains, AI编程]
---

## 什么是 Continue.dev

Continue 是一个开源的 AI 编程插件，支持 VS Code 和 JetBrains 全系 IDE，可以自由配置任何 OpenAI 兼容的模型，是定制化程度最高的 AI 编程工具之一。

## 安装 Continue

**VS Code：**
在扩展商店搜索 **Continue**，点击安装。

**JetBrains（IntelliJ、WebStorm、PyCharm 等）：**
在 Plugins 市场搜索 **Continue**，点击安装。

## 配置熊猫算力

安装完成后，找到 Continue 配置文件：
- macOS/Linux：`~/.continue/config.json`
- Windows：`C:\Users\你的用户名\.continue\config.json`

替换为以下配置：

```json
{
  "models": [
    {
      "title": "Claude Sonnet 4.6",
      "provider": "openai",
      "model": "claude-sonnet-4-6",
      "apiKey": "你的熊猫算力Key",
      "apiBase": "https://c.pandatoken.com/v1"
    },
    {
      "title": "Claude Opus 4.7",
      "provider": "openai",
      "model": "claude-opus-4-7",
      "apiKey": "你的熊猫算力Key",
      "apiBase": "https://c.pandatoken.com/v1"
    },
    {
      "title": "DeepSeek V4 Pro",
      "provider": "openai",
      "model": "deepseek-v4-pro",
      "apiKey": "你的熊猫算力Key",
      "apiBase": "https://c.pandatoken.com/v1"
    },
    {
      "title": "GPT-5.4",
      "provider": "openai",
      "model": "gpt-5.4",
      "apiKey": "你的熊猫算力Key",
      "apiBase": "https://c.pandatoken.com/v1"
    }
  ],
  "tabAutocompleteModel": {
    "title": "DeepSeek V4 Flash（补全）",
    "provider": "openai",
    "model": "deepseek-v4-flash",
    "apiKey": "你的熊猫算力Key",
    "apiBase": "https://c.pandatoken.com/v1"
  },
  "embeddingsProvider": {
    "provider": "openai",
    "model": "text-embedding-3-small",
    "apiKey": "你的熊猫算力Key",
    "apiBase": "https://c.pandatoken.com/v1"
  }
}
```

## 常用功能

| 快捷键 | 功能 |
|-------|------|
| `Ctrl+L` | 打开 Chat 面板 |
| `Ctrl+I` | 内联编辑选中代码 |
| `Ctrl+Shift+R` | 重构选中代码 |
| `Tab` | 接受代码补全建议 |

::: tip 省钱配置
Tab 自动补全建议用便宜的 `deepseek-v4-flash`，对话和代码生成用 `claude-sonnet-4-6`，两个模型各司其职，综合成本比全用 Opus 低 70%。
:::
