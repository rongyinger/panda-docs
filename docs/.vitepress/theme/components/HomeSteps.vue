<template>
  <section class="home-steps">
    <div class="steps-header">
      <h2 class="steps-title">🚀 三步开始使用熊猫算力</h2>
      <p class="steps-subtitle">从注册到第一次 API 调用，只需 5 分钟</p>
    </div>
    <div class="steps-container">
      <template v-for="(step, index) in steps" :key="index">
        <a :href="withBase(step.link)" class="step-item">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-icon">{{ step.icon }}</div>
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
    icon: '📝',
    title: '注册并充值',
    desc: '注册账号，最低充值 $7 美元，支持微信、支付宝',
    link: '/faq/how-to-register',
    linkText: '注册指南',
  },
  {
    icon: '🔑',
    title: '获取 API Key',
    desc: '在控制台创建 API Key，复制保存备用',
    link: '/faq/how-to-create-apikey',
    linkText: '创建 Key',
  },
  {
    icon: '🚀',
    title: '接入你的工具',
    desc: '选择 Cursor、Claude Code、Cherry Studio 等工具完成配置',
    link: '/connect/chatbox',
    linkText: '查看教程',
  },
]
</script>

<style scoped>
.home-steps {
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-top: 1px solid #d1fae5;
  border-bottom: 1px solid #d1fae5;
}

.steps-header {
  text-align: center;
  margin-bottom: 2rem;
}

.steps-title {
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
}

.steps-subtitle {
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.steps-container {
  max-width: 900px;
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
  border-radius: 16px;
  background: white;
  border: 1px solid #d1fae5;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 12px rgba(34, 197, 94, 0.08);
  transition: transform 0.25s, box-shadow 0.25s;
}

.step-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(34, 197, 94, 0.16);
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
  background: #22c55e;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
}

.step-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.step-title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}

.step-desc {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  color: #6b7280;
  line-height: 1.6;
}

.step-link {
  font-size: 0.82rem;
  color: #22c55e;
  text-decoration: underline;
  font-weight: 500;
}

/* 箭头分隔 */
.step-arrow {
  font-size: 2.5rem;
  color: #86efac;
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
