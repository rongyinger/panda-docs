<template>
  <section id="enterprise-scenarios" class="content-section">
    <div class="section-title"><span>业务视角</span><h2>企业真实场景选型</h2><p>点击场景卡片，查看推荐模型、匹配理由和官方依据。</p></div>
    <div class="scenario-grid">
      <article
        v-for="item in filtered"
        :key="item.title"
        class="scenario-card glass-green-card"
        tabindex="0"
        role="button"
        @click="selected = item"
        @keydown.enter="selected = item"
      >
        <div class="card-title"><h3>{{ item.title }}</h3><span>{{ item.type }}</span></div>
        <strong>适合</strong><div class="chips"><i v-for="tag in item.suitable" :key="tag">{{ tag }}</i></div>
        <strong>优先指标</strong><ul><li v-for="priority in item.priorities" :key="priority">{{ priority }}</li></ul>
        <b class="open-tip">查看推荐 →</b>
      </article>
    </div>
    <StrategyDetailModal
      :open="Boolean(selected)"
      :title="selected?.title || ''"
      :category="selected?.type || ''"
      :suitable="selected?.suitable || []"
      :priorities="selected?.priorities || []"
      @close="selected = null"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { enterpriseScenarios } from '../../data/modelStrategyRules'
import StrategyDetailModal from './StrategyDetailModal.vue'

const props = defineProps<{ query: string }>()
const filtered = computed(() => enterpriseScenarios.filter((item) => JSON.stringify(item).toLowerCase().includes(props.query.toLowerCase())))
const selected = ref<(typeof enterpriseScenarios)[number] | null>(null)
</script>

<style scoped>
.content-section{padding:70px 0}.section-title{text-align:center;margin-bottom:26px}.section-title span{font-size:12px;font-weight:800;color:#15803d}.section-title h2{margin:5px 0 7px;font-size:30px}.section-title p{margin:0;color:#64748b}.scenario-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}.scenario-card{padding:19px 19px 42px;border-radius:18px;cursor:pointer}.scenario-card:hover,.scenario-card:focus-visible{transform:translateY(-4px);outline:none}.card-title{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}.card-title h3{margin:0;font-size:17px}.card-title span{padding:4px 7px;border-radius:999px;background:#dcfce7;color:#166534;font-size:11px;font-weight:800}.scenario-card strong{display:block;margin-top:14px;color:#475569;font-size:11px}.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}.chips i{padding:4px 7px;border-radius:7px;background:#f1f5f9;color:#475569;font-size:11px;font-style:normal}.scenario-card ul{display:flex;flex-wrap:wrap;gap:6px;margin:7px 0 0;padding:0;list-style:none}.scenario-card li{font-size:11px;color:#166534}.open-tip{position:absolute;right:17px;bottom:15px;color:#128a64;font-size:10px}@media(max-width:850px){.scenario-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.scenario-grid{grid-template-columns:1fr}.content-section{padding:52px 0}}
</style>
