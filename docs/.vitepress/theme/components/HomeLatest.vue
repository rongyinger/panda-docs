<template>
  <section class="latest-section">
    <div class="latest-container">
      <div class="latest-list-wrap">
        <div class="latest-header">
          <div>
            <span class="section-kicker">最近更新</span>
            <h2 class="section-title">精选内容</h2>
          </div>
          <a :href="withBase('/blog/')" class="more-link">查看更多 →</a>
        </div>

        <div class="latest-list">
          <a
            v-for="item in latestItems"
            :key="item.link"
            :href="withBase(item.link)"
            class="article-row"
          >
            <span class="article-badge" :class="`tag-${item.type}`">{{ item.tag }}</span>
            <span class="article-title">{{ item.title }}</span>
            <span class="article-date">{{ item.date }}</span>
          </a>
        </div>
      </div>

      <aside class="side-panel">
        <div class="starter-card">
          <div class="starter-image-wrap">
            <img :src="readingPanda" alt="读书的熊猫" class="starter-image" />
          </div>
          <div class="starter-copy">
            <span class="starter-label">新手推荐路径</span>
            <h3>不知道从哪里开始？</h3>
            <p>先看入门教程和 FAQ，快速完成第一次配置。</p>
            <a :href="withBase('/guide/platform-quickstart')" class="starter-link">查看新手指南 →</a>
          </div>
        </div>

        <div class="category-grid">
          <a
            v-for="category in categories"
            :key="category.link"
            :href="withBase(category.link)"
            class="category-item"
          >
            <span>{{ category.title.slice(0, 2) }}</span>
            <strong>{{ category.title }}</strong>
          </a>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const readingPanda = computed(() => withBase('reading-panda.png'))

const latestItems = [
  {
    title: 'Codex 桌面版接入熊猫算力 · 完整教程',
    tag: '接入',
    type: 'connect',
    date: '2026-05-19',
    link: '/connect/codex-desktop',
  },
  {
    title: 'Claude 桌面版接入熊猫算力 · 完整教程',
    tag: '接入',
    type: 'connect',
    date: '2026-05-19',
    link: '/connect/claude-desktop',
  },
  {
    title: '字节跳动开源 OpenViking：重构 AI Agent 记忆中枢',
    tag: '技巧',
    type: 'tips',
    date: '2026-05-19',
    link: '/tips/openviking-agent-memory-system',
  },
  {
    title: 'AI 补贴时代落幕，渠道商黄金时期到来',
    tag: '知识',
    type: 'knowledge',
    date: '2026-05-18',
    link: '/ai-knowledge/ai-subsidy-era-channel-opportunity',
  },
  {
    title: '文献综述哪家强：五模型引用核查实测',
    tag: '知识',
    type: 'knowledge',
    date: '2026-05-18',
    link: '/ai-knowledge/literature-review-model-comparison',
  },
  {
    title: '省 Token 终极指南：10 个技巧降低 50%-80% 费用',
    tag: '技巧',
    type: 'tips',
    date: '2026-05-18',
    link: '/tips/save-token-ultimate-guide',
  },
  {
    title: 'Spring AI 接入熊猫算力教程',
    tag: '接入',
    type: 'connect',
    date: '2026-05-18',
    link: '/connect/spring-ai',
  },
  {
    title: '熊猫算力 · 快速上手指南（12 步完整流程）',
    tag: '新手',
    type: 'guide',
    date: '2026-05-18',
    link: '/guide/platform-quickstart',
  },
]

const categories = [
  { title: '工具接入', link: '/connect/chatbox' },
  { title: '常见问题', link: '/faq/personal/' },
  { title: 'AI 知识', link: '/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi' },
  { title: '使用技巧', link: '/tips/openwolf-claude-code-memory' },
]
</script>

<style scoped>
.latest-section {
  padding: 76px 24px 86px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F7FAF8 100%);
}

.latest-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(300px, 0.72fr);
  gap: 28px;
  align-items: start;
}

.latest-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.section-kicker {
  display: inline-block;
  margin-bottom: 8px;
  color: #16A34A;
  font-size: 13px;
  font-weight: 760;
}

.section-title {
  margin: 0;
  color: #111827;
  font-size: 28px;
  font-weight: 760;
  line-height: 1.25;
}

.more-link {
  color: #4B5563;
  font-size: 14px;
  font-weight: 680;
  text-decoration: none;
  white-space: nowrap;
}

.more-link:hover,
.more-link:focus-visible {
  color: #16A34A;
  outline: none;
}

.latest-list {
  display: grid;
  gap: 10px;
}

.article-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: 1px solid #E5E7EB;
  border-radius: 14px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.035);
  cursor: pointer;
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.article-row:hover,
.article-row:focus-visible {
  transform: translateX(3px);
  border-color: #BBF7D0;
  background: #F9FFFB;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.055);
  outline: none;
}

.article-badge {
  min-width: 44px;
  display: inline-flex;
  justify-content: center;
  padding: 5px 9px;
  border-radius: 999px;
  background: #F3F4F6;
  color: #4B5563;
  font-size: 12px;
  font-weight: 740;
}

.tag-connect,
.tag-guide,
.tag-knowledge,
.tag-tips {
  background: #ECFDF3;
  color: #065F46;
}

.article-title {
  min-width: 0;
  color: #111827;
  font-size: 15px;
  font-weight: 650;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-date {
  color: #9CA3AF;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.side-panel {
  display: grid;
  gap: 14px;
}

.starter-card {
  overflow: hidden;
  border: 1px solid #E5E7EB;
  border-radius: 22px;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.07);
}

.starter-image-wrap {
  height: 158px;
  background:
    radial-gradient(circle at 68% 30%, rgba(22, 163, 74, 0.18), transparent 36%),
    linear-gradient(145deg, #ECFDF3, #FFFFFF);
  overflow: hidden;
}

.starter-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: 68% center;
}

.starter-copy {
  padding: 20px;
}

.starter-label {
  color: #16A34A;
  font-size: 12px;
  font-weight: 760;
}

.starter-copy h3 {
  margin: 8px 0 8px;
  color: #111827;
  font-size: 19px;
  line-height: 1.32;
}

.starter-copy p {
  margin: 0 0 16px;
  color: #6B7280;
  font-size: 14px;
  line-height: 1.65;
}

.starter-link {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 13px;
  border-radius: 12px;
  background: #065F46;
  color: #fff;
  font-size: 13px;
  font-weight: 720;
  text-decoration: none;
  transition: transform 200ms ease, background 200ms ease;
}

.starter-link:hover,
.starter-link:focus-visible {
  transform: translateY(-1px);
  background: #064E3B;
  outline: none;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.category-item {
  min-height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  background: #fff;
  color: #111827;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.035);
  cursor: pointer;
  transition: transform 200ms ease, border-color 200ms ease, background 200ms ease;
}

.category-item:hover,
.category-item:focus-visible {
  transform: translateY(-3px);
  border-color: #BBF7D0;
  background: #F9FFFB;
  outline: none;
}

.category-item span {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: #ECFDF3;
  color: #065F46;
  font-size: 12px;
  font-weight: 760;
}

.category-item strong {
  font-size: 14px;
}

@media (max-width: 900px) {
  .latest-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .latest-section {
    padding: 56px 24px 70px;
  }

  .latest-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .article-row {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .article-date {
    grid-column: 2;
  }
}
</style>
