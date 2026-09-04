#!/usr/bin/env node
const fs=require('node:fs')
const path=require('node:path')
const {ROOT}=require('./asset-library.cjs')
const skip=new Set(['.git','.local','output','node_modules','.playwright-cli'])
const files=[]
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(skip.has(e.name))continue;const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else files.push(f)}}
walk(ROOT)
const failures=[];let links=0
for(const file of files.filter(f=>f.endsWith('.md'))){
  const text=fs.readFileSync(file,'utf8').replace(/^\s*(```|~~~)[\s\S]*?^\s*\1.*$/gm,'')
  for(const m of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)){
    const target=m[1].replace(/^<|>$/g,'').split(/[?#]/)[0]
    if(!target||/^[a-z][a-z0-9+.-]*:/i.test(target))continue
    const resolved=path.resolve(path.dirname(file),decodeURIComponent(target))
    links++
    if(!fs.existsSync(resolved))failures.push(`${path.relative(ROOT,file)}: broken link ${target}`)
  }
}
for(const file of files.filter(f=>/\.(md|json|cjs|js|ps1|html|svg|yaml)$/.test(f))){
  const text=fs.readFileSync(file,'utf8')
  if(/(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{25,}|sk-[A-Za-z0-9_-]{24,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/.test(text))failures.push(`${path.relative(ROOT,file)}: possible credential`)
}
console.log(JSON.stringify({files:files.length,localMarkdownLinks:links,failures},null,2))
if(failures.length)process.exitCode=1
