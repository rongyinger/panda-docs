---
title: 怎么让模型分析 PDF 文件？
date: 2026-05-18
category: 常见问题
tags: [PDF, 文档分析, 多模态]
---

## 方法一：提取文本后发给模型（通用）

```python
import pdfplumber
from openai import OpenAI

# 提取 PDF 文本
with pdfplumber.open("document.pdf") as pdf:
    text = "\n".join([page.extract_text() for page in pdf.pages])

client = OpenAI(
    api_key="你的Key",
    base_url="https://c.pandatoken.com/v1"
)

response = client.chat.completions.create(
    model="claude-sonnet-4-5",
    messages=[{
        "role": "user",
        "content": f"请分析以下文档内容：\n\n{text}\n\n问题：这份文档的主要结论是什么？"
    }],
    max_tokens=4096
)
```

## 方法二：直接传 PDF（Claude 原生支持）

```python
import anthropic
import base64

with open("document.pdf", "rb") as f:
    pdf_data = base64.b64encode(f.read()).decode("utf-8")

client = anthropic.Anthropic(
    api_key="你的Key",
    base_url="https://c.pandatoken.com"
)

response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=4096,
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "document",
                "source": {
                    "type": "base64",
                    "media_type": "application/pdf",
                    "data": pdf_data
                }
            },
            {"type": "text", "text": "这份文档的主要内容是什么？"}
        ]
    }]
)
```

::: tip
PDF 超过 100 页建议先提取文本再发送，直接传大文件会消耗大量 Token。
:::
