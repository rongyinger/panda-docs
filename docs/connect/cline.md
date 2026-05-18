---
title: Cline 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [Cline, VS Code, AI编程]
---

## 什么是 Cline

Cline 是 VS Code 的开源 AI 编程插件，支持代码生成、文件操作、终端命令执行，功能类似 Claude Code，但集成在 VS Code 界面内，对习惯图形界面的开发者更友好。

## 安装 Cline

1. 打开 VS Code
2. 进入扩展商店（Ctrl+Shift+X）
3. 搜索 **Cline**
4. 点击安装

## 配置熊猫算力

1. 安装完成后，点击左侧 Cline 图标
2. 进入 **Settings**
3. **API Provider** 选择 `OpenAI Compatible`
4. 填写以下信息：
   - **API Key**：你的熊猫算力 Key
   - **Base URL**：`https://c.pandatoken.com/v1`
   - **Model**：`claude-sonnet-4-6`（或其他你需要的模型）
5. 点击保存

## 推荐模型配置

| 用途 | 推荐模型 |
|------|---------|
| 日常代码编写 | `claude-sonnet-4-6` |
| 复杂架构设计 | `claude-opus-4-7` |
| 快速补全 | `claude-haiku-4-5-20251001` |
| 性价比优先 | `deepseek-v4-pro` |

## 基本使用

- **新建任务**：在 Cline 面板输入需求，如"帮我写一个用户登录接口"
- **文件操作**：Cline 会自动读取和修改项目文件，每次操作需要确认
- **终端命令**：可以执行 npm install、git commit 等命令，执行前会提示确认

::: warning
Cline 默认会读取项目所有文件，大型项目注意控制上下文范围，避免 Token 消耗过大。建议在 `.clineignore` 文件中排除 `node_modules`、`.git` 等目录。
:::
