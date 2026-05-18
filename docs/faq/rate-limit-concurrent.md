---
title: 怎么控制并发和请求频率？
date: 2026-05-18
category: 常见问题
tags: [并发, 限流, 生产环境]
---

## 并发过高会导致什么

- 触发 429 限流
- 请求积压，响应变慢
- 增加不必要的重试成本

## 用信号量控制并发

```python
import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI(
    api_key="你的Key",
    base_url="https://c.pandatoken.com/v1"
)

# 最多同时 5 个并发请求
semaphore = asyncio.Semaphore(5)

async def call_api(message):
    async with semaphore:
        response = await client.chat.completions.create(
            model="claude-sonnet-4-5",
            messages=[{"role": "user", "content": message}]
        )
        return response.choices[0].message.content

# 批量处理 100 条，但最多同时 5 个
async def batch_process(messages):
    tasks = [call_api(msg) for msg in messages]
    return await asyncio.gather(*tasks)
```

## 简单的限速器

```python
import time

class RateLimiter:
    def __init__(self, calls_per_minute=60):
        self.calls_per_minute = calls_per_minute
        self.calls = []

    def wait_if_needed(self):
        now = time.time()
        # 清除1分钟前的记录
        self.calls = [t for t in self.calls if now - t < 60]

        if len(self.calls) >= self.calls_per_minute:
            sleep_time = 60 - (now - self.calls[0])
            if sleep_time > 0:
                time.sleep(sleep_time)

        self.calls.append(time.time())

limiter = RateLimiter(calls_per_minute=50)

def safe_call(message):
    limiter.wait_if_needed()
    return client.chat.completions.create(...)
```
