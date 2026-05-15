---
title: 提示词工程（Prompt Engineering）技巧大全
date: 2026-04-30
category: 技巧
tags: [Prompt, 提示词, 效率]
---

# 提示词工程（Prompt Engineering）技巧大全

写好 Prompt 是高效使用大语言模型的核心技能。本文整理最实用的技巧，帮助你用更少的 Token 得到更好的结果。

## 基础原则

### 1. 明确角色

给模型一个具体身份，能显著提升回答质量：

```
# ❌ 模糊
帮我写一封邮件

# ✅ 清晰
你是一位资深商务写作专家，请帮我写一封向潜在客户介绍 AI 算力产品的商务邮件，
语气专业但不失亲切，篇幅控制在 300 字以内。
```

### 2. 提供上下文和约束

```
背景：我是一个独立开发者，正在构建一个图像生成 SaaS 产品
任务：设计一个用户定价方案
约束：月活用户预计 1000 人，每人平均生成 100 张图，需要覆盖 GPU 成本并盈利
输出格式：Markdown 表格，包含套餐名、价格、包含次数、目标用户
```

### 3. 少样本提示（Few-shot）

提供 2-3 个示例，让模型理解你期望的风格：

```
将以下技术术语用大白话解释，示例：
- GPU → 专门做图形计算的芯片，就像数学考试时专用的计算器
- Transformer → 一种 AI 模型结构，让机器学会「关注重点」

现在请解释：
- 反向传播
- 注意力机制
```

## 进阶技巧

### 思维链（Chain of Thought）

对于复杂推理，加上「请一步步思考」能大幅提升准确率：

```python
prompt = """
一台 GPU 服务器的月租金是 ¥8000，每小时能服务 10 个并发请求，
每个请求平均耗时 5 秒，每次请求我收费 ¥0.05。
请一步步计算：这台服务器每月能否盈利？盈利多少？
"""
```

### 输出格式控制

```
请以如下 JSON 格式返回结果，不要输出其他内容：
{
  "title": "文章标题",
  "summary": "100字以内的摘要",
  "tags": ["标签1", "标签2"],
  "difficulty": "入门/中级/高级"
}
```

### 迭代优化法

不要期望一次 Prompt 就能得到完美结果：

1. 写初稿 → 2. 分析不足 → 3. 加约束/示例 → 4. 重复直到满意

::: tip 温度参数（Temperature）
- `temperature=0`：输出稳定、可预测，适合代码生成、信息提取
- `temperature=0.7~1`：输出更有创意，适合写作、头脑风暴
- `temperature>1`：输出随机性强，一般不推荐
:::

## 图像生成 Prompt 技巧（Stable Diffusion）

```
# 基本结构
主体描述 + 风格 + 光线 + 质量词

# 示例
a cute panda sitting at a laptop, 
studio ghibli style, soft natural lighting,
8k, highly detailed, masterpiece, best quality

# 常用质量提升词
masterpiece, best quality, ultra detailed, 8k, RAW photo
```

---

*继续学习：[Transformer 架构详解](/ai-knowledge/transformer)*
