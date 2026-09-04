# DeepSeek Harness · 图文源码教材

用一个“模块化智能工作室”，理解模型、运行支撑和真实源码。面向有 Java 后端经验的工程师；先遇到问题，再用比喻和物件图建立直觉，最后核对代码。

这不是产品使用教程，也不是官方仓库的镜像。本仓库不复制完整上游源码，与 DeepSeek 官方无隶属或背书关系。

## 从这里开始

| 入口 | 适合什么时候 |
|---|---|
| [第一讲：学习导航](第01次-项目全景与源码阅读地图/00-学习导航.md) | 第一次阅读 |
| [第一讲：逐步讲解](第01次-项目全景与源码阅读地图/02-逐步讲解.md) | 跟着故事理解源码 |
| [第一讲：完整 HTML](previews/lesson-01.html) | 下载仓库后，用浏览器阅读六份材料 |
| [术语与比喻词典](第01次-项目全景与源码阅读地图/05-术语与比喻词典.md) | 忘记英文名或概念边界时 |
| [可搜索的物件素材库](assets/library/index.html) | 找机器人、大脑、工具箱等独立 SVG |
| [20 周源码学习计划](plan/DeepSeek-Harness源码学习计划.md) | 查看长期路线 |

GitHub 的文件页不直接运行 HTML。下载或克隆后打开 previews/lesson-01.html，或按 [构建说明](BUILD_TEXTBOOK.md) 启动本地浏览服务。

![第一讲统一物件风格：机器人、大脑、工具箱](assets/lesson-01/v2/fig-01-brain-and-workshop.svg)

## 目录：阅读、素材、制作记录分开

~~~text
第01次-项目全景与源码阅读地图/  六份正式教材
assets/library/                  独立物件、索引、来源与检索页面
assets/fonts/                    离线手写字体及授权
assets/lesson-01/v2/              六张插图与可重复组合的场景配方
previews/                        可直接浏览的整讲 HTML
production/lesson-01/             事实矩阵、教学设计和 QA
.agents/skills/                   生成后续教材的 Skill 与脚本
plan/                            学习计划与归档需求
archive/lesson-01-v1/             旧版图源，仅供追溯
~~~

实验截图、浏览器配置、下载字体与构建缓存只留在本地忽略目录，不属于正式教材。

## 怎样继续生成下一讲

使用 [教材 Skill](.agents/skills/deepseek-harness-textbook/SKILL.md)，遵循“查素材 → 复用物件 → 按教学问题组合 → 核对源码 → 浏览器验收”。没有合适素材时，再在 Figma 中补画并登记。文字、箭头与物件分开；不把截图包装成可编辑矢量。

具体命令见 [BUILD_TEXTBOOK.md](BUILD_TEXTBOOK.md)，视觉规则见 [STYLE_GUIDE.md](STYLE_GUIDE.md)。

## 源码基线与验证

上游项目：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)。第一讲固定于 [cd5ef8148158c3a752a658978873241fdf8e2bbc](https://github.com/deepseek-ai/deepseek-harness/tree/cd5ef8148158c3a752a658978873241fdf8e2bbc)。

教材与上游检出目录物理分离。比喻不是类型定义；配置顺序不是激活顺序；图片中的教学故事不是实际执行记录。

核对 [源码事实矩阵](production/lesson-01/lesson-01-source-facts.md) 和 [QA 报告](production/lesson-01/lesson-01-qa-report.md)。
