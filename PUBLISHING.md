# 网站与第一讲 Release

## 两个入口，两种用途

- [在线阅读](https://jonestark12138.github.io/deepseek-harness-source-learning/)：main 更新后自动发布，提供首页、第一讲、词典、素材库、事实矩阵。
- [第一讲 v1.0.0](https://github.com/jonestark12138/deepseek-harness-source-learning/releases/tag/lesson-01-v1.0.0)：固定标签的离线快照，不会随 main 自动改变。

## 本地构建与检查

在教材仓库根目录运行，使用 Node.js 24+；打包额外需要 Python 3，无第三方 Python 依赖。

~~~powershell
npm ci --ignore-scripts
npm test
npm run build:site
npm run test:site
node .agents/skills/deepseek-harness-textbook/scripts/audit-materials.cjs
python .agents/skills/deepseek-harness-textbook/scripts/package-release.py
~~~

网站输出到 output/site；ZIP 与 SHA256SUMS.txt 输出到 output/releases。这些目录都不提交。字体增加新汉字时，先按 [构建说明](BUILD_TEXTBOOK.md) 重建子集，再构建网站。

打开 output/site/index.html 可离线阅读，也可通过本地服务检查仓库子路径：

~~~powershell
python -m http.server 8765 --bind 127.0.0.1
~~~

浏览 http://127.0.0.1:8765/output/site/ 。浏览器检查脚本为 .agents/skills/deepseek-harness-textbook/scripts/qa-site.js，执行方式同教材 QA。页面要同时检查桌面和手机，并看实际截图。

## 自动发布

GitHub 仓库 Settings → Pages 的 Source 选择 GitHub Actions。工作流见 [.github/workflows/pages.yml](.github/workflows/pages.yml)：

1. 推送到 main 或在 Actions 手动运行。
2. 安装锁定依赖，运行素材测试，构建第一讲与网站。
3. 校验发布白名单、资源链接、锚点及凭据模式。
4. 仅上传 output/site，使用 github-pages 环境部署。

官方 Action 固定到已核实的提交；构建只有仓库读取权限，部署才有 pages:write 和 id-token:write。失败的构建不进入部署，现有成功版本保留。更新流程参考 [GitHub 官方指南](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

不会上传 archive、production 工作记录、Skill、上游源码、依赖、浏览器配置或实验缓存。事实矩阵单独渲染为阅读 HTML。网站没有登录、统计或后端服务。

## 发布固定版本

第一讲标签使用 lesson-01-v1.0.0，与 package.json 的工程版本分开。先验证网站与离线包，再创建指向确定提交的标签和 Release，附上阅读 ZIP、SHA256SUMS.txt 和版本说明。GitHub 自动生成的 Source code 压缩包是工程源码，不是面向读者的精简包。

离线包包含首页、六份材料合并的 HTML、六张插图、11 个独立 SVG、素材索引、事实矩阵、字体及 OFL。完整解压后打开 index.html；本地阅读与搜索不依赖网络，GitHub/Figma 外链需要联网。manifest.sha256.json 记录包内阅读文件的哈希。发布后如需更正，用新版本标签，不静默替换已发布快照。

## 验收与回滚

确认 Actions 的 build/deploy 成功、Pages URL 可访问、主要资源无 404、Release 附件下载哈希一致。回滚网站时正常 revert 有问题的提交并推送 main，或在 main 恢复已验证内容；不要强推历史。暂停自动发布可禁用该工作流。Release 与网站相互独立，回滚网站不修改既有 Release。

公开仓库不自动赋予他人任意转载许可；字体已有 OFL，教材正文和插图的统一许可证需作者另行决定。
