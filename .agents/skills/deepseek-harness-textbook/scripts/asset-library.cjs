#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const ROOT = path.resolve(__dirname, '../../../..')
const LIBRARY = path.join(ROOT, 'assets/library')
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
function inside(root, relative) {
  if (path.isAbsolute(relative)) throw Error(`Absolute asset path: ${relative}`)
  const file = path.resolve(root, relative)
  const rel = path.relative(root, file)
  if (rel === '..' || rel.startsWith(`..${path.sep}`)) throw Error(`Path escaped root: ${relative}`)
  // Existing symlinks must not escape the actual library either.
  if (fs.existsSync(file)) {
    const realRel = path.relative(fs.realpathSync(root), fs.realpathSync(file))
    if (realRel === '..' || realRel.startsWith(`..${path.sep}`) || path.isAbsolute(realRel)) throw Error(`Symlink escaped root: ${relative}`)
  }
  return file
}
function readCatalog() { return JSON.parse(fs.readFileSync(path.join(LIBRARY, 'catalog.json'), 'utf8')) }
function search(query, catalog = readCatalog()) {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/)
  return catalog.assets.filter(a => terms.every(t => [a.id,a.name,a.concept,...a.keywords].join(' ').toLocaleLowerCase().includes(t)))
}
function readAsset(id, catalog = readCatalog()) {
  const item = catalog.assets.find(a => a.id === id)
  if (!item) throw Error(`Unknown asset ID: ${id}`)
  return fs.readFileSync(inside(LIBRARY, item.file), 'utf8')
}
function validate() {
  const cat = readCatalog(), ids = new Set()
  if (cat.schemaVersion !== 1) throw Error('Unsupported catalog schema')
  for (const a of cat.assets) {
    if (!/^[a-z0-9-]+-v\d+$/.test(a.id) || ids.has(a.id)) throw Error(`Invalid/duplicate ID: ${a.id}`)
    ids.add(a.id)
    if (a.style !== cat.style || !a.boundary || !a.source.nodeId || !a.review || !a.keywords.length) throw Error(`Incomplete metadata: ${a.id}`)
    const svg = readAsset(a.id, cat)
    if (!/<svg\b/.test(svg) || !/<title\b/.test(svg) || !/<desc\b/.test(svg) || !/viewBox=/.test(svg)) throw Error(`Incomplete SVG: ${a.id}`)
    if (/<(?:text|image|script|foreignObject)\b|\son\w+\s*=|(?:href|src)\s*=\s*["'](?!#)|url\(\s*["']?(?!#)/i.test(svg)) throw Error(`Object must be text-free, vector-only and self-contained: ${a.id}`)
    if (a.sha256 && a.sha256 !== crypto.createHash('sha256').update(svg).digest('hex')) throw Error(`Asset changed without catalog update: ${a.id}`)
  }
  return {assets:ids.size,style:cat.style}
}
function gallery() {
  validate()
  const cat=readCatalog()
  const cards=cat.assets.map(a=>`<article data-search="${escape([a.id,a.name,a.concept,...a.keywords].join(' ').toLowerCase())}"><img src="${escape(a.file)}" alt="${escape(a.name)}"><h2>${escape(a.name)}</h2><code>${escape(a.id)}</code><p>${escape(a.concept)}</p><p class="boundary">${escape(a.boundary)}</p><a href="https://www.figma.com/design/${escape(a.source.fileKey)}?node-id=${escape(a.source.nodeId.replace(':','-'))}">Figma 可编辑物件 ↗</a><a href="${escape(a.file)}" download>独立 SVG ↓</a></article>`).join('\n')
  const html=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>模块化工作室 · 素材库</title><link rel="icon" href="data:,"><style>@font-face{font-family:"Workshop Hand";src:url(../fonts/workshop-hand.woff2)}*{box-sizing:border-box}body{margin:0;background:#FFF9EE;color:#50483F;font:19px/1.6 "Workshop Hand","Microsoft YaHei",sans-serif}main{max-width:1250px;margin:48px auto;padding:0 24px}h1{font-size:40px;margin-bottom:6px}header p{max-width:850px}input{width:100%;padding:15px;border:1px solid #bcafa0;border-radius:12px;background:#fffdf8;font:inherit;color:inherit;margin:15px 0 28px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:20px}article{border:1px solid #e3d9ca;border-radius:16px;padding:22px;background:#fffdf7}article[hidden]{display:none}img{width:100%;height:180px;object-fit:contain}h2{font-size:25px;margin:14px 0 4px}code{font:12px Consolas,monospace;overflow-wrap:anywhere}.boundary{font-size:16px;min-height:76px;color:#756a5f}a{display:block;color:#426b62;font-size:16px;margin:6px 0}footer{margin:36px 0;font-size:16px}#count{font-size:17px}</style><main><header><p>教材的积木盒 / 素材库 v1</p><h1>一个物件，讲清一个角色</h1><p>先找物件，再摆场景。机器人、大脑和工具箱可以分开使用；文字和箭头不焊在素材里。所有物件可下载为独立矢量图。</p><label for="q">按中文、英文概念或素材编号搜索</label><input id="q" type="search" placeholder="例如：大脑 / Model / 日志 / 工具"><p id="count" aria-live="polite">${cat.assets.length} 个独立物件</p></header><section class="grid">${cards}</section><footer>11 个物件均已在 Figma 创建、截图复核并导出原生 SVG。新物件已作者复核，仍待读者反馈。<br>手写字体来自 LXGW WenKai TC 的本地子集；<a href="../fonts/OFL.txt">字体授权说明</a></footer></main><script>const q=document.querySelector('#q');q.addEventListener('input',()=>{const terms=q.value.trim().toLowerCase().split(/\\s+/);let n=0;for(const card of document.querySelectorAll('article')){card.hidden=!terms.every(t=>card.dataset.search.includes(t));if(!card.hidden)n++}document.querySelector('#count').textContent=n+' 个独立物件'});</script></html>`
  fs.writeFileSync(path.join(LIBRARY,'index.html'),html)
  return `${cat.assets.length} assets: assets/library/index.html`
}
if (require.main === module) {
  const [command,...args]=process.argv.slice(2)
  if (command==='search') console.log(JSON.stringify(search(args.join(' ')),null,2))
  else if(command==='validate') console.log(validate())
  else if(command==='gallery') console.log(gallery())
  else { console.error('Usage: asset-library.cjs search <terms> | validate | gallery'); process.exitCode=2 }
}
module.exports={ROOT,LIBRARY,escape,inside,readCatalog,search,readAsset,validate,gallery}
