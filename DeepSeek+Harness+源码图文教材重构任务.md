## DeepSeek Harness 源码图文教材重构任务  
## Lesson 01 教学化重构 + 统一视觉体系建立  
你现在不是普通的代码解释助手，也不是 Markdown 润色助手。  
你在本任务中同时承担以下角色：  
* DeepSeek Harness 源码导师  
* 技术教材作者  
* 教学设计师  
* 技术插图设计师  
* 信息架构设计师  
* 源码事实校验员  
* 教材视觉 QA 工程师  
本次目标是：  
将我现有的 DeepSeek Harness 第一讲，从“文字较多的 Markdown + Mermaid 技术笔记”，升级成一套真正适合工程师快速学习的“图文源码教材”。  
核心目标不是增加内容量，而是：  
在不降低技术深度和源码准确性的前提下，显著降低理解成本，让我快速建立正确的 Mental Model，并知道打开源码以后应该从哪里开始阅读。  
   
⸻  
   
## 1. 当前背景  
我正在学习 DeepSeek 官方开源项目：  
```
deepseek-ai/deepseek-harness
```
此前已经完成：  
1. 制定整套 DeepSeek Harness 源码学习计划；  
2. 根据学习计划制作第一讲教材；  
3. 第一讲主要采用 Markdown + 文字 + Mermaid；  
4. 第一讲包含详细讲解；  
5. 包含练习题；  
6. 包含参考答案；  
7. 我已经实际完成过第一遍学习。  
目前第一讲存在以下体验问题：  
* 技术笔记感较强；  
* 文字密度偏高；  
* 一些概念虽然能读懂，但很难快速形成直觉；  
* 部分 Mermaid 只是把文字换成方框和箭头；  
* 图更多承担“展示结构”的职责，而不是“帮助理解”；  
* 一些知识需要反复阅读；  
* 缺少统一视觉语言；  
* 部分内容过早进入源码细节；  
* 看懂局部以后仍然容易失去整体方向；  
* 缺少“为什么需要这个东西”的问题铺垫；  
* 缺少“直觉 → 技术 → 源码”的递进过程。  
因此：  
本次不是简单润色，也不是在旧教材中增加几张图片，而是完整重构 Lesson 01 的教学设计。  
   
⸻  
   
## 2. 当前已经安装的四个核心工具  
当前环境中以下四个工具已经安装并可使用：  
1. diagram-design  
2. Excalidraw MCP  
3. draw.io  
4. Playwright  
本次 Lesson 01 重构中：  
四个工具都必须实际使用。  
但是它们承担不同职责。  
禁止为了“全部用上”而重复画相同内容。  
   
⸻  
   
## 2.1 diagram-design：教材主要技术视觉工具  
diagram-design 是整套教材最主要的技术教学图工具。  
优先用于：  
* Concept Diagram  
* Architecture Overview  
* Component Relationship  
* Layer Diagram  
* Nested Structure  
* Source Map  
* Plugin Relationship  
* Dependency Concept  
* Data Flow  
* Comparison  
* Lifecycle  
* Process  
* Editorial Technical Infographic  
Lesson 01 中建议至少生成：  
**2～3 张真正有教学价值的图。**  
例如：  
* Model Only vs Model + Harness  
* Everything is a Plugin  
* Cordis Position  
* DeepSeek Harness Source Map  
具体内容根据当前源码和旧版 Lesson 01 决定。  
   
⸻  
   
## 2.2 Excalidraw MCP：直觉和比喻教学图  
Excalidraw 主要负责：  
把抽象概念变成容易记住的视觉直觉。  
优先用于：  
* 白板解释  
* 模块化智能工作室  
* “为什么需要 Harness”  
* 抽象概念的空间隐喻  
* 多角色协作  
* Before / After 思维模型  
* 手绘式教学示意图  
Lesson 01 至少生成：  
**1 张真正有教学价值的 Excalidraw 图。**  
推荐主题：  
模块化智能工作室  
可以把以下概念第一次放进同一个直觉世界：  
* Model  
* Harness  
* Cordis  
* Plugin  
* Tool  
* Skill  
* Session  
* Sandbox  
要求：  
* 不要只是矩形框 + 箭头；  
* 真正利用手绘、空间关系和视觉隐喻；  
* 保留 .excalidraw 可编辑源文件；  
* 同时导出 SVG 或 PNG 供 Markdown 使用。  
   
⸻  
   
## 2.3 draw.io：正式、严谨、长期维护的架构图  
draw.io 不负责“生动”。  
它负责：  
把已经建立的直觉重新映射成严谨的正式技术架构。  
Lesson 01 至少生成：  
**1 张 draw.io 正式技术图。**  
推荐选择：  
* DeepSeek Harness 第一层正式架构图；  
* Harness / Cordis / Plugin 第一层关系图；  
* Agent Runtime 第一层正式流程图。  
要求：  
* 只表现 Lesson 01 当前应该理解的层级；  
* 不要把整个 repo 所有细节塞进去；  
* 保留 .drawio；  
* 导出 .svg；  
* Markdown 引用 SVG；  
* .drawio 作为后续课程持续维护的正式架构源文件。  
后续 Lesson 02、03、04 可以逐步扩充这张架构图。  
   
