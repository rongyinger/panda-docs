---
title: Chatbox 接入指南
date: 2026-05-18
category: 拓展
tags: [Chatbox, AI客户端, 接入教程, 全平台]
---

# Chatbox 接入指南

全平台支持的轻量 AI 客户端，配合熊猫Token平台快速上手。

**预计用时：3 分钟 · 支持平台：Win / Mac / iOS / Android / 网页版**

---

## 什么是 Chatbox？

Chatbox 是一款开源 AI 客户端，支持所有主流平台，聊天记录完全保存在本地，隐私有保障。操作简单，适合普通用户和开发者。接入熊猫Token平台后，可以低成本使用 GPT-4、Claude、DeepSeek 等所有模型。

支持平台：Windows · macOS · Linux · iOS · Android · 网页版

---

## Step 01：下载安装 Chatbox

### 1. 访问官网下载

前往 [chatboxai.app/zh](https://chatboxai.app/zh)，选择你的设备平台点击下载。也可以直接使用网页版，免安装。

### 2. 安装并打开

桌面端下载完成后双击安装包，按提示完成安装，启动 Chatbox。

---

## Step 02：获取熊猫Token API Key

### 1. 登录平台

访问 [www.pandatoken.net](https://www.pandatoken.net)，注册并登录账号。

### 2. 创建 API Key

进入「控制台」→「令牌」，点击新建令牌，复制生成的 Key（只显示一次，请妥善保存）。

---

## Step 03：在 Chatbox 中配置

### 1. 打开设置

启动 Chatbox 后，如果弹出配置引导直接按提示操作；如果没有，点击左下角「设置」图标 → 「模型提供方」。

### 2. 添加自定义提供方

点击「添加」或「添加自定义提供方」，在弹出的表单中填写：

| 配置项 | 填写内容 |
|--------|---------|
| 名称 | 熊猫Token |
| API 域名 | `https://www.pandatoken.net/v1` |
| API 路径 | `/chat/completions`（默认，无需修改）|
| API 密钥 | 你复制的 Key |

### 3. 添加模型

在模型输入框中，手动输入你想使用的模型名称，例如：

`deepseek-v3` · `gpt-4o` · `claude-3-5-sonnet-20241022` · `gemini-2.0-flash`

::: tip 查看所有可用模型
可到熊猫Token平台「模型广场」查看所有可用模型名称及 ID。
:::

### 4. 保存并开始使用

保存配置后，在聊天界面上方的模型选择栏切换到熊猫Token的模型，即可开始对话。

---

## 常见问题

**提示 401 / API Key 错误**

请确认复制的 Key 完整，没有多余空格。Key 只在创建时显示一次，如果忘了请重新生成。

**模型列表中选不到想要的模型**

Chatbox 需要手动输入模型名称，不会自动拉取列表。请参考熊猫Token平台「模型广场」的模型 ID 手动输入。

---

配置完成！Chatbox 已成功接入熊猫Token平台，即可低成本畅用所有模型。
