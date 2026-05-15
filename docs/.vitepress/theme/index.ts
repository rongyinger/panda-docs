import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Feedback from './components/Feedback.vue'
import ContactFloat from './components/ContactFloat.vue'
import NavLoginBtn from './components/NavLoginBtn.vue'
import HomePageSections from './components/HomePageSections.vue'
import './style.css'

export default {
  extends: DefaultTheme,

  // 通过 VitePress 官方 Layout slot 系统注入自定义元素：
  //   nav-bar-title-after  → logo 下方副标题
  //   nav-bar-content-after → 右侧登录按钮
  //   doc-after            → 每篇文档底部反馈组件（仅 doc layout 生效）
  //   layout-bottom        → 所有页面右下角悬浮联系按钮
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-after': () =>
        h('span', { class: 'nav-subtitle' }, '熊猫算力平台官方知识库'),
      'nav-bar-content-after': () => h(NavLoginBtn),
      'doc-after': () => h(Feedback),
      'layout-bottom': () => h(ContactFloat),
    })
  },

  enhanceApp({ app }) {
    // 首页 index.md 中通过 <HomePageSections /> 调用，无需 import
    app.component('HomePageSections', HomePageSections)
  },
}
