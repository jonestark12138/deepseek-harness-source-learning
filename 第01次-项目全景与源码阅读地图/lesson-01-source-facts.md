# Lesson 01 Source Fact Matrix

> Upstream commit：`cd5ef8148158c3a752a658978873241fdf8e2bbc`
> Confidence：`Confirmed` 表示当前源码或维护文档直接支持；`Teaching inference` 表示为了教学组织而归纳，不是源码定义。

| Claim ID | Claim | Exact evidence | Evidence type | Confidence | Teaching simplification | Boundary / uncertainty |
|---|---|---|---|---|---|---|
| L01-C01 | Model 调用能力与 Tool、Session、Agent Loop 等职责由不同 package 所有，Model 本身不是完整 Harness | [`packages/llm/llm/README.md`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/packages/llm/llm/README.md)；[`docs/architecture.md#core-packages`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/docs/architecture.md#core-packages) | Package docs + architecture | Confirmed | “Model 是大脑”只表达推理/生成中心 | 不把 provider-neutral LLM service 等同于某个具体模型 |
| L01-C02 | DeepSeek Harness 的 model adapter、tool registry、session log、agent loop 本身都是 Cordis 插件 | [`docs/architecture.md#cordis`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/docs/architecture.md#cordis) | Maintained architecture | Confirmed | “核心也是插件” | 插件化不意味着所有模块可无约束互换 |
| L01-C03 | Cordis 插件向共享 Context 贡献 services、typed events 和 reversible effects；依赖可通过 `inject` 等待 service | [`docs/cordis-primer.md#cordis-in-five-ideas`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/docs/cordis-primer.md#cordis-in-five-ideas) | Maintained framework primer | Confirmed | “模块轨道与能力登记” | Cordis 不是 OS、容器或 Sandbox |
| L01-C04 | `dsh-llm` 是 provider-neutral model-call service，拥有共享消息/流式词汇和 adapter seam | [`packages/llm/llm/README.md#summary`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/packages/llm/llm/README.md#summary) | Package contract | Confirmed | 图中统一称为 Model/LLM 能力 | 具体 provider wire logic 位于 adapters，不在该 service 内 |
| L01-C05 | `dsh-tools` 拥有模型可见工具注册与 guarded execution pipeline | [`packages/core/tools/README.md#summary`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/packages/core/tools/README.md#summary) | Package contract | Confirmed | Tool 是动作端口 | 看到工具 schema 不等于调用一定获准或安全完成 |
| L01-C06 | `dsh-agent` 拥有 Agent handle、live registry 与 `agent/*` 事件；具体创建和驱动由 `dsh-agent-loop` 提供 | [`packages/core/agent/README.md#summary`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/packages/core/agent/README.md#summary) | Package contract | Confirmed | “Agentic System ≈ Model + Harness”只作开场近似 | 不能把源码 `Agent` 接口直接定义为 Model + Harness |
| L01-C07 | Session 是 append-only 事件日志，模型历史由日志派生；持久化是独立关注点 | [`packages/core/session/README.md#summary`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/packages/core/session/README.md#summary) | Package contract | Confirmed | Session 比喻为工作日志/黑匣子 | 不是简单聊天消息数组，也不等于持久化后端 |
| L01-C08 | Skill 是 provider 提供的可复用指令；registry 合并 catalog，consumer 提供 session catalog 与 model-facing loader tool | [`packages/skill/README.md#summary`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/packages/skill/README.md#summary) | Package group contract | Confirmed | Skill 比喻为说明书/SOP | Skill 本身不是执行能力；加载 Skill 依赖 registry/provider/consumer 组合 |
| L01-C09 | Sandbox group 对 subprocess 执行施加文件影响策略，并支持平台后端和授权升级 | [`packages/sandbox/README.md#summary`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/packages/sandbox/README.md#summary) | Package group contract | Confirmed | Sandbox 是受控执行区 | 同一世界 confinement 不等于容器、microVM 或远程执行器 |
| L01-C10 | 完整 capability seam 包括 Service Definition、Provider、Consumer；Service Definition 不只是 TypeScript interface | [`docs/glossary.md#capability-seam`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/docs/glossary.md#capability-seam) | Maintained glossary | Confirmed | 第一讲只展示“能力定义/实现/使用者”三角 | 完整源码与替换语义后续课程展开 |
| L01-C11 | 运行中的 `dsh` 是按有序 layers 在 boot 时组成的 plugin tree | [`docs/architecture.md#profiles-and-bundles`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/docs/architecture.md#profiles-and-bundles) | Architecture + configuration | Confirmed | “按方案装配工作室” | patch 应用顺序不等于插件激活顺序 |
| L01-C12 | CLI profile 路径从 `parseDshArgs()` 进入 `runProfile()`；`composeProfile()`/`allPatches()` 组合 layers；`runProfile()` 调用 `boot()` | [`apps/cli/src/bin.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/apps/cli/src/bin.ts)；[`apps/cli/src/profile-boot.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/apps/cli/src/profile-boot.ts) | Implementation | Confirmed | 第一讲压缩为 `bin -> profile -> bundle -> boot` | 不在第一讲继续追 Loader/Fiber 内部 |
| L01-C13 | 一个 step 包含一次模型请求及其工具调用；一个 turn 包含零个或多个 step | [`docs/architecture.md#turn-flow`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/docs/architecture.md#turn-flow) | Maintained architecture | Confirmed | Runtime 图只展示输入、请求、工具、记录、继续 | 不展开 waterfall、retry、continuation 和 durable event 细节 |
| L01-C14 | “只有 Model 不能独立完成文件访问、命令执行、持续状态和安全策略”是对 package 职责分离的教学归纳 | L01-C01、L01-C05、L01-C07、L01-C09 | Cross-evidence inference | Teaching inference | 用 Model Only vs Model + Harness 建立第一直觉 | 不是上游源码中的正式等式或类型定义 |

## Configuration evidence for “core is plugin”

[`packages/bundle/base/cordis.patch.yml`](https://github.com/deepseek-ai/deepseek-harness/blob/cd5ef8148158c3a752a658978873241fdf8e2bbc/packages/bundle/base/cordis.patch.yml) 在当前提交中声明了这些核心行：

| id | 当前快照行号 | 本讲允许得出的结论 |
|---|---:|---|
| `llm` | 27 | base bundle 声明挂载 LLM 相关插件行 |
| `session` | 33 | Session 通过配置进入组合 |
| `agent` | 67 | Agent registry/接口能力通过配置进入组合 |
| `tools` | 474 | Tools registry/pipeline 通过配置进入组合 |
| `system-prompt` | 479 | Prompt 组装不是 Agent Loop 内部的固定代码 |
| `agent-loop` | 486 | 默认 driver 本身也是可组合插件 |

这些行不能单独证明真实激活顺序、依赖已经满足、插件加载成功或内部算法已经理解。
