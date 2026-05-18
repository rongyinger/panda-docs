---
title: Cursor 接入指南
date: 2026-05-18
category: 拓展
tags: [Cursor, AI编程, 接入教程, 开发者]
---

# Cursor 接入指南

AI 编程神器，通过自定义 API 接入熊猫Token平台，解锁更多模型。

**预计用时：5 分钟 · 推荐人群：开发者 · 支持平台：Win / Mac / Linux**

---

## 什么是 Cursor？

Cursor 是基于 VSCode 开发的 AI 代码编辑器，支持代码补全、自然语言生成代码、Agent 自动修改文件等功能。通过配置自定义 API Key + Base URL，可以接入熊猫Token平台的任意模型，降低使用成本。

::: danger 前提条件
Cursor 的自定义 API Keys（BYOK）功能需要 **Cursor Pro 订阅**才能使用，免费用户无法使用此功能。
:::

---

## Step 01：下载安装 Cursor

### 1. 前往官网下载

访问 [cursor.com](https://www.cursor.com)，点击下载对应平台的安装包。

### 2. 安装并注册账号

安装完成后启动 Cursor，注册账号并登录。VSCode 用户可以一键导入所有配置和插件。

---

## Step 02：获取熊猫Token API Key

### 1. 登录平台并创建 Key

访问 [www.pandatoken.net](https://www.pandatoken.net)，进入「控制台」→「令牌」，新建令牌并复制。

---

## Step 03：在 Cursor 中配置自定义 API

### 1. 打开 Cursor 设置

按 `Ctrl` + `Shift` + `J`（Windows/Linux）或 `Cmd` + `Shift` + `J`（macOS）打开 Cursor Settings，或点击右上角齿轮图标。

### 2. 进入 Models 页面

在 Cursor Settings 中找到「Models」选项卡，下滑找到 **OpenAI API Key** 和 **Override OpenAI Base URL** 两个输入框。

### 3. 填写配置信息

| 配置项 | 填写内容 |
|--------|---------|
| OpenAI API Key | 你从熊猫Token平台复制的令牌 |
| Override OpenAI Base URL | `https://www.pandatoken.net/v1` |

::: tip 注意
填完 API Key 后需要按回车确认，然后再填 Override Base URL。
:::

### 4. 添加自定义模型

点击「Add custom model」，输入你想使用的模型名称，例如 `deepseek-v3`、`deepseek-r1`、`gpt-4o` 等，然后在模型列表中勾选启用。

### 5. 在 Chat 中使用

按 `Ctrl` + `L` 打开 Chat 面板，在模型选择器中选择你刚刚添加的模型，即可开始 AI 辅助编程。

---

## 常见问题

**Tab 补全还是用的 Cursor 原来的模型**

自定义 API Key 只影响 Chat 和 Composer 功能，Tab 自动补全仍然使用 Cursor 内置模型，这是 Cursor 的限制，无法更改。

**提示连接失败**

请确认 Base URL 填写为 `https://www.pandatoken.net/v1`，末尾不要加 `/chat/completions`，Cursor 会自动拼接。

---

配置完成！Cursor 已成功接入熊猫Token平台，开启 AI 辅助编程新体验。
