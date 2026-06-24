<template>
  <div class="home-page-wrap">
    正在前往首页...
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { onMounted } from 'vue'

onMounted(() => {
  window.location.replace(withBase('/home/index.html'))
})
</script>

<style scoped>
.home-page-wrap {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  background: #faf9f5;
  display: grid;
  place-items: center;
  color: #065f46;
  font-size: 14px;
  font-weight: 700;
}

</style>
