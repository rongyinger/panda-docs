import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const docsDir = path.join(root, 'docs')
const distDir = path.join(docsDir, '.vitepress', 'dist')

if (!fs.existsSync(distDir)) {
  console.error(`dist not found: ${distDir}`)
  process.exit(1)
}

function syncEntry(source, target) {
  const stat = fs.statSync(source)

  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true })

    for (const child of fs.readdirSync(source)) {
      syncEntry(path.join(source, child), path.join(target, child))
    }

    return
  }

  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(source, target)
}

for (const entry of fs.readdirSync(distDir, { withFileTypes: true })) {
  const source = path.join(distDir, entry.name)
  const target = path.join(docsDir, entry.name)

  syncEntry(source, target)
  console.log(`synced: ${entry.name}`)
}

console.log('sync complete')
