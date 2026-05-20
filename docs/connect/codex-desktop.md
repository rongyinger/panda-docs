---
title: Codex 桌面版接入熊猫算力 · 完整教程
date: 2026-05-19
category: 拓展连接
tags: [Codex, 桌面版, 教程]
---

熊猫算力 · 接入指南

## Codex 桌面版接入熊猫算力 不登 OpenAI 账号,走国内中转直连 GPT

Codex 桌面版没有图形化配置入口,接中转站要改两个本地文件——`config.toml` 和 `auth.json`。改对了就能跑通,改错一个字符就连不上。本教程把每一步、每一行配置、每一个易错点都拆开讲清楚,Windows 为主,Mac 路径同步给出。

适用系统

Windows · macOS

耗时

约 10 分钟

难度

★★☆☆☆

需要终端基础

否

为什么这么做 · Why

### 不登 ChatGPT 账号,*也能用上 Codex*

官方账号路径要 ChatGPT Plus 订阅、要海外支付、还要稳定的网络。改成走熊猫算力的 OpenAI 兼容入口之后,这三个问题一起解决——**用一个 sk- 开头的 Key,直接对接 Codex 桌面端**,可以选 `gpt-5.3-codex` 等模型(以中转站后台开通的为准)。

🇨🇳

##### 国内可直连

熊猫算力网关部署在国内,日常对话不需要科学上网,链路稳定。

🔑

##### 一个 Key 一站式

同一个熊猫算力账号可以同时给 Claude Desktop 和 Codex 用,额度统一管理。

📂

##### 本地项目体验完整

Codex 的核心价值是能读项目目录、改文件、跑命令,这些功能走中转后完全不受影响。

### 开始前,准备这四样

✓

##### 科学上网工具(仅下载阶段用)

访问 `openai.com/codex` 在国内无法直连,需要科学上网才能下载安装包。**Clash、V2Ray** 任选一个,装好客户端就可以关掉了——后续对话走熊猫算力,不再依赖代理。

✓

##### 熊猫算力账号 & API Key

登录 `b.pandatoken.net`,进入「控制台 → 令牌管理」,创建一个新令牌,得到 `sk-` 开头的字符串。**同一个 Key 同时支持 OpenAI 和 Claude 两套接口**,Codex 这边用的就是这同一个 Key。

✓

##### Codex 桌面客户端安装包

从 `openai.com/codex` 下载对应系统版本。Windows 是 **Codex Installer.exe**,Mac 是 `.dmg` 文件。

✓

##### 中转站的 Base URL

熊猫算力的接入地址是 `https://b.pandatoken.net/v1`。**末尾的 /v1 不能丢**——这是最常见的踩坑点之一。

STEP 01

DOWNLOAD

### 下载并安装 Codex 桌面版

开启科学上网,访问 **openai.com/codex**,根据系统选对应安装包。Windows 下载下来是 **Codex Installer.exe**,双击运行,会走系统自带商店的安装/更新逻辑。安装完成后**先不要登录任何账号**——直接关掉客户端,我们接下来要改配置文件。

![Codex Installer.exe 下载弹窗](/images/connect/codex-desktop-01.jpg)

浏览器下载完成提示 · 安装包名称 Codex Installer.exe

提示

· Mac 用户首次启动可能会被 Gatekeeper 拦截,在「系统设置 → 隐私与安全性」里允许即可。

STEP 02

GET API KEY

### 在熊猫算力后台拿到 *API Key*

登录 `b.pandatoken.net`,进入**「控制台 → 令牌管理」**。如果还没创建过令牌,点「添加令牌」新建一个;如果已有,直接点密钥列的复制按钮拿到完整 Key。**得到一个 `sk-` 开头的字符串**,保管好,稍后要用。

![熊猫算力后台令牌管理页](/images/connect/codex-desktop-02.jpg)

熊猫算力后台 · 控制台 → 令牌管理 · 复制 sk- 开头的密钥

关于 Key 的复用

· 熊猫算力的 Key 同时支持 OpenAI 和 Anthropic 两套接口协议,客户端走哪边由 Base URL 决定。所以这同一个 Key,既可以给 Claude Desktop 用,也可以给 Codex 用,额度共用一份。

STEP 03

LOCATE CONFIG DIR

### 打开 *Codex 配置目录*

Codex 启动时会读取用户目录下的 `.codex` 文件夹。**先彻底退出 Codex**(系统托盘里也要退干净),然后按下表打开配置目录:

WINDOWS

##### 地址栏粘贴并回车

%USERPROFILE%\.codex

或者打开「此电脑」,在地址栏粘贴这行。如果 .codex 文件夹不存在,新建一个即可(注意点号开头)。

