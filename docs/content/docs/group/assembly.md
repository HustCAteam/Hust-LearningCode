---
title: "汇编语言程序设计"
---

指令、寄存器、栈与调用约定。

## 群友分享

### 浮点 printf 调用：C\+\+ 包装汇编

GCC 14\.1 的 Windows x86\-64 汇编，使用 x87 加载 long double，并经 C\+\+ printf 包装调用 MinGW 输出。

[S · 1.7 KiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/assembly__source__floating-point-printf-cpp-wrapper-assembly__gcc14.1__fd6a5423d775.s) · 群友分享：Zanoz

### 浮点 printf 调用：直接调用汇编

与 1i\.s 对照的 x86\-64 汇编，保留相同浮点加载与参数准备，直接调用 printf。

[S · 0.8 KiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/assembly__source__floating-point-printf-direct-call-assembly__gcc14.1__a8b0504770f9.s) · 群友分享：Zanoz

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

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
