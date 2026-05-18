<template>
  <section class="hot-faq-section">
    <div class="hot-faq-bar">
      <span class="hot-faq-label">🔥 热门问题：</span>
      <div class="hot-faq-links">
        <a
          v-for="faq in faqs"
          :key="faq.link"
          :href="withBase(faq.link)"
          class="hot-faq-item"
        >
          {{ faq.text }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

const faqs = [
  { text: '为什么报 429？',         link: '/faq/429-too-many-requests' },
  { text: 'Token 消耗为什么这么快？', link: '/faq/token-consumption-high' },
  { text: '怎么接入 Cursor？',       link: '/connect/cursor' },
  { text: 'Claude Code 怎么配置？',  link: '/connect/claude-code' },
  { text: 'API Key 怎么创建？',      link: '/faq/how-to-create-apikey' },
]
</script>

<style scoped>
.hot-faq-section {
  padding: 0.75rem 1.5rem 1.25rem;
  background: white;
}

.hot-faq-bar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border-left: 4px solid #f97316;
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

.hot-faq-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
  flex-shrink: 0;
}

.hot-faq-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}

.hot-faq-links::-webkit-scrollbar { display: none; }

.hot-faq-item {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  background: #f0fdf4;
  color: #16a34a;
  font-size: 0.78rem;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
  font-weight: 500;
  flex-shrink: 0;
}

.hot-faq-item:hover {
  background: #dcfce7;
  color: #15803d;
}
</style>
