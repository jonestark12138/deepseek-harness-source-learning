"""Package only validated reader files. No source checkout, caches or credentials."""
import hashlib
import json
from pathlib import Path
import subprocess
import zipfile

root = Path(__file__).resolve().parents[4]
site = root / "output/site"
subprocess.run(["node", str(Path(__file__).with_name("check-site.cjs")), str(site)], check=True)
release = root / "output/releases"
release.mkdir(parents=True, exist_ok=True)
name = "deepseek-harness-lesson-01-v1.0.0"
archive = release / f"{name}.zip"
files = sorted(p for p in site.rglob("*") if p.is_file())
manifest = {p.relative_to(site).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
readme = "第一讲离线阅读包 v1.0.0\n\n请先完整解压，再用浏览器打开 index.html。无需安装 Node 或启动服务。\n包含第一讲全部六份阅读内容、六张插图、11 个矢量物件和术语词典。\n正文、图片、字体和素材检索可离线使用；GitHub 源码、下载和反馈链接需联网。\n字体使用 SIL OFL 1.1，详见 assets/fonts/OFL.txt。其他内容尚未指定开放许可。\n本教材为个人学习项目，与 DeepSeek 官方无隶属或背书关系。\n"
with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
    contents = {p.relative_to(site).as_posix(): p.read_bytes() for p in files}
    contents["README-离线阅读.txt"] = readme.encode("utf-8")
    contents["manifest.sha256.json"] = (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    for relative, data in sorted(contents.items()):
        info = zipfile.ZipInfo(f"{name}/{relative}", date_time=(2026, 9, 5, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        bundle.writestr(info, data)
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None
    assert len(bundle.namelist()) == len(files) + 2
digest = hashlib.sha256(archive.read_bytes()).hexdigest()
(release / "SHA256SUMS.txt").write_text(f"{digest}  {archive.name}\n", encoding="utf-8")
print(json.dumps({"archive": str(archive), "files": len(files) + 2, "bytes": archive.stat().st_size, "sha256": digest}, indent=2))
