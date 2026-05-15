---
title: 如何在熊猫算力平台上部署 Stable Diffusion WebUI
date: 2026-05-10
category: 教程
tags: [Stable Diffusion, 部署, 入门]
---

# 如何在熊猫算力平台上部署 Stable Diffusion WebUI

本教程将带你从零开始，在熊猫算力平台上完成 Stable Diffusion WebUI 的完整部署，整个过程约需 15 分钟。

## 前置准备

- 已注册熊猫算力账号并完成实名认证
- 账户余额充足（推荐先充值 ¥50 体验）
- 了解基本的 Linux 命令行操作

## 第一步：创建算力实例

登录控制台，点击「新建实例」，选择以下配置：

| 参数 | 推荐值 |
|------|--------|
| GPU 类型 | RTX 4090 × 1 |
| 显存 | 24 GB |
| 系统镜像 | PyTorch 2.1 + CUDA 12.1 |
| 存储 | 系统盘 50 GB + 数据盘 100 GB |

::: tip 选择镜像
推荐选择带有 PyTorch 的预装镜像，可以省去大量环境配置时间。
:::

## 第二步：连接实例

实例启动后，通过平台内置的 JupyterLab 或 SSH 连接：

```bash
ssh root@<实例IP> -p <端口号>
# 密码在控制台「实例详情」页面查看
```

## 第三步：安装 WebUI

```bash
# 克隆仓库
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui

# 安装依赖并启动（首次启动会自动下载必要组件）
./webui.sh --listen --port 7860 --enable-insecure-extension-access
```

启动完成后，访问 `http://<实例IP>:7860` 即可打开 WebUI 界面。

> **注意**：请在控制台「安全组」中开放 `7860` 端口，否则无法从外部访问。

## 第四步：下载模型

```bash
# 下载 Stable Diffusion 1.5 基础模型
cd models/Stable-diffusion
wget https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors
```

::: warning 模型版权
请确保你使用的模型遵守相应的开源协议，避免用于商业用途时产生法律风险。
:::

下载完成后刷新 WebUI 页面，在模型列表中选择刚下载的模型，即可开始生成图片！

---

*遇到问题？查看 [显存不足怎么办](/faq/vram-issue) 或 [联系客服](/faq/)。*
