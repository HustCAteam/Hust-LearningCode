<!-- 此页由 scripts/generate.mjs 生成，内容源位于 data/。 -->

# 操作系统设计原理

进程、同步、虚拟内存与文件系统。

## 学习起点

- 建议基础：C 语言、汇编与计算机系统基础。
- 动手练习：跟踪一个系统调用，再给教学内核增加一个小功能。
- 华科资料目录：IIIA 操作系统设计原理。

这里的学习建议由学码群整理，可结合本学期的课堂安排选择内容。

## 华科资料

[打开完整课程目录](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/tree/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86) · [查看上游最新版本](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/tree/main/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86)

| 资料 | 文件大小 |
| --- | --- |
| [23级作业/第4章\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86/23%E7%BA%A7%E4%BD%9C%E4%B8%9A/%E7%AC%AC4%E7%AB%A0.pdf) | 430.9 KiB |
| [23级作业/第5章\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86/23%E7%BA%A7%E4%BD%9C%E4%B8%9A/%E7%AC%AC5%E7%AB%A0.pdf) | 261.6 KiB |
| [23级作业/第6章\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86/23%E7%BA%A7%E4%BD%9C%E4%B8%9A/%E7%AC%AC6%E7%AB%A0.pdf) | 148.8 KiB |
| [23级作业/第7章\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86/23%E7%BA%A7%E4%BD%9C%E4%B8%9A/%E7%AC%AC7%E7%AB%A0.pdf) | 295.3 KiB |
| [23级作业/第8章\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86/23%E7%BA%A7%E4%BD%9C%E4%B8%9A/%E7%AC%AC8%E7%AB%A0.pdf) | 233.2 KiB |
| [23级作业/第9章\.pdf](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86/23%E7%BA%A7%E4%BD%9C%E4%B8%9A/%E7%AC%AC9%E7%AB%A0.pdf) | 8.73 MiB |
| [23级作业/习题答案/第1章习题及答案\.docx](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86/23%E7%BA%A7%E4%BD%9C%E4%B8%9A/%E4%B9%A0%E9%A2%98%E7%AD%94%E6%A1%88/%E7%AC%AC1%E7%AB%A0%E4%B9%A0%E9%A2%98%E5%8F%8A%E7%AD%94%E6%A1%88.docx) | 39.4 KiB |
| [23级作业/习题答案/第2章习题及答案\.docx](https://github.com/SukunaShinmyoumaru-hust/Hust-opensource-Xuejie/blob/4a710e81d217c0b30e6968224bb953d11b0aca36/IIIA%20%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%8E%9F%E7%90%86/23%E7%BA%A7%E4%BD%9C%E4%B8%9A/%E4%B9%A0%E9%A2%98%E7%AD%94%E6%A1%88/%E7%AC%AC2%E7%AB%A0%E4%B9%A0%E9%A2%98%E5%8F%8A%E7%AD%94%E6%A1%88.docx) | 16.7 KiB |

文件标题和大小来自上游目录；打开原文件可查看具体版本与内容。

### 实践项目

- [21级作业\_tqychy](https://gitee.com/tqychy/operating-system-assignment.git)
- [21级实验\_课设\_tqychy](https://gitee.com/tqychy/hust-operating-system-experiment.git)

## 配套自学课程

- [MIT 6\.1810 \(6\.S081\): Operating System Engineering](https://csdiy.wiki/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/MIT6.S081/)
- [UCB CS162: Operating Systems and Systems Programming](https://csdiy.wiki/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/CS162/)
- [NJU OS: Operating System Design and Implementation](https://csdiy.wiki/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/NJUOS/)

先选择一门课，围绕当前最想弄懂的主题阅读讲义并做练习。具体教材、作业和授课网站可从 CS 自学指南的课程页继续查找。

## 学码群资料

### 银行家算法：安全序列例题

[打开或下载资料](../../../006-%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/operating-systems/exercise/operating-systems__exercise__%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%95-%E5%AE%89%E5%85%A8%E5%BA%8F%E5%88%97%E4%BE%8B%E9%A2%98__undated.pdf) · 290.3 KiB

- 原始文件名：银行家算法\.pdf
- 群文件上传日期：2024\-03\-22
- 群文件上传者：23机械海臻黎

从资源总量、最大需求和已分配矩阵计算可用资源，逐步检查进程执行序列，配有例题与计算过程。


## 一起补充

欢迎分享课堂笔记、实验经验、讲座材料和更清楚的解题思路。请留下你希望展示的名字，以及资料适用的课程和版本；这些信息会随资料一同保留。

[补充资料的方法](../../guide/contributing.md) · [回到课程目录](../index.md)