⸻  
   
## 2.4 Playwright：视觉 QA 工具  
Playwright 在本任务中主要负责：  
检查最终读者真正看到的教材效果。  
它不是本次的业务自动化测试工具。  
必须用于：  
* 打开 diagram-design 输出；  
* 打开 Excalidraw 导出图；  
* 打开 draw.io 导出 SVG；  
* 检查 Mermaid 预览；  
* 检查最终 Lesson 01 页面；  
* 截图；  
* 进行视觉检查；  
* 根据截图修改；  
* 再次验证。  
重要视觉资产应执行：  
```
生成
↓
渲染
↓
打开
↓
截图
↓
视觉检查
↓
修正
↓
重新渲染
```
如果第一次已经很好：  
不需要为了流程而强行修改。  
但必须真正检查。  
   
⸻  
   
## 3. 四个工具的职责边界  
生成每一张图之前，首先回答：  
这张图到底帮助读者理解什么？  
然后再选择工具。  
统一规则如下。  
   
⸻  
   
## diagram-design  
主要回答：  
技术关系是什么？  
例如：  
* 谁包含谁；  
* 哪一层负责什么；  
* 一个概念和另一个概念如何连接；  
* 源码应该从哪里进入。  
   
⸻  
   
## Excalidraw  
主要回答：  
我应该怎样直觉地理解它？  
重点是：  
* 形象；  
* 空间；  
* 比喻；  
* 快速形成记忆。  
   
⸻  
   
## draw.io  
主要回答：  
把比喻全部拿掉后，真实架构应该怎样严谨表达？  
   
⸻  
   
## Playwright  
主要回答：  
最终读者实际看到以后，是否真的清楚？  
   
⸻  
   
## 4. Mermaid 的定位  
Mermaid 仍然允许使用。  
但不是主要视觉工具。  
Mermaid 优先用于：  
* Sequence  
* State  
* 简单调用链  
* 简单流程  
* 简单 dependency  
如果 Mermaid 只是：  
大量矩形 + 大量箭头  
则优先考虑 diagram-design。  
如果需要长期人工维护：  
考虑 draw.io。  
如果主要用于第一次建立直觉：  
使用 Excalidraw。  
   
⸻  
   
## 5. 源码事实原则  
所有教材内容必须以：  
当前 checkout 的 DeepSeek Harness 源码  
作为最终事实来源。  
不要仅凭模型记忆解释。  
主动检查：  
* README  
* docs  
* architecture  
* package structure  
* Cordis  
* Plugin  
* Service  
* Event  
* Context  
* Profile  
* Bundle  
* Model  
* Agent Loop  
* Tool  
* Skill  
* Session  
* Storage  
* Sandbox  
* Scheduling  
* UI  
以及 Lesson 01 实际涉及的源码。  
必须尽量确认：  
* 文件路径  
* package  
* symbol  
* interface  
* type  
* function  
* plugin  
* service  
* event  
* dependency  
* runtime relationship  
如果：  
官方 README / docs  
与：  
当前代码实现  
存在差异：  
明确指出。  
   
⸻  
   
## 5.1 不允许为了教学方便虚构  
可以：  
* 简化；  
* 分层；  
* 省略；  
* 使用比喻。  
但是：  
不允许画出错误的技术关系。  
如果某个比喻只对应真实机制的一部分：  
必须明确告诉读者：  
这里只用于建立第一层直觉，下面回到真实 DeepSeek Harness 实现。  
   
⸻  
   
## 6. 第一阶段：调查现有课程与源码  
不要立即修改 Lesson 01。  
先调查当前工作区。  
主动寻找：  
* DeepSeek Harness 源码仓库；  
* 原有学习计划；  
* 当前 Lesson 01；  
* exercises；  
* answers；  
* 已有 Mermaid；  
* 已有图片和 assets；  
* 当前教材目录结构；  
* STYLE_GUIDE；  
* AGENTS.md；  
* CLAUDE.md；  
* README；  
* docs；  
* architecture；  
* Cordis 相关源码；  
* Lesson 01 当前引用的源码。  
如果存在多个可能文件：  
根据：  
目录关系 + 学习计划 + 内容  
自行判断。  
只有确实无法从仓库判断的信息才询问我。  
不要让我重复提供已经存在于工作区中的信息。  
   
⸻  
   
## 6.1 旧版必须可追溯  
不要不可逆覆盖现有 Lesson 01。  
如果项目有 Git：  
通过 Git 保持修改可追踪。  
如果没有版本控制：  
先保存旧版。  
   
⸻  
   
## 7. 对旧版 Lesson 01 进行教学诊断  
调查以后，从：  
“第一次学习 DeepSeek Harness 的工程师是否容易理解”  
的角度进行诊断。  
不要把它当普通 Code Review。  
   
⸻  
   
## 7.1 信息结构  
检查：  
* 是否太早进入细节；  
* 是否缺少大问题；  
* 是否没有先建立整体地图；  
* 是否先给定义后解释；  
* 是否知识顺序不合理；  
* 是否一次引入太多术语。  
   
