<template>
  <a
    v-if="!isHome"
    class="return-home-button"
    :href="withBase('/')"
    aria-label="返回首页"
  >
    <span class="return-home-mark">⌂</span>
    <span>返回首页</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')
</script>
