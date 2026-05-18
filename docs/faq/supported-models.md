---
title: 平台支持哪些模型？怎么选？
date: 2026-05-18
category: 常见问题
tags: [模型, 选型, 模型列表]
---

## 完整模型列表

### Claude 系列（Anthropic）

**适合**：长文本处理、代码生成、文档分析、复杂指令遵循，上下文窗口 200k

| 模型 ID | 特点 |
|---------|------|
| `claude-opus-4-7` | 最新旗舰，综合能力最强 |
| `claude-opus-4-6` | 旗舰级，能力与稳定性兼顾 |
| `claude-opus-4-5-20251101` | 经典旗舰版本 |
| `claude-sonnet-4-6` | 最新均衡版，日常首选 |
| `claude-sonnet-4-5-20250929` | 均衡版经典版本，速度与能力平衡 |
| `claude-haiku-4-5-20251001` | 最快最省，适合简单任务和高频调用 |

---

### GPT 系列（OpenAI）

**适合**：通用对话、Agent 工作流、工具调用、代码生成

| 模型 ID | 特点 |
|---------|------|
| `gpt-5.4` | 当前最强版本，综合能力顶尖 |
| `gpt-5.3-codex` | 代码专项增强 |
| `gpt-5.2` | 均衡版本 |
| `gpt-5.2-codex` | 均衡代码版 |
| `gpt-5.1` | 轻量版本，性价比高 |
| `gpt-5.1-codex` | 轻量代码版 |

---

### Gemini 系列（Google）

**适合**：多模态任务、超长上下文、图片生成与理解、视频理解

| 模型 ID | 特点 |
|---------|------|
| `gemini-3.1-pro-preview` | 最新旗舰预览版，能力最强 |
| `gemini-3.1-flash-image-preview` | 图像生成专项，支持图片输出 |
| `gemini-3.1-flash-lite-preview` | 轻量快速版，低成本场景 |
| `gemini-2.5-pro` | 稳定旗舰，超长上下文（1M tokens） |
| `gemini-2.5-flash` | 速度快，性价比高 |

---

### Grok 系列（xAI）

**适合**：实时信息、推理任务、代码生成

| 模型 ID | 特点 |
|---------|------|
| `grok-4-1-fast-reasoning` | 推理增强版，适合复杂逻辑 |
| `grok-4-1-fast-non-reasoning` | 标准版，速度快 |
| `grok-code-fast-1` | 代码专项优化 |

---

### GLM 系列（智谱）

**适合**：中文理解、国内合规场景

| 模型 ID | 特点 |
|---------|------|
| `glm-5.1` | 最新版本，中文能力强 |
| `glm-5` | 稳定版本 |

---

### MiniMax 系列

**适合**：中文生成、长文本、企业场景

| 模型 ID | 特点 |
|---------|------|
| `minimax-m2.7` | 最新旗舰 |
| `minimax-m2.5` | 均衡版本 |
| `minimax-m2.5-highspeed` | 高速版，低延迟场景 |

---

### Qwen 系列（阿里云）

**适合**：中文生态、代码、多模态、长文本

| 模型 ID | 特点 |
|---------|------|
| `qwen3.5-397b-a17b` | 最大参数版本，能力最强 |
| `qwen3.5-plus` | 旗舰均衡版 |
| `qwen3.5-flash` | 轻量快速版 |
| `qwen3-coder` | 代码专项优化 |
| `qwen3-vl-plus` | 视觉语言多模态版 |

---

### Doubao 系列（字节跳动）

**适合**：中文场景、视频生成、代码

| 模型 ID | 特点 |
|---------|------|
| `doubao-seed-2.0-pro` | 旗舰版，综合能力强 |
| `doubao-seed-2.0-code` | 代码专项优化 |
| `doubao-seed-2-0-lite` | 轻量版，低成本 |
| `doubao-seedance-2-0-260128` | 视频生成旗舰版 |
| `doubao-seedance-2-0-fast-260128` | 视频生成快速版 |

---

### DeepSeek 系列

**适合**：中文任务、代码、高性价比场景

| 模型 ID | 特点 |
|---------|------|
| `deepseek-v4-pro` | 旗舰版，能力强，性价比高 |
| `deepseek-v4-flash` | 轻量快速版，低成本高频调用 |

---

### Kimi 系列（Moonshot）

**适合**：长文本、中文理解、推理、联网搜索

| 模型 ID | 特点 |
|---------|------|
| `kimi-k2-thinking` | 推理增强版，适合复杂逻辑 |
| `kimi-k2-5-260127` | 均衡版本 |
| `kimi-k2` | 标准版 |

---

### Mimo 系列

**适合**：轻量场景、快速响应

| 模型 ID | 特点 |
|---------|------|
| `mimo-v2-pro` | 旗舰版 |
| `mimo-v2-flash` | 轻量快速版 |

---

## 选型建议

::: tip 不知道选哪个？看这里
**通用首选**
- 中文场景首选：`deepseek-v4-pro` 或 `kimi-k2`，性价比最高
- 英文/代码首选：`claude-sonnet-4-6` 或 `gpt-5.4`
- 均衡日常使用：`claude-sonnet-4-6`

**按任务选模型**
- 长文档分析：`claude-opus-4-7`、`gemini-2.5-pro`
- 代码生成：`gpt-5.3-codex`、`qwen3-coder`、`grok-code-fast-1`
- 图片理解：`gpt-5.4`、`claude-opus-4-7`、`gemini-2.5-pro`
- 图片生成：`gemini-3.1-flash-image-preview`
- 视频生成：`doubao-seedance-2-0-260128`
- 复杂推理：`claude-opus-4-7`、`grok-4-1-fast-reasoning`、`kimi-k2-thinking`
- 高频低成本：`claude-haiku-4-5-20251001`、`deepseek-v4-flash`、`qwen3.5-flash`
- 国内合规场景：`glm-5.1`、`qwen3.5-plus`、`doubao-seed-2.0-pro`
:::
