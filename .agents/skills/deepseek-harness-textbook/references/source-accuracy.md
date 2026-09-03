# Source accuracy

## Evidence hierarchy

Use the checked-out source at the recorded commit. Prefer evidence in this order for the claim being made:

1. implementation and exported types for actual behavior;
2. configuration/manifests for real composition;
3. tests and snapshots for observable behavior and failure;
4. upstream architecture/subsystem docs for maintained terminology and system maps;
5. README prose for package intent;
6. inference, explicitly labeled.

One evidence type may be enough for a narrow claim. Important cross-package claims should normally have at least two independent evidence types.

## Source-fact matrix

Before writing a figure or central explanation, record:

| Claim ID | Claim | Exact evidence | Evidence type | Commit | Confidence | Teaching simplification | Boundary / uncertainty |
|---|---|---|---|---|---|---|---|

Use stable Claim IDs such as `L01-F-001`. Let the visual plan reference those IDs so a changed source fact can be traced to affected figures.

## Lesson 01 terminology guardrails

- Treat “Agentic system ≈ Model + Harness” as a teaching approximation, not a source-level definition of the `Agent` interface.
- The `dsh-agent` package owns the Agent handle, live registry, and `agent/*` event vocabulary; the default driver lives in `dsh-agent-loop`.
- Cordis Context is a repository of services with plugin lifecycle and scoped behavior. It is not a plain global object and not the OS execution environment.
- A Cordis Service Definition owns a stable `ctx.<key>` and vocabulary. A complete capability seam includes Definition, Provider, and Consumer; it is not merely a TypeScript interface.
- The model does not directly own the filesystem, sandbox, Session, Tool registry, or Skill registry. The Harness composes those capabilities and presents model-visible messages and tool schemas.
- A Skill is reusable instruction content discovered and resolved by providers. A consumer publishes the catalog and a model-facing loader tool. It is not equivalent to a Tool.
- Session is an append-only event log and source of derived model history. Persistence is provided separately.
- Sandbox confines process execution under policy. Remote or container execution may replace broader capabilities and must not be implied by a generic sandbox icon.

## Diagram facts

An arrow is a factual claim. Label whether it means:

- calls;
- provides a service;
- injects/depends on;
- emits/listens;
- records;
- contains;
- is configured by;
- is a teaching association only.

Do not use an unlabeled arrow when readers could infer ownership or direct invocation incorrectly.

## Publication checks

- Use fixed-commit GitHub links.
- Do not publish local absolute paths, credentials, environment values, browser profiles, or copied upstream source trees.
- Re-run source searches after the lesson is complete; do not trust the initial fact matrix if prose or figures changed.
