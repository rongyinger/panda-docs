<template>
  <div class="update-badge" :class="isOutdated ? 'outdated' : 'fresh'">
    <span class="badge-icon">{{ isOutdated ? '⚠️' : '✅' }}</span>
    <span class="badge-text">
      <template v-if="isOutdated">
        内容可能已过期 · 更新于 {{ formattedDate }}（已超过 {{ daysSince }} 天）
      </template>
      <template v-else>
        更新于 {{ formattedDate }}
      </template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  date: string  // ISO 格式日期，如 "2026-01-15"
}>()

const daysSince = computed(() => {
  const updated = new Date(props.date)
  const now = new Date()
  return Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24))
})

const isOutdated = computed(() => daysSince.value > 90)

const formattedDate = computed(() =>
  new Date(props.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
)
</script>

<style scoped>
.update-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  font-size: 0.83rem;
  margin-bottom: 1.5rem;
  border: 1px solid transparent;
}

.update-badge.fresh {
  background: rgba(0, 255, 136, 0.07);
  border-color: rgba(0, 255, 136, 0.25);
  color: #00c96a;
}

.update-badge.outdated {
  background: rgba(255, 170, 0, 0.08);
  border-color: rgba(255, 170, 0, 0.3);
  color: #d97706;
}

.dark .update-badge.fresh {
  color: #00ff88;
}

.dark .update-badge.outdated {
  color: #fbbf24;
}

.badge-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.badge-text {
  line-height: 1.4;
}
</style>
