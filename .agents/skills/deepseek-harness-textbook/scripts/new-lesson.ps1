[CmdletBinding(SupportsShouldProcess)]
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^\d{2}$')]
  [string]$LessonNumber,

  [Parameter(Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string]$Title,

  [string]$DocsRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\..\..'))
)

$ErrorActionPreference = 'Stop'
$invalidChars = [IO.Path]::GetInvalidFileNameChars()
if ($Title.IndexOfAny($invalidChars) -ge 0) {
  throw 'Title contains characters that are invalid in a directory name.'
}

$docsRootPath = [IO.Path]::GetFullPath($DocsRoot)
$lessonName = "第${LessonNumber}次-$Title"
$lessonDir = [IO.Path]::GetFullPath((Join-Path $docsRootPath $lessonName))
$assetDir = [IO.Path]::GetFullPath((Join-Path $docsRootPath "assets\lesson-$LessonNumber"))

if (-not $lessonDir.StartsWith($docsRootPath + '\', [StringComparison]::OrdinalIgnoreCase)) {
  throw "Lesson directory escaped DocsRoot: $lessonDir"
}
if (-not $assetDir.StartsWith($docsRootPath + '\', [StringComparison]::OrdinalIgnoreCase)) {
  throw "Asset directory escaped DocsRoot: $assetDir"
}
if ((Test-Path -LiteralPath $lessonDir) -or (Test-Path -LiteralPath $assetDir)) {
  throw 'Lesson or asset directory already exists; refusing to overwrite it.'
}

function Write-Utf8File([string]$Path, [string]$Content) {
  $utf8NoBom = [Text.UTF8Encoding]::new($false)
  [IO.File]::WriteAllText($Path, ($Content.TrimEnd() + "`n"), $utf8NoBom)
}

if ($PSCmdlet.ShouldProcess($lessonDir, 'Create lesson scaffold')) {
  New-Item -ItemType Directory -Path $lessonDir, $assetDir -Force | Out-Null

  $lessonIndex = [int]$LessonNumber
  $files = [ordered]@{
    '00-学习导航.md' = "# 第 $lessonIndex 次学习导航：$Title`n`n> 源码快照：待填写`n`n## 本次问题`n`n待填写。`n`n## 完成标准`n`n- [ ] 待填写。"
    '01-课件.md' = "# 第 $lessonIndex 次：$Title`n`n> 源码快照：待填写`n`n## 开场问题`n`n待填写。"
    '02-逐步讲解.md' = "# 第 $lessonIndex 次逐步讲解：$Title`n`n> 源码快照：待填写`n`n## 我们只追一个问题`n`n待填写。"
    '03-练习与答案.md' = "# 第 $lessonIndex 次练习与答案：$Title`n`n> 源码快照：待填写`n`n## 练习`n`n待填写。`n`n## 参考答案`n`n<details>`n<summary>展开答案</summary>`n`n待填写。`n`n</details>"
    '04-分享稿.md' = "# 第 $lessonIndex 次分享稿：$Title`n`n> 源码快照：待填写`n`n## 听众应带走什么`n`n待填写。"
    "lesson-$LessonNumber-brief.md" = "# Lesson $LessonNumber Brief — $Title`n`n请按 Skill 的 lesson-brief-template.md 填写。"
    "lesson-$LessonNumber-diagnosis.md" = "# Lesson $LessonNumber 教学诊断`n`n## 结论`n`n待填写。"
    "lesson-$LessonNumber-source-facts.md" = "# Lesson $LessonNumber Source Fact Matrix`n`n| Claim ID | Claim | Exact evidence | Evidence type | Commit | Confidence | Teaching simplification | Boundary / uncertainty |`n|---|---|---|---|---|---|---|---|"
    "lesson-$LessonNumber-visual-plan.md" = "# Lesson $LessonNumber Visual Plan`n`n| Figure ID | Question | Claim IDs | Teaching job | Tool | Editable source | Export | Insert position | QA status |`n|---|---|---|---|---|---|---|---|---|"
    "lesson-$LessonNumber-qa-report.md" = "# Lesson $LessonNumber QA Report`n`n## Source Accuracy QA`n`n待填写。`n`n## Visual QA`n`n待填写。`n`n## Teaching QA`n`n待填写。"
  }

  foreach ($entry in $files.GetEnumerator()) {
    Write-Utf8File (Join-Path $lessonDir $entry.Key) $entry.Value
  }
}

[pscustomobject]@{
  LessonDirectory = $lessonDir
  AssetDirectory = $assetDir
  Created = Test-Path -LiteralPath $lessonDir
}
