import fs from 'node:fs'

const f = 'scripts/home-bundle.src.html'
let html = fs.readFileSync(f, 'utf8')
const open = '<script type="__bundler/template">'
const i = html.indexOf(open)
const s = i + open.length
const j = html.indexOf('</script>', s)
let tpl = JSON.parse(html.slice(s, j))

if (tpl.includes('ai-knowledge/claude-opus-4-8-review')) {
  console.log('ALREADY PRESENT')
  process.exit(0)
}

const newEntry =
`<a class="article-item" href="ai-knowledge/claude-opus-4-8-review">
        <span class="article-tag" data-tag="知识">知识</span>
        <span class="article-text">Claude Opus 4.8 深度点评：更诚实的旗舰，Agent 时代的新基准</span>
        <span class="article-date">05-29</span>
        <svg class="article-arrow" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
      </a>
      `

const marker = '<a class="article-item" href="connect/codex-desktop">'
if ((tpl.split(marker).length - 1) !== 1) {
  console.error('marker count != 1')
  process.exit(1)
}
tpl = tpl.replace(marker, newEntry + marker)

// JSON.stringify does NOT escape "/", so re-escape </script> to keep the
// outer <script type=__bundler/template> tag from closing early.
const encoded = JSON.stringify(tpl).replace(/<\/script>/g, '<\\/script>')
fs.writeFileSync(f, html.slice(0, s) + encoded + html.slice(j))
console.log('inserted with escaped close tags. new tpl len:', tpl.length)
