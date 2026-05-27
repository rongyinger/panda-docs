<template>
  <!-- Hero 区：核心文案 + 搜索 + 主入口，右侧使用熊猫主题背景图 -->
  <section class="hero" :style="heroBg">
    <div class="hero-overlay" />

    <div class="hero-inner">
      <div class="hero-text">
        <span class="hero-eyebrow">PandaToken Knowledge Base</span>
        <h1 class="hero-title">
          熊猫知识中心
        </h1>

        <p class="hero-desc">
          汇集熊猫算力的上手教程、工具接入、常见问题和 AI 实用知识。先搜索问题，再按路径完成配置。
        </p>

        <div class="hero-search" @click="openSearch">
          <svg class="search-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.8"/>
            <path d="M15 15l-3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span class="search-placeholder">搜索教程、问题或关键词...</span>
        </div>

        <div class="hero-actions">
          <a :href="withBase('/guide/platform-quickstart')" class="hero-btn hero-btn-primary">新手上手</a>
          <a :href="withBase('/connect/chatbox')" class="hero-btn hero-btn-secondary">查看接入教程</a>
        </div>

        <div class="hero-quick">
          <span>常用入口</span>
          <a
            v-for="item in quickLinks"
            :key="item.text"
            :href="withBase(item.link)"
          >{{ item.text }}</a>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="bamboo-stem stem-one"></div>
        <div class="bamboo-stem stem-two"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const quickLinks = [
  { text: 'API Key', link: '/faq/how-to-create-apikey' },
  { text: 'Cursor', link: '/connect/cursor' },
  { text: 'Claude Code', link: '/connect/claude-code' },
  { text: '429 报错', link: '/faq/429-too-many-requests' },
]

const heroBg = computed(() => ({
  backgroundImage: [
    'linear-gradient(105deg, #ffffff 0%, rgba(255,255,255,0.96) 44%, rgba(240,253,244,0.62) 66%, rgba(240,253,244,0.18) 100%)',
    `url(${withBase('hero-panda.png')})`,
  ].join(', '),
  backgroundPosition: 'left, right center',
  backgroundSize:     'auto, min(58vw, 760px) auto',
  backgroundRepeat:   'no-repeat, no-repeat',
  backgroundColor:    '#f6fff8',
}))

function openSearch() {
  const btn = document.querySelector<HTMLElement>('.DocSearch-Button, .vp-local-search-button')
  btn?.click()
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 560px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(90deg, rgba(21, 128, 61, 0.05) 1px, transparent 1px),
    radial-gradient(circle at 18% 26%, rgba(34, 197, 94, 0.11) 0%, transparent 28%),
    radial-gradient(circle at 76% 78%, rgba(132, 204, 22, 0.12) 0%, transparent 26%);
  background-size: 74px 100%, auto, auto;
  pointer-events: none;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.72) 100%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5.5rem 2rem 4.5rem;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(280px, 1fr);
  align-items: center;
  gap: 3rem;
}

.hero-text {
  max-width: 560px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.9rem;
  padding: 0.28rem 0.75rem;
  border: 1px solid rgba(34, 197, 94, 0.22);
  border-radius: 999px;
  background: rgba(240, 253, 244, 0.86);
  color: #15803d;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
}

.hero-title {
  margin: 0 0 1rem;
  font-size: clamp(2.25rem, 5vw, 4.25rem);
  font-weight: 800;
  line-height: 1.05;
  color: #14532d;
  background: linear-gradient(135deg, #14532d 0%, #16a34a 72%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  margin: 0 0 1.5rem;
  font-size: 1.05rem;
  color: #36513d;
  line-height: 1.75;
  max-width: 520px;
}

.hero-search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 520px;
  padding: 0.95rem 1.15rem;
  border-radius: 10px;
  border: 1.5px solid #d1fae5;
  background: white;
  box-shadow: 0 14px 36px rgba(21, 128, 61, 0.11);
  cursor: pointer;
  transition: all 0.25s;
  margin-bottom: 1rem;
}

.hero-search:hover {
  border-color: #22c55e;
  box-shadow: 0 18px 42px rgba(21, 128, 61, 0.16);
  transform: translateY(-1px);
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #9ca3af;
  flex-shrink: 0;
}

.search-placeholder {
  font-size: 0.95rem;
  color: #9ca3af;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0.65rem 1.05rem;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}

.hero-btn:hover {
  transform: translateY(-1px);
}

.hero-btn-primary {
  background: #16a34a;
  color: white;
  box-shadow: 0 10px 22px rgba(22, 163, 74, 0.24);
}

.hero-btn-primary:hover {
  background: #15803d;
}

.hero-btn-secondary {
  border: 1px solid #d1fae5;
  background: rgba(255, 255, 255, 0.88);
  color: #14532d;
}

.hero-btn-secondary:hover {
  background: #f0fdf4;
  box-shadow: 0 8px 20px rgba(21, 128, 61, 0.1);
}

.hero-quick {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.55rem;
  color: #6b7280;
  font-size: 0.84rem;
}

.hero-quick span {
  color: #15803d;
  font-weight: 700;
}

.hero-quick a {
  color: #36513d;
  text-decoration: none;
  border-bottom: 1px solid rgba(34, 197, 94, 0.24);
}

.hero-quick a:hover {
  color: #15803d;
}

.hero-visual {
  min-height: 370px;
  position: relative;
}

.bamboo-stem {
  position: absolute;
  width: 18px;
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.42), transparent 18%),
    repeating-linear-gradient(180deg, #86efac 0 46px, #15803d 47px 50px);
  opacity: 0.52;
  box-shadow: 0 0 34px rgba(34, 197, 94, 0.12);
}

.stem-one {
  right: 18%;
  top: -14px;
  height: 430px;
  transform: rotate(7deg);
}

.stem-two {
  right: 8%;
  top: 34px;
  height: 330px;
  transform: rotate(-5deg);
}

@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    padding: 3.25rem 1.5rem 2.75rem;
  }
  .hero-visual { display: none; }
  .hero {
    background-position: left, center bottom !important;
    background-size: auto, 132% auto !important;
    min-height: auto;
  }
  .hero-actions {
    align-items: stretch;
  }
  .hero-btn {
    flex: 1 1 150px;
  }
}
</style>
