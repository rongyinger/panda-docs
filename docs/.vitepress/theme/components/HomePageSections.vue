<template>
  <div class="panda-home">
    <div class="bg-stage" aria-hidden="true">
      <div class="bg-base"></div>
      <div class="bamboo">
        <i class="stalk s1"><span></span><span></span></i>
        <i class="stalk s2"><span></span><span></span></i>
        <i class="stalk s3"><span></span><span></span></i>
        <i class="stalk s4"><span></span><span></span></i>
      </div>
      <div class="blob bg-mint"></div>
      <div class="blob bg-sky"></div>
      <div class="blob bg-lilac"></div>
    </div>

    <section class="hero">
      <div class="hero-deco" aria-hidden="true">
        <div class="hero-glow"></div>
        <div class="hero-grid"></div>
      </div>

      <div class="hero-inner">
        <div class="hero-badge"><span></span> 熊猫算力官方知识库</div>
        <h1>一站式 <em>AI 接入</em> 指南</h1>
        <p>从创建 API Key、工具接入到常见报错处理，帮你在最短路径里找到可执行的答案。</p>

        <form class="search-wrap" role="search" @submit.prevent="openSearch">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <input
            readonly
            type="search"
            placeholder="搜索 API Key、Cursor、429 报错..."
            @focus="openSearch"
          />
          <button type="submit">搜索</button>
        </form>

        <div class="quick-actions">
          <a class="quick-tag primary" :href="link('/guide/platform-quickstart')">新手上手</a>
          <a class="quick-tag" :href="link('/faq/personal/')">常见问题</a>
        </div>
      </div>
    </section>

    <main class="main">
      <section class="content-panel">
        <div class="section-head">
          <div>
            <span class="eyebrow">最近更新</span>
            <h2>精选内容</h2>
          </div>
          <a class="more-link" :href="link('/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi')">
            查看全部
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>

        <div class="article-list">
          <a
            v-for="article in articles"
            :key="article.title"
            class="article-item glass-card"
            :href="link(article.href)"
          >
            <span class="article-tag">{{ article.tag }}</span>
            <span class="article-title">{{ article.title }}</span>
            <span class="article-date">{{ article.date }}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18 15 12 9 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <aside class="sidebar">
        <section class="steps-card glass-card">
          <span class="eyebrow">快速使用</span>
          <h2>三步开始</h2>
          <p>从注册到第一次 API 调用，只保留最短路径。</p>

          <div class="steps">
            <a
              v-for="step in steps"
              :key="step.title"
              class="step"
              :href="link(step.href)"
            >
              <span class="step-num">{{ step.num }}</span>
              <span>
                <strong>{{ step.title }}</strong>
                <small>{{ step.desc }}</small>
              </span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 18 15 12 9 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </section>
      </aside>
    </main>

    <section class="category-section">
      <div class="category-head">
        <span class="eyebrow">分类浏览</span>
        <h2>按目标进入知识库</h2>
      </div>

      <div class="category-grid">
        <a
          v-for="category in categories"
          :key="category.name"
          class="category-card glass-card"
          :href="link(category.href)"
        >
          <span class="category-icon">{{ category.icon }}</span>
          <strong>{{ category.name }}</strong>
          <small>{{ category.desc }}</small>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

const link = (path: string) => withBase(path)

const articles = [
  {
    tag: '接入',
    title: 'Codex 桌面版接入熊猫算力 · 完整教程',
    date: '05-19',
    href: '/connect/codex-desktop',
  },
  {
    tag: '接入',
    title: 'Claude 桌面版接入熊猫算力 · 完整教程',
    date: '05-19',
    href: '/connect/claude-desktop',
  },
  {
    tag: '技巧',
    title: '字节跳动开源 OpenViking：重构 AI Agent 记忆中枢',
    date: '05-19',
    href: '/tips/openviking-agent-memory-system',
  },
  {
    tag: '知识',
    title: 'AI 补贴时代落幕，渠道商黄金时期到来',
    date: '05-18',
    href: '/ai-knowledge/ai-subsidy-era-channel-opportunity',
  },
  {
    tag: '接入',
    title: 'Cherry Studio 配置熊猫算力 API · 图文指南',
    date: '05-17',
    href: '/connect/cherry-studio',
  },
  {
    tag: '问题',
    title: '429 报错排查指南与解决方案',
    date: '05-16',
    href: '/faq/429-too-many-requests',
  },
]

