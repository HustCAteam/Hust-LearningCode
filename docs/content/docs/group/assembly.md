---
title: "汇编与调用约定"
description: "两份源程序围绕浮点数与 printf 调用展开，分别采用 C++ 包装和直接汇编调用，适合放在一起对照。"
---

两份源程序围绕浮点数与 printf 调用展开，分别采用 C++ 包装和直接汇编调用，适合放在一起对照。

## 怎么开始读

比较参数如何进入寄存器和栈，再观察调用前后的状态。资料页可直接阅读完整源程序，也可以下载到本地调试。

[配套动手练习：步骤、预期结果与排查提示](assembly/practice.md)

本主题收录 2 份资料。

## 源程序

| 资料 | 形式 | 分享者 |
| --- | --- | --- |
| [浮点 printf 调用：C\+\+ 包装汇编](assembly/files/fd6a5423d775.md) | 源程序 · S | Zanoz |
| [浮点 printf 调用：直接调用汇编](assembly/files/a8b0504770f9.md) | 源程序 · S | Zanoz |

## 谢谢分享

Zanoz 等群友在群里留下了这些材料。作者与上传者的署名保留在每份资料中，也欢迎继续补上自己的笔记和阅读经验。

## Hust-opensource-Xuejie 课程补充

[Hust\-opensource\-Xuejie 汇编语言程序设计](../supplement/hust/assembly.md)

[分享资料与补充介绍](../guide/contributing.md)
