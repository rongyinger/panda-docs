<template>
  <section id="selector" class="selector-shell glass-green-card">
    <div class="section-head">
      <div>
        <span class="kicker">本地规则引擎</span>
        <h2>模型选型助手</h2>
        <p>选场景，再点 1-2 个偏好。</p>
      </div>
      <div class="actions">
        <button class="secondary" @click="reset">重置</button>
        <button class="primary" @click="copyResult">{{ copied ? '已复制' : '复制结果' }}</button>
      </div>
    </div>

    <div class="simple-panel">
      <section class="simple-block">
        <div class="block-head">
          <span>问题 1</span>
          <h3>你要做什么？</h3>
        </div>
        <div class="scene-grid">
          <button
            v-for="item in scenarioCards"
            :key="item.id"
            type="button"
            class="scene-card"
            :class="{ active: simple.sceneId === item.id }"
            @click="simple.sceneId = item.id"
            :title="item.desc"
          >
            <strong>{{ item.title }}</strong>
          </button>
        </div>
      </section>

      <section class="simple-block">
        <div class="block-head">
          <span>问题 2</span>
          <h3>你最看重什么？</h3>
        </div>
        <div class="chip-row">
          <button
            v-for="item in priorityOptions"
            :key="item.value"
            type="button"
            class="chip"
            :class="{ active: simple.priorities.includes(item.value) }"
            @click="togglePriority(item.value)"
          >
            {{ item.label }}
          </button>
        </div>
      </section>

      <section class="simple-block simple-inline">
        <div class="inline-card">
        <div class="block-head">
          <span>问题 3</span>
          <h3>要稳定吗？</h3>
        </div>
          <div class="toggle-row">
            <label class="toggle"><input v-model="simple.enterprise" type="checkbox"><span>企业生产环境</span></label>
            <label class="toggle"><input v-model="simple.highConcurrency" type="checkbox"><span>需要高并发</span></label>
          </div>
        </div>

        <div class="inline-card">
        <div class="block-head">
          <span>问题 4</span>
          <h3>看哪种结果？</h3>
        </div>
          <div class="chip-row">
            <button
              v-for="item in recommendationModes"
              :key="item.value"
              type="button"
              class="chip"
              :class="{ active: simple.recommendationMode === item.value }"
              @click="simple.recommendationMode = item.value"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </section>
    </div>

    <RecommendationResult :result="result" />
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { modelsData } from '../../data/modelsData'
import { scenarioOptions } from '../../data/modelStrategyRules'
import { recommendModels, type SelectorState } from '../../utils/modelRecommendationEngine'
import RecommendationResult from './RecommendationResult.vue'

const sceneMap = {
  code: { title: '代码开发', desc: '写代码、改 Bug、重构、工具调用', match: ['代码生成', 'Bug 排查', '代码重构'] },
  rag: { title: '企业知识库', desc: 'RAG、制度问答、产品资料问答', match: ['知识库', 'RAG', '内部制度问答'] },
  support: { title: '客服机器人', desc: 'FAQ、工单、售后、升级判定', match: ['客服', '在线客服机器人'] },
  data: { title: '数据分析', desc: 'SQL、报表、指标解释、周报', match: ['数据分析', 'SQL 生成'] },
  agent: { title: 'AI Agent', desc: '多步任务、自动调用工具、自动化', match: ['Agent', '工具调用 Agent'] },
  comic: { title: 'AI 漫剧', desc: '脚本、角色图、图生视频、配音', match: ['AI 漫剧', '图生视频'] },
  image: { title: '生图', desc: '商品图、海报、角色图、局部重绘', match: ['文生图', '商品图生成'] },
  video: { title: '生视频', desc: '文生视频、图生视频、广告短片', match: ['文生视频', '产品展示视频'] },
  audio: { title: '配音音频', desc: 'TTS、字幕、语音转文字、角色配音', match: ['文本转语音', '角色配音'] },
  retrieval: { title: '向量检索', desc: 'Embedding、Rerank、召回精排', match: ['Embedding', 'Rerank', '知识库 Embedding'] },
} as const

const scenarioCards = Object.entries(sceneMap).map(([id, item]) => ({ id, ...item }))

