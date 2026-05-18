---
title: OpenClaw 接入指南
date: 2026-05-18
category: 拓展
tags: [OpenClaw, AI客户端, 接入教程, 国产开源]
---

# OpenClaw 接入指南

国产开源 AI 客户端，接入熊猫Token平台轻松调用各大模型。

**预计用时：5 分钟 · 支持平台：Win / Mac / Linux · 国产自主研发**

---

## 什么是 OpenClaw？

OpenClaw 是一款国产开源的跨平台 AI 聊天客户端，界面简洁，支持自定义 API 接入，可配合各类 API 聚合平台使用，无需折腾复杂配置即可使用 GPT、Claude、DeepSeek 等模型。

---

## Step 01：下载安装 OpenClaw

### 1. 前往官方 GitHub 下载

访问 OpenClaw 的 GitHub 仓库 Releases 页面，根据你的系统下载对应安装包：
- Windows：选 `.exe`
- macOS：选 `.dmg`

### 2. 安装并启动

双击安装包按提示完成安装，启动 OpenClaw。

---

## Step 02：获取熊猫Token API Key

### 1. 登录并创建令牌

访问 [www.pandatoken.net](https://www.pandatoken.net)，注册登录后进入「控制台」→「令牌」，新建令牌并复制。

---

## Step 03：在 OpenClaw 中配置

### 1. 打开设置

启动 OpenClaw 后，点击左下角或顶部的「设置」入口，进入 API 配置页面。

### 2. 选择 OpenAI 兼容模式

在模型服务商选择中，选择「OpenAI 兼容」或「自定义」选项。

### 3. 填写配置信息

| 配置项 | 填写内容 |
|--------|---------|
| API 地址 / Base URL | `https://www.pandatoken.net/v1` |
| API Key | 你从平台复制的令牌 |
| 模型名称 | 例如 `deepseek-v3`、`gpt-4o` |

::: tip 提示
熊猫Token平台与 OpenAI API 完全兼容，凡是支持自定义 Base URL 的客户端均可按此方式接入。
:::

### 4. 保存并开始使用

保存配置后，在聊天界面选择对应模型，即可开始对话。

---

## 常见问题

**连接失败 / 无响应**

检查 API 地址是否填写正确，确认末尾带 `/v1`。同时确认 API Key 完整，没有多余空格或换行符。

---

配置完成！OpenClaw 已成功接入熊猫Token平台，国产客户端畅用全球模型。