const steps = [
  {
    num: '01',
    title: '注册并充值',
    desc: '创建账号，准备调用额度',
    href: '/faq/how-to-register',
  },
  {
    num: '02',
    title: '获取 API Key',
    desc: '创建密钥并安全保存',
    href: '/faq/how-to-create-apikey',
  },
  {
    num: '03',
    title: '接入工具调用',
    desc: '配置 Cursor、Chatbox 等客户端',
    href: '/connect/chatbox',
  },
]

const categories = [
  {
    icon: '01',
    name: '使用教程',
    desc: '快速理解平台与调用流程',
    href: '/guide/platform-quickstart',
  },
  {
    icon: '02',
    name: '拓展链接',
    desc: '常用工具和客户端接入',
    href: '/connect/chatbox',
  },
  {
    icon: '03',
    name: '常见问题',
    desc: '报错、费用、配置排查',
    href: '/faq/personal/',
  },
  {
    icon: '04',
    name: 'AI 知识分享',
    desc: '模型、行业与方法论',
    href: '/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi',
  },
  {
    icon: '05',
    name: '技巧分享',
    desc: '效率技巧和实践经验',
    href: '/tips/openwolf-claude-code-memory',
  },
  {
    icon: '06',
    name: '平台公告',
    desc: '更新记录与模型调整',
    href: '/changelog/2026-05',
  },
]

function openSearch() {
  const searchButton = document.querySelector<HTMLElement>(
    '.DocSearch-Button, .VPNavBarSearch button, .VPNavBarSearch .button',
  )

  if (searchButton) {
    searchButton.click()
  }
}
</script>

<style scoped>
:global(.VPDoc) {
  padding: 0 !important;
}

:global(.VPDoc .container),
:global(.VPDoc .content),
:global(.VPDoc .content-container) {
  max-width: none !important;
}

:global(.VPDoc .content) {
  padding: 0 !important;
}

.panda-home {
  --green: #16a34a;
  --green-dark: #065f46;
  --green-soft: #ecfdf3;
  --ink: #111827;
  --muted: #6b7280;
  --line: rgba(187, 247, 208, 0.72);
  position: relative;
  width: 100vw;
  min-height: calc(100vh - var(--vp-nav-height, 64px));
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
  color: var(--ink);
  background:
    linear-gradient(180deg, rgba(247, 251, 248, 0.96) 0%, #fff 44%, rgba(247, 250, 248, 0.98) 100%);
}

.bg-stage,
.hero-deco,
.hero-grid,
.hero-glow,
.bamboo,
.blob {
  pointer-events: none;
}

.bg-stage {
  position: fixed;
  inset: var(--vp-nav-height, 64px) 0 0;
  z-index: 0;
  overflow: hidden;
}

.bg-base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 10%, rgba(187, 247, 208, 0.42), transparent 24%),
    radial-gradient(circle at 88% 18%, rgba(134, 239, 172, 0.24), transparent 30%);
}

.bamboo {
  position: absolute;
  inset: 0;
  opacity: 0.22;
}

.stalk {
  position: absolute;
  bottom: -70px;
  display: block;
  width: 22px;
  height: 430px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(22, 163, 74, 0.1), rgba(6, 95, 70, 0.28), rgba(22, 163, 74, 0.08));
  box-shadow: inset 7px 0 18px rgba(255, 255, 255, 0.62);
  transform-origin: bottom;
}

.stalk::before,
.stalk::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(6, 95, 70, 0.28);
  box-shadow: 0 84px 0 rgba(6, 95, 70, 0.22), 0 168px 0 rgba(6, 95, 70, 0.2), 0 252px 0 rgba(6, 95, 70, 0.18);
}

.stalk span {
  position: absolute;
  width: 74px;
  height: 22px;
  border-radius: 90% 0;
  background: rgba(22, 163, 74, 0.18);
}