MACOS

##### Finder 前往文件夹

~/.codex

Finder 按 `⌘+Shift+G`,粘贴路径后回车。或终端 `mkdir -p ~/.codex && open ~/.codex`。

如果 Codex 启动过一次,目录里会有一堆自动生成的文件(`.codex-global-state.json`、`history.jsonl`、`logs_2.sqlite` 等),这些不用管。我们要操作的只有两个文件:**`auth.json`** 和 **`config.toml`**。

![.codex 目录里的文件结构](/images/connect/codex-desktop-03.jpg)

.codex 目录结构 · 重点关注被框出的 auth.json 和 config.toml

看不到 .codex 文件夹?

· 点号开头的文件夹默认是隐藏的。Windows 文件管理器顶部「查看 → 显示 → 隐藏的项目」勾选;Mac 在 Finder 里按

⌘+Shift+.

切换显示隐藏文件。

STEP 04

EDIT auth.json

### 编辑 *auth.json*,填入 API Key

`auth.json` 用来存放认证信息。在 `.codex` 目录下新建这个文件(已有就直接编辑),用记事本或 VS Code 打开,粘贴下面的内容,把 Key 换成你自己刚才复制的:

~/.codex/auth.json

```json
{
  "OPENAI_API_KEY": "sk-你的熊猫算力Key"
}
```

![auth.json 在记事本里打开,Key 部分打码](/images/connect/codex-desktop-04.jpg)

auth.json 内容示例 · 单行 JSON 格式,只有一个键值对

三个常见坑

① 这里的 Key

不是 OpenAI 官方 Key

,是熊猫算力后台生成的

sk-

开头中转 Key

② Key 前后不要有

空格、引号嵌套或换行

③ JSON 格式严格,逗号、引号都要用

英文半角

,不要用中文标点

STEP 05

EDIT config.toml

### 编辑 *config.toml*,指定模型和网关

在 `.codex` 目录下新建 `config.toml` 文件(已存在就编辑),粘贴下面的内容。**这是经过实测可用的最小配置**,三段都不能少:

~/.codex/config.toml

```toml
# ---------- 全局核心(必须)----------
model_provider = "Pandaapi"
model = "gpt-5.3-codex"
preferred_auth_method = "apikey"

# ---------- 第三方中转(必须)----------
[model_providers.Pandaapi]
name = "Pandaapi"
type = "openai"
base_url = "https://b.pandatoken.net/v1"
wire_api = "responses"
requires_openai_auth = false

# ---------- 至少一个信任目录(必须)----------
[projects.'c:\users\你的用户名\工作目录']
trust_level = "trusted"
```

#### 关键字段说明

model_provider

指定使用哪个 provider · 名称要和下面

[model_providers.xxx]

段落对得上。本例都叫

Pandaapi

,你也可以改成任意名字,但两处要完全一致(注意大小写)。

model

默认调用的模型 · 这里用

gpt-5.3-codex

。你也可以改成

gpt-5.4

等熊猫算力后台开通的模型,具体看「模型广场」页。

preferred_auth_method

认证方式 · 设为

"apikey"

,告诉 Codex 用 API Key 而不是 ChatGPT 账号登录。

type

provider 协议类型 · 必须是

"openai"

(OpenAI 兼容)。

base_url

最关键的字段

· 熊猫算力接入地址

https://b.pandatoken.net/v1

。

末尾 /v1 不能丢

,错一个斜杠都连不上。

wire_api

通信协议 · Codex 桌面版必须用

"responses"

(Responses API),不是 Chat Completions。

requires_openai_auth

第三方 provider 设为

false

· 这个字段只对 OpenAI 官方接口有意义,走中转时关掉它,避免认证逻辑冲突。

[projects.'路径']

信任目录 ·

至少要有一个

,否则 Codex 不会让你在该目录下执行操作。把你的常用项目目录写进来,路径要用

单引号

包裹,反斜杠原样写。

![config.toml 在记事本里打开,显示完整配置](/images/connect/codex-desktop-05.jpg)

config.toml 实测可用配置 · 三个 section 一个都不能少

TOML 格式提醒

· 字符串两边要用

英文双引号

"..."

,布尔值是

true / false

不带引号。

[model_providers.xxx]

和

[projects.'...']

是节(section)标记,前面不能有缩进。

STEP 06

LAUNCH & VERIFY

### 重启 Codex,*验证连通*

两个文件保存好之后,**确认 Codex 完全退出**——Windows 看一下系统托盘把 Codex 退干净,Mac 用 `⌘+Q` 而不是关窗口。然后重新启动 Codex 桌面版,进入主界面,新建对话或选项目,发一句「你好」测试。

