<template>
  <div class="hp">

    <!-- ── Hero ──────────────────────────────────────── -->
    <section class="hp-hero">
      <div class="hp-hero-bg">
        <div class="hp-grid"></div>
        <div class="hp-orb hp-orb-1"></div>
        <div class="hp-orb hp-orb-2"></div>
      </div>
      <div class="hp-hero-body">
        <div class="hp-badge">🐼 熊猫算力 PandaToken</div>
        <h1 class="hp-title">
          <span class="hp-title-main">知识中心</span>
        </h1>
        <p class="hp-subtitle">
          一站式 AI 模型聚合平台 · 文档、教程与解答<br>
          帮助个人开发者和企业客户高效接入 AI 能力
        </p>
        <div class="hp-actions">
          <a href="/guide/" class="hp-btn hp-btn-primary">
            快速开始
            <svg class="btn-arrow" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="/faq/" class="hp-btn hp-btn-secondary">常见问题</a>
        </div>
        <div class="hp-stats">
          <div class="hp-stat">
            <strong>50+</strong>
            <span>支持模型</span>
          </div>
          <div class="hp-stat-divider"></div>
          <div class="hp-stat">
            <strong>99.9%</strong>
            <span>可用性 SLA</span>
          </div>
          <div class="hp-stat-divider"></div>
          <div class="hp-stat">
            <strong>OpenAI 兼容</strong>
            <span>一键切换</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 功能卡片 ─────────────────────────────────── -->
    <section class="hp-features">
      <div class="hp-container">
        <div class="hp-cards">
          <a class="hp-card" href="/guide/">
            <div class="hp-card-icon">🚀</div>
            <h3>快速入门</h3>
            <p>从零开始接入熊猫算力 API，5 分钟完成首次调用</p>
            <span class="hp-card-link">了解更多 →</span>
          </a>
          <a class="hp-card" href="/faq/">
            <div class="hp-card-icon">❓</div>
            <h3>常见问题</h3>
            <p>收录个人开发者和企业客户高频提问，快速自助解决</p>
            <span class="hp-card-link">查看 FAQ →</span>
          </a>
          <a class="hp-card" href="/api/">
            <div class="hp-card-icon">🔌</div>
            <h3>API 接入</h3>
            <p>完整接口文档、鉴权方式、限速说明与错误码参考</p>
            <span class="hp-card-link">查看文档 →</span>
          </a>
          <a class="hp-card" href="/models/">
            <div class="hp-card-icon">🤖</div>
            <h3>模型选型</h3>
            <p>主流大模型能力对比、价格分析与最佳实践推荐</p>
            <span class="hp-card-link">选择模型 →</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ── 个人 / 企业 双入口 ──────────────────────── -->
    <section class="hp-audience">
      <div class="hp-container">
        <h2 class="hp-section-title">面向不同用户的专属方案</h2>
        <div class="hp-audience-grid">
          <div class="hp-aud-card hp-aud-personal">
            <div class="hp-aud-header">
              <span class="hp-aud-icon">👨‍💻</span>
              <h3>个人开发者</h3>
            </div>
            <ul class="hp-aud-list">
              <li>✅ 兼容 OpenAI SDK，一行代码无缝切换</li>
              <li>✅ 按量计费，无月费无最低消费</li>
              <li>✅ 免费额度快速上手，即刻体验</li>
            </ul>
            <a href="/faq/personal/" class="hp-aud-cta hp-aud-cta-personal">
              查看个人版 FAQ →
            </a>
          </div>
          <div class="hp-aud-card hp-aud-enterprise">
            <div class="hp-aud-header">
              <span class="hp-aud-icon">🏢</span>
              <h3>企业客户</h3>
            </div>
            <ul class="hp-aud-list">
              <li>✅ 支持私有化部署与深度定制集成</li>
              <li>✅ 99.9% SLA 保障 + 7×24 专属客服</li>
              <li>✅ 批量计费，大规模调用更具优势</li>
            </ul>
            <a href="/faq/enterprise/" class="hp-aud-cta hp-aud-cta-enterprise">
              查看企业版方案 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 最近更新 ─────────────────────────────────── -->
    <section class="hp-updates">
      <div class="hp-container">
        <div class="hp-updates-header">
          <h2 class="hp-section-title" style="margin-bottom:0">最近更新</h2>
          <a href="/changelog/" class="hp-updates-more">查看完整日志 →</a>
        </div>
        <div class="hp-updates-list">
          <a
            v-for="item in recentUpdates"
            :key="item.link"
            :href="item.link"
            class="hp-update-item"
          >
            <span class="hp-update-date">{{ item.date }}</span>
            <div class="hp-update-main">
              <span class="hp-update-tag" :class="`tag-${item.type}`">{{ item.typeLabel }}</span>
              <span class="hp-update-title">{{ item.title }}</span>
            </div>
            <p class="hp-update-desc">{{ item.desc }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- ── 页脚 ──────────────────────────────────────── -->
    <footer class="hp-footer">
      <div class="hp-container">
        <div class="hp-footer-grid">
          <div class="hp-footer-brand">
            <div class="hp-footer-logo">🐼 熊猫算力</div>
            <p>一站式 AI 模型聚合平台</p>
          </div>
          <div class="hp-footer-col">
            <h4>文档</h4>
            <ul>
              <li><a href="/guide/">快速入门</a></li>
              <li><a href="/api/">API 文档</a></li>
              <li><a href="/models/">模型说明</a></li>
            </ul>
          </div>
          <div class="hp-footer-col">
            <h4>支持</h4>
            <ul>
              <li><a href="/faq/">常见问题</a></li>
              <li><a href="/blog/">技术博客</a></li>
              <li><a href="/changelog/">更新日志</a></li>
            </ul>
          </div>
          <div class="hp-footer-col">
            <h4>联系我们</h4>
            <ul>
              <li>📧 support@pandatoken.com</li>
              <li>🔗 <a href="https://pandatoken.com" target="_blank" rel="noopener">pandatoken.com</a></li>
            </ul>
          </div>
        </div>
        <div class="hp-footer-bottom">
          <span>备案号：沪ICP备XXXXXXXX号</span>
          <span>Copyright © 2024–2025 熊猫算力</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
interface UpdateItem {
  date: string
  type: 'new' | 'update' | 'fix' | 'blog'
  typeLabel: string
  title: string
  desc: string
  link: string
}

const recentUpdates: UpdateItem[] = [
  {
    date: '2026-05-10',
    type: 'new',
    typeLabel: '新上线',
    title: 'Gemini 2.5 Pro 正式接入',
    desc: '熊猫算力现已支持 Google Gemini 2.5 Pro，支持 100 万 token 超长上下文。',
    link: '/changelog/2026-05',
  },
  {
    date: '2026-05-08',
    type: 'update',
    typeLabel: '价格调整',
    title: 'Claude 3.5 系列全线降价 20%',
    desc: 'Anthropic 官方降价，熊猫算力同步跟进，即日起生效。',
    link: '/changelog/2026-05',
  },
  {
    date: '2026-05-03',
    type: 'blog',
    typeLabel: '技术博客',
    title: '如何为你的场景选择合适的 AI 模型',
    desc: '对比 GPT-4o、Claude 3.5、Gemini 2.5 在推理、创意、代码三个维度的实际表现。',
    link: '/blog/how-to-choose-model',
  },
  {
    date: '2026-04-25',
    type: 'new',
    typeLabel: '新功能',
    title: '企业版支持独立 Key 池隔离',
    desc: '多项目、多团队可独立分配 API Key，用量统计和计费完全隔离。',
    link: '/changelog/',
  },
  {
    date: '2026-04-18',
    type: 'fix',
    typeLabel: '问题修复',
    title: '修复 streaming 模式下偶发断流问题',
    desc: '高并发场景下 SSE 连接稳定性显著提升。',
    link: '/changelog/',
  },
]
</script>

<style scoped>
/* ── Reset & Base ── */
.hp {
  background: #0a0f1e;
  color: #e2e8f0;
  font-family: var(--vp-font-family-base);
  line-height: 1.6;
}

.hp-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ── Hero ── */
.hp-hero {
  position: relative;
  min-height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem 4rem;
  overflow: hidden;
  text-align: center;
}

.hp-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #0a0f1e 0%, #0d1b2a 55%, #0a1628 100%);
}

