---
title: 显存不足导致任务失败怎么办？
date: 2026-05-05
category: 问题
tags: [显存, OOM, 故障排除]
---

# 显存不足导致任务失败怎么办？

`CUDA out of memory` 是 AI 训练和推理中最常见的错误之一。本文系统介绍排查思路和解决方案。

## 错误现象

任务日志中出现以下任一提示，即为显存不足（OOM）：

```
RuntimeError: CUDA out of memory.
torch.cuda.OutOfMemoryError: CUDA out of memory.
```

## 快速排查清单

**第一步：确认当前显存使用情况**

```bash
nvidia-smi
# 查看 Memory-Usage 列，如果接近上限即为瓶颈
```

**第二步：清理未释放的显存**

```python
import torch
torch.cuda.empty_cache()
```

**第三步：检查是否有僵尸进程占用**

```bash
fuser -v /dev/nvidia*
# 找到 PID 后用 kill -9 <PID> 释放
```

## 解决方案

### 方案 1：升级实例 GPU

最直接的方式是在控制台切换到显存更大的 GPU：

| 原配置 | 推荐升级 |
|--------|---------|
| RTX 3080 (10GB) | RTX 4090 (24GB) |
| RTX 4090 (24GB) | A100 (80GB) |

### 方案 2：减小 batch size

```python
# 原来
batch_size = 32

# 修改为更小的值
batch_size = 8  # 显存用量约降低 75%
```

### 方案 3：启用梯度检查点（训练场景）

以时间换空间，显存占用可减少约 30-50%：

```python
from torch.utils.checkpoint import checkpoint_sequential
# 或在 HuggingFace Trainer 中设置
training_args = TrainingArguments(
    gradient_checkpointing=True,
    ...
)
```

### 方案 4：使用混合精度训练

```python
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()
with autocast():
    outputs = model(inputs)
    loss = criterion(outputs, labels)
```

::: tip Stable Diffusion 专项优化
在 WebUI 启动参数中加入 `--medvram` 或 `--lowvram`，可将显存占用降低约 30-50%，代价是生成速度略有下降。
:::

## 仍然无法解决？

如果以上方法都试过了还是 OOM，欢迎通过右下角联系我们，提供报错日志，我们的技术支持会协助定位。

---

*返回 [常见问题总览](/faq/)*
