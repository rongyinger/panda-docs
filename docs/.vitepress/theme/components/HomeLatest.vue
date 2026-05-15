<template>
  <!-- 最新内容 + CTA 区 -->
  <section class="latest-section">
    <div class="latest-container">

      <!-- ── 左侧：最新内容列表（60%）── -->
      <div class="latest-list-wrap">
        <div class="latest-header">
          <h2 class="section-title">最新内容</h2>
          <a href="/guide/" class="more-link">查看更多 →</a>
        </div>

        <div class="latest-list">
          <a
            v-for="item in latestItems"
            :key="item.link"
            :href="item.link"
            class="list-item"
          >
            <span class="item-icon">{{ item.icon }}</span>
            <div class="item-main">
              <span class="item-title">{{ item.title }}</span>
              <span class="item-tag" :style="{ background: item.tagBg, color: item.tagColor }">
                {{ item.tag }}
              </span>
            </div>
            <span class="item-date">{{ item.date }}</span>
          </a>
        </div>
      </div>

      <!-- ── 右侧：CTA 卡片（40%）── -->
      <div class="cta-card">
        <!-- 读书熊猫插画 -->
        <div class="cta-illus-wrap">
          <img
            :src="readingPanda"
            alt="读书的熊猫"
            class="cta-illus"
          />
        </div>

        <div class="cta-body">
          <h3 class="cta-title">开始使用熊猫算力平台</h3>
          <p class="cta-desc">
            高效、稳定、易用的 AI 算力服务，助力您的 AI 创新之旅
          </p>
          <a href="https://pandatoken.com" class="cta-btn" target="_blank" rel="noopener">
            立即访问官网 →
          </a>
          <a href="/guide/quickstart" class="cta-link">新用户注册指南 →</a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const readingPanda = computed(() => withBase('reading-panda.png'))

// 修改这里的数组来更新首页最新内容列表
const latestItems = [
  {
    icon: '📄',
    title: '如何在熊猫算力平台上部署 Stable Diffusion WebUI',
    tag: '教程',
    tagBg: 'rgba(34,197,94,0.1)',
    tagColor: '#15803d',
    date: '2026-05-10',
    link: '/guide/quickstart',
  },
  {
    icon: '🔗',
    title: '熊猫算力平台与 ComfyUI 连接教程',
    tag: '拓展',
    tagBg: 'rgba(59,130,246,0.1)',
    tagColor: '#1d4ed8',
    date: '2026-05-08',
    link: '/connect/comfyui',
  },
  {
    icon: '❓',
    title: '显存不足导致任务失败怎么办？',
    tag: '问题',
    tagBg: 'rgba(249,115,22,0.1)',
    tagColor: '#c2410c',
    date: '2026-05-05',
    link: '/faq/vram-issue',
  },
  {
    icon: '📖',
    title: '大模型基础知识：Transformer 架构详解',
    tag: '知识',
    tagBg: 'rgba(168,85,247,0.1)',
    tagColor: '#7c3aed',
    date: '2026-05-02',
    link: '/ai-knowledge/transformer',
  },
  {
    icon: '💡',
    title: '提示词工程（Prompt Engineering）技巧大全',
    tag: '技巧',
    tagBg: 'rgba(236,72,153,0.1)',
    tagColor: '#be185d',
    date: '2026-04-30',
    link: '/tips/prompt-engineering',
  },
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
  grid-template-columns: 60% 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .latest-container { grid-template-columns: 1fr; }
}

/* ── 标题行 ── */
.latest-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.section-title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: #111827;
}

.more-link {
  font-size: 0.85rem;
  color: #22c55e;
  text-decoration: none;
  font-weight: 500;
}
.more-link:hover { text-decoration: underline; }

/* ── 列表 ── */
.latest-list {
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  overflow: hidden;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid #f9fafb;
  text-decoration: none;
  color: inherit;
  transition: background 0.18s;
}

.list-item:last-child { border-bottom: none; }

.list-item:hover { background: #f0fdf4; }

.item-icon {
  font-size: 1.05rem;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.item-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.item-title {
  font-size: 0.88rem;
  color: #111827;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-tag {
  flex-shrink: 0;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
}

.item-date {
  flex-shrink: 0;
  font-size: 0.78rem;
  color: #9ca3af;
  font-variant-numeric: tabular-nums;
}

/* ── CTA 卡片 ── */
.cta-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #d1fae5;
  background: linear-gradient(160deg, #f0fdf4 0%, #dcfce7 100%);
  box-shadow: 0 4px 24px rgba(34, 197, 94, 0.1);
}

/* 读书熊猫插画区 */
.cta-illus-wrap {
  width: 100%;
  height: 170px;
  overflow: hidden;
  background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
}

.cta-illus {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 聚焦到图片右侧的熊猫区域 */
  object-position: 70% center;
  display: block;
}

/* 卡片文案区 */
.cta-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.cta-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #14532d;
  line-height: 1.4;
}

.cta-desc {
  margin: 0;
  font-size: 0.83rem;
  color: #166534;
  line-height: 1.6;
}

.cta-btn {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.55rem 1.4rem;
  border-radius: 8px;
  background: #22c55e;
  color: white;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.cta-btn:hover {
  background: #15803d;
  transform: translateY(-1px);
}

.cta-link {
  font-size: 0.8rem;
  color: #15803d;
  text-decoration: none;
}
.cta-link:hover { text-decoration: underline; }
</style>
