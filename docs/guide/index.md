---
title: 平台介绍
description: 熊猫算力平台概述与快速入门
---

# 平台介绍

**熊猫算力（PandaToken）** 是一个一站式 AI 模型聚合平台，支持通过统一 API 调用市面上主流的大语言模型，包括 OpenAI GPT 系列、Anthropic Claude 系列、Google Gemini 系列等 50+ 款模型。

## 核心优势

- **OpenAI 兼容接口**：只需修改 `base_url`，现有代码零改动即可切换
- **按量计费**：无月费，无最低消费，用多少付多少
- **高可用保障**：多节点负载均衡，企业版 99.9% SLA
- **统一账单**：一个账户管理所有模型的用量和消费

## 快速开始

### 1. 注册账号

前往 [pandatoken.com](https://pandatoken.com) 注册账号，完成实名认证后即可获取 API Key。

### 2. 获取 API Key

在控制台「API Key 管理」页面创建一个 Key，并妥善保存。

### 3. 发起第一次请求

将你代码中的 OpenAI `base_url` 替换为熊猫算力的接入地址：

```python
from openai import OpenAI

client = OpenAI(
    api_key="你的 PandaToken API Key",
    base_url="https://api.pandatoken.com/v1"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "你好，介绍一下你自己"}]
)

print(response.choices[0].message.content)
```

::: tip 提示
首次注册可获得免费额度，足够完成基础功能体验。
:::

## 下一步

- [API 接入文档](/api/) — 完整的接口说明
- [模型选型指南](/models/) — 选择适合你场景的模型
- [常见问题](/faq/personal/) — 个人开发者常见疑问解答
