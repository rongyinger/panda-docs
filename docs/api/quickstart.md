---
title: 快速开始
description: 通过 cURL、Python、Node.js 快速接入熊猫算力 API
date: 2026-05-01
tags: [API, 教程, 快速开始]
---

<UpdateBadge date="2026-05-01" />

# 快速开始

本文演示如何通过三种常见方式完成你的第一次 API 调用。

## 前置准备

1. 在 [pandatoken.com](https://pandatoken.com) 注册账号
2. 控制台 → API Key 管理 → 创建一个 Key（格式：`sk-pt-...`）
3. 确认账户有余额或免费额度

## 发起请求

::: code-group

```bash [cURL]
curl https://api.pandatoken.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-pt-你的Key" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      { "role": "user", "content": "用一句话介绍你自己" }
    ]
  }'
```

```python [Python]
# pip install openai
from openai import OpenAI

client = OpenAI(
    api_key="sk-pt-你的Key",
    base_url="https://api.pandatoken.com/v1"
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "用一句话介绍你自己"}
    ]
)

print(response.choices[0].message.content)
```

```javascript [Node.js]
// npm install openai
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: 'sk-pt-你的Key',
  baseURL: 'https://api.pandatoken.com/v1',
})

const response = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: '用一句话介绍你自己' }],
})

console.log(response.choices[0].message.content)
```

:::

## Streaming 模式

Streaming 可以让用户更快看到第一个字，推荐所有面向用户的场景都开启：

::: code-group

```python [Python]
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "写一首关于秋天的诗"}],
    stream=True
)

for chunk in response:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)
```

```javascript [Node.js]
const stream = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: '写一首关于秋天的诗' }],
  stream: true,
})

for await (const chunk of stream) {
  const text = chunk.choices[0]?.delta?.content ?? ''
  process.stdout.write(text)
}
```

:::

## 多模态（图片输入）

GPT-4o 和 Claude 3.5 Sonnet 支持图片输入：

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "这张图里有什么？"},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/image.jpg"},
                },
            ],
        }
    ],
)
```

## 下一步

- [查看支持的完整模型列表](/models/)
- [了解限速策略与错误处理](/api/)
