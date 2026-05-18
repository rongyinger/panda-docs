import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Feedback from './components/Feedback.vue'
import ContactFloat from './components/ContactFloat.vue'
import HomePageSections from './components/HomePageSections.vue'
import './style.css'

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-after': () =>
        h('span', { class: 'nav-subtitle' }, '熊猫算力平台官方知识库'),
      'doc-after': () => h(Feedback),
      'layout-bottom': () => h(ContactFloat),
    })
  },

  enhanceApp({ app }) {
    // 首页 index.md 中通过 <HomePageSections /> 调用，无需 import
    app.component('HomePageSections', HomePageSections)
  },
}
