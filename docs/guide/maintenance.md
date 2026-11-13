# 维护与部署

## 日常更新

使用 Node.js 22 或更新版本与 npm，在仓库根目录操作：

```sh
npm ci
npm run generate
npm test
npm run check
npm run docs:build
```

`generate` 从 `data/` 生成课程页、专题页、主题目录 README、首页检索数据与资料下载副本。`docs:build` 会重新生成并检查本地链接、资料元数据、SHA-256 和容量，再构建 VitePress。阅读站点可用 `npm run docs:dev` 预览；查看构建结果可用 `npm run docs:preview`。

课程信息维护在 `data/courses.json`，群内独立专题维护在 `data/topics.json`，自学入口维护在 `data/selfstudy.json`。群资料元数据维护在 `data/materials.json`，来源版本维护在 `data/sources.json`。生成页面顶部有生成说明，更新时请修改对应数据。

专题沿用课程字段，并填写 `localOnly: true`、`upstreamPath: null` 和已有主题存储目录 `storageDirectory`；`files`、`projects` 使用空数组。专题可搭配 `selfstudy` 中的课程入口。首页将上游课程目录与群内专题分别计数。

## 资料与容量

归档文件保存在仓库主题目录，按“课程 / 资料类型 / 结构化文件名”排列。保留原始文件名、群文件上传日期、上传者、已知作者和用途；上传日期与内容年份分别记录。导入方式见[补充资料](./contributing.md)。

单份资料上限 **10 MiB**，仓库工作区内容上限 **80 MiB**。这两个数值是当前维护约定，统一定义在 `scripts/lib.mjs`。检查排除依赖、构建产物、本地过程文件和下载副本；Git 历史占用需在维护时另行关注。较大的课程资料保留来源链接，压缩包先展开并选择有学习用途的文档或源码。

PDF、Office 文档等小文件使用普通 Git 保存，GitHub 与 Pages 都能取得实际内容。克隆仓库即可获得登记的资料原件或阅读版。

## 两种阅读入口

仓库 Markdown 使用指向真实归档文件的相对链接，在 GitHub 中可直接浏览。VitePress 构建时只把登记过的资料链接转换为 `/Hust-LearningCode/materials/…`，源码和 Markdown 资料按文件下载处理，普通文档链接保持原有行为。

每次生成都会清空并重建 `docs/public/materials/`。该目录只用于静态站点，已加入忽略规则；请在原始主题目录更新文件，并同步元数据，再重新生成。撤下资料时同时移除原文件与登记记录，下一次生成会清除旧下载副本。

`inbox/`、`.local/` 和根目录的 `HANDOFF.md` 保存本地导入与交接过程，均已忽略。公开提交中保留资料、数据、源文档和需要的生成页面。

## 自动检查与发布

`.github/workflows/ci.yml` 在推送和 Pull Request 中安装锁定依赖，执行回归测试、资料检查与站点构建。

仓库管理员首次发布时，在 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。向 `main` 推送后，`.github/workflows/pages.yml` 会构建站点、上传 Pages 制品并部署；也可在 Actions 页面手动运行。发布任务使用 `github-pages` 环境，仓库可在该环境中设置审批规则。

阅读地址：[华科学码群学习手册](https://hustcateam.github.io/Hust-LearningCode/)。站点 base 固定为 `/Hust-LearningCode/`，若仓库改名，请同步修改 `docs/.vitepress/config.mjs` 中的 base 与 sitemap 地址。首页、导航和资料下载会使用同一 base。

部署失败时先查看 Actions 中最早失败的步骤：资料检查输出具体路径，VitePress 输出文档解析或链接位置，Pages 部署输出权限与环境信息。修正源文件后重新推送即可。
