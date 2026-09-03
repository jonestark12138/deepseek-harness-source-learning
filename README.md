# DeepSeek Harness 源码学习笔记

这是一个面向源码和实现原理的个人学习仓库，不是 DeepSeek Harness 使用手册，也不是官方仓库的镜像。

学习资料与上游源码相互隔离：本仓库只保存学习计划、逐步讲解、练习答案和分享材料，不复制完整的 DeepSeek Harness 源码。涉及源码的位置会链接到官方 GitHub 仓库。

## 上游项目与学习基线

- 官方项目：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)
- 当前教材基于的源码版本：[`cd5ef8148158c3a752a658978873241fdf8e2bbc`](https://github.com/deepseek-ai/deepseek-harness/tree/cd5ef8148158c3a752a658978873241fdf8e2bbc)
- 本地学习时，上游源码与本仓库应放在相互独立的目录中，避免把官方源码和个人教材混在一起提交。

> 本仓库是个人学习记录，与 DeepSeek 官方无隶属或背书关系。项目名称及上游源码版权归其各自权利人所有。

## 总计划

- [DeepSeek Harness 源码与原理：20 周学习计划](plan/DeepSeek-Harness源码学习计划.md)

## 每次学习的固定结构

```text
第NN次-主题/
├─ 00-学习导航.md
├─ 01-课件.md
├─ 02-逐步讲解.md
├─ 03-练习与答案.md
└─ 04-分享稿.md
```

`01-课件` 用于预习和复习，`02-逐步讲解` 是主教材。先独立完成 `03-练习与答案` 的题目部分，再查看答案；最后通过 `04-分享稿` 把知识重新组织成可以讲给别人的内容。

## 教材生成工程

本仓库不只保存成品，还保留一套可复用的生产与检查流程：

- [DeepSeek Harness 教材 Skill](.agents/skills/deepseek-harness-textbook/SKILL.md)：约束比喻教学、源码证据、图文配合和 QA 流程。
- [共享视觉规范](STYLE_GUIDE.md)：定义颜色、形状语义、制图工具分工、响应式和可访问性要求。
- `assets/lesson-NN/`：保存可编辑图源和最终 SVG，不把图片当作一次性截图。
- `lesson-NN-brief.md`、`lesson-NN-source-facts.md`、`lesson-NN-visual-plan.md`、`lesson-NN-qa-report.md`：记录教学设计、事实基线、视觉计划和验收证据。
- `new-lesson.ps1`、`render-lesson.cjs`、`validate-lesson.ps1`：负责课程脚手架、浏览器预览和发布前检查。

第一讲提供了可直接打开的 [完整 HTML 预览](output/playwright/lesson-01-preview.html)，同时保留原始 Markdown 作为可维护内容源。

## 课程目录

| 次数 | 主题 | 当前状态 | 入口 |
|---|---|---|---|
| 第 1 次 | 项目全景与源码阅读地图 | 已按图文教材工程重构 | [开始学习](第01次-项目全景与源码阅读地图/00-学习导航.md) |
