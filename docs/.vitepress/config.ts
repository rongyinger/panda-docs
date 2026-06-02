import { defineConfig } from 'vitepress'

// 部署路径（base）解析优先级：
//   1. DOCS_BASE 环境变量（GitLab CI 设为 "/docs/" → pandatoken.com/docs）
//   2. 生产构建默认 "/panda-docs/"（GitHub Pages，Vite 自动设 NODE_ENV=production）
//   3. 本地开发 "/"
// 注意：base 必须以 "/" 开头和结尾。
const base =
  process.env.DOCS_BASE ||
  (process.env.NODE_ENV === 'production' ? '/panda-docs/' : '/')

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '熊猫知识中心',
  description: '熊猫算力官方知识库',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#16A34A' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '熊猫知识中心' }],
    ['meta', { property: 'og:description', content: '熊猫算力官方知识库' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '熊猫知识中心',

    // ── 顶部导航栏 ─────────────────────────────────────────────
    nav: [
      { text: '首页', link: '/' },
      { text: '使用教程', link: '/guide/platform-quickstart' },
      { text: '拓展链接', link: '/connect/chatbox' },
      { text: '常见问题', link: '/faq/personal/' },
      { text: 'AI 知识分享', link: '/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi' },
      { text: '技巧分享', link: '/tips/openwolf-claude-code-memory' },
    ],

    // ── 侧边栏 ─────────────────────────────────────────────────
    // 新增文章：
    //   1. 在对应目录新建 xxx.md（写好 frontmatter title）
    //   2. 在下方对应数组的 items 中追加：
    //      { text: '显示标题', link: '/目录/文件名' }（不含 .md）
    // ──────────────────────────────────────────────────────────
    sidebar: {
      '/guide/': [
        {
          text: '使用教程',
          items: [
            { text: '熊猫算力快速上手指南（12 步）', link: '/guide/platform-quickstart' },
            // 新增教程：{ text: '标题', link: '/guide/文件名' }
          ],
        },
      ],
      '/connect/': [
        {
          text: '编辑器与 IDE',
          items: [
            { text: '连接 Cursor', link: '/connect/cursor' },
            { text: '连接 Claude Code', link: '/connect/claude-code' },
            { text: '连接 Codex 桌面版', link: '/connect/codex-desktop' },
            { text: '连接 Claude 桌面版', link: '/connect/claude-desktop' },
            { text: '连接 Cline', link: '/connect/cline' },
            { text: '连接 Windsurf', link: '/connect/windsurf' },
            { text: '连接 Zed', link: '/connect/zed' },
            { text: '连接 Continue.dev', link: '/connect/continue-dev' },
          ],
        },
        {
          text: '应用与框架',
          items: [
            { text: '连接 Chatbox', link: '/connect/chatbox' },
            { text: '连接 Cherry Studio', link: '/connect/cherry-studio' },
            { text: '连接 Dify', link: '/connect/dify' },
            { text: '连接 NextChat', link: '/connect/nextchat' },
            { text: '连接 OpenClaw', link: '/connect/openclaw' },
            { text: '连接 Open WebUI', link: '/connect/open-webui' },
            { text: '连接 Lobe Chat', link: '/connect/lobe-chat' },
            { text: '连接 AnythingLLM', link: '/connect/anythingllm' },
            { text: '连接 n8n', link: '/connect/n8n' },
            { text: '连接 Coze', link: '/connect/coze' },
            { text: '连接 FastGPT', link: '/connect/fastgpt' },
            { text: 'LangChain 接入教程', link: '/connect/langchain' },
            { text: 'LlamaIndex 接入教程', link: '/connect/llamaindex' },
            { text: 'Spring AI 接入教程', link: '/connect/spring-ai' },
          ],
        },
      ],
      '/faq/': [
        {
          text: '常见问题',
          items: [
            { text: '个人用户 FAQ', link: '/faq/personal/' },
            { text: '为什么响应速度比官方 API 慢？', link: '/faq/personal/why-slower-than-official' },
            { text: '企业用户 FAQ', link: '/faq/enterprise/' },
          ],
        },
        {
          text: '新手入门',
          items: [
            { text: '如何注册账号？', link: '/faq/how-to-register' },
            { text: '怎么创建和管理 API Key？', link: '/faq/how-to-create-apikey' },
            { text: '充值了但余额没到账', link: '/faq/recharge-not-arrived' },
            { text: '怎么查看余额和用量？', link: '/faq/check-balance' },
            { text: '个人端和企业端有什么区别？', link: '/faq/which-endpoint' },
            { text: '直接用官方 API 和熊猫算力有什么区别？', link: '/faq/compare-direct-vs-panda' },
          ],
        },
        {
          text: '接入教程',
          items: [
            { text: 'Cursor 接入熊猫算力', link: '/faq/cursor-setup' },
            { text: 'Claude Code 接入熊猫算力', link: '/faq/claude-code-setup' },
            { text: 'Python 快速上手', link: '/faq/python-quickstart' },
            { text: 'Node.js 快速上手', link: '/faq/nodejs-quickstart' },
          ],
        },
        {
          text: '报错处理',
          items: [
            { text: '401 Unauthorized', link: '/faq/401-unauthorized' },
            { text: '403 Forbidden', link: '/faq/403-forbidden' },
            { text: '429 Too Many Requests', link: '/faq/429-too-many-requests' },
            { text: '500 Internal Server Error', link: '/faq/500-internal-server-error' },
            { text: 'context_length_exceeded', link: '/faq/context-length-exceeded' },
          ],
        },
        {
          text: '使用问题',
          items: [
            { text: '模型响应为什么慢？', link: '/faq/slow-response' },
            { text: 'Token 消耗为什么这么快？', link: '/faq/token-consumption-high' },
            { text: '不同客户端效果为什么不一样？', link: '/faq/different-clients-different-results' },
            { text: '为什么每次回答都不一样？', link: '/faq/unstable-model-output' },
            { text: '怎么实现多轮对话？', link: '/faq/multi-turn-conversation' },
            { text: '怎么让模型稳定输出 JSON？', link: '/faq/json-output' },
            { text: '怎么让模型分析 PDF？', link: '/faq/pdf-analysis' },
            { text: 'temperature 等参数怎么设置？', link: '/faq/temperature-params' },
            { text: '各模型最大上下文是多少？', link: '/faq/model-context-window' },
          ],
        },
        {
          text: '费用与发票',
          items: [
            { text: '怎么开发票？', link: '/faq/invoice' },
          ],
        },
        {
          text: '开发者进阶',
          items: [
            { text: 'API 调用失败怎么自动重试？', link: '/faq/retry-strategy' },
            { text: '怎么控制并发和请求频率？', link: '/faq/rate-limit-concurrent' },
            { text: 'System Prompt 怎么写效果最好？', link: '/faq/system-prompt-best-practice' },
          ],
        },
        {
          text: '服务说明',
          items: [
            { text: '支持哪些模型？怎么选？', link: '/faq/supported-models' },
          ],
        },
      ],
      '/ai-knowledge/': [
        {
          text: 'AI 知识分享',
          items: [
            { text: '2026 AI 应用学习路线图：工具 + 提示词 + 资源一文打包', link: '/ai-knowledge/ai-learning-roadmap-2026' },
            { text: 'Claude Opus 4.8 深度点评：更诚实的旗舰，Agent 时代的新基准', link: '/ai-knowledge/claude-opus-4-8-review' },
            { text: '横评 DeepSeek、Claude、GPT、Kimi', link: '/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi' },
            { text: '文献综述哪家强：五模型引用核查实测', link: '/ai-knowledge/literature-review-model-comparison' },
            { text: 'AI 补贴时代落幕，渠道商黄金时期到来', link: '/ai-knowledge/ai-subsidy-era-channel-opportunity' },
            // 新增知识文章：{ text: '标题', link: '/ai-knowledge/文件名' }
          ],
        },
      ],
      '/tips/': [
        {
          text: '技巧分享',
          items: [
            { text: 'Claude Code 省 Token 实战：7 个技巧把成本砍掉一半', link: '/tips/claude-code-save-token' },
            { text: 'Claude Code 用量监控工具全攻略：再也不怕 Token 不知不觉耗光', link: '/tips/claude-code-token-monitor' },
            { text: '字节跳动开源 OpenViking：用文件系统范式重构 AI Agent 记忆中枢', link: '/tips/openviking-agent-memory-system' },
            { text: '省 80% Token！给 Claude Code 装「第二大脑」', link: '/tips/openwolf-claude-code-memory' },
            { text: '省 Token 终极指南：10 个技巧降低 50%-80% 费用', link: '/tips/save-token-ultimate-guide' },
            // 新增技巧文章：{ text: '标题', link: '/tips/文件名' }
          ],
        },
      ],
    },

    // ── 本地搜索（中文化）──────────────────────────────────────
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档...',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '未找到相关内容',
            resetButtonTitle: '清除搜索条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    // ── 右侧目录大纲 ───────────────────────────────────────────
    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    // ── 上下翻页 ──────────────────────────────────────────────
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    // ── 最后更新时间 ───────────────────────────────────────────
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short' },
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },

  markdown: {
    lineNumbers: true,
  },
})
