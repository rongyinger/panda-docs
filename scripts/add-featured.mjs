import fs from 'node:fs'

const f = 'scripts/home-bundle.src.html'

// New featured entries, top-to-bottom order. Hrefs are bundle-relative
// (no leading slash / base); extract-home.mjs rewrites them to absolute.
const entries = [
  {
    href: 'ai-knowledge/claude-fable-5-explained',
    tag: '知识',
    title: 'Claude Fable 5 是什么？',
    date: '06-11',
  },
  {
    href: 'faq/claude-code-messages-null-500',
    tag: '常见',
    title: 'Claude Code 报 messages is null / status_code=500 怎么解决？',
    date: '06-11',
  },
  {
    href: 'faq/claude-code-invalid-beta-flag',
    tag: '常见',
    title: 'Claude Code 报 invalid beta flag 怎么解决？',
    date: '06-11',
  },
]

// Insert before this current top item (the most recent existing entry).
const anchor = '<a class="article-item" href="tips/claude-code-save-token">'

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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

let html = fs.readFileSync(f, 'utf8')
const open = '<script type="__bundler/template">'
const i = html.indexOf(open)
const s = i + open.length
const j = html.indexOf('</script>', s)
let tpl = JSON.parse(html.slice(s, j))

for (const entry of entries) {
  const itemPattern = new RegExp(
    `\\s*<a class="article-item" href="${escapeRegExp(entry.href)}">[\\s\\S]*?<\\/a>\\s*`,
    'g',
  )
  tpl = tpl.replace(itemPattern, '\n      ')
}

if ((tpl.split(anchor).length - 1) !== 1) {
  console.error('anchor not found exactly once')
  process.exit(1)
}

const block = entries.map(render).join('')
tpl = tpl.replace(anchor, block + anchor)

// JSON.stringify does NOT escape "/", so re-escape </script> to keep the
// outer <script type=__bundler/template> tag from closing early.
const encoded = JSON.stringify(tpl).replace(/<\/script>/g, '<\\/script>')
fs.writeFileSync(f, html.slice(0, s) + encoded + html.slice(j))
console.log(`synced ${entries.length} featured entries. new tpl len: ${tpl.length}`)
