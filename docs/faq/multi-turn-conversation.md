---
title: 怎么实现多轮对话？模型为什么忘了之前说的话？
date: 2026-05-18
category: 常见问题
tags: [多轮对话, 上下文, 记忆]
---

## 关键认知：模型没有记忆

每次 API 调用都是独立的，模型不会自动记住上一次对话。

要实现多轮对话，**你需要每次都把历史消息一起发过去**。

## 正确做法

```python
from openai import OpenAI

client = OpenAI(
    api_key="你的Key",
    base_url="https://c.pandatoken.com/v1"
)

# 维护对话历史
history = []

def chat(user_input):
    # 把用户消息加入历史
    history.append({"role": "user", "content": user_input})

    # 每次都把完整历史发给模型
    response = client.chat.completions.create(
        model="claude-sonnet-4-5",
        messages=history
    )

    reply = response.choices[0].message.content

    # 把模型回复也加入历史
    history.append({"role": "assistant", "content": reply})

    return reply

# 测试多轮对话
print(chat("我叫小明"))
print(chat("我叫什么名字？"))  # 模型能回答：你叫小明
```

## 注意：历史消息会累积 Token

对话越长，每次发送的 Token 越多，费用越高。建议限制历史消息数量：

```python
MAX_TURNS = 10  # 最多保留 10 轮

def chat(user_input):
    history.append({"role": "user", "content": user_input})

    # 超过限制时，只保留最近 N 轮
    messages = history[-MAX_TURNS * 2:]

    response = client.chat.completions.create(
        model="claude-sonnet-4-5",
        messages=messages
    )
    ...
```
