---
name: deepseek-harness-textbook
description: Create or refactor Chinese DeepSeek Harness source-learning lessons with metaphor-led teaching, editable explanatory diagrams, pinned source evidence, and browser visual QA. Use for lesson diagnosis, planning, production, or review in the separate learning-materials repository; do not use to modify upstream source or write a product usage guide.
---

# DeepSeek Harness Textbook

Build a source-code textbook that is accurate enough for an engineer and vivid enough to remember. Prefer a clear mental model, spatial metaphor, and purposeful illustration over dense prose or box-heavy Mermaid.

## Select the work mode

- **Diagnose**: inspect an existing lesson and explain why it feels difficult, repetitive, abstract, or visually flat.
- **Plan**: create the lesson brief, source-fact matrix, teaching outline, and visual plan before rewriting.
- **Produce**: write or refactor the five lesson documents and create the accepted visual assets.
- **QA**: validate source claims, teaching sequence, files, links, and rendered output.
- **Scaffold**: create the standard files for a later lesson with `scripts/new-lesson.ps1`.

For a full lesson, execute the modes in that order. For a focused request, run only the requested mode and preserve the existing accepted artifacts.

## Load only the references needed

- Always read [project-profile.md](references/project-profile.md) before changing this repository.
- Read [pedagogy.md](references/pedagogy.md) when diagnosing, outlining, or writing a lesson.
- Read [source-accuracy.md](references/source-accuracy.md) before stating architecture or source facts.
- Read [visual-system.md](references/visual-system.md) before planning, generating, or reviewing figures.
- Read [workflow.md](references/workflow.md) for a full lesson or a multi-file refactor.
- Use [lesson-brief-template.md](references/lesson-brief-template.md) when starting a new lesson or when the current lesson lacks explicit boundaries.

## Non-negotiable behavior

1. Treat the checked-out upstream source as the factual authority. Record `git rev-parse HEAD`; do not rely on model memory.
2. Keep personal teaching materials physically separate from the upstream checkout. Do not edit or copy the upstream repository into the materials repository.
3. Separate **confirmed source fact**, **teaching simplification**, **metaphor**, and **inference**. A metaphor must state its mapping and where it stops matching.
4. Build the lesson around one driving problem. Use this learning path when it fits:

   `real problem -> intuition -> metaphor -> visual model -> formal explanation -> source evidence -> runtime behavior -> reading route -> exercises`

5. Do not start from a quota of tools or figures. Give every figure one question and one teaching job. Remove figures that do not lower understanding cost.
6. Prefer custom editorial diagrams or hand-drawn spatial explanations for relationships and intuition. Use Mermaid mainly for sequence, state, or a genuinely simple flow.
7. Keep editable visual sources beside exports. Technical exports default to SVG; avoid remote fonts, remote images, and runtime network dependencies.
8. Use Playwright to inspect accepted visual assets and the final rendered lesson. A raw Markdown file is not a valid final preview when Mermaid is present; use a deterministic preview page.
9. Preserve the existing five-document lesson convention unless the user asks to change it. Do not rewrite later lessons while establishing the current lesson's template.
10. Do not publish, commit, push, or modify upstream source unless the user separately requests that action.

## Quality gates

### Evidence gate

Before prose or diagrams, create or update a source-fact matrix containing the claim, exact path/symbol/config row, evidence type, commit, confidence, and allowed teaching simplification. Stop a disputed claim from reaching figures until it is resolved or explicitly labeled uncertain.

### Teaching gate

The lesson must answer its driving question without requiring readers to memorize implementation detail prematurely. Mark concepts as `现在必须懂`, `知道存在即可`, or `后续深入` when cognitive load would otherwise be unclear.

### Visual gate

For each candidate figure, record its question, claim, evidence, tool choice, element budget, editable source, export, insertion point, and QA status. Use consistent semantic colors and shapes across tools.

### Final gate

Run:

```powershell
./.agents/skills/deepseek-harness-textbook/scripts/validate-lesson.ps1 `
  -DocsRoot . `
  -LessonDir './第NN次-主题'
```

Then render the complete lesson and inspect it with Playwright at desktop and narrow widths. Report checks actually run, remaining uncertainty, changed files, and why each retained figure exists.

## Tool routing

- Use `diagram-design` for editorial comparisons, component relationships, source maps, and layered technical concepts.
- Use `excalidraw-skill` for memorable spatial metaphors and whiteboard intuition.
- Use `drawio` for the formal, long-lived architecture source that later lessons will extend.
- Use Mermaid for sequence/state/simple flow when text-based maintenance is the clearest choice.
- Use `playwright-cli` or the available Playwright workflow for screenshots and rendered-page QA.

Tool availability never overrides teaching value or source accuracy.
