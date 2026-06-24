import { modelsData, type ModelData } from '../data/modelsData'

const metricAliases: Record<string, string> = {
  '代码': 'coding', '推理': 'reasoning', '长上下文': 'longContext', '中文': 'chinese',
  '表达': 'writing', '创意': 'writing', '工具': 'agent', 'JSON': 'agent',
  '结构化': 'dataAnalysis', '数据': 'dataAnalysis', '速度': 'speed', '并发': 'stability',
  '稳定': 'stability', '成本': 'cost', '价格': 'cost', '图片': 'imageQuality',
  '角色一致性': 'characterConsistency', '风格': 'styleControl', '视频': 'videoQuality',
  '运镜': 'motion', '配音': 'audioQuality', '音色': 'audioQuality', '检索': 'retrieval',
  '重排': 'rerank', '文字渲染': 'textRendering',
}

const metricLabels: Record<string, string> = {
  general: '通用能力', stability: '稳定性', cost: '成本', coding: '代码能力',
  reasoning: '复杂推理', longContext: '长上下文', chinese: '中文能力',
  writing: '表达与创作', agent: '工具调用', dataAnalysis: '结构化与数据分析',
  imageQuality: '图片质量', characterConsistency: '角色一致性', styleControl: '风格控制',
  videoQuality: '视频质量', motion: '动作与运镜', audioQuality: '配音质量',
  retrieval: '检索召回', rerank: '重排质量', textRendering: '中文文字渲染',
}

function inferTypes(text: string): ModelData['modelType'][] {
  if (/漫剧|短剧/.test(text)) return ['text', 'vision-understanding', 'image-generation', 'video-generation', 'tts']
  if (/生图|图片|海报|商品图|角色图|视觉/.test(text)) return ['image-generation']
  if (/视频|图生视频|文生视频|运镜/.test(text)) return ['video-generation']
  if (/配音|语音|音频|TTS|声音/.test(text)) return ['tts', 'audio', 'asr']
  if (/Embedding|向量|检索|RAG|Rerank|重排/.test(text)) return ['embedding', 'rerank']
  return ['text', 'vision-understanding']
}

function inferMetrics(text: string, priorities: string[]) {
  const combined = `${text} ${priorities.join(' ')}`
  const metrics = Object.entries(metricAliases)
    .filter(([keyword]) => combined.includes(keyword))
    .map(([, metric]) => metric)
  return [...new Set(metrics.length ? metrics : ['general', 'stability', 'cost'])]
}

export function recommendForTopic(title: string, category = '', priorities: string[] = []) {
  const text = `${title} ${category}`
  const types = inferTypes(text)
  const metrics = inferMetrics(text, priorities)
  const candidates = modelsData.filter((model) => types.includes(model.modelType))
  const ranked = candidates.map((model) => {
    const values = metrics.map((metric) => model.capabilityScores[metric] ?? 5)
    const fit = values.reduce((sum, value) => sum + value, 0) / values.length
    const score = Math.min(10, fit * .75 + model.capabilityScores.stability * .15 + model.capabilityScores.cost * .1)
    return { model, score: Number(score.toFixed(1)) }
  }).sort((a, b) => b.score - a.score)

  const selected: typeof ranked = []
  for (const item of ranked) {
    if (!selected.some((chosen) => chosen.model.provider === item.model.provider) || selected.length >= 2) {
      selected.push(item)
    }
    if (selected.length === 3) break
  }

  return {
    models: selected,
    metrics,
    priorities: priorities.length ? priorities : metrics.map((metric) => metricLabels[metric] || metric),
    reason: `该主题优先比较${(priorities.length ? priorities : metrics.map((metric) => metricLabels[metric] || metric)).slice(0, 4).join('、')}，并综合模型稳定性和成本策略分排序。`,
    costAdvice: /漫剧|视频|图片|配音/.test(text)
      ? '生成类任务应按有效成片率计算成本，重点统计图片张数、视频秒数、配音时长和失败重试。'
      : /RAG|向量|检索|重排/.test(text)
        ? '检索系统需同时计算向量生成、索引更新、查询召回、重排和向量数据库成本。'
        : '文本任务应同时关注输入、输出、缓存命中和长上下文附加成本。',
    riskWarning: /法务|合同|医疗|金融|高风险/.test(text)
      ? '模型输出仅作为辅助参考，重要业务决策需要人工复核。'
      : /Agent|自动化/.test(text)
        ? '涉及外部写入、发送或执行操作时，应加入权限隔离、失败恢复和人工确认。'
        : '策略评分仅用于初步选型，上线前仍需使用真实业务样本进行质量、延迟和稳定性测试。',
  }
}
