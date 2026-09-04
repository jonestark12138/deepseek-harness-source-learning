# 第一讲视觉计划 · 六张图共用一套物件

源码快照：cd5ef8148158c3a752a658978873241fdf8e2bbc。默认风格：workshop-pastel-v1。所有文字与箭头都在场景配方中，不写死在物件 SVG 里。

| 图 | 单一教学任务 | 事实 ID | 主要物件数 | 场景配方 / 导出 |
|---|---|---|---:|---|
| 1 | 区分会想与能做 | C01、C06、C14 | 3 | [大脑与工具箱配方](../../assets/lesson-01/v2/fig-01-brain-and-workshop.scene.json) / [SVG](../../assets/lesson-01/v2/fig-01-brain-and-workshop.svg) |
| 2 | 分清动作、方法、记录、材料和约束 | C05、C07–09、C15 | 6 | [五件物品配方](../../assets/lesson-01/v2/fig-02-five-objects.scene.json) / [SVG](../../assets/lesson-01/v2/fig-02-five-objects.svg) |
| 3 | 核心能力也按插件装配 | C02、C03 | 7 | [插拔工作台配方](../../assets/lesson-01/v2/fig-03-pluggable-workbench.scene.json) / [SVG](../../assets/lesson-01/v2/fig-03-pluggable-workbench.svg) |
| 4 | 看清配置应用顺序 | C11、C12 | 5 | [装配清单配方](../../assets/lesson-01/v2/fig-04-assembly-sheets.scene.json) / [SVG](../../assets/lesson-01/v2/fig-04-assembly-sheets.svg) |
| 5 | 五站阅读，到启动边界停下 | C11、C12 | 6 | [阅读路径配方](../../assets/lesson-01/v2/fig-05-reading-trail.scene.json) / [SVG](../../assets/lesson-01/v2/fig-05-reading-trail.svg) |
| 6 | 动作结果影响下一次判断 | C05、C07、C13 | 6，分四幕 | [运行故事配方](../../assets/lesson-01/v2/fig-06-runtime-story.scene.json) / [SVG](../../assets/lesson-01/v2/fig-06-runtime-story.svg) |

Cxx 均指事实矩阵中的 L01-Cxx。所有图在课件和逐步讲解中复用；分享稿只链接前三张，不另画近义图。图注与配方都保留问题、结论和比喻边界。

## 素材与工具的真实分工

11 个独立物件来自 Figma 原生矢量导出；原始机器人、大脑、工具箱的路径被复用或拆分，补画模块、清单和工作台。Figma 用于创建、调整和单物件检查，本地组合器用于可重复排版。没有调用 Figma 的图像生成模型，没有用 Mermaid 转换冒充插图，也没有把位图包进 SVG。

[素材索引](../../assets/library/catalog.json) 保留名称、关键词、文件、哈希、风格和 Figma 节点；[图库](../../assets/library/index.html) 支持中文/英文检索。

## 语义边界

- 图 1 的机器人是整体助手，不是源码 Agent 接口；工具箱不仅包含工具。
- 图 2 并排是职责区分，护栏不是绝对安全保证。
- 图 3 是插件组织，不承诺任意实现兼容或随时热拔插。
- 图 4 是配置顺序，不能推导激活顺序。
- 图 5 是给读者走的路，不是程序调用链。
- 图 6 是教学示例，工具可选、可拒绝、可失败，模型也可直接回答。

## QA 状态

机器检查通过；作者已逐图查看并修复透明填充继承和工作台遮挡问题。新整讲仍待用户反馈，不标作用户已接受。具体结果见 [QA 报告](lesson-01-qa-report.md)。
