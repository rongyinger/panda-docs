---
title: Cursor 怎么接入熊猫算力？
date: 2026-05-18
category: 常见问题
tags: [Cursor, 接入教程]
---

## 配置步骤

1. 打开 Cursor，进入 **Settings → Models**
2. 找到 **OpenAI API Key** 一栏，填入你的熊猫算力 Key
3. 找到 **Override OpenAI Base URL**，填入：
   ```
   https://c.pandatoken.com/v1
   ```
4. 在模型列表里选择你想用的模型
5. 保存，测试一下是否正常响应

## 常见问题

**Q：填完还是连不上？**
检查 base_url 末尾有没有 `/v1`，必须带上。

**Q：模型列表里没有 Claude？**
在 Cursor 的模型输入框手动输入模型名称，如 `claude-sonnet-4-5`。

**Q：一直报 429？**
Cursor 默认请求频率较高，可以在设置里降低并发数，或联系客服升级并发限额。
