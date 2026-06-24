---
title: Claude Fable 5 是什么？
date: 2026-06-11
category: AI 知识分享
tags: [Claude Fable 5, Claude Mythos 5, Anthropic, 模型解读]
---

# Claude Fable 5 是什么？

Claude Fable 5 是 Anthropic 在 2026 年 6 月 9 日发布的新一代 Claude 模型，也是目前 Anthropic 面向普通用户和企业客户开放的最高能力模型之一。

简单理解：**Fable 5 是 Anthropic 把 Mythos 级能力做了安全限制后，对外开放的通用版本**。它面向复杂推理、长周期 Agent 任务、代码工程、知识工作和多步骤研究场景。

## 一句话解释

Claude Fable 5 可以看作是：

> 更强的 Claude Agent 模型，适合长任务、复杂代码、深度推理，但在网络安全、生物等敏感领域有更严格的安全限制。

## 和 Claude Mythos 5 有什么关系？

Anthropic 同时发布了 Claude Fable 5 和 Claude Mythos 5。

两者能力接近，但开放范围不同：

| 模型 | 开放情况 | 适合谁 |
| --- | --- | --- |
| Claude Fable 5 | 普通可用 | 大多数开发者、企业、Claude API 用户 |
| Claude Mythos 5 | 限定开放 | 受邀客户、可信合作方、特殊安全研究场景 |

Anthropic 官方说明，Claude Fable 5 是和 Mythos 5 同底层能力的模型，但加入了更强的安全分类器和防护机制；Mythos 5 则主要面向受控访问项目。

## Fable 5 强在哪里？

根据 Anthropic 官方介绍，Claude Fable 5 的重点能力包括：

1. **长周期 Agent 任务**
   适合 Claude Code、自动化工程、复杂项目拆解、多轮工具调用等任务。

2. **复杂代码与工程能力**
   官方和早期客户反馈都强调，它在长时间编码、重构、多步骤工程任务上比上一代更稳定。

3. **1M 上下文窗口**
   Claude Fable 5 默认支持 100 万 token 上下文，适合处理大型代码库、长文档、复杂资料包。

4. **最高 128k 输出**
   单次请求最高可输出 128k token，适合长报告、长代码、完整方案类任务。

5. **Always-on Adaptive Thinking**
   Fable 5 默认开启自适应思考，不再支持关闭 thinking。开发者需要用新的 effort 参数控制思考深度。

## 模型 ID 是什么？

Claude API 中的模型 ID 是：

```text
claude-fable-5
```

在 AWS Bedrock 中，对应 ID 是：

```text
anthropic.claude-fable-5
```

Vertex AI 中也使用：

```text
claude-fable-5
```

## 价格是多少？

Anthropic 官方价格为：

| 项目 | 价格 |
| --- | --- |
| 输入 | $10 / 1M tokens |
| 输出 | $50 / 1M tokens |
| 5 分钟缓存写入 | $12.50 / 1M tokens |
| 1 小时缓存写入 | $20 / 1M tokens |
| 缓存命中 | $1 / 1M tokens |

这个价格高于 Claude Opus 4.8。Fable 5 更适合高价值复杂任务，不适合所有请求都默认使用。

## 为什么有人说 Fable 5 更“保守”？

因为 Claude Fable 5 加了更严格的安全分类器。

当请求触发安全限制时，API 不一定返回普通错误，而可能返回：

```text
stop_reason: "refusal"
```

也就是说，这类请求会被模型拒绝，或者通过 fallback 机制切换到其他 Claude 模型。

官方特别提到，Fable 5 在网络安全、生物等敏感领域会更谨慎，部分请求可能会被路由到 Claude Opus 4.8 或直接拒绝。

## 对开发者有什么影响？

如果你要在应用里接入 Claude Fable 5，需要注意：

1. **要处理 refusal**
   不要只按普通成功回答处理，要识别 `stop_reason: "refusal"`。

2. **要准备 fallback**
   被拒绝的请求可以降级到 Opus、Sonnet 或其他模型。

3. **不能关闭 thinking**
   `thinking: {"type": "disabled"}` 在 Fable 5 / Mythos 5 上不支持，可能返回 400。

4. **Token 统计可能变多**
   Fable 5 使用 Claude Opus 4.7 引入的新 tokenizer，同样文本相比旧模型可能产生更多 token。

5. **不支持零数据保留**
   官方说明 Fable 5 和 Mythos 5 有 30 天数据保留要求，不适用于 Zero Data Retention 场景。

## 适合什么场景？

Claude Fable 5 更适合：

- 大型代码库理解与重构
- Claude Code 长周期开发任务
- 多步骤 Agent 工作流
- 深度研究和复杂分析
- 长文档阅读与综合
- 高价值商业决策分析
- 需要 1M 上下文的大型任务

不太建议用于：

- 简单问答
- 高频低价值请求
- 成本敏感型批量任务
- 容易触发安全限制的网络安全、生物等敏感内容
- 必须 Zero Data Retention 的企业场景

## 和 Opus 4.8 怎么选？

如果只是日常写作、普通代码、常规问答，Claude Opus 4.8 仍然是更均衡的选择。

如果任务很复杂，需要模型长时间保持目标、处理大量上下文、完成多步骤工程或 Agent 工作流，可以考虑 Claude Fable 5。

简单建议：

| 场景 | 推荐 |
| --- | --- |
| 普通问答、写作、轻量代码 | Opus 4.8 / Sonnet |
| 复杂代码、长任务 Agent | Fable 5 |
| 成本敏感请求 | Sonnet / Haiku |
| 超长上下文复杂任务 | Fable 5 |
| 敏感安全/生物领域研究 | 谨慎使用，可能触发拒绝 |

## 总结

Claude Fable 5 是 Anthropic 当前最重要的新模型之一。它不是简单的“更强 Opus”，而是更偏向长周期 Agent、复杂工程、深度推理的新一代模型。

它的核心价值在于：

- 更强的复杂任务处理能力
- 1M 上下文
- 适合 Claude Code 和 Agent 工作流
- 公开可用，但带有更严格安全限制

对于普通用户来说，Fable 5 适合在“任务足够复杂、价值足够高”的时候使用；对于开发者来说，接入时要重点处理 refusal、fallback、thinking 参数和成本控制。

## 参考来源

- [Anthropic：Claude Fable 5 and Claude Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5)
- [Claude API Docs：Introducing Claude Fable 5 and Claude Mythos 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5)
- [Claude API Docs：Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Claude API Docs：Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Claude API Release Notes](https://platform.claude.com/docs/en/release-notes/overview)
