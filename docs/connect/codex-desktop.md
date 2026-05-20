---
title: Codex 桌面版接入熊猫算力 · 完整教程
date: 2026-05-19
category: 拓展连接
tags: [Codex, 桌面版, 接入教程, 开发者]
---

# Codex 桌面版接入熊猫算力 · 完整教程

Codex 桌面版没有图形化的 API 配置入口，需要手动改 `auth.json` 和 `config.toml`。只要把两个文件配对好，就能通过熊猫算力的 OpenAI 兼容网关直连 GPT。

**预计用时：10 分钟 · 推荐人群：开发者 · 支持平台：Windows / macOS**

---

## 什么是 Codex 桌面版？

Codex 桌面版是 OpenAI 的桌面编程助手，可以读项目、改文件、跑命令。接入熊猫算力后，不需要登录 OpenAI 账号，也能直接使用中转的模型接口。

::: tip 提前说明
本教程以 Windows 为主，macOS 只是在路径上不同，配置逻辑是一样的。
:::

---

## Step 01：准备安装包

### 1. 下载 Codex 桌面客户端

前往 OpenAI 官方下载页，获取对应系统的安装包。Windows 一般是 `Codex Installer.exe`，macOS 是 `.dmg` 文件。

![Codex Installer.exe 下载弹窗](/images/connect/codex-desktop-01.jpg)

### 2. 安装后先不要登录

安装完成后直接退出客户端，不要先登录任何账号。Codex 之后是否走中转，主要取决于本地配置文件。

::: warning 注意
第一次启动时如果遇到系统拦截，先放行安装，不要急着登录。
:::

---

## Step 02：获取熊猫算力 API Key

### 1. 登录熊猫算力后台

进入控制台的令牌管理页面，新建一个以 `sk-` 开头的 API Key。

### 2. 记住这把 Key 的用途

同一个 Key 可以同时给 Claude Desktop 和 Codex 使用，额度统一走熊猫算力后台管理。

![熊猫算力后台令牌管理页](/images/connect/codex-desktop-02.jpg)

---

## Step 03：找到 `.codex` 配置目录

### 1. 打开配置目录

Codex 会读取用户目录下的 `.codex` 文件夹。

| 平台 | 路径 |
|---|---|
| Windows | `%USERPROFILE%\.codex` |
| macOS | `~/.codex` |

### 2. 确认两个文件

目录里主要只需要处理这两个文件：

- `auth.json`
- `config.toml`

![.codex 目录里的文件结构](/images/connect/codex-desktop-03.jpg)

::: tip 找不到目录
`.codex` 是点号开头的隐藏目录。Windows 需要开启“显示隐藏的项目”，macOS 需要显示隐藏文件。
:::

---

## Step 04：编辑 `auth.json`

### 1. 写入 API Key

在 `.codex` 目录下新建或编辑 `auth.json`，内容如下：

```json
{
  "OPENAI_API_KEY": "sk-你的熊猫算力Key"
}
```

![auth.json 在记事本里打开,Key 部分打码](/images/connect/codex-desktop-04.jpg)

### 2. 常见错误

- Key 不是 OpenAI 官方 Key，而是熊猫算力后台生成的 `sk-` 开头密钥
- Key 前后不要多空格、换行
- JSON 必须使用英文半角引号

---

## Step 05：编辑 `config.toml`

### 1. 写入最小可用配置

把下面内容粘贴到 `config.toml`：

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

![config.toml 在记事本里打开,显示完整配置](/images/connect/codex-desktop-05.jpg)

### 2. 配置含义

| 字段 | 作用 |
|---|---|
| `model_provider` | 指定使用哪个 provider，必须和下面的 section 名一致 |
| `model` | 默认模型名，例如 `gpt-5.3-codex` |
| `preferred_auth_method` | 设为 `apikey`，让 Codex 读取本地 Key |
| `base_url` | 熊猫算力的 OpenAI 兼容入口，末尾 `/v1` 不能少 |
| `wire_api` | Codex 桌面版必须使用 `responses` |
| `trust_level` | 至少要有一个信任目录，否则 Codex 不会执行目录内操作 |

::: warning 格式提醒
`config.toml` 里字符串要用英文双引号，布尔值写 `true / false`，section 标记前不能缩进。
:::

---

## Step 06：重启并验证

### 1. 完全退出 Codex

Windows 右下角系统托盘里把 Codex 退干净，macOS 用 `⌘+Q` 完全退出。

### 2. 重新打开并测试

启动后新建一个对话，发一句“你好”。如果右下角显示 `Pandaapi`，并且能正常返回回复，就说明接入成功。

![Codex 主界面成功对话,右下角显示 Pandaapi](/images/connect/codex-desktop-06.jpg)

### 3. 成功标志

1. 输入框右下角出现 `Pandaapi`
2. 对话可以正常返回
3. 熊猫算力后台能看到调用日志

---

## 常见问题

### 1. 还是走官方接口

先完全退出 Codex，再重新打开。然后检查 `config.toml` 里的 `model_provider = "Pandaapi"` 和 `[model_providers.Pandaapi]` 是否完全一致。

### 2. 401 Unauthorized

检查 `auth.json` 里的 Key 是否复制正确，前后有没有空格，`preferred_auth_method` 是否写成了 `apikey`.

### 3. model not found

检查模型名是否写错，例如 `gpt-5.3-codex` 不要写成 `gpt5.3-codex`，同时确认熊猫算力后台已经开通这个模型。

### 4. Connection refused / 超时

确认 `base_url` 是 `https://b.pandatoken.net/v1`，并检查本地代理是否干扰了请求。

### 5. TOML parse error

最常见原因是：

- 字符串没加英文引号
- 布尔值被写成了字符串
- section 前面有缩进
- 文件被错误地保存成了带 BOM 的编码

---

配置完成后，Codex 就会通过熊猫算力网关运行。后续如果你还想把 Claude Desktop 也接进去，可以直接用同一把 Key。
