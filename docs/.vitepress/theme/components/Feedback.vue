<template>
  <!-- 文档底部反馈组件，通过 doc-after slot 自动插入每篇文档 -->
  <div class="feedback-wrap">
    <Transition name="fade" mode="out-in">
      <div v-if="!submitted" key="btns" class="feedback-inner">
        <p class="feedback-q">这篇文档对你有帮助吗？</p>
        <div class="feedback-btns">
          <button class="fb-btn" @click="submit(true)">👍 有帮助</button>
          <button class="fb-btn" @click="submit(false)">👎 没帮助</button>
        </div>
      </div>
      <div v-else key="thanks" class="feedback-thanks">
        <span>{{ liked ? '🎉' : '📝' }}</span>
        感谢你的反馈！{{ liked ? '很高兴这篇文档对你有所帮助 😊' : '我们会继续改进内容。' }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const submitted = ref(false)
const liked = ref(false)
function submit(v: boolean) { liked.value = v; submitted.value = true }
</script>

<style scoped>
.feedback-wrap {
  margin-top: 2.5rem;
  padding: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.feedback-q {
  margin: 0 0 1rem;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
}

.feedback-btns {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.fb-btn {
  padding: 0.45rem 1.2rem;
  border-radius: 8px;
  border: 1.5px solid #d1fae5;
  background: white;
  color: #15803d;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
}

.fb-btn:hover {
  background: #f0fdf4;
  border-color: #22c55e;
  transform: translateY(-1px);
}

.feedback-thanks {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.fade-enter-active, .fade-leave-active { transition: opacity .3s, transform .3s; }
.fade-enter-from { opacity: 0; transform: translateY(6px); }
.fade-leave-to   { opacity: 0; transform: translateY(-6px); }
</style>
