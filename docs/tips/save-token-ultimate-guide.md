---
title: 省 Token 终极指南：10 个技巧让你的 API 费用降低 50%-80%
date: 2026-05-18
category: 技巧
tags: [Token优化, 省钱, Prompt Caching, 模型选型, 成本控制]
---

Token 是调用 AI API 的"燃料"，烧得快不快，很大程度上取决于你怎么用。本文整理了 10 个经过实测的省 Token 技巧，覆盖从新手到进阶的所有场景。

## 先搞清楚钱花在哪

很多人以为 Token 就是字数，其实每次 API 调用实际计费的是：

```
系统 Prompt（每次都算）
+ 全部历史消息（第1轮到现在全部）
+ 本次用户输入
+ 模型输出
+ Tool Call 内容（如有）
= 实际计费 Token
```

**核心认知：你发了一句话，但模型可能读了几万字。**

---

## 技巧一：按任务复杂度选模型（立竿见影，省 50%-70%）

这是最省钱的单一手段。不同模型价格差距可以达到 10-20 倍，但简单任务上能力差距不到 5%。

| 任务类型 | 推荐模型 | 不推荐 |
|---------|---------|-------|
| 简单问答、摘要、翻译 | `claude-haiku-4-5`、`deepseek-v4-flash`、`gpt-4o-mini` | Opus、GPT-5.4 |
| 日常代码、普通对话 | `claude-sonnet-4-6`、`deepseek-v4-pro` | Opus |
| 复杂架构、长文分析 | `claude-opus-4-7`、`gemini-2.5-pro` | 无需降级 |

实测数据：同一个客服问答系统，把 GPT-5.4 换成 `claude-haiku-4-5`，成本直降 50%，用户满意度反而提升（响应更快）。

```python
# 根据任务复杂度动态选模型
def get_model(task_type):
    if task_type == "simple":
        return "claude-haiku-4-5-20251001"   # 最省钱
    elif task_type == "normal":
        return "claude-sonnet-4-6"            # 均衡
    else:
        return "claude-opus-4-7"              # 最强

model = get_model("simple")  # 简单任务别用贵模型
```

---

## 技巧二：精简系统 Prompt（省 30%-50% 输入 Token）

系统 Prompt 是每次对话都要计费的固定成本。很多人的系统 Prompt 里塞满了废话、冗余说明和不必要的示例。

**❌ 肥胖的系统 Prompt（约 500 Token）**
```
你是一个非常有帮助的、友好的、专业的AI助手。你的任务是帮助用户解决各种问题。
你应该用礼貌的语气回答问题。你需要保持专业性。你要确保回答准确。
你不应该回答不相关的问题。你需要保持中立。在回答时你应该...（继续500字）
```

**✅ 精简的系统 Prompt（约 50 Token）**
```
你是技术支持助手。简洁回答API和计费问题，附代码示例。不确定的问题建议联系客服。
```

**精简原则：**
- 去掉"你是一个非常..."这类废话开场
- 去掉重复的"你应该..."列表
- 用结构化格式替代自然语言描述，节省 30%-50%
- 每个规则一行，不要展开解释

---

## 技巧三：控制历史消息数量（防止 Token 滚雪球）

多轮对话是 Token 暴涨的第一大原因。第 30 轮的消耗可以是第 1 轮的 **100 倍**。

```
第1轮：100 Token
第5轮：500 Token（带了前4轮历史）
第20轮：2000 Token
第30轮：可能超过 10000 Token
```

**解决方案：只保留最近 N 轮**

```python
MAX_TURNS = 10  # 只保留最近10轮对话

def build_messages(history, new_input, system_prompt):
    # 保留系统提示 + 最近 N 轮
    recent_history = history[-(MAX_TURNS * 2):]
    return [
        {"role": "system", "content": system_prompt},
        *recent_history,
        {"role": "user", "content": new_input}
    ]
```

**进阶方案：历史摘要压缩**

不是简单截断，而是把早期对话总结成一句话：

```python
def compress_history(history):
    if len(history) > 20:
        # 把前半段历史压缩成摘要
        old_history = history[:10]
        summary_prompt = f"请用2-3句话总结以下对话的关键信息：\n{old_history}"
        summary = call_api(summary_prompt)
        # 用摘要替换早期历史
        return [{"role": "system", "content": f"对话背景：{summary}"}] + history[10:]
    return history
```

---

## 技巧四：使用 Prompt Caching（输入成本降低 75%-90%）

