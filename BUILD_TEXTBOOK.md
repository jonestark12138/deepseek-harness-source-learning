# 教材生成工程

## 日常构建：不需要在线 Figma

在本仓库根目录执行，要求 Node.js 24+。已提交独立 SVG、字体子集和场景配方；复现第一讲不调用生图服务，不需要再次生成素材。

~~~powershell
npm ci
npm test
npm run build:lesson01
./.agents/skills/deepseek-harness-textbook/scripts/validate-lesson.ps1 -DocsRoot . -LessonDir './第01次-项目全景与源码阅读地图'
~~~

打开 previews/lesson-01.html，或启动本地只读浏览服务：

~~~powershell
python -m http.server 8765 --bind 127.0.0.1
~~~

访问 http://127.0.0.1:8765/previews/lesson-01.html 。这条本地命令不会发布网站；推送 main 后的自动 Pages 发布、首页构建与离线打包见 [发布指南](PUBLISHING.md)。

## 找素材、组合场景

~~~powershell
node .agents/skills/deepseek-harness-textbook/scripts/asset-library.cjs search 大脑
node .agents/skills/deepseek-harness-textbook/scripts/asset-library.cjs search Session
node .agents/skills/deepseek-harness-textbook/scripts/asset-library.cjs validate
node .agents/skills/deepseek-harness-textbook/scripts/compose-figures.cjs assets/lesson-01/v2
~~~

1. catalog.json 是索引；objects 下的每个 SVG 是独立物件，包含来源与比喻边界。
2. scene.json 引用素材 ID，分开描述物件、标签与有意义的箭头。
3. composer 生成自包含 SVG：物件路径、文字、字体都在其中。图形和文字仍可编辑。
4. gallery 命令生成 [检索页面](assets/library/index.html)。找不到合适物件时，再按 Skill 在 Figma 新增，检查并保存来源，别先重画已有机器人。

素材保存 SHA-256；已发布 ID 不悄悄替换外形。需要不兼容的新外形时新增 v2 或明确的变体 ID。

## 新增汉字时：更新离线字体

日常复现不用下载字体。如果新内容出现字形覆盖错误，从 [Google Fonts 官方目录](https://github.com/google/fonts/tree/main/ofl/lxgwwenkaitc) 下载 LXGWWenKaiTC-Regular.ttf 和 OFL.txt，放到 output/font-source/，然后运行：

~~~powershell
python -m pip install --target output/python-deps --cache-dir output/pip-cache fonttools==4.64.0 brotli==1.2.0
$env:PYTHONPATH = (Join-Path (Get-Location) 'output/python-deps')
python .agents/skills/deepseek-harness-textbook/scripts/build-fonts.py output/font-source/LXGWWenKaiTC-Regular.ttf
python .agents/skills/deepseek-harness-textbook/scripts/build-fonts.py output/font-source/LXGWWenKaiTC-Regular.ttf --check
npm run build:lesson01
~~~

字体子集重命名为 Workshop Hand，附带 OFL、来源与输入哈希。原始 TTF 和安装缓存不会提交，也不需要放到 C 盘。字体构建不是生图步骤。

## 生成下一讲骨架

下面以尚未存在的第 02 讲为例；脚本拒绝覆盖已有课程：

~~~powershell
./.agents/skills/deepseek-harness-textbook/scripts/new-lesson.ps1 -LessonNumber 02 -Title '入口与装配机制' -DocsRoot .
~~~

它会创建六份正式材料、assets/lesson-02/ 和 production/lesson-02/。先填简报与事实矩阵，再写正文和场景。下一讲的图片沿用素材 ID；源码证据重新核对，不自动继承旧行号。

## 浏览器检查

使用已安装的 Playwright CLI 打开隔离浏览器，运行 qa-lesson-01.js。需先运行上面的本地服务：

~~~powershell
playwright-cli -s=textbook open http://127.0.0.1:8765/previews/lesson-01.html --browser=chrome
playwright-cli -s=textbook run-code --filename=.agents/skills/deepseek-harness-textbook/scripts/qa-lesson-01.js
playwright-cli -s=textbook close
~~~

脚本检查六张图的文字边界/重叠/字体、11 个素材的搜索、六份文档导航、答案折叠、图片加载与手机页面宽度，截图放 output/qa/。必须人工看图；脚本不能判断比喻是否准确，也不会代替用户验收。

## 目录与发布约定

读者目录只放六份材料。制作记录在 production/，当前成品在 previews/ 与 assets/；旧版图源在 archive/。本地实验放 .local/，构建缓存放 output/，全部忽略。不要把上游源码、浏览器用户目录、Token、下载依赖或整套原始字体提交到教材库。

发布前检查链接、源码提交、凭据模式与暂存区清单，再正常提交和推送。不需要强制推送来替换教材内容；Git 历史保留回退能力。
