// 把文档构建产物同步进 pandasite 仓库的 docs/ 目录。
// 用法：node scripts/sync-to-pandasite.mjs <pandasite本地仓库路径>
// 例：  node scripts/sync-to-pandasite.mjs D:\Projects\pandasite
//
// 之后到 pandasite 仓库提交 docs/，运行 build.sh 打镜像并部署即可。
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const target = process.argv[2]
if (!target) {
  console.error('用法: node scripts/sync-to-pandasite.mjs <pandasite本地仓库路径>')
  process.exit(1)
}
if (!fs.existsSync(target)) {
  console.error('路径不存在: ' + target)
  process.exit(1)
}

const dist = 'docs/.vitepress/dist'
const docsOut = path.join(target, 'docs')

console.log('① 用 base=/docs/ 构建文档...')
execSync('npm run build', { stdio: 'inherit', env: { ...process.env, DOCS_BASE: '/docs/' } })

console.log('② 同步产物到 ' + docsOut)
fs.rmSync(docsOut, { recursive: true, force: true })
fs.cpSync(dist, docsOut, { recursive: true })

console.log('③ 还原本仓库首页为默认 base（保持 GitHub 部署不变）...')
execSync('node scripts/extract-home.mjs', { stdio: 'inherit', env: { ...process.env, DOCS_BASE: '' } })

console.log('\n✅ 完成。接下来：')
console.log('   1. 确认 ' + target + ' 的 default.conf 已含 /docs/ 段（见 scripts/pandasite-default.conf）')
console.log('   2. 在 pandasite 仓库提交 docs/ 并 push')
console.log('   3. 在 pandasite 仓库运行 ./build.sh，再到服务器拉取镜像重启')
