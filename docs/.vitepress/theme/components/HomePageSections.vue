<template>
  <div class="home-page-wrap">
    <iframe
      class="home-page-frame"
      :src="withBase('/_-_ (1).html')"
      title="熊猫知识中心首页"
    />
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<style scoped>
.home-page-wrap {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  background: #faf9f5;
}

.home-page-frame {
  width: 100%;
  height: 100%;
  display: block;
  border: 0;
  background: #faf9f5;
}

:global(.VPNav),
:global(.cf-wrap) {
  display: none !important;
}
</style>
