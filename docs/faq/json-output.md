---
title: 怎么让模型稳定输出 JSON？
date: 2026-05-18
category: 常见问题
tags: [JSON, 结构化输出, 开发者]
---

## 方法一：在提示词里要求（简单场景）

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": """提取以下文本中的人名和职位，以 JSON 格式返回：

张三是公司的产品经理，李四是技术总监。

只返回 JSON，不要有其他内容：
{"persons": [{"name": "...", "title": "..."}]}"""
    }],
    temperature=0
)
```

## 方法二：使用 response_format（推荐）

GPT-4o 和部分模型支持强制 JSON 输出：

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": "提取人名和职位，返回 JSON 格式"
    }],
    response_format={"type": "json_object"},  # 强制 JSON
    temperature=0
)

import json
result = json.loads(response.choices[0].message.content)
```

## 解析时加容错

```python
import json
import re

def parse_json_response(text):
    # 先直接解析
    try:
        return json.loads(text)
    except:
        pass

    # 提取代码块中的 JSON
    match = re.search(r'```json\n(.*?)\n```', text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1))
        except:
            pass

    return None
```
