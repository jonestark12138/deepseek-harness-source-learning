# Visual system

## Visual objective

Use a modern technical-textbook style with a friendly teaching layer. The diagrams should feel calm, intentional, and memorable—not like an enterprise slide, marketing poster, sci-fi HUD, or a wall of flowchart boxes.

## Figure contract

Every figure begins as a row in the visual plan:

| Field | Meaning |
|---|---|
| Figure ID | Stable lesson-local identifier such as `L01-F01` |
| Question | The one question the figure answers |
| Claim IDs | Source-fact rows it visualizes |
| Teaching job | Intuition, comparison, formal map, sequence, or reading route |
| Tool | Why this tool is better than the alternatives |
| Main elements | Keep the primary visual vocabulary bounded |
| Metaphor boundary | Required for analogy figures |
| Editable source | HTML, `.excalidraw`, `.drawio`, or `.mmd` |
| Export | Prefer SVG |
| Insert position | Exact document and section |
| QA status | Draft, rendered, reviewed, accepted |

## Tool choice

- `diagram-design`: editorial concept diagrams, before/after comparisons, layered relationships, source maps, dependency concepts.
- `excalidraw-skill`: a spatial metaphor, memorable whiteboard, or first intuition. Do not recreate a formal architecture diagram in hand-drawn form.
- `drawio`: the maintained formal architecture source. Keep it shallow enough for the current lesson.
- Mermaid: a compact sequence, state transition, or simple flow whose text source is genuinely easier to maintain.
- Playwright: visual inspection only; it does not decide whether a technical relationship is true.

For an overview lesson, four to seven strong figures are usually enough. Prefer at most one or two Mermaid figures unless the lesson is inherently sequence/state heavy. This is a decision heuristic, not a quota.

## Semantic colors

Use these defaults across tools unless contrast testing or an established asset requires a justified adjustment:

| Concept | Color | Role |
|---|---|---|
| Model | `#EB6C36` | reasoning/generation focus |
| Harness | `#2D3142` | containing runtime/system boundary |
| Cordis | `#4F5D75` | coordinating framework layer |
| Plugin | `#6C63A8` | modular contribution |
| Tool / external capability | `#2A9D8F` | action and environment access |
| Context | `#577590` | scoped capability access |
| Session / durable data | `#3A7CA5` | record and continuity |
| Highlight | `#F4A261` | one key teaching emphasis |
| Muted | `#E9ECEF` | background/supporting structure |
| Warning | `#C94C4C` | misconception or unsafe inference |

Color must not be the only carrier of meaning. Pair it with labels, shape, or line style.

## Shape language

- Model: one compact focal core; do not draw it as the whole system.
- Harness: a boundary, workspace, or organizing field—not another peer box.
- Cordis: shared foundation/context and lifecycle organizer; avoid an OS/server icon.
- Plugin: visibly mountable modules with a shared grammar.
- Tool: action port or capability endpoint.
- Skill: instruction card/manual, not a wrench.
- Session: ordered record/timeline.
- Sandbox: visibly bounded execution area with policy edges.

## Text and accessibility

- Put keywords and short labels in the figure; keep paragraphs in Markdown.
- Use a self-contained font stack such as `"Noto Sans SC", "Microsoft YaHei", sans-serif`; do not import Google Fonts into committed SVG.
- Every SVG requires `<title>` and `<desc>`.
- Avoid text below 14 px at the asset's intended Markdown width.
- Do not let arrows cross labels or nodes.
- Use descriptive Markdown alt text and a caption that states the takeaway.

## Visual QA

Inspect assets independently and inside the rendered lesson.

- Desktop viewport: approximately 1440 × 900.
- Narrow viewport: approximately 390 × 844.
- Run 3-second, 10-second, and 30-second teaching checks.
- Verify Chinese glyphs, overflow, contrast, hierarchy, arrow meaning, external dependencies, and cross-figure semantic consistency.
- Keep screenshots under a local QA directory or ignored output directory unless the user requests them as deliverables.

If the first render already passes, record that result; do not manufacture a revision.
