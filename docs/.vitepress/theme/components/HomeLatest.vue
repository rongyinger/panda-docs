<template>
  <!-- 最新内容 + CTA 区 -->
  <section class="latest-section">
    <div class="latest-container">

      <!-- ── 左侧：最新内容列表（60%）── -->
      <div class="latest-list-wrap">
        <div class="latest-header">
          <h2 class="section-title">最新内容</h2>
          <a :href="withBase('/guide/platform-quickstart')" class="more-link">查看更多 →</a>
        </div>

        <div class="latest-list">
          <a
            v-for="item in latestItems"
            :key="item.link"
            :href="withBase(item.link)"
            class="list-item"
          >
            <span class="item-icon">{{ item.icon }}</span>
            <div class="item-main">
              <span class="item-title">{{ item.title }}</span>
              <span class="item-tag" :style="{ background: item.tagBg, color: item.tagColor }">
                {{ item.tag }}
              </span>
            </div>
            <span class="item-date">{{ item.date }}</span>
          </a>
        </div>
      </div>

      <!-- ── 右侧：CTA 卡片（40%）── -->
      <div class="cta-card">
        <!-- 读书熊猫插画 -->
        <div class="cta-illus-wrap">
          <img
            :src="readingPanda"
            alt="读书的熊猫"
            class="cta-illus"
          />
        </div>

        <div class="cta-body">
          <h3 class="cta-title">开始使用熊猫算力平台</h3>
          <p class="cta-desc">
            高效、稳定、易用的 AI 算力服务，助力您的 AI 创新之旅
          </p>
          <a href="https://www.pandatoken.net" class="cta-btn" target="_blank" rel="noopener">
            立即访问官网 →
          </a>
          <a :href="withBase('/guide/platform-quickstart')" class="cta-link">新用户注册指南 →</a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const readingPanda = computed(() => withBase('reading-panda.png'))

// 修改这里的数组来更新首页最新内容列表
const latestItems = [
  {
    icon: '🔌',
    title: 'Codex 桌面版接入熊猫算力 · 完整教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-19',
    link: '/connect/codex-desktop',
  },
  {
    icon: '🔌',
    title: 'Claude 桌面版接入熊猫算力 · 完整教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-19',
    link: '/connect/claude-desktop',
  },
  {
    icon: '💡',
    title: '字节跳动开源 OpenViking：用文件系统范式重构 AI Agent 记忆中枢',
    tag: '技巧',
    tagBg: '#f97316',
    tagColor: '#ffffff',
    date: '2026-05-19',
    link: '/tips/openviking-agent-memory-system',
  },
  {
    icon: '📖',
    title: 'AI 补贴时代落幕，渠道商黄金时期到来',
    tag: '知识',
    tagBg: '#8b5cf6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/ai-knowledge/ai-subsidy-era-channel-opportunity',
  },
  {
    icon: '📖',
    title: '文献综述哪家强：Claude、DeepSeek、Kimi、GLM 还是 GPT？',
    tag: '知识',
    tagBg: '#8b5cf6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/ai-knowledge/literature-review-model-comparison',
  },
  {
    icon: '📖',
    title: '横评 DeepSeek、Claude、GPT、Kimi，结果大跌眼镜…',
    tag: '知识',
    tagBg: '#8b5cf6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi',
  },
  {
    icon: '💡',
    title: '省 Token 终极指南：10 个技巧让你的 API 费用降低 50%-80%',
    tag: '技巧',
    tagBg: '#f97316',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/tips/save-token-ultimate-guide',
  },
  {
    icon: '💡',
    title: '省 80% Token！给 Claude Code 装「第二大脑」的开源神器',
    tag: '技巧',
    tagBg: '#f97316',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/tips/openwolf-claude-code-memory',
  },
  {
    icon: '🔗',
    title: 'Spring AI 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/spring-ai',
  },
  {
    icon: '🔗',
    title: 'LlamaIndex 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/llamaindex',
  },
  {
    icon: '🔗',
    title: 'LangChain 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/langchain',
  },
  {
    icon: '🔗',
    title: 'FastGPT 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/fastgpt',
  },
  {
    icon: '🔗',
    title: 'Coze 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/coze',
  },
  {
    icon: '🔗',
    title: 'n8n 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/n8n',
  },
  {
    icon: '🔗',
    title: 'Continue.dev 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/continue-dev',
  },
  {
    icon: '🔗',
    title: 'Zed 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/zed',
  },
  {
    icon: '🔗',
    title: 'AnythingLLM 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/anythingllm',
  },
  {
    icon: '🔗',
    title: 'Windsurf 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/windsurf',
  },
  {
    icon: '🔗',
    title: 'Cline 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/cline',
  },
  {
    icon: '🔗',
    title: 'Lobe Chat 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/lobe-chat',
  },
  {
    icon: '🔗',
    title: 'Open WebUI 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/open-webui',
  },
  {
    icon: '🔗',
    title: 'Claude Code 接入熊猫算力教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/claude-code',
  },
  {
    icon: '🔗',
    title: 'OpenClaw 接入熊猫Token平台教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/openclaw',
  },
  {
    icon: '🔗',
    title: 'NextChat 接入熊猫Token平台教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/nextchat',
  },
  {
    icon: '🔗',
    title: 'Dify 接入熊猫Token平台教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/dify',
  },
  {
    icon: '🔗',
    title: 'Cursor 接入熊猫Token平台教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/cursor',
  },
  {
    icon: '🔗',
    title: 'Cherry Studio 接入熊猫Token平台教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/cherry-studio',
  },
  {
    icon: '🔗',
    title: 'Chatbox 接入熊猫Token平台教程',
    tag: '拓展',
    tagBg: '#3b82f6',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/connect/chatbox',
  },
  {
    icon: '📄',
    title: '熊猫算力平台 · 快速上手指南（12 步完整流程）',
    tag: '教程',
    tagBg: '#22c55e',
    tagColor: '#ffffff',
    date: '2026-05-18',
    link: '/guide/platform-quickstart',
  },
]
</script>

