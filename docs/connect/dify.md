---
title: Dify 接入指南
date: 2026-05-18
category: 拓展
tags: [Dify, Agent, 工作流, 接入教程]
---

# Dify 接入指南

零代码构建 AI 工作流和 Agent，接入熊猫Token解锁全部模型。

**预计用时：10 分钟 · 适用场景：Agent / 工作流开发 · 部署方式：云端 / 本地**

---

## 什么是 Dify？

Dify 是一个开源的 LLM 应用开发平台，提供可视化工作流编排、RAG（检索增强生成）、Agent 构建等功能。接入熊猫Token平台后，可以在 Dify 中使用所有主流大模型，无需单独申请各厂商 API Key。

---

## Step 01：获取 Dify

### 方式一：使用 Dify 云端版（推荐）

直接访问 [cloud.dify.ai](https://cloud.dify.ai)，注册账号即可免费使用，无需安装。

### 方式二：Docker 本地部署

如果需要本地部署，确保已安装 Docker，然后执行：

```bash
# 克隆仓库
git clone https://github.com/langgenius/dify.git
cd dify/docker

# 启动服务
docker compose up -d
```

启动后访问 `http://localhost/install` 完成初始化。

---

## Step 02：获取熊猫Token API Key

### 1. 登录并创建令牌

访问 [www.pandatoken.net](https://www.pandatoken.net)，进入「控制台」→「令牌」，新建令牌并复制。

---

## Step 03：在 Dify 中添加模型供应商

### 1. 进入模型供应商设置

登录 Dify 后，点击右上角头像 → 「设置」→「模型供应商」。

### 2. 选择 OpenAI 兼容

在模型供应商列表中，找到「OpenAI-API-compatible」（OpenAI 兼容），点击「添加模型」。

### 3. 填写配置信息

| 配置项 | 填写内容 |
|--------|---------|
| 模型名称 | 例如 `deepseek-v3`（与平台模型 ID 保持一致）|
| API Key | 你从熊猫Token平台复制的令牌 |
| API Endpoint URL | `https://www.pandatoken.net/v1` |
| 模型类型 | LLM |

::: tip 添加多个模型
每个模型需要单独添加一条配置，可重复此步骤添加多个模型（如 deepseek-r1、gpt-4o 等）。
:::

### 4. 保存并验证

点击「保存」，Dify 会自动验证连接。出现绿色勾表示配置成功。

配置成功后，在创建应用时即可从模型列表中选择熊猫Token平台的模型。

### 5. 开始构建应用

回到首页，点击「创建应用」，选择聊天助手、工作流或 Agent，在模型设置中选择你刚添加的模型，即可开始构建。

---

## 常见问题

**验证失败，提示 connection error**

请确认 API Endpoint URL 填写为 `https://www.pandatoken.net/v1`，末尾带 `/v1`。

**本地 Docker 部署的 Dify 如何连接外网 API？**

默认 Docker 部署已能访问外网，直接按上述步骤填写即可。如果网络受限，请检查 Docker 的网络配置。

---

配置完成！Dify 已成功接入熊猫Token平台，零代码构建你的专属 AI Agent。
