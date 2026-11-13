---
title: "PLC 与控制实践 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：PLC 与控制实践](../plc.md)

## 在 PLCSIM 做自保持启停

配合 S7-1200 书籍，使用 TIA Portal 与对应版本 S7-PLCSIM，新建 S7-1200 项目，在 Main [OB1] 建三个 Bool 标签：Start=%I0.0、Stop=%I0.1、Motor=%Q0.0。梯形图使用 Stop 常闭触点串联 Start 与 Motor 常开触点的并联支路，线圈为 Motor。编译后下载到仿真 CPU 并切换 RUN。在监控表将 Start 设为 1 再设回 0，Motor 应保持 1；将 Stop 设为 1，Motor 变为 0。若 Motor 随 Start 归零，检查并联的自保持触点地址是否也为 Q0.0；若停止按钮无效，检查 Stop 触点类型与输入地址。


[返回主题目录](../plc.md)
