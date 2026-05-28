<template>
  <section class="cards-section">
    <div class="section-heading">
      <span class="section-kicker">按任务进入</span>
      <h2>先选路径，再查细节</h2>
      <p>根据当前目标选择入口，减少查找成本。</p>
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

        <span class="card-arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
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
    icon: 'M5 19V6.5A2.5 2.5 0 0 1 7.5 4H19v13H7.5A2.5 2.5 0 0 0 5 19Zm0 0a2 2 0 0 0 2 2h12M9 8h6M9 12h4',
    title: '新手上手',
    desc: '注册、充值、创建 API Key，完成第一次调用',
    link: '/guide/platform-quickstart',
  },
  {
    icon: 'M8 7V4m8 3V4M7 12h10M9 20h6a4 4 0 0 0 4-4V9a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v7a4 4 0 0 0 4 4Z',
    title: '工具接入',
    desc: '接入 Cursor、Claude Code、Chatbox 等常用工具',
    link: '/connect/chatbox',
  },
  {
    icon: 'M12 17h.01M9.4 9.1a2.7 2.7 0 1 1 4.45 2.08c-.84.74-1.85 1.22-1.85 2.72M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    title: '常见问题',
    desc: '查看 429、Token 消耗、配置报错等问题',
    link: '/faq/personal/',
  },
  {
    icon: 'M12 3l1.65 4.6L18 9.25l-4.35 1.65L12 15.5l-1.65-4.6L6 9.25l4.35-1.65L12 3Zm6 10 1 2.7 2.7 1-2.7 1-1 2.7-1-2.7-2.7-1 2.7-1 1-2.7ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z',
    title: '进阶内容',
    desc: 'AI 知识、效率技巧与模型使用经验',
    link: '/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi',
  },
]
</script>

<style scoped>
.cards-section {
  padding: 74px 24px 70px;
  background: #fff;
}

.section-heading {
  max-width: 1200px;
  margin: 0 auto 24px;
}

.section-kicker {
  display: inline-block;
  margin-bottom: 8px;
  color: #16A34A;
  font-size: 13px;
  font-weight: 760;
}

.section-heading h2 {
  margin: 0;
  color: #111827;
  font-size: 28px;
  line-height: 1.25;
  letter-spacing: 0;
}

.section-heading p {
  margin: 10px 0 0;
  color: #6B7280;
  font-size: 15px;
}

.cards-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 214px;
  padding: 22px;
  border: 1px solid #E5E7EB;
  border-radius: 20px;
  background: rgba(255,255,255,0.88);
  text-decoration: none;
  color: inherit;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.045);
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease, background 200ms ease;
}

.card:hover,
.card:focus-visible {
  transform: translateY(-6px);
  border-color: rgba(22, 163, 74, 0.35);
  background: #fff;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  outline: none;
}

.card:hover .card-arrow,
.card:focus-visible .card-arrow {
  background: #16A34A;
  color: #fff;
  border-color: #16A34A;
}

.card-icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: #ECFDF3;
  color: #065F46;
}

.card-icon {
  width: 23px;
  height: 23px;
}

.card-title {
  margin: 0 0 8px;
  color: #111827;
  font-size: 17px;
  font-weight: 740;
}

.card-desc {
  margin: 0;
  color: #6B7280;
  font-size: 14px;
  line-height: 1.65;
  flex: 1;
}

.card-arrow {
  width: 34px;
  height: 34px;
  position: absolute;
  right: 18px;
  bottom: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E5E7EB;
  border-radius: 50%;
  background: #F9FAFB;
  color: #9CA3AF;
  transition: background 200ms ease, color 200ms ease, border-color 200ms ease;
}

.card-arrow svg {
  width: 17px;
  height: 17px;
}

@media (max-width: 1024px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .cards-section {
    padding: 56px 24px;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>
