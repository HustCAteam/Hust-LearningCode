---
title: 四周动手学习安排
---

每周以一份群资料和一个可运行任务为起点。已经学过的部分可以直接跳到后面的任务。

## 第一周：循环、数组与调试

1. 在 [C 语言群资料](../group/c.md)中读循环实验与教材对应章节，创建 sum.c，输入上界 5 时输出 15。
2. 完成[工具练习](tools.md#c-数组越界与-addresssanitizer)的 bounds.c。ASan 应定位到 sum 函数中的越界读；用 GDB 在 i=3 时停住，数组应显示 {10,20,30}。
3. 打开[C++ 群源程序](../group/cpp.md)，完成数组删除，将 1 2 3 4 5 的下标 2 删除后输出 1 2 4 5。

## 第二周：数据结构与算法

使用 Python 3 写一个栈检查器，依次输入 ([])、([)]、(、空字符串，预期结果为 True、False、False、True。实现时左括号入栈、右括号匹配栈顶、结束时判断空栈。接着写左闭右开二分查找：对 [1,2,2,4] 查找 2 的插入位置应为 1，查找 3 应为 3；空数组查任意值返回 0。配合群友分享教材的栈与查找章节推导这些边界。

## 第三周：网络与数据库

完成[HTTP 实验](tools.md#本地-http-请求)，从 /index.txt 的响应中找到 200、text/plain 与 Content-Length: 14，再请求 /missing 得到 404。随后运行同页 students.sql，查询 CS 专业得到 A|85 与 C|78；建立索引后查询计划由 SCAN 改为 SEARCH；ROLLBACK 后 A 的分数仍为 85。

## 第四周：操作系统与项目

阅读[银行家算法群例题](../group/operating-systems.md)，执行专题里的 banker.py：available=1 时安全序列为 [1,0,2]，available=0 时输出 unsafe。然后为学生成绩管理写一个 Python unittest：在事务里把 85 更新为 100，ROLLBACK 后查询值应等于 85。把查询模块与命令行输入分开，使用 python3 -m unittest 运行这个场景。

## 继续进入硬件

[51 单片机](../group/mcs51.md)专题给出 12 MHz、12T 内核下的定时器重装值 0xFC18 与逻辑分析仪观察方法。按群内实验板课件连接 GPIO，再做 1 ms 中断与约 2 ms 方波周期实验。
