async page => {
  // Start at the staged, deployed or extracted homepage before running.
  const base=page.url().split(/[?#]/)[0].replace(/[^/]*$/,'')
  const mode=base.startsWith('file:')?'offline':base.includes('127.0.0.1')?'local':'live'
  const failures=[];const metrics=[]
  const onError=e=>failures.push(String(e))
  page.on('pageerror',onError)
  async function check(label){
    await page.waitForLoadState('load')
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})))})
    const state=await page.evaluate(()=>({title:document.title,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...document.images].length,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src')),font:[...document.fonts].some(f=>f.family.includes('Workshop Hand')&&f.status==='loaded')}))
    if(state.scrollWidth>state.width+1||state.brokenImages.length||!state.font)failures.push({label,...state})
    metrics.push({label,...state})
  }
  try {
    await page.setViewportSize({width:1440,height:900})
    await page.goto(base+'index.html')
    await check('home-desktop')
    await page.screenshot({path:`output/qa/site-${mode}-desktop.png`,fullPage:true})
    await page.setViewportSize({width:390,height:844})
    await check('home-mobile')
    await page.screenshot({path:`output/qa/site-${mode}-mobile.png`,fullPage:true})
    await page.getByRole('link',{name:'开始阅读第一讲 →',exact:true}).click()
    await check('lesson-mobile')
    if(await page.locator('article[id^="doc-"]').count()!==6)failures.push('Missing lesson documents')
    await page.getByRole('link',{name:'术语词典',exact:true}).click()
    if(!page.url().endsWith('#doc-5'))failures.push('Glossary navigation failed')
    await page.getByRole('link',{name:'练习与答案',exact:true}).first().click()
    const answer=page.locator('#doc-3 details').first()
    await answer.locator('summary').click()
    if(!await answer.evaluate(e=>e.open))failures.push('Answer toggle failed')
    const figure=page.locator('article p:has(> img)').first()
    await figure.scrollIntoViewIfNeeded()
    const width=await figure.evaluate(e=>{e.scrollLeft=e.scrollWidth;return {view:e.clientWidth,content:e.scrollWidth,right:e.scrollLeft}})
    if(width.content<=width.view||width.right<=0)failures.push('Mobile figure cannot scroll')
    await page.screenshot({path:`output/qa/site-${mode}-lesson-mobile.png`})
    await page.getByRole('link',{name:'← 阅读首页',exact:true}).click()
    await page.goto(base+'assets/library/index.html')
    await check('gallery-mobile')
    await page.locator('#q').fill('大脑')
    if(await page.locator('article:visible').count()!==1)failures.push('Gallery search failed')
    await page.locator('#q').fill('不存在的物件')
    if(await page.locator('article:visible').count()!==0)failures.push('Gallery empty search failed')
    await page.goto(base+'evidence.html')
    await check('evidence-mobile')
    await page.goto(base+'index.html')
  } finally {page.off('pageerror',onError)}
  if(failures.length)throw new Error(JSON.stringify(failures))
  return {mode,metrics,status:'passed'}
}
