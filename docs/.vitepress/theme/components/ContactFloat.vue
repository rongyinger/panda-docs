<template>
  <!-- 右下角悬浮联系按钮 -->
  <div class="cf-wrap">
    <Transition name="panel">
      <div v-if="open" v-click-outside="close" class="cf-panel">
        <button class="cf-close" @click="close">✕</button>
        <p class="cf-panel-title">联系我们</p>

        <!-- 微信二维码占位 -->
        <div class="cf-qr">
          <div class="cf-qr-box">
            <span>📱</span>
            <span>微信扫码</span>
          </div>
          <p class="cf-qr-label">添加微信客服</p>
        </div>

        <div class="cf-divider" />

        <div class="cf-item">
          <span>📧</span>
          <a href="mailto:support@pandatoken.com">support@pandatoken.com</a>
        </div>
        <div class="cf-item">
          <span>🌐</span>
          <a href="https://pandatoken.com" target="_blank" rel="noopener">pandatoken.com</a>
        </div>
      </div>
    </Transition>

    <button class="cf-fab" :class="{ active: open }" @click="open = !open" aria-label="联系我们">
      <svg v-if="!open" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
      <span v-else style="font-size:1rem;line-height:1">✕</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
function close() { open.value = false }

// 简单的 click-outside 指令
const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    el._clickOutsideHandler = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) binding.value()
    }
    document.addEventListener('mousedown', el._clickOutsideHandler)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('mousedown', el._clickOutsideHandler)
  },
}
</script>

<style scoped>
.cf-wrap {
  position: fixed;
  bottom: 2rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}

/* 悬浮圆形按钮 */
.cf-fab {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #22c55e;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.35);
  transition: all 0.25s;
}

.cf-fab svg { width: 22px; height: 22px; }

.cf-fab:hover,
.cf-fab.active {
  background: #15803d;
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(34, 197, 94, 0.45);
}

/* 展开面板 */
.cf-panel {
  background: white;
  border: 1px solid #d1fae5;
  border-radius: 14px;
  padding: 1.25rem;
  width: 220px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
}

.cf-close {
  position: absolute;
  top: 0.6rem;
  right: 0.75rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 0.82rem;
  padding: 0.2rem;
  transition: color 0.2s;
}
.cf-close:hover { color: #22c55e; }

.cf-panel-title {
  margin: 0 0 0.9rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: #111827;
}

.cf-qr { text-align: center; margin-bottom: 0.75rem; }

.cf-qr-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  height: 90px;
  justify-content: center;
  border: 2px dashed #d1fae5;
  border-radius: 8px;
  font-size: 0.78rem;
  color: #9ca3af;
  background: #f9fafb;
}

.cf-qr-box span:first-child { font-size: 1.8rem; }
.cf-qr-label { margin: 0.35rem 0 0; font-size: 0.75rem; color: #9ca3af; }

.cf-divider { height: 1px; background: #f3f4f6; margin: 0.75rem 0; }

.cf-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.45rem;
  font-size: 0.8rem;
}

.cf-item a { color: #15803d; text-decoration: none; word-break: break-all; }
.cf-item a:hover { text-decoration: underline; }

/* 动画 */
.panel-enter-active, .panel-leave-active { transition: opacity .22s, transform .22s; }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateY(10px) scale(0.96); }
</style>
