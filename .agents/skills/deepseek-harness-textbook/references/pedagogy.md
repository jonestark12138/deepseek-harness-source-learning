# Metaphor-led source teaching

## Start from friction, not definitions

Open with a real engineering problem that makes the missing abstraction necessary. A reader should first feel why the concept exists, then receive its name.

Poor sequence:

```text
definition -> API -> source -> summary
```

Preferred sequence:

```text
problem -> intuitive contrast -> metaphor -> visual -> formal model -> source evidence
```

## The metaphor contract

Every substantial metaphor has four parts:

1. **Question** — which confusion it removes.
2. **Mapping** — which metaphor object maps to which real concept.
3. **Return to reality** — restate the relationship without metaphor.
4. **Break point** — explain where the metaphor becomes misleading.

Do not let a metaphor introduce ownership, dependency, data flow, or lifecycle that the source does not support.

For the recurring “modular intelligent workshop” metaphor:

- Model: reasoning and generation center, not the whole workshop.
- Harness: the operating arrangement that connects context, capabilities, policy, state, and continuation.
- Cordis: plugin context, dependency activation, lifecycle, services, events, and reversible effects; not the operating system or sandbox.
- Plugin: a mounted contribution, not merely a downloadable IDE extension.
- Tool: a model-facing action definition and guarded execution path.
- Skill: reusable instructions discovered from providers and loaded through a catalog/tool; not executable capability by itself.
- Session: append-only event history and derived model-visible record; persistence is provided separately, not guaranteed by the notebook metaphor.
- Sandbox: process confinement or an execution capability seam, not a synonym for workspace.

## Use the reader's backend knowledge

Useful bridges include IoC, DI, ApplicationContext, lifecycle callbacks, event buses, SPI, registries, middleware, filter chains, request scope, event sourcing, and capability providers.

Use a two-column comparison when a bridge matters:

| Similarity | Difference |
|---|---|
| The familiar concept that gives a first foothold | The DeepSeek Harness behavior that must not be collapsed into the analogy |

Never write “Cordis is Spring” or “Service is an interface.” Name the actual source construct after the analogy.

## Control cognitive load

For each concept, choose one level:

- **现在必须懂**: required to answer the lesson's driving question.
- **知道存在即可**: needed to keep the map honest, but implementation can wait.
- **后续深入**: intentionally deferred, with the later lesson named when known.

Do not introduce more than five to seven new primary concepts in one uninterrupted section. Use short paragraphs, whitespace, captions, and visual pauses; do not turn the entire lesson into bullets or slides.

## Chinese-first terminology

At first use: Chinese name + English spelling + one plain-language sentence. Introduce the object before the technical definition, then return to the exact source symbol. Keep English package/API names in source-navigation blocks, not as unexplained figure labels. Add each new core term to `05-术语与比喻词典.md` with its object, actual responsibility, Java bridge when useful, misconception and source evidence. Do not make the reader study a long glossary before the opening scene.

Prefer one running story (a workshop diagnosing a failed test) over unrelated glass-room, railway and airport metaphors in one lesson. When the source-reading map uses a path, say it is reading order, not program execution.

## Source excerpt pattern

Use short excerpts, usually 5–25 lines. Surround each excerpt with:

1. 为什么现在看它？
2. 精简源码。
3. 看哪 2–4 个地方？
4. 运行时发生什么？
5. 和前面的图如何对应？
6. 现在记住什么？

If an implementation is important but premature, show its location and defer it instead of pasting it.

## Exercises that test a mental model

Balance these forms:

- explanation: why the concept exists;
- mechanism: what relationship makes it work;
- source navigation: where to find evidence;
- prediction: what changes when a plugin/provider is removed or replaced;
- diagram completion: restore a missing relationship;
- comparison: similarity and difference from a Java/Spring concept;
- claim calibration: rewrite an overconfident conclusion to match the evidence.

Answers explain why and point to evidence; they do not merely give A/B/C.