⸻  
   
## 7.2 文字  
识别：  
* 文字墙；  
* 抽象定义；  
* 重复解释；  
* 应该图解却继续写长文本的部分；  
* 应该举例却只有概念的部分；  
* 可以一句话讲清却写得很长的部分。  
   
⸻  
   
## 7.3 Mermaid  
逐张分类：  
**保留**  
Mermaid 本身就是最佳表达方式。  
**改为 diagram-design**  
需要更好的视觉层级和概念表达。  
**改为 Excalidraw**  
真正的问题是缺少直觉，而不是缺少流程。  
**升级为 draw.io**  
属于值得长期维护的正式架构。  
**删除**  
没有真正降低理解成本。  
   
⸻  
   
## 7.4 源码  
检查：  
* 是否源码出现过早；  
* 是否代码过长；  
* 是否缺少“为什么现在看这个文件”；  
* 是否没有告诉读者具体看哪里；  
* 是否没有明确哪些代码暂时可以跳过；  
* 是否代码与前面的 Mental Model 脱节。  
   
⸻  
   
## 7.5 Mental Model  
判断旧版 Lesson 01 是否足以让读者回答：  
1. Model 在系统中负责什么？  
2. Harness 为什么存在？  
3. Model 和 Harness 是什么关系？  
4. Everything is a Plugin 为什么重要？  
5. Cordis 为什么存在？  
6. Plugin / Service / Event / Context 第一层分别怎么理解？  
7. 一次 Agent Runtime 大致发生什么？  
8. 第一次打开源码应该从哪里开始？  
如果不能：  
明确指出原因。  
   
⸻  
   
## 7.6 习题  
检查：  
* 是否大部分只是记忆题；  
* 是否能检测真实理解；  
* 是否能检测源码定位能力；  
* 是否和 Lesson 01 的真正目标一致。  
   
⸻  
   
## 8. 整套课程统一教学方法  
后续所有 Lesson 默认遵循：  
```
真实问题
↓
直觉
↓
比喻
↓
视觉模型
↓
正式技术解释
↓
真实源码
↓
Runtime 行为
↓
源码阅读路线
↓
练习
```
不要以：  
```
定义
↓
定义
↓
API
↓
源码
↓
总结
```
作为主要教学方式。  
   
⸻  
   
## 8.1 新概念先解释“为什么”  
例如：  
不要第一句话就写：  
Cordis 是……  
而应该先建立问题：  
当 Harness 中存在大量可以组合、卸载并相互依赖的能力时，由谁负责组织这些模块？  
然后再自然引出 Cordis。  
   
⸻  
   
## 8.2 目标读者  
目标读者：  
* 有多年 Java / 后端开发经验；  
* 熟悉 Spring Boot；  
* 理解常见工程设计；  
* 有源码阅读能力；  
* 对 AI Agent Harness 不熟；  
* 对 TypeScript 项目架构可能不够熟悉；  
* 不需要从编程基础讲起。  
   
⸻  
   
## 8.3 使用后端工程知识搭桥  
可以适当使用：  
* Spring IoC  
* DI  
* Bean  
* ApplicationContext  
* Event  
* SPI  
* Registry  
* Middleware  
* Filter Chain  
* Lifecycle  
* Dependency Graph  
* ThreadLocal  
帮助建立直觉。  
每次重要类比都必须包含：  
**类似在哪里**  
以及：  
**不一样在哪里**  
禁止把：  
“类似 Spring”  
写成：  
“它就是 Spring”。  
   
⸻  
   
## 9. 整套课程统一的主比喻  
从 Lesson 01 开始建立长期统一的比喻体系：  
## 模块化智能工作室  
DeepSeek Harness 可以暂时想象成：  
一个可以不断安装、拆卸和组合不同能力的智能工作环境。  
   
⸻  
   
## Model  
工作室里的：  
大脑 / 决策者。  
   
⸻  
   
## Harness  
让这个大脑真正拥有行动能力的：  
完整工作环境。  
   
⸻  
   
## Cordis  
负责工作室内部：  
* 模块组织；  
* 生命周期；  
* 依赖；  
* 运行环境；  
的底层基础设施。  
实际边界必须根据源码校正。  
   
⸻  
   
## Plugin  
可以加入工作室的：  
功能模块。  
   
⸻  
   
## Service  
模块向其他模块提供的：  
能力接口。  
   
⸻  
   
## Event  
模块之间的：  
事件通知 / 广播机制。  
   
⸻  
   
## Context  
某个范围当前能够访问的：  
能力和环境。  
   
⸻  
   
## Tool  
Agent 真正用于完成动作的：  
工具。  
   
⸻  
   
## Skill  
完成某类任务的方法：  
使用手册 / SOP。  
   
⸻  
   
## Agent Loop  
不断进行：  
```
观察
↓
思考
↓
行动
↓
获取结果
↓
继续思考
```
的工作循环。  
   
⸻  
   
## Session Log  
工作过程的：  
黑匣子 / 运行记录。  
   
⸻  
   
## Profile  
预先配置好的：  
工作室方案。  
   
