import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Feedback from './components/Feedback.vue'
import ContactFloat from './components/ContactFloat.vue'
import HomePageSections from './components/HomePageSections.vue'
import HomeSteps from './components/HomeSteps.vue'
import HomeHotFaq from './components/HomeHotFaq.vue'
import './style.css'

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-title-after': () =>
        h('span', { class: 'nav-subtitle' }, '熊猫算力官方知识库'),
      'doc-after': () => h(Feedback),
      'layout-bottom': () => h(ContactFloat),
    })
  },

  enhanceApp({ app }) {
    app.component('HomePageSections', HomePageSections)
    app.component('HomeSteps', HomeSteps)
    app.component('HomeHotFaq', HomeHotFaq)
  },
}
