# Full lesson workflow

## 1. Investigate without editing

Inventory the learning plan, current lesson documents, visual assets, repository instructions, upstream architecture docs, relevant packages, and current Git state. Preserve unrelated and untracked user files.

## 2. Diagnose the existing lesson

Evaluate:

- driving question and narrative order;
- concept introduction order;
- text walls and repetition;
- Mermaid figures that merely restate prose;
- source excerpts that appear before their purpose;
- missing metaphor-to-source transitions;
- exercise quality and source-navigation practice.

Create `lesson-NN-diagnosis.md`. Do not begin the rewrite in the diagnosis pass.

## 3. Lock the evidence

Create `lesson-NN-source-facts.md` using the fact matrix from `source-accuracy.md`. Confirm exact paths, symbols, package roles, configuration rows, events, and runtime relationships at the current commit.

## 4. Write the lesson brief

Create or update `lesson-NN-brief.md` from the template. State the one driving question, required outcome, source route, concepts to defer, and acceptance checks.

## 5. Plan visuals before producing them

Create `lesson-NN-visual-plan.md`. Begin with candidate figures; reject or merge overlaps. Each accepted figure must reference fact IDs and have one teaching job.

For Lesson 01, six worked examples are robot/brain/toolbox, workshop objects, pluggable equipment, assembly sheets, source-reading trail, and a four-scene runtime story. This is not a quota. Search the asset library before each scene; reuse exact object IDs. Move package mappings into prose/tables instead of filling drawings with API names.

## 6. Prototype the visual language

Start from the accepted robot/brain/toolbox sample. With a new provider, render one sample and a second consistency scene before producing the set. Check recognizable objects and label placement; preserve the same vocabulary. Update `STYLE_GUIDE.md` only with choices that survived real use. On authorization or balance failure stop generation, report the gate and preserve accepted lesson assets.

## 7. Rewrite the lesson

Preserve the six-document responsibilities:

- navigation: sequence, time, outcomes, and completion criteria;
- courseware: fast visual map;
- step-by-step explanation: continuous teaching narrative with source evidence;
- exercises and answers: active recall, prediction, diagram, and source location;
- sharing script: compressed explanation, not a duplicate textbook.
- glossary: Chinese-first lookup, object analogy, actual meaning, boundary and source link; define terms in the main narrative too.

Reuse accepted figures by reference rather than duplicating similar diagrams in every document.

## 8. Render and validate

Run the asset tests, font coverage check, scene composer and `scripts/validate-lesson.ps1`. Build a deterministic local HTML preview of Markdown, code and exported SVGs; this renderer does not execute Mermaid. Use Playwright to inspect every new figure, the gallery and both lesson viewports. Keep working records in `production/lesson-NN/`, reader documents in the lesson folder, published previews in `previews/`, and caches/experiments under ignored `output/` or `.local/` paths.

## 9. Re-check source and teaching

Repeat relevant source searches after all prose and diagrams exist. Read the lesson as the target Java backend engineer. Fix unexplained terminology, premature detail, inaccurate analogy, and unclear next reading steps.

## 10. Report

Report:

- changed and added files;
- which figures survived and what each teaches;
- actual use of each tool;
- commands and QA performed;
- source commit and unverified claims;
- remaining risks and the rule later lessons should inherit.

Do not commit or push unless separately requested.