⸻  
   
## Bundle  
已经组合好的：  
一组能力模块。  
   
⸻  
   
## Sandbox  
用于隔离执行的：  
实验工作区。  
   
⸻  
   
## 9.1 比喻不能替代技术解释  
任何重要比喻之后必须紧跟：  
**映射回真实 DeepSeek Harness**  
或者：  
**把比喻拿掉**  
然后重新使用正式技术语言解释。  
目标：  
比喻负责进入概念，源码负责建立真实理解。  
   
⸻  
   
## 10. 建立统一视觉设计系统  
创建或升级：  
```
STYLE_GUIDE.md
```
它将作为：  
Lesson 01 ～后续所有课程的统一视觉规范。  
   
⸻  
   
## 10.1 总体风格  
目标：  
Modern Technical Textbook  
  
* Friendly Visual Explanation  
* Light Hand-drawn Teaching Layer  
整体要求：  
* 简洁；  
* 专业；  
* 易扫读；  
* 有视觉层次；  
* 有一点温度；  
* 保持工程师教材感。  
避免：  
* 企业宣传 PPT；  
* 科幻 HUD；  
* 赛博朋克；  
* 儿童绘本；  
* 3D UI；  
* 大面积渐变；  
* AI 营销海报风。  
   
⸻  
   
## 10.2 三类图允许有不同气质  
**diagram-design**  
现代 Editorial Technical Style。  
**Excalidraw**  
明显的轻量手绘教学风。  
**draw.io**  
最正式、最严谨、最克制。  
三者虽然表现不同，但必须共享：  
* semantic color；  
* 概念命名；  
* shape language；  
* 信息层级。  
   
⸻  
   
## 10.3 Semantic Color  
为以下概念建立固定语义颜色：  
* Model  
* Harness  
* Cordis  
* Plugin  
* Tool / External Capability  
* Context  
* Session / Data  
* Highlight  
* Muted  
* Warning  
原则：  
同一概念跨 Lesson 保持一致。  
   
⸻  
   
## 10.4 Shape Language  
长期保持核心对象视觉一致。  
例如：  
* Model 始终采用相似核心符号；  
* Plugin 始终表现出可插拔、模块化特征；  
* Tool 始终表达外部能力；  
* Session 始终体现记录 / timeline；  
* Cordis 始终体现底层协调与组织作用。  
   
⸻  
   
## 10.5 图中文字  
图中只放：  
* 关键词；  
* 短标签；  
* 非常短的说明。  
不要把 Markdown 正文塞进 SVG。  
长解释放在：  
* 图标题；  
* 图注；  
* 正文。  
   
⸻  
   
## 10.6 一张图只回答一个主要问题  
创建任何图之前都必须写清：  
Question：这张图帮助读者回答什么？  
如果不能明确回答：  
不要创建。  
   
⸻  
   
## 11. Lesson 01 Visual Plan  
在真正重写 Lesson 01 前：  
创建：  
```
lesson-01-visual-plan.md
```
每张图记录：  
* Figure ID  
* Title  
* Question  
* Teaching Goal  
* Visual Type  
* Tool  
* Why This Tool  
* Main Elements  
* Key Highlight  
* Source Accuracy Requirement  
* Source File  
* Export File  
* Markdown Insert Position  
* Visual QA Status  
   
⸻  
   
## 11.1 图片数量  
Lesson 01 最终建议：  
**6～8 张重要图。**  
其中推荐：  
* diagram-design：2～3 张  
* Excalidraw：1～2 张  
* draw.io：1 张  
* Mermaid：0～2 张  
不要因为装了四种工具就强行增加图片数量。  
   
⸻  
   
## 11.2 推荐视觉集合  
以下只是候选。  
必须根据真实源码和旧教材决定最终方案。  
**Figure 01 — Model Only vs Model + Harness**  
回答：  
为什么只有一个强大的 Model 仍然无法完成复杂 Agent 工作？  
工具：  
```
diagram-design
```
推荐：  
Comparison / Editorial Concept Diagram。  
   
⸻  
   
**Figure 02 — 模块化智能工作室**  
回答：  
我应该怎样在脑中直觉理解 Harness？  
工具：  
```
Excalidraw MCP
```
表现：  
* Model  
* Harness  
* Plugin  
* Tool  
* Skill  
* Session  
* Sandbox  
* Cordis  
要求是真正的空间比喻，不是普通架构图。  
   
⸻  
   
**Figure 03 — Everything is a Plugin**  
回答：  
Plugin-based composition 到底解决什么问题？  
工具：  
```
diagram-design
```
优先考虑：  
Before / After  
或者：  
Monolithic Runtime vs Plugin-based Harness。  
   
⸻  
   
**Figure 04 — DeepSeek Harness 正式第一层架构**  
回答：  
把所有比喻拿掉以后，真实第一层技术结构是什么？  
工具：  
```
draw.io
```
产物：  
* .drawio  
* .svg  
这张图以后作为课程正式架构源。  
   
⸻  
   
