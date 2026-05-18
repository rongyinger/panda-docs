---
title: Open WebUI 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [Open WebUI, Docker, 本地部署]
---

## 什么是 Open WebUI

Open WebUI 是一个开源的本地 AI 聊天界面，支持多模型切换、知识库、工具插件等功能，可以通过 Docker 快速部署到本地或服务器。

## 安装 Open WebUI

确保已安装 Docker，然后执行：

```bash
docker run -d \
  -p 3000:8080 \
  -e OPENAI_API_KEY="你的熊猫算力Key" \
  -e OPENAI_API_BASE_URL="https://c.pandatoken.com/v1" \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

访问 `http://localhost:3000` 即可使用。

## 在界面内配置（已安装后）

1. 进入 **Settings → Connections**
2. 找到 **OpenAI API** 区域
3. API Key 填写你的熊猫算力 Key
4. API Base URL 填写：`https://c.pandatoken.com/v1`
5. 点击保存，刷新模型列表

## 添加模型

进入 **Settings → Models**，手动添加模型 ID，例如：
- `claude-sonnet-4-6`
- `claude-opus-4-7`
- `gpt-5.4`
- `deepseek-v4-pro`
- `gemini-2.5-pro`

## 使用 Docker Compose（推荐生产环境）

新建 `docker-compose.yml`：

```yaml
version: '3'
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    environment:
      - OPENAI_API_KEY=你的熊猫算力Key
      - OPENAI_API_BASE_URL=https://c.pandatoken.com/v1
    volumes:
      - open-webui:/app/backend/data
    restart: always

volumes:
  open-webui:
```

启动：
```bash
docker compose up -d
```

::: tip
Open WebUI 支持多用户管理，适合团队内部部署。企业客户可以配合熊猫算力企业端 `b.pandatoken.com` 使用，稳定性更高。
:::
