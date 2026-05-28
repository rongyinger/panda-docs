<template>
  <section class="hot-faq-section">
    <div class="hot-faq-bar">
      <a :href="withBase('/faq/personal/')" class="hot-faq-label">常见问题</a>
      <div class="hot-faq-links">
        <a
          v-for="(faq, index) in faqs"
          :key="faq.link"
          :href="withBase(faq.link)"
          class="hot-faq-item"
          :class="{ featured: index === 0 }"
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
  padding: 10px 24px 64px;
  background: #F7FAF8;
}

.hot-faq-bar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px;
  border: 1px solid rgba(229, 231, 235, 0.9);
  border-radius: 22px;
  background: rgba(255,255,255,0.88);
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.06);
  overflow-x: auto;
}

.hot-faq-label {
  padding: 9px 13px;
  border-radius: 14px;
  background: #111827;
  color: #fff;
  font-size: 14px;
  font-weight: 760;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
}

.hot-faq-links {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.hot-faq-links::-webkit-scrollbar {
  display: none;
}

.hot-faq-item {
  flex: 0 0 auto;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: #F9FAFB;
  color: #4B5563;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 200ms ease, color 200ms ease, background 200ms ease, transform 200ms ease;
}

.hot-faq-item.featured {
  border-color: #BBF7D0;
  background: #ECFDF3;
  color: #065F46;
}

.hot-faq-item:hover,
.hot-faq-item:focus-visible {
  border-color: rgba(22, 163, 74, 0.36);
  background: #fff;
  color: #065F46;
  transform: translateY(-1px);
  outline: none;
}

@media (max-width: 640px) {
  .hot-faq-section {
    padding-bottom: 52px;
  }

  .hot-faq-bar {
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
