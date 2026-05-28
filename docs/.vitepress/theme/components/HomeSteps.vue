<template>
  <section class="home-steps">
    <div class="steps-shell">
      <div class="steps-header">
        <span class="steps-kicker">快速开始</span>
        <h2 class="steps-title">三步开始使用熊猫算力</h2>
        <p class="steps-subtitle">从注册到第一次 API 调用，只需 5 分钟。</p>
      </div>

      <div class="steps-container">
        <template v-for="(step, index) in steps" :key="step.link">
          <a :href="withBase(step.link)" class="step-item">
            <span class="step-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="step-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path :d="step.icon" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <span class="step-link">{{ step.linkText }} →</span>
          </a>
          <div class="step-connector" v-if="index < steps.length - 1" aria-hidden="true">
            <span></span>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

const steps = [
  {
    icon: 'M8 7h8M8 11h8M8 15h5M6 3h12a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2Z',
    title: '注册并充值',
    desc: '注册账号，完成充值，准备开始调用。',
    link: '/faq/how-to-register',
    linkText: '注册指南',
  },
  {
    icon: 'M15 7a4 4 0 1 0-3.46 3.97L4 18.5V21h2.5l1-1H10v-2.5l1.53-1.53A4 4 0 0 0 15 7Z',
    title: '获取 API Key',
    desc: '在控制台创建 API Key，复制并安全保存。',
    link: '/faq/how-to-create-apikey',
    linkText: '创建 Key',
  },
  {
    icon: 'M7 8h10M7 12h6m-7 8h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Zm11-6 2 2 4-4',
    title: '接入你的工具',
    desc: '配置 Cursor、Claude Code 或其他客户端。',
    link: '/connect/chatbox',
    linkText: '查看教程',
  },
]
</script>

<style scoped>
.home-steps {
  padding: 70px 24px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F7FAF8 100%);
}

.steps-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 44px;
  border: 1px solid rgba(229, 231, 235, 0.82);
  border-radius: 28px;
  background:
    radial-gradient(circle at 16% 20%, rgba(22, 163, 74, 0.1), transparent 28%),
    linear-gradient(135deg, rgba(236, 253, 243, 0.9), rgba(255,255,255,0.92));
  box-shadow: 0 24px 62px rgba(15, 23, 42, 0.07);
}

.steps-header {
  max-width: 620px;
  margin-bottom: 30px;
}

.steps-kicker {
  display: inline-block;
  margin-bottom: 8px;
  color: #16A34A;
  font-size: 13px;
  font-weight: 760;
}

.steps-title {
  margin: 0;
  color: #111827;
  font-size: 28px;
  font-weight: 760;
  line-height: 1.25;
}

.steps-subtitle {
  margin: 10px 0 0;
  color: #6B7280;
  font-size: 15px;
}

.steps-container {
  display: grid;
  grid-template-columns: 1fr 52px 1fr 52px 1fr;
  align-items: stretch;
}

.step-item {
  min-height: 232px;
  display: flex;
  flex-direction: column;
  padding: 22px;
  border: 1px solid rgba(229, 231, 235, 0.9);
  border-radius: 20px;
  background: rgba(255,255,255,0.9);
  color: inherit;
  text-decoration: none;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.055);
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}

.step-item:hover,
.step-item:focus-visible {
  transform: translateY(-4px);
  border-color: rgba(22, 163, 74, 0.35);
  box-shadow: 0 20px 42px rgba(15, 23, 42, 0.08);
  outline: none;
}

.step-number {
  color: #9CA3AF;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.step-icon {
  width: 44px;
  height: 44px;
  margin: 20px 0 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #ECFDF3;
  color: #065F46;
}

.step-icon svg {
  width: 22px;
  height: 22px;
}

.step-title {
  margin: 0 0 8px;
  color: #111827;
  font-size: 17px;
  font-weight: 740;
}

.step-desc {
  margin: 0 0 18px;
  color: #6B7280;
  font-size: 14px;
  line-height: 1.65;
  flex: 1;
}

.step-link {
  color: #065F46;
  font-size: 14px;
  font-weight: 720;
}

.step-connector {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-connector span {
  width: 100%;
  height: 1px;
  position: relative;
  background: linear-gradient(90deg, rgba(156, 163, 175, 0.2), rgba(22, 163, 74, 0.35));
}

.step-connector span::after {
  content: '';
  position: absolute;
  right: -1px;
  top: 50%;
  width: 7px;
  height: 7px;
  border-top: 1px solid rgba(22, 163, 74, 0.55);
  border-right: 1px solid rgba(22, 163, 74, 0.55);
  transform: translateY(-50%) rotate(45deg);
}

@media (max-width: 900px) {
  .steps-shell {
    padding: 32px;
  }

  .steps-container {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .step-connector {
    display: none;
  }
}

@media (max-width: 640px) {
  .home-steps {
    padding: 56px 24px;
  }

  .steps-shell {
    padding: 24px;
    border-radius: 24px;
  }
}
</style>