1

右下角模型标识

· 输入框右下角应该显示

Pandaapi

配合一个模型选择(如

5.5 中

)。看到 Pandaapi 字样就说明配置生效了。

2

正常返回回复

· 发送「你好」后,Codex 应该秒回类似「你好,有什么我可以帮你的吗?」的回复。

3

熊猫算力后台有日志

· 在熊猫算力后台「使用日志」页能看到这次调用的记录,模型名、token 用量一目了然。

![Codex 主界面成功对话,右下角显示 Pandaapi](/images/connect/codex-desktop-06.jpg)

Codex 主界面连通成功 · 右下角 Pandaapi 模型标识 · 对话正常往返

成功了

· 此时 Codex 已经完全走熊猫算力网关。同一个 Key 也可以同步给 Claude Desktop 用(改 Base URL 为 Anthropic 兼容入口即可),两边共用一份额度。

### 常见问题

配置文件类问题最多,按提示信息对号入座

Codex 启动后还是走官方接口,没用我配的中转

三步排查:

1. 确认 Codex
  完全退出后再启动
  。Windows 任务管理器搜
  Codex
  全部结束;Mac 用
  ⌘+Q
  或终端
  killall Codex
  。
2. 确认两个文件
  放在了正确目录
  · Windows 是
  %USERPROFILE%\.codex\
  ,Mac 是
  ~/.codex/
  。点号开头不能漏。
3. 检查
  config.toml
  里
  model_provider = "Pandaapi"
  和
  [model_providers.Pandaapi]
  的名字
  完全一致
  (包括大小写)。错一个字母就匹配不上,Codex 会 fallback 到默认 provider。

提示 401 Unauthorized / 认证失败

Key 没读对。检查三处:

1. auth.json
  里的 Key 是不是
  熊猫算力后台的密钥
  (不是登录密码、不是别的站点的 Key)。
2. Key 前后
  不要有空格或换行
  ,引号要用英文半角双引号。
3. config.toml
  里
  preferred_auth_method = "apikey"
  没漏。漏了 Codex 不会去读 auth.json。

提示 model not found / 模型不存在

两个原因:

1. config.toml
  里
  model = "xxx"
  写的模型名,
  熊猫算力后台没开通这个渠道
  。去熊猫算力「模型广场」看一下当前可用模型列表,选一个开通了的。
2. 模型名拼写错误。注意横杠、点号位置,例如
  gpt-5.3-codex
  不要写成
  gpt5.3-codex
  。

提示 Connection refused / 超时 / 无法连接

检查三点:

1. base_url
  协议
  必须是 https
  ,域名拼写正确,
  末尾的 /v1 不能丢
  。完整地址:
  https://b.pandatoken.net/v1
  。
2. 本地代理软件(Clash、V2Ray)在干扰。
  关掉代理软件
  ,或把
  b.pandatoken.net
  加到代理的直连白名单。
3. 用浏览器打开
  https://b.pandatoken.net
  看看能不能访问。能打开说明网络通,问题在配置;打不开就先解决网络。

提示 TOML parse error / 配置文件解析失败

TOML 格式错了。最常见的四种:

1. 字符串没加引号,或者用了
  中文引号
  (
  "..."
  而不是
  "..."
  )。
2. 布尔值加了引号 · 应该是
  false
  不是
  "false"
  。
3. 用了 Windows 记事本默认保存,带了
  UTF-8 BOM
  。改用 VS Code 或 Notepad++ 另存为「无 BOM 的 UTF-8」。
4. [model_providers.xxx]
  或
  [projects.'...']
  节标记前有空格 · 必须顶格写。

提示项目目录未授权 / 不能在此目录执行操作

`config.toml` 里的 `[projects.'...']` 段路径写错了,或者没写当前项目目录。

路径要**用单引号包裹**,反斜杠原样写,例如:

```bash
[projects.'c:\users\xiaoying\projects']
trust_level = "trusted"
```

如果有多个常用项目目录,可以加多个 `[projects.'...']` 段。

改对了,但中转站后台看不到调用记录

调用其实没发到中转站,Codex 还在用旧配置或官方接口。**必须完全退出 Codex 后再启动**——不重启的话内存里加载的还是旧配置。Windows 系统托盘里的 Codex 图标也要右键退出干净。

改完配置无法保存(权限不足)

Windows 上有时 `%USERPROFILE%\.codex\` 因为 Codex 在写入,文件被锁。**先彻底退出 Codex**(系统托盘也要退干净),再编辑配置。如果还提示权限不足,右键 .codex 文件夹 → 属性 → 安全 → 编辑,给当前用户加上「完全控制」权限。
