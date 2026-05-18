---
title: API 调用失败怎么自动重试？
date: 2026-05-18
category: 常见问题
tags: [重试, 稳定性, 生产环境]
---

## 为什么需要重试

生产环境中，偶发的 429、500、网络超时是正常现象。加入重试逻辑是保证稳定性的基本手段。

## 推荐重试策略

```python
import time
import random
from openai import OpenAI

client = OpenAI(
    api_key="你的Key",
    base_url="https://c.pandatoken.com/v1"
)

def call_with_retry(messages, model="claude-sonnet-4-5", max_retries=3):
    """带指数退避的重试调用"""
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                timeout=60
            )
            return response

        except Exception as e:
            error_str = str(e)

            # 429 限流：等待后重试
            if "429" in error_str:
                wait = (2 ** attempt) + random.uniform(0, 1)
                print(f"限流，{wait:.1f}s 后重试...")
                time.sleep(wait)

            # 500 服务异常：等待后重试
            elif "500" in error_str:
                wait = 2 ** attempt
                print(f"服务异常，{wait}s 后重试...")
                time.sleep(wait)

            # 其他错误：直接抛出
            else:
                raise e

    raise Exception(f"重试 {max_retries} 次后仍然失败")

# 使用
response = call_with_retry([
    {"role": "user", "content": "你好"}
])
```

::: tip
指数退避 = 第1次等1秒，第2次等2秒，第3次等4秒，避免同时大量重试加剧限流。
:::