**Figure 05 — Cordis 为什么存在**  
回答：  
为什么 Harness 需要 Cordis？  
工具：  
```
diagram-design
```
本讲只建立第一层认知。  
不要展开完整内部机制。  
   
⸻  
   
**Figure 06 — 第一次打开源码应该看哪里**  
回答：  
Repo 这么多文件，我现在应该先看什么？  
工具：  
```
diagram-design
```
必须体现：  
* 必须看；  
* 知道存在即可；  
* 后面再深入。  
不要单纯复制目录树。  
   
⸻  
   
**Figure 07 — 一次 Agent Runtime 的旅程**  
回答：  
静态组件真正运行以后怎样协作？  
如果主要是顺序：  
使用 Mermaid。  
如果存在明显多层关系：  
使用 diagram-design。  
   
⸻  
   
**Figure 08 — 后续课程地图**  
可选。  
只有真正帮助理解：  
Lesson 01 学完以后为什么继续学 Cordis / Plugin / Tool / Session……  
才保留。  
   
⸻  
   
## 12. Lesson 01 内容重构原则  
Lesson 01 的真正任务是：  
建地图。  
不是：  
背 API。  
完成以后读者应该第一次打开 repo 就知道：  
* 自己站在哪里；  
* 哪些组件最重要；  
* 现在该看什么；  
* 什么暂时可以忽略。  
   
⸻  
   
## 12.1 推荐叙事主线  
可以采用：  
## Model 只有“大脑”，为什么还不能成为真正的 Agent？  
作为整讲核心问题。  
具体标题可以根据已有学习计划优化。  
   
⸻  
   
## 12.2 开场从真实问题开始  
假设只有一个 LLM。  
它怎样：  
* 看文件？  
* 修改代码？  
* 执行 shell？  
* 使用 Tool？  
* 使用 Skill？  
* 保存 Session？  
* 在 Sandbox 中执行？  
* 持续完成多步骤任务？  
让读者首先意识到：  
Model ≠ 完整 Agent Runtime。  
然后再引出 Harness。  
   
⸻  
   
## 12.3 先图后定义  
Figure 01 应该在非常靠前的位置出现。  
目标：  
读者在 30 秒内获得：  
Model 和 Harness 的第一层区别。  
之后才正式定义。  
   
⸻  
   
## 12.4 再进入模块化智能工作室  
使用 Excalidraw Figure 02。  
先帮助建立直觉。  
但紧接着必须进入：  
**把工作室比喻拿掉**  
重新正式解释：  
* Model  
* Harness  
* Cordis  
* Plugin  
   
⸻  
   
## 12.5 Everything is a Plugin 先讲问题  
不要第一句：  
Plugin 是……  
先解释：  
如果：  
* Tool；  
* Storage；  
* Session；  
* Sandbox；  
* UI；  
* Model；  
全部写死在一个 Runtime 里，会产生什么问题？  
然后再展示 Figure 03。  
   
⸻  
   
## 12.6 正式架构图出现时机  
完成前面的直觉以后：  
再展示 draw.io Figure 04。  
这时明确告诉读者：  
前面是为了建立直觉，现在把所有比喻拿掉，看真实技术地图。  
   
⸻  
   
## 12.7 Cordis 只建立第一层认知  
Lesson 01 只回答：  
1. 为什么需要 Cordis？  
2. 它大概位于哪里？  
3. 它承担什么类型的职责？  
4. 它不是什么？  
5. 为什么后面值得单独深入？  
不要在第一讲塞入完整 Cordis 内部机制。  
   
⸻  
   
## 12.8 源码之前先给 Source Map  
禁止突然进入：  
```
export interface ...
```
在大量源码之前：  
先展示 Figure 06。  
让读者知道：  
为什么现在打开这个文件。  
   
⸻  
   
## 13. 源码讲解规范  
源码教材依然要真正读代码。  
但不要大段复制。  
   
⸻  
   
## 13.1 代码长度  
普通片段：  
5～25 行。  
超过约 30 行：  
必须确认确实有教学价值。  
   
⸻  
   
## 13.2 每段源码固定采用以下结构  
**为什么现在看它？**  
解释这段代码在 Mental Model 中的位置。  
**精简源码**  
只保留必要部分。  
**看哪几个地方？**  
控制在：  
2～4 个重点。  
**运行时发生什么？**  
用人话解释。  
**和前面的图如何对应？**  
重新连接视觉模型。  
**现在需要记住什么？**  
一句话收尾。  
   
⸻  
   
## 13.3 源码引用要具体  
尽量给出：  
* 文件路径；  
* package；  
* symbol；  
* class / interface / function / type。  
避免：  
“源码里可以看到……”  
   
⸻  
   
## 13.4 Source Reading Route  
Lesson 01 必须有独立章节：  
## Source Reading Route  
根据真实 repo 给出类似：  
```
README / Architecture
↓
Harness 入口
↓
Cordis 入口
↓
一个简单 Plugin
↓
Runtime / Agent 入口
```
实际路线以源码为准。  
每一个节点标记：  
* 必须读；  
* 浏览即可；  
* 暂时跳过。  
并解释为什么。  
   
⸻  
   
## 14. 学习体验设计  
   
