<!-- 此页由 scripts/generate.mjs 生成，内容源位于 data/。 -->

# 数据库系统原理

关系模型、SQL、索引、事务与恢复。

## 学习起点

- 建议基础：数据结构与基本编程。
- 动手练习：建立小型选课数据库，比较索引前后的查询计划。
- 华科资料目录：IIB 数据库系统原理。

这里的学习建议由学码群整理，可结合本学期的课堂安排选择内容。

## 华科资料

[打开完整课程目录](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/tree/4a710e81d217c0b30e6968224bb953d11b0aca36/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86) · [查看上游最新版本](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/tree/main/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86)

| 资料 | 文件大小 |
| --- | --- |
| [数据库实验/202404数据库系统原理实践任务书v2\.docx](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AE%9E%E9%AA%8C/202404%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86%E5%AE%9E%E8%B7%B5%E4%BB%BB%E5%8A%A1%E4%B9%A6v2.docx) | 793.1 KiB |
| [2023\_by\_francis/99 复习\(1\)\.ppt](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/2023_by_francis/99%20%E5%A4%8D%E4%B9%A0%281%29.ppt) | 999.0 KiB |
| [markdown整理/整理\.md](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/markdown%E6%95%B4%E7%90%86/%E6%95%B4%E7%90%86.md) | 115.3 KiB |
| [2022级/2024年作业讲解/第一章作业讲解\.ppt](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/2022%E7%BA%A7/2024%E5%B9%B4%E4%BD%9C%E4%B8%9A%E8%AE%B2%E8%A7%A3/%E7%AC%AC%E4%B8%80%E7%AB%A0%E4%BD%9C%E4%B8%9A%E8%AE%B2%E8%A7%A3.ppt) | 189.0 KiB |
| [2022级/2024年作业讲解/第七章作业讲解\.ppt](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/2022%E7%BA%A7/2024%E5%B9%B4%E4%BD%9C%E4%B8%9A%E8%AE%B2%E8%A7%A3/%E7%AC%AC%E4%B8%83%E7%AB%A0%E4%BD%9C%E4%B8%9A%E8%AE%B2%E8%A7%A3.ppt) | 218.5 KiB |
| [2022级/2024年作业讲解/第三章作业讲解\.ppt](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/2022%E7%BA%A7/2024%E5%B9%B4%E4%BD%9C%E4%B8%9A%E8%AE%B2%E8%A7%A3/%E7%AC%AC%E4%B8%89%E7%AB%A0%E4%BD%9C%E4%B8%9A%E8%AE%B2%E8%A7%A3.ppt) | 625.5 KiB |
| [2022级/2024年作业讲解/第九章习题讲解\.ppt](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/2022%E7%BA%A7/2024%E5%B9%B4%E4%BD%9C%E4%B8%9A%E8%AE%B2%E8%A7%A3/%E7%AC%AC%E4%B9%9D%E7%AB%A0%E4%B9%A0%E9%A2%98%E8%AE%B2%E8%A7%A3.ppt) | 525.0 KiB |
| [2022级/2024年作业讲解/第二章作业讲解\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIB%20%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86/2022%E7%BA%A7/2024%E5%B9%B4%E4%BD%9C%E4%B8%9A%E8%AE%B2%E8%A7%A3/%E7%AC%AC%E4%BA%8C%E7%AB%A0%E4%BD%9C%E4%B8%9A%E8%AE%B2%E8%A7%A3.pdf) | 208.9 KiB |

文件标题和大小来自上游目录；打开原文件可查看具体版本与内容。

### 实践项目

- [数据库实验/21级实验\_tqychy](https://gitee.com/tqychy/hust-experiments-on-databases.git)

## 配套自学课程

- [UCB CS186: Introduction to Database System](https://csdiy.wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F/CS186/)
- [CMU 15\-445: Database Systems](https://csdiy.wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%B3%BB%E7%BB%9F/15445/)

先选择一门课，围绕当前最想弄懂的主题阅读讲义并做练习。具体教材、作业和授课网站可从 CS 自学指南的课程页继续查找。

## 学码群资料

欢迎补充与本课程相关的笔记、实验记录和学习资料。

## 一起补充

欢迎分享课堂笔记、实验经验、讲座材料和更清楚的解题思路。请留下你希望展示的名字，以及资料适用的课程和版本；这些信息会随资料一同保留。

[补充资料的方法](../../guide/contributing.md) · [回到课程目录](../index.md)