如果你的系统 Prompt 固定不变，Prompt Caching 是最强力的省钱武器。

**原理：** 相同的前缀内容只计算一次，后续命中缓存直接复用，成本大幅降低。

- OpenAI：自动启用，缓存命中价格打 5 折
- Anthropic Claude：支持手动标记缓存，缓存命中价格降低 90%

**Claude Prompt Caching 用法：**

```python
import anthropic

client = anthropic.Anthropic(
    api_key="你的Key",
    base_url="https://c.pandatoken.com"
)

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "你是熊猫算力平台的技术支持助手...",  # 长系统提示
            "cache_control": {"type": "ephemeral"}  # 标记为缓存
        }
    ],
    messages=[{"role": "user", "content": "API怎么接入？"}]
)
```

**最大化缓存命中率的关键：把静态内容放最前面**

```
✅ 正确顺序（缓存友好）：
[系统指令（固定）] → [背景知识（固定）] → [工具定义（固定）] → [用户输入（变化）]

❌ 错误顺序（缓存失效）：
[用户输入] → [系统指令] → [背景知识]
```

::: tip
Prompt Caching 对固定系统 Prompt + 长知识库的场景效果最显著。Claude Code 就是靠这个把成本降低了 70%。
:::

---

## 技巧五：用 Batch API 处理非实时任务（直接打五折）

不需要实时响应的任务，走 Batch API 可以节省 50% 费用，代价是需要等待（通常几分钟到几小时）。

**适合 Batch 的场景：**
- 批量翻译文档
- 批量提取数据
- 离线内容审核
- 定期生成报告

```python
# OpenAI Batch API 示例
from openai import OpenAI
import json

client = OpenAI(
    api_key="你的Key",
    base_url="https://c.pandatoken.com/v1"
)

# 准备批量任务
tasks = [
    {"custom_id": f"task-{i}", "method": "POST", "url": "/v1/chat/completions",
     "body": {"model": "gpt-4o-mini", "messages": [{"role": "user", "content": text}]}}
    for i, text in enumerate(texts_to_process)
]

# 写入 JSONL 文件
with open("tasks.jsonl", "w") as f:
    for task in tasks:
        f.write(json.dumps(task, ensure_ascii=False) + "\n")

# 提交批量任务
batch_file = client.files.create(file=open("tasks.jsonl", "rb"), purpose="batch")
batch = client.batches.create(
    input_file_id=batch_file.id,
    endpoint="/v1/chat/completions",
    completion_window="24h"
)
print(f"Batch ID: {batch.id}，等待处理...")
```

---

## 技巧六：语义缓存——相同问题不重复调用

高频重复问题（如客服场景）可以做一层语义缓存，命中缓存就不调 API，成本接近零。

```python
from openai import OpenAI
import numpy as np

client = OpenAI(api_key="你的Key", base_url="https://c.pandatoken.com/v1")

# 缓存存储
cache = []  # [(embedding, question, answer)]

def get_embedding(text):
    """获取文本的向量表示"""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def smart_query(question, threshold=0.92):
    """先查缓存，命中则直接返回，否则调API"""
    q_emb = get_embedding(question)

    # 检查是否有相似问题
    for emb, cached_q, cached_a in cache:
        if cosine_similarity(q_emb, emb) > threshold:
            print(f"缓存命中！原问题：{cached_q}")
            return cached_a

    # 没有缓存，调用API
    response = client.chat.completions.create(
        model="claude-sonnet-4-6",
        messages=[{"role": "user", "content": question}]
    )
    answer = response.choices[0].message.content

    # 存入缓存
    cache.append((q_emb, question, answer))
    return answer
```

---

## 技巧七：压缩图片再上传（图片 Token 降低 80%）

图片输入的 Token 消耗与分辨率直接相关，高分辨率图片可以消耗几千个 Token。

**不同分辨率的 Token 消耗对比：**

| 图片尺寸 | 大概 Token 消耗 |
|---------|---------------|
| 2048×2048 | ~1600 Token |
| 1024×1024 | ~800 Token |
| 512×512 | ~260 Token |
| 256×256 | ~85 Token |

```python
from PIL import Image
import io
import base64

def compress_image(image_path, max_size=512):
    """压缩图片到指定最大边长"""
    img = Image.open(image_path)

    # 等比例缩放
    ratio = max_size / max(img.size)
    if ratio < 1:
        new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    # 转为 base64
    buffer = io.BytesIO()
    img.save(buffer, format="JPEG", quality=85)
    return base64.b64encode(buffer.getvalue()).decode()

# 使用压缩后的图片
image_data = compress_image("screenshot.png", max_size=512)
```

