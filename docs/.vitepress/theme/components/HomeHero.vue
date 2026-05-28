<template>
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-copy">
        <span class="hero-badge">熊猫算力官方知识库</span>
        <h1 class="hero-title">熊猫知识中心</h1>
        <p class="hero-desc">
          从创建 API Key、工具接入到常见报错处理，帮你快速找到可执行的答案。
        </p>

        <div
          class="hero-search"
          role="button"
          tabindex="0"
          @click="openSearch"
          @keydown.enter.prevent="openSearch"
          @keydown.space.prevent="openSearch"
        >
          <svg class="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.8"/>
            <path d="M15 15l-3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span class="search-placeholder">搜索 API Key、Cursor、429 报错...</span>
          <span class="search-kbd">Ctrl K</span>
        </div>

        <div class="hero-quick">
          <a
            v-for="item in quickLinks"
            :key="item.text"
            :href="withBase(item.link)"
          >{{ item.text }}</a>
        </div>

        <div class="hero-actions">
          <a :href="withBase('/guide/platform-quickstart')" class="hero-btn hero-btn-primary">新手上手</a>
          <a :href="withBase('/connect/chatbox')" class="hero-btn hero-btn-secondary">查看接入教程</a>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="panda-glow"></div>
        <img :src="pandaImage" alt="" class="hero-panda" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const pandaImage = computed(() => withBase('hero-panda.png'))

const quickLinks = [
  { text: 'API Key', link: '/faq/how-to-create-apikey' },
  { text: 'Cursor', link: '/connect/cursor' },
  { text: 'Claude Code', link: '/connect/claude-code' },
  { text: '429 报错', link: '/faq/429-too-many-requests' },
]

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
  background:
    radial-gradient(circle at 18% 18%, rgba(22, 163, 74, 0.08), transparent 30%),
    radial-gradient(circle at 82% 25%, rgba(6, 95, 70, 0.08), transparent 26%),
    linear-gradient(180deg, #F7FBF8 0%, #FFFFFF 54%, #F7FAF8 100%);
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(90deg, rgba(17, 24, 39, 0.035) 1px, transparent 1px),
    linear-gradient(rgba(17, 24, 39, 0.028) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(180deg, rgba(0,0,0,0.7), transparent 76%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 24px 64px;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(480px, 1.08fr);
  align-items: center;
  gap: 56px;
}

.hero-copy {
  max-width: 620px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  margin-bottom: 18px;
  padding: 7px 12px;
  border: 1px solid rgba(229, 231, 235, 0.9);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  color: #065F46;
  font-size: 13px;
  font-weight: 650;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.hero-title {
  margin: 0 0 18px;
  color: #111827;
  font-size: clamp(44px, 5.2vw, 56px);
  font-weight: 760;
  line-height: 1.1;
  letter-spacing: 0;
}

.hero-desc {
  max-width: 560px;
  margin: 0 0 28px;
  color: #4B5563;
  font-size: 18px;
  line-height: 1.72;
}

.hero-search {
  width: min(100%, 560px);
  height: 56px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px 0 18px;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  background: rgba(255,255,255,0.94);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.hero-search:hover,
.hero-search:focus-visible {
  border-color: rgba(22, 163, 74, 0.42);
  box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1), 0 22px 50px rgba(15, 23, 42, 0.1);
  transform: translateY(-1px);
  outline: none;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #9CA3AF;
  flex: 0 0 auto;
}

.search-placeholder {
  flex: 1;
  min-width: 0;
  color: #6B7280;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-kbd {
  flex: 0 0 auto;
  padding: 4px 8px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: #F9FAFB;
  color: #9CA3AF;
  font-size: 12px;
  font-weight: 650;
}

.hero-quick {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 24px;
}

.hero-quick a {
  padding: 6px 10px;
  border: 1px solid rgba(229, 231, 235, 0.9);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: #4B5563;
  font-size: 13px;
  font-weight: 550;
  text-decoration: none;
  transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
}

.hero-quick a:hover,
.hero-quick a:focus-visible {
  border-color: rgba(22, 163, 74, 0.38);
  background: #ECFDF3;
  color: #065F46;
  outline: none;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease;
}

.hero-btn:hover,
.hero-btn:focus-visible {
  transform: translateY(-1px);
  outline: none;
}

.hero-btn-primary {
  border: 1px solid #065F46;
  background: #065F46;
  color: #fff;
  box-shadow: 0 12px 26px rgba(6, 95, 70, 0.18);
}

.hero-btn-primary:hover,
.hero-btn-primary:focus-visible {
  background: #064E3B;
  box-shadow: 0 16px 32px rgba(6, 95, 70, 0.22);
}

.hero-btn-secondary {
  border: 1px solid #E5E7EB;
  background: rgba(255,255,255,0.86);
  color: #111827;
}

.hero-btn-secondary:hover,
.hero-btn-secondary:focus-visible {
  border-color: rgba(22, 163, 74, 0.35);
  background: #fff;
}

.hero-visual {
  position: relative;
  min-height: 540px;
  align-self: stretch;
  overflow: visible;
}

.panda-glow {
  position: absolute;
  inset: -4% -22% -6% -8%;
  border-radius: 48px;
  background:
    radial-gradient(circle at 70% 20%, rgba(187, 247, 208, 0.5), transparent 32%),
    radial-gradient(ellipse at 62% 86%, rgba(6,95,70,0.16), transparent 42%);
  filter: blur(4px);
  pointer-events: none;
}

.hero-panda {
  position: absolute;
  right: -170px;
  bottom: -74px;
  width: min(154%, 820px);
  max-height: 700px;
  object-fit: contain;
  filter: drop-shadow(0 30px 52px rgba(15, 23, 42, 0.18));
}

@media (max-width: 1024px) {
  .hero-inner {
    grid-template-columns: minmax(0, 1fr) minmax(340px, 0.95fr);
    gap: 32px;
  }

  .hero-visual {
    min-height: 470px;
  }

  .hero-panda {
    right: -150px;
    width: min(154%, 700px);
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    padding: 48px 24px 52px;
  }

  .hero-desc {
    font-size: 16px;
  }

  .hero-visual {
    order: 2;
  }

  .hero-visual {
    min-height: 360px;
    overflow: hidden;
  }

  .hero-panda {
    right: 50%;
    bottom: -24px;
    width: min(100%, 410px);
    transform: translateX(50%);
  }
}

@media (max-width: 520px) {
  .hero-actions {
    align-items: stretch;
  }

  .hero-btn {
    flex: 1 1 150px;
  }

  .search-kbd {
    display: none;
  }

  .hero-visual {
    min-height: 310px;
  }

  .hero-panda {
    width: min(108%, 360px);
  }
}
</style>
