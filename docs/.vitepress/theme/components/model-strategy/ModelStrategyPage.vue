<template>
  <main class="strategy-page">
    <div class="bg-stage" aria-hidden="true">
      <div class="bg-base"></div>
      <div class="bamboo">
        <div v-for="stalk in 6" :key="stalk" class="stalk" :class="`s${stalk}`">
          <span v-for="leaf in leafMap[stalk - 1]" :key="leaf" class="leaf" :class="`l${leaf}`"></span>
        </div>
      </div>
      <div class="blob bg-mint"></div>
      <div class="blob bg-sky"></div>
      <div class="blob bg-lilac"></div>
    </div>
    <div class="grain" aria-hidden="true"></div>

    <nav class="strategy-nav">
      <a class="nav-brand" :href="withBase('/home/index.html')">
        <img class="nav-logo" :src="withBase('/home/assets/01dd643c-2863-4a0e-a1c2-ee5e084c5567.png')" alt="熊猫知识中心">
        <div>
          <div class="nav-title">熊猫知识中心</div>
          <div class="nav-sub">PANDA · KNOWLEDGE</div>
        </div>
      </a>
      <div class="nav-links">
        <a :href="withBase('/home/index.html')">首页</a>
        <a :href="withBase('/guide/platform-quickstart')">使用教程</a>
        <a :href="withBase('/connect/chatbox')">工具接入</a>
        <a :href="withBase('/faq/personal/')">常见问题</a>
        <a class="active" :href="withBase('/model-strategy')">模型策略</a>
        <a :href="withBase('/ai-knowledge/model-comparison-deepseek-claude-gpt-kimi')">AI 知识分享</a>
        <a :href="withBase('/tips/openwolf-claude-code-memory')">技巧分享</a>
      </div>
    </nav>

    <div class="page-container">
      <ModelSelector />
      <EnterpriseScenarioCards :query="query" />
      <OfficialReferenceTable :query="query" />
      <StrategyArticleCards :query="query" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import ModelSelector from './ModelSelector.vue'
import EnterpriseScenarioCards from './EnterpriseScenarioCards.vue'
import OfficialReferenceTable from './OfficialReferenceTable.vue'
import StrategyArticleCards from './StrategyArticleCards.vue'

const query = ref('')
const leafMap = [[1, 2, 3, 4, 5], [1, 4, 6], [1, 2, 3, 4, 5, 6], [1, 3, 5], [2, 6], [4]]
</script>

