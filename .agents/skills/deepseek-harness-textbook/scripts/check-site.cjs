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
    if(!/^(index\.html|evidence\.html|site\.css|\.nojekyll|previews\/lesson-01\.html|assets\/fonts\/(workshop-hand\.woff2|OFL\.txt|provenance\.json)|assets\/library\/(index\.html|catalog\.json|style\.json|objects\/[a-z0-9-]+\.svg)|assets\/lesson-01\/v2\/[a-z0-9-]+\.svg)$/.test(rel))throw new Error(`Not publishable: ${rel}`)
    if(!/\.(html|css|svg)$/.test(f))continue
    const text=fs.readFileSync(f,'utf8')
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
  for(const required of ['index.html','previews/lesson-01.html','evidence.html','assets/library/index.html','assets/fonts/OFL.txt'])if(!fs.existsSync(path.join(root,required)))throw new Error(`Missing ${required}`)
  return {files:files.length,localLinks:links,status:'passed'}
}
if(require.main===module)console.log(validateSite(path.resolve(process.argv[2]||'output/site')))
module.exports={validateSite}
