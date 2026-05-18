---
title: Lobe Chat 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [Lobe Chat, 多模型, 客户端]
---

## 什么是 Lobe Chat

Lobe Chat 是一个开源的高颜值 AI 对话客户端，支持多模型切换、插件扩展、语音对话、图片生成等功能，国内开发者社区活跃。

## 在线版配置

访问 [lobechat.com](https://lobechat.com)，进入 **Settings → Language Model → OpenAI**：

- **API Key**：填写你的熊猫算力 Key
- **API Proxy URL**：填写 `https://c.pandatoken.com/v1`
- 点击「Check」验证连接
- 成功后在模型列表选择你需要的模型

## 本地部署版配置

### 方法一：环境变量

```bash
# 克隆项目
git clone https://github.com/lobehub/lobe-chat.git
cd lobe-chat

# 复制环境变量文件
cp .env.example .env
```

编辑 `.env`：
```bash
OPENAI_API_KEY=你的熊猫算力Key
OPENAI_PROXY_URL=https://c.pandatoken.com/v1
```

启动：
```bash
npm install
npm run dev
```

### 方法二：Docker 部署

```bash
docker run -d \
  -p 3210:3210 \
  -e OPENAI_API_KEY=你的熊猫算力Key \
  -e OPENAI_PROXY_URL=https://c.pandatoken.com/v1 \
  --name lobe-chat \
  lobehub/lobe-chat
```

## 配置 Claude 模型

Lobe Chat 默认模型列表可能没有最新的 Claude 模型，需要手动添加：

1. Settings → Language Model → OpenAI
2. 展开「Model List」
3. 点击「+」添加以下模型 ID：
   - `claude-opus-4-7`
   - `claude-sonnet-4-6`
   - `claude-haiku-4-5-20251001`