const priorityOptions = [
  { label: '低成本', value: 'cost' },
  { label: '速度快', value: 'speed' },
  { label: '效果好', value: 'quality' },
  { label: '中文强', value: 'chinese' },
  { label: '长上下文', value: 'long-context' },
  { label: '稳定', value: 'stable' },
  { label: '工具调用', value: 'tools' },
  { label: '角色一致性', value: 'character' },
  { label: '图生视频', value: 'image-to-video' },
]

const recommendationModes = [
  { label: '自动判断', value: 'auto' as const },
  { label: '单模型推荐', value: 'single' as const },
  { label: '组合方案推荐', value: 'workflow' as const },
]

const defaults = {
  sceneId: 'code',
  priorities: ['quality'],
  enterprise: false,
  highConcurrency: false,
  recommendationMode: 'auto' as const,
}

const simple = reactive({ ...defaults })
const copied = ref(false)

function findScenarioId(sceneId: string) {
  const config = sceneMap[sceneId as keyof typeof sceneMap]
  const matched = scenarioOptions.find((item) => config.match.some((text) => item.name.includes(text) || item.group.includes(text)))
  return matched?.id || scenarioOptions[0].id
}

const primaryScenario = computed(() => scenarioOptions.find((item) => item.id === findScenarioId(simple.sceneId)) || scenarioOptions[0])

const secondaryScenarios = computed(() => {
  if (simple.sceneId === 'comic') {
    return scenarioOptions.filter((item) => ['文生图', '文生视频', '文本转语音'].some((text) => item.name.includes(text)))
  }
  if (simple.sceneId === 'rag') {
    return scenarioOptions.filter((item) => ['知识库 Embedding', 'Rerank 精排'].some((text) => item.name.includes(text)))
  }
  if (simple.sceneId === 'support') {
    return scenarioOptions.filter((item) => ['工单自动分类', '企业 FAQ 机器人'].some((text) => item.name.includes(text)))
  }
  return []
})

const selectorState = computed<SelectorState>(() => {
  const mustHaveCapabilities: string[] = []
  const creativeRequirements: string[] = []
  let contentType = '文本'
  let generationTask = '不需要生成图片/视频'
  let budget = '均衡'
  let speed = '均衡'
  let context = '中等：几千到几万字资料'
  let output = '中等回答'
  let stability = simple.enterprise ? '企业生产环境' : '团队内部使用'
  const wantsCost = simple.priorities.includes('cost')
  const wantsQuality = simple.priorities.includes('quality')
  const wantsSpeed = simple.priorities.includes('speed')
  const wantsLongContext = simple.priorities.includes('long-context')
  const wantsStable = simple.priorities.includes('stable')

  if (simple.sceneId === 'image') {
    contentType = '图片'
    generationTask = '需要生图'
  } else if (simple.sceneId === 'video') {
    contentType = '视频'
    generationTask = '需要生视频'
  } else if (simple.sceneId === 'audio') {
    contentType = '音频'
    generationTask = '需要配音'
  } else if (simple.sceneId === 'retrieval' || simple.sceneId === 'rag') {
    contentType = '向量检索'
  } else if (simple.sceneId === 'comic') {
    contentType = '多模态组合'
    generationTask = '需要完整 AI 漫剧工作流'
  }

  if (wantsCost && wantsQuality) budget = '省钱优先，兼顾效果'
  else if (wantsCost) budget = '极致省钱'
  else if (wantsQuality) budget = '效果优先'

  if (wantsSpeed) speed = '实时响应'
  if (wantsLongContext) context = '超长上下文：大型项目、知识库、多文档分析'
  if (wantsStable) stability = '企业生产环境'
  if (simple.priorities.includes('chinese')) creativeRequirements.push('中文文字准确')
  if (simple.priorities.includes('character')) creativeRequirements.push('角色一致性')
  if (simple.priorities.includes('image-to-video')) {
    generationTask = '需要图生视频'
    mustHaveCapabilities.push('image-to-video')
  }
  if (simple.priorities.includes('tools')) mustHaveCapabilities.push('tool-calling')

  if (simple.sceneId === 'agent' || simple.sceneId === 'code') mustHaveCapabilities.push('tool-calling')
  if (simple.sceneId === 'comic') {
    mustHaveCapabilities.push('character-consistency')
    creativeRequirements.push('风格一致性')
  }

  return {
    userType: '独立开发者',
    primaryScenarioId: primaryScenario.value.id,
    secondaryScenarioIds: secondaryScenarios.value.map((item) => item.id),
    budget,
    speed,
    context,
    output,
    stability,
    contentType,
    generationTask,
    creativeRequirements: [...new Set(creativeRequirements)],
    mustHaveCapabilities: [...new Set(mustHaveCapabilities)],
    recommendationMode: simple.recommendationMode,
    highConcurrency: simple.highConcurrency,
    enterprise: simple.enterprise,
    sceneHint: simple.sceneId as SelectorState['sceneHint'],
  }
})

