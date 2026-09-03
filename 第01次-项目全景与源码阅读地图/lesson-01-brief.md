# Lesson 01 Brief — 从“只有大脑”到可工作的 Agentic System

## Audience state

- 已掌握：Java/Spring Boot、常见后端分层、IoC/DI、事件、接口与实现、基本源码阅读。
- 尚未掌握：Agent Harness、Cordis、TypeScript monorepo 中的插件组合方式。
- 最可能的误解：把 Harness、Agent 和 Agent Loop 当成同一个东西；把 Cordis 当成普通全局容器；把 Skill 当成 Tool。

## Driving question

一个只会理解、推理和生成的 Model，怎样被组织成能够连接真实环境、保存过程并持续完成多步骤工作的 Agentic System？

## Completion outcome

不看教材时，学习者能够：

1. 用自己的话区分 Model、Harness、源码中的 Agent 与 Agent Loop。
2. 解释“Everything is a Plugin”为什么不仅指第三方扩展，并说出至少四个插件化核心能力。
3. 从 `apps/cli/src/bin.ts` 沿 profile、bundle 走到 `boot()`，同时知道哪些内部机制暂时不追。

## Source baseline

- Upstream commit：`cd5ef8148158c3a752a658978873241fdf8e2bbc`
- 架构依据：`docs/architecture.md`、`docs/cordis-primer.md`、`docs/glossary.md`
- Primary source route：`apps/cli/src/bin.ts` -> `apps/cli/src/profile-boot.ts` -> `packages/bundle/base/cordis.patch.yml` -> `boot()`
- Secondary evidence：核心 package README、base bundle 配置行、现有 Lesson 01 的源码定位实验

## Concept budget

### 现在必须懂

- Model 负责模型调用中的理解、推理与生成，不等于完整 Agentic System。
- Harness 负责组合上下文、能力、状态、策略和后续步骤。
- DeepSeek Harness 的核心能力本身也通过 Cordis 插件组合。
- 第一次源码阅读应从入口与组装开始，不应从 Agent Loop 内部开始。

### 知道存在即可

- Cordis Context、Service、Event、reversible effect。
- Tool、Skill、Session、Sandbox 的第一层职责差异。
- profile、bundle、patch 的组合关系。
- 源码中的 `Agent` handle 与默认 `Agent Loop` 是分离的。

### 后续深入

- Cordis Fiber、完整插件生命周期与依赖激活。
- Service Definition / Provider / Consumer 的完整实现。
- 事件 dispatch modes。
- Agent Loop turn/step 状态机。
- Session 投影、持久化、压缩与恢复。
- 工具审批、安全策略和 Sandbox 后端。

## Main metaphor

- 比喻：模块化智能工作室。
- Model：工作室里的推理与决策核心。
- Harness：让核心能够接触材料、使用设备、记录过程并持续工作的整套工作安排。
- Cordis：工作室的模块安装轨道、能力登记、依赖激活和生命周期管理机制。
- Plugin：能够被挂载并贡献能力的模块。
- Tool：真正执行动作的设备或动作端口。
- Skill：告诉核心如何完成某类任务的说明书/SOP。
- Session：不断追加的工作日志，而不是只有聊天气泡。
- Sandbox：限制动作发生范围的受控执行区。
- 比喻边界：Cordis 不是操作系统，Plugin 不等于物理机器，Service 也不是普通 Java interface；正式章节必须回到真实 Context、service key、配置行和 package。

## Candidate figures

| Figure ID | Question | Tool | Claim IDs | Decision |
|---|---|---|---|---|
| L01-F01 | 为什么只有 Model 仍不足以完成真实任务？ | diagram-design | L01-C01, L01-C04, L01-C05 | 接受，改造现有 HTML/SVG |
| L01-F02 | 怎样用一个空间模型记住 Harness 的主要角色？ | Excalidraw | L01-C02, L01-C03, L01-C06–C10 | 接受 |
| L01-F03 | “核心也是插件”解决了什么结构问题？ | diagram-design | L01-C02, L01-C03, L01-C11 | 接受 |
| L01-F04 | 把比喻拿掉后，第一层正式架构是什么？ | draw.io | L01-C02–C12 | 接受，作为后续课程母图 |
| L01-F05 | 第一次打开仓库应该先看什么？ | diagram-design | L01-C11, L01-C12 | 接受 |
| L01-F06 | 静态组件运行后怎样完成一个 step？ | Mermaid | L01-C13 | 接受，只保留一个简化 sequence |
| L01-F07 | Cordis 为什么存在？ | diagram-design | L01-C03 | 合并进 F03/F04，拒绝独立成图 |
| L01-F08 | 完成检查 | Mermaid | — | 删除，清单比图更清楚 |

## Source reading route

```text
必须读：docs/architecture.md 的 Cordis、Profiles and bundles、Core packages
  -> 必须读：apps/cli/src/bin.ts 的 profile 分支
  -> 必须读：profile-boot.ts 的 composeProfile / allPatches / runProfile
  -> 浏览即可：bundle/base/cordis.patch.yml 的六个核心 id
  -> 在 boot() 停下
  -> 后续深入：Cordis Loader/Fiber、Agent Loop、Session、Tools
```

## Exercises

- 解释题：为什么更强的 Model 仍不能替代 Harness？
- 机制题：为什么把 Session、Tools、LLM 和 Agent Loop 都做成插件？
- 源码定位题：从 CLI 找到最终 `boot()` 调用和 base bundle 六个核心 id。
- 预测题：移除或替换某个 provider 时，哪些消费方理论上应保持稳定？
- 图解题：补全工作室图中 Tool、Skill、Session 的职责。
- 对比题：Cordis Context 与 Spring ApplicationContext 哪些相似、哪些不同？
- 结论校准题：改写“Model 直接调用文件系统”和“YAML 后写的插件最后启动”。

## Acceptance checks

- 30 秒：只看 F01 能说出 Model 负责生成、Harness 负责连接和持续工作。
- 3 分钟：浏览 F01–F05 能复述工作室比喻、插件化和源码路线。
- Closed-book：能区分 Tool/Skill、Context/Session、Agent/Agent Loop。
- Source navigation：能在两分钟内定位 `bin.ts`、`runProfile()`、`allPatches()`、base bundle 和 `boot()`。
- Visual QA：六张图均通过桌面与窄屏检查；SVG 无远程依赖。
- Source QA：所有核心关系可追溯到 Source Fact Matrix；所有比喻标注边界。
