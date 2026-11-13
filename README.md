# 华科学码群 · 学习手册

把学过的东西留下来，把好资料传下去。

这里是华科学码群共同维护的官方仓库。我们把群友分享的笔记、实验经验和讲座材料按主题整理，也把华科课程资料与公开自学课程连接起来，方便大家从正在学的一门课出发，继续往深处走。

**[在线阅读学习手册](https://hustcateam.github.io/Hust-LearningCode/)** · [GitHub 仓库](https://github.com/HustCAteam/Hust-LearningCode) · [问题与建议](https://github.com/HustCAteam/Hust-LearningCode/issues)

## 从这里开始

- [华科课程目录](docs/courses/index.md)：按主题浏览课程、讲义、实验和复习资料。
- [学码群资料](docs/group/index.md)：查看群内分享及上传者署名。
- [学习路线](docs/guide/roadmap.md)：从编程、数学和系统基础安排自己的学习。
- [自学课程与工具](docs/selfstudy/index.md)：继续探索 CS 自学指南中的课程。
- [培养方案](docs/guide/curriculum.md)：按自己的年级、专业查找学院原始文件。
- [参与补充](CONTRIBUTING.md)：添加资料、分享经验、修正文档或维护链接。

课程索引覆盖上游 74 个课程与专题目录，保留历史年份、专业与班级标记；学习时先对照自己的培养方案，再选择同一版本的讲义、实验和练习。CS 自学指南入口用于补充知识与动手项目，课程页保留两边的原始来源。

## 资料怎么放

| 目录 | 内容 |
| --- | --- |
| [000-计算机基础](000-计算机基础/README.md) | 计算思维、工具与系统入门 |
| [001-计算机语言](001-计算机语言/README.md) | C、C++、Java、Python、函数式编程等 |
| [002-算法和数据结构](002-算法和数据结构/README.md) | 数据结构、算法与程序设计实践 |
| [003-计算机数学](003-计算机数学/README.md) | 微积分、线性代数、离散数学与概率 |
| [004-数据库](004-数据库/README.md) | SQL、索引、事务与数据库实现 |
| [005-计算机网络](005-计算机网络/README.md) | 网络协议与网络编程 |
| [006-操作系统](006-操作系统/README.md) | 进程、内存、文件系统与内核实验 |
| [007-软件工程](007-软件工程/README.md) | 软件构造、测试与项目实践 |
| [008-编译原理](008-编译原理/README.md) | 编译器与程序分析 |
| [009-嵌入式与单片机](009-嵌入式与单片机/README.md) | 单片机、嵌入式系统与外设 |
| [010-计算机组成与硬件](010-计算机组成与硬件/README.md) | 电路、数字逻辑与体系结构 |
| [011-人工智能与数据科学](011-人工智能与数据科学/README.md) | 机器学习、自然语言处理与数据分析 |
| [012-图形学与图像处理](012-图形学与图像处理/README.md) | 图形学、计算机视觉与图像处理 |
| [013-并行与分布式系统](013-并行与分布式系统/README.md) | 并行计算与分布式实践 |
| [014-课程与校园资料](014-课程与校园资料/README.md) | 通识课程、培养方案与升学经验 |
| [A-计算机协会](A-计算机协会/README.md) | 学码群分享、讲座与竞赛交流 |
| `docs/` | 可在线阅读的学习手册 |
| `data/` | 课程、来源与群资料的结构化目录 |
| `scripts/` | 目录生成、资料导入与体积检查 |

群文件放入对应主题下的“课程 / 资料类型”子目录。原名、来源、上传时间、贡献者和校验值记录在 `data/materials.json`。公共课程资料通过具体文件链接访问，便于直接找到所需章节，也保持仓库轻便。

## 感谢每一次分享

一份整理过的笔记、一个补全的实验步骤、一句讲清楚的解释，都可能帮助下一位同学跨过卡住的地方。感谢在群里长期分享资料的朋友，也感谢最初写下这些内容的老师、同学和开源社区成员。

整理时会一同保留作者、群文件上传者和后续整理者的贡献。欢迎留下你希望展示的名字；我们会把署名放在资料旁边。补充旧资料来源、修复链接和纠正错误，也同样值得被记录。

特别感谢 [Sukuna 与 Hust-opensource-Xuejie 的贡献者](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/graphs/contributors)、[PKUFlyingPig 与 CS 自学指南的贡献者](https://github.com/PKUFlyingPig/cs-self-learning/graphs/contributors)。这份手册的课程入口建立在他们持续整理的资料之上。

## 维护与预览

需要 Node.js 22 或更新版本。

```bash
npm install
npm run generate
npm run check
npm test
npm run docs:dev
```

`npm run docs:build` 生成静态站点。GitHub Actions 负责构建和 Pages 发布，配置方法见[维护与部署](docs/guide/maintenance.md)。

资料目录核对日期：2026-11-13。完整来源和版本见[来源与版本](docs/guide/sources.md)。
