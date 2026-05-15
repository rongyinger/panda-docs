<template>
  <!-- 首页完整布局：Hero + 卡片 + 最新内容 + 页脚 -->
  <!-- index.md 通过 <HomePageSections /> 引用此组件 -->
  <div class="home-page-wrap">
    <HomeHero />
    <HomeCards />
    <HomeLatest />
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
import HomeHero   from './HomeHero.vue'
import HomeCards  from './HomeCards.vue'
import HomeLatest from './HomeLatest.vue'
import HomeFooter from './HomeFooter.vue'
</script>

<style scoped>
.home-page-wrap {
  /* 覆盖 VitePress page 布局的默认内边距 */
  margin-top: calc(-1 * var(--vp-nav-height, 64px));
  padding-top: var(--vp-nav-height, 64px);
  background: white;
  min-height: 100vh;
}
</style>
