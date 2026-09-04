#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const { marked } = require('marked')
const {ROOT} = require('./asset-library.cjs')
const {checkText} = require('./compose-figures.cjs')
const fontCoverage = new Set(JSON.parse(fs.readFileSync(path.join(ROOT,'assets/fonts/provenance.json'),'utf8')).codepoints)

const [, , lessonArg, outputArg] = process.argv
if (!lessonArg || !outputArg) {
  console.error('Usage: node render-lesson.cjs <lesson-dir> <output.html>')
  process.exit(2)
}

const lessonDir = path.resolve(lessonArg)
const outputFile = path.resolve(outputArg)
const documents = [
  ['00-学习导航.md', '学习导航'],
  ['01-课件.md', '视觉课件'],
  ['02-逐步讲解.md', '逐步讲解'],
  ['03-练习与答案.md', '练习与答案'],
  ['04-分享稿.md', '分享稿'],
  ['05-术语与比喻词典.md', '术语词典'],
]

for (const [name] of documents) {
  const file = path.join(lessonDir, name)
  if (!fs.existsSync(file)) throw new Error(`Missing lesson document: ${file}`)
}

fs.mkdirSync(path.dirname(outputFile), { recursive: true })
marked.setOptions({ gfm: true, breaks: false })

const baseHref = `${path.relative(path.dirname(outputFile), lessonDir).replaceAll('\\', '/')}/`
const previewHref = path.relative(lessonDir, outputFile).replaceAll('\\', '/')
const safe = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;')
marked.use({walkTokens(token) {
  if (token.type !== 'link') return
  const index = documents.findIndex(([name]) => name === token.href)
  if (index >= 0) token.href = `${previewHref}#doc-${index}`
}})
const sections = documents.map(([name, label], index) => {
  const markdown = fs.readFileSync(path.join(lessonDir, name), 'utf8')
  checkText(markdown, fontCoverage)
  return `<article id="doc-${index}"><div class="doc-label">${label}</div>${marked.parse(markdown)}</article>`
}).join('\n')
const nav = documents.map(([, label], index) => `<a href="${safe(previewHref)}#doc-${index}">${label}</a>`).join('')

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="${baseHref}">
  <link rel="icon" href="data:,">
  <title>DeepSeek Harness · ${safe(path.basename(lessonDir))}</title>
  <style>
    @font-face { font-family:"Workshop Hand"; src:url('../assets/fonts/workshop-hand.woff2') format('woff2'); font-display:swap; }
    :root { --paper:#f5eee1; --surface:#fffdf7; --ink:#50483f; --muted:#756a5f; --accent:#996344; --rule:rgba(80,72,63,.17); }
    * { box-sizing:border-box; }
    html { scroll-behavior:auto; }
    body { margin:0; background:var(--paper); color:var(--ink); font-family:"Workshop Hand","Microsoft YaHei",sans-serif; line-height:1.9; }
    nav { position:sticky; top:0; z-index:10; display:flex; gap:8px; overflow-x:auto; padding:12px max(20px,calc((100vw - 1180px)/2)); background:rgba(255,249,238,.97); border-bottom:1px solid var(--rule); }
    nav a { flex:none; padding:6px 12px; color:var(--muted); text-decoration:none; font-size:14px; border:1px solid var(--rule); border-radius:4px; background:var(--surface); }
    main { width:min(1180px,calc(100% - 40px)); margin:32px auto 80px; }
    article { margin:0 0 48px; padding:40px clamp(20px,5vw,64px); background:var(--surface); border:1px solid var(--rule); border-radius:8px; }
    .doc-label { color:var(--accent); font:600 12px/1.4 "Cascadia Mono",Consolas,monospace; letter-spacing:.14em; text-transform:uppercase; }
    h1,h2,h3 { color:var(--ink); line-height:1.35; scroll-margin-top:72px; }
    h1 { margin:.4em 0 .8em; font-size:clamp(30px,5vw,44px); font-weight:400; }
    h2 { margin:2.2em 0 .8em; padding-top:.3em; border-top:1px solid var(--rule); font-size:26px; }
    h3 { margin:1.7em 0 .6em; font-size:20px; }
    p,li { font-size:20px; }
    article { scroll-margin-top:82px; }
    a { color:#2e5aa8; overflow-wrap:anywhere; }
    blockquote { margin:1.4em 0; padding:12px 18px; color:var(--muted); border-left:4px solid var(--accent); background:rgba(235,108,54,.05); }
    code { padding:.12em .35em; border-radius:4px; background:rgba(45,49,66,.06); font-family:"Cascadia Mono",Consolas,monospace; font-size:.9em; overflow-wrap:anywhere; }
    pre { overflow:auto; padding:18px; border:1px solid var(--rule); border-radius:6px; background:#f8f9fa; }
    pre code { padding:0; background:none; }
    table { width:100%; margin:1.4em 0; border-collapse:collapse; font-size:18px; }
    th,td { padding:10px 12px; border:1px solid var(--rule); text-align:left; vertical-align:top; }
    th { background:rgba(45,49,66,.04); }
    article p:has(> img) { margin:24px 0 10px; overflow-x:auto; scroll-margin-top:85px; }
    article img { display:block; width:100%; height:auto; border:1px solid var(--rule); border-radius:12px; background:var(--paper); }
    details { margin:12px 0; padding:10px 14px; border:1px solid var(--rule); border-radius:6px; background:#fafafa; }
    summary { cursor:pointer; color:var(--ink); font-weight:600; }
    hr { margin:40px 0; border:0; border-top:1px solid var(--rule); }
    @media (max-width:700px) {
      main { width:calc(100% - 24px); margin-top:16px; }
      article { padding:28px 18px; }
      p,li { font-size:18px; }
      table { display:block; overflow-x:auto; white-space:nowrap; }
      article p:has(> img)::before { content:"← 左右滑动查看完整图片 →"; display:block; margin-bottom:8px; color:#7a8399; font-size:13px; }
      article p>img { width:1080px; max-width:none; }
    }
  </style>
</head>
<body>
  <nav aria-label="教材文档导航">${nav}</nav>
  <main>${sections}</main>
</body>
</html>`

fs.writeFileSync(outputFile, html, 'utf8')
console.log(`Rendered lesson preview: ${outputFile}`)
