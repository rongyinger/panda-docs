import { defineConfig } from 'vitepress'

// 生产构建时 Vite 自动将 NODE_ENV 设为 production
const base = process.env.NODE_ENV === 'production' ? '/panda-docs/' : '/'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '熊猫知识中心',
  description: '熊猫算力平台官方知识库',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#22c55e' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '熊猫知识中心' }],
    ['meta', { property: 'og:description', content: '熊猫算力平台官方知识库' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '熊猫知识中心',

    // ── 顶部导航栏 ─────────────────────────────────────────────
    nav: [
      { text: '首页', link: '/' },
      { text: '使用教程', link: '/guide/' },
      { text: '拓展连接', link: '/connect/' },
      { text: '常见问题', link: '/faq/' },
      { text: 'AI 知识分享', link: '/ai-knowledge/' },
      { text: '技巧分享', link: '/tips/' },
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
            { text: '教程总览', link: '/guide/' },
            { text: '快速开始', link: '/guide/quickstart' },
            // 新增教程：{ text: '标题', link: '/guide/文件名' }
          ],
        },
      ],
      '/connect/': [
        {
          text: '拓展连接',
          items: [
            { text: '连接总览', link: '/connect/' },
            { text: '连接 ComfyUI', link: '/connect/comfyui' },
            // 新增连接教程：{ text: '标题', link: '/connect/文件名' }
          ],
        },
      ],
      '/faq/': [
        {
          text: '常见问题',
          items: [
            { text: '问题总览', link: '/faq/' },
            { text: '显存不足导致任务失败怎么办？', link: '/faq/vram-issue' },
            // 新增 FAQ：{ text: '问题标题', link: '/faq/文件名' }
          ],
        },
      ],
      '/ai-knowledge/': [
        {
          text: 'AI 知识分享',
          items: [
            { text: '知识总览', link: '/ai-knowledge/' },
            { text: 'Transformer 架构详解', link: '/ai-knowledge/transformer' },
            // 新增知识文章：{ text: '标题', link: '/ai-knowledge/文件名' }
          ],
        },
      ],
      '/tips/': [
        {
          text: '技巧分享',
          items: [
            { text: '技巧总览', link: '/tips/' },
            { text: 'Prompt Engineering 技巧大全', link: '/tips/prompt-engineering' },
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
            buttonText: '搜索',
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pandatoken' },
    ],

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
