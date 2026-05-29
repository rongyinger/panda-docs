<template>
  <a
    :class="compact ? 'nav-home-link' : 'return-home-button'"
    href="/"
    aria-label="返回首页"
    @click.prevent="goHome"
  >
    <span :class="compact ? 'nav-home-mark' : 'return-home-mark'">&#8962;</span>
    <span>&#36820;&#22238;&#39318;&#39029;</span>
  </a>
</template>

<script setup lang="ts">
import { useRouter } from 'vitepress'

defineProps<{
  compact?: boolean
}>()

const router = useRouter()

function goHome() {
  router.go('/')
}
</script>
