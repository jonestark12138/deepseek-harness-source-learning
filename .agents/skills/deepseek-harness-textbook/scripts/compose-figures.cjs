#!/usr/bin/env node
const fs=require('node:fs')
const path=require('node:path')
const {ROOT,LIBRARY,escape,readCatalog,readAsset}=require('./asset-library.cjs')
const style=JSON.parse(fs.readFileSync(path.join(LIBRARY,'style.json'),'utf8'))
function finite(...values){if(values.some(v=>!Number.isFinite(v)))throw Error('Expected finite geometry')}
function checkText(text, coverage) {
  if(!coverage) return
  const missing=[...new Set([...text].filter(c=>!/[\s\uFE0F]/u.test(c)&&!coverage.has(c.codePointAt(0))))]
  if(missing.length) throw Error(`Font subset missing glyphs: ${missing.join('')}; rebuild fonts first`)
}
function compose(scene, {font,coverage}={}) {
  if(scene.schemaVersion!==1 || scene.style!==style.id) throw Error('Invalid scene schema/style')
  finite(scene.width,scene.height)
  if(scene.width<=0||scene.height<=0||!scene.question||!scene.boundary||!scene.claims?.length)throw Error('Missing scene teaching contract')
  const cat=readCatalog(), parts=[]
  for(const [index,e] of scene.elements.entries()){
    finite(e.x,e.y)
    if(e.type==='object'){
      finite(e.width,e.height)
      if(e.width<=0||e.height<=0||e.x<0||e.y<0||e.x+e.width>scene.width||e.y+e.height>scene.height)throw Error(`Object out of bounds: ${e.asset}`)
      let svg=readAsset(e.asset,cat)
      const vb=svg.match(/viewBox="([^"]+)"/)[1]
      // Namespace every object occurrence; no shared defs/title IDs across instances.
      svg=svg.replace(/<svg\b[^>]*>/,'').replace(/<\/svg>\s*$/,'')
      const prefix=`o${index}-`
      svg=svg.replace(/id="([^"]+)"/g,(_,id)=>`id="${prefix}${id}"`).replace(/(?:url\(#([^)]*)\))/g,(_,id)=>`url(#${prefix}${id})`).replace(/(href=")#([^"]+)"/g,(_,a,id)=>`${a}#${prefix}${id}"`)
      parts.push(`<svg data-asset="${e.asset}" x="${e.x}" y="${e.y}" width="${e.width}" height="${e.height}" viewBox="${vb}" fill="none" aria-hidden="true">${svg}</svg>`)
    }else if(e.type==='text'){
      const lines=Array.isArray(e.text)?e.text:[e.text]
      if(lines.some(t=>typeof t!=='string'))throw Error('Invalid label')
      lines.forEach(t=>checkText(t,coverage))
      const size=e.size??27,lh=e.lineHeight??size*1.4
      finite(size,lh)
      if(size<18 || !['start','middle','end'].includes(e.anchor??'middle'))throw Error('Invalid text style')
      const color=e.color??style.ink
      if(!/^#[0-9a-f]{6}$/i.test(color))throw Error('Invalid text color')
      parts.push(`<text data-label="${index}" x="${e.x}" y="${e.y}" text-anchor="${e.anchor??'middle'}" fill="${color}" font-size="${size}">${lines.map((t,i)=>`<tspan x="${e.x}" dy="${i?lh:0}">${escape(t)}</tspan>`).join('')}</text>`)
    }else if(e.type==='arrow'){
      finite(e.x2,e.y2)
      if(!e.meaning)throw Error('Arrow requires explicit semantic meaning')
      parts.push(`<path d="M ${e.x} ${e.y} Q ${(e.x+e.x2)/2} ${(e.y+e.y2)/2-6} ${e.x2} ${e.y2}" fill="none" stroke="${style.muted}" stroke-width="2.4" ${e.optional?'stroke-dasharray="7 7"':''} marker-end="url(#arrow)"><title>${escape(e.meaning)}</title></path>`)
    }else if(e.type==='oval'){
      finite(e.width,e.height)
      parts.push(`<ellipse cx="${e.x+e.width/2}" cy="${e.y+e.height/2}" rx="${e.width/2}" ry="${e.height/2}" fill="none" stroke="${style.muted}" stroke-width="2" stroke-dasharray="7 9"/>`)
    }else throw Error(`Unknown scene element: ${e.type}`)
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${scene.width}" height="${scene.height}" viewBox="0 0 ${scene.width} ${scene.height}" role="img" aria-labelledby="title desc"><title id="title">${escape(scene.question)}</title><desc id="desc">${escape(scene.description)} 比喻边界：${escape(scene.boundary)}</desc><defs><style>${font?`@font-face{font-family:'Workshop Hand';src:url(data:font/woff2;base64,${font}) format('woff2');}`:''}text{font-family:'Workshop Hand','Microsoft YaHei',sans-serif}</style><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M1 1L8 4L1 7" fill="none" stroke="${style.muted}" stroke-width="1.5"/></marker></defs><rect width="100%" height="100%" rx="18" fill="${style.paper}"/>${parts.join('\n')}</svg>\n`
}
function build(target) {
  const stat=fs.statSync(target)
  const files=stat.isDirectory()?fs.readdirSync(target).filter(f=>f.endsWith('.scene.json')).sort().map(f=>path.join(target,f)):[target]
  if(!files.length)throw Error('No scene recipes found')
  const font=fs.readFileSync(path.join(ROOT,'assets/fonts/workshop-hand.woff2')).toString('base64')
  const coverage=new Set(JSON.parse(fs.readFileSync(path.join(ROOT,'assets/fonts/provenance.json'),'utf8')).codepoints)
  // Render everything before writing so a bad recipe cannot leave a half-updated set.
  const outputs=files.map(file=>{
    if(!file.endsWith('.scene.json'))throw Error('Expected .scene.json')
    return [file.replace(/\.scene\.json$/,'.svg'),compose(JSON.parse(fs.readFileSync(file,'utf8')),{font,coverage})]
  })
  for(const [file,svg] of outputs)fs.writeFileSync(file,svg)
  return outputs.map(([file])=>file)
}
if(require.main===module){const target=process.argv[2];if(!target){console.error('Usage: compose-figures.cjs <scene.json or directory>');process.exitCode=2}else console.log(build(path.resolve(target)).join('\n'))}
module.exports={compose,build,checkText}
