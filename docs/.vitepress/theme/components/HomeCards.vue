<template>
  <!-- 核心入口卡片区 -->
  <section class="cards-section">
    <div class="section-heading">
      <span class="section-kicker">按任务进入</span>
      <h2>先选路径，再查细节</h2>
    </div>
    <div class="cards-container">
      <a
        v-for="card in cards"
        :key="card.link"
        :href="withBase(card.link)"
        class="card"
      >
        <!-- 顶部彩色图标圆 -->
        <div class="card-icon-wrap" :style="{ background: card.iconBg }">
          <span class="card-icon">{{ card.icon }}</span>
        </div>

        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-desc">{{ card.desc }}</p>

        <!-- 右下角箭头，hover 右移 -->
        <span class="card-arrow">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

const cards = [
  {
    icon: '🐼',
    iconBg: 'rgba(34, 197, 94, 0.12)',
    title: '新手上手',
    desc: '注册、充值、创建 API Key，快速完成第一次调用',
    link: '/guide/platform-quickstart',
  },
  {
    icon: '🎋',
    iconBg: 'rgba(132, 204, 22, 0.14)',
    title: '工具接入',
    desc: '连接 Cursor、Claude Code、Chatbox 等常用工具',
    link: '/connect/chatbox',
  },
  {
    icon: '❓',
    iconBg: 'rgba(249, 115, 22, 0.12)',
    title: '常见问题',
    desc: '查看用户常见问题及官方详细解答',
    link: '/faq/personal/',
  },
  {
    icon: '📚',
    iconBg: 'rgba(20, 83, 45, 0.1)',
    title: '进阶内容',
    desc: '阅读 AI 知识、效率技巧和模型使用经验',
    link: '/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi',
  },
]
</script>

<style scoped>
.cards-section {
  background:
    linear-gradient(180deg, #ffffff 0%, #f7fff9 100%);
  padding: 3.75rem 1.5rem;
  border-top: 1px solid rgba(34, 197, 94, 0.1);
}

.section-heading {
  max-width: 1200px;
  margin: 0 auto 1.35rem;
}

.section-kicker {
  display: inline-block;
  margin-bottom: 0.35rem;
  color: #15803d;
  font-size: 0.78rem;
  font-weight: 800;
}

.section-heading h2 {
  margin: 0;
  color: #14532d;
  font-size: 1.45rem;
  line-height: 1.3;
}

.cards-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

@media (max-width: 1024px) {
  .cards-container { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .cards-container { grid-template-columns: 1fr; }
}

/* ── 卡片 ── */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 190px;
  padding: 1.5rem 1.25rem 1.25rem;
  border-radius: 10px;
  background: white;
  border: 1px solid #dff7e8;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 12px 28px rgba(21, 128, 61, 0.06);
  transition: transform 0.25s, box-shadow 0.25s;
  overflow: hidden;
}

/* hover 顶部绿色渐变线 */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #14532d, #22c55e, #a3e635);
}

.card::after {
  content: '';
  position: absolute;
  right: -16px;
  bottom: -36px;
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: rgba(187, 247, 208, 0.32);
  pointer-events: none;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 38px rgba(21, 128, 61, 0.12);
  border-color: #d1fae5;
}

.card:hover .card-arrow {
  transform: translateX(4px);
  color: #22c55e;
}

/* 图标圆（含外发光） */
.card-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(34, 197, 94, 0.08);
}

.card-title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #14532d;
}

.card-desc {
  margin: 0 0 1.5rem;
  font-size: 0.82rem;
  color: #6b7280;
  line-height: 1.6;
  flex: 1;
}

.card-arrow {
  display: flex;
  align-self: flex-end;
  color: #d1d5db;
  transition: transform 0.25s, color 0.25s;
}

.card-arrow svg {
  width: 18px;
  height: 18px;
}
</style>
