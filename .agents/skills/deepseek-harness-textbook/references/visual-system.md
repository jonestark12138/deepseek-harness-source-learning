# Workshop visual system

Use [asset-library.md](asset-library.md) for production and the repository STYLE_GUIDE.md for exact tokens. The default is one coherent illustration family, not one mandatory vendor.

## Figure contract

Record question, Claim IDs, one teaching job, main objects, metaphor boundary, recipe/export paths, reuse IDs and separate machine/author/user review status. Prefer 4–7 strong figures for an overview, not a quota. Keep at most seven primary objects or clearly grouped scenes visible at once; do not count decorative paths as concepts.

## Grammar

- Cream paper #FFF9EE, warm ink #50483F, muted ink #756A5F.
- Pastel mint toolbox/workbench; peach brain/shield; blue wrench/journal; purple manual/module; yellow folder.
- Meaning comes from silhouette plus Chinese label, never color alone.
- Brain is the reasoning focus. Toolbox represents the broader runtime arrangement, not merely a tool list.
- A manual teaches, wrench acts, journal records, folder provides materials, shield signals constraints.
- Workbench and plug modules visualize organization, not hardware or literal runtime wiring.
- Keep labels, relationships and object SVGs separate. Reuse exact silhouettes via catalog IDs.

## Text

Use the bundled, renamed LXGW WenKai TC handwriting subset (Workshop Hand) for figure labels and reading prose. Keep code monospace. Retain OFL.txt and source metadata. Do not use generic cursive as proof of Chinese handwriting. Native SVG text remains editable; outlines stay native vector paths.

At 1200 px artwork width, main labels should be at least 24–28 px; evaluate at the actual reading width too. Explanatory prose belongs outside the picture. Do not put unintroduced English/API lists inside illustrations.

## Semantics and accessibility

Every SVG requires title, desc, role=img and matching aria-labelledby. Every Markdown figure requires descriptive alt and a takeaway/boundary caption. Composition arrows need explicit meaning. Configuration order, source-reading order, runtime sequence and metaphor association must never silently substitute for each other. Optional tool paths must be visibly optional.

## Visual gate

Review standalone figures and whole lesson at 1440×900 and 390×844. Narrow screens keep readable artwork width in a labeled local scroll container; no page-wide overflow. Verify all edges of the image by scrolling, not only its left side. Check glyphs, collisions, contrast, whitespace, recognizable objects without labels and cross-scene reuse. Automated bounding checks do not replace looking at screenshots. Do not label new work user-approved before feedback.
