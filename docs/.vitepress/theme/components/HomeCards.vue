<template>
  <!-- 5 个入口卡片区 -->
  <section class="cards-section">
    <div class="cards-container">
      <a
        v-for="card in cards"
        :key="card.link"
        :href="card.link"
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
// 修改 title/desc/link 即可调整卡片内容；iconBg 控制图标圆底色
const cards = [
  {
    icon: '🎓',
    iconBg: 'rgba(34, 197, 94, 0.12)',
    title: '使用教程',
    desc: '从入门到进阶，学习如何使用熊猫算力平台',
    link: '/guide/',
  },
  {
    icon: '🔗',
    iconBg: 'rgba(59, 130, 246, 0.12)',
    title: '拓展连接',
    desc: '了解如何将熊猫算力平台与其他软件和服务连接',
    link: '/connect/',
  },
  {
    icon: '❓',
    iconBg: 'rgba(249, 115, 22, 0.12)',
    title: '常见问题',
    desc: '查看用户常见问题及官方详细解答',
    link: '/faq/',
  },
  {
    icon: '📖',
    iconBg: 'rgba(168, 85, 247, 0.12)',
    title: 'AI 知识分享',
    desc: '探索 AI 领域知识、技术原理和行业动态',
    link: '/ai-knowledge/',
  },
  {
    icon: '💡',
    iconBg: 'rgba(236, 72, 153, 0.12)',
    title: '技巧分享',
    desc: '学习实用 AI 使用技巧，提升效率和创造力',
    link: '/tips/',
  },
]
</script>

<style scoped>
.cards-section {
  background: #f9fafb;
  padding: 3.5rem 1.5rem;
  border-top: 1px solid #f3f4f6;
}

.cards-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
}

@media (max-width: 1024px) {
  .cards-container { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 640px) {
  .cards-container { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 400px) {
  .cards-container { grid-template-columns: 1fr; }
}

/* ── 卡片 ── */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.25rem 1.25rem;
  border-radius: 14px;
  background: white;
  border: 1px solid #f0fdf4;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s, box-shadow 0.25s;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #22c55e, #86efac);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(34, 197, 94, 0.14);
  border-color: #d1fae5;
}

.card:hover::before {
  transform: scaleX(1);
}

.card:hover .card-arrow {
  transform: translateX(4px);
  color: #22c55e;
}

/* 图标圆 */
.card-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.card-title {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
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
