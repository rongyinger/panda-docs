<template>
  <!-- Hero 区：核心文案 + 搜索 + 主入口，右侧使用熊猫主题背景图 -->
  <section class="hero" :style="heroBg">
    <div class="hero-overlay" />

    <div class="hero-inner">
      <div class="hero-text">
        <span class="hero-eyebrow">熊猫算力知识库</span>
        <h1 class="hero-title">
          熊猫知识中心
        </h1>

        <p class="hero-desc">
          把上手教程、工具接入、常见问题和 AI 使用经验整理成清晰路径，帮助你更快找到答案。
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

        <div class="hero-metrics" aria-label="熊猫算力特点">
          <span>40+ 模型</span>
          <span>国内直连</span>
          <span>按量计费</span>
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
        <div class="hero-leaf leaf-one"></div>
        <div class="hero-leaf leaf-two"></div>
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
    'linear-gradient(105deg, #ffffff 0%, rgba(255,255,255,0.98) 43%, rgba(245,250,246,0.72) 65%, rgba(245,250,246,0.16) 100%)',
    `url(${withBase('hero-panda.png')})`,
  ].join(', '),
  backgroundPosition: 'left, right center',
  backgroundSize:     'auto, min(56vw, 730px) auto',
  backgroundRepeat:   'no-repeat, no-repeat',
  backgroundColor:    '#f8fbf7',
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
    linear-gradient(90deg, rgba(20, 83, 45, 0.045) 1px, transparent 1px),
    radial-gradient(circle at 18% 25%, rgba(22, 101, 52, 0.075) 0%, transparent 30%);
  background-size: 88px 100%, auto;
  pointer-events: none;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.86) 100%);
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
  background: rgba(247, 255, 249, 0.9);
  color: #15803d;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
}

.hero-title {
  margin: 0 0 1rem;
  font-size: clamp(2.35rem, 5vw, 4.45rem);
  font-weight: 800;
  line-height: 1.05;
  color: #14532d;
  background: linear-gradient(135deg, #111827 0%, #14532d 46%, #16a34a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  margin: 0 0 1.5rem;
  font-size: 1.05rem;
  color: #405046;
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
  border: 1px solid #dbeee0;
  background: white;
  box-shadow: 0 16px 40px rgba(17, 24, 39, 0.07);
  cursor: pointer;
  transition: all 0.25s;
  margin-bottom: 1rem;
}

.hero-search:hover {
  border-color: #22c55e;
  box-shadow: 0 20px 46px rgba(21, 128, 61, 0.12);
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
  margin-bottom: 1rem;
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
  background: #14532d;
  color: white;
  box-shadow: 0 10px 24px rgba(20, 83, 45, 0.22);
}

.hero-btn-primary:hover {
  background: #166534;
}

.hero-btn-secondary {
  border: 1px solid #dbeee0;
  background: rgba(255, 255, 255, 0.88);
  color: #14532d;
}

.hero-btn-secondary:hover {
  background: #f0fdf4;
  box-shadow: 0 8px 20px rgba(21, 128, 61, 0.1);
}

.hero-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-bottom: 1rem;
}

.hero-metrics span {
  padding: 0.32rem 0.62rem;
  border: 1px solid #e5efe7;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  color: #405046;
  font-size: 0.78rem;
  font-weight: 700;
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

.hero-leaf {
  position: absolute;
  width: 118px;
  height: 38px;
  border-radius: 100% 0 100% 0;
  background: linear-gradient(135deg, rgba(132, 204, 22, 0.36), rgba(21, 128, 61, 0.12));
  border: 1px solid rgba(21, 128, 61, 0.08);
  filter: blur(0.1px);
}

.leaf-one {
  right: 5%;
  top: 26px;
  transform: rotate(-18deg);
}

.leaf-two {
  right: 32%;
  bottom: 28px;
  transform: rotate(18deg);
  opacity: 0.72;
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
