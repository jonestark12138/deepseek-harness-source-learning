[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$DocsRoot,

  [Parameter(Mandatory = $true)]
  [string]$LessonDir
)

$ErrorActionPreference = 'Stop'
$docsRootPath = [IO.Path]::GetFullPath($DocsRoot).TrimEnd('\')
$lessonPath = [IO.Path]::GetFullPath($LessonDir).TrimEnd('\')
if (-not $lessonPath.StartsWith($docsRootPath + '\', [StringComparison]::OrdinalIgnoreCase)) {
  throw "LessonDir must be inside DocsRoot: $lessonPath"
}
if (-not (Test-Path -LiteralPath $lessonPath -PathType Container)) {
  throw "LessonDir does not exist: $lessonPath"
}

$errors = [Collections.Generic.List[string]]::new()
$warnings = [Collections.Generic.List[string]]::new()
$requiredLessonFiles = @('00-学习导航.md', '01-课件.md', '02-逐步讲解.md', '03-练习与答案.md', '04-分享稿.md')
foreach ($name in $requiredLessonFiles) {
  if (-not (Test-Path -LiteralPath (Join-Path $lessonPath $name) -PathType Leaf)) {
    $errors.Add("Missing required lesson file: $name")
  }
}
if (-not (Test-Path -LiteralPath (Join-Path $docsRootPath 'STYLE_GUIDE.md') -PathType Leaf)) {
  $warnings.Add('Missing shared STYLE_GUIDE.md')
}

$markdownFiles = @(Get-ChildItem -LiteralPath $lessonPath -File -Filter '*.md' -Recurse -Force)
$linkPattern = '(?<!!)\[[^\]]+\]\((?<target>[^)]+)\)'
$imagePattern = '!\[(?<alt>[^\]]*)\]\((?<target>[^)]+)\)'
foreach ($file in $markdownFiles) {
  $text = Get-Content -LiteralPath $file.FullName -Raw
  $fenceCount = @([regex]::Matches($text, '(?m)^\s*```')).Count
  if (($fenceCount % 2) -ne 0) {
    $errors.Add("Unbalanced fenced code block: $($file.FullName)")
  }
  if ($text -match '(?i)[A-Z]:\\(?:Users|code|work|workspace)\\') {
    $errors.Add("Machine-specific absolute path found: $($file.FullName)")
  }
  foreach ($match in [regex]::Matches($text, $imagePattern)) {
    if ([string]::IsNullOrWhiteSpace($match.Groups['alt'].Value)) {
      $errors.Add("Image has empty alt text: $($file.FullName)")
    }
  }
  $matches = @([regex]::Matches($text, $linkPattern)) + @([regex]::Matches($text, $imagePattern))
  foreach ($match in $matches) {
    $target = $match.Groups['target'].Value.Trim().Trim('<', '>')
    if ($target -match '^(?:[a-z][a-z0-9+.-]*:|#)') { continue }
    $pathPart = ($target -split '[?#]', 2)[0]
    if ([string]::IsNullOrWhiteSpace($pathPart)) { continue }
    $decoded = [Uri]::UnescapeDataString($pathPart).Replace('/', '\')
    $resolved = [IO.Path]::GetFullPath((Join-Path $file.DirectoryName $decoded))
    if (-not (Test-Path -LiteralPath $resolved)) {
      $errors.Add("Broken local link in $($file.FullName): $target")
    }
  }
}

$svgFiles = @(Get-ChildItem -LiteralPath $docsRootPath -File -Filter '*.svg' -Recurse -Force | Where-Object { $_.FullName -notmatch '\\(?:\.git|output|node_modules)\\' })
foreach ($svg in $svgFiles) {
  $svgText = Get-Content -LiteralPath $svg.FullName -Raw
  try { $xml = [xml]$svgText } catch { $errors.Add("Invalid SVG XML: $($svg.FullName)"); continue }
  if ($svgText -match '(?i)(?:@import\s+(?:url\()?[''\"]?https?://|(?:href|src)\s*=\s*[''\"]https?://|url\(\s*[''\"]?https?://)') {
    $errors.Add("SVG has an external dependency: $($svg.FullName)")
  }
  if ($null -eq $xml.svg.title -or $null -eq $xml.svg.desc) {
    $errors.Add("SVG requires title and desc: $($svg.FullName)")
  }
  $base = [IO.Path]::Combine($svg.DirectoryName, [IO.Path]::GetFileNameWithoutExtension($svg.Name))
  if (-not ((Test-Path -LiteralPath ($base + '.html')) -or (Test-Path -LiteralPath ($base + '.drawio')) -or (Test-Path -LiteralPath ($base + '.excalidraw')) -or (Test-Path -LiteralPath ($base + '.mmd')))) {
    $warnings.Add("SVG has no same-basename editable source: $($svg.FullName)")
  }
}

foreach ($source in @(Get-ChildItem -LiteralPath $docsRootPath -File -Recurse -Force | Where-Object { $_.Extension -in @('.drawio', '.excalidraw', '.html', '.mmd') -and $_.FullName -notmatch '\\(?:\.git|output|node_modules)\\' })) {
  $base = [IO.Path]::Combine($source.DirectoryName, [IO.Path]::GetFileNameWithoutExtension($source.Name))
  if (-not ((Test-Path -LiteralPath ($base + '.svg')) -or (Test-Path -LiteralPath ($base + '.png')))) {
    $warnings.Add("Editable visual source has no same-basename export: $($source.FullName)")
  }
}

Write-Output "Markdown files checked: $($markdownFiles.Count)"
Write-Output "SVG files checked: $($svgFiles.Count)"
foreach ($warning in $warnings) { Write-Warning $warning }
if ($errors.Count -gt 0) {
  foreach ($message in $errors) { Write-Output "ERROR: $message" }
  throw "Lesson validation failed with $($errors.Count) error(s) and $($warnings.Count) warning(s)."
}
Write-Output "Lesson validation passed with $($warnings.Count) warning(s)."
