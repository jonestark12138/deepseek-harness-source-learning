# Lesson 01 Visual Plan

> 目标：用六张互不重复的主图建立稳定心智地图；Mermaid 只保留一次 runtime sequence。
> 状态含义：`Accepted` 已通过单图检查和整页 QA，`Planned` 尚未生产，`Prototype` 已有可改造资产，`Rejected` 不进入教材。

## Accepted figures

| Figure ID | Title | Question | Claim IDs | Teaching job | Tool / why | Main elements | Editable source | Export | Insert position | QA status |
|---|---|---|---|---|---|---|---|---|---|---|
| L01-F01 | Model Only vs Model + Harness | 为什么只有一个强大的 Model 仍不能完成真实多步骤任务？ | L01-C01, C04, C05, C07, C09, C14 | 30 秒职责对比 | diagram-design：需要 editorial comparison、视觉焦点和 Harness 边界 | Model Only；Harness boundary；Model；Capabilities；State；Policy；Environment，最多 7 个主元素 | `assets/lesson-01/fig-01-model-vs-harness.html` | `.svg` | `01-课件.md` 开篇；`02-逐步讲解.md` 第一个问题后 | Accepted：self-check 通过；桌面与窄屏已检查 |
| L01-F02 | 模块化智能工作室 | 怎样在脑中直觉记住 Model、Harness、Cordis、Plugin、Tool、Skill、Session、Sandbox？ | L01-C02, C03, C05–C10 | 建立空间隐喻和长期记忆 | Excalidraw：手绘空间、工作台、轨道、日志与受控区比正式架构更适合第一次理解 | 工作室边界；Model 工作台；Cordis 模块轨道；Plugin 架；Tool+Skill 区；Session 日志；Sandbox 边界，7 个主元素 | `assets/lesson-01/fig-02-modular-workshop.excalidraw` | `.svg` | `01-课件.md` Harness 初识之后；`02-逐步讲解.md` 正式术语之前 | Accepted：第二轮去除穿框长箭头后通过截图检查 |
| L01-F03 | Everything is a Plugin | 如果 Session、Tools、LLM、Loop 全写死在主函数，会产生什么问题？ | L01-C02, C03, C10, C11 | Before/After 解释插件化价值 | diagram-design：适合对比单体硬编码与可组合插件树 | Hard-coded main；Cordis Context；Plugin modules；service keys；config composition；reversible lifecycle，6 个主元素 | `assets/lesson-01/fig-03-everything-is-plugin.html` | `.svg` | `01-课件.md` 插件章节；`02-逐步讲解.md` 提出耦合问题之后 | Accepted：self-check 通过；桌面与整页 QA 通过 |
| L01-F04 | DeepSeek Harness 第一层正式架构 | 把工作室比喻拿掉后，真实第一层组件和组合关系是什么？ | L01-C02–C13 | 正式、长期维护的课程母图 | draw.io：需要严谨、可人工维护、以后逐层扩展 | CLI/Profile；Cordis plugin tree；Core plugins；Capability seams；Session log；Environment/UI，6 个主元素 | `assets/lesson-01/fig-04-first-layer-architecture.drawio` | `.svg` | `01-课件.md` 比喻映射完成后；`02-逐步讲解.md` 进入源码前 | Accepted：XML 解析通过；第二轮布局去除穿框连线 |
| L01-F05 | 第一次源码阅读路线 | Repo 很大时，第一讲应该先看什么、在哪里停下？ | L01-C11, C12 | 把目录地图变成阅读决策 | diagram-design：需要 must read / browse / defer 三种层级，而不是目录树 | architecture；bin.ts；profile-boot.ts；base bundle；boot boundary；later lessons，6 个主元素 | `assets/lesson-01/fig-05-source-reading-route.html` | `.svg` | `01-课件.md` 源码章节开头；导航和练习复用 | Accepted：self-check 通过；桌面与整页 QA 通过 |
| L01-F06 | 一次 runtime 旅程 | 静态组件运行后，一个 step 怎样从输入走到模型、工具、记录和继续？ | L01-C05, C07, C13 | 让静态地图动起来 | Mermaid sequence：时间顺序是主要信息，文本源易维护 | User；Agent/Harness；Session；LLM；Tools/Environment，5 个 participant | `assets/lesson-01/fig-06-runtime-journey.mmd` | `.svg` | `02-逐步讲解.md` 正式架构之后 | Accepted：保留 `.mmd`；SVG 为确定性教材导出 |

## Rejected or merged candidates

| Candidate | Decision | Reason |
|---|---|---|
| Cordis 为什么存在 | 合并进 L01-F03 / F04 | 单独成图会重复 Plugin 与正式架构关系 |
| 五层完整仓库地图 | 替换为 L01-F05 | 第一讲需要阅读优先级，不需要背全部领域分组 |
| TypeScript 语法路标图 | 移至 Lesson 02 | 与本讲驱动问题无关，打断 Agent Harness 心智模型 |
| Evidence triangle | 改为正文小表格 | 三个框不值得占用主图名额 |
| 完成检查流程图 | 删除 | checklist 更快、更清楚 |
| 后续课程地图 | 暂不生产 | 只有在 Lesson 01 完成后仍不清楚下一步时再增加 |

## Cross-tool consistency

- Model 始终使用橙色焦点 `#EB6C36`。
- Harness 使用深色系统边界 `#2D3142`，不得画成与 Tool 平级的小框。
- Cordis 使用 `#4F5D75`，表现共享 Context、依赖与生命周期，不使用 OS 图标。
- Plugin 使用紫色可插拔模块；Tool 使用绿色动作端口；Skill 使用说明书/卡片形状。
- Session 使用蓝色有序日志；Sandbox 使用明确边界和策略标记。
- 所有箭头说明语义；不能让 Model 看起来直接拥有 Filesystem、Session 或 Sandbox。

## Production and QA order

1. 先改造 L01-F01，移除远程字体并纠正箭头来源。
2. 生产 L01-F02，验证“多比喻、更形象”的核心方向是否成立。
3. 生产 L01-F04，确认比喻能够准确映射到正式技术结构。
4. 三张样板通过后再生产 F03、F05、F06。
5. 每张图独立用 Playwright 检查桌面视口；正文集成后再检查 1440×900 与 390×844。
6. `.excalidraw`、`.drawio`、`.html`、`.mmd` 必须与导出文件同名并一起保留。
