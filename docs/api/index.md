---
title: API 接入概述
description: 熊猫算力 API 接入指南与文档索引
---

# API 接入概述

熊猫算力的 API 与 OpenAI 接口完全兼容，只需替换 `base_url` 和 `api_key` 即可接入。

## 接入信息

| 参数 | 值 |
|------|----|
| Base URL | `https://api.pandatoken.com/v1` |
| 鉴权方式 | Bearer Token（HTTP Header） |
| 协议 | HTTPS，TLS 1.2+ |
| 支持格式 | JSON，Server-Sent Events (Streaming) |

## 鉴权

所有请求需在 HTTP Header 中携带 API Key：

```http
Authorization: Bearer sk-pt-xxxxxxxxxxxxxxxxxxxxxxxx
```

## 快速索引

- [快速开始](/api/quickstart) — 完整的接入示例（cURL / Python / Node.js）
- [模型列表](/models/) — 可用模型 ID 与价格

## 错误码速查

| HTTP 状态码 | 说明 |
|------------|------|
| 400 | 请求参数错误，检查 `messages` 格式 |
| 401 | API Key 无效或已过期 |
| 402 | 账户余额不足 |
| 429 | 请求频率超限（RPM/TPM） |
| 500 | 服务端内部错误，稍后重试 |
| 529 | 上游模型过载，稍后重试 |

::: warning 注意
遇到 `529` 时建议实现指数退避重试，而非立即重试，避免加剧拥堵。
:::
