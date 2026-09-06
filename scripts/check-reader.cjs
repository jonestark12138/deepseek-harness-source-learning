#!/usr/bin/env node
const fs=require('node:fs')
const path=require('node:path')
function validateSite(root){
  const files=[]
  function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isSymbolicLink())throw new Error(`Symlink: ${f}`);if(e.isDirectory())walk(f);else files.push(f)}}
  walk(root)
  let links=0
  for(const f of files){
    const rel=path.relative(root,f).replaceAll('\\','/')
    if(/^assets\/lesson-/.test(rel))throw Error(`Not publishable: obsolete asset directory ${rel}`)
    if(!/^(index\.html|site\.css|\.nojekyll|evidence\/(?:lesson-0[1-9]|chapter-(?:0[1-9]|1[0-7])|appendix-[abc])\.html|previews\/(?:lesson-0[1-9]|chapter-(?:0[1-9]|1[0-7])|appendix-[abc])\.html|assets\/fonts\/(workshop-hand\.woff2|OFL\.txt|provenance\.json)|assets\/(?:lesson-0[1-9]|chapter-(?:0[1-9]|1[0-7])|appendix-[abc])\/reader\/fig-0[1-6]-[a-z-]+\.png)$/.test(rel))throw new Error(`Not publishable: ${rel}`)
    if(f.endsWith('.png')){
      const bytes=fs.readFileSync(f)
      if(bytes.length<24||!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||bytes.readUInt32BE(16)!==2400||bytes.readUInt32BE(20)!==1480)throw new Error(`Expected flattened 2400x1480 PNG: ${rel}`)
    }
    if(!/\.(html|css|svg)$/.test(f))continue
    const text=fs.readFileSync(f,'utf8')
    if(/^(previews|evidence)\/lesson-/.test(rel)){
      const targets={'01':'chapter-01','02':'appendix-a','03':'appendix-b','04':'appendix-c','05':'chapter-05','06':'chapter-13','07':'chapter-14','08':'chapter-15','09':'chapter-12'}
      const target=targets[rel.match(/lesson-(\d+)/)[1]]
      const expected=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>章节已归位</title><meta name="viewport" content="width=device-width,initial-scale=1"><a href="${target}.html">打开对应新版章节</a><script>location.replace("${target}.html"+location.hash)</script></html>`
      if(text.replace(/<meta name="textbook-version" content="[0-9.]+">/,'').trim()!==expected)throw Error(`Legacy URL must contain only its approved redirect: ${rel}`)
    }
    if(/<svg\b|figma\.com|assets\/library|\.scene\.json|data:image\/svg|deepseek-harness-authoring/i.test(text))throw new Error(`Private authoring reference: ${rel}`)
    if(/<base\b/i.test(text))throw new Error(`Base URL breaks offline parity: ${rel}`)
    const refs=[...text.matchAll(/(?:href|src)=["']([^"']+)["']/g),...text.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)]
    for(const [,raw] of refs){
      if(/^(https?:|data:)/i.test(raw))continue
      if(raw.startsWith('/')||/^[a-z]+:/i.test(raw))throw new Error(`Non-portable URL: ${raw}`)
      const [file,hash]=raw.split('#');const target=file?path.resolve(path.dirname(f),decodeURIComponent(file.split('?')[0])):f
      const relative=path.relative(root,target)
      if(relative.startsWith('..')||path.isAbsolute(relative)||!fs.existsSync(target))throw new Error(`Broken local URL in ${rel}: ${raw}`)
      if(hash&&target.endsWith('.html')&&!fs.readFileSync(target,'utf8').includes(`id="${hash}"`))throw new Error(`Missing anchor: ${raw}`)
      links++
    }
  }
  for(const required of ['index.html','assets/fonts/OFL.txt',...["chapter-01","chapter-02","chapter-03","chapter-04","chapter-05","chapter-06","chapter-07","chapter-08","chapter-09","chapter-10","chapter-11","chapter-12","chapter-13","chapter-14","chapter-15","chapter-16","chapter-17","appendix-a","appendix-b","appendix-c"].flatMap(slug=>[`previews/${slug}.html`,`evidence/${slug}.html`])])if(!fs.existsSync(path.join(root,required)))throw new Error(`Missing ${required}`)
  return {files:files.length,localLinks:links,status:'passed'}
}
function validateEdition(root,version='3.0.1'){
  const main=Array.from({length:17},(_,i)=>`chapter-${String(i+1).padStart(2,'0')}`),slugs=[...main,'appendix-a','appendix-b','appendix-c']
  const home=fs.readFileSync(path.join(root,'index.html'),'utf8')
  const route=[...new Set([...home.matchAll(/href="previews\/((?:chapter-\d+|appendix-[abc]))\.html#doc-2"/g)].map(m=>m[1]))]
  if(JSON.stringify(route)!==JSON.stringify(slugs))throw Error('Homepage course order differs from current edition')
  if(/(?:href|src)="[^"\n]*(?:lesson-0[1-9]|lessons-01-)/.test(home))throw Error('Homepage links to an old edition')
  for(const relative of ['index.html',...slugs.flatMap(s=>[`previews/${s}.html`,`evidence/${s}.html`])]){
    const text=fs.readFileSync(path.join(root,relative),'utf8')
    if(!text.includes(`<meta name="textbook-version" content="${version}">`))throw Error('Stale or missing edition stamp: '+relative)
    if(relative.startsWith('previews/')&&['0','1','2','3','4','5'].some(id=>!text.includes(`<article id="doc-${id}">`)))throw Error('Incomplete lesson documents: '+relative)
  }
  return {version,chapters:slugs.length,status:'passed'}
}
if(require.main===module){
  console.log(validateSite(path.resolve(process.argv[2]||'output/site')))
  console.log(validateEdition(path.resolve(process.argv[2]||'output/site')))
  if(process.argv.includes('--repository')){
    const {execFileSync}=require('node:child_process')
    const files=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean)
    for(const file of files)if(!/^(reader\/|README\.md$|\.gitattributes$|\.github\/workflows\/pages\.yml$|scripts\/check-reader\.cjs$|releases\/complete-course-v3\.0\.1\.md$)/.test(file))throw new Error(`Unexpected public repository file: ${file}`)
    console.log('Public repository boundary passed:',files.length)
  }
}
module.exports={validateSite,validateEdition}
