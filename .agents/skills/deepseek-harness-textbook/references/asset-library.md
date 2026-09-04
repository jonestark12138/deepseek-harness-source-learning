# Asset-first illustration workflow

## Three independent layers

1. **Object**: a recognizable robot, brain, empty toolbox, wrench, manual, journal, folder, shield, module, assembly sheet or workbench. Native SVG has no visible label or arrow. Keep transparent surroundings and a stable ID such as `model-brain-v1`.
2. **Scene**: a `.scene.json` recipe references IDs and positions. Reuse, resize and arrange existing objects; do not copy or redraw them under a different name. Composition, comparison, reading order and runtime sequence are different semantics.
3. **Teaching text**: Chinese labels, short annotations and meaningful arrows are separate scene elements. Paragraph explanations and metaphor boundaries remain in Markdown as well.

Canonical files: `assets/library/catalog.json`, `assets/library/objects/*.svg`, `assets/library/style.json`. Browse `assets/library/index.html`. Recipes and exports live in `assets/lesson-NN/` (versioned subfolders are allowed).

## Required production order

1. Write the figure question, Claim IDs and boundary before touching layout.
2. Run `node .agents/skills/deepseek-harness-textbook/scripts/asset-library.cjs search <Chinese-or-English-term>`. Search synonyms and inspect candidates visually, not only their names.
3. Reuse a matching ID. Search miss means permission to design a needed object, not permission to switch style or buy generation credits.
4. For a missing vector object, read the Figma skill, inspect the accepted tray, create a bounded native vector addition and inspect a screenshot. Save its editable SVG and source file/node mapping. If blocked, retain the original editable SVG input and accurately record the block; never call it a successful Figma re-export or AI generation.
5. Register name, concept, keywords, style, file, provenance, review status and metaphor boundary in the catalog. New shapes begin as author-reviewed, not user-approved. Keep published IDs stable; incompatible redraws get `v2` rather than silently changing earlier lessons.
6. Write a scene recipe using the catalog. Treat object artwork as immutable. Same-concept objects keep color, silhouette and rough outline style. Distinguish optional tool calls from mandatory sequence. A source-reading route is not a runtime call graph.
7. Compose with `compose-figures.cjs <scene-file-or-directory>`. Native SVG paths remain editable; labels are text. Outputs contain no remote font/image dependency. Use the bundled handwriting font, not generic `cursive` fallback.
8. Rebuild the gallery, validate, and inspect every new scene at desktop and narrow widths. Review hidden-label recognizability, spacing, legibility and semantic accuracy independently.

## Font and regeneration contract

The repository includes an OFL-licensed, renamed subset of LXGW WenKai TC. `build-fonts.py` rebuilds it from a caller-supplied upstream TTF and the repository's teaching text. Keep license and source/hash metadata. Rebuild when adding glyphs, then recompose figures and render lessons; never silently ship missing Chinese glyphs. Download source fonts and install temporary build dependencies only under ignored output paths.

`BUILD_TEXTBOOK.md` contains runnable commands. `asset-library.cjs validate` checks registered SVGs and style consistency. Node tests check deterministic composition, missing IDs, path boundaries and distinct composition versus sequence semantics. `validate-lesson.ps1` checks lesson files and links; browser QA checks real layout. None of these alone proves source correctness or user acceptance.

## Extension rule

Do not force every future topic into a toolbox metaphor. Reuse the visual vocabulary when meaningful; add a carefully named object or a clearly justified formal diagram when it genuinely teaches better. One visual system does not require one tool. Excalidraw is an optional annotation surface, not a compulsory conversion stage.
