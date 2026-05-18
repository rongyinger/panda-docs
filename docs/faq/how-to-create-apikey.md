---
title: 怎么创建和管理 API Key？
date: 2026-05-18
category: 常见问题
tags: [API Key, 新手入门]
---

## 创建步骤

1. 登录控制台
2. 点击左侧「API Key 管理」
3. 点击「新建 Key」
4. 填写备注名称（建议按项目命名，方便区分）
5. 复制保存，**Key 只显示一次**

## 管理建议

- 不同项目使用不同的 Key，便于追踪用量
- 定期检查 Key 的使用情况
- 不再使用的 Key 及时删除
- 不要把 Key 写死在代码里，用环境变量管理

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("PANDA_API_KEY"),
    base_url="https://c.pandatoken.com/v1"
)
```

::: warning
Key 创建后只显示一次，请立即复制保存到安全的地方。
:::
