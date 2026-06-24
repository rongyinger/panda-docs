export type PendingValue = string | boolean

export interface OfficialSource {
  label: string
  url: string
}

export interface ModelData {
  id: string
  displayName: string
  provider: string
  modelFamily: string
  officialPositioning: string
  contextWindow: string
  maxOutputTokens: string
  inputPricePerMTok: string
  outputPricePerMTok: string
  cachedInputPricePerMTok: string
  cacheWritePricePerMTok: string
  supportsVision: PendingValue
  supportsToolCalling: PendingValue
  supportsStructuredOutput: PendingValue
  supportsBatch: PendingValue
  modelType: 'text' | 'vision-understanding' | 'image-generation' | 'video-generation' | 'audio' | 'tts' | 'asr' | 'embedding' | 'rerank'
  generationModes: string[]
  outputModalities: string[]
  maxResolution: string
  maxDurationSeconds: string
  aspectRatios: string[]
  supportsReferenceImage: PendingValue
  supportsCharacterConsistency: PendingValue
  supportsStyleReference: PendingValue
  supportsInpainting: PendingValue
  supportsOutpainting: PendingValue
  supportsFirstLastFrame: PendingValue
  supportsLipSync: PendingValue
  supportsVoiceClone: PendingValue
  priceUnit: string
  officialSourceUrls: OfficialSource[]
  capabilityScores: Record<string, number>
  recommendedScenarios: string[]
  notRecommendedScenarios: string[]
  notes: string
}

const pending = '待补充'

