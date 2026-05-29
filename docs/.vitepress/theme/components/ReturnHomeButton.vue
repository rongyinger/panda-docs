<template>
  <a
    :class="compact ? 'nav-home-link' : 'return-home-button'"
    :href="withBase('/')"
    aria-label="返回首页"
  >
    <span :class="compact ? 'nav-home-mark' : 'return-home-mark'">&#8962;</span>
    <span>&#36820;&#22238;&#39318;&#39029;</span>
  </a>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  compact?: boolean
}>()
</script>
