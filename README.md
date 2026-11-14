# 学码群 · 共同的计算机书架

这是华中科技大学学码群的资料库。群友分享的教材、课堂笔记、讲义、试题与程序，在这里按主题整理，供大家继续阅读和实践。

**[打开网站](https://hustcateam.github.io/Hust-LearningCode/)** · [资料目录](docs/content/docs/group/index.md) · [共同书架](docs/content/docs/books/index.md) · [贡献与致谢](docs/content/docs/guide/credits.md)

## 从哪里开始

想找一门课的材料，可以先进入主题。每个主题介绍收录内容和阅读顺序，再按资料形式列出文件。每份文件都有独立页面，保留内容简介、作者、群文件上传者、原始文件名与下载入口。

| 想看的内容 | 入口 |
| --- | --- |
| C、C++、Java、Python 与函数式编程 | [编程与语言](001-计算机语言/README.md) |
| 数据结构、算法与竞赛 | [算法和数据结构](002-算法和数据结构/README.md) |
| 进程、内存与内核实现 | [操作系统](006-操作系统/README.md) |
| 协议、网络教材与抓包 | [计算机网络](005-计算机网络/README.md) |
| 51 单片机、外设与控制实践 | [嵌入式与单片机](009-嵌入式与单片机/README.md) |
| 系统、组成与处理器 | [计算机基础](000-计算机基础/README.md) · [硬件](010-计算机组成与硬件/README.md) |
| 数据库、编译器与软件设计 | [数据库](004-数据库/README.md) · [编译原理](008-编译原理/README.md) · [软件工程](007-软件工程/README.md) |
| 想先找讲义、试题或代码 | [按资料形式查找](docs/content/docs/formats/index.md) |

[第一次来](docs/content/docs/guide/start.md)介绍几种进入资料库的方式。[C++ 调试手记](docs/content/docs/guide/cpp-debugging.md)配合群里分享的五份程序，把问题、输入与结果放在一起。[动手工具](docs/content/docs/guide/tools.md)提供编译、调试、HTTP 和数据库的小练习。

## 把你的收获留下

感谢每一位在群里上传资料的同学。十份单片机讲义、一次耐心整理的复习笔记、一段还在调试的代码，都让后来者多了一个起点。[贡献页](docs/content/docs/guide/credits.md)按实际分享记录列出群友与材料；作者、上传者与整理者的署名也随资料保留。

欢迎继续补充材料，写下读后体会，或者完善一句内容介绍。请在提交时留下希望展示的名字与主页，我们会把你的贡献一起记录。具体方式见[参与分享](CONTRIBUTING.md)。

## 延伸阅读

- [Hust-opensource-Xuejie 华科课程补充](docs/content/docs/supplement/hust/index.md)：Sukuna 与项目贡献者整理的华科讲义、试题与实验。
- [CSdiy 自学课程补充](docs/content/docs/supplement/csdiy/index.md)：PKUFlyingPig 与指南贡献者整理的公开课程和学习经验。

## 本地维护

站点使用 Astro 与 [CelestialDocs](https://github.com/HYP3R00T/CelestialDocs) 的原始组件。资料记录在 `data/materials.json`，主题介绍在 `data/editorial.json`，资料页、目录与署名页由同一份数据生成。大文件沿用仓库 Releases，轻量文件放在对应学科目录。

使用 `.node-version` 指定的 Node.js 版本，与 CI 和 Pages 保持一致。

```sh
npm ci
npm run docs:dev
```

提交前运行 `npm test`、`npm run typecheck` 与 `npm run docs:build`。组件来源与适配说明见 [主题维护说明](docs/THEME.md)。
