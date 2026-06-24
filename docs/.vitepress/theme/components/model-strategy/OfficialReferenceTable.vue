<template>
  <section id="official-data" class="content-section">
    <div class="section-title"><span>官方参数</span><h2>官方模型数据表</h2></div>
    <p class="disclaimer">以下数据应以模型厂商官方文档为准，熊猫知识中心仅做整理和选型辅助。标记“待补充”的字段不会参与确定性结论。</p>
    <p v-if="query && !matched.length" class="filter-note">“{{ query }}”没有直接匹配到当前模型类型，已显示该类型全部模型。</p>
    <div class="table-filter"><label>模型类型<select v-model="activeType"><option value="all">全部模型</option><option v-for="item in typeOptions" :key="item.value" :value="item.value">{{ item.label }}</option></select></label><span>共 {{ filtered.length }} 个模型</span></div>
    <div class="desktop-table">
      <table><thead><tr><th>模型</th><th>厂商</th><th>模型类型</th><th>官方定位</th><th>上下文</th><th>最大输出</th><th>输入价格</th><th>输出价格</th><th>缓存价格</th><th>图片</th><th>工具</th><th>结构化</th><th>计费单位</th><th>官方参考</th></tr></thead>
      <tbody><tr v-for="model in filtered" :key="model.id">
        <td><strong>{{ model.displayName }}</strong></td><td>{{ model.provider }}</td><td>{{ typeLabel(model.modelType) }}</td><td>{{ model.officialPositioning }}</td>
        <td><Value :value="model.contextWindow" /></td><td><Value :value="model.maxOutputTokens" /></td>
        <td><Value :value="model.inputPricePerMTok" /></td><td><Value :value="model.outputPricePerMTok" /></td>
        <td><Value :value="model.cachedInputPricePerMTok" /></td><td><Value :value="model.supportsVision" /></td>
        <td><Value :value="model.supportsToolCalling" /></td><td><Value :value="model.supportsStructuredOutput" /></td><td>{{ model.priceUnit }}</td>
        <td><div class="sources"><a v-for="source in model.officialSourceUrls" :key="source.label" :href="source.url" target="_blank" rel="noopener">{{ source.label }}</a></div></td>
      </tr></tbody></table>
    </div>
    <div class="mobile-cards">
      <article v-for="model in filtered" :key="model.id"><h3>{{ model.displayName }}</h3><p>{{ model.provider }} · {{ model.modelFamily }}</p>
        <dl><template v-for="[label, value] in mobileFields(model)" :key="label"><dt>{{ label }}</dt><dd><Value :value="value" /></dd></template></dl>
        <div class="sources"><a v-for="source in model.officialSourceUrls" :key="source.label" :href="source.url" target="_blank" rel="noopener">{{ source.label }}</a></div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, defineComponent, h, ref } from 'vue'
import { modelsData, pendingText, type ModelData } from '../../data/modelsData'
const props = defineProps<{ query: string }>()
const activeType = ref('text')
const typeOptions = [
  { label:'文本 / 理解', value:'text' }, { label:'生图', value:'image-generation' }, { label:'生视频', value:'video-generation' },
  { label:'音频 / 配音', value:'audio' }, { label:'Embedding / Rerank', value:'retrieval' },
]
const typeLabel = (type: string) => ({text:'文本模型','vision-understanding':'多模态理解','image-generation':'生图模型','video-generation':'生视频模型',audio:'音频模型',tts:'TTS 配音',asr:'ASR 识别',embedding:'Embedding',rerank:'Rerank'}[type] || type)
const matchesType = (model: ModelData) => activeType.value === 'all' ||
  (activeType.value === 'text' && ['text','vision-understanding'].includes(model.modelType)) ||
  (activeType.value === 'audio' && ['audio','tts','asr'].includes(model.modelType)) ||
  (activeType.value === 'retrieval' && ['embedding','rerank'].includes(model.modelType)) ||
  model.modelType === activeType.value
const typeModels = computed(() => modelsData.filter((model) => matchesType(model)))
const matched = computed(() => typeModels.value.filter((model) => JSON.stringify(model).toLowerCase().includes(props.query.toLowerCase())))
const filtered = computed(() => matched.value.length || !props.query ? matched.value : typeModels.value)
const Value = defineComponent({ props: { value: [String, Boolean] }, setup(p) { return () => h('span', { class: p.value === pendingText ? 'pending' : '' }, p.value === true ? '支持' : p.value === false ? '不支持' : String(p.value)) } })
const mobileFields = (m: ModelData) => [['模型类型',typeLabel(m.modelType)],['官方定位',m.officialPositioning],['上下文',m.contextWindow],['最大输出',m.maxOutputTokens],['输入价格',m.inputPricePerMTok],['输出价格',m.outputPricePerMTok],['图片理解',m.supportsVision],['工具调用',m.supportsToolCalling],['结构化输出',m.supportsStructuredOutput],['计费单位',m.priceUnit]] as [string, string | boolean][]
</script>
<style scoped>
.content-section{padding:70px 0}.section-title{text-align:center}.section-title span{font-size:12px;font-weight:800;color:#15803d}.section-title h2{margin:5px 0 18px;font-size:30px}.disclaimer{padding:13px 16px;border-left:4px solid #22c55e;border-radius:9px;background:#f0fdf4;color:#475569;font-size:13px}.table-filter{display:flex;justify-content:space-between;align-items:center;margin:12px 0}.table-filter label{display:flex;align-items:center;gap:8px;color:#475569;font-size:12px;font-weight:750}.table-filter select{padding:7px 28px 7px 9px;border:1px solid #d1d5db;border-radius:9px;background:white}.table-filter span{color:#64748b;font-size:11px}.desktop-table{overflow:auto;border:1px solid #d1fae5;border-radius:17px;background:rgba(255,255,255,.82)}table{width:100%;min-width:1450px;border-collapse:collapse;font-size:12px}th,td{padding:11px 10px;border-bottom:1px solid #e5e7eb;text-align:left;vertical-align:top}th{position:sticky;top:0;background:#f0fdf4;color:#166534}td:nth-child(4){min-width:180px}.sources{display:flex;flex-wrap:wrap;gap:5px}.sources a{padding:4px 7px;border:0!important;border-radius:7px;background:#dcfce7;color:#166534!important;font-size:10px;font-weight:750}.mobile-cards{display:none}.mobile-cards article{padding:17px;border:1px solid #d1fae5;border-radius:16px;background:white}.mobile-cards h3{margin:0}.mobile-cards p{margin:4px 0 12px;color:#64748b;font-size:12px}.mobile-cards dl{display:grid;grid-template-columns:110px 1fr;margin:0}.mobile-cards dt,.mobile-cards dd{margin:0;padding:7px 0;border-bottom:1px solid #f1f5f9;font-size:12px}.mobile-cards dt{color:#64748b}.mobile-cards .sources{margin-top:12px}:deep(.pending){display:inline-block;padding:3px 6px;border-radius:6px;background:#f1f5f9;color:#94a3b8;font-size:10px}@media(max-width:720px){.desktop-table{display:none}.mobile-cards{display:grid;gap:12px}.content-section{padding:52px 0}}
.filter-note{margin:10px 0;padding:9px 12px;border-radius:9px;background:#fff7ed;color:#9a3412;font-size:12px}
</style>
