import { defineConfig } from 'vitepress'

// 通过环境变量控制 base 路径，方便本地开发与 GitHub Pages 子路径切换
// 本地开发：直接 pnpm dev（base 默认为 /）
// GitHub Pages：在 deploy.yml 中设置 VITE_BASE=/仓库名/
const base = (process.env.VITE_BASE as string) ?? '/'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: '熊猫算力知识中心',
  description: '一站式 AI 模型聚合平台 · 文档、教程与解答',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#00d4ff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '熊猫算力知识中心' }],
    ['meta', { property: 'og:description', content: '一站式 AI 模型聚合平台 · 文档、教程与解答' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '熊猫算力',

    // ── 顶部导航栏 ──────────────────────────────────────────────
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/' },
      {
        text: 'FAQ',
        items: [
          { text: '个人用户', link: '/faq/personal/' },
          { text: '企业用户', link: '/faq/enterprise/' },
        ],
      },
      { text: 'API', link: '/api/' },
      { text: '模型', link: '/models/' },
      { text: '博客', link: '/blog/' },
      { text: '更新日志', link: '/changelog/' },
    ],

    // ── 侧边栏 ──────────────────────────────────────────────────
    // 新增文章方法：
    //   1. 在对应目录新建 xxx.md 文件（frontmatter 写好 title）
    //   2. 在下方对应数组的 items 中追加一行：
    //      { text: '显示标题', link: '/目录/文件名' }
    //      链接路径不含 .md 后缀，从 /docs 根目录开始
    // ────────────────────────────────────────────────────────────
    sidebar: {
      '/guide/': [
        {
          text: '平台入门',
          items: [
            { text: '平台介绍', link: '/guide/' },
            // 新增入门文章：{ text: '标题', link: '/guide/文件名' }
          ],
        },
      ],

      '/faq/': [
        {
          text: '个人用户 FAQ',
          collapsed: false,
          items: [
            { text: '个人版总览', link: '/faq/personal/' },
            { text: '为什么响应比官方慢？', link: '/faq/personal/why-slower-than-official' },
            // 新增个人 FAQ：{ text: '问题标题', link: '/faq/personal/文件名' }
          ],
        },
        {
          text: '企业用户 FAQ',
          collapsed: false,
          items: [
            { text: '企业版总览', link: '/faq/enterprise/' },
            // 新增企业 FAQ：{ text: '问题标题', link: '/faq/enterprise/文件名' }
          ],
        },
      ],

      '/api/': [
        {
          text: 'API 文档',
          items: [
            { text: '接入概述', link: '/api/' },
            { text: '快速开始', link: '/api/quickstart' },
            // 新增 API 文档：{ text: '标题', link: '/api/文件名' }
          ],
        },
      ],

      '/models/': [
        {
          text: '模型说明',
          items: [
            { text: '模型总览', link: '/models/' },
            // 新增模型文章：{ text: '标题', link: '/models/文件名' }
          ],
        },
      ],

      '/blog/': [
        {
          text: '技术博客',
          items: [
            { text: '文章列表', link: '/blog/' },
            { text: '如何选择合适的 AI 模型', link: '/blog/how-to-choose-model' },
            // 新增博客文章：{ text: '文章标题', link: '/blog/文件名' }
          ],
        },
      ],

      '/changelog/': [
        {
          text: '更新日志',
          items: [
            { text: '全部日志', link: '/changelog/' },
            { text: '2026 年 5 月', link: '/changelog/2026-05' },
            // 新增更新日志：{ text: 'YYYY 年 M 月', link: '/changelog/YYYY-MM' }
          ],
        },
      ],
    },

    // ── 本地搜索（中文化）───────────────────────────────────────
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
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

    // ── 右侧目录大纲 ─────────────────────────────────────────────
    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    // ── 上下翻页 ─────────────────────────────────────────────────
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    // ── 最后更新时间 ──────────────────────────────────────────────
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    // ── 页脚 ─────────────────────────────────────────────────────
    footer: {
      message: '备案号：沪ICP备XXXXXXXX号',
      copyright: 'Copyright © 2024–2025 熊猫算力 · support@pandatoken.com',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pandatoken' },
    ],

    // 移动端文案
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },

  markdown: {
    lineNumbers: true,
    // 代码块右上角复制按钮默认已启用
  },
})
