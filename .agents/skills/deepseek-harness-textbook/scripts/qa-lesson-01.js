async page => {
  const base='http://127.0.0.1:8765';
  const errors=[];
  const failed=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()})});
  await page.setViewportSize({width:1440,height:900});
  const figures=['brain-and-workshop','five-objects','pluggable-workbench','assembly-sheets','reading-trail','runtime-story'];
  const results=[];
  for(let i=0;i<figures.length;i++){
    await page.goto(`${base}/assets/lesson-01/v2/fig-0${i+1}-${figures[i]}.svg`);
    await page.evaluate(()=>document.fonts.ready);
    const metrics=await page.evaluate(()=>{
      const labels=[...document.querySelectorAll('text')].map(n=>{const b=n.getBBox();return {text:n.textContent,x:b.x,y:b.y,width:b.width,height:b.height}});
      const outside=labels.filter(b=>b.x<0||b.y<0||b.x+b.width>1200||b.y+b.height>740);
      const overlaps=[];
      for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];if(a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y)overlaps.push([a.text,b.text])}
      return {outside,overlaps,fontLoaded:document.fonts.check('27px "Workshop Hand"')};
    });
    results.push({figure:i+1,...metrics});
    await page.locator('svg').first().screenshot({path:`output/qa/figure-${i+1}.png`});
  }
  await page.goto(`${base}/assets/library/index.html`);
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:'output/qa/library-desktop.png',fullPage:true});
  await page.locator('#q').fill('大脑');
  const searchCount=await page.locator('article:visible').count();
  if(searchCount!==1)throw Error('Gallery search failed');
  await page.locator('#q').fill('');
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:'output/qa/library-mobile.png'});
  const galleryWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
  await page.goto(`${base}/previews/lesson-01.html`);
  await page.setViewportSize({width:1440,height:900});
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('nav a').nth(1).click();
  const navUrl=page.url();
  const coursewareTop=await page.locator('#doc-1').evaluate(n=>n.getBoundingClientRect().top);
  if(coursewareTop<65||coursewareTop>100)throw Error('Navigation did not scroll to courseware');
  await page.screenshot({path:'output/qa/lesson-desktop.png'});
  const images=await page.locator('article img').evaluateAll(ns=>ns.map(n=>({src:n.getAttribute('src'),loaded:n.complete&&n.naturalWidth>0})));
  await page.locator('nav a').nth(2).click();
  await page.screenshot({path:'output/qa/explanation-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.locator('nav a').nth(0).click();
  await page.screenshot({path:'output/qa/lesson-mobile.png'});
  const lessonWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
  const firstImage=page.locator('#doc-1 p:has(>img)').first();
  await firstImage.evaluate(n=>n.scrollIntoView({block:'start'}));
  await page.screenshot({path:'output/qa/figure-mobile-left.png'});
  await firstImage.evaluate(n=>n.scrollLeft=n.scrollWidth);
  await page.screenshot({path:'output/qa/figure-mobile-right.png'});
  const mobileFigures=[];
  for(let i=0;i<6;i++){
    const frame=page.locator('#doc-1 p:has(>img)').nth(i);
    await frame.evaluate(n=>{n.scrollIntoView({block:'start'});n.scrollLeft=0});
    await page.screenshot({path:`output/qa/figure-${i+1}-mobile-left.png`});
    const metric=await frame.evaluate(n=>({visible:n.clientWidth,full:n.scrollWidth}));
    await frame.evaluate(n=>n.scrollLeft=n.scrollWidth);
    await page.screenshot({path:`output/qa/figure-${i+1}-mobile-right.png`});
    mobileFigures.push(metric);
  }
  await page.locator('nav a').nth(3).click();
  await page.locator('#doc-3 summary').first().click();
  const answerOpen=await page.locator('#doc-3 details').first().getAttribute('open');
  await page.locator('nav a').nth(5).click();
  await page.screenshot({path:'output/qa/glossary-mobile.png'});
  const report={results,mobileFigures,coursewareTop,searchCount,galleryWidth,lessonWidth,navUrl,imagesLoaded:images.every(x=>x.loaded),imageCount:images.length,answerOpen:answerOpen!==null,pageErrors:errors,failedResponses:failed};
  console.log(JSON.stringify(report,null,2));
  if(results.some(r=>r.outside.length||r.overlaps.length||!r.fontLoaded)||galleryWidth>390||lessonWidth>390||!report.imagesLoaded||errors.length||failed.length||!report.answerOpen)throw Error('Visual metrics failed; inspect report and screenshots');
  return report;
}
