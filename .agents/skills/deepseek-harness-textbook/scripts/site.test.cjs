const {test}=require('node:test')
const assert=require('node:assert/strict')
const fs=require('node:fs')
const os=require('node:os')
const path=require('node:path')
const {validateSite}=require('./check-site.cjs')
const {ROOT}=require('./asset-library.cjs')
function fixture(t){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'textbook-site-test-'))
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}))
  for(const file of ['index.html','evidence.html','previews/lesson-01.html','assets/library/index.html','assets/fonts/OFL.txt']){fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),'')}
  return root
}
test('published build contains only reader files and has closed local links',()=>assert.equal(validateSite(path.join(ROOT,'output/site')).status,'passed'))
test('relative links work under a repository prefix and offline',t=>{const root=fixture(t);fs.writeFileSync(path.join(root,'index.html'),'<a href="previews/lesson-01.html#doc-0">Read</a>');fs.writeFileSync(path.join(root,'previews/lesson-01.html'),'<article id="doc-0"><a href="../index.html">Home</a></article>');assert.equal(validateSite(root).localLinks,2)})
test('reject missing local resources',t=>{const root=fixture(t);fs.writeFileSync(path.join(root,'index.html'),'<img src="missing.svg">');assert.throws(()=>validateSite(root),/Broken local URL/)})
test('reject missing anchors',t=>{const root=fixture(t);fs.writeFileSync(path.join(root,'index.html'),'<a href="evidence.html#missing">Evidence</a>');assert.throws(()=>validateSite(root),/Missing anchor/)})
test('reject root-absolute links that break project Pages',t=>{const root=fixture(t);fs.writeFileSync(path.join(root,'index.html'),'<a href="/index.html">Home</a>');assert.throws(()=>validateSite(root),/Non-portable URL/)})
test('reject accidental private or engineering files',t=>{const root=fixture(t);fs.writeFileSync(path.join(root,'secret.env'),'example');assert.throws(()=>validateSite(root),/Not publishable/)})
test('reject stale base directory',t=>{const root=fixture(t);fs.writeFileSync(path.join(root,'index.html'),'<base href="../source/">');assert.throws(()=>validateSite(root),/Base URL/)})
