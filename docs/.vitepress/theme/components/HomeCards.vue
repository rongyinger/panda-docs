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
        <div class="card-icon-wrap" aria-hidden="true">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none">
            <path :d="card.icon" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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
    icon: 'M5 5h10a4 4 0 0 1 4 4v10H9a4 4 0 0 1-4-4V5Zm4 4h6M9 13h4',
    title: '新手上手',
    desc: '注册、充值、创建 API Key，完成第一次调用',
    link: '/guide/platform-quickstart',
  },
  {
    icon: 'M8 7V4m8 3V4M6 11h12M8 20h8a4 4 0 0 0 4-4V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a4 4 0 0 0 4 4Z',
    title: '工具接入',
    desc: '接入 Cursor、Claude Code、Chatbox 等常用工具',
    link: '/connect/chatbox',
  },
  {
    icon: 'M12 17h.01M9.5 9a2.5 2.5 0 1 1 4.2 1.84c-.78.7-1.7 1.18-1.7 2.66M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    title: '常见问题',
    desc: '查看 429、Token 消耗、配置报错等问题',
    link: '/faq/personal/',
  },
  {
    icon: 'M4 19.5V6a2 2 0 0 1 2-2h10.5M8 8h8m-8 4h8m-8 4h5m5-5 2 2 4-4',
    title: '进阶内容',
    desc: 'AI 知识、效率技巧与模型使用经验',
    link: '/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi',
  },
]
</script>

<style scoped>
.cards-section {
  background: #F8FAF9;
  padding: 72px 24px;
  border-top: 1px solid rgba(187, 247, 208, 0.55);
}

.section-heading {
  max-width: 1200px;
  margin: 0 auto 1.5rem;
}

.section-kicker {
  display: inline-block;
  margin-bottom: 0.35rem;
  color: #16A34A;
  font-size: 0.78rem;
  font-weight: 800;
}

.section-heading h2 {
  margin: 0;
  color: #065F46;
  font-size: 1.45rem;
  line-height: 1.3;
}

.cards-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
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
  border-radius: 8px;
  background: white;
  border: 1px solid #E5E7EB;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.045);
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
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
  background: linear-gradient(90deg, #065F46, #16A34A);
}

.card::after {
  content: '';
  position: absolute;
  right: -16px;
  bottom: -36px;
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: rgba(240, 253, 244, 0.72);
  pointer-events: none;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 42px rgba(17, 24, 39, 0.09);
  border-color: #16A34A;
}

.card:hover .card-arrow {
  transform: translateX(4px);
  color: #16A34A;
}

.card-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #065F46;
  background: #F0FDF4;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px #BBF7D0;
}

.card-icon {
  width: 24px;
  height: 24px;
}

.card-title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #065F46;
}

.card-desc {
  margin: 0 0 1.5rem;
  font-size: 0.82rem;
  color: #6B7280;
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
