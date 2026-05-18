---
title: NextChat 接入指南
date: 2026-05-18
category: 拓展
tags: [NextChat, AI客户端, 接入教程, 开源]
---

# NextChat 接入指南

开源轻量的私人 ChatGPT 应用，支持网页版和桌面客户端。

**预计用时：3 分钟 · 支持平台：网页版 / 桌面客户端 · GitHub Stars：80k+**

---

## 什么是 NextChat？

NextChat（原名 ChatGPT-Next-Web）是 GitHub 上 Stars 最多的开源 ChatGPT 前端项目之一。提供桌面客户端（Windows / macOS / Linux）和网页版，界面简洁，支持预设面具、Markdown 渲染、对话导出等功能。

---

## Step 01：获取 NextChat

### 方式一：下载桌面客户端（推荐）

前往 [GitHub Releases 页面](https://github.com/ChatGPTNextWeb/NextChat/releases)，根据系统下载对应安装包，双击安装即可。

### 方式二：直接访问官方 Demo

可直接访问 [app.nextchat.dev](https://app.nextchat.dev) 使用网页版（需要配置 API Key）。

---

## Step 02：获取熊猫Token API Key

### 1. 登录并创建令牌

访问 [www.pandatoken.net](https://www.pandatoken.net)，进入「控制台」→「令牌」，新建令牌并复制。

---

## Step 03：在 NextChat 中配置

### 1. 打开设置

启动 NextChat 后，点击左下角「设置」图标（齿轮）进入设置页面。

### 2. 启用自定义接口

向下滚动找到「自定义接口」开关，**打开**它。

### 3. 填写接口信息

| 配置项 | 填写内容 |
|--------|---------|
| 接口地址 (OpenAI Endpoint) | `https://www.pandatoken.net` |
| API Key | 你从平台复制的令牌 |
| 自定义模型名 | 例如 `deepseek-v3,gpt-4o` |

::: warning 注意
NextChat 的接口地址填根域名 `https://www.pandatoken.net`，**不要**加 `/v1`，它会自动拼接路径。
:::

### 4. 选择模型并开始对话

在「模型」下拉框中选择你填写的自定义模型，关闭设置，即可在聊天界面开始使用。

---

## 常见问题

**模型选择器里没有想要的模型**

在设置的「自定义模型名」中，输入模型 ID（多个用英文逗号分隔），例如 `deepseek-v3,deepseek-r1,gpt-4o`，保存后下拉框就会出现这些模型。

**设置完后发送消息提示 404**

确认接口地址没有加 `/v1`，NextChat 会自动补全完整路径。

---

配置完成！NextChat 已成功接入熊猫Token平台，简洁界面畅享所有模型。
