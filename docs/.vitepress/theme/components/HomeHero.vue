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

        <div class="hero-actions">
          <a :href="withBase('/guide/platform-quickstart')" class="hero-btn hero-btn-primary">新手上手</a>
          <a :href="withBase('/faq/personal/')" class="hero-btn hero-btn-secondary">常见问题</a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

function openSearch() {
  const btn = document.querySelector<HTMLElement>('.DocSearch-Button, .vp-local-search-button')
  btn?.click()
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - 64px);
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

.hero-inner::before {
  content: '';
  position: absolute;
  inset: -120px -24px -110px -24px;
  background:
    linear-gradient(90deg, rgba(247,251,248,0.98) 0%, rgba(247,251,248,0.88) 33%, rgba(247,251,248,0.42) 58%, rgba(247,251,248,0.05) 100%),
    radial-gradient(circle at 82% 62%, rgba(187,247,208,0.22), transparent 38%);
  pointer-events: none;
  z-index: -1;
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 24px 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-copy {
  max-width: 620px;
  width: 100%;
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
  margin: 0 auto 28px;
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
  margin: 0 auto;
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

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 22px;
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

@media (max-width: 768px) {
  .hero {
    min-height: auto;
  }

  .hero-inner {
    padding: 48px 24px 56px;
  }

  .hero-inner::before {
    background:
      linear-gradient(180deg, rgba(247,251,248,0.98) 0%, rgba(247,251,248,0.92) 48%, rgba(247,251,248,0.3) 76%, rgba(247,251,248,0.08) 100%);
  }

  .hero-desc {
    font-size: 16px;
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

}
</style>
