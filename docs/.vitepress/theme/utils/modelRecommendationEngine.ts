import type { ModelData } from '../data/modelsData'
import type { ScenarioOption } from '../data/modelStrategyRules'

export interface SelectorState {
  userType: string
  primaryScenarioId: string
  secondaryScenarioIds: string[]
  budget: string
  speed: string
  context: string
  output: string
  stability: string
  contentType: string
  generationTask: string
  creativeRequirements: string[]
  mustHaveCapabilities: string[]
  recommendationMode: 'auto' | 'single' | 'workflow'
  highConcurrency: boolean
  enterprise: boolean
  sceneHint?: 'code' | 'rag' | 'support' | 'data' | 'agent' | 'comic' | 'image' | 'video' | 'audio' | 'retrieval'
}

interface RankedModel {
  model: ModelData
  total: number
  fitReasons: string[]
}

interface WorkflowStage {
  label: string
  reason: string
  models: ModelData[]
}

interface WorkflowAlternative {
  label: string
  reason: string
  models: ModelData[]
}

export interface RecommendationResult {
  mode: 'single' | 'workflow'
  title: string
  confidence: '高' | '中' | '低'
  confidenceReason: string
  top: RankedModel[]
  rejected: { model: ModelData; reason: string }[]
  reasonList: string[]
  costAdvice: string
  riskWarning: string
  avoidModels: string[]
  relatedArticles: string[]
  nextQuestions: string[]
  officialSources: { label: string; url: string }[]
  workflow: null | {
    title: string
    description: string
    primary: WorkflowStage[]
    alternatives: WorkflowAlternative[]
  }
}

type SceneType = 'text' | 'code' | 'support' | 'data' | 'agent' | 'comic' | 'image' | 'video' | 'audio' | 'retrieval'

const TEXT_MODEL_IDS = [
  'gpt-5.5',
  'gpt-5.4',
  'gpt-5.4-mini',
  'claude-opus-4.8',
  'claude-sonnet-4.6',
  'claude-haiku-4.5',
  'gemini-pro',
  'gemini-flash',
  'deepseek-v4-pro',
  'deepseek-v4-flash',
  'kimi-k2.6',
  'glm-5.1',
]

const IMAGE_MODEL_IDS = ['gpt-image', 'google-imagen']
const VIDEO_MODEL_IDS = ['sora', 'google-veo']
const AUDIO_MODEL_IDS = ['openai-tts', 'whisper', 'gemini-audio']
const EMBEDDING_MODEL_IDS = ['openai-embedding', 'gemini-embedding']

const makeMap = (models: ModelData[]) => new Map(models.map((item) => [item.id, item]))

function pick(models: ModelData[], ids: string[]) {
  const map = makeMap(models)
  return ids.map((id) => map.get(id)).filter(Boolean) as ModelData[]
}

