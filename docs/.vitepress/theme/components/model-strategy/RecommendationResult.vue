<template>
  <section class="result-panel" aria-live="polite">
    <div class="result-heading">
      <div>
        <span class="eyebrow">实时判断</span>
      </div>
    </div>

    <div v-if="result.workflow" class="workflow-wrap">
      <div class="scheme-card primary">
        <div class="scheme-head"><span>主推方案</span></div>
        <div class="workflow-stages">
          <article>
            <b>01</b>
            <div>
              <strong>主推方案</strong>
              <p>{{ result.workflow.primary[0]?.models.map((model) => model.displayName).join(' / ') }}</p>
              <div class="source-links">
                <a
                  v-for="model in result.workflow.primary[0]?.models || []"
                  :key="model.id"
                  :href="model.officialSourceUrls[0]?.url"
                  target="_blank"
                  rel="noopener"
                >
                  {{ model.displayName }} 官方
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="scheme-card secondary">
        <div class="scheme-head"><span>备选方案</span></div>
        <div class="workflow-stages">
          <article>
            <b>02</b>
            <div>
              <strong>备选方案</strong>
              <p>{{ result.workflow.primary[1]?.models.map((model) => model.displayName).join(' / ') }}</p>
              <div class="source-links">
                <a
                  v-for="model in result.workflow.primary[1]?.models || []"
                  :key="model.id"
                  :href="model.officialSourceUrls[0]?.url"
                  target="_blank"
                  rel="noopener"
                >
                  {{ model.displayName }} 官方
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div v-else-if="result.top.length" class="single-wrap">
      <article class="model-card primary">
        <div class="card-top">
          <span class="rank-label">主推方案</span>
          <strong class="score">{{ result.top[0].total }}<small>/10</small></strong>
        </div>
        <h4>{{ result.top[0].model.displayName }}</h4>
        <p class="provider">{{ result.top[0].model.provider }} · {{ result.top[0].model.modelFamily }}</p>
        <div class="source-links">
          <a
            v-for="source in result.top[0].model.officialSourceUrls"
            :key="source.label"
            :href="source.url"
            target="_blank"
            rel="noopener"
          >
            {{ source.label }}
          </a>
        </div>
      </article>

      <article v-if="result.top[1]" class="model-card secondary">
        <div class="card-top">
          <span class="rank-label">备选方案</span>
          <strong class="score">{{ result.top[1].total }}<small>/10</small></strong>
        </div>
        <h4>{{ result.top[1].model.displayName }}</h4>
        <p class="provider">{{ result.top[1].model.provider }} · {{ result.top[1].model.modelFamily }}</p>
        <div class="source-links">
          <a
            v-for="source in result.top[1].model.officialSourceUrls"
            :key="source.label"
            :href="source.url"
            target="_blank"
            rel="noopener"
          >
            {{ source.label }}
          </a>
        </div>
      </article>
    </div>

    <div class="analysis-box">
      <strong>分析理由</strong>
      <ol>
        <li v-for="reason in analysisReasons" :key="reason">{{ reason }}</li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ result: any }>()

const analysisReasons = computed(() => {
  return Array.isArray(props.result?.reasonList) && props.result.reasonList.length
    ? props.result.reasonList
    : ['当前没有可展示的分析理由。']
})
</script>

<style scoped>
.result-panel{min-width:0}.result-heading{display:flex;align-items:flex-start;justify-content:flex-start;gap:16px;margin-bottom:18px}.eyebrow{font-size:12px;font-weight:800;color:#15803d;letter-spacing:.08em}.workflow-wrap,.single-wrap{display:grid;grid-template-columns:1fr 1fr;gap:14px}.scheme-card,.model-card{padding:18px;border-radius:18px;background:rgba(255,255,255,.84);box-shadow:0 14px 36px rgba(15,23,42,.05)}.scheme-card.primary,.model-card.primary{border:1px solid #4ade80;box-shadow:0 16px 42px rgba(22,163,74,.1)}.scheme-card.secondary,.model-card.secondary{border:1px solid #dbeafe}.scheme-head span,.rank-label{font-size:12px;font-weight:800;color:#166534}.card-top{display:flex;justify-content:space-between;align-items:center}.model-card h4{margin:12px 0 2px;font-size:20px}.score{color:#15803d;font-size:20px}.score small{font-size:11px;color:#94a3b8}.provider{margin:8px 0 12px;color:#64748b;font-size:12px}.workflow-stages{display:grid;gap:10px;margin-top:8px}.workflow-stages article{display:flex;gap:10px;padding:13px;border:1px solid #d1fae5;border-radius:13px;background:rgba(255,255,255,.8)}.workflow-stages article>b{display:grid;place-items:center;flex:0 0 29px;height:29px;border-radius:9px;background:#16a34a;color:white;font-size:10px}.workflow-stages strong{font-size:13px}.workflow-stages p{margin:4px 0;color:#334155;font-size:12px;line-height:1.65}.source-links{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}.source-links a{border:0!important;padding:5px 8px;border-radius:8px;background:#ecfdf3;color:#166534;font-size:11px}.analysis-box{margin-top:14px;padding:16px;border:1px solid #dbeafe;border-radius:16px;background:rgba(255,255,255,.76)}.analysis-box strong{font-size:14px}.analysis-box ol{margin:8px 0 0;padding-left:18px;color:#475569;font-size:12px;line-height:1.75}@media(max-width:760px){.workflow-wrap,.single-wrap{grid-template-columns:1fr}}
</style>
