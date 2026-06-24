<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-backdrop" role="presentation" @click.self="$emit('close')">
        <section class="detail-modal" role="dialog" aria-modal="true" :aria-label="title">
          <button class="close" aria-label="关闭弹窗" @click="$emit('close')">×</button>
          <header>
            <span>{{ category || (isAnswerMode ? '模型策略文档' : '场景选型') }}</span>
            <h2>{{ title }}</h2>
            <p>{{ isAnswerMode ? '这里展示的是问题回答，不是模型推荐。' : recommendation.reason }}</p>
          </header>

          <template v-if="isAnswerMode">
            <div class="answer-body" v-html="formattedAnswer"></div>
          </template>

          <template v-else>
            <div v-if="suitable?.length" class="suitable">
              <strong>适用任务</strong>
              <span v-for="item in suitable" :key="item">{{ item }}</span>
            </div>

            <div class="modal-models">
              <article v-for="(item, index) in recommendation.models" :key="item.model.id">
                <div class="model-head">
                  <span>{{ labels[index] }}</span>
                  <b>{{ item.score }}<small>/10</small></b>
                </div>
                <h3>{{ item.model.displayName }}</h3>
                <p class="provider">{{ item.model.provider }} · {{ item.model.modelFamily }}</p>
                <p class="reason">匹配 {{ recommendation.priorities.slice(0, 3).join('、') }}；适合 {{ item.model.recommendedScenarios.join('、') }}。</p>
                <div class="sources">
                  <a v-for="source in item.model.officialSourceUrls" :key="source.label" :href="source.url" target="_blank" rel="noopener">{{ source.label }}</a>
                </div>
              </article>
            </div>

            <div class="modal-notes">
              <div class="cost"><strong>成本提醒</strong><p>{{ recommendation.costAdvice }}</p></div>
              <div class="risk"><strong>风险提醒</strong><p>{{ recommendation.riskWarning }}</p></div>
            </div>
          </template>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { recommendForTopic } from '../../utils/topicRecommendationEngine'

const props = defineProps<{
  open: boolean
  title: string
  category?: string
  suitable?: string[]
  priorities?: string[]
  answer?: string
}>()

defineEmits<{ close: [] }>()

const labels = ['首选模型', '备选模型', '成本/能力备选']
const isAnswerMode = computed(() => Boolean(props.answer))
const recommendation = computed(() => recommendForTopic(props.title, props.category, props.priorities || []))
const formattedAnswer = computed(() => (props.answer || '').replace(/\n/g, '<br><br>'))

watch(() => props.open, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-backdrop{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px;background:rgba(15,23,42,.34);backdrop-filter:blur(8px)}.detail-modal{position:relative;width:min(940px,100%);max-height:min(820px,calc(100vh - 48px));overflow:auto;padding:28px;border:1px solid rgba(255,255,255,.88);border-radius:26px;background:linear-gradient(145deg,rgba(255,255,255,.96),rgba(239,250,245,.94));box-shadow:0 40px 100px rgba(15,23,42,.25);color:#1b2a3a}.close{position:absolute;top:16px;right:18px;width:34px;height:34px;border:1px solid #dbe4e0;border-radius:50%;background:white;color:#64748b;font-size:22px;cursor:pointer}.detail-modal header>span{color:#128a64;font-size:11px;font-weight:800}.detail-modal header h2{margin:5px 44px 7px 0;font-size:28px}.detail-modal header p{margin:0;color:#64748b;font-size:13px;line-height:1.7}.answer-body{margin-top:18px;padding:20px;border:1px solid #d1fae5;border-radius:18px;background:rgba(255,255,255,.82);color:#334155;font-size:14px;line-height:1.85}.suitable{display:flex;flex-wrap:wrap;align-items:center;gap:7px;margin:18px 0}.suitable strong{font-size:12px}.suitable span{padding:5px 8px;border-radius:8px;background:#eef4f4;color:#51647b;font-size:11px}.modal-models{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.modal-models article{padding:17px;border:1px solid #d1fae5;border-radius:17px;background:rgba(255,255,255,.84)}.modal-models article:first-child{border-color:#4ade80;box-shadow:0 12px 30px rgba(18,138,100,.1)}.model-head{display:flex;justify-content:space-between;align-items:center}.model-head span{color:#0c6e50;font-size:11px;font-weight:800}.model-head b{color:#128a64;font-size:18px}.model-head small{font-size:9px;color:#94a3b8}.modal-models h3{margin:12px 0 2px;font-size:17px}.provider{margin:0;color:#8a9bae;font-size:11px}.reason{min-height:62px;margin:12px 0;color:#51647b;font-size:11px;line-height:1.65}.sources{display:flex;flex-wrap:wrap;gap:5px}.sources a{padding:4px 7px;border-radius:7px;background:#e8f7f1;color:#0c6e50;font-size:9px;text-decoration:none}.modal-notes{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.modal-notes>div{padding:14px;border-radius:13px}.modal-notes strong{font-size:12px}.modal-notes p{margin:5px 0 0;color:#51647b;font-size:11px;line-height:1.65}.cost{border:1px solid #fde68a;background:#fffdf5}.risk{border:1px solid #fecaca;background:#fff7f7}.modal-enter-active,.modal-leave-active{transition:opacity .2s}.modal-enter-from,.modal-leave-to{opacity:0}@media(max-width:720px){.modal-backdrop{padding:12px}.detail-modal{padding:20px;max-height:calc(100vh - 24px)}.modal-models,.modal-notes{grid-template-columns:1fr}.reason{min-height:0}}
</style>