.hp-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.04) 1px, transparent 1px);
  background-size: 56px 56px;
}

.hp-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
}

.hp-orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
  opacity: 0.12;
  top: -140px;
  left: 15%;
}

.hp-orb-2 {
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, #00ff88 0%, transparent 70%);
  opacity: 0.1;
  bottom: -80px;
  right: 18%;
}

.hp-hero-body {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.hp-badge {
  display: inline-block;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(0, 212, 255, 0.35);
  background: rgba(0, 212, 255, 0.08);
  color: #00d4ff;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
}

.hp-title {
  margin: 0 0 1rem;
  font-size: clamp(2.4rem, 6vw, 3.8rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hp-title-main {
  background: linear-gradient(135deg, #00d4ff 10%, #00ff88 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hp-subtitle {
  margin: 0 0 2rem;
  font-size: 1.05rem;
  color: #94a3b8;
  line-height: 1.7;
}

.hp-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.hp-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.6rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s;
}

.hp-btn-primary {
  background: linear-gradient(135deg, #00d4ff, #0090c8);
  color: #0a0f1e;
  border: 1px solid transparent;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.35);
}

.hp-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 212, 255, 0.5);
}

.hp-btn-secondary {
  background: transparent;
  color: #94a3b8;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.hp-btn-secondary:hover {
  color: #e2e8f0;
  border-color: rgba(0, 212, 255, 0.4);
  background: rgba(0, 212, 255, 0.05);
}

.btn-arrow {
  width: 16px;
  height: 16px;
}

.hp-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hp-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.hp-stat strong {
  font-size: 1.1rem;
  font-weight: 700;
  color: #00d4ff;
}

.hp-stat span {
  font-size: 0.75rem;
  color: #64748b;
}

.hp-stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(0, 212, 255, 0.15);
}

