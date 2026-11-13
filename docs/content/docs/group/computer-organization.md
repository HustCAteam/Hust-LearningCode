---
title: "计算机组成原理"
---

指令系统、CPU、存储层次与 I/O。

## 群友分享

### 编码：隐匿在计算机软硬件背后的语言

从编码、电路和逻辑门构建处理器、存储器及计算机。

[PDF · 15.73 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/computer-organization__book__code-the-hidden-language-of-computer-hardware-and-software__undated__249786274d83.pdf) · 作者：Charles Petzold · 群友分享：Cyan

## 从 C 函数找到机器指令

Linux x86-64、GCC 与 GNU binutils 环境中创建 add.c，比较优化前后的指令：

```sh
cat > add.c <<'C'
int add(int a, int b) { return a + b; }
C
gcc -O0 -g -c add.c -o add-o0.o
gcc -O2 -c add.c -o add-o2.o
objdump -d -Mintel add-o0.o
objdump -d -Mintel add-o2.o
```

预期结果：两份反汇编都含 add 符号和 ret；x86-64 GCC 的 -O2 常用 lea eax,[rdi+rsi] 完成加法。对照教材解释寄存器、操作数与返回值。

排查：其他架构使用 objdump -d，去掉 -Mintel；找不到 objdump 时安装 binutils。-c 生成目标文件，无需 main。

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
