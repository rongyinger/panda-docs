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
          汇总新手教程、工具接入、常见问题与 AI 使用经验，帮助你快速定位答案。
        </p>

        <div
          class="hero-search"
          role="button"
          tabindex="0"
          @click="openSearch"
          @keydown.enter.prevent="openSearch"
          @keydown.space.prevent="openSearch"
        >
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
    'linear-gradient(105deg, #f8faf9 0%, rgba(248,250,249,0.98) 44%, rgba(240,253,244,0.76) 68%, rgba(240,253,244,0.2) 100%)',
    `url(${withBase('hero-panda.png')})`,
  ].join(', '),
  backgroundPosition: 'left, right 46%',
  backgroundSize:     'auto, min(48vw, 620px) auto',
  backgroundRepeat:   'no-repeat, no-repeat',
  backgroundColor:    '#F8FAF9',
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
    linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px),
    radial-gradient(circle at 18% 25%, rgba(22, 163, 74, 0.08) 0%, transparent 30%);
  background-size: 88px 100%, auto;
  pointer-events: none;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(248,250,249,0) 0%, rgba(248,250,249,0.9) 100%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4.25rem 24px 3.5rem;
  display: grid;
  grid-template-columns: minmax(0, 0.94fr) minmax(260px, 0.86fr);
  align-items: center;
  gap: 2rem;
}

.hero-text {
  max-width: 560px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.9rem;
  padding: 0.28rem 0.75rem;
  border: 1px solid #BBF7D0;
  border-radius: 999px;
  background: rgba(240, 253, 244, 0.92);
  color: #065F46;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
}

.hero-title {
  margin: 0 0 1rem;
  font-size: clamp(2.55rem, 5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.08;
  color: #065F46;
  background: linear-gradient(135deg, #1F2937 0%, #065F46 52%, #16A34A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  margin: 0 0 1.5rem;
  font-size: 1.05rem;
  color: #1F2937;
  line-height: 1.75;
  max-width: 520px;
}

.hero-search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 520px;
  padding: 0.95rem 1.15rem;
  border-radius: 12px;
  border: 1px solid #BBF7D0;
  background: white;
  box-shadow: 0 16px 40px rgba(17, 24, 39, 0.07);
  cursor: pointer;
  transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
  margin-bottom: 1rem;
}

.hero-search:hover,
.hero-search:focus,
.hero-search:focus-visible {
  border-color: #16A34A;
  box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.12), 0 18px 40px rgba(17, 24, 39, 0.08);
  transform: translateY(-1px);
  outline: none;
}

.search-icon {
  width: 18px;
  height: 18px;
  color: #9ca3af;
  flex-shrink: 0;
}

.search-placeholder {
  font-size: 0.95rem;
  color: #6B7280;
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
  padding: 0.66rem 1.15rem;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease;
}

.hero-btn:hover {
  transform: translateY(-1px);
}

.hero-btn-primary {
  background: #065F46;
  color: white;
  box-shadow: 0 10px 24px rgba(6, 95, 70, 0.22);
}

.hero-btn-primary:hover {
  background: #064E3B;
}

.hero-btn-secondary {
  border: 1px solid #16A34A;
  background: rgba(255, 255, 255, 0.88);
  color: #065F46;
}

.hero-btn-secondary:hover {
  background: #F0FDF4;
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
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  color: #1F2937;
  font-size: 0.78rem;
  font-weight: 700;
}

.hero-quick {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.55rem;
  color: #6B7280;
  font-size: 0.84rem;
}

.hero-quick span {
  color: #065F46;
  font-weight: 700;
}

.hero-quick a {
  color: #1F2937;
  text-decoration: none;
  border-bottom: 1px solid rgba(22, 163, 74, 0.24);
}

.hero-quick a:hover {
  color: #16A34A;
}

.hero-visual {
  min-height: 330px;
  position: relative;
  opacity: 0.72;
}

.hero-leaf {
  position: absolute;
  width: 118px;
  height: 38px;
  border-radius: 100% 0 100% 0;
  background: linear-gradient(135deg, rgba(187, 247, 208, 0.65), rgba(22, 163, 74, 0.14));
  border: 1px solid rgba(22, 163, 74, 0.08);
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
    padding: 3rem 24px 2.75rem;
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
