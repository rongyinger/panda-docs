---
title: AnythingLLM 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [AnythingLLM, 知识库, 本地部署, 企业]
---

## 什么是 AnythingLLM

AnythingLLM 是一个开源的本地知识库 + 多模型对话平台，支持上传文档、建立知识库、多用户管理，适合企业内部知识管理场景。

## 安装 AnythingLLM

**桌面版（推荐新手）：**
访问 [anythingllm.com](https://anythingllm.com) 下载桌面应用，支持 Windows、macOS、Linux。

**Docker 版（推荐服务器部署）：**
```bash
docker run -d \
  -p 3001:3001 \
  -v anythingllm:/app/server/storage \
  --name anythingllm \
  mintplexlabs/anythingllm
```

## 配置熊猫算力

1. 启动 AnythingLLM，进入 **Settings → LLM Preference**
2. LLM Provider 选择 **OpenAI**
3. 填写：
   - **API Key**：你的熊猫算力 Key
   - **Base URL**：`https://c.pandatoken.com/v1`
   - **Chat Model**：`claude-sonnet-4-6`
4. 保存并测试连接

## 配置 Embedding 模型（知识库必须）

进入 **Settings → Embedding Preference**：
- Provider 选 **OpenAI**
- Embedding Model 填写：`text-embedding-3-small`
- 同样使用熊猫算力的 Key 和 Base URL

## 建立知识库

1. 点击左侧「+」新建 Workspace
2. 进入 Workspace → **Upload Document**
3. 支持上传：PDF、Word、TXT、Markdown、网页链接
4. 上传后等待向量化处理
5. 完成后即可在对话中基于文档内容提问

::: tip 企业用户建议
AnythingLLM 支持多用户权限管理，适合团队协作。建议使用熊猫算力企业端 `b.pandatoken.com`，配合 SLA 保障确保知识库服务稳定运行。
:::
