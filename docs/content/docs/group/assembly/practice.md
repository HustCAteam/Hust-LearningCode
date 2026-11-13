---
title: "汇编与调用约定 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：汇编与调用约定](../assembly.md)

## 对照浮点输出的两份汇编

下载两份群友汇编，分别保存为 1i.s 与 1s.s。在 Windows 的 MSYS2 UCRT64 终端中使用 GCC 与 binutils，将它们组装为目标文件并查看带重定位的反汇编：

```sh
gcc -c 1i.s -o wrapped.o
gcc -c 1s.s -o direct.o
objdump -dr wrapped.o
objdump -dr direct.o
objdump -s -j .rdata direct.o
```

预期结果：wrapped.o 的调用重定位包含 _Z6printfPKcz，direct.o 包含 printf；两份 main 都把 long double 临时存储区的地址送入 rdx，.rdata 中的格式字符串是 %.2f。沿 fldt、fstpt、leaq、movq 标出值与地址的流向，再比较格式要求的 double 参数与这里实际准备的指针。

排查：这些是 Windows x86-64、GCC 14.1 产生的汇编，使用 MSYS2 对应工具链；Linux 原生 as 遇到 .seh_* 会报目标格式错误。格式修正应从 C/C++ 调用点开始：long double 对应 %Lf，double 对应 %f；修改后重新生成汇编，比较参数寄存器和临时存储区。


[返回主题目录](../assembly.md)
