---
title: FastGPT 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [FastGPT, 知识库, 企业, RAG]
---

## 什么是 FastGPT

FastGPT 是一个开源的知识库问答平台，支持上传文档建立知识库，基于 RAG 技术实现精准问答。广泛用于企业内部知识管理、客服系统、产品文档问答等场景。

## 部署 FastGPT

**Docker Compose 一键部署：**

```bash
# 下载配置文件
git clone https://github.com/labring/FastGPT.git
cd FastGPT/files/deploy/fastgpt

# 编辑配置
cp .env.example .env
```

编辑 `.env` 文件，配置熊猫算力：

```bash
# 熊猫算力 API 配置
OPENAI_BASE_URL=https://c.pandatoken.com/v1
CHAT_API_KEY=你的熊猫算力Key

# 向量模型（用于知识库）
VECTOR_MODEL=text-embedding-3-small

# 数据库配置（按需修改）
MONGO_PASSWORD=你的MongoDB密码
PG_PASSWORD=你的PG密码
```

启动：
```bash
docker compose up -d
```

访问 `http://localhost:3000`。

## 配置模型列表

编辑 `config.json`（或在管理后台配置），添加熊猫算力支持的模型：

```json
{
  "llmModels": [
    {
      "model": "claude-sonnet-4-6",
      "name": "Claude Sonnet 4.6",
      "maxContext": 200000,
      "maxResponse": 4096,
      "quoteMaxToken": 120000,
      "maxTemperature": 1.2,
      "vision": true
    },
    {
      "model": "claude-opus-4-7",
      "name": "Claude Opus 4.7",
      "maxContext": 200000,
      "maxResponse": 8192,
      "quoteMaxToken": 150000,
      "maxTemperature": 1.2,
      "vision": true
    },
    {
      "model": "deepseek-v4-pro",
      "name": "DeepSeek V4 Pro",
      "maxContext": 64000,
      "maxResponse": 4096,
      "quoteMaxToken": 40000,
      "maxTemperature": 1.2,
      "vision": false
    }
  ],
  "vectorModels": [
    {
      "model": "text-embedding-3-small",
      "name": "Embedding Small",
      "defaultToken": 512,
      "maxToken": 8191
    }
  ]
}
```

## 建立知识库

1. 进入 **知识库 → 新建知识库**
2. 选择向量模型（推荐 `text-embedding-3-small`）
3. 上传文件：支持 PDF、Word、Markdown、TXT、网页链接
4. 等待向量化完成
5. 新建应用，绑定知识库，配置对话模型

## 推荐模型搭配

| 用途 | 推荐模型 | 原因 |
|------|---------|------|
| 知识库问答 | `claude-sonnet-4-6` | 指令遵循强，引用准确 |
| 文档总结 | `deepseek-v4-pro` | 中文好，成本低 |
| 向量化 | `text-embedding-3-small` | 性价比最高 |

::: tip 企业用户
FastGPT 支持多知识库、多应用、权限管理，适合企业内部部署。建议配合熊猫算力企业端 `b.pandatoken.com` 使用，保障服务稳定性。联系客服可获取企业专属接入方案。
:::
