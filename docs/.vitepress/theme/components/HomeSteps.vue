<template>
  <section class="home-steps">
    <div class="steps-header">
      <span class="steps-kicker">快速开始</span>
      <h2 class="steps-title">三步开始使用熊猫算力</h2>
      <p class="steps-subtitle">从注册到第一次 API 调用，只需 5 分钟</p>
    </div>
    <div class="steps-container">
      <template v-for="(step, index) in steps" :key="index">
        <a :href="withBase(step.link)" class="step-item">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path :d="step.icon" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-desc">{{ step.desc }}</p>
          <span class="step-link">{{ step.linkText }} →</span>
        </a>
        <div class="step-arrow" v-if="index < steps.length - 1">›</div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

const steps = [
  {
    icon: 'M8 7h8M8 11h8M8 15h5M6 3h12a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2Z',
    title: '注册并充值',
    desc: '注册账号，最低充值 $7 美元，支持微信、支付宝',
    link: '/faq/how-to-register',
    linkText: '注册指南',
  },
  {
    icon: 'M15 7a4 4 0 1 0-3.46 3.97L4 18.5V21h2.5l1-1H10v-2.5l1.53-1.53A4 4 0 0 0 15 7Z',
    title: '获取 API Key',
    desc: '在控制台创建 API Key，复制保存备用',
    link: '/faq/how-to-create-apikey',
    linkText: '创建 Key',
  },
  {
    icon: 'M12 3c3.5 1.2 5.6 3.9 6 8.2L14.5 14 10 9.5l2-6.5ZM10 9.5 5.5 14 4 20l6-1.5 4.5-4.5M8 16l-2 2',
    title: '接入你的工具',
    desc: '选择 Cursor、Claude Code、Cherry Studio 等工具完成配置',
    link: '/connect/chatbox',
    linkText: '查看教程',
  },
]
</script>

<style scoped>
.home-steps {
  padding: 72px 24px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 244, 0.9) 100%),
    repeating-linear-gradient(90deg, transparent 0 72px, rgba(22, 163, 74, 0.04) 73px 74px);
  border-top: 1px solid #BBF7D0;
  border-bottom: 1px solid #BBF7D0;
}

.steps-header {
  text-align: center;
  margin-bottom: 2rem;
}

.steps-kicker {
  display: inline-block;
  margin-bottom: 0.35rem;
  color: #16A34A;
  font-size: 0.78rem;
  font-weight: 800;
}

.steps-title {
  margin: 0 0 0.5rem;
  font-size: 1.45rem;
  font-weight: 700;
  color: #065F46;
}

.steps-subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: #6B7280;
}

.steps-container {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

/* 步骤卡片 */
.step-item {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem 1.5rem;
  border-radius: 10px;
  background: white;
  border: 1px solid #E5E7EB;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.045);
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}

.step-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(17, 24, 39, 0.075);
  border-color: #16A34A;
}

/* 绿色圆形编号 */
.step-number {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #065F46;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(6, 95, 70, 0.24);
}

.step-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #F0FDF4;
  color: #065F46;
  box-shadow: inset 0 0 0 1px #BBF7D0;
}

.step-icon svg {
  width: 25px;
  height: 25px;
}

.step-title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #065F46;
}

.step-desc {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  color: #6B7280;
  line-height: 1.6;
}

.step-link {
  font-size: 0.82rem;
  color: #16A34A;
  text-decoration: underline;
  font-weight: 500;
}

/* 箭头分隔 */
.step-arrow {
  font-size: 2.5rem;
  color: #16A34A;
  padding: 0 1rem;
  flex-shrink: 0;
  font-weight: 300;
  line-height: 1;
  user-select: none;
}

/* ── 移动端纵向排列 ── */
@media (max-width: 768px) {
  .steps-container {
    flex-direction: column;
    gap: 1.75rem;
  }
  .step-item {
    width: 100%;
  }
  .step-arrow {
    font-size: 1.8rem;
    padding: 0;
    transform: rotate(90deg);
  }
}
</style>
