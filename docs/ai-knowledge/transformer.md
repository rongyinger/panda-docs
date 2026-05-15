---
title: 大模型基础知识：Transformer 架构详解
date: 2026-05-02
category: 知识
tags: [Transformer, 大模型, 深度学习]
---

# 大模型基础知识：Transformer 架构详解

Transformer 是现代大语言模型（GPT、Claude、Gemini 等）的核心架构。理解它的工作原理，有助于你更好地使用和调优 AI 模型。

## 为什么 Transformer 重要？

2017 年 Google 发布论文《Attention is All You Need》，提出 Transformer 架构，彻底改变了自然语言处理领域。此后几乎所有 SOTA 模型都建立在这个架构之上。

## 核心组件：自注意力机制（Self-Attention）

自注意力让模型在处理每个词时，能「关注」到句子中其他所有词，计算它们的相关性：

```
Q（Query）× K（Key） ÷ √d → Softmax → × V（Value） = 输出
```

直觉理解：对于句子「它把蛋糕吃了因为它很饿」，模型需要知道「它」指代的是什么——自注意力机制让「它」能够「看向」整个句子，找到最相关的词（「某个主语」）。

## 整体架构

```
输入 Tokens
    ↓
Token Embedding + Position Encoding
    ↓
[Transformer Block] × N 层
    ├── Multi-Head Self-Attention
    ├── Add & Layer Norm
    ├── Feed-Forward Network
    └── Add & Layer Norm
    ↓
输出层（Language Model Head）
    ↓
预测下一个 Token 的概率分布
```

## 关键参数解读

| 参数 | 含义 | 典型值 |
|------|------|--------|
| 层数（Layers）| Transformer Block 的堆叠数量 | 32–128 |
| 隐藏维度（d_model）| 向量的维度 | 4096–8192 |
| 注意力头数（Heads）| 并行注意力的数量 | 32–128 |
| 上下文长度 | 单次处理的 Token 上限 | 8K–1M |

::: tip 为什么模型越大越强？
层数和维度越大，模型能学习和记忆的「知识」就越多。但同时对显存和计算量的需求也成倍增加——这正是 GPU 算力的核心价值所在。
:::

## 对使用者的启发

理解 Transformer 架构可以帮助你：

1. **理解上下文长度限制**：128K 上下文意味着模型最多同时「看到」约 10 万个中文字符
2. **理解为什么 Prompt 格式很重要**：模型通过注意力权重理解结构，清晰的格式有助于它找到重点
3. **理解幻觉产生的原因**：模型本质上是在做「预测下一个 token 最可能是什么」，并非从数据库查询事实

---

*继续学习：[Prompt Engineering 技巧](/tips/prompt-engineering)*