const result = computed(() => recommendModels(modelsData, primaryScenario.value, secondaryScenarios.value, selectorState.value))

function togglePriority(value: string) {
  const index = simple.priorities.indexOf(value)
  if (index >= 0) {
    simple.priorities.splice(index, 1)
    return
  }
  if (simple.priorities.length >= 2) {
    simple.priorities.shift()
  }
  simple.priorities.push(value)
}

function reset() {
  Object.assign(simple, { ...defaults, priorities: [...defaults.priorities] })
}

async function copyResult() {
  const lines = [
    `场景：${sceneMap[simple.sceneId as keyof typeof sceneMap].title}`,
    `优先项：${simple.priorities.map((item) => priorityOptions.find((x) => x.value === item)?.label || item).join('、')}`,
    `结果模式：${result.value.mode === 'workflow' ? '组合方案' : '单模型'}`,
  ]

  if (result.value.workflow) {
    lines.push(...result.value.workflow.primary.map((stage: any) => `${stage.label}：${stage.models.map((model: any) => model.displayName).join(' / ')}`))
  } else {
    lines.push(...result.value.top.map((item: any, index: number) => `${index + 1}. ${item.model.displayName}（${item.total}/10）`))
  }

  lines.push(`成本提醒：${result.value.costAdvice}`)
  lines.push(`风险提醒：${result.value.riskWarning}`)

  await navigator.clipboard.writeText(lines.join('\n'))
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1600)
}
</script>

<style scoped>
.selector-shell{padding:28px;border-radius:26px}.section-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:20px}.section-head h2{margin:4px 0 6px;font-size:30px}.section-head p{margin:0;color:#64748b;line-height:1.6}.kicker{color:#15803d;font-size:12px;font-weight:800;letter-spacing:.08em}.actions{display:flex;gap:8px}.actions button{padding:10px 14px;border-radius:11px;font-weight:750;cursor:pointer}.primary{border:1px solid #15803d;background:#16a34a;color:white}.secondary{border:1px solid #d1d5db;background:white;color:#374151}.simple-panel{display:grid;gap:12px;margin-bottom:18px}.simple-block{padding:16px;border:1px solid #d1fae5;border-radius:20px;background:rgba(248,250,252,.76)}.block-head{margin-bottom:12px}.block-head span{font-size:11px;font-weight:800;color:#15803d}.block-head h3{margin:4px 0 0;font-size:18px}.scene-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.scene-card{min-height:56px;padding:12px;border:1px solid #d1d5db;border-radius:16px;background:white;text-align:center;cursor:pointer;transition:.18s}.scene-card strong{display:block;font-size:14px;color:#1f2937;line-height:1.3}.scene-card.active{border-color:#16a34a;background:#f0fdf4;box-shadow:0 10px 20px rgba(22,163,74,.12)}.chip-row{display:flex;flex-wrap:wrap;gap:8px}.chip{padding:9px 12px;border:1px solid #d1d5db;border-radius:999px;background:white;color:#475569;font-size:12px;font-weight:700;cursor:pointer;transition:.18s}.chip.active{border-color:#16a34a;background:#16a34a;color:white;box-shadow:0 8px 18px rgba(22,163,74,.18)}.simple-inline{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0;border:0;background:transparent}.inline-card{padding:16px;border:1px solid #d1fae5;border-radius:20px;background:rgba(248,250,252,.76)}.toggle-row{display:flex;flex-wrap:wrap;gap:16px}.toggle{display:flex;align-items:center;gap:8px;color:#334155;font-size:13px;font-weight:700}.toggle input{accent-color:#16a34a}@media(max-width:1120px){.scene-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:760px){.selector-shell{padding:18px}.section-head{display:block}.actions{margin-top:14px}.scene-grid,.simple-inline{grid-template-columns:1fr}}
</style>
