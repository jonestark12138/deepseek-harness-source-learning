#!/usr/bin/env node
const path=require('node:path')
const {execFileSync}=require('node:child_process')
const {ROOT,validate,gallery}=require('./asset-library.cjs')
const {build}=require('./compose-figures.cjs')
console.log('Asset validation:',validate())
console.log('Composed SVGs:',build(path.join(ROOT,'assets/lesson-01/v2')).length)
console.log(gallery())
execFileSync(process.execPath,[path.join(__dirname,'render-lesson.cjs'),path.join(ROOT,'第01次-项目全景与源码阅读地图'),path.join(ROOT,'previews/lesson-01.html')],{stdio:'inherit'})
