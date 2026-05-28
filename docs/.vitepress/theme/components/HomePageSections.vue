<template>
  <!-- 首页布局：Hero + 精选内容/快速教程双栏 + 页脚 -->
  <!-- index.md 通过 <HomePageSections /> 引用此组件 -->
  <div class="home-page-wrap">
    <HomeHero />
    <HomeLatest />
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
import HomeHero    from './HomeHero.vue'
import HomeLatest  from './HomeLatest.vue'
import HomeFooter  from './HomeFooter.vue'
</script>

<style scoped>
.home-page-wrap {
  /* 覆盖 VitePress page 布局的默认内边距 */
  margin-top: calc(-1 * var(--vp-nav-height, 64px));
  padding-top: var(--vp-nav-height, 64px);
  background: linear-gradient(180deg, #F7FBF8 0%, #FFFFFF 45%, #F7FAF8 100%);
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
