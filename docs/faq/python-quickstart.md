---
title: Python 怎么调用熊猫算力 API？
date: 2026-05-18
category: 常见问题
tags: [Python, 开发者, 快速上手]
---

## 安装依赖

```bash
pip install openai
```

## 最简单的调用示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="你的熊猫算力Key",
    base_url="https://c.pandatoken.com/v1"
)

response = client.chat.completions.create(
    model="claude-sonnet-4-5",
    messages=[
        {"role": "user", "content": "你好，介绍一下自己"}
    ]
)

print(response.choices[0].message.content)
```

## 流式输出

```python
stream = client.chat.completions.create(
    model="claude-sonnet-4-5",
    messages=[{"role": "user", "content": "写一首诗"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

## 带系统提示词

```python
response = client.chat.completions.create(
    model="claude-sonnet-4-5",
    messages=[
        {"role": "system", "content": "你是一个专业的代码助手"},
        {"role": "user", "content": "帮我写一个快速排序"}
    ],
    temperature=0.7,
    max_tokens=2048
)
```
