---
title: Claude 桌面版接入熊猫算力 · 完整教程
date: 2026-05-19
category: 拓展连接
tags: [Claude Code, 桌面版, 教程]
---

熊猫算力 · 接入指南

## Claude 桌面版接入熊猫算力 不登录官方账号,直接用国内中转

Anthropic 在 Claude Desktop 里藏了一个开发者入口,可以让客户端把请求转发到你自己指定的 API 网关。**不需要海外手机号、不需要订阅 Pro**,填一个 Base URL 和 API Key 就能跑通。下面是完整步骤,每步都配截图。

适用系统

Windows · macOS

耗时

约 5 分钟

难度

★☆☆☆☆

是否需要订阅

否

为什么这么做 · Why

### 桌面客户端 + 中转站,*各取所长*

Claude Code 命令行版本接中转站早就有教程了,但桌面客户端的图形界面才是大多数人想要的——**贴图、长对话、模型切换、Cowork 任务流**,这些操作在终端里都不顺手。Anthropic 自己开了 **Configure third-party inference** 这个入口,意味着这条路是被官方默认支持的,不是邪门歪道。

🇨🇳

##### 国内可直连

熊猫算力的网关部署在国内,日常对话不需要科学上网,稳定性比直连 anthropic.com 高一个量级。

💳

##### 人民币结算

支付宝/微信充值,开发票,不再需要海外信用卡和 Anthropic 海外账号。

🎛️

##### GUI 体验完整

桌面端的 Cowork、Code、模型切换、对话历史都在,跟官方账号登录后看到的几乎一样。

### 开始前,准备这四样

✓

##### 科学上网工具(仅下载阶段用)

访问 `claude.ai/download` 在国内无法直连,需要科学上网才能下载安装包。**Clash、V2Ray** 任选一个能用的就行。装好客户端后**就可以关掉了**——后续对话走熊猫算力网关,不再依赖代理。

✓

##### 熊猫算力账号 & API Key

登录熊猫算力后台,在「API 令牌」页创建一个新令牌,得到以 `sk-` 开头的字符串,复制好备用。

✓

##### Claude 桌面客户端安装包

从 `https://claude.ai/download` 下载对应系统的版本。**不要**用第三方分发的安装包,后面的开发者入口可能被改掉。

✓

##### 中转站的 Base URL

熊猫算力提供的 Anthropic 兼容接口地址,本教程示例用 `https://b.pandatoken.net`。以中转站后台显示为准。

STEP 01

DOWNLOAD

### 下载并安装 Claude Desktop

开启科学上网,访问 **claude.ai/download**,选对应系统的安装包。Windows 下载下来是 **Claude Setup.exe**,双击安装即可,无需特殊配置。安装完成后科学上网工具就可以关掉了。

![Claude Setup.exe 下载弹窗](/images/connect/claude-desktop-01.jpg)

浏览器下载完成提示 · 安装包名称为 Claude Setup.exe · 来源为 claude.ai

提示

· 安装完成后会自动启动客户端,Mac 用户初次启动可能会被 Gatekeeper 拦一下,在「系统设置 → 隐私与安全性」里允许即可。

STEP 02

LAUNCH · 不要进入账号

### 启动客户端,停在登录页

这是整个流程**最容易踩坑的一步**。打开客户端后,会看到 Anthropic 的登录页面。你可以用 Google 邮箱登录到这一步,但是**不要进一步登录 Claude 账号**——也就是不要完成账号绑定、Pro 订阅那一整套流程。停在登录页或者邮箱验证页都行,只要还没真正进到主界面就可以继续。

为什么

· 一旦完成账号登录、进入主界面,客户端会进入"已认证"状态,后面要开启的第三方网关入口会被锁死,只能卸载重装才能恢复。

STEP 03

DEVELOPER MODE

### 开启*开发者模式*

在登录页的状态下,点击顶部菜单栏:**Help → Troubleshooting → Enable Developer Mode**。Windows 上如果菜单栏没有显示,按一下 `Alt` 键或者点左上角的三横线图标。

![Help → Troubleshooting → Enable Developer Mode 菜单路径](/images/connect/claude-desktop-02.png)

菜单路径:Help → Troubleshooting → Enable Developer Mode

启用成功的标志

· 菜单栏会新增一个

Developer

选项。如果没看到,完全退出客户端(Windows 系统托盘里也要退干净)再重新打开,菜单栏就出来了。详细排查方法见文末常见问题。

STEP 04

CONFIGURE

### 打开*第三方推理配置*入口

点击新出现的 **Developer** 菜单,选择 **Configure Third-Party Inference...**。其他选项(Open MCP Log File、Reload MCP Configuration 等)这次用不到,先不管。

![Developer 菜单展开,高亮 Configure Third-Party Inference](/images/connect/claude-desktop-03.png)

Developer 菜单展开 · 选择 Configure Third-Party Inference...

STEP 05

FILL IN

### 填写网关地址和密钥,*本地应用*

在配置面板里,左侧选 **Connection**,右侧选择网关类型为 **Gateway (Anthropic-compatible)**。然后填入熊猫算力的接入信息:

Gateway base URL

https://b.pandatoken.net

必填

Gateway API key

sk-···(粘贴你的熊猫算力令牌)

必填

Gateway auth scheme

bearer

Gateway extra headers

