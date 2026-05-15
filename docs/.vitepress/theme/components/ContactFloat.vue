<template>
  <div class="contact-float">
    <Transition name="panel-slide">
      <div v-if="expanded" class="contact-panel">
        <button class="close-btn" aria-label="关闭" @click="expanded = false">✕</button>
        <h4 class="panel-title">联系我们</h4>

        <div class="qr-placeholder">
          <div class="qr-box">
            <span class="qr-icon">📱</span>
            <span>二维码占位</span>
          </div>
          <p class="qr-label">微信扫码联系客服</p>
        </div>

        <div class="divider" />

        <div class="contact-item">
          <span class="contact-icon">📧</span>
          <a href="mailto:support@pandatoken.com">support@pandatoken.com</a>
        </div>
        <div class="contact-item">
          <span class="contact-icon">🌐</span>
          <a href="https://pandatoken.com" target="_blank" rel="noopener">pandatoken.com</a>
        </div>
      </div>
    </Transition>

    <button
      class="float-btn"
      :class="{ active: expanded }"
      :aria-label="expanded ? '关闭联系面板' : '联系我们'"
      @click="expanded = !expanded"
    >
      <span class="float-icon">{{ expanded ? '✕' : '💬' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)
</script>

<style scoped>
.contact-float {
  position: fixed;
  bottom: 2rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}

/* 悬浮按钮 */
.float-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(0, 212, 255, 0.4);
  background: linear-gradient(135deg, #0d1b2a, #1a2d45);
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.25), 0 0 0 0 rgba(0, 212, 255, 0);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.float-btn:hover,
.float-btn.active {
  box-shadow: 0 4px 24px rgba(0, 212, 255, 0.45), 0 0 0 4px rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.7);
  transform: scale(1.08);
}

.float-icon {
  font-size: 1.25rem;
  line-height: 1;
}

/* 展开面板 */
.contact-panel {
  background: var(--vp-c-bg-soft, #111827);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 14px;
  padding: 1.25rem;
  width: 220px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 212, 255, 0.05);
  position: relative;
}

.close-btn {
  position: absolute;
  top: 0.6rem;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--vp-c-text-3, #64748b);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.2rem;
  line-height: 1;
  transition: color 0.2s;
}
.close-btn:hover {
  color: var(--vp-c-brand-1, #00d4ff);
}

.panel-title {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #e2e8f0);
}

.qr-placeholder {
  text-align: center;
  margin-bottom: 0.75rem;
}

.qr-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  height: 100px;
  border: 2px dashed rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  color: var(--vp-c-text-3, #64748b);
  font-size: 0.78rem;
  background: rgba(0, 212, 255, 0.03);
}

.qr-icon {
  font-size: 2rem;
}

.qr-label {
  margin: 0.4rem 0 0;
  font-size: 0.78rem;
  color: var(--vp-c-text-3, #64748b);
}

.divider {
  height: 1px;
  background: var(--vp-c-divider, rgba(0, 212, 255, 0.12));
  margin: 0.75rem 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.82rem;
}

.contact-icon {
  flex-shrink: 0;
}

.contact-item a {
  color: var(--vp-c-brand-1, #00d4ff);
  text-decoration: none;
  word-break: break-all;
}
.contact-item a:hover {
  text-decoration: underline;
}

/* 面板动画 */
.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}
</style>
