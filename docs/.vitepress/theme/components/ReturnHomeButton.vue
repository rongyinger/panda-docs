<template>
  <a
    :class="compact ? 'nav-home-link' : 'return-home-button'"
    :href="homeUrl"
    aria-label="????"
    @click.prevent="goHome"
  >
    <span :class="compact ? 'nav-home-mark' : 'return-home-mark'">&#8962;</span>
    <span>????</span>
  </a>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{
  compact?: boolean
}>()

const homeUrl = withBase('/')

function goHome() {
  window.location.href = homeUrl
}
</script>