function uniqueSources(models: ModelData[]) {
  const seen = new Set<string>()
  return models
    .flatMap((model) => model.officialSourceUrls)
    .filter((source) => {
      const key = `${source.label}-${source.url}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}

function inferScene(primaryScenario: ScenarioOption, state: SelectorState): SceneType {
  if (state.sceneHint) {
    if (state.sceneHint === 'rag') return 'retrieval'
    return state.sceneHint
  }

  if (state.generationTask.includes('漫剧')) return 'comic'
  if (state.generationTask.includes('生图') || state.contentType.includes('图片')) return 'image'
  if (state.generationTask.includes('生视频') || state.generationTask.includes('图生视频') || state.contentType.includes('视频')) return 'video'
  if (state.generationTask.includes('配音') || state.contentType.includes('音频')) return 'audio'
  if (state.contentType.includes('向量检索')) return 'retrieval'

  const sceneText = `${primaryScenario.group} ${primaryScenario.name}`.toLowerCase()
  if (sceneText.includes('客服')) return 'support'
  if (sceneText.includes('sql') || sceneText.includes('数据')) return 'data'
  if (sceneText.includes('agent')) return 'agent'
  if (sceneText.includes('代码') || sceneText.includes('开发')) return 'code'
  return 'text'
}

function shouldUseWorkflow(scene: SceneType, state: SelectorState) {
  if (state.recommendationMode === 'workflow') return true
  if (state.recommendationMode === 'single') return false
  return ['code', 'support', 'data', 'agent', 'comic', 'retrieval'].includes(scene)
}

function candidateIdsForScene(scene: SceneType) {
  switch (scene) {
    case 'image':
      return IMAGE_MODEL_IDS
    case 'video':
      return VIDEO_MODEL_IDS
    case 'audio':
      return AUDIO_MODEL_IDS
    case 'retrieval':
      return EMBEDDING_MODEL_IDS
    default:
      return TEXT_MODEL_IDS
  }
}

function applyPreferenceBoost(model: ModelData, scene: SceneType, state: SelectorState) {
  const c = model.capabilityScores
  let extra = 0
  const reasons: string[] = []

  if (state.budget.includes('省钱')) {
    extra += (c.cost ?? 5) * 0.8
    reasons.push('你勾选了低成本，因此成本权重被提高。')
  }

  if (state.budget.includes('效果')) {
    if (scene === 'image') extra += (c.imageQuality ?? 5) * 0.8
    else if (scene === 'video') extra += (c.videoQuality ?? 5) * 0.8
    else if (scene === 'audio') extra += (c.audioQuality ?? 5) * 0.8
    else if (scene === 'retrieval') extra += (c.retrieval ?? 5) * 0.8
    else extra += (c.reasoning ?? 5) * 0.8
    reasons.push('你勾选了效果优先，因此质量相关能力比价格更重要。')
  }

  if (state.speed.includes('实时')) {
    extra += (c.speed ?? 5) * 0.55
    reasons.push('你要求速度，因此响应速度被额外加权。')
  }

  if (state.enterprise || state.highConcurrency || state.stability.includes('企业')) {
    extra += (c.stability ?? 5) * 0.6
    reasons.push('你要求稳定或高并发，因此稳定性被额外加权。')
  }

  if (state.creativeRequirements.includes('角色一致性')) {
    extra += (c.characterConsistency ?? 5) * 0.65
    reasons.push('你要求角色一致性，因此连续一致性能力被额外加权。')
  }

  if (state.creativeRequirements.includes('中文文字准确')) {
    extra += (c.chinese ?? 5) * 0.45
    reasons.push('你要求中文表现，因此中文能力被额外加权。')
  }

  if (state.mustHaveCapabilities.includes('tool-calling')) {
    extra += model.supportsToolCalling === true ? 1.25 : -3
    reasons.push('你要求工具调用，因此不支持工具调用的模型会被明显降权。')
  }

  if (state.mustHaveCapabilities.includes('image-to-video')) {
    extra += model.generationModes.includes('image-to-video') ? 1.25 : -3
    reasons.push('你要求图生视频，因此不支持 image-to-video 的模型会被明显降权。')
  }

  return { extra, reasons }
}

function scoreForScene(model: ModelData, scene: SceneType, state: SelectorState) {
  const c = model.capabilityScores
  let base = 0
  const baseReasons: string[] = []

  switch (scene) {
    case 'image':
      base =
        (c.imageQuality ?? 5) * 0.38 +
        (c.styleControl ?? 5) * 0.24 +
        (c.characterConsistency ?? 5) * 0.16 +
        (c.textRendering ?? c.chinese ?? 5) * 0.12 +
        (c.cost ?? 5) * 0.1
      baseReasons.push('生图场景按画质、风格控制、角色一致性和文字表现排序。')
      break
    case 'video':
      base =
        (c.videoQuality ?? 5) * 0.4 +
        (c.motion ?? 5) * 0.24 +
        (c.characterConsistency ?? 5) * 0.16 +
        (c.stability ?? 5) * 0.1 +
        (c.cost ?? 5) * 0.1
      baseReasons.push('生视频场景按视频质量、动作自然度、连贯性和稳定性排序。')
      break
    case 'audio':
      base =
        (c.audioQuality ?? 5) * 0.42 +
        (c.speed ?? 5) * 0.18 +
        (c.stability ?? 5) * 0.2 +
        (c.cost ?? 5) * 0.2
      baseReasons.push('音频场景按音质、速度、稳定性和成本排序。')
      break
    case 'retrieval':
      base =
        (c.retrieval ?? 5) * 0.5 +
        (c.speed ?? 5) * 0.16 +
        (c.stability ?? 5) * 0.16 +
        (c.cost ?? 5) * 0.18
      baseReasons.push('检索场景按向量质量、检索速度、稳定性和成本排序。')
      break
    case 'support':
      base =
        (c.speed ?? 5) * 0.24 +
        (c.stability ?? 5) * 0.22 +
        (c.structuredOutput ?? 5) * 0.18 +
        (c.chinese ?? 5) * 0.16 +
        (c.cost ?? 5) * 0.2
      baseReasons.push('客服场景更看重速度、稳定、结构化输出和成本。')
      break
    case 'data':
      base =
        (c.dataAnalysis ?? 5) * 0.26 +
        (c.reasoning ?? 5) * 0.24 +
        (c.coding ?? 5) * 0.18 +
        (c.structuredOutput ?? 5) * 0.16 +
        (c.cost ?? 5) * 0.16
      baseReasons.push('数据分析场景更看重分析、推理、SQL/代码和结构化输出。')
      break
    case 'agent':
      base =
        (c.agent ?? 5) * 0.28 +
        (c.reasoning ?? 5) * 0.22 +
        (c.stability ?? 5) * 0.18 +
        (c.longContext ?? 5) * 0.16 +
        (c.cost ?? 5) * 0.16
      baseReasons.push('Agent 场景更看重规划、工具调用稳定性和长流程表现。')
      break
    case 'code':
      base =
        (c.coding ?? 5) * 0.28 +
        (c.reasoning ?? 5) * 0.22 +
        (c.longContext ?? 5) * 0.16 +
        (c.agent ?? 5) * 0.14 +
        (c.stability ?? 5) * 0.1 +
        (c.cost ?? 5) * 0.1
      baseReasons.push('代码场景更看重编码、推理、上下文长度和工具链稳定性。')
      break
    case 'comic':
      base =
        (c.reasoning ?? 5) * 0.2 +
        (c.characterConsistency ?? 5) * 0.24 +
        (c.styleControl ?? 5) * 0.18 +
        (c.videoQuality ?? c.imageQuality ?? 5) * 0.18 +
        (c.chinese ?? 5) * 0.1 +
        (c.cost ?? 5) * 0.1
      baseReasons.push('AI 漫剧场景更看重剧情能力、角色一致性、风格稳定和跨模态能力。')
      break
    default:
      base =
        (c.reasoning ?? 5) * 0.28 +
        (c.general ?? 5) * 0.2 +
        (c.chinese ?? 5) * 0.14 +
        (c.longContext ?? 5) * 0.14 +
        (c.stability ?? 5) * 0.12 +
        (c.cost ?? 5) * 0.12
      baseReasons.push('通用文本场景按推理、通用能力、中文、上下文和稳定性排序。')
  }

  const { extra, reasons } = applyPreferenceBoost(model, scene, state)
  return {
    score: Number(Math.max(0, Math.min(10, base + extra)).toFixed(1)),
    reasons: [...baseReasons, ...reasons].slice(0, 3),
  }
}

function buildWorkflow(models: ModelData[], scene: SceneType, state: SelectorState) {
  const costFirst = state.budget.includes('省钱')

  if (scene === 'code' || scene === 'agent' || scene === 'data') {
    return {
      title: '执行型工作流方案',
      description: '',
      primary: [
        {
          label: '主推方案',
          reason: '',
          models: pick(models, costFirst ? ['deepseek-v4-pro', 'glm-5.1', 'kimi-k2.6'] : ['gpt-5.4', 'claude-sonnet-4.6', 'glm-5.1']),
        },
        {
          label: '备选方案',
          reason: '',
          models: pick(models, costFirst ? ['deepseek-v4-flash', 'gpt-5.4-mini', 'gemini-flash'] : ['deepseek-v4-pro', 'gpt-5.4-mini', 'gemini-flash']),
        },
      ],
      alternatives: [],
    }
  }

  if (scene === 'support') {
    return {
      title: '客服型工作流方案',
      description: '',
      primary: [
        {
          label: '主推方案',
          reason: '',
          models: pick(models, costFirst ? ['deepseek-v4-flash', 'gpt-5.4-mini', 'gemini-flash'] : ['claude-sonnet-4.6', 'gpt-5.4', 'deepseek-v4-pro']),
        },
        {
          label: '备选方案',
          reason: '',
          models: pick(models, ['deepseek-v4-pro', 'gpt-5.4-mini', 'gemini-flash']),
        },
      ],
      alternatives: [],
    }
  }

  if (scene === 'retrieval') {
    return {
      title: '检索方案',
      description: '',
      primary: [
        {
          label: '主推方案',
          reason: '',
          models: pick(models, ['openai-embedding']),
        },
        {
          label: '备选方案',
          reason: '',
          models: pick(models, ['gemini-embedding']),
        },
      ],
      alternatives: [],
    }
  }

  if (scene === 'comic') {
    return {
      title: 'AI 漫剧工作流方案',
      description: '',
      primary: [
        {
          label: '主推方案',
          reason: '',
          models: pick(models, costFirst ? ['deepseek-v4-pro', 'gpt-image', 'sora', 'openai-tts'] : ['gpt-5.4', 'google-imagen', 'google-veo', 'openai-tts']),
        },
        {
          label: '备选方案',
          reason: '',
          models: pick(models, costFirst ? ['kimi-k2.6', 'gpt-image', 'google-veo', 'openai-tts'] : ['claude-sonnet-4.6', 'gpt-image', 'sora', 'gemini-audio']),
        },
      ],
      alternatives: [],
    }
  }

  return null
}

function buildReasonList(scene: SceneType, primaryScenario: ScenarioOption, state: SelectorState, top: RankedModel[]) {
  const primary = top[0]?.model.displayName
  const backup = top[1]?.model.displayName

  if (scene === 'video') {
    return [
      '你当前选择的是生视频，因此候选池已被强制限制为视频生成模型，Claude、GPT 这类文本模型不会再参与排序。',
      primary ? `主推方案是 ${primary}，因为它在视频质量、动作自然度、连贯性和稳定性上的综合得分更高。` : '',
      backup ? `备选方案是 ${backup}，它保留了同类能力，但在成本或速度取向上提供另一种平衡。` : '',
    ].filter(Boolean)
  }

  if (scene === 'image') {
    return [
      '你当前选择的是生图，因此候选池已被强制限制为图片生成模型，文本模型不会再参与排序。',
      primary ? `主推方案是 ${primary}，因为它在画质、风格控制和角色一致性上的综合得分更高。` : '',
      backup ? `备选方案是 ${backup}，它在相近能力下提供另一种成本或风格取向。` : '',
    ].filter(Boolean)
  }

  if (scene === 'audio') {
    return [
      '你当前选择的是配音音频，因此候选池已被强制限制为音频相关模型，文本模型不会再参与排序。',
      primary ? `主推方案是 ${primary}，因为它在音质、速度和稳定性上的综合得分更高。` : '',
      backup ? `备选方案是 ${backup}，它更适合作为成本或速度取向的替代。` : '',
    ].filter(Boolean)
  }

  if (scene === 'retrieval') {
    return [
      '你当前选择的是向量检索，因此候选池已被强制限制为 Embedding 模型，不再混入文本、生图或生视频模型。',
      primary ? `主推方案是 ${primary}，因为它在向量质量、查询速度和稳定性上的综合得分更高。` : '',
      backup ? `备选方案是 ${backup}，它可以作为同类检索能力的替代。` : '',
    ].filter(Boolean)
  }

  if (scene === 'comic') {
    return [
      '你当前选择的是 AI 漫剧，因此结果按工作流组合输出，而不是只给一个模型。',
      '主推方案优先覆盖脚本、角色图、视频生成和配音这四段关键链路。',
      '如果你同时点了低成本、角色一致性或图生视频，这些偏好会继续影响工作流内部排序。',
    ]
  }

  return [
    `当前主场景是“${primaryScenario.name}”，所以排序优先看这个任务真正需要的核心能力。`,
    primary ? `主推方案是 ${primary}，因为它在当前场景下的综合适配度最高。` : '',
    backup ? `备选方案是 ${backup}，因为它在关键能力接近的前提下提供了另一种成本、速度或稳定性平衡。` : '',
  ].filter(Boolean)
}

export function recommendModels(
  models: ModelData[],
  primaryScenario: ScenarioOption,
  secondaryScenarios: ScenarioOption[],
  state: SelectorState,
): RecommendationResult {
  const scene = inferScene(primaryScenario, state)
  const candidates = pick(models, candidateIdsForScene(scene))

  const ranked: RankedModel[] = candidates
    .map((model) => {
      const { score, reasons } = scoreForScene(model, scene, state)
      return {
        model,
        total: score,
        fitReasons: reasons,
      }
    })
    .sort((a, b) => b.total - a.total)

  const workflow = shouldUseWorkflow(scene, state) ? buildWorkflow(models, scene, state) : null
  const top = ranked.slice(0, 2)
  const sourceModels = workflow ? workflow.primary.flatMap((item) => item.models) : top.map((item) => item.model)

  return {
    mode: workflow ? 'workflow' : 'single',
    title: workflow ? workflow.title : `单模型推荐：${primaryScenario.name}`,
    confidence: state.enterprise || state.highConcurrency || state.mustHaveCapabilities.length > 0 ? '高' : secondaryScenarios.length > 0 ? '中' : '中',
    confidenceReason: '',
    top,
    rejected: [],
    reasonList: buildReasonList(scene, primaryScenario, state, top),
    costAdvice: '',
    riskWarning: '',
    avoidModels: [],
    relatedArticles: [],
    nextQuestions: [],
    officialSources: uniqueSources(sourceModels),
    workflow,
  }
}
