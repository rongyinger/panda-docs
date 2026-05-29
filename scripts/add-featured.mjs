import fs from 'node:fs'

const f = 'scripts/home-bundle.src.html'

// New featured entries, top-to-bottom order. Hrefs are bundle-relative
// (no leading slash / base); extract-home.mjs rewrites them to absolute.
const entries = [
  {
    href: 'tips/claude-code-save-token',
    tag: '技巧',
    title: 'Claude Code 省 Token 实战：7 个技巧把成本砍掉一半',
    date: '05-29',
  },
  {
    href: 'tips/claude-code-token-monitor',
    tag: '技巧',
    title: 'Claude Code 用量监控工具全攻略：再也不怕 Token 不知不觉耗光',
    date: '05-29',
  },
  {
    href: 'ai-knowledge/ai-learning-roadmap-2026',
    tag: '知识',
    title: '2026 AI 应用学习路线图：工具 + 提示词 + 资源一文打包',
    date: '05-29',
  },
]

// Insert before this current top item (the most recent existing entry).
const anchor = '<a class="article-item" href="ai-knowledge/claude-opus-4-8-review">'

const arrow =
  '<svg class="article-arrow" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>'

function render(e) {
  return `<a class="article-item" href="${e.href}">
        <span class="article-tag" data-tag="${e.tag}">${e.tag}</span>
        <span class="article-text">${e.title}</span>
        <span class="article-date">${e.date}</span>
        ${arrow}
      </a>
      `
}

let html = fs.readFileSync(f, 'utf8')
const open = '<script type="__bundler/template">'
const i = html.indexOf(open)
const s = i + open.length
const j = html.indexOf('</script>', s)
let tpl = JSON.parse(html.slice(s, j))

const pending = entries.filter((e) => !tpl.includes(`href="${e.href}"`))
if (pending.length === 0) {
  console.log('ALL ENTRIES ALREADY PRESENT')
  process.exit(0)
}
if ((tpl.split(anchor).length - 1) !== 1) {
  console.error('anchor not found exactly once')
  process.exit(1)
}

const block = pending.map(render).join('')
tpl = tpl.replace(anchor, block + anchor)

// JSON.stringify does NOT escape "/", so re-escape </script> to keep the
// outer <script type=__bundler/template> tag from closing early.
const encoded = JSON.stringify(tpl).replace(/<\/script>/g, '<\\/script>')
fs.writeFileSync(f, html.slice(0, s) + encoded + html.slice(j))
console.log(`inserted ${pending.length} entries. new tpl len: ${tpl.length}`)