留空

![Configure third-party inference 主面板,填写 Gateway base URL 和 API Key](/images/connect/claude-desktop-04.jpg)

配置面板填写示例 · 选 Connection → Gateway → 填 Base URL + API Key → 右下角 Apply locally

填完之后,点击右下角的 **Apply locally**(不是 Export)。然后**完全退出 Claude Desktop 再重新打开**——不重启的话配置不会生效。

Apply locally vs Export

· Apply locally 把配置写入本机的客户端,只对当前这台机器生效,换电脑要重做一遍。Export 是把配置导出成 JSON 给别人用的,不需要点。

STEP 06

VERIFY

### 验证连通,*开始使用*

重启后,登录页会多出一个 **「Continue with local gateway」**(继续使用本地网关)的选项,点它进入主界面。随便发一句话(比如「你好」),能正常返回回复就算成功了。

![Cowork 主界面成功对话,左下角 Cowork 3P · Gateway,右下角模型选择器展开](/images/connect/claude-desktop-05.jpg)

连通后主界面 · 左下角标识 Cowork 3P · Gateway 模式 · 右下角可在 Sonnet 4.6 / Opus 4.7 / Opus 4.6 之间切换

1

左下角的状态标识

· 显示

Cowork 3P · Gateway

说明已经走的是第三方网关,不是官方接口。

2

右下角的模型选择器

· 点开可以在 Sonnet / Opus 各版本之间切换,具体能用哪些以中转站后台开通的渠道为准。

3

顶部的 Cowork / Code 切换

· Cowork 是对话模式,Code 是编程模式(等价于桌面里嵌的 Claude Code),都可以用。

成功了

· 此时你已经把熊猫算力的资源完整接入了桌面客户端,可以开始正常使用。Token 计费在熊猫算力后台查看。

### 常见问题

90% 的卡点都在这里 · 按从简单到复杂排查

菜单栏里看不到 Developer 选项

按从简单到复杂的顺序,一步步把 Developer 菜单找回来。

###### 第一步:把 Claude 彻底退出

Developer 菜单消失,**90% 的情况是进程没完全关掉,配置没生效**。

**Mac 系统** · 按 `Cmd + Q` 彻底关闭 Claude(不要只点叉号),或打开「活动监视器」搜索 `Claude` 强制退出所有相关进程。也可以在终端执行:

```bash
killall Claude
```

**Windows 系统** · 右键任务栏打开「任务管理器」,找到 `Claude` 进程右键「结束任务」,确认所有 Claude 相关进程都消失后再重新打开软件。

###### 第二步:重新开启开发者模式

1. 打开 Claude 后,
  先不要登录账号
  (登录状态会隐藏部分菜单)
2. 点击顶部菜单栏
  Help
  →
  Troubleshooting
3. 点击
  Enable Developer Mode
  (如果显示的是
  Disable Developer Mode
  ,说明之前已经开过,先关掉再开一次)
4. Claude 会自动重启,重启后再看顶部菜单有没有 Developer

###### 第三步:还是没有?试这两招

**1. 检查 Claude 版本** · 部分老版本不支持开发者模式,在 `Help → About` 看一下版本号,低于 1.5 的建议重新下载最新版。

**2. 快捷键强制打开开发者控制台** · 如果菜单被隐藏了,可以用快捷键直接唤起:

1. Windows / Linux:
  Ctrl + Shift + Alt + I
2. Mac:
  Cmd + Shift + Option + I

打开控制台后,在底部输入框里粘贴这行代码并回车,可以直接跳转到第三方配置页面:

```js
window.location.href = 'claude://settings/third-party-inference'
```

点了 Apply locally 没反应,重启后还是登录页

先检查是不是**真的完全退出了客户端**。Windows 看一下系统托盘(右下角),把 Claude 图标右键退出;Mac 用 `Cmd + Q` 退出,不是关窗口。退干净再打开,登录页就会出现「Continue with local gateway」按钮。

提示 401 Unauthorized / Invalid API key

API Key 复制错了。常见原因:**前后多了空格、少复制了字符、粘贴时被截断**。回中转站后台重新复制一次,粘贴后用键盘左右键扫一遍确认没有多余字符。

提示 Connection refused / ECONNREFUSED

Base URL 写错了。检查三点:**协议必须是 https(不是 http)、末尾不要加斜杠、域名拼写正确**。本教程示例是 `https://b.pandatoken.net`,以中转站后台显示为准。

请求超时 / 长时间没响应

本地代理软件(Clash、V2Ray 等)在干扰桌面端的网络请求。如果用的是国内中转站,**直接关掉代理软件**,或者在代理规则里把中转站域名加到直连白名单。

不小心登录了官方账号,现在配第三方没入口

在客户端里先登出(头像 → Sign out),完全退出客户端,重新打开。如果还是不行,卸载客户端后**同时清掉用户配置目录**再重装:

1. Windows:
  %APPDATA%\Claude
2. Mac:
  ~/Library/Application Support/Claude

模型切换里看不到 Opus 4.7

看一下熊猫算力后台是否给你的 Key **开通了 Opus 4.7 渠道**。中转站不一定上架了所有 Anthropic 最新模型,以渠道列表为准。如果后台已经开通但客户端里仍然不显示,完全退出客户端重启一次,模型列表会刷新。