::: tip
对于文字截图类任务（识别界面文字、分析报错），512px 宽度完全够用，Token 消耗可降低 80% 以上。
:::

---

## 技巧八：让模型直接输出结构化内容，减少废话

模型默认喜欢加很多开场白和解释，这些废话也要计费。

**❌ 默认回答（输出 Token 多）：**
```
当然！我很乐意帮您提取这些信息。根据您提供的文本，我分析后发现以下内容：
姓名是张三，电话是138xxxx，感谢您的使用...
```

**✅ 用提示词限制输出格式（输出 Token 少）：**
```python
messages = [{
    "role": "user",
    "content": """从以下文本提取信息，只返回JSON，不要其他内容：

张三，电话138xxxx，邮箱xxx@xxx.com

格式：{"name":"","phone":"","email":""}"""
}]

# 配合 temperature=0 确保稳定输出
response = client.chat.completions.create(
    model="claude-sonnet-4-6",
    messages=messages,
    temperature=0,
    max_tokens=100  # 结构化输出限制 max_tokens
)
```

---

## 技巧九：任务分解，避免一次喂太多内容

一次性把所有内容都塞给模型，不仅 Token 消耗大，效果也不一定好。

**❌ 一次性处理整本书：**
```python
# 危险：可能消耗几十万 Token
response = client.chat.completions.create(
    messages=[{"role": "user", "content": f"总结这本书：{entire_book}"}]
)
```

**✅ 分块处理，按需合并：**
```python
def process_long_document(text, chunk_size=3000):
    # 1. 分块
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

    # 2. 每块单独总结（用轻量模型）
    summaries = []
    for chunk in chunks:
        resp = client.chat.completions.create(
            model="claude-haiku-4-5-20251001",  # 用便宜模型总结
            messages=[{"role": "user", "content": f"3句话总结：{chunk}"}],
            max_tokens=150
        )
        summaries.append(resp.choices[0].message.content)

    # 3. 对摘要做最终总结（用强模型）
    final = client.chat.completions.create(
        model="claude-sonnet-4-6",
        messages=[{"role": "user", "content": f"综合以下摘要：{''.join(summaries)}"}]
    )
    return final.choices[0].message.content
```

---

## 技巧十：用 /compact 压缩 Claude Code 上下文

专门针对 Claude Code 用户：对话越长消耗越大，定期压缩是必要习惯。

```bash
# 在 Claude Code 中输入，压缩当前会话上下文
/compact

# 效果：把长对话历史压缩成摘要，Token 消耗可降低 60%-80%
# 建议：每完成一个独立任务后执行一次
```

**Claude Code 省 Token 配置：**

在 `.claude/settings.json` 中设置：

```json
{
  "model": "claude-sonnet-4-6",
  "autoCompact": true,
  "compactThreshold": 0.7
}
```

- `autoCompact`：上下文超过阈值时自动压缩
- `compactThreshold`：上下文窗口用到 70% 时触发压缩

::: warning Claude Code 专项提醒
Opus 4.7 的分词器比旧版消耗多 35%，且默认推理深度切换到 xhigh，账单可能莫名上涨。如果不需要最强推理，手动指定 `--model claude-sonnet-4-6` 可节省大量费用。
:::

---

## 省 Token 效果汇总

| 技巧 | 适用场景 | 预期节省 |
|------|---------|---------|
| 按复杂度选模型 | 所有场景 | 50%-70% |
| 精简系统 Prompt | 所有场景 | 30%-50% |
| 控制历史消息 | 多轮对话 | 40%-80% |
| Prompt Caching | 固定系统提示 | 75%-90% |
| Batch API | 非实时任务 | 50% |
| 语义缓存 | 高频重复问答 | 80%-95% |
| 压缩图片 | 图片输入 | 60%-80% |
| 限制输出格式 | 结构化任务 | 30%-50% |
| 任务分解 | 长文档处理 | 40%-60% |
| /compact 压缩 | Claude Code | 60%-80% |

::: tip 熊猫算力用户专属建议
在熊猫算力平台上，你可以同时接入 Claude、GPT、DeepSeek、Kimi 等模型，配合本文的"按任务选模型"策略，把简单任务路由到 `deepseek-v4-flash` 或 `claude-haiku-4-5`，复杂任务才走 `claude-opus-4-7`，综合成本可以降低 60% 以上。平台价格查看[计费说明](/faq/personal/)。
:::