.stalk span:first-child {
  top: 78px;
  right: 15px;
  transform: rotate(-26deg);
}

.stalk span:last-child {
  top: 190px;
  left: 12px;
  transform: rotate(23deg) scaleX(-1);
}

.s1 { left: 7%; transform: rotate(-5deg); }
.s2 { right: 8%; height: 520px; transform: rotate(4deg); }
.s3 { left: 18%; height: 360px; transform: rotate(3deg); opacity: 0.7; }
.s4 { right: 22%; height: 330px; transform: rotate(-4deg); opacity: 0.55; }

.blob {
  position: absolute;
  border-radius: 999px;
  filter: blur(24px);
}

.bg-mint {
  right: 4%;
  top: 17%;
  width: 240px;
  height: 240px;
  background: rgba(187, 247, 208, 0.52);
}

.bg-sky {
  left: 10%;
  top: 42%;
  width: 200px;
  height: 200px;
  background: rgba(186, 230, 253, 0.22);
}

.bg-lilac {
  right: 18%;
  bottom: 10%;
  width: 180px;
  height: 180px;
  background: rgba(221, 214, 254, 0.2);
}

.hero {
  position: relative;
  z-index: 1;
  min-height: 430px;
  display: grid;
  place-items: center;
  padding: 70px 24px 44px;
}

.hero-inner {
  position: relative;
  width: min(960px, 100%);
  text-align: center;
}

.hero-glow {
  position: absolute;
  left: 50%;
  top: 44%;
  width: min(760px, 84vw);
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(187, 247, 208, 0.5), transparent 66%);
  transform: translate(-50%, -50%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(22, 163, 74, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22, 163, 74, 0.035) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(circle at center, #000, transparent 70%);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  padding: 8px 14px;
  border: 1px solid rgba(187, 247, 208, 0.86);
  border-radius: 999px;
  color: var(--green-dark);
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 14px 34px rgba(15, 118, 110, 0.08);
  font-size: 14px;
  backdrop-filter: blur(14px);
}

.hero-badge span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--green);
  box-shadow: 0 0 0 5px rgba(22, 163, 74, 0.12);
}

.hero h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(44px, 7vw, 82px);
  font-weight: 760;
  letter-spacing: 0;
  line-height: 1.02;
}

.hero h1 em {
  color: var(--green-dark);
  font-style: normal;
}

.hero p {
  max-width: 720px;
  margin: 18px auto 0;
  color: var(--muted);
  font-size: clamp(16px, 1.6vw, 20px);
  line-height: 1.75;
}

.search-wrap {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 12px;
  width: min(640px, 100%);
  height: 60px;
  margin: 20px auto 0;
  padding: 0 10px 0 18px;
  border: 1px solid rgba(187, 247, 208, 0.9);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 22px 54px rgba(15, 118, 110, 0.12);
  backdrop-filter: blur(18px);
  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.search-wrap:focus-within,
.search-wrap:hover {
  border-color: rgba(22, 163, 74, 0.42);
  box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.12), 0 24px 58px rgba(15, 118, 110, 0.14);
  transform: translateY(-1px);
}

.search-wrap svg {
  width: 22px;
  height: 22px;
  color: #64748b;
}

.search-wrap input {
  min-width: 0;
  border: 0;
  outline: 0;
  color: #111827;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
}

.search-wrap button {
  height: 42px;
  padding: 0 18px;
  border: 0;
  border-radius: 14px;
  color: #fff;
  background: linear-gradient(135deg, #047857, #16a34a);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.search-wrap button:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(22, 163, 74, 0.24);
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.quick-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid rgba(187, 247, 208, 0.8);
  border-radius: 999px;
  color: var(--green-dark);
  background: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 10px 28px rgba(15, 118, 110, 0.07);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.quick-tag:hover {
  transform: translateY(-3px);
  border-color: rgba(22, 163, 74, 0.45);
  background: rgba(236, 253, 243, 0.9);
}

.quick-tag.primary {
  color: #fff;
  border-color: transparent;
  background: #065f46;
}

.main,
.category-section {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
}

.main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 46px;
  align-items: start;
  padding: 20px 0 34px;
}

.section-head,
.category-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 8px;
  color: var(--green-dark);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
}

