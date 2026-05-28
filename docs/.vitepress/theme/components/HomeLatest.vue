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
            class="list-item"
          >
            <span class="item-icon">{{ item.tag }}</span>
            <div class="item-main">
              <span class="item-title">{{ item.title }}</span>
              <span class="item-tag" :class="`tag-${item.type}`">{{ item.tag }}</span>
            </div>
            <span class="item-date">{{ item.date }}</span>
          </a>
        </div>
      </div>

      <aside class="side-panel">
        <div class="panda-card">
          <img :src="readingPanda" alt="读书的熊猫" class="panda-image" />
          <div class="panda-copy">
            <h3>不知道从哪里开始？</h3>
            <p>遇到报错、接入失败、费用不清楚？可以先查看 FAQ 和入门教程。</p>
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
  padding: 72px 24px 80px;
  background: #F8FAF9;
}

.latest-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.75fr);
  gap: 2rem;
  align-items: start;
}

.latest-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.section-kicker {
  display: inline-block;
  margin-bottom: 0.25rem;
  color: #16A34A;
  font-size: 0.78rem;
  font-weight: 800;
}

.section-title {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 750;
  color: #065F46;
}

.more-link {
  flex-shrink: 0;
  font-size: 0.85rem;
  color: #16A34A;
  text-decoration: none;
  font-weight: 700;
}

.more-link:hover {
  text-decoration: underline;
}

.latest-list {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.045);
}

.list-item {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border-bottom: 1px solid #F0FDF4;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: background 200ms ease;
}

.list-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #16A34A;
  transform: scaleY(0);
  transition: transform 0.2s;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:hover {
  background: #F0FDF4;
}

.list-item:hover::before {
  transform: scaleY(1);
}

.item-icon {
  min-width: 42px;
  height: 28px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #BBF7D0;
  border-radius: 7px;
  background: #F0FDF4;
  color: #065F46;
  font-size: 0.76rem;
  font-weight: 800;
}

.item-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-width: 0;
}

.item-title {
  color: #1f2937;
  font-size: 0.92rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-tag {
  flex-shrink: 0;
  padding: 0.14rem 0.48rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 700;
}

.tag-connect,
.tag-guide {
  background: #F0FDF4;
  color: #065F46;
}

.tag-knowledge {
  background: #F0FDF4;
  color: #065F46;
}

.tag-tips {
  background: #F0FDF4;
  color: #065F46;
}

.item-date {
  flex-shrink: 0;
  color: #9CA3AF;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}

.side-panel {
  display: grid;
  gap: 1rem;
}

.panda-card {
  overflow: hidden;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  background:
    linear-gradient(160deg, rgba(255,255,255,0.98), rgba(240,253,244,0.92));
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.045);
}

.panda-image {
  width: 100%;
  height: 160px;
  display: block;
  object-fit: cover;
  object-position: 70% center;
}

.panda-copy {
  padding: 1.1rem 1.2rem 1.2rem;
}

.panda-copy h3 {
  margin: 0 0 0.45rem;
  color: #065F46;
  font-size: 1rem;
}

.panda-copy p {
  margin: 0;
  color: #1F2937;
  font-size: 0.84rem;
  line-height: 1.65;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.category-item {
  min-height: 86px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.9rem;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: #ffffff;
  color: #065F46;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(17, 24, 39, 0.035);
  cursor: pointer;
  transition: transform 200ms ease, border-color 200ms ease, background 200ms ease;
}

.category-item:hover {
  transform: translateY(-2px);
  border-color: #16A34A;
  background: #F0FDF4;
}

.category-item span {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: #f0fdf4;
  color: #065F46;
  font-size: 0.78rem;
  font-weight: 800;
}

.category-item strong {
  font-size: 0.88rem;
}

@media (max-width: 900px) {
  .latest-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .latest-header,
  .list-item,
  .item-main {
    align-items: flex-start;
  }

  .list-item {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr);
  }

  .item-main {
    flex-direction: column;
    gap: 0.35rem;
  }

  .item-date {
    grid-column: 2;
  }
}
</style>
