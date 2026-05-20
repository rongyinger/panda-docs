---
title: Claude 桌面版接入熊猫算力 · 完整教程
date: 2026-05-19
category: 拓展连接
tags: [Claude Desktop, 桌面版, 接入教程, 开发者]
---

# Claude 桌面版接入熊猫算力 · 完整教程

Claude Desktop 可以通过官方提供的第三方推理入口，把请求转发到你自己的 API 网关。接入熊猫算力后，不需要海外手机号，也不需要订阅 Pro，就能直接用国内中转。

**预计用时：5 分钟 · 推荐人群：开发者 · 支持平台：Windows / macOS**

---

## 什么是 Claude Desktop 接入？

Claude Desktop 的开发者模式里有一个第三方推理配置入口，填写 Base URL 和 API Key 后，就能把请求交给熊猫算力的 Anthropic 兼容网关。

::: tip 提前说明
这条路走的是官方允许的第三方推理入口，不是改客户端核心逻辑。
:::

---

## Step 01：下载安装 Claude Desktop

### 1. 下载客户端

前往 Claude 官方下载页，下载对应系统的安装包。Windows 一般是 `Claude Setup.exe`。

![Claude Setup.exe 下载弹窗](/images/connect/claude-desktop-01.jpg)

### 2. 安装后先停在登录页

安装完成后先打开客户端，但不要完成账号登录。停在登录页即可。

::: warning 注意
如果你已经完整登录到主界面，后面的开发者入口可能被锁住，需要先退出并重启客户端。
:::

---

## Step 02：开启开发者模式

### 1. 打开菜单

在登录页状态下，点击 `Help → Troubleshooting → Enable Developer Mode`。

![Help → Troubleshooting → Enable Developer Mode 菜单路径](/images/connect/claude-desktop-02.png)

### 2. 确认菜单出现

启用成功后，顶部菜单会多出一个 `Developer` 选项。

::: tip 如果没看到
先把 Claude 完全退出，再重新打开一次，很多时候是进程没有真正关掉。
:::

---

## Step 03：打开第三方推理配置

### 1. 进入配置面板

点击 `Developer`，选择 `Configure Third-Party Inference...`。

![Developer 菜单展开,高亮 Configure Third-Party Inference](/images/connect/claude-desktop-03.png)

### 2. 选择网关类型

在面板里选择 `Connection`，然后把网关类型设成 `Gateway (Anthropic-compatible)`。

---

## Step 04：填写网关信息

### 1. 写入 Base URL 和 Key

把熊猫算力的接入信息填进去：

| 项目 | 填写内容 |
|---|---|
| Gateway base URL | `https://b.pandatoken.net` |
| Gateway API key | 你的熊猫算力 `sk-` 令牌 |
| Gateway auth scheme | `bearer` |
| Gateway extra headers | 留空 |

![Configure third-party inference 主面板,填写 Gateway base URL 和 API Key](/images/connect/claude-desktop-04.jpg)

### 2. 本地应用配置

点击右下角的 `Apply locally`，不要点 `Export`。然后完全退出 Claude Desktop 再重新打开。

::: tip Apply locally vs Export
`Apply locally` 是写入本机客户端配置，`Export` 是导出给别人用的配置文件，这一步不需要点 `Export`。
:::

---

## Step 05：验证连通

### 1. 重新启动客户端

重启后，登录页会出现 `Continue with local gateway` 选项，点它进入主界面。

### 2. 发一句测试消息

随便发一句“你好”，能正常返回回复就说明接入成功。

![Cowork 主界面成功对话,左下角 Cowork 3P · Gateway,右下角模型选择器展开](/images/connect/claude-desktop-05.jpg)

### 3. 成功标志

1. 左下角显示 `Cowork 3P · Gateway`
2. 右下角可以切换模型
3. `Cowork` 和 `Code` 两种模式都可用

---

## 常见问题

### 1. 看不到 Developer 菜单

先确认 Claude 是否完全退出，再重新打开。如果还不行，检查版本是否过旧。

### 2. 点了 Apply locally 没反应

大概率是客户端没有真正重启，先退出干净再开一次。

### 3. 401 Unauthorized / Invalid API key

检查 API Key 是否复制完整，前后有没有空格，是否还是熊猫算力后台生成的 `sk-` 令牌。

### 4. Connection refused / ECONNREFUSED

确认 Base URL 是 `https://b.pandatoken.net`，不要多写 `/`，也不要写成 `http`。

### 5. 请求超时

本地代理软件可能在干扰桌面端请求，建议暂时关闭代理，或者把中转站域名加入直连白名单。

### 6. 不小心登录了官方账号

先退出账号，再完全关闭客户端重开。必要时可以清理用户配置目录后重新配置。

---

接入完成后，Claude Desktop 就会通过熊猫算力网关工作，后续模型和额度都在熊猫算力后台统一查看。