<style scoped>
.strategy-page{--ink:#1b2a3a;--ink-2:#51647b;--ink-3:#8a9bae;--accent:#128a64;--accent-deep:#0c6e50;--accent-soft:rgba(18,138,100,.12);--shadow-glass:0 10px 34px rgba(28,44,72,.09),0 2px 8px rgba(28,44,72,.04);position:relative;min-height:100vh;color:var(--ink);font-family:"Noto Sans SC",-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif;background:#eef4f4}.bg-stage{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}.bg-base{position:absolute;inset:-10%;background:radial-gradient(120% 90% at 78% -8%,#f3fbff 0%,transparent 46%),radial-gradient(110% 80% at 8% 4%,#eafaf2 0%,transparent 50%),radial-gradient(130% 100% at 50% 118%,#f6f1ff 0%,transparent 55%),linear-gradient(167deg,#fbfffe 0%,#eef8f3 38%,#eef5fb 70%,#f6f2fb 100%)}.bamboo{position:absolute;inset:-8% 0;opacity:.34}.stalk{position:absolute;top:-8%;height:120%;border-radius:30px;background:repeating-linear-gradient(transparent 0,transparent 86px,rgba(9,78,56,.6) 86px,rgba(9,78,56,.6) 90px,rgba(255,255,255,.55) 90px,rgba(255,255,255,.55) 95px,transparent 95px,transparent 100px),linear-gradient(90deg,transparent 12%,rgba(255,255,255,.55) 50%,transparent 88%),linear-gradient(rgba(86,166,116,0),rgba(74,158,108,.88) 13%,rgba(48,134,88,.92) 50%,rgba(74,158,108,.88) 87%,rgba(86,166,116,0));box-shadow:inset 0 0 0 1px rgba(255,255,255,.22)}.stalk .leaf{position:absolute;width:54px;height:16px;background:linear-gradient(90deg,transparent,rgba(30,140,100,.55) 55%,rgba(18,110,80,.62));border-radius:0 16px;filter:blur(.4px);transform-origin:0 50%}.leaf.l1{top:16%;left:60%;transform:rotate(-24deg)}.leaf.l2{top:18%;left:58%;transform:rotate(-46deg) scaleX(.82);opacity:.8}.leaf.l3{top:54%;right:60%;transform:rotate(204deg) scaleX(.9);opacity:.7}.leaf.l4{top:34%;left:62%;transform:rotate(-14deg) scaleX(.9);opacity:.78}.leaf.l5{top:68%;left:60%;transform:rotate(-32deg) scaleX(.74);opacity:.62}.leaf.l6{top:42%;right:62%;transform:rotate(216deg) scaleX(.8);opacity:.6}.s1{left:5%;width:34px;opacity:.78}.s2{left:16%;width:20px;opacity:.55;filter:blur(1.5px)}.s3{left:71%;width:40px;opacity:.82}.s4{left:84%;width:24px;opacity:.6;filter:blur(1px)}.s5{left:92%;width:15px;opacity:.42;filter:blur(2px)}.s6{left:45%;width:18px;opacity:.32;filter:blur(2.5px)}.blob{position:absolute;border-radius:50%;filter:blur(70px)}.bg-mint{width:560px;height:560px;top:-160px;right:-80px;background:radial-gradient(circle,rgba(150,240,200,.55),transparent 70%)}.bg-sky{width:480px;height:480px;bottom:-140px;left:-60px;background:radial-gradient(circle,rgba(170,210,255,.5),transparent 70%)}.bg-lilac{width:420px;height:420px;top:42%;left:60%;background:radial-gradient(circle,rgba(206,190,255,.4),transparent 70%)}.grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.5;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E")}.strategy-nav{position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:100;width:min(1180px,calc(100% - 36px));height:54px;padding:0 18px;display:flex;align-items:center;justify-content:space-between;border-radius:999px;background:rgba(255,255,255,.52);backdrop-filter:blur(20px) saturate(170%);border:1px solid rgba(255,255,255,.8);box-shadow:var(--shadow-glass),inset 0 1px 0 rgba(255,255,255,.85)}.nav-brand{display:flex;align-items:center;gap:10px;color:inherit!important;text-decoration:none!important;border:0!important}.nav-logo{width:38px;height:38px;object-fit:contain}.nav-title{font-size:15px;font-weight:750;line-height:1.1}.nav-sub{margin-top:2px;color:var(--ink-3);font-size:10px;letter-spacing:.04em}.nav-links{display:flex;align-items:center;gap:1px}.nav-links a{padding:7px 12px;border:0!important;border-radius:999px;color:var(--ink-2)!important;font-size:13px;font-weight:550;text-decoration:none}.nav-links a:hover{background:rgba(255,255,255,.58);color:var(--ink)!important}.nav-links a.active{background:var(--accent-soft);color:var(--accent-deep)!important;font-weight:700}.page-container{position:relative;z-index:2;max-width:1180px;margin:auto;padding:116px 24px 20px}:deep(.glass-green-card){border-color:rgba(255,255,255,.82);background:rgba(255,255,255,.58);box-shadow:var(--shadow-glass);backdrop-filter:blur(20px) saturate(150%)}:deep(.glass-green-card::after){opacity:.28}:deep(.content-section){padding-top:58px}:deep(.section-title h2){color:var(--ink)}:deep(.section-title p),:deep(.disclaimer){color:var(--ink-2)}@media(max-width:1120px){.nav-links a{padding:7px 8px;font-size:12px}}@media(max-width:850px){.nav-links{display:none}.strategy-nav{justify-content:flex-start}.nav-brand{margin:auto}.page-container{padding-inline:16px;padding-top:106px}}@media(max-width:600px){.page-container{padding:102px 12px 16px}.nav-sub{display:none}}
</style>