.section-head h2,
.category-head h2,
.steps-card h2 {
  margin: 0;
  color: #111827;
  font-size: 30px;
  line-height: 1.15;
}

.more-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--green-dark);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.more-link svg {
  width: 16px;
  height: 16px;
}

.article-list {
  display: grid;
  gap: 12px;
}

.glass-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 24px;
  background:
    radial-gradient(circle at 82% 6%, rgba(187, 247, 208, 0.44), transparent 32%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 253, 244, 0.82));
  box-shadow: 0 18px 46px rgba(15, 118, 110, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.glass-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(22, 163, 74, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22, 163, 74, 0.03) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.78;
  pointer-events: none;
}

.glass-card > * {
  position: relative;
  z-index: 1;
}

.glass-card:hover {
  transform: translateY(-4px);
  border-color: rgba(22, 163, 74, 0.38);
  box-shadow: 0 24px 60px rgba(15, 118, 110, 0.13);
}

.article-item {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr) auto 22px;
  align-items: center;
  gap: 14px;
  min-height: 66px;
  padding: 15px 18px;
  color: inherit;
  text-decoration: none;
}

.article-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-radius: 999px;
  color: #047857;
  background: rgba(220, 252, 231, 0.78);
  font-size: 13px;
  font-weight: 800;
}

.article-title {
  overflow: hidden;
  color: #111827;
  font-size: 16px;
  font-weight: 720;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-date {
  color: #9ca3af;
  font-size: 13px;
  font-weight: 700;
}

.article-item svg {
  width: 18px;
  height: 18px;
  color: rgba(6, 95, 70, 0.62);
}

.sidebar {
  position: sticky;
  top: calc(var(--vp-nav-height, 64px) + 24px);
}

.steps-card {
  padding: 28px;
  border-radius: 28px;
}

.steps-card p {
  margin: 10px 0 22px;
  color: var(--muted);
  line-height: 1.7;
}

.steps {
  display: grid;
  gap: 12px;
}

.step {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr) 20px;
  gap: 12px;
  align-items: center;
  padding: 14px;
  border: 1px solid rgba(187, 247, 208, 0.7);
  border-radius: 18px;
  color: inherit;
  background: rgba(255, 255, 255, 0.58);
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.step:hover {
  transform: translateX(4px);
  border-color: rgba(22, 163, 74, 0.4);
  background: rgba(236, 253, 243, 0.76);
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  color: #047857;
  background: rgba(220, 252, 231, 0.86);
  font-weight: 850;
}

.step strong,
.step small {
  display: block;
}

.step strong {
  color: #111827;
  font-size: 15px;
}

.step small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 13px;
}

.step svg {
  width: 18px;
  height: 18px;
  color: rgba(6, 95, 70, 0.65);
}

.category-section {
  padding: 34px 0 74px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.category-card {
  display: grid;
  gap: 9px;
  min-height: 150px;
  padding: 22px;
  color: inherit;
  text-decoration: none;
}

.category-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 16px;
  color: #047857;
  background: rgba(220, 252, 231, 0.76);
  font-weight: 850;
}

.category-card strong {
  color: #111827;
  font-size: 18px;
}

.category-card small {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
}

@media (max-width: 960px) {
  .main {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .sidebar {
    position: static;
  }

  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: 390px;
    padding: 48px 18px 28px;
  }

  .hero p {
    font-size: 15px;
  }

  .search-wrap {
    grid-template-columns: 22px 1fr;
    height: auto;
    min-height: 58px;
    padding: 0 16px;
  }

  .search-wrap button {
    display: none;
  }

  .main,
  .category-section {
    width: min(100% - 32px, 1180px);
  }

  .section-head,
  .category-head {
    align-items: start;
    flex-direction: column;
  }

  .article-item {
    grid-template-columns: 54px minmax(0, 1fr) 18px;
  }

  .article-date {
    display: none;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