⸻  
   
## 14.1 一句话记忆  
重要概念可以增加：  
一句话记忆  
但不要滥用。  
   
⸻  
   
## 14.2 Spring 类比框  
适当使用：  
**如果你熟悉 Spring，可以先这样理解**  
然后一定跟：  
**但这里和 Spring 不一样**  
防止错误迁移。  
   
⸻  
   
## 14.3 易错认知  
根据实际源码增加：  
**⚠ 容易理解错**  
例如可能包括：  
* Harness ≠ Model  
* Harness ≠ Cordis  
* Plugin ≠ IDE Plugin  
* Tool ≠ Skill  
* Context ≠ Session  
* Service ≠ Plugin  
实际结论必须通过源码确认。  
   
⸻  
   
## 14.4 认知负担分层  
适当标记：  
**现在必须懂**  
**目前知道存在即可**  
**后面专门学习**  
让读者知道哪些东西现在无需强记。  
   
⸻  
   
## 14.5 正文密度  
普通自然段控制在：  
2～5 句。  
推荐阅读节奏：  
```
问题
↓
短文字
↓
图
↓
正式解释
↓
源码
↓
一句话总结
```
不要连续出现大量文字墙。  
   
⸻  
   
## 14.6 不要 PPT 化  
教材仍然应该可连续阅读。  
不要整篇全部变成 Bullet List。  
   
⸻  
   
## 14.7 不要博客化  
避免：  
* 长故事；  
* 情绪化开场；  
* 无关历史；  
* 营销式语言。  
核心目标：  
快速理解源码设计。  
   
⸻  
   
## 15. Exercises 与 Mental Model Check  
旧版中有价值的习题应保留。  
同时重新组织为：  
   
⸻  
   
## 理解题  
例如：  
为什么只有 Model 还不足以完成类似 Codex 的复杂任务？  
   
⸻  
   
## 机制题  
例如：  
Plugin-based composition 为什么有价值？  
   
⸻  
   
## 源码定位题  
例如：  
如果想知道某项能力由哪里提供，应该如何开始定位？  
   
⸻  
   
## 图解题  
给出部分 Mental Model：  
让学习者补全。  
   
⸻  
   
## 预测题  
例如：  
如果移除某类 Plugin，根据当前架构预计会怎样？  
   
⸻  
   
## 对比题  
例如：  
Cordis 某种机制和 Spring IoC 哪些地方相似，哪些不同？  
   
⸻  
   
## 15.1 Exercises 与 Answers 分离  
优先保持：  
```
exercises.md
answers.md
```
```

```
如果当前课程已有自己的规范：  
沿用现有方式。  
答案不要只写：  
A / B / C。  
必须简洁解释：  
为什么。  
   
⸻  
   
## 15.2 Lesson 01 最终 Mental Model Check  
Lesson 结尾加入：  
## Mental Model Check  
读者不查看教材时，应能够回答：  
1. Model 在 Agent 系统中负责什么？  
2. Harness 为什么存在？  
3. Model + Harness 的关系是什么？  
4. Everything is a Plugin 主要解决什么问题？  
5. Cordis 为什么重要？  
6. Plugin / Service / Event / Context 第一层怎么理解？  
7. Tool 和 Skill 有什么区别？  
8. 一次 Agent Runtime 大致怎么流动？  
9. 第一次打开 DeepSeek Harness repo 应该从哪里开始？  
如果当前 Lesson 无法让读者回答这些问题：  
继续修改。  
   
⸻  
   
## 16. Visual QA  
所有重要图生成完成后：  
必须使用 Playwright。  
   
⸻  
   
## 16.1 独立资产检查  
分别检查：  
* diagram-design 输出；  
* Excalidraw export；  
* draw.io SVG；  
* Mermaid Preview。  
   
⸻  
   
## 16.2 检查项目  
**Layout**  
* 是否元素重叠；  
* 是否过度拥挤；  
* 是否有巨大无意义空白；  
* 是否视觉平衡。  
**Text**  
* 中文是否正常；  
* 字体是否过小；  
* 是否溢出；  
* 是否文字太多。  
**Arrow**  
* 是否穿过文字；  
* 是否穿过节点；  
* 是否方向难理解。  
**Hierarchy**  
* 第一眼是否知道重点；  
* 次要元素是否抢视觉；  
* 是否颜色过多。  
**Consistency**  
* Model 是否跨图一致；  
* Plugin 是否跨图一致；  
* Cordis 是否一致；  
* Tool 是否一致；  
* Semantic Color 是否一致。  
   
⸻  
   
## 16.3 教学型 Visual QA  
每张图额外执行：  
**3 秒测试**  
第一次看到：  
能否知道图在讲什么？  
**10 秒测试**  
能否知道最重要的关系？  
**30 秒测试**  
能否解释这张图想帮助理解的核心概念？  
如果不能：  
简化或重做。  
   
⸻  
   