<style scoped>
.latest-section {
  padding: 4rem 1.5rem;
  background: white;
}

.latest-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 60% 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .latest-container { grid-template-columns: 1fr; }
}

/* ── 标题行 ── */
.latest-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.section-title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: #111827;
}

.more-link {
  font-size: 0.85rem;
  color: #22c55e;
  text-decoration: none;
  font-weight: 500;
}
.more-link:hover { text-decoration: underline; }

/* ── 列表 ── */
.latest-list {
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  overflow: hidden;
}

.list-item {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid #f9fafb;
  text-decoration: none;
  color: inherit;
  transition: background 0.18s;
}

/* hover 左侧绿色竖条 */
.list-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #22c55e;
  transform: scaleY(0);
  transition: transform 0.2s;
}

.list-item:last-child { border-bottom: none; }

.list-item:hover { background: #f0fdf4; }
.list-item:hover::before { transform: scaleY(1); }

.item-icon {
  font-size: 1.05rem;
  flex-shrink: 0;
  width: 24px;
  text-align: center;
}

.item-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.item-title {
  font-size: 0.88rem;
  color: #111827;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-tag {
  flex-shrink: 0;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
}

.item-date {
  flex-shrink: 0;
  font-size: 0.78rem;
  color: #9ca3af;
  font-variant-numeric: tabular-nums;
}

/* ── CTA 卡片 ── */
.cta-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #d1fae5;
  background: linear-gradient(160deg, #f0fdf4 0%, #dcfce7 100%);
  box-shadow: 0 4px 24px rgba(34, 197, 94, 0.1);
}

/* 读书熊猫插画区 */
.cta-illus-wrap {
  width: 100%;
  height: 170px;
  overflow: hidden;
  background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
}

.cta-illus {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 聚焦到图片右侧的熊猫区域 */
  object-position: 70% center;
  display: block;
}

/* 卡片文案区 */
.cta-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.cta-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #14532d;
  line-height: 1.4;
}

.cta-desc {
  margin: 0;
  font-size: 0.83rem;
  color: #166534;
  line-height: 1.6;
}

.cta-btn {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.55rem 1.4rem;
  border-radius: 8px;
  background: #22c55e;
  color: white;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.cta-btn:hover {
  background: #15803d;
  transform: translateY(-1px);
}

.cta-link {
  font-size: 0.8rem;
  color: #15803d;
  text-decoration: none;
}
.cta-link:hover { text-decoration: underline; }
</style>
