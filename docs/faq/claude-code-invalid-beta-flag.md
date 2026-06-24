---
title: Claude Code 报 invalid beta flag 怎么解决？
date: 2026-06-11
category: 常见问题
tags: [Claude Code, invalid beta flag, BedrockRuntime, 接入教程]
---

## 问题现象

使用 Claude Code 调用模型时，可能会看到类似报错：

![Claude Code invalid beta flag 报错截图](/faq/claude-code-invalid-beta-flag-error.jpg)

```text
API Error: 400 ValidationException: invalid beta flag
Service: BedrockRuntime
Status Code: 400
```

这个问题通常不是 API Key 错误，也不是模型不可用，而是 Claude Code 向网关发送了当前接口不支持的 beta 标记。

## 解决方法

在 Claude Code 的 `settings.json` 里增加环境变量：

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "env": {
    "ANTHROPIC_BASE_URL": "https://b.pandatoken.net",
    "ANTHROPIC_AUTH_TOKEN": "你的密钥",
    "ANTHROPIC_MODEL": "claude-opus-4-8",
    "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1"
  }
}
```

关键配置是：

```json
"CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS": "1"
```

添加后，重启 Claude Code，再重新发起请求即可。

## 为什么这样能解决？

[Claude Code 官方文档](https://code.claude.com/docs/zh-CN/llm-gateway#additional-resources)说明：当使用 Bedrock 或 Vertex 的 Anthropic Messages 格式时，可能需要设置：

```text
CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1
```

![Claude Code 官方文档中关于关闭实验性 beta 标记的说明](/faq/claude-code-disable-experimental-betas-docs.png)

这个配置会关闭 Claude Code 的实验性 beta 标记，避免网关或 Bedrock Runtime 因不支持相关 beta flag 而返回 `400 invalid beta flag`。

## 仍然报错怎么办？

1. 确认 `ANTHROPIC_BASE_URL` 填写为：

   ```text
   https://b.pandatoken.net
   ```

2. 确认 `ANTHROPIC_AUTH_TOKEN` 已替换成你的真实熊猫算力密钥。

3. 确认保存的是 Claude Code 实际读取的 `settings.json`。

4. 保存配置后，需要重启 Claude Code。