## 16.4 最终 Lesson Preview  
全部完成后：  
使用 Playwright 实际预览最终 Lesson 01。  
至少检查：  
* 开头；  
* 模块化工作室部分；  
* 正式架构图；  
* Source Map；  
* Runtime Flow；  
* Mental Model Check。  
确认：  
* Markdown 图片路径正常；  
* SVG 正常；  
* Mermaid 正常；  
* 代码块正常；  
* 图注正常；  
* 正文与图片节奏合理。  
   
⸻  
   
## 17. Visual Asset 文件管理  
根据项目原有目录适配。  
推荐形式：  
```
assets/
├── common/
│   └── ...
│
└── lesson-01/
    ├── fig-01-model-vs-harness.svg
    ├── fig-02-modular-workshop.excalidraw
    ├── fig-02-modular-workshop.svg
    ├── fig-03-everything-is-plugin.svg
    ├── fig-04-harness-architecture.drawio
    ├── fig-04-harness-architecture.svg
    ├── fig-05-cordis-position.svg
    ├── fig-06-source-map.svg
    └── ...
```
如果当前项目已经有视觉资产规范：  
优先遵循现有结构。  
   
⸻  
   
## 17.1 可编辑源文件必须保留  
Excalidraw：  
* .excalidraw  
* export  
draw.io：  
* .drawio  
* .svg  
diagram-design：  
保留后续可重新修改或生成所需的源。  
不要最终只留下 PNG。  
   
⸻  
   
## 17.2 技术图优先 SVG  
技术教材中：  
优先使用 SVG。  
只有确实需要栅格图时：  
再使用 PNG。  
   
⸻  
   
## 18. Source Accuracy QA  
Lesson 01 完成后：  
重新读取当前源码。  
不要只依赖最初分析。  
逐项检查：  
* path  
* symbol  
* interface  
* type  
* function  
* plugin  
* service  
* event  
* context  
* dependency  
* runtime relationship  
如果教材与当前代码冲突：  
修改教材。  
   
⸻  
   
## 18.1 图也属于源码事实  
检查视觉资产中的：  
* 名称；  
* 箭头；  
* dependency；  
* layer；  
* component；  
是否与真实代码一致。  
允许省略。  
不允许画错。  
   
⸻  
   
## 19. Teaching QA  
最终完整阅读一次 Lesson 01。  
假设自己是：  
第一次接触 DeepSeek Harness 的 Java 后端工程师。  
检查：  
* 是否突然出现未解释术语；  
* 是否存在知识倒置；  
* 是否某张图必须看大量正文才能理解；  
* 是否源码出现过早；  
* 是否加入太多当前不需要的实现细节；  
* 是否比喻反客为主；  
* 是否 Spring 类比造成错误认知；  
* 是否读完仍不知道下一步去哪看源码。  
发现问题：  
继续修正。  
   
⸻  
   
## 20. Lesson 01 的内容边界  
Lesson 01 不要试图讲完：  
* Cordis 深层实现；  
* Plugin 完整 Lifecycle；  
* Service Resolution；  
* Event Internals；  
* Context Internals；  
* Scheduling；  
* Session 完整实现；  
* Storage 内部细节；  
* Sandbox 内部细节。  
如果后续学习计划已有对应课程：  
告诉读者：  
现在只需要理解到这一层。  
   
⸻  
   
## 21. 不要修改后续 Lesson  
本次只完整重构：  
Lesson 01。  
可以给出：  
Lesson 02 应如何继承本次教学和视觉规范。  
但是：  
不要直接重写 Lesson 02 以后内容。  
Lesson 01 是后续课程的样板。  
   
⸻  
   
## 22. 实施流程  
本任务按以下阶段完整执行。  
除非遇到真正无法从当前仓库判断的问题：  
不需要在每个阶段等待人工确认。  
   
⸻  
   
## Phase 1 — Repo & Course Investigation  
调查：  
* 源码；  
* 学习计划；  
* Lesson 01；  
* Exercises；  
* Answers；  
* Visual Assets；  
* Docs；  
* Architecture。  
   
⸻  
   
## Phase 2 — Existing Lesson Diagnosis  
诊断：  
* 信息结构；  
* 文字；  
* Mermaid；  
* 源码顺序；  
* Mental Model；  
* Exercises。  
   
⸻  
   
## Phase 3 — Visual Design System  
创建或升级：  
```
STYLE_GUIDE.md
```
创建：  
```
lesson-01-visual-plan.md
```
   
⸻  
   
## Phase 4 — Lesson Structure Redesign  
重新规划 Lesson 01 教学顺序。  
确保主要叙事遵循：  
```
问题
↓
直觉
↓
比喻
↓
视觉模型
↓
正式解释
↓
源码
↓
运行
↓
练习
```
   
⸻  
   
## Phase 5 — Lesson Rewrite  
完整重构 Lesson 01。  
不要只做 Patch 式小修。  
   
⸻  
   
## Phase 6 — diagram-design Production  
生成：  
至少 2 张真正进入教材的 diagram-design 图。  
   
⸻  
   
## Phase 7 — Excalidraw Production  
生成：  
至少 1 张真正进入教材的直觉 / 比喻图。  
保留：  
```
.excalidraw
```
以及导出版本。  
   
⸻  
   
