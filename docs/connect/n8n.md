---
title: n8n 接入熊猫算力教程
date: 2026-05-18
category: 拓展连接
tags: [n8n, 自动化, 工作流, AI节点]
---

## 什么是 n8n

n8n 是一个开源低代码自动化平台，可以把 AI 模型和各种服务（邮件、数据库、Slack、微信等）连接在一起，搭建自动化工作流，无需写代码。

## 安装 n8n

**Docker 部署（推荐）：**

```bash
docker run -d \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=你的密码 \
  -v n8n_data:/home/node/.n8n \
  --name n8n \
  n8nio/n8n
```

访问 `http://localhost:5678`。

**npm 安装：**
```bash
npm install -g n8n
n8n start
```

## 在 n8n 中配置熊猫算力

### 方法一：使用 OpenAI 节点（推荐）

1. 在工作流中添加 **OpenAI** 节点
2. 点击 **Credentials → Create New**
3. 填写：
   - **API Key**：你的熊猫算力 Key
   - **Base URL**：`https://c.pandatoken.com/v1`
4. 保存，在节点中选择模型即可

### 方法二：使用 HTTP Request 节点（更灵活）

添加 **HTTP Request** 节点，配置如下：

```
Method: POST
URL: https://c.pandatoken.com/v1/chat/completions
Headers:
  Authorization: Bearer 你的熊猫算力Key
  Content-Type: application/json
Body (JSON):
{
  "model": "claude-sonnet-4-6",
  "messages": [
    {"role": "user", "content": "{{ $json.input }}"}
  ]
}
```

## 实用工作流示例

**自动邮件摘要：**
```
收到邮件触发 → 提取邮件内容 → Claude 生成摘要 → 发送到 Slack
```

**内容自动审核：**
```
定时触发 → 获取待审内容 → Claude 判断是否合规 → 写入数据库
```

**客服自动回复：**
```
收到消息 → Claude 生成回复 → 发送回复 → 记录日志
```

::: tip
n8n 的 AI 节点支持批量处理，配合熊猫算力的 `deepseek-v4-flash` 处理简单判断类任务，成本极低。
:::
