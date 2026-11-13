---
title: "S7-1200 PLC 编程与应用"
---

PLC 硬件、梯形图、定时器、顺序控制和通信。

## 群友分享

### S7\-1200 PLC 编程及应用

S7\-1200 硬件、指令、梯形图、顺序控制、通信及应用实例。

[PDF · 40.74 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/plc__book__s7-1200-plc-programming-and-applications__undated__1ee98d83b6e3.pdf) · 作者：廖常初 · 群友分享：国光 Stephen\(O李子/codex嘉豪\)

## 在 PLCSIM 做自保持启停

配合 S7-1200 书籍，使用 TIA Portal 与对应版本 S7-PLCSIM，新建 S7-1200 项目，在 Main [OB1] 建三个 Bool 标签：Start=%I0.0、Stop=%I0.1、Motor=%Q0.0。梯形图使用 Stop 常闭触点串联 Start 与 Motor 常开触点的并联支路，线圈为 Motor。编译后下载到仿真 CPU 并切换 RUN。在监控表将 Start 设为 1 再设回 0，Motor 应保持 1；将 Stop 设为 1，Motor 变为 0。若 Motor 随 Start 归零，检查并联的自保持触点地址是否也为 Q0.0；若停止按钮无效，检查 Stop 触点类型与输入地址。

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
