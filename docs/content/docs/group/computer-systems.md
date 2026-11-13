---
title: "计算机系统基础"
---

数据表示、汇编、链接、缓存与进程。

## 群友分享

### 深入理解计算机系统 · 第3版

机器级程序、处理器、存储层次、链接、异常、虚拟内存与并发。

[PDF · 87.17 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/computer-systems__book__computer-systems-a-programmers-perspective__3rd__a1a8b38b00a0.pdf) · 作者：Randal E\. Bryant；David R\. O’Hallaron · 群友分享：Cyan

### 鸟哥的 Linux 私房菜·基础学习篇 · 第4版

Linux 安装、文件权限、Shell、文本处理、进程和系统管理。

[PDF · 26.45 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/computer-systems__book__vbird-linux-basic-learning__4th__938d751a4342.pdf) · 作者：鸟哥 · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

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
