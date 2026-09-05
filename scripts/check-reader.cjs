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
    if(!/^(index\.html|site\.css|\.nojekyll|evidence\/lesson-0[1-3]\.html|previews\/lesson-0[1-3]\.html|assets\/fonts\/(workshop-hand\.woff2|OFL\.txt|provenance\.json)|assets\/lesson-0[1-3]\/reader\/fig-0[1-6]-[a-z-]+\.png)$/.test(rel))throw new Error(`Not publishable: ${rel}`)
    if(f.endsWith('.png')){
      const bytes=fs.readFileSync(f)
      if(bytes.length<24||!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||bytes.readUInt32BE(16)!==2400||bytes.readUInt32BE(20)!==1480)throw new Error(`Expected flattened 2400x1480 PNG: ${rel}`)
    }
    if(!/\.(html|css|svg)$/.test(f))continue
    const text=fs.readFileSync(f,'utf8')
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
  for(const required of ['index.html','assets/fonts/OFL.txt',...['01','02','03'].flatMap(id=>[`previews/lesson-${id}.html`,`evidence/lesson-${id}.html`])])if(!fs.existsSync(path.join(root,required)))throw new Error(`Missing ${required}`)
  return {files:files.length,localLinks:links,status:'passed'}
}
if(require.main===module){
  console.log(validateSite(path.resolve(process.argv[2]||'output/site')))
  if(process.argv.includes('--repository')){
    const {execFileSync}=require('node:child_process')
    const files=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean)
    for(const file of files)if(!/^(reader\/|README\.md$|\.gitattributes$|\.github\/workflows\/pages\.yml$|scripts\/check-reader\.cjs$|releases\/lesson-(01-v1\.0\.1|01-03-v1\.1\.0)\.md$)/.test(file))throw new Error(`Unexpected public repository file: ${file}`)
    console.log('Public repository boundary passed:',files.length)
  }
}
module.exports={validateSite}
