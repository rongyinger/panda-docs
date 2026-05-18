---
title: Node.js 怎么调用熊猫算力 API？
date: 2026-05-18
category: 常见问题
tags: [Node.js, 开发者, 快速上手]
---

## 安装依赖

```bash
npm install openai
```

## 基本调用

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "你的熊猫算力Key",
  baseURL: "https://c.pandatoken.com/v1",
});

const response = await client.chat.completions.create({
  model: "claude-sonnet-4-5",
  messages: [{ role: "user", content: "你好" }],
});

console.log(response.choices[0].message.content);
```

## 流式输出

```javascript
const stream = await client.chat.completions.create({
  model: "claude-sonnet-4-5",
  messages: [{ role: "user", content: "写一首诗" }],
  stream: true,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || "";
  process.stdout.write(content);
}
```

## 多轮对话

```javascript
const messages = [
  { role: "system", content: "你是一个有帮助的助手" }
];

async function chat(userInput) {
  messages.push({ role: "user", content: userInput });

  const response = await client.chat.completions.create({
    model: "claude-sonnet-4-5",
    messages: messages,
  });

  const reply = response.choices[0].message.content;
  messages.push({ role: "assistant", content: reply });
  return reply;
}
```
