# Project profile

## Repository boundary

Resolve paths relative to the materials repository rather than hard-coding a machine path.

- Materials repository: the directory containing this repository's `.git` and `README.md`.
- Upstream checkout: `../source/deepseek-harness` relative to the materials repository.
- Personal lesson content must stay in the materials repository.
- Upstream source is read-only unless the user explicitly requests an upstream code change.

The public materials repository must not contain the full upstream checkout, credentials, machine-specific absolute source links, generated caches, or browser profiles.

## Audience

Write for a Java backend engineer who already understands Spring Boot, APIs, databases, Linux, containers, and ordinary source navigation, but is still building intuition for TypeScript, Cordis, and agent harness architecture.

Use Java/Spring concepts as bridges, not identities. Every important analogy states:

1. what is similar;
2. what is different;
3. which real DeepSeek Harness source construct replaces the analogy.

## Existing course convention

Each lesson normally contains:

```text
第NN次-主题/
├── 00-学习导航.md
├── 01-课件.md
├── 02-逐步讲解.md
├── 03-练习与答案.md
├── 04-分享稿.md
└── 05-术语与比喻词典.md

production/lesson-NN/
├── lesson-NN-brief.md
├── lesson-NN-diagnosis.md
├── lesson-NN-source-facts.md
├── lesson-NN-visual-plan.md
└── lesson-NN-qa-report.md
```

Shared objects live under `assets/library/`; scene recipes and exports live under `assets/lesson-NN/`. Keep the lesson Markdown readable without opening the editable source. Published HTML goes in `previews/`; local experiments/caches stay in ignored directories.

Do not split exercises and answers merely to satisfy a generic convention. The existing repository deliberately keeps them together, with answers in collapsible sections.

## Version and citation policy

At the start of source work:

```powershell
git -C ../source/deepseek-harness status --short --branch
git -C ../source/deepseek-harness rev-parse HEAD
```

Record the full commit in every source-fact matrix and lesson header. Public source links use immutable GitHub `blob/<full-commit>/...` or `tree/<full-commit>/...` URLs. A local path may appear in a local-only command example only when clearly labeled and parameterized; do not make it the canonical citation.

## Current Lesson 01 boundary

Lesson 01 builds a first map. It may introduce Model, Harness, Cordis, Plugin, Service, Event, Context, Tool, Skill, Session, Sandbox, profiles, bundles, and the agent loop, but it must not teach their deep mechanics.

The intended source route remains narrow:

```text
README / architecture
-> apps/cli/src/bin.ts
-> apps/cli/src/profile-boot.ts
-> packages/bundle/base/cordis.patch.yml
-> boot() boundary
```

Cordis internals, complete plugin lifecycle, service resolution, event dispatch modes, the agent-loop state machine, Session internals, tool approval, and sandbox implementation belong to later lessons.
