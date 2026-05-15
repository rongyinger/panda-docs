<template>
  <div class="feedback-wrap">
    <Transition name="fade" mode="out-in">
      <div v-if="!submitted" key="buttons" class="feedback-inner">
        <p class="feedback-question">这篇文章有帮助吗？</p>
        <div class="feedback-btns">
          <button class="fb-btn helpful" @click="submit(true)">
            <span class="fb-icon">👍</span> 有帮助
          </button>
          <button class="fb-btn not-helpful" @click="submit(false)">
            <span class="fb-icon">👎</span> 没帮助
          </button>
        </div>
      </div>
      <div v-else key="thanks" class="feedback-thanks">
        <span class="thanks-icon">{{ liked ? '🎉' : '📝' }}</span>
        <span class="thanks-text">
          感谢反馈！{{ liked ? '很高兴对您有所帮助 😊' : '我们会继续改进内容，感谢您的耐心。' }}
        </span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const submitted = ref(false)
const liked = ref(false)

function submit(isLiked: boolean) {
  liked.value = isLiked
  submitted.value = true
}
</script>

<style scoped>
.feedback-wrap {
  margin-top: 2.5rem;
  padding: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.feedback-question {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.feedback-btns {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.fb-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.fb-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}

.fb-icon {
  font-size: 1rem;
}

.feedback-thanks {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.thanks-icon {
  font-size: 1.25rem;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
