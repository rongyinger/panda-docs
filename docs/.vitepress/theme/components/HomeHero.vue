<template>
  <!-- Hero 区：左侧文案 + 搜索 + 热词，右侧熊猫插画 -->
  <section class="hero" :style="heroBg">
    <!-- 左侧渐变遮罩，让文字清晰可读 -->
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

        <!-- 热门搜索标签 -->
        <div class="hero-tags">
          <span class="tags-label">热门搜索：</span>
          <a
            v-for="tag in hotTags"
            :key="tag.text"
            :href="tag.link"
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

// 热门搜索标签，修改 text/link 即可调整
const hotTags = [
  { text: 'API 连接',        link: '/connect/' },
  { text: '模型部署',        link: '/guide/' },
  { text: '计费说明',        link: '/faq/' },
  { text: 'Stable Diffusion', link: '/guide/quickstart' },
  { text: '显存优化',        link: '/faq/vram-issue' },
]

// Hero 背景：熊猫插画叠加渐变，右侧保留插画，左侧纯白方便读文字
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

// 触发 VitePress 内置搜索（点击导航栏中的搜索按钮）
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

/* 右侧占位，插画通过背景图已展示 */
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
  margin-bottom: 1.25rem;
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
}
</style>
