<template>
  <!-- Hero 区：左侧文案 + 搜索 + 指标栏 + 热词，右侧熊猫插画 -->
  <section class="hero" :style="heroBg">
    <!-- 背景装饰层 -->
    <div class="hero-overlay" />

    <div class="hero-inner">
      <!-- 左侧文案区 -->
      <div class="hero-text">
        <h1 class="hero-title">
          欢迎来到<br />
          <span class="hero-title-green">熊猫知识中心</span>
        </h1>

        <p class="hero-desc">
          这里汇集了熊猫算力平台的使用教程、拓展连接方案、常见问题解答、AI 知识分享和实用技巧，助您高效使用，探索 AI 无限可能。
        </p>

        <!-- 搜索框（样式组件，点击触发 VitePress 内置搜索） -->
        <div class="hero-search" @click="openSearch">
          <svg class="search-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.8"/>
            <path d="M15 15l-3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span class="search-placeholder">搜索教程、问题或关键词...</span>
        </div>

        <!-- 数字指标栏 -->
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-number">40+</span>
            <span class="stat-label">支持模型</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">个人 / 企业</span>
            <span class="stat-label">双端接入</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">国内直连</span>
            <span class="stat-label">无需代理</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">按量计费</span>
            <span class="stat-label">无月费无套餐</span>
          </div>
        </div>

        <!-- 热门搜索标签 -->
        <div class="hero-tags">
          <span class="tags-label">热门搜索：</span>
          <a
            v-for="tag in hotTags"
            :key="tag.text"
            :href="withBase(tag.link)"
            class="hero-tag"
          >{{ tag.text }}</a>
        </div>
      </div>

      <!-- 右侧区域（插画通过背景已呈现，此处留白占位保持布局） -->
      <div class="hero-illus" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const hotTags = [
  { text: 'API 接入',     link: '/connect/chatbox' },
  { text: 'Claude Code', link: '/connect/claude-code' },
  { text: '429 报错',    link: '/faq/429-too-many-requests' },
  { text: 'Token 计费',  link: '/faq/personal/' },
  { text: 'Cursor 配置', link: '/connect/cursor' },
]

const heroBg = computed(() => ({
  backgroundImage: [
    'linear-gradient(to right, #ffffff 38%, rgba(255,255,255,0.82) 54%, rgba(255,255,255,0.3) 72%, transparent 90%)',
    `url(${withBase('hero-panda.png')})`,
  ].join(', '),
  backgroundPosition: 'left, right center',
  backgroundSize:     'auto, 62% auto',
  backgroundRepeat:   'no-repeat, no-repeat',
  backgroundColor:    '#f0fdf4',
}))

function openSearch() {
  const btn = document.querySelector<HTMLElement>('.DocSearch-Button, .vp-local-search-button')
  btn?.click()
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
}

/* 背景竹节纹路装饰 */
.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.08) 0%, transparent 40%);
  pointer-events: none;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
}

.hero-illus {
  min-height: 360px;
}

/* ── 标题 ── */
.hero-title {
  margin: 0 0 1rem;
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  color: #111827;
}

.hero-title-green {
  color: #22c55e;
  background: linear-gradient(135deg, #22c55e, #15803d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  margin: 0 0 1.75rem;
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.75;
  max-width: 480px;
}

/* ── 搜索框 ── */
.hero-search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 460px;
  padding: 0.8rem 1.2rem;
  border-radius: 50px;
  border: 1.5px solid #d1fae5;
  background: white;
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.12);
  cursor: pointer;
  transition: all 0.25s;
  margin-bottom: 1rem;
}

.hero-search:hover {
  border-color: #22c55e;
  box-shadow: 0 6px 28px rgba(34, 197, 94, 0.2);
  transform: translateY(-1px);
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #9ca3af;
  flex-shrink: 0;
}

.search-placeholder {
  font-size: 0.9rem;
  color: #9ca3af;
}

/* ── 数字指标栏 ── */
.stats-bar {
  display: flex;
  align-items: center;
  max-width: 460px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  padding: 0.65rem 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 1.25rem;
  border: 1px solid rgba(34, 197, 94, 0.12);
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.stat-number {
  font-size: 1.05rem;
  font-weight: 700;
  color: #22c55e;
  white-space: nowrap;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.7rem;
  color: #6b7280;
  white-space: nowrap;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: #e5e7eb;
  flex-shrink: 0;
  margin: 0 0.25rem;
}

/* ── 热门标签 ── */
.hero-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tags-label {
  font-size: 0.82rem;
  color: #9ca3af;
  white-space: nowrap;
}

.hero-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: white;
  border: 1px solid #d1fae5;
  color: #15803d;
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.hero-tag:hover {
  background: #dcfce7;
  border-color: #22c55e;
  color: #15803d;
}

/* ── 响应式 ── */
@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem 2.5rem;
  }
  .hero-illus { display: none; }
  .hero {
    background-position: left, center bottom !important;
    background-size: auto, 120% auto !important;
    min-height: auto;
  }

  /* 移动端 2x2 网格 */
  .stats-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
    max-width: 100%;
    padding: 0.75rem;
  }
  .stat-divider { display: none; }
  .stat-item { padding: 0.25rem 0; }
}
</style>
