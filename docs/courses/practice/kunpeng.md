<!-- 此页由 scripts/generate.mjs 生成，内容源位于 data/。 -->

# 华为基于鲲鹏的即时交流平台开发及调优

服务部署、迁移与性能调优。

## 学习起点

- 建议基础：Linux、数据库与网络。
- 动手练习：记录环境版本、部署命令和优化前后的测量结果。
- 华科资料目录：特——华为基于鲲鹏的即时交流平台开发及调优。

这里的学习建议由学码群整理，可结合本学期的课堂安排选择内容。

## 华科资料

[打开完整课程目录](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/tree/4a710e81d217c0b30e6968224bb953d11b0aca36/%E7%89%B9%E2%80%94%E2%80%94%E5%8D%8E%E4%B8%BA%E5%9F%BA%E4%BA%8E%E9%B2%B2%E9%B9%8F%E7%9A%84%E5%8D%B3%E6%97%B6%E4%BA%A4%E6%B5%81%E5%B9%B3%E5%8F%B0%E5%BC%80%E5%8F%91%E5%8F%8A%E8%B0%83%E4%BC%98) · [查看上游最新版本](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/tree/main/%E7%89%B9%E2%80%94%E2%80%94%E5%8D%8E%E4%B8%BA%E5%9F%BA%E4%BA%8E%E9%B2%B2%E9%B9%8F%E7%9A%84%E5%8D%B3%E6%97%B6%E4%BA%A4%E6%B5%81%E5%B9%B3%E5%8F%B0%E5%BC%80%E5%8F%91%E5%8F%8A%E8%B0%83%E4%BC%98)

| 资料 | 文件大小 |
| --- | --- |
| [关卡1：部署MySQL、Nginx、Hadoop和Hive\_v1\.1\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/%E7%89%B9%E2%80%94%E2%80%94%E5%8D%8E%E4%B8%BA%E5%9F%BA%E4%BA%8E%E9%B2%B2%E9%B9%8F%E7%9A%84%E5%8D%B3%E6%97%B6%E4%BA%A4%E6%B5%81%E5%B9%B3%E5%8F%B0%E5%BC%80%E5%8F%91%E5%8F%8A%E8%B0%83%E4%BC%98/%E5%85%B3%E5%8D%A11%EF%BC%9A%E9%83%A8%E7%BD%B2MySQL%E3%80%81Nginx%E3%80%81Hadoop%E5%92%8CHive_v1.1.pdf) | 1.60 MiB |
| [关卡2：基于鲲鹏代码迁移工具的源码迁移\_v1\.0\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/%E7%89%B9%E2%80%94%E2%80%94%E5%8D%8E%E4%B8%BA%E5%9F%BA%E4%BA%8E%E9%B2%B2%E9%B9%8F%E7%9A%84%E5%8D%B3%E6%97%B6%E4%BA%A4%E6%B5%81%E5%B9%B3%E5%8F%B0%E5%BC%80%E5%8F%91%E5%8F%8A%E8%B0%83%E4%BC%98/%E5%85%B3%E5%8D%A12%EF%BC%9A%E5%9F%BA%E4%BA%8E%E9%B2%B2%E9%B9%8F%E4%BB%A3%E7%A0%81%E8%BF%81%E7%A7%BB%E5%B7%A5%E5%85%B7%E7%9A%84%E6%BA%90%E7%A0%81%E8%BF%81%E7%A7%BB_v1.0.pdf) | 684.1 KiB |
| [关卡3：部署并实现鲲鹏即时交流平台\_v1\.0\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/%E7%89%B9%E2%80%94%E2%80%94%E5%8D%8E%E4%B8%BA%E5%9F%BA%E4%BA%8E%E9%B2%B2%E9%B9%8F%E7%9A%84%E5%8D%B3%E6%97%B6%E4%BA%A4%E6%B5%81%E5%B9%B3%E5%8F%B0%E5%BC%80%E5%8F%91%E5%8F%8A%E8%B0%83%E4%BC%98/%E5%85%B3%E5%8D%A13%EF%BC%9A%E9%83%A8%E7%BD%B2%E5%B9%B6%E5%AE%9E%E7%8E%B0%E9%B2%B2%E9%B9%8F%E5%8D%B3%E6%97%B6%E4%BA%A4%E6%B5%81%E5%B9%B3%E5%8F%B0_v1.0.pdf) | 815.7 KiB |
| [关卡4：基于Hive的数据处理\_v1\.0\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/%E7%89%B9%E2%80%94%E2%80%94%E5%8D%8E%E4%B8%BA%E5%9F%BA%E4%BA%8E%E9%B2%B2%E9%B9%8F%E7%9A%84%E5%8D%B3%E6%97%B6%E4%BA%A4%E6%B5%81%E5%B9%B3%E5%8F%B0%E5%BC%80%E5%8F%91%E5%8F%8A%E8%B0%83%E4%BC%98/%E5%85%B3%E5%8D%A14%EF%BC%9A%E5%9F%BA%E4%BA%8EHive%E7%9A%84%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86_v1.0.pdf) | 853.6 KiB |

文件标题和大小来自上游目录；打开原文件可查看具体版本与内容。

## 配套自学课程

- [MIT\-Missing\-Semester](https://csdiy.wiki/%E7%BC%96%E7%A8%8B%E5%85%A5%E9%97%A8/MIT-Missing-Semester/)

先选择一门课，围绕当前最想弄懂的主题阅读讲义并做练习。具体教材、作业和授课网站可从 CS 自学指南的课程页继续查找。

## 学码群资料

欢迎补充与本课程相关的笔记、实验记录和学习资料。

## 一起补充

欢迎分享课堂笔记、实验经验、讲座材料和更清楚的解题思路。请留下你希望展示的名字，以及资料适用的课程和版本；这些信息会随资料一同保留。

[补充资料的方法](../../guide/contributing.md) · [回到课程目录](../index.md)
