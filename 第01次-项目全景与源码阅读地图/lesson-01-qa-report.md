# 第 01 讲 QA 报告

## 结论

第 01 讲已完成内容重构、图形资产生产、源码事实校准和桌面/窄屏浏览器复验。当前版本可以作为后续课程的工程基线；所有主教材图片均使用相对路径，源码证据固定到同一提交，主文档不再依赖 Mermaid 承担概念解释。

## 验证基线

- 上游源码提交：`cd5ef8148158c3a752a658978873241fdf8e2bbc`
- 教材范围：`00-学习导航.md`、`01-课件.md`、`02-逐步讲解.md`、`03-练习与答案.md`、`04-分享稿.md`
- 视觉范围：L01-F01 至 L01-F06，共 6 张主图
- 隔离边界：教材位于 `docs/`；上游代码只读引用，不写入 `source/deepseek-harness/`

## 自动检查

| 检查项 | 结果 | 说明 |
|---|---|---|
| Lesson validator | 通过 | 检查 9 个 Markdown、6 个 SVG，0 warning |
| diagram-design self-check | 通过 | L01-F01、L01-F03、L01-F05 |
| Excalidraw 资产 | 通过 | L01-F02 经两轮截图检查，移除穿框长箭头；保留 `.excalidraw` 与元素 JSON |
| draw.io XML | 通过 | L01-F04 可解析，5 条边，0 个缺失 edge geometry |
| Node 语法 | 通过 | `render-lesson.cjs` 通过 `node --check` |
| PowerShell 语法 | 通过 | `new-lesson.ps1`、`validate-lesson.ps1` 通过 AST 解析 |
| 绝对本地路径 | 通过 | 主教材中未发现盘符绝对路径或本地文件协议引用 |
| Mermaid 主文档块 | 通过 | 5 份主教材中为 0；仅 L01-F06 保留可编辑 `.mmd` 源 |

## 浏览器视觉 QA

| 场景 | 结果 | 证据 |
|---|---|---|
| 1440 × 900 桌面整课预览 | 通过 | [`lesson-01-desktop-courseware.png`](../output/playwright/lesson-01-desktop-courseware.png) |
| 390 × 844 窄屏正文 | 通过 | [`lesson-01-narrow-final.png`](../output/playwright/lesson-01-narrow-final.png) |
| 390 × 844 核心大图 | 通过 | [`lesson-01-narrow-figure-final.png`](../output/playwright/lesson-01-narrow-figure-final.png) |
| 全局横向溢出 | 无 | viewport、document 和 body 宽度均为 390px |
| 大图局部浏览 | 通过 | 328px 容器内保留约 900px 图宽和横向滚动提示 |
| 资源请求 | 通过 | 整课预览与 6 个 SVG 均返回 200 |
| 浏览器控制台 | 通过 | 全新会话 0 error、0 warning |

## 人工复核结论

- 每张图只承担一个主要教学任务；主元素均不超过 7 个。
- 先使用“模块化智能工作室”建立直觉，再用正式架构图收紧术语，避免把比喻当成实现事实。
- 图后均有观察问题、边界说明或一句话结论，不把图片当装饰。
- 练习覆盖主动回忆、运行预测、源码定位、断言校准和画图表达。
- 视觉资产使用本地字体回退，无远程字体依赖。

## 已知限制

- Codex 的 `drawio@drawio` 插件与 Skill 已安装并启用；当前机器没有检测到独立的 draw.io Desktop 可执行文件，因此 L01-F04 的 `.drawio` 文件通过原生 XML 编写和结构检查，配套 SVG 按同一逻辑布局维护。本轮没有声称执行过 Desktop CLI 导出。
- HTML 预览是浏览器阅读版，不替代 Markdown 原稿；后续修改应先改教材与可编辑图源，再重新运行渲染和验证脚本。
- 本轮未提交或推送 Git 变更。
