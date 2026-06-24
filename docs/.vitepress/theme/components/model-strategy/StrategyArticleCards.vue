<template>
  <section class="content-section">
    <div class="section-title">
      <span>静态文档</span>
      <h2>模型策略文档</h2>
      <p>点击问题卡片，直接查看答案。</p>
    </div>
    <div class="category-tabs">
      <button v-for="tab in tabs" :key="tab" :class="{ active: active === tab }" @click="active = tab">{{ tab }}</button>
    </div>
    <div class="article-grid">
      <article v-for="item in filtered" :key="item.id" tabindex="0" role="button" @click="selected = item" @keydown.enter="selected = item">
        <span>{{ item.category }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
        <button>查看回答 →</button>
      </article>
    </div>
    <StrategyDetailModal
      :open="Boolean(selected)"
      :title="selected?.title || ''"
      :category="selected?.category || ''"
      :answer="selected?.answer || ''"
      @close="selected = null"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import StrategyDetailModal from './StrategyDetailModal.vue'

const props = defineProps<{ query: string }>()
const tabs = ['全部', '新手入门', '成本优化', '场景选型', '企业实践', '工具接入', 'AI 漫剧专题']
const active = ref('全部')
const strategyArticles = [
  { id: 0, category: '新手入门', title: '新手第一次接 API 该选什么模型？', summary: '先用一个稳定通用模型跑通，再按任务拆专用模型。', answer: '先选稳定的通用主力模型，再按任务逐步细分。新手最容易犯的错误，是一开始就在最低价和最高性能之间摇摆，结果既没跑通业务，也没建立成本基线。更稳的做法是：先拿一个中高可靠文本模型验证流程，再根据是否要代码、RAG、客服、图片或视频拆分专用模型。' },
  { id: 1, category: '新手入门', title: '输入、输出、缓存命中、缓存未命中是什么意思？', summary: '先分清输入、输出和缓存，再谈成本。', answer: '输入是你发给模型的内容，输出是模型返回的内容。缓存命中指重复使用同一段系统提示、上下文或前缀时，平台按更低价格计费；缓存未命中则按正常输入价计费。真正做预算时，要把缓存命中率单独算出来，否则预估通常会偏高。' },
  { id: 2, category: '新手入门', title: '为什么同一个模型不同平台价格不一样？', summary: '价格差异通常来自分发层、服务层和结算层。', answer: '因为平台卖的不只是底层模型，还包括路由、稳定性、限流策略、日志、SDK 兼容、企业支持和结算方式。有的平台是官方直连价，有的是二次分发价，有的把缓存、重试、图片处理或管理能力打包进去。所以选型时不能只比单价，要同时比接口兼容、稳定性和实际可得吞吐。' },
  { id: 3, category: '新手入门', title: '高价模型一定更好吗？', summary: '看任务，不看绝对最贵。', answer: '不一定。高价模型通常在复杂推理、长上下文、代码审查、高风险场景更强，但在客服 FAQ、批量改写、标题生成、标签分类这类任务里，低价模型往往已经够用。判断标准不是“最强”，而是“在这个任务里错误率和成本是否合算”。' },
  { id: 4, category: '成本优化', title: '如何计算一次 API 调用真实成本？', summary: '真实成本要按整条链路核算。', answer: '至少同时计算四项：输入成本、输出成本、缓存命中后的输入成本、失败重试成本。若是 AI 漫剧、生图、生视频，还要加上图片张数、视频秒数、配音时长和人工筛图返工成本。真实成本永远是整条工作流成本，不是单次调用账面单价。' },
  { id: 5, category: '成本优化', title: '输出 Token 为什么通常更贵？', summary: '输出贵，是因为生成比读取更耗算力。', answer: '因为输出阶段占用的是模型生成能力，而不是简单读取上下文。越长、越复杂、越要求结构化的输出，消耗越高。因此长报告、长代码、长文案场景，往往要优先压缩输出长度、分段生成或者先出提纲再展开。' },
  { id: 6, category: '成本优化', title: '长上下文任务怎么降低成本？', summary: '先减输入，再谈模型。', answer: '核心办法只有三个：先检索再喂、先摘要再喂、固定前缀做缓存。不要把整库资料每次都塞进去，也不要把不变化的大段系统提示反复重发。RAG、分块摘要、缓存前缀，是长上下文控成本的三件套。' },
  { id: 7, category: '成本优化', title: '批量任务如何选择低价模型？', summary: '低价模型适合可抽检、可返工的批量任务。', answer: '先看任务容错率，再看吞吐和重试率。若任务是分类、清洗、改写、提取，先用低价模型打底，再抽样质检；若任务涉及法规、合同、客户承诺、财务口径，就不能只看低价。批量任务最怕的是单价低但返工率高。' },
  { id: 8, category: '成本优化', title: '缓存命中为什么能显著省钱？', summary: '大前缀复用越多，缓存越值钱。', answer: '因为很多业务都会反复发送相同的系统提示、工具说明和固定知识前缀。把这些内容稳定下来，就能让后续请求走缓存命中价。对长 prompt 的企业知识库、客服和 Agent 场景，缓存命中率通常比选哪一家模型更影响总账单。' },
  { id: 9, category: '场景选型', title: '写代码用什么模型更划算？', summary: '代码场景适合做强模型和快模型分层。', answer: '如果是复杂重构、跨文件修改、测试补全和 PR Review，优先选代码能力和工具调用更稳的主力模型；如果是补全、小修小改、批量生成样板代码，则可以用更快更便宜的模型。真正划算的是分层：重任务走强模型，轻任务走快模型。' },
  { id: 10, category: '场景选型', title: '长文档总结模型怎么选？', summary: '长文档先看上下文和稳定性。', answer: '优先看上下文、摘要稳定性和中文表达，不要先看峰值智力。长文档总结的关键是能否稳定处理大输入、保持层次、少遗漏，而不是能不能在单题推理里夺冠。企业资料、会议纪要、制度文档更要看输入成本和缓存机制。' },
  { id: 11, category: '场景选型', title: '客服机器人怎么选模型？', summary: '客服不是单模型问题，而是分层问题。', answer: '客服优先指标通常是速度、成本、稳定性、结构化输出，而不是最强推理。FAQ、意图分类、工单摘要、标准回复这类高频任务适合快模型；升级判定、复杂投诉、退款争议这类任务要有高能力兜底模型。' },
  { id: 12, category: '场景选型', title: '企业知识库 RAG 怎么选模型？', summary: 'RAG 要拆成检索、精排、生成三段看。', answer: 'RAG 至少涉及三段：Embedding 召回、Rerank 精排、答案生成。只看回答模型会漏掉大量检索质量问题。正确做法是先把召回和精排做稳，再选一个在中文、长上下文、引用式回答上表现稳定的生成模型。' },
  { id: 13, category: '场景选型', title: 'AI Agent 工具调用为什么不能只看价格？', summary: 'Agent 最贵的常常不是单价，而是失败。', answer: '因为 Agent 的成本不是一次调用，而是规划、多轮调用、工具失败、重试、状态恢复的总和。单价便宜但 JSON 不稳、函数调用不稳、容易跑偏的模型，最终会让整条链路更贵。Agent 场景要优先看成功率。' },
  { id: 14, category: '场景选型', title: '图片理解场景怎么选模型？', summary: '视觉理解要看结构化能力，不只看是否支持图片。', answer: '先区分是 OCR、截图理解、图表理解还是 UI 分析。若要结构化提取和复杂图文联合理解，优先多模态理解稳定的模型；若只是粗略识别，可用更快的视觉模型。关键不是“能看图”，而是“能不能稳定输出你要的结构”。' },
  { id: 15, category: '场景选型', title: '数据分析场景怎么选模型？', summary: '数据分析是代码、结构化和业务口径的组合题。', answer: '如果需要 SQL、Python、指标解释和报告生成，优先代码能力、结构化输出和长回答稳定性。若只是口径解释和周报润色，通用模型即可。不要让模型直接替代数据校验，分析结果必须回到真实表和业务口径。' },
  { id: 16, category: '企业实践', title: '主力模型 + 备用模型怎么搭配？', summary: '备用模型的价值在于兜底，不在于绝对低价。', answer: '主力模型负责大多数正常流量，备用模型负责主力不可用、超时或成本超标时的降级承接。两者最好保持接口兼容、提示词接近、输出结构一致。备用模型不一定是最便宜的，但必须足够稳定。' },
  { id: 17, category: '企业实践', title: '低价模型初筛 + 高阶模型复核怎么做？', summary: '先筛后审，是企业最常见的控成本结构。', answer: '把可标准化的任务先交给低价模型：分类、抽取、初稿、候选答案；把高风险动作交给高阶模型：复核、裁决、最终输出。这样能把大部分 token 花在真正需要高能力的环节，而不是把所有流量都送去旗舰模型。' },
  { id: 18, category: '企业实践', title: '企业生产环境为什么要看错误率？', summary: '线上选型先看稳定性，不先看榜单。', answer: '因为线上成本里，超时、空响应、结构不合法、工具调用失败、结果跑偏都会直接变成用户体验问题和人工补救成本。业务系统看的是成功率、可恢复性和平均修复成本，不是纸面模型榜单。' },
  { id: 19, category: '企业实践', title: '高并发任务为什么要看限流和稳定性？', summary: '高并发要把吞吐和降级一并评估。', answer: '峰值并发会放大所有问题：超时、限流、重试、排队、缓存失效。一个实验室里效果不错的模型，如果并发一上来就频繁 429 或长尾延迟失控，实际不可用。并发场景要把限流、吞吐和降级一起设计。' },
  { id: 20, category: '企业实践', title: '如何设计模型降级策略？', summary: '降级策略要按错误类型预先设计。', answer: '先定义不可接受的状态：超时、价格超标、结构不合法、工具失败、服务不可用。然后为每种状态绑定明确降级路径，例如从高阶模型降到快模型、从自由回答降到模板回答、从长回答降到摘要回答。降级不是随机切换，而是预先定义好的业务策略。' },
  { id: 21, category: '工具接入', title: 'Cursor 用什么模型？', summary: 'Cursor 更适合双模型结构。', answer: 'Cursor 适合把复杂编辑和仓库级理解交给强代码模型，把补全和短轮问答交给更快的模型。你真正需要的是一个“主编辑模型 + 快速补全模型”的组合，而不是单一全能模型。' },
  { id: 22, category: '工具接入', title: 'Claude Code 用什么模型？', summary: 'Claude Code 优先看长程代码稳定性。', answer: 'Claude Code 更吃长上下文、代码理解、工具调用和多轮修复稳定性。适合把复杂改动、调试和仓库级任务交给高能力模型，小修小补再交给成本更低的模型。重点看长程稳定性。' },
  { id: 23, category: '工具接入', title: 'Codex 用什么模型？', summary: 'Codex 要看代码能力和执行闭环。', answer: 'Codex 类工作流通常要兼顾代码能力、命令执行、解释清晰度和多文件修改。主力模型应当擅长代码与工具协同，备用模型负责快速回答和轻量生成。单看代码分数不够，要看执行闭环。' },
  { id: 24, category: '工具接入', title: 'Cherry Studio 怎么配置模型？', summary: '本地客户端最怕单模型包打天下。', answer: '建议至少配三层：一个通用文本主力，一个低价快模型，一个专用多模态或代码模型。这样日常问答、批量任务和特殊任务可以分流，不会把所有场景都压在一个高价模型上。' },
  { id: 25, category: '工具接入', title: 'OpenAI SDK 兼容层怎么选模型？', summary: '兼容层先测接口行为，不先看宣传。', answer: '看三件事：接口兼容程度、结构化输出稳定性、工具调用行为是否一致。很多供应商能兼容基础聊天接口，但在函数调用、JSON schema、流式细节和错误码上会有差异。正式接入前必须做兼容性回归。' },
  { id: 26, category: '工具接入', title: 'Anthropic 原生协议怎么选模型？', summary: '协议选型本质上是工作流选型。', answer: '原生协议的优势在于工具使用、多轮上下文和安全边界更清晰。选型时优先看长上下文价格、缓存机制、工具稳定性和企业接入要求。适合需要较强工作流控制的团队。' },
  { id: 27, category: 'AI 漫剧专题', title: 'AI 漫剧从脚本到视频怎么选模型？', summary: 'AI 漫剧要按工作流分段选型。', answer: '应该拆成工作流：剧情脚本、分镜拆解、角色设定、角色图、场景图、图生视频、配音、字幕和发布文案。文本阶段优先中文创作和结构化输出；角色图和场景图优先一致性与风格控制；视频阶段优先运动自然度和首尾帧控制；配音阶段优先情绪和角色区分。' },
  { id: 28, category: 'AI 漫剧专题', title: 'AI 漫剧为什么不能只用一个模型？', summary: '单模型很难覆盖完整漫剧生产链。', answer: '因为脚本、画图、做视频、配音是完全不同的能力域。文本模型擅长剧情和分镜，生图模型擅长角色和场景，生视频模型擅长运动和镜头，TTS 模型擅长声音表现。单模型通常只能覆盖其中一部分。' },
  { id: 29, category: 'AI 漫剧专题', title: '角色一致性应该看哪些模型能力？', summary: '角色一致性比单张美观更重要。', answer: '重点看参考图输入、角色一致性、多参考图控制、风格参考和重绘能力。只看静态画面质量不够，因为漫剧需要同一角色在不同镜头、不同姿势、不同表情下仍然可识别。' },
  { id: 30, category: 'AI 漫剧专题', title: '图生视频和文生视频怎么选？', summary: '生产优先图生视频，探索可先文生视频。', answer: '如果你已经有稳定角色图、封面图或分镜图，优先图生视频，因为可控性更高；如果只是快速探索概念、情绪或风格，可以先文生视频。真正生产时，图生视频通常更适合做角色连续片段。' },
  { id: 31, category: 'AI 漫剧专题', title: 'AI 短剧成本主要花在哪里？', summary: '短剧成本主要花在视觉和返工，不在文字。', answer: '主要不在文本 token，而在图片张数、视频秒数、反复重试、配音时长和人工筛选。尤其角色不稳、动作不自然、手部细节出错时，返工会迅速抬高总成本。' },
  { id: 32, category: 'AI 漫剧专题', title: '生图模型怎么选：Midjourney、Flux、Imagen、GPT Image、Seedream？', summary: '先按目标画面类型选生图模型。', answer: 'Midjourney 强在风格和主视觉；Flux 在商业质感和可控性之间较均衡；Imagen 偏写实和稳定；GPT Image 适合编辑链路和参考图任务；Seedream 更适合中文商业视觉和角色一致性尝试。实际选型要看你是做海报、商品图还是漫剧角色。' },
  { id: 33, category: 'AI 漫剧专题', title: '生视频模型怎么选：Sora、Veo、Kling、Runway、Luma、Hailuo？', summary: '视频模型的差异主要在自然度、可控性和编辑链路。', answer: 'Veo 和 Seedance 更偏高质量镜头与音画结合；Sora 适合高质量创意片段；Kling 和 Hailuo 更适合中文内容和角色动作尝试；Runway 强在编辑链路和首尾帧；Luma 擅长镜头运动。你要先决定是做广告感、剧情感还是工具化生产。' },
  { id: 34, category: 'AI 漫剧专题', title: 'AI 配音模型怎么选？', summary: '配音模型先看角色区分和情绪控制。', answer: '单人旁白可以优先稳定和成本，多角色漫剧则要看声音区分度、情绪控制和声音克隆能力。若要商业发布，还要确认授权和可商用边界。听感一致性比单句惊艳更重要。' },
  { id: 35, category: 'AI 漫剧专题', title: '如何设计 AI 漫剧低成本工作流？', summary: '低成本工作流的核心是减少返工。', answer: '建议用“强文本 + 中价生图 + 中价图生视频 + 稳定 TTS”的组合，先把脚本和分镜定死，再少量生成角色标准图，最后复用这些图做视频。低成本的关键不是全用低价模型，而是减少返工。' },
  { id: 36, category: 'AI 漫剧专题', title: '如何设计 AI 漫剧高质量工作流？', summary: '高质量工作流要接受多模型协同和人工复核。', answer: '高质量方案通常是“高阶文本脚本 + 高一致性角色图 + 高自然度图生视频 + 强情绪配音 + 人工剪辑复核”。这条链路更贵，但能显著降低角色崩坏、镜头失控和声音不贴角的问题。' },
]
const filtered = computed(() =>
  strategyArticles.filter((item) =>
    (active.value === '全部' || item.category === active.value) &&
    JSON.stringify(item).toLowerCase().includes(props.query.toLowerCase()),
  ),
)
const selected = ref<(typeof strategyArticles)[number] | null>(null)
</script>

<style scoped>
.content-section{padding:70px 0}.section-title{text-align:center;margin-bottom:22px}.section-title span{font-size:12px;font-weight:800;color:#15803d}.section-title h2{margin:5px 0 7px;font-size:30px}.section-title p{margin:0;color:#64748b}.category-tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin-bottom:18px}.category-tabs button{padding:7px 11px;border:1px solid #d1d5db;border-radius:999px;background:white;color:#475569;cursor:pointer}.category-tabs button.active{border-color:#16a34a;background:#16a34a;color:white}.article-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.article-grid article{padding:17px;border:1px solid #d1fae5;border-radius:16px;background:rgba(255,255,255,.8);cursor:pointer;transition:transform .2s,box-shadow .2s}.article-grid article:hover,.article-grid article:focus-visible{transform:translateY(-3px);outline:none;box-shadow:0 15px 35px rgba(28,44,72,.1)}.article-grid span{font-size:10px;font-weight:800;color:#15803d}.article-grid h3{margin:7px 0;font-size:15px}.article-grid p{margin:0 0 10px;color:#64748b;font-size:11px;line-height:1.65}.article-grid article>button{padding:0;border:0;background:transparent;color:#166534;font-size:11px;font-weight:800;cursor:pointer}@media(max-width:760px){.article-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:520px){.article-grid{grid-template-columns:1fr}.content-section{padding:52px 0}}
</style>
