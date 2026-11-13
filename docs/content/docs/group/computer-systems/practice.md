---
title: "计算机系统与 Linux · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：计算机系统与 Linux](../computer-systems.md)

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


[返回主题目录](../computer-systems.md)
