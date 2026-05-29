import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const BUNDLE = 'scripts/home-bundle.src.html'
const OUT_DIR = 'docs/public/home'
const ASSET_DIR = path.join(OUT_DIR, 'assets')

const MIME_EXT = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/svg+xml': 'svg',
  'image/webp': 'webp',
  'font/woff2': 'woff2',
  'font/woff': 'woff',
  'text/javascript': 'js',
  'application/javascript': 'js',
  'text/jsx': 'jsx',
  'text/css': 'css',
}

function grab(html, type) {
  const open = `<script type="__bundler/${type}">`
  const i = html.indexOf(open)
  if (i < 0) return null
  const start = i + open.length
  const j = html.indexOf('</script>', start)
  return html.slice(start, j)
}

const html = fs.readFileSync(BUNDLE, 'utf8')
const manifest = JSON.parse(grab(html, 'manifest'))
let template = JSON.parse(grab(html, 'template'))

fs.rmSync(OUT_DIR, { recursive: true, force: true })
fs.mkdirSync(ASSET_DIR, { recursive: true })

const uuids = Object.keys(manifest)
for (const uuid of uuids) {
  const entry = manifest[uuid]
  let bytes = Buffer.from(entry.data, 'base64')
  if (entry.compressed) bytes = zlib.gunzipSync(bytes)
  const ext = MIME_EXT[entry.mime] || 'bin'
  const file = `${uuid}.${ext}`
  fs.writeFileSync(path.join(ASSET_DIR, file), bytes)
  template = template.split(uuid).join(`assets/${file}`)
}

// Blob-URL only quirks no longer apply when served over HTTP from real files.
template = template
  .replace(/\s+integrity="[^"]*"/gi, '')
  .replace(/\s+crossorigin="[^"]*"/gi, '')

fs.writeFileSync(path.join(OUT_DIR, 'index.html'), template)
console.log(`Extracted ${uuids.length} assets -> ${ASSET_DIR}`)
console.log(`Wrote ${path.join(OUT_DIR, 'index.html')} (${template.length} bytes)`)
