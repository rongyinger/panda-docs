<template>
  <section id="recommendation-formula" class="formula glass-green-card">
    <div><span>推荐算法说明</span><h2>透明、可解释的本地评分</h2><p>推荐器不调用后端，也不把策略评分包装成官方结论。缺失的官方字段显示“待补充”，平台实测数据不足时采用中性分。</p></div>
    <div class="weights"><article v-for="item in weights" :key="item.label"><b>{{ item.value }}</b><strong>{{ item.label }}</strong><p>{{ item.desc }}</p></article></div>
    <div class="process"><span>用户约束</span><i>→</i><span>场景权重</span><i>→</i><span>能力与成本评分</span><i>→</i><span>Top 3 + 风险提示</span></div>
  </section>
</template>
<script setup lang="ts">
const weights=[{value:'40%',label:'官方能力',desc:'定位、上下文、输出、多模态、工具与缓存'},{value:'25%',label:'场景匹配',desc:'代码、推理、中文、Agent、数据与视觉'},{value:'20%',label:'成本',desc:'输入、输出、缓存、批量与长上下文成本'},{value:'15%',label:'平台实测',desc:'延迟、错误率、限流、JSON 与长上下文成功率'}]
</script>
<style scoped>
.formula{margin:60px 0;padding:28px;border-radius:24px}.formula>div:first-child{text-align:center;max-width:760px;margin:auto}.formula>div:first-child span{color:#15803d;font-size:12px;font-weight:800}.formula h2{margin:5px 0 8px;font-size:28px}.formula>div:first-child p{color:#64748b}.weights{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:22px}.weights article{padding:16px;border:1px solid #d1fae5;border-radius:15px;background:rgba(255,255,255,.78)}.weights b{display:block;color:#16a34a;font-size:24px}.weights strong{font-size:13px}.weights p{margin:5px 0 0;color:#64748b;font-size:11px}.process{display:flex;align-items:center;justify-content:center;gap:9px;margin-top:18px;flex-wrap:wrap}.process span{padding:7px 10px;border-radius:9px;background:#ecfdf3;color:#166534;font-size:11px;font-weight:750}.process i{color:#86efac;font-style:normal}@media(max-width:750px){.weights{grid-template-columns:repeat(2,1fr)}}@media(max-width:450px){.weights{grid-template-columns:1fr}}
</style>
