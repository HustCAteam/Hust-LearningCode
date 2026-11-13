<!-- 此页由 scripts/generate.mjs 生成，内容源位于 data/。 -->

# 函数式编程

模式匹配、高阶函数、类型与归纳。

## 学习起点

- 建议基础：递归与一门命令式语言。
- 动手练习：用 map、fold 和递归分别处理列表，并说明类型。
- 华科资料目录：IIIA 函数式编程。

这里的学习建议由学码群整理，可结合本学期的课堂安排选择内容。

## 华科资料

[打开完整课程目录](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/tree/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B) · [查看上游最新版本](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/tree/main/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B)

| 资料 | 文件大小 |
| --- | --- |
| [Lecture 1\-函数式编程概述\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/Lecture%201-%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E6%A6%82%E8%BF%B0.pdf) | 2.35 MiB |
| [Lecture 2\-ML编程基础\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/Lecture%202-ML%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80.pdf) | 392.3 KiB |
| [Lecture 3\-ML编程基础与进阶\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/Lecture%203-ML%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80%E4%B8%8E%E8%BF%9B%E9%98%B6.pdf) | 564.5 KiB |
| [Lecture 4\-List结构的编程\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/Lecture%204-List%E7%BB%93%E6%9E%84%E7%9A%84%E7%BC%96%E7%A8%8B.pdf) | 421.7 KiB |
| [Lecture 5\-Tree程序性能分析、类型推导和多态\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/Lecture%205-Tree%E7%A8%8B%E5%BA%8F%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90%E3%80%81%E7%B1%BB%E5%9E%8B%E6%8E%A8%E5%AF%BC%E5%92%8C%E5%A4%9A%E6%80%81.pdf) | 445.4 KiB |
| [Lecture 6\-高阶函数\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/Lecture%206-%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0.pdf) | 456.7 KiB |
| [Lecture 7\-函数柯里化及编程实践\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/Lecture%207-%E5%87%BD%E6%95%B0%E6%9F%AF%E9%87%8C%E5%8C%96%E5%8F%8A%E7%BC%96%E7%A8%8B%E5%AE%9E%E8%B7%B5.pdf) | 543.5 KiB |
| [函数式编程实验/exp 1\.pptx](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E5%AE%9E%E9%AA%8C/exp%201.pptx) | 92.8 KiB |

文件标题和大小来自上游目录；打开原文件可查看具体版本与内容。

### 实践项目

- [21级作业\_tqychy](https://gitee.com/tqychy/hust-functional-programming-assignment.git)
- [21级实验\_tqychy](https://gitee.com/tqychy/hust-functional-programming-experiment)

## 配套自学课程

- [Cornell CS3110: OCaml Programming Correct \+ Efficient \+ Beautiful](https://csdiy.wiki/%E7%BC%96%E7%A8%8B%E5%85%A5%E9%97%A8/Functional/CS3110/)

先选择一门课，围绕当前最想弄懂的主题阅读讲义并做练习。具体教材、作业和授课网站可从 CS 自学指南的课程页继续查找。

## 学码群资料

欢迎补充与本课程相关的笔记、实验记录和学习资料。

## 一起补充

欢迎分享课堂笔记、实验经验、讲座材料和更清楚的解题思路。请留下你希望展示的名字，以及资料适用的课程和版本；这些信息会随资料一同保留。

[补充资料的方法](../../guide/contributing.md) · [回到课程目录](../index.md)
