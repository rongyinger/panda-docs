---
title: 为什么一直报 429 Too Many Requests？
date: 2026-05-18
category: 常见问题
tags: [报错, 429, 限流]
---

## 错误原因

429 是请求频率超限，有以下几种可能：

- **短时间请求过多**：你的程序在极短时间内发送了大量请求
- **上游模型限流**：部分模型（尤其免费或低价模型）本身有并发限制
- **高峰期拥堵**：平台请求量大时，上游渠道会触发排队限流

## 解决方法

**临时解决：**
- 稍等 10-30 秒后重试
- 换用其他模型（如把 claude-opus 换成 claude-sonnet）

**代码层面：**
```python
import time

def call_with_retry(client, messages, max_retries=3):
    for i in range(max_retries):
        try:
            return client.chat.completions.create(
                model="claude-sonnet-4-5",
                messages=messages
            )
        except Exception as e:
            if "429" in str(e):
                wait = 2 ** i  # 指数退避：1s, 2s, 4s
                time.sleep(wait)
            else:
                raise e
```

::: tip 建议
生产环境务必加入重试逻辑，推荐使用指数退避策略，避免请求风暴加剧限流。
:::