const providerSources: Record<string, OfficialSource[]> = {
  OpenAI: [
    { label: 'Models', url: 'https://platform.openai.com/docs/models' },
    { label: 'Pricing', url: 'https://platform.openai.com/docs/pricing' },
    { label: 'Rate limits', url: 'https://platform.openai.com/docs/guides/rate-limits' },
    { label: 'Tool calling', url: 'https://platform.openai.com/docs/guides/function-calling' },
  ],
  Anthropic: [
    { label: 'Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models/overview' },
    { label: 'Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
    { label: 'Rate limits', url: 'https://docs.anthropic.com/en/api/rate-limits' },
    { label: 'Tool use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
  ],
  Google: [
    { label: 'Models', url: 'https://ai.google.dev/gemini-api/docs/models' },
    { label: 'Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
    { label: 'Rate limits', url: 'https://ai.google.dev/gemini-api/docs/rate-limits' },
    { label: 'Function calling', url: 'https://ai.google.dev/gemini-api/docs/function-calling' },
  ],
  DeepSeek: [
    { label: 'Models', url: 'https://api-docs.deepseek.com/api/list-models' },
    { label: 'Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
    { label: 'Rate limits', url: 'https://api-docs.deepseek.com/quick_start/rate_limit' },
    { label: 'Tool calls', url: 'https://api-docs.deepseek.com/guides/tool_calls' },
  ],
  Moonshot: [
    { label: 'Models', url: 'https://platform.moonshot.cn/docs/guide/kimi-k2-6-quickstart' },
    { label: 'Pricing', url: 'https://platform.moonshot.cn/docs/pricing/chat' },
    { label: 'Rate limits', url: 'https://platform.moonshot.cn/docs/pricing/limits' },
    { label: 'API', url: 'https://platform.moonshot.cn/docs/api/chat' },
  ],
  Zhipu: [
    { label: 'Models', url: 'https://docs.bigmodel.cn/cn/guide/start/model-overview' },
    { label: 'Pricing', url: 'https://open.bigmodel.cn/pricing' },
    { label: 'Rate limits', url: 'https://docs.bigmodel.cn/cn/api/rate-limit' },
    { label: 'API', url: 'https://docs.bigmodel.cn/cn/guide/develop/http/introduction' },
  ],
  Midjourney: [
    { label: 'Models', url: 'https://docs.midjourney.com/hc/en-us/categories/32013335627533-Documentation' },
    { label: 'Pricing', url: 'https://docs.midjourney.com/hc/en-us/articles/27870484040333-Plans' },
    { label: 'Docs', url: 'https://docs.midjourney.com/hc/en-us' },
  ],
  'Stability AI': [
    { label: 'Models', url: 'https://platform.stability.ai/docs/getting-started/models' },
    { label: 'Pricing', url: 'https://platform.stability.ai/pricing' },
    { label: 'API', url: 'https://platform.stability.ai/docs/api-reference' },
  ],
  'Black Forest Labs': [
    { label: 'Models', url: 'https://docs.bfl.ai/quick_start/introduction' },
    { label: 'Pricing', url: 'https://docs.bfl.ai/quick_start/pricing' },
    { label: 'API', url: 'https://docs.bfl.ai/api_integration/integration_guidelines' },
  ],
  Recraft: [
    { label: 'Models', url: 'https://www.recraft.ai/docs' },
    { label: 'Pricing', url: 'https://www.recraft.ai/docs/api-reference/pricing' },
    { label: 'API', url: 'https://www.recraft.ai/docs/api-reference/getting-started' },
  ],
  Ideogram: [
    { label: 'Models', url: 'https://docs.ideogram.ai/using-ideogram/generation-settings/available-models' },
    { label: 'Pricing', url: 'https://docs.ideogram.ai/plans-and-pricing/ideogram-api' },
    { label: 'API', url: 'https://developer.ideogram.ai/' },
  ],
  ByteDance: [
    { label: 'Models', url: 'https://seed.bytedance.com/en/' },
    { label: 'Image API', url: 'https://docs.byteplus.com/en/docs/ModelArk/1541523' },
    { label: 'Video API', url: 'https://docs.byteplus.com/en/docs/ModelArk/1520757' },
  ],
  Runway: [
    { label: 'Models', url: 'https://docs.dev.runwayml.com/guides/models/' },
    { label: 'Pricing', url: 'https://docs.dev.runwayml.com/guides/pricing/' },
    { label: 'API', url: 'https://docs.dev.runwayml.com/' },
  ],
  'Kling AI': [
    { label: 'Models', url: 'https://kling.ai/document-api/quickStart/productIntroduction/overview' },
    { label: 'Docs', url: 'https://kling.ai/document-api/quickStart/userManual' },
    { label: 'Developer', url: 'https://kling.ai/dev' },
  ],
  Pika: [
    { label: 'Models', url: 'https://pika.art/' },
    { label: 'Pricing', url: 'https://pika.art/pricing' },
    { label: 'API', url: 'https://pika.art/api' },
  ],
  'Luma AI': [
    { label: 'Models', url: 'https://docs.lumalabs.ai/docs/welcome' },
    { label: 'API', url: 'https://docs.lumalabs.ai/docs/api' },
    { label: 'Video', url: 'https://docs.lumalabs.ai/docs/javascript-video-generation' },
  ],
  MiniMax: [
    { label: 'Models', url: 'https://platform.minimax.io/docs/api-reference/api-overview' },
    { label: 'Pricing', url: 'https://platform.minimax.io/docs/pricing/overview' },
    { label: 'Video', url: 'https://platform.minimax.io/docs/guides/video-generation' },
    { label: 'Speech', url: 'https://platform.minimax.io/docs/guides/pricing-paygo' },
  ],
  ElevenLabs: [
    { label: 'Models', url: 'https://elevenlabs.io/docs/overview/intro' },
    { label: 'Pricing', url: 'https://elevenlabs.io/pricing/api' },
    { label: 'TTS', url: 'https://elevenlabs.io/docs/overview/capabilities/text-to-speech' },
  ],
  'Google Cloud': [
    { label: 'Models', url: 'https://cloud.google.com/text-to-speech/docs' },
    { label: 'Pricing', url: 'https://cloud.google.com/text-to-speech/pricing' },
    { label: 'Speech to text', url: 'https://cloud.google.com/speech-to-text/docs' },
  ],
  Microsoft: [
    { label: 'Models', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/' },
    { label: 'Pricing', url: 'https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/' },
    { label: 'TTS', url: 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech' },
  ],
  Cohere: [
    { label: 'Models', url: 'https://docs.cohere.com/docs/models' },
    { label: 'Pricing', url: 'https://cohere.com/pricing' },
    { label: 'Rate limits', url: 'https://docs.cohere.com/docs/rate-limits' },
  ],
  'Jina AI': [
    { label: 'Models', url: 'https://jina.ai/' },
    { label: 'Embeddings', url: 'https://jina.ai/embeddings/' },
    { label: 'Reranker', url: 'https://jina.ai/reranker/' },
  ],
  BAAI: [
    { label: 'Models', url: 'https://bge-model.com/' },
    { label: 'Embedding', url: 'https://bge-model.com/tutorial/1_Embedding/1.2.1.html' },
    { label: 'Hugging Face', url: 'https://huggingface.co/BAAI/bge-m3' },
  ],
  'Voyage AI': [
    { label: 'Models', url: 'https://docs.voyageai.com/docs/embeddings' },
    { label: 'Pricing', url: 'https://docs.voyageai.com/docs/pricing' },
    { label: 'Rate limits', url: 'https://docs.voyageai.com/docs/rate-limits' },
  ],
}

const score = (
  general: number, coding: number, reasoning: number, longContext: number,
  writing: number, chinese: number, agent: number, dataAnalysis: number,
  multimodal: number, speed: number, cost: number, stability: number,
) => ({ general, coding, reasoning, longContext, writing, chinese, agent, dataAnalysis, multimodal, speed, cost, stability })

const makeModel = (
  id: string,
  displayName: string,
  provider: string,
  modelFamily: string,
  capabilityScores: Record<string, number>,
  recommendedScenarios: string[],
  notRecommendedScenarios: string[],
  overrides: Partial<ModelData> = {},
): ModelData => ({
  id,
  displayName,
  provider,
  modelFamily,
  officialPositioning: pending,
  contextWindow: pending,
  maxOutputTokens: pending,
  inputPricePerMTok: pending,
  outputPricePerMTok: pending,
  cachedInputPricePerMTok: pending,
  cacheWritePricePerMTok: pending,
  supportsVision: pending,
  supportsToolCalling: pending,
  supportsStructuredOutput: pending,
  supportsBatch: pending,
  modelType: 'text',
  generationModes: [],
  outputModalities: ['text'],
  maxResolution: pending,
  maxDurationSeconds: pending,
  aspectRatios: [],
  supportsReferenceImage: pending,
  supportsCharacterConsistency: pending,
  supportsStyleReference: pending,
  supportsInpainting: pending,
  supportsOutpainting: pending,
  supportsFirstLastFrame: pending,
  supportsLipSync: pending,
  supportsVoiceClone: pending,
  priceUnit: 'per token',
  officialSourceUrls: providerSources[provider],
  capabilityScores,
  recommendedScenarios,
  notRecommendedScenarios,
  notes: '策略评分用于站内选型，不代表厂商官方评分；待补充字段须以官方文档为准。',
  ...overrides,
})

export const modelsData: ModelData[] = [
  makeModel('gpt-5.5', 'GPT-5.5', 'OpenAI', 'GPT', score(9, 9, 9, 8, 9, 8, 9, 9, 9, 7, 4, 8), ['复杂推理', '代码审查', 'Agent'], ['极致省钱的批处理']),
  makeModel('gpt-5.4', 'GPT-5.4', 'OpenAI', 'GPT', score(9, 9, 9, 8, 8, 8, 9, 9, 8, 7, 5, 8), ['日常开发', '数据分析', '企业应用'], ['超低成本高频 FAQ']),
  makeModel('gpt-5.4-mini', 'GPT-5.4 mini', 'OpenAI', 'GPT', score(8, 8, 7, 7, 7, 7, 8, 8, 8, 9, 9, 8), ['客服', '批量生成', '简单代码'], ['高风险最终复核']),
  makeModel('claude-opus-4.8', 'Claude Opus 4.8', 'Anthropic', 'Claude', score(9, 10, 10, 9, 9, 8, 10, 9, 8, 6, 3, 8), ['复杂代码', '长程 Agent', '高质量报告'], ['成本敏感批处理'], {
    officialPositioning: 'Opus 系列高能力模型；具体能力与可用地区请查看官方模型页。',
  }),
  makeModel('claude-sonnet-4.6', 'Claude Sonnet 4.6', 'Anthropic', 'Claude', score(9, 9, 9, 9, 9, 8, 9, 8, 8, 8, 6, 9), ['代码开发', '知识库', '企业 Agent'], ['极致低价分类']),
  makeModel('claude-haiku-4.5', 'Claude Haiku 4.5', 'Anthropic', 'Claude', score(7, 7, 6, 7, 7, 7, 7, 7, 6, 10, 9, 8), ['实时客服', '分类摘要', '轻量工具调用'], ['复杂合同审阅']),
  makeModel('gemini-pro', 'Gemini Pro', 'Google', 'Gemini', score(9, 8, 9, 10, 8, 8, 8, 9, 10, 7, 5, 8), ['超长文档', '多模态分析', '研究资料'], ['仅文本低成本任务'], { modelType: 'vision-understanding' }),
  makeModel('gemini-flash', 'Gemini Flash', 'Google', 'Gemini', score(8, 7, 7, 9, 7, 7, 8, 8, 9, 10, 9, 8), ['多模态客服', '批量抽取', '快速摘要'], ['复杂代码重构'], { modelType: 'vision-understanding' }),
  makeModel('deepseek-v4-pro', 'DeepSeek V4 Pro', 'DeepSeek', 'DeepSeek', score(9, 9, 9, 8, 8, 9, 8, 9, 6, 7, 8, 7), ['中文推理', '代码', '数据分析'], ['强依赖图片输入'], {
    officialPositioning: 'V4 系列能力与计费请查看官方 Models & Pricing 页面。',
  }),
  makeModel('deepseek-v4-flash', 'DeepSeek V4 Flash', 'DeepSeek', 'DeepSeek', score(8, 8, 7, 7, 7, 9, 7, 8, 5, 10, 10, 7), ['中文客服', '批量生成', 'SQL'], ['多模态票据理解']),
  makeModel('kimi-k2.6', 'Kimi K2.6', 'Moonshot', 'Kimi', score(9, 9, 9, 10, 8, 10, 9, 9, 9, 7, 7, 8), ['长文档', '中文内容', '代码 Agent'], ['极低延迟任务'], {
    officialPositioning: '面向长程代码、文本与视觉任务的多模态模型。',
    contextWindow: '256K',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    modelType: 'vision-understanding',
  }),
  makeModel('glm-5.1', 'GLM-5.1', 'Zhipu', 'GLM', score(9, 9, 9, 9, 8, 10, 9, 9, 6, 7, 8, 8), ['中文 Agent', '长程代码', '企业自动化'], ['视觉为核心的任务'], {
    officialPositioning: '面向 Coding 与长程 Agent 任务的模型。',
    contextWindow: '200K',
    maxOutputTokens: '128K',
  }),
]

const mediaScore = (
  imageQuality: number, videoQuality: number, characterConsistency: number,
  styleControl: number, motion: number, audioQuality: number,
  textRendering: number, speed: number, cost: number, stability: number,
) => ({
  general: 6, coding: 1, reasoning: 4, longContext: 3, writing: 2, chinese: 5,
  agent: 3, dataAnalysis: 2, multimodal: Math.max(imageQuality, videoQuality),
  speed, cost, stability, imageQuality, videoQuality, characterConsistency,
  styleControl, motion, audioQuality, textRendering, retrieval: 2, rerank: 2,
})

const retrievalScore = (retrieval: number, rerank: number, speed: number, cost: number, stability: number) => ({
  general: 4, coding: 4, reasoning: 3, longContext: 7, writing: 1, chinese: 7,
  agent: 6, dataAnalysis: 7, multimodal: 3, speed, cost, stability,
  imageQuality: 0, videoQuality: 0, characterConsistency: 0, styleControl: 0,
  motion: 0, audioQuality: 0, textRendering: 0, retrieval, rerank,
})

const modelSpecificSources: Record<string, OfficialSource[]> = {
  'gpt-image': [
    { label: 'Image generation', url: 'https://platform.openai.com/docs/guides/image-generation' },
    { label: 'Models', url: 'https://platform.openai.com/docs/models' },
    { label: 'Pricing', url: 'https://platform.openai.com/docs/pricing' },
  ],
  'dall-e': [
    { label: 'Image generation', url: 'https://platform.openai.com/docs/guides/image-generation' },
    { label: 'Models', url: 'https://platform.openai.com/docs/models' },
    { label: 'Pricing', url: 'https://platform.openai.com/docs/pricing' },
  ],
  'sora': [
    { label: 'Video generation', url: 'https://platform.openai.com/docs/guides/video-generation' },
    { label: 'Models', url: 'https://platform.openai.com/docs/models' },
    { label: 'Pricing', url: 'https://platform.openai.com/docs/pricing' },
  ],
  'openai-tts': [
    { label: 'Text to speech', url: 'https://platform.openai.com/docs/guides/text-to-speech' },
    { label: 'Audio models', url: 'https://platform.openai.com/docs/models' },
    { label: 'Pricing', url: 'https://platform.openai.com/docs/pricing' },
  ],
  'whisper': [
    { label: 'Speech to text', url: 'https://platform.openai.com/docs/guides/speech-to-text' },
    { label: 'Audio models', url: 'https://platform.openai.com/docs/models' },
    { label: 'Pricing', url: 'https://platform.openai.com/docs/pricing' },
  ],
  'openai-embedding': [
    { label: 'Embeddings', url: 'https://platform.openai.com/docs/guides/embeddings' },
    { label: 'Models', url: 'https://platform.openai.com/docs/models' },
    { label: 'Pricing', url: 'https://platform.openai.com/docs/pricing' },
  ],
  'google-imagen': [
    { label: 'Imagen', url: 'https://ai.google.dev/gemini-api/docs/imagen' },
    { label: 'Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
    { label: 'Rate limits', url: 'https://ai.google.dev/gemini-api/docs/rate-limits' },
  ],
  'google-veo': [
    { label: 'Veo', url: 'https://ai.google.dev/gemini-api/docs/video' },
    { label: 'Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
    { label: 'Rate limits', url: 'https://ai.google.dev/gemini-api/docs/rate-limits' },
  ],
  'gemini-audio': [
    { label: 'Audio', url: 'https://ai.google.dev/gemini-api/docs/audio' },
    { label: 'Speech generation', url: 'https://ai.google.dev/gemini-api/docs/speech-generation' },
    { label: 'Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
  ],
  'gemini-embedding': [
    { label: 'Embeddings', url: 'https://ai.google.dev/gemini-api/docs/embeddings' },
    { label: 'Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
    { label: 'Rate limits', url: 'https://ai.google.dev/gemini-api/docs/rate-limits' },
  ],
}

const generationModel = (
  id: string, displayName: string, provider: string, modelFamily: string,
  modelType: ModelData['modelType'], modes: string[], outputs: string[],
  scores: Record<string, number>, scenarios: string[], overrides: Partial<ModelData> = {},
) => {
  const unit = modelType === 'image-generation' ? 'per image' :
    modelType === 'video-generation' ? 'per second / per video' :
    modelType === 'tts' ? 'per character / per minute' :
    modelType === 'asr' ? 'per minute' : 'per token'
  const labels: Record<ModelData['modelType'], string> = {
    text: '文本生成模型。',
    'vision-understanding': '多模态理解模型。',
    'image-generation': `${provider} 官方提供的图片生成或编辑模型。`,
    'video-generation': `${provider} 官方提供的视频生成或编辑模型。`,
    audio: `${provider} 官方提供的音频理解或生成模型。`,
    tts: `${provider} 官方提供的文本转语音模型。`,
    asr: `${provider} 官方提供的语音识别模型。`,
    embedding: `${provider} 官方提供的向量嵌入模型。`,
    rerank: `${provider} 官方提供的检索重排模型。`,
  }
  return makeModel(id, displayName, provider, modelFamily, scores, scenarios, [], {
    modelType,
    generationModes: modes,
    outputModalities: outputs,
    officialPositioning: labels[modelType],
    contextWindow: ['embedding', 'rerank'].includes(modelType) ? pending : '不适用',
    maxOutputTokens: ['embedding', 'rerank'].includes(modelType) ? pending : '不适用',
    inputPricePerMTok: '不适用',
    outputPricePerMTok: `按 ${unit}，见官方定价`,
    cachedInputPricePerMTok: '不适用',
    cacheWritePricePerMTok: '不适用',
    supportsVision: ['image-generation', 'video-generation'].includes(modelType) ? pending : '不适用',
    supportsToolCalling: '不适用',
    supportsStructuredOutput: ['embedding', 'rerank', 'asr'].includes(modelType) ? pending : '不适用',
    officialSourceUrls: modelSpecificSources[id] || providerSources[provider],
    priceUnit: unit,
    ...overrides,
  })
}

modelsData.push(
  generationModel('gpt-image', 'GPT Image', 'OpenAI', 'GPT Image', 'image-generation', ['text-to-image', 'image-to-image'], ['image'], mediaScore(9,0,8,8,0,0,9,7,5,8), ['商业海报', '角色图', '图片编辑'], { supportsReferenceImage: true, supportsInpainting: true, officialPositioning: 'OpenAI 图片生成与编辑模型系列。' }),
  generationModel('google-imagen', 'Google Imagen', 'Google', 'Imagen', 'image-generation', ['text-to-image', 'image-to-image'], ['image'], mediaScore(9,0,7,8,0,0,7,8,6,8), ['商品图', '写实图片', '海报主视觉']),
  generationModel('midjourney', 'Midjourney', 'Midjourney', 'Midjourney', 'image-generation', ['text-to-image', 'image-to-image'], ['image'], mediaScore(10,0,8,10,0,0,6,6,4,7), ['概念设计', '角色视觉', '高质感主视觉'], { priceUnit: 'subscription / credits' }),
  generationModel('stable-diffusion', 'Stable Diffusion', 'Stability AI', 'Stable Diffusion', 'image-generation', ['text-to-image', 'image-to-image'], ['image'], mediaScore(8,0,8,10,0,0,5,7,9,7), ['私有部署', '局部重绘', '风格训练'], { supportsReferenceImage: true, supportsInpainting: true, supportsOutpainting: true }),
  generationModel('flux', 'Flux', 'Black Forest Labs', 'FLUX', 'image-generation', ['text-to-image', 'image-to-image'], ['image'], mediaScore(9,0,8,9,0,0,8,8,7,8), ['角色图', '商业视觉', '多参考图编辑'], { supportsReferenceImage: true, supportsStyleReference: true }),
  generationModel('recraft', 'Recraft', 'Recraft', 'Recraft', 'image-generation', ['text-to-image', 'image-to-image'], ['image'], mediaScore(9,0,7,10,0,0,8,8,7,8), ['品牌视觉', 'Logo 草案', '矢量图']),
  generationModel('ideogram', 'Ideogram', 'Ideogram', 'Ideogram', 'image-generation', ['text-to-image', 'image-to-image'], ['image'], mediaScore(9,0,7,8,0,0,10,8,7,8), ['海报文字', 'Logo', '社交媒体视觉']),
  generationModel('seedream', 'Seedream', 'ByteDance', 'Seedream', 'image-generation', ['text-to-image', 'image-to-image'], ['image'], mediaScore(9,0,9,9,0,0,9,8,7,8), ['AI 漫剧角色图', '多参考图编辑', '中文商业视觉'], { supportsReferenceImage: true, supportsCharacterConsistency: true, supportsStyleReference: true }),
  generationModel('dall-e', 'DALL·E', 'OpenAI', 'DALL·E', 'image-generation', ['text-to-image', 'image-to-image'], ['image'], mediaScore(8,0,6,7,0,0,7,7,5,8), ['概念图', '插画', '快速生图']),

  generationModel('sora', 'Sora', 'OpenAI', 'Sora', 'video-generation', ['text-to-video', 'image-to-video'], ['video','audio'], mediaScore(7,9,8,8,9,8,4,5,3,7), ['电影感短片', '图生视频', '广告短片'], { supportsReferenceImage: true }),
  generationModel('google-veo', 'Google Veo', 'Google', 'Veo', 'video-generation', ['text-to-video', 'image-to-video'], ['video','audio'], mediaScore(7,10,8,9,10,9,4,5,3,8), ['品牌短片', '原生音频视频', '高质量图生视频'], { supportsReferenceImage: true }),
  generationModel('runway-gen', 'Runway Gen', 'Runway', 'Runway Gen', 'video-generation', ['text-to-video', 'image-to-video', 'video-to-video'], ['video'], mediaScore(7,9,8,9,9,6,3,8,5,8), ['可控运镜', '视频编辑', '产品展示'], { supportsReferenceImage: true, supportsFirstLastFrame: true }),
  generationModel('kling', 'Kling', 'Kling AI', 'Kling', 'video-generation', ['text-to-video', 'image-to-video'], ['video'], mediaScore(7,9,9,8,9,6,3,7,6,8), ['AI 漫剧', '角色动作', '图生视频'], { supportsReferenceImage: true, supportsCharacterConsistency: true }),
  generationModel('pika', 'Pika', 'Pika', 'Pika', 'video-generation', ['text-to-video', 'image-to-video', 'video-to-video'], ['video'], mediaScore(6,8,7,8,8,6,3,9,7,7), ['社交短视频', '创意特效', '快速试做']),
  generationModel('luma-dream-machine', 'Luma Dream Machine', 'Luma AI', 'Dream Machine', 'video-generation', ['text-to-video', 'image-to-video', 'video-to-video'], ['video'], mediaScore(8,9,8,9,9,5,3,8,6,8), ['镜头运动', '图生视频', '视频风格化'], { supportsReferenceImage: true, supportsStyleReference: true }),
  generationModel('minimax-hailuo', 'MiniMax Hailuo', 'MiniMax', 'Hailuo', 'video-generation', ['text-to-video', 'image-to-video'], ['video'], mediaScore(7,9,8,8,9,6,3,8,7,8), ['中文短剧', '人物动作', '图生视频'], { supportsReferenceImage: true }),
  generationModel('seedance', 'Seedance', 'ByteDance', 'Seedance', 'video-generation', ['text-to-video', 'image-to-video', 'video-to-video'], ['video','audio'], mediaScore(8,10,9,9,10,9,4,7,5,8), ['多镜头叙事', 'AI 漫剧', '音画联合生成'], { supportsReferenceImage: true, supportsCharacterConsistency: true, supportsStyleReference: true, supportsLipSync: true }),

  generationModel('openai-tts', 'OpenAI TTS', 'OpenAI', 'Audio', 'tts', ['text-to-speech'], ['audio'], mediaScore(0,0,0,0,0,8,0,9,8,9), ['旁白', '产品语音', '批量配音']),
  generationModel('elevenlabs', 'ElevenLabs', 'ElevenLabs', 'ElevenLabs Audio', 'tts', ['text-to-speech', 'music-generation'], ['audio'], mediaScore(0,0,0,0,0,10,0,8,5,9), ['角色配音', '多人对白', '声音克隆'], { supportsVoiceClone: true, supportsLipSync: true }),
  generationModel('minimax-speech', 'MiniMax Speech', 'MiniMax', 'MiniMax Speech', 'tts', ['text-to-speech'], ['audio'], mediaScore(0,0,0,0,0,9,0,8,7,8), ['中文角色配音', '漫剧旁白', '声音设计'], { supportsVoiceClone: true }),
  generationModel('google-tts', 'Google TTS', 'Google Cloud', 'Cloud TTS', 'tts', ['text-to-speech'], ['audio'], mediaScore(0,0,0,0,0,8,0,9,7,9), ['多语言配音', '企业语音', '实时播报']),
  generationModel('azure-speech', 'Azure Speech', 'Microsoft', 'Azure Speech', 'audio', ['text-to-speech', 'speech-to-text'], ['audio','text'], mediaScore(0,0,0,0,0,8,0,9,7,9), ['企业语音', '语音识别', '多语言 TTS'], { supportsVoiceClone: pending }),
  generationModel('whisper', 'Whisper', 'OpenAI', 'Whisper', 'asr', ['speech-to-text'], ['text'], mediaScore(0,0,0,0,0,8,0,8,8,9), ['字幕生成', '语音转文字', '音频转录']),
  generationModel('gemini-audio', 'Gemini Audio', 'Google', 'Gemini Audio', 'audio', ['text-to-speech', 'speech-to-text'], ['audio','text'], mediaScore(0,0,0,0,0,9,0,8,6,8), ['实时音频理解', '语音交互', '多模态音频']),

  generationModel('openai-embedding', 'OpenAI Embedding', 'OpenAI', 'Embedding', 'embedding', [], ['embedding'], retrievalScore(9,1,9,8,9), ['RAG', '语义搜索', '文本聚类']),
  generationModel('gemini-embedding', 'Gemini Embedding', 'Google', 'Gemini Embedding', 'embedding', [], ['embedding'], retrievalScore(9,1,8,8,8), ['多模态检索', 'RAG', '语义搜索']),
  generationModel('cohere-embed', 'Cohere Embed', 'Cohere', 'Embed', 'embedding', [], ['embedding'], retrievalScore(9,2,8,8,9), ['企业 RAG', '多语言检索', '搜索']),
  generationModel('jina-embeddings', 'Jina Embeddings', 'Jina AI', 'Jina Embeddings', 'embedding', [], ['embedding'], retrievalScore(9,2,8,8,8), ['多语言检索', '多模态检索', '长文档']),
  generationModel('bge', 'BGE', 'BAAI', 'BGE', 'embedding', [], ['embedding'], retrievalScore(9,5,7,10,7), ['私有部署', '中文 RAG', '混合检索'], { priceUnit: 'open source / infrastructure' }),
  generationModel('voyage-ai', 'Voyage AI', 'Voyage AI', 'Voyage Embeddings', 'embedding', [], ['embedding'], retrievalScore(10,4,8,8,9), ['代码检索', '领域 RAG', '上下文嵌入']),
  generationModel('cohere-rerank', 'Cohere Rerank', 'Cohere', 'Rerank', 'rerank', [], ['ranking'], retrievalScore(5,10,8,7,9), ['RAG 重排', '企业搜索', '候选精排'], { priceUnit: 'per search' }),
  generationModel('jina-reranker', 'Jina Reranker', 'Jina AI', 'Jina Reranker', 'rerank', [], ['ranking'], retrievalScore(5,10,8,8,8), ['多语言重排', '长上下文重排', 'RAG 精排']),
)

type VerifiedModelPatch = Partial<ModelData>

const verifiedModelData: Record<string, VerifiedModelPatch> = {
  'gpt-5.5': {
    officialPositioning: 'OpenAI 面向复杂专业工作与编码任务的前沿模型；支持可调推理强度。',
    contextWindow: '1,050,000 tokens',
    maxOutputTokens: '128,000 tokens',
    inputPricePerMTok: '$5.00',
    outputPricePerMTok: '$30.00',
    cachedInputPricePerMTok: '$0.50',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: true,
    officialSourceUrls: [
      { label: 'Model', url: 'https://developers.openai.com/api/docs/models/gpt-5.5' },
      { label: 'Pricing', url: 'https://openai.com/api/pricing/' },
      { label: 'Rate limits', url: 'https://developers.openai.com/api/docs/models/gpt-5.5#rate-limits' },
    ],
    notes: '官方型号 gpt-5.5。超过 272K 输入时，标准、Batch 与 Flex 全会话输入按 2 倍、输出按 1.5 倍计价。',
  },
  'gpt-5.4': {
    officialPositioning: 'OpenAI 面向复杂专业工作、编码和智能体任务的前沿模型。',
    contextWindow: '1,050,000 tokens',
    maxOutputTokens: '128,000 tokens',
    inputPricePerMTok: '$2.50',
    outputPricePerMTok: '$15.00',
    cachedInputPricePerMTok: '$0.25',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: true,
    officialSourceUrls: [
      { label: 'Model', url: 'https://developers.openai.com/api/docs/models/gpt-5.4' },
      { label: 'Pricing', url: 'https://openai.com/api/pricing/' },
      { label: 'Rate limits', url: 'https://developers.openai.com/api/docs/models/gpt-5.4#rate-limits' },
    ],
    notes: '官方型号 gpt-5.4。超过 272K 输入时，全会话输入按 2 倍、输出按 1.5 倍计价。',
  },
  'gpt-5.4-mini': {
    officialPositioning: 'OpenAI 面向高调用量编码、计算机使用和子智能体任务的高效 mini 模型。',
    contextWindow: '400,000 tokens',
    maxOutputTokens: '128,000 tokens',
    inputPricePerMTok: '$0.75',
    outputPricePerMTok: '$4.50',
    cachedInputPricePerMTok: '$0.075',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: true,
    officialSourceUrls: [
      { label: 'Model', url: 'https://developers.openai.com/api/docs/models/gpt-5.4-mini' },
      { label: 'Pricing', url: 'https://openai.com/api/pricing/' },
      { label: 'Rate limits', url: 'https://developers.openai.com/api/docs/models/gpt-5.4-mini#rate-limits' },
    ],
  },
  'claude-opus-4.8': {
    officialPositioning: 'Anthropic 面向最复杂工作和长程智能体任务的高能力模型。',
    contextWindow: '1,000,000 tokens',
    maxOutputTokens: '128,000 tokens',
    inputPricePerMTok: '$5.00',
    outputPricePerMTok: '$25.00',
    cachedInputPricePerMTok: '$0.50',
    cacheWritePricePerMTok: '$6.25（5 分钟）/ $10.00（1 小时）',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: true,
    officialSourceUrls: [
      { label: 'Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models/overview' },
      { label: 'Pricing', url: 'https://docs.anthropic.com/en/docs/about-claude/pricing' },
      { label: 'Rate limits', url: 'https://docs.anthropic.com/en/api/rate-limits' },
      { label: 'Tool use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
    ],
  },
  'claude-sonnet-4.6': {
    officialPositioning: 'Anthropic 在速度与智能之间平衡的模型，适合编码、智能体和企业工作流。',
    contextWindow: '1,000,000 tokens',
    maxOutputTokens: '128,000 tokens',
    inputPricePerMTok: '$3.00',
    outputPricePerMTok: '$15.00',
    cachedInputPricePerMTok: '$0.30',
    cacheWritePricePerMTok: '$3.75（5 分钟）/ $6.00（1 小时）',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: true,
    officialSourceUrls: providerSources.Anthropic,
  },
  'claude-haiku-4.5': {
    officialPositioning: 'Anthropic 面向低延迟、高吞吐任务的快速模型。',
    contextWindow: '200,000 tokens',
    maxOutputTokens: '64,000 tokens',
    inputPricePerMTok: '$1.00',
    outputPricePerMTok: '$5.00',
    cachedInputPricePerMTok: '$0.10',
    cacheWritePricePerMTok: '$1.25（5 分钟）/ $2.00（1 小时）',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: true,
    officialSourceUrls: providerSources.Anthropic,
  },
  'gemini-pro': {
    displayName: 'Gemini 3.1 Pro Preview',
    officialPositioning: 'Google 面向软件工程、可靠工具调用和多步骤智能体工作流的高能力预览模型。',
    contextWindow: '1,048,576 tokens',
    maxOutputTokens: '65,536 tokens',
    inputPricePerMTok: '$2.00（≤200K）/ $4.00（>200K）',
    outputPricePerMTok: '$12.00（≤200K）/ $18.00（>200K）',
    cachedInputPricePerMTok: '$0.20（≤200K）/ $0.40（>200K）',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: true,
    officialSourceUrls: [
      { label: 'Model', url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview' },
      { label: 'Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
      { label: 'Rate limits', url: 'https://ai.google.dev/gemini-api/docs/rate-limits' },
    ],
    notes: '原预置名“Gemini Pro”已映射为当前官方 Gemini 3.1 Pro Preview；预览型号可能变化。',
  },
  'gemini-flash': {
    displayName: 'Gemini 3.5 Flash',
    officialPositioning: 'Google 面向高吞吐、多模态和工具调用任务的稳定 Flash 模型。',
    contextWindow: '1,048,576 tokens',
    maxOutputTokens: '65,536 tokens',
    inputPricePerMTok: '$0.50（文本/图像/视频）/ $1.00（音频）',
    outputPricePerMTok: '$3.00',
    cachedInputPricePerMTok: '$0.05（文本/图像/视频）/ $0.10（音频）',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: true,
    officialSourceUrls: [
      { label: 'Model', url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash' },
      { label: 'Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
      { label: 'Rate limits', url: 'https://ai.google.dev/gemini-api/docs/rate-limits' },
    ],
    notes: '原预置名“Gemini Flash”已映射为当前稳定官方型号 Gemini 3.5 Flash。',
  },
  'deepseek-v4-pro': {
    officialPositioning: 'DeepSeek V4 Pro 高能力型号，适合复杂推理、代码与智能体工作流。',
    contextWindow: '1M tokens',
    maxOutputTokens: '128K（默认 32K）',
    inputPricePerMTok: '¥3.00（国内未命中） / $0.435（国际未命中）',
    outputPricePerMTok: '¥6.00（国内） / $0.87（国际）',
    cachedInputPricePerMTok: '¥0.025（国内命中） / $0.003625（国际命中）',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: '待补充',
    officialSourceUrls: [
      { label: 'Model', url: 'https://api-docs.deepseek.com/news/news260309' },
      { label: 'Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
      { label: 'Rate limits', url: 'https://api-docs.deepseek.com/quick_start/rate_limit' },
    ],
    notes: '国内官方长期价：缓存命中输入 ¥0.025，未命中输入 ¥3.00，输出 ¥6.00。国际官网：缓存命中输入 $0.003625，未命中输入 $0.435，输出 $0.87。补充说明：发布原价为输入 ¥12、输出 ¥24，2026 年 5 月官宣永久降至 1/4，不再回调原价。',
  },
  'deepseek-v4-flash': {
    officialPositioning: 'DeepSeek V4 Flash 快速型号，适合低延迟、高吞吐与批量任务。',
    contextWindow: '200K tokens',
    maxOutputTokens: '128K（默认 32K）',
    inputPricePerMTok: '¥1.00（国内未命中） / $0.14（国际未命中）',
    outputPricePerMTok: '¥2.00（国内） / $0.28（国际）',
    cachedInputPricePerMTok: '¥0.02（国内命中） / $0.014（国际命中）',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: '待补充',
    officialSourceUrls: [
      { label: 'Model', url: 'https://api-docs.deepseek.com/news/news260309' },
      { label: 'Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
      { label: 'Rate limits', url: 'https://api-docs.deepseek.com/quick_start/rate_limit' },
    ],
    notes: '国内官方长期价：缓存命中输入 ¥0.02，未命中输入 ¥1.00，输出 ¥2.00。国际官网：缓存命中输入 $0.014，未命中输入 $0.14，输出 $0.28。',
  },
  'kimi-k2.6': {
    officialPositioning: 'Moonshot 面向 Agent、代码与多模态任务的 Kimi K2 系列模型。',
    contextWindow: '256K tokens',
    maxOutputTokens: '官方页面未单列，请查看模型文档',
    inputPricePerMTok: '¥6.50（国内未命中） / ≈$0.95（美元参考）',
    outputPricePerMTok: '¥27.00（国内） / ≈$4.00（美元参考）',
    cachedInputPricePerMTok: '¥1.10（国内命中）',
    supportsVision: true,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: '待补充',
    officialSourceUrls: [
      { label: 'Model', url: 'https://platform.moonshot.cn/docs/guide/kimi-k2-6-quickstart' },
      { label: 'Pricing', url: 'https://platform.moonshot.cn/docs/pricing/chat' },
      { label: 'Rate limits', url: 'https://platform.moonshot.cn/docs/pricing/limits' },
    ],
    notes: 'Moonshot 官方 API 标准价：缓存命中输入 ¥1.10，未命中输入 ¥6.50，输出 ¥27.00。美元换算参考：未命中输入约 $0.95 / 百万 Token，输出约 $4.00 / 百万 Token。',
  },
  'glm-5.1': {
    officialPositioning: '智谱面向 Coding 与长程 Agent 任务的旗舰模型。',
    contextWindow: '200K tokens',
    maxOutputTokens: '128K tokens',
    inputPricePerMTok: '¥3.00',
    outputPricePerMTok: '¥16.00',
    cachedInputPricePerMTok: '¥0.60',
    supportsVision: false,
    supportsToolCalling: true,
    supportsStructuredOutput: true,
    supportsBatch: true,
    officialSourceUrls: [
      { label: 'Model', url: 'https://docs.bigmodel.cn/cn/guide/models/text/glm-5-1' },
      { label: 'Pricing', url: 'https://open.bigmodel.cn/pricing' },
      { label: 'Rate limits', url: 'https://docs.bigmodel.cn/cn/api/rate-limit' },
    ],
  },
  'gpt-image': {
    displayName: 'GPT Image 2',
    officialPositioning: 'OpenAI 当前高能力图片生成与编辑模型。',
    inputPricePerMTok: '$8.00（图像）/ $5.00（文本）',
    outputPricePerMTok: '$30.00（图像输出 tokens）',
    cachedInputPricePerMTok: '$2.00（图像）/ $1.25（文本）',
    supportsReferenceImage: true,
    supportsInpainting: true,
    priceUnit: 'per image token',
    officialSourceUrls: [
      { label: 'Image guide', url: 'https://platform.openai.com/docs/guides/image-generation' },
      { label: 'Pricing', url: 'https://openai.com/api/pricing/' },
      { label: 'Models', url: 'https://platform.openai.com/docs/models' },
    ],
  },
  'google-imagen': {
    displayName: 'Imagen 4',
    officialPositioning: 'Google 文生图模型系列，提供快速生成与最高 2K 清晰度。',
    maxResolution: '最高 2K',
    outputPricePerMTok: '$0.039 / image（标准）',
    priceUnit: 'per image',
    officialSourceUrls: [
      { label: 'Models', url: 'https://ai.google.dev/gemini-api/docs/models' },
      { label: 'Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
      { label: 'Imagen', url: 'https://ai.google.dev/gemini-api/docs/imagen' },
    ],
  },
  'midjourney': {
    officialPositioning: 'Midjourney 官方图片创作服务；官方文档主要面向订阅产品。',
    priceUnit: 'subscription / GPU time',
    officialSourceUrls: providerSources.Midjourney,
    notes: '官方未提供公开通用 API 定价；不要把第三方 Midjourney API 价格当作官方价格。',
  },
  'stable-diffusion': {
    officialPositioning: 'Stability AI 的 Stable Image 与 Stable Diffusion 图片生成、编辑模型系列。',
    priceUnit: 'credits / image',
    officialSourceUrls: providerSources['Stability AI'],
    notes: '具体 credits 随端点和模型变化，应以 Stability Developer Platform 当前定价为准。',
  },
  'flux': {
    officialPositioning: 'Black Forest Labs 的 FLUX.2 图片生成与编辑模型系列。',
    outputPricePerMTok: 'from $0.014 / image',
    priceUnit: 'per image / megapixel',
    supportsReferenceImage: true,
    supportsStyleReference: true,
    officialSourceUrls: providerSources['Black Forest Labs'],
    notes: 'FLUX.2 按输出分辨率计价；Pro from $0.03，Max from $0.07，具体价格使用官方计算器。',
  },
  'runway-gen': {
    officialPositioning: 'Runway API 的 Gen 系列视频生成模型。',
    outputPricePerMTok: 'Gen-4.5：12 credits / second',
    priceUnit: '$0.01 / credit',
    supportsReferenceImage: true,
    supportsFirstLastFrame: true,
    officialSourceUrls: providerSources.Runway,
  },
  'luma-dream-machine': {
    officialPositioning: 'Luma Dream Machine API 提供文本、图片到视频及视频修改能力。',
    generationModes: ['text-to-video', 'image-to-video', 'video-to-video'],
    supportsReferenceImage: true,
    supportsStyleReference: true,
    officialSourceUrls: providerSources['Luma AI'],
  },
  'elevenlabs': {
    officialPositioning: 'ElevenLabs 面向自然语音合成、声音设计和声音克隆的音频平台。',
    supportsVoiceClone: true,
    supportsLipSync: true,
    priceUnit: 'per character / audio minute',
    officialSourceUrls: providerSources.ElevenLabs,
  },
  'whisper': {
    officialPositioning: 'OpenAI 通用语音识别模型，用于转录和翻译音频。',
    outputPricePerMTok: '$0.006 / minute',
    priceUnit: 'per minute',
    officialSourceUrls: [
      { label: 'Speech to text', url: 'https://platform.openai.com/docs/guides/speech-to-text' },
      { label: 'Pricing', url: 'https://openai.com/api/pricing/' },
      { label: 'Models', url: 'https://platform.openai.com/docs/models' },
    ],
  },
  'gemini-audio': {
    displayName: 'Gemini 3.1 Flash TTS Preview',
    officialPositioning: 'Google 面向低延迟、可控语音生成的 Flash TTS 预览模型。',
    inputPricePerMTok: '$1.00（文本）',
    outputPricePerMTok: '$20.00（音频）',
    priceUnit: 'audio tokens（25 tokens / second）',
    officialSourceUrls: [
      { label: 'Models', url: 'https://ai.google.dev/gemini-api/docs/models' },
      { label: 'Pricing', url: 'https://ai.google.dev/gemini-api/docs/pricing' },
      { label: 'Speech', url: 'https://ai.google.dev/gemini-api/docs/speech-generation' },
    ],
  },
  'openai-embedding': {
    officialPositioning: 'OpenAI 文本向量模型系列，用于搜索、聚类、推荐和 RAG。',
    inputPricePerMTok: '$0.02–$0.13（按 text-embedding-3 型号）',
    priceUnit: 'per token',
    officialSourceUrls: [
      { label: 'Embeddings', url: 'https://platform.openai.com/docs/guides/embeddings' },
      { label: 'Pricing', url: 'https://openai.com/api/pricing/' },
      { label: 'Models', url: 'https://platform.openai.com/docs/models' },
    ],
  },
  'jina-embeddings': {
    displayName: 'Jina Embeddings v4',
    officialPositioning: 'Jina 多语言、多模态向量模型，支持 dense 与 late-interaction 输出。',
    contextWindow: '32,768 tokens',
    outputPricePerMTok: 'v4 API 免费（非商业许可限制）',
    priceUnit: 'per token / image tile',
    officialSourceUrls: providerSources['Jina AI'],
  },
  'jina-reranker': {
    displayName: 'Jina Reranker v3',
    officialPositioning: 'Jina 多语言文档重排模型，可在长上下文中进行跨文档交互排序。',
    contextWindow: '131K tokens',
    outputPricePerMTok: '新 API Key 前 10M tokens 免费；付费套餐见官方',
    priceUnit: 'per token',
    officialSourceUrls: providerSources['Jina AI'],
  },
  'voyage-ai': {
    displayName: 'Voyage AI Embeddings',
    officialPositioning: 'Voyage AI 面向通用、代码、金融、法律和多模态检索的向量模型系列。',
    inputPricePerMTok: '$0.02–$0.18 / 1M tokens（按型号）',
    priceUnit: 'per token / pixel',
    officialSourceUrls: providerSources['Voyage AI'],
    notes: '官方为当前主力文本模型提供每账户前 200M tokens 免费额度；具体型号价格不同。',
  },
  'cohere-rerank': {
    displayName: 'Cohere Rerank',
    officialPositioning: 'Cohere 企业搜索与 RAG 候选结果重排模型系列。',
    priceUnit: 'per search / managed instance',
    officialSourceUrls: providerSources.Cohere,
  },
  'cohere-embed': {
    displayName: 'Cohere Embed',
    officialPositioning: 'Cohere 面向企业语义搜索和 RAG 的嵌入模型系列。',
    priceUnit: 'per token / managed instance',
    officialSourceUrls: providerSources.Cohere,
  },
  'bge': {
    displayName: 'BGE-M3',
    officialPositioning: 'BAAI 开源多语言、多功能、多粒度文本向量模型。',
    contextWindow: '8,192 tokens',
    priceUnit: 'open source / infrastructure',
    officialSourceUrls: providerSources.BAAI,
  },
}

for (const model of modelsData) {
  const verified = verifiedModelData[model.id]
  if (verified) Object.assign(model, verified)
}

export const pendingText = pending
