---
title: 各模型最大上下文是多少？超了怎么办？
date: 2026-05-18
category: 常见问题
tags: [上下文, context window, Token限制]
---

## 主要模型上下文窗口

| 模型 | 上下文窗口 | 约等于多少汉字 |
|------|-----------|--------------|
| claude-opus-4 | 200k tokens | 约 15 万字 |
| claude-sonnet-4-5 | 200k tokens | 约 15 万字 |
| gpt-4o | 128k tokens | 约 10 万字 |
| gpt-4o-mini | 128k tokens | 约 10 万字 |
| gemini-2.5-pro | 1M tokens | 约 75 万字 |
| deepseek-v3 | 64k tokens | 约 5 万字 |

## 超出上下文怎么办

### 方案一：换更大窗口的模型

需要处理超长文档时，优先选 Claude 或 Gemini。

### 方案二：分块处理

```python
def chunk_text(text, chunk_size=30000):
    """把长文本分成多块"""
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])
    return chunks

def summarize_long_doc(text):
    chunks = chunk_text(text)
    summaries = []

    for i, chunk in enumerate(chunks):
        response = client.chat.completions.create(
            model="claude-sonnet-4-5",
            messages=[{
                "role": "user",
                "content": f"请总结以下内容（第{i+1}/{len(chunks)}部分）：\n\n{chunk}"
            }]
        )
        summaries.append(response.choices[0].message.content)

    # 对所有摘要再做一次总结
    final = client.chat.completions.create(
        model="claude-sonnet-4-5",
        messages=[{
            "role": "user",
            "content": f"请综合以下{len(summaries)}个摘要，生成最终总结：\n\n" + "\n\n".join(summaries)
        }]
    )
    return final.choices[0].message.content
```

### 方案三：裁剪历史消息

多轮对话时只保留最近几轮，减少上下文积累。
