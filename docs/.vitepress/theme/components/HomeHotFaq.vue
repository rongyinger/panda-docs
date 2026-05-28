<template>
  <section class="hot-faq-section">
    <div class="hot-faq-bar">
      <a :href="withBase('/faq/personal/')" class="hot-faq-label">常见问题</a>
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
  padding: 48px 24px 0;
  background: #F8FAF9;
}

.hot-faq-bar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 0.8rem;
  box-shadow: 0 10px 24px rgba(17, 24, 39, 0.045);
  overflow-x: auto;
}

.hot-faq-label {
  font-size: 0.85rem;
  font-weight: 800;
  color: #065F46;
  text-decoration: none;
  border: 1px solid #16A34A;
  background: #F0FDF4;
  border-radius: 999px;
  padding: 0.32rem 0.76rem;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
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
  background: white;
  border: 1px solid #E5E7EB;
  color: #1F2937;
  font-size: 0.78rem;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background 200ms ease, color 200ms ease, border-color 200ms ease, transform 200ms ease;
  font-weight: 500;
  flex-shrink: 0;
}

.hot-faq-item:hover {
  background: #F0FDF4;
  color: #065F46;
  border-color: #16A34A;
  transform: translateY(-1px);
}
</style>