/* ── Feature Cards ── */
.hp-features {
  padding: 4rem 0;
  background: #0d1520;
}

.hp-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.25rem;
}

.hp-card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  background: linear-gradient(145deg, #111827, #0d1520);
  text-decoration: none;
  color: inherit;
  transition: all 0.28s;
  position: relative;
  overflow: hidden;
}

.hp-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  border: 1px solid transparent;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.4), rgba(0, 255, 136, 0.3)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.28s;
}

.hp-card:hover::before {
  opacity: 1;
}

.hp-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.15), 0 0 0 1px rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.25);
}

.hp-card-icon {
  font-size: 2rem;
  margin-bottom: 0.9rem;
  line-height: 1;
}

.hp-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #e2e8f0;
}

.hp-card p {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.6;
  flex: 1;
}

.hp-card-link {
  font-size: 0.82rem;
  color: #00d4ff;
  font-weight: 500;
}

/* ── Audience ── */
.hp-audience {
  padding: 4rem 0;
  background: #0a0f1e;
}

.hp-section-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0 0 2rem;
  text-align: center;
}

.hp-audience-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 680px) {
  .hp-audience-grid {
    grid-template-columns: 1fr;
  }
}

.hp-aud-card {
  padding: 2rem;
  border-radius: 14px;
  border: 1px solid;
  position: relative;
  overflow: hidden;
}

.hp-aud-personal {
  background: linear-gradient(145deg, #0d1b2a, #111827);
  border-color: rgba(0, 212, 255, 0.2);
}

.hp-aud-enterprise {
  background: linear-gradient(145deg, #0d1b22, #111820);
  border-color: rgba(0, 255, 136, 0.2);
}

.hp-aud-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.hp-aud-icon {
  font-size: 1.8rem;
}

.hp-aud-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #e2e8f0;
}

.hp-aud-list {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.hp-aud-list li {
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.5;
}

.hp-aud-cta {
  display: inline-block;
  padding: 0.55rem 1.2rem;
  border-radius: 7px;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.22s;
}

.hp-aud-cta-personal {
  background: rgba(0, 212, 255, 0.12);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.3);
}
.hp-aud-cta-personal:hover {
  background: rgba(0, 212, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.2);
}

.hp-aud-cta-enterprise {
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.3);
}
.hp-aud-cta-enterprise:hover {
  background: rgba(0, 255, 136, 0.18);
  box-shadow: 0 4px 16px rgba(0, 255, 136, 0.18);
}

/* ── Recent Updates ── */
.hp-updates {
  padding: 4rem 0;
  background: #0d1520;
}

.hp-updates-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.hp-updates-more {
  font-size: 0.85rem;
  color: #00d4ff;
  text-decoration: none;
}
.hp-updates-more:hover {
  text-decoration: underline;
}

.hp-updates-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.hp-update-item {
  display: grid;
  grid-template-columns: 90px 1fr;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  padding: 1rem 1.25rem;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid rgba(0, 212, 255, 0.07);
  background: #111827;
  transition: background 0.2s;
}

.hp-update-item:last-child {
  border-bottom: none;
}

.hp-update-item:hover {
  background: #1a2235;
}

.hp-update-date {
  font-size: 0.75rem;
  color: #475569;
  align-self: center;
  font-variant-numeric: tabular-nums;
}

.hp-update-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hp-update-tag {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}

.tag-new    { background: rgba(0, 212, 255, 0.15); color: #00d4ff; }
.tag-update { background: rgba(147, 51, 234, 0.15); color: #a855f7; }
.tag-fix    { background: rgba(255, 170, 0, 0.12); color: #f59e0b; }
.tag-blog   { background: rgba(0, 255, 136, 0.1);  color: #00c96a; }

.hp-update-title {
  font-size: 0.88rem;
  font-weight: 500;
  color: #e2e8f0;
}

.hp-update-desc {
  grid-column: 2;
  margin: 0.2rem 0 0;
  font-size: 0.78rem;
  color: #475569;
  line-height: 1.5;
}

/* ── Footer ── */
.hp-footer {
  background: #070c18;
  border-top: 1px solid rgba(0, 212, 255, 0.08);
  padding: 3rem 0 1.5rem;
}

.hp-footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hp-footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .hp-footer-grid {
    grid-template-columns: 1fr;
  }
}

.hp-footer-brand .hp-footer-logo {
  font-size: 1.1rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.hp-footer-brand p {
  margin: 0;
  font-size: 0.82rem;
  color: #475569;
}

.hp-footer-col h4 {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hp-footer-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.hp-footer-col li,
.hp-footer-col a {
  font-size: 0.83rem;
  color: #475569;
  text-decoration: none;
  transition: color 0.2s;
}

.hp-footer-col a:hover {
  color: #00d4ff;
}

.hp-footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
  color: #334155;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
