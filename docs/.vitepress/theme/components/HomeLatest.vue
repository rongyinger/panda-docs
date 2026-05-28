<template>
  <section class="latest-section">
    <div class="latest-container">
      <div class="latest-list-wrap">
        <div class="latest-header">
          <div>
            <span class="section-kicker">最近更新</span>
            <h2 class="section-title">精选内容</h2>
          </div>
          <a :href="withBase('/blog/')" class="more-link">查看更多 →</a>
        </div>

        <div class="latest-list">
          <a
            v-for="item in latestItems"
            :key="item.link"
            :href="withBase(item.link)"
            class="article-row glass-green-card"
          >
            <span class="article-badge" :class="`tag-${item.type}`">{{ item.tag }}</span>
            <span class="article-title">{{ item.title }}</span>
            <span class="article-date">{{ item.date }}</span>
          </a>
        </div>
      </div>

      <aside class="quick-panel glass-green-card">
        <div class="quick-header">
          <span class="section-kicker">快速使用</span>
          <h2 class="section-title">三步开始</h2>
          <p>从注册到第一次 API 调用，只保留最短路径。</p>
        </div>

        <div class="quick-steps">
          <a
            v-for="(step, index) in steps"
            :key="step.link"
            :href="withBase(step.link)"
            class="quick-step"
          >
            <span class="quick-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <strong>{{ step.title }}</strong>
              <p>{{ step.desc }}</p>
              <span>{{ step.linkText }} →</span>
            </div>
          </a>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

const latestItems = [
  {
    title: 'Codex 桌面版接入熊猫算力 · 完整教程',
    tag: '接入',
    type: 'connect',
    date: '2026-05-19',
    link: '/connect/codex-desktop',
  },
  {
    title: 'Claude 桌面版接入熊猫算力 · 完整教程',
    tag: '接入',
    type: 'connect',
    date: '2026-05-19',
    link: '/connect/claude-desktop',
  },
  {
    title: '字节跳动开源 OpenViking：重构 AI Agent 记忆中枢',
    tag: '技巧',
    type: 'tips',
    date: '2026-05-19',
    link: '/tips/openviking-agent-memory-system',
  },
  {
    title: 'AI 补贴时代落幕，渠道商黄金时期到来',
    tag: '知识',
    type: 'knowledge',
    date: '2026-05-18',
    link: '/ai-knowledge/ai-subsidy-era-channel-opportunity',
  },
  {
    title: '文献综述哪家强：五模型引用核查实测',
    tag: '知识',
    type: 'knowledge',
    date: '2026-05-18',
    link: '/ai-knowledge/literature-review-model-comparison',
  },
  {
    title: '省 Token 终极指南：10 个技巧降低 50%-80% 费用',
    tag: '技巧',
    type: 'tips',
    date: '2026-05-18',
    link: '/tips/save-token-ultimate-guide',
  },
  {
    title: 'Spring AI 接入熊猫算力教程',
    tag: '接入',
    type: 'connect',
    date: '2026-05-18',
    link: '/connect/spring-ai',
  },
  {
    title: '熊猫算力 · 快速上手指南（12 步完整流程）',
    tag: '新手',
    type: 'guide',
    date: '2026-05-18',
    link: '/guide/platform-quickstart',
  },
]

const steps = [
  {
    title: '注册并充值',
    desc: '注册账号，完成充值，准备开始调用。',
    link: '/faq/how-to-register',
    linkText: '注册指南',
  },
  {
    title: '获取 API Key',
    desc: '在控制台创建 API Key，复制并安全保存。',
    link: '/faq/how-to-create-apikey',
    linkText: '创建 Key',
  },
  {
    title: '接入你的工具',
    desc: '配置 Cursor、Claude Code 或其他客户端。',
    link: '/connect/chatbox',
    linkText: '查看教程',
  },
]
</script>

<style scoped>
.latest-section {
  padding: 0 24px 86px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F7FAF8 100%);
}

.latest-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.72fr);
  gap: 44px;
  align-items: start;
}

.latest-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.section-kicker {
  display: inline-block;
  margin-bottom: 8px;
  color: #16A34A;
  font-size: 13px;
  font-weight: 760;
}

.section-title {
  margin: 0;
  color: #111827;
  font-size: 28px;
  font-weight: 760;
  line-height: 1.25;
}

.more-link {
  color: #4B5563;
  font-size: 14px;
  font-weight: 680;
  text-decoration: none;
  white-space: nowrap;
}

.more-link:hover,
.more-link:focus-visible {
  color: #16A34A;
  outline: none;
}

.latest-list {
  display: grid;
  gap: 10px;
}

.article-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 14px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: transform 200ms ease, background 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.article-row:hover,
.article-row:focus-visible {
  transform: translateX(3px);
  outline: none;
}

.article-badge {
  min-width: 44px;
  display: inline-flex;
  justify-content: center;
  padding: 5px 9px;
  border-radius: 999px;
  background: #F3F4F6;
  color: #4B5563;
  font-size: 12px;
  font-weight: 740;
}

.tag-connect,
.tag-guide,
.tag-knowledge,
.tag-tips {
  background: #ECFDF3;
  color: #065F46;
}

.article-title {
  min-width: 0;
  color: #111827;
  font-size: 15px;
  font-weight: 650;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-date {
  color: #9CA3AF;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.quick-panel {
  padding: 24px;
  border-radius: 24px;
}

.quick-header {
  margin-bottom: 18px;
}

.quick-header p {
  margin: 10px 0 0;
  color: #6B7280;
  font-size: 14px;
  line-height: 1.6;
}

.quick-steps {
  display: grid;
  gap: 12px;
}

.quick-step {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;
  padding: 14px;
  border: 1px solid rgba(187, 247, 208, 0.64);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.66);
  color: inherit;
  text-decoration: none;
  transition: transform 200ms ease, border-color 200ms ease, background 200ms ease;
}

.quick-step:hover,
.quick-step:focus-visible {
  transform: translateY(-3px);
  border-color: rgba(22, 163, 74, 0.36);
  background: rgba(255, 255, 255, 0.9);
  outline: none;
}

.quick-number {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #ECFDF3;
  color: #065F46;
  font-size: 12px;
  font-weight: 800;
}

.quick-step strong {
  display: block;
  color: #111827;
  font-size: 15px;
}

.quick-step p {
  margin: 5px 0 8px;
  color: #6B7280;
  font-size: 13px;
  line-height: 1.55;
}

.quick-step span:last-child {
  color: #065F46;
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .latest-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .latest-section {
    padding: 8px 24px 70px;
  }

  .latest-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .article-row {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .article-date {
    grid-column: 2;
  }
}
</style>
