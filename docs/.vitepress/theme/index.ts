import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Feedback from './components/Feedback.vue'
import ContactFloat from './components/ContactFloat.vue'
import UpdateBadge from './components/UpdateBadge.vue'
import HomePage from './components/HomePage.vue'
import './custom.css'

export default {
  extends: DefaultTheme,

  // Layout 覆盖：向 DefaultTheme 的插槽注入全局组件
  // doc-after   → 每篇文档底部自动插入反馈组件（仅 doc layout 生效）
  // layout-bottom → 所有页面右下角悬浮联系按钮
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Feedback),
      'layout-bottom': () => h(ContactFloat),
    })
  },

  enhanceApp({ app }) {
    // 全局注册，可在任意 .md 文件中直接使用 <HomePage /> <UpdateBadge />
    app.component('HomePage', HomePage)
    app.component('UpdateBadge', UpdateBadge)
  },
}
