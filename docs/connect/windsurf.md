---
title: Windsurf 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [Windsurf, AI IDE, 编程助手]
---

## 什么是 Windsurf

Windsurf 是 Codeium 推出的 AI 原生 IDE，内置 Cascade AI 助手，支持多文件编辑、Agent 模式和代码库理解，是目前最受欢迎的 AI IDE 之一。

## 安装 Windsurf

访问 [codeium.com/windsurf](https://codeium.com/windsurf) 下载对应平台安装包。

## 配置熊猫算力 API

1. 打开 Windsurf，进入 **Settings**（齿轮图标）
2. 找到 **AI Providers** 或 **API Configuration**
3. 选择 **Custom / OpenAI Compatible**
4. 填写：
   - **API Key**：你的熊猫算力 Key
   - **Base URL**：`https://c.pandatoken.com/v1`
   - **Model**：`claude-sonnet-4-6`

## 通过环境变量配置

```bash
export OPENAI_API_KEY="你的熊猫算力Key"
export OPENAI_BASE_URL="https://c.pandatoken.com/v1"
```

## 使用技巧

- **Cascade 模式**：适合多文件修改的复杂任务
- **Chat 模式**：适合问答和解释代码
- **Tab 补全**：实时代码建议，消耗 Token 较少

::: tip
Windsurf 的 Cascade Agent 模式会读取大量文件上下文，建议配合 `claude-sonnet-4-6` 使用，能力和成本都比较均衡。复杂任务才切换到 `claude-opus-4-7`。
:::
