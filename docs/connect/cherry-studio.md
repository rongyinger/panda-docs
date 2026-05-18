---
title: Cherry Studio 接入指南
date: 2026-05-18
category: 拓展
tags: [Cherry Studio, AI客户端, 接入教程, 开源]
---

# Cherry Studio 接入指南

开源免费的全能 AI 桌面客户端，接入熊猫Token，一个 Key 用尽所有模型。

**预计用时：5 分钟 · 支持平台：Win / Mac / Linux · GitHub Stars：42k+**

---

## 什么是 Cherry Studio？

Cherry Studio 是一款开源免费的桌面 AI 客户端，支持 Windows、macOS、Linux 三平台。内置 300+ 预设 AI 助手，支持多模型同时对话、知识库、AI 绘图、翻译等功能。配合熊猫Token平台，只需一个 API Key 即可调用所有大模型。

---

## Step 01：下载安装 Cherry Studio

### 1. 前往官方 GitHub 下载

访问 [github.com/CherryHQ/cherry-studio/releases](https://github.com/CherryHQ/cherry-studio/releases)，找到最新版本。

### 2. 选择对应系统版本

- Windows：下载 `.exe` 安装包
- macOS：下载 `.dmg`
- Linux：下载 `.AppImage` 或 `.deb`

### 3. 安装并启动

Windows 双击 .exe 一路下一步即可，macOS 拖入应用程序文件夹。安装完成后启动 Cherry Studio。

---

## Step 02：获取熊猫Token API Key

### 1. 登录熊猫Token平台

访问 [www.pandatoken.net](https://www.pandatoken.net)，注册并登录账号。

### 2. 进入控制台获取密钥

点击顶部导航「控制台」→「令牌 / API Keys」，创建新的令牌并复制。

---

## Step 03：在 Cherry Studio 中配置

### 1. 打开设置

点击左下角「设置」图标，进入「模型服务」页面。

### 2. 添加自定义服务商

向下滚动找到「添加自定义服务商」，点击后填写以下信息：

| 配置项 | 填写内容 |
|--------|---------|
| 名称 | 熊猫Token（自定义）|
| API 地址 (Base URL) | `https://www.pandatoken.net/v1` |
| API Key | 你从平台复制的令牌 |

::: warning 注意
Base URL 只填到 `/v1` 结尾，Cherry Studio 会自动拼接后面的路径。
:::

### 3. 开启开关并添加模型

确保服务商右上角的开关是**打开**状态。点击「管理」按钮，手动添加你想使用的模型名称，例如 `deepseek-v3`、`gpt-4o`、`claude-3-5-sonnet-20241022` 等。

### 4. 开始对话

点击左上角聊天图标，在对话框顶部的模型选择器中选择刚刚添加的模型，即可开始使用！

---

## 常见问题

**提示"连接失败"或"API Key 无效"**

请确认 Base URL 末尾不要加 `/chat/completions`，只需 `https://www.pandatoken.net/v1` 即可，同时确认开关已打开。

**模型列表为空**

自定义服务商不会自动拉取模型列表，需要手动点击「+ 添加」按钮，输入准确的模型 ID。

---

配置完成！Cherry Studio 已成功接入熊猫Token平台，一个 Key 畅用所有模型。
