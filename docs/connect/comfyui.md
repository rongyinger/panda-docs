---
title: 熊猫算力平台与 ComfyUI 连接教程
date: 2026-05-08
category: 拓展
tags: [ComfyUI, 连接, 图像生成]
---

# 熊猫算力平台与 ComfyUI 连接教程

ComfyUI 是目前最受专业用户青睐的 Stable Diffusion 节点式工作流工具。本教程介绍如何将 ComfyUI 部署在熊猫算力平台上并通过 API 远程调用。

## 方案一：在平台实例上运行 ComfyUI

### 安装

```bash
git clone https://github.com/comfyanonymous/ComfyUI
cd ComfyUI
pip install -r requirements.txt
```

### 启动并开放外部访问

```bash
python main.py --listen 0.0.0.0 --port 8188 --enable-cors-header
```

记得在控制台安全组开放 `8188` 端口，然后访问 `http://<实例IP>:8188`。

## 方案二：本地 ComfyUI 调用平台 GPU

通过 [ComfyUI-Manager](https://github.com/ltdrdata/ComfyUI-Manager) 安装「远程推理」节点后，填写熊猫算力的接入信息：

| 参数 | 值 |
|------|----|
| API Base URL | `https://api.pandatoken.com/v1` |
| API Key | 你的 PandaToken Key |
| 模型 | `sd-xl-base-1.0` 等 |

::: tip 推荐方案
对于本地配置较低的用户，推荐使用方案二，在本地设计工作流，将实际推理任务发送到云端 GPU 执行。
:::

## 常见问题

**Q：连接后提示「API Key 无效」？**

检查 Key 是否以 `sk-pt-` 开头，并确认账户有余额。

**Q：生成速度比预期慢？**

确认选择的 GPU 型号，SDXL 建议使用 RTX 4090 或 A100。

---

*返回 [拓展连接总览](/connect/)*
