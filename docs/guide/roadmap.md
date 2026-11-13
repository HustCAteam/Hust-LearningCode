# 学习路线

把本学期正在上的课放在中心，再选择一门公开课或一个小项目作补充。下面按照知识之间的联系列出几条路线，进度可以随自己的基础和兴趣调整。

## 编程起步

| 阶段 | 华科资料 | 自学与练习 |
| --- | --- | --- |
| 写出第一个程序 | [C 语言](../courses/programming/c.md)、[计算思维](../courses/programming/computational-thinking.md) | [CS50](https://csdiy.wiki/编程入门/C/CS50/) 或 [CS61A](https://csdiy.wiki/编程入门/Python/CS61A/)，练习函数、递归和调试 |
| 组织程序中的数据 | [数据结构](../courses/programming/data-structures.md) | [CS61B](https://csdiy.wiki/数据结构与算法/CS61B/)，亲手实现线性表、树和图；先熟悉课程使用的 Java |
| 解释程序为什么正确 | [离散数学（一）](../courses/math/discrete-1.md)、[离散数学（二）](../courses/math/discrete-2.md)、[算法](../courses/programming/algorithms.md) | [MIT 6.006](https://csdiy.wiki/数据结构与算法/6.006/)，结合循环不变量、归纳和复杂度分析 |
| 完成一个小项目 | [程序设计课设](../courses/practice/programming-project.md)、[软件工程](../courses/practice/software-engineering.md) | 明确输入输出、拆分模块、添加测试、写运行说明 |

第一份作品可以很小：文本检索、课程表、命令行记账本或一个小游戏。做到能够自己解释、修改和重新运行，就已经积累了实在的经验。

## 计算机系统

建议顺序：C 与数据结构 → 计算机系统基础 → 组成原理与体系结构 → 操作系统 → 网络、数据库或分布式系统。

| 当前问题 | 可以从这里开始 | 一个可检查的结果 |
| --- | --- | --- |
| 程序怎么变成机器指令？ | [计算机系统基础](../courses/systems/computer-systems.md)与 CSAPP | 对照 C、汇编和栈帧解释函数调用 |
| 指令怎样在硬件上执行？ | [计算机组成原理](../courses/hardware/computer-organization.md)与 CS61C | 跟踪一条指令的数据流与控制信号 |
| 系统怎样管理多个程序？ | [操作系统](../courses/systems/operating-systems.md)与 MIT 6.1810 | 在 xv6 中跟踪系统调用、页表和调度 |
| 数据怎样跨过网络？ | [计算机网络](../courses/systems/networks.md)与 CS168 | 解析报文，解释超时、重传和路由 |
| 数据库怎样完成一次查询？ | [数据库](../courses/systems/databases.md)与 CMU 15-445 | 从 SQL 追踪到执行计划、索引和磁盘页 |
| 多核和多机怎样协作？ | [并行计算](../courses/systems/parallel-computing.md)与 [CS149](https://csdiy.wiki/并行与分布式系统/CS149/)；再读 [MIT 6.5840](https://csdiy.wiki/并行与分布式系统/MIT6.824/) | 先测量共享内存程序的并行加速，再分析多机故障、复制和一致性 |

实验开始前记录课程年份、工具链和代码版本。遇到问题时先构造最小例子，保留日志和自己的推理过程。

华科课程页中的自学入口可直接跳转到 CS 自学指南的课程介绍。系统路线可以按兴趣分支：数据库练习 SQL 后再进入 15-445 的存储与执行器；网络先看协议和报文，再做 CS144 的传输层实验；分布式系统接在操作系统、网络与并发编程之后。

## 数据与人工智能

把线性代数、概率统计和 Python 一起用起来，再进入机器学习。可以先做一个小数据集上的线性模型，理解训练、验证、损失函数和评价指标，随后选择视觉或自然语言处理。

- [机器学习](../courses/data/machine-learning-core.md)：用 [CS229](https://csdiy.wiki/机器学习/CS229/) 或 [CS189](https://csdiy.wiki/机器学习/CS189/)补充理论，结合华科讲义逐项推导线性模型与优化方法。
- [计算机视觉](../courses/data/computer-vision.md)：读 [CS231n](https://csdiy.wiki/深度学习/CS231/)，从图像分类和反向传播练习开始。
- [自然语言处理](../courses/data/nlp-core.md)：读 [CS224n](https://csdiy.wiki/深度学习/CS224n/)，先完成词向量与序列模型的小实验。
- [强化学习](../courses/data/reinforcement-learning.md)：掌握概率、梯度优化与神经网络后，进入 [CS285](https://csdiy.wiki/深度学习/CS285/)。
- [大数据分析](../courses/data/big-data-analysis.md)：把算法、数据库和统计连接起来。

每次实验保留数据划分、超参数、随机种子和评价脚本。先建立能复现的基线，再逐项比较改动。

## 图形、硬件与语言

喜欢视觉反馈，可以从[图形学](../courses/data/graphics.md)的变换和三角形开始。喜欢接触真实设备，可以从[数字逻辑](../courses/hardware/digital-logic.md)、[Verilog](../courses/hardware/verilog.md)和[嵌入式](../courses/hardware/embedded-1.md)进入。喜欢研究程序的表达方式，可以把[函数式编程](../courses/programming/functional-programming.md)与[编译原理](../courses/systems/compilers.md)连起来学。

## 一周留下什么

每周选一个具体问题，安排阅读、动手和整理三段时间。留下一个能运行的小结果、一页自己的解释和一个新的问题。遇到同样在学的人时，就用这些东西开始交流。
