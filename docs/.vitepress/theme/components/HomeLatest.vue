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
            <span class="item-icon">{{ item.icon }}</span>
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
            <h3>从一个问题开始</h3>
            <p>遇到报错先搜 FAQ，要接入工具先看教程，要省成本再读技巧。</p>
          </div>
        </div>

        <div class="category-grid">
          <a
            v-for="category in categories"
            :key="category.link"
            :href="withBase(category.link)"
            class="category-item"
          >
            <span>{{ category.icon }}</span>
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
    icon: '🔌',
    title: 'Codex 桌面版接入熊猫算力 · 完整教程',
    tag: '接入',
    type: 'connect',
    date: '2026-05-19',
    link: '/connect/codex-desktop',
  },
  {
    icon: '🔌',
    title: 'Claude 桌面版接入熊猫算力 · 完整教程',
    tag: '接入',
    type: 'connect',
    date: '2026-05-19',
    link: '/connect/claude-desktop',
  },
  {
    icon: '💡',
    title: '字节跳动开源 OpenViking：重构 AI Agent 记忆中枢',
    tag: '技巧',
    type: 'tips',
    date: '2026-05-19',
    link: '/tips/openviking-agent-memory-system',
  },
  {
    icon: '📖',
    title: 'AI 补贴时代落幕，渠道商黄金时期到来',
    tag: '知识',
    type: 'knowledge',
    date: '2026-05-18',
    link: '/ai-knowledge/ai-subsidy-era-channel-opportunity',
  },
  {
    icon: '📖',
    title: '文献综述哪家强：五模型引用核查实测',
    tag: '知识',
    type: 'knowledge',
    date: '2026-05-18',
    link: '/ai-knowledge/literature-review-model-comparison',
  },
  {
    icon: '💡',
    title: '省 Token 终极指南：10 个技巧降低 50%-80% 费用',
    tag: '技巧',
    type: 'tips',
    date: '2026-05-18',
    link: '/tips/save-token-ultimate-guide',
  },
  {
    icon: '🔗',
    title: 'Spring AI 接入熊猫算力教程',
    tag: '接入',
    type: 'connect',
    date: '2026-05-18',
    link: '/connect/spring-ai',
  },
  {
    icon: '📄',
    title: '熊猫算力 · 快速上手指南（12 步完整流程）',
    tag: '教程',
    type: 'guide',
    date: '2026-05-18',
    link: '/guide/platform-quickstart',
  },
]

const categories = [
  { icon: '🎋', title: '工具接入', link: '/connect/chatbox' },
  { icon: '❓', title: '常见问题', link: '/faq/personal/' },
  { icon: '📚', title: 'AI 知识', link: '/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi' },
  { icon: '💡', title: '使用技巧', link: '/tips/openwolf-claude-code-memory' },
]
</script>

<style scoped>
.latest-section {
  padding: 4rem 1.5rem;
  background: white;
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
  color: #15803d;
  font-size: 0.78rem;
  font-weight: 800;
}

.section-title {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 750;
  color: #14532d;
}

.more-link {
  flex-shrink: 0;
  font-size: 0.85rem;
  color: #15803d;
  text-decoration: none;
  font-weight: 700;
}

.more-link:hover {
  text-decoration: underline;
}

.latest-list {
  border: 1px solid #e4f7ea;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(21, 128, 61, 0.05);
}

.list-item {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.92rem 1.1rem;
  border-bottom: 1px solid #f0fdf4;
  text-decoration: none;
  color: inherit;
  transition: background 0.18s;
}

.list-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #22c55e;
  transform: scaleY(0);
  transition: transform 0.2s;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:hover {
  background: #f7fff9;
}

.list-item:hover::before {
  transform: scaleY(1);
}

.item-icon {
  width: 28px;
  flex-shrink: 0;
  font-size: 1rem;
  text-align: center;
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
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-tag {
  flex-shrink: 0;
  padding: 0.16rem 0.52rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
}

.tag-connect,
.tag-guide {
  background: #dcfce7;
  color: #15803d;
}

.tag-knowledge {
  background: #ecfccb;
  color: #3f6212;
}

.tag-tips {
  background: #fff7ed;
  color: #c2410c;
}

.item-date {
  flex-shrink: 0;
  color: #9ca3af;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}

.side-panel {
  display: grid;
  gap: 1rem;
}

.panda-card {
  overflow: hidden;
  border: 1px solid #d1fae5;
  border-radius: 10px;
  background:
    linear-gradient(160deg, rgba(240,253,244,0.96), rgba(220,252,231,0.88));
  box-shadow: 0 12px 30px rgba(21, 128, 61, 0.07);
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
  color: #14532d;
  font-size: 1rem;
}

.panda-copy p {
  margin: 0;
  color: #36513d;
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
  border: 1px solid #e4f7ea;
  border-radius: 10px;
  background: #ffffff;
  color: #14532d;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(21, 128, 61, 0.04);
  transition: transform 0.2s, border-color 0.2s;
}

.category-item:hover {
  transform: translateY(-2px);
  border-color: #bbf7d0;
}

.category-item span {
  font-size: 1.25rem;
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
    grid-template-columns: 28px minmax(0, 1fr);
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