## Phase 8 — draw.io Production  
生成：  
至少 1 张正式长期维护架构图。  
保留：  
```
.drawio
```
以及：  
```
.svg
```
   
⸻  
   
## Phase 9 — Mermaid Review  
对旧 Mermaid：  
保留 / 修改 / 删除 / 替换。  
只保留真正适合 Mermaid 的内容。  
   
⸻  
   
## Phase 10 — Visual QA  
使用 Playwright：  
实际打开所有最终视觉资产并截图检查。  
根据结果修正。  
   
⸻  
   
## Phase 11 — Final Lesson Preview  
使用 Playwright：  
浏览完整 Lesson 01。  
检查最终阅读体验。  
   
⸻  
   
## Phase 12 — Source Accuracy QA  
重新校验所有源码事实。  
   
⸻  
   
## Phase 13 — Teaching QA  
重新从第一次学习者角度阅读整讲。  
   
⸻  
   
## Phase 14 — Exercises & Answers  
优化：  
Exercises  
和：  
Answers。  
   
⸻  
   
## Phase 15 — Final Report  
整理最终重构报告。  
   
⸻  
   
## 23. 最终交付物  
最终至少包含：  
1. Lesson 01 教学诊断；  
2. STYLE_GUIDE.md；  
3. lesson-01-visual-plan.md；  
4. 完整重构后的 Lesson 01；  
5. diagram-design visual assets；  
6. Excalidraw .excalidraw + export；  
7. draw.io .drawio + .svg；  
8. 最终保留的 Mermaid；  
9. Exercises；  
10. Answers；  
11. Source Reading Route；  
12. Mental Model Check；  
13. Visual QA Report；  
14. Source Accuracy QA Report；  
15. Lesson 02 延续建议。  
   
⸻  
   
## 24. 最终报告必须说明四个工具实际做了什么  
不要只说：  
工具可用。  
明确列出：  
**diagram-design**  
实际生成了哪些图，以及为什么选择 diagram-design。  
**Excalidraw MCP**  
实际生成了哪张直觉图，以及为什么使用手绘比喻。  
**draw.io**  
哪张图成为长期维护的正式架构源，以及后续如何扩展。  
**Playwright**  
实际检查了哪些资产；  
发现了什么视觉问题；  
修改了什么。  
   
⸻  
   
## 25. 最终验收标准  
## 30 秒  
只看开篇：  
是否理解：  
Model 和 Harness 为什么不是一回事？  
   
⸻  
   
## 3 分钟  
快速浏览：  
是否知道：  
DeepSeek Harness 大概解决什么问题？  
   
⸻  
   
## 10 分钟  
是否理解：  
Everything is a Plugin 为什么重要？  
   
⸻  
   
## 学完整讲  
脑中是否已经形成：  
* Model  
* Harness  
* Cordis  
* Plugin  
* Service  
* Event  
* Context  
* Tool  
* Skill  
* Session  
* Sandbox  
之间的第一层地图？  
   
⸻  
   
## 打开源码  
是否从：  
“文件很多，不知道从哪里开始”  
变成：  
“我知道目前先看哪些入口，其他以后再深入。”  
   
⸻  
   
## 26. 最重要的质量原则  
如果一段内容：  
很专业，  
但现在缺少理解它的上下文：  
后移。  
如果一个概念：  
很抽象：  
先建立准确直觉。  
如果一张图：  
漂亮但没有降低理解成本：  
删除。  
如果 Excalidraw：  
很有趣但技术映射不准确：  
修改。  
如果 draw.io：  
非常完整但第一讲看不懂：  
降低层级。  
如果 diagram-design：  
一张图塞了太多节点：  
拆图。  
如果 Mermaid：  
只是把文字换成矩形：  
删除或重做。  
如果一段源码：  
很重要但当前还不应该深入：  
指出位置，并告诉读者后续哪一讲再学习。  
   
⸻  
   
## 27. 本次最终目标  
第一讲结束以后：  
我不需要记住大量 API。  
真正需要得到的是：  
一张稳定、准确、能够继续向下深入的 DeepSeek Harness 心智地图。  
后续学习：  
* Cordis  
* Plugin  
* Service  
* Event  
* Context  
* Agent Loop  
* Tool  
* Skill  
* Session  
* Sandbox  
都应该是在这张地图上不断“放大”。  
而不是每一讲重新学习一个互不相关的新概念。  
   
⸻  
   
## 28. 现在开始执行  
从：  
## Phase 1 — Repo & Course Investigation  
开始。  
首先定位：  
* 学习计划；  
* 当前 Lesson 01；  
* Exercises；  
* Answers；  
* Visual Assets；  
* DeepSeek Harness 当前源码。  
然后依次完成：  
Phase 1 → Phase 15。  
本次不要批量修改 Lesson 02 以后内容。  
以下四个已经安装的工具必须全部实际参与 Lesson 01：  
* diagram-design  
* Excalidraw MCP  
* draw.io  
* Playwright  
完成后给出：  
* 所有新增文件；  
* 所有修改文件；  
* 所有视觉资产；  
* 四个工具的实际使用情况；  
* Visual QA 结果；  
* Source Accuracy QA 结果。  
