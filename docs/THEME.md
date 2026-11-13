# CelestialDocs 主题维护

上游：[HYP3R00T/CelestialDocs](https://github.com/HYP3R00T/CelestialDocs)，基准提交 `113648b6edaa2a14139a47a2a1d1e9aa883b4934`。MIT 许可保存在 [CELESTIALDOCS-LICENSE](CELESTIALDOCS-LICENSE)。

原始组件位于 `docs/components`，包括 Header、CommandPalette、DocsTabs、Sidebar、Breadcrumb、TableOfContents、ThemeToggle、LayoutWidthToggle、Button、Dialog 与 CodeCopyButton。阅读页面使用原主题 BaseLayout 和 DocsLayout，导航使用其 `buildNavigation` 管线。

适配内容包括中文界面、CA logo、GitHub Pages 子路径、群资料搜索筛选、每页 SEO、面包屑地址、移动端导航与搜索的可访问性。`docs/styles/global.css` 保留上游样式，`docs/styles/learningcode.css` 设置 CA 配色、中文排版与首页内容布局。首页复用 BaseLayout、Icon 和 Button 的样式系统。

目录页的 `CatalogCards` 从上游首页 Features 区提取卡片网格，沿用 `bg-popover`、`rounded-lg`、`p-6` 与主题颜色，补充链接、数量、署名与响应式间距。`CatalogPage` 组合分类卡片、贡献者卡片和带连接线的阅读步骤。上游没有独立的卡片或导图组件；这些组合复用其现有样式和图标体系，采用静态 HTML 输出。

外部来源使用 `SourceLabel` 统一渲染：`Hust-opensource-Xuejie` 与 `CSdiy` 为无方括号的徽标，覆盖首页、标题、卡片、侧栏、面包屑、页内目录和搜索。Markdown 正文链接通过 `remark-links.mjs` 使用相同的 `source-tag` 样式；原始文本保留来源名称以便检索。

## 内容结构

- `data/materials.json`：文件信息、作者、上传者、原件地址与校验值。
- `data/editorial.json`：各主题的介绍和阅读建议。
- `data/library-sections.json`：学码群资料的六个分类与主题顺序。
- `scripts/generate.mjs`：生成主题、单份资料、书架、形式索引、署名与补充资料页。
- `scripts/catalog-views.mjs` → `data/catalog-views.json`：从同一份资料元数据生成页面卡片与结构展示。网站路由和搜索共同读取这里的章节信息，保持目录与搜索锚点一致。
- `data/navigation.json`、`data/site-catalog.json`：生成的导航和首页数据。
- `docs/content/docs/guide`：人工维护的阅读与实践文章，其中贡献页随资料生成。
- `scripts/plans.mjs`：主题配套练习，独立生成到 `group/<主题>/practice`，从主题页和四周练习进入。

每次开发和构建先运行生成器。单份资料页使用文件校验值前缀作为稳定地址，标题或简介调整时地址保持一致。网站继续使用 `/Hust-LearningCode/`，已有主题和指南地址保持可访问。

## 验证

`npm test` 验证资料校验、文件链接、来源标签与生成关系；`npm run typecheck` 检查类型；`npm run docs:build` 检查仓库体积、内部链接并生成静态站点。GitHub Actions 使用相同的构建命令发布 Pages。
