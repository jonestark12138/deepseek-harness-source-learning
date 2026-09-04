"""Build a local, renamed OFL handwriting subset; never fetch fonts implicitly."""
import argparse
import hashlib
import json
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

parser = argparse.ArgumentParser()
parser.add_argument("source_ttf", type=Path)
parser.add_argument("--check", action="store_true", help="Check current corpus coverage without writing")
args = parser.parse_args()
root = Path(__file__).resolve().parents[4]
out = root / "assets/fonts"
texts = ["".join(chr(i) for i in range(32, 127)), "←→↗↓≈×✓：；，。！？（）·—零一二三四五六七八九十"]
for pattern in ("第*次-*/*.md", "assets/lesson-*/**/*.scene.json", "assets/library/*.json", "assets/library/index.html", ".agents/skills/deepseek-harness-textbook/scripts/*.cjs"):
    for file in sorted(root.glob(pattern)):
        texts.append(file.read_text(encoding="utf-8"))
codepoints = sorted({ord(c) for c in "".join(texts) if not c.isspace() and ord(c) != 0xFE0F} | {32})
font = TTFont(args.source_ttf, recalcTimestamp=False)
cmap = font.getBestCmap()
missing = [c for c in codepoints if c not in cmap]
# Non-BMP decorative symbols are allowed to fall back in prose, never in scene labels.
missing_cjk = [c for c in missing if 0x3400 <= c <= 0x9FFF]
if missing_cjk:
    raise SystemExit("Source font lacks Chinese glyphs: " + "".join(map(chr, missing_cjk)))
supported = [c for c in codepoints if c in cmap]
if args.check:
    existing = set(json.loads((out / "provenance.json").read_text(encoding="utf-8"))["codepoints"])
    absent = set(supported) - existing
    if absent:
        raise SystemExit("Rebuild subset: " + "".join(map(chr, sorted(absent))))
    print(f"Font coverage OK: {len(supported)} codepoints")
else:
    options = subset.Options()
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    options.name_legacy = True
    options.name_languages = [0x409]
    tool = subset.Subsetter(options=options)
    tool.populate(unicodes=supported)
    tool.subset(font)
    for record in font["name"].names:
        if record.nameID in (1, 3, 4, 6):
            label = "WorkshopHand-Regular" if record.nameID == 6 else "Workshop Hand"
            record.string = label.encode(record.getEncoding())
    font.flavor = "woff2"
    out.mkdir(parents=True, exist_ok=True)
    font.save(out / "workshop-hand.woff2")
    # The downloaded license is distributed verbatim with the derived font.
    (out / "OFL.txt").write_bytes(args.source_ttf.with_name("OFL.txt").read_bytes())
    meta = {"source": "https://github.com/google/fonts/tree/main/ofl/lxgwwenkaitc", "sourceFile": args.source_ttf.name, "sourceSha256": hashlib.sha256(args.source_ttf.read_bytes()).hexdigest(), "family": "Workshop Hand", "derivedFrom": "LXGW WenKai TC Regular", "license": "SIL OFL 1.1", "codepoints": supported}
    (out / "provenance.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Built {len(supported)} glyphs, {(out / 'workshop-hand.woff2').stat().st_size} bytes; unsupported decorative symbols: {len(missing)}")
