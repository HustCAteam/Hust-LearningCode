---
title: "计算机系统结构"
---

流水线、缓存、并行性与性能分析。

## 群友分享

### 一种新型通用处理器架构：ZSSC 方案

24 页处理器设计方案，介绍作者提出的 ZSSC、BZCP 与共享功能模块，可结合计算机体系结构课程阅读指令集、资源组织与服务机制。

[PDF · 560.6 KiB · 打开下载](../../../../010-%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90%E4%B8%8E%E7%A1%AC%E4%BB%B6/architecture/talk/architecture__talk__ZSSC%E5%A4%84%E7%90%86%E5%99%A8%E6%9E%B6%E6%9E%84%E6%96%B9%E6%A1%88__undated.pdf) · 作者：祝林、翟冬青 · 群友分享：QQ用户

### 基于功耗计数器的处理器功耗实时估算方法

《高技术通讯》2024 年第 34 卷第 1 期论文，8 页，介绍龙芯 GS364 上的功耗计数器、模型构建和实时估算。DOI：10\.3772/j\.issn\.1002\-0470\.2024\.01\.003。

[PDF · 1.34 MiB · 打开下载](../../../../010-%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90%E4%B8%8E%E7%A1%AC%E4%BB%B6/architecture/talk/architecture__talk__%E5%A4%84%E7%90%86%E5%99%A8%E5%8A%9F%E8%80%97%E8%AE%A1%E6%95%B0%E5%99%A8__2024.pdf) · 作者：贾凡、章隆兵 · 群友分享：QQ用户

### CIMR\-V：面向边缘 AI 的 SRAM 存内计算加速器

ISCAS 2024 论文，5 页，介绍结合 RISC\-V 的端到端 SRAM 存内计算加速器与数据流。DOI：10\.1109/ISCAS58744\.2024\.10558177。

[PDF · 1.22 MiB · 打开下载](../../../../010-%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90%E4%B8%8E%E7%A1%AC%E4%BB%B6/architecture/talk/architecture__talk__CIMR-V%E5%AD%98%E5%86%85%E8%AE%A1%E7%AE%97%E5%8A%A0%E9%80%9F%E5%99%A8__2024.pdf) · 作者：Yan\-Cheng Guo、Tian\-Sheuan Chang、Chih\-Sheng Lin、Bo\-Cheng Chiou、Chih\-Ming Lai、Shyh\-Shyuan Sheu、Wei\-Chung Lo、Shih\-Chieh Chang · 群友分享：QQ用户

## 从群内论文还原一次乘加的数据流

先打开本页 CIMR-V 论文，定位 SRAM 存内计算的结构图，标出输入向量、权重、累加器三条路径。取输入 [1,2]、权重 [3,4]，手算点积为 11；沿论文的数据通路逐级填入乘积 3、8 与累加结果 11。继续阅读处理器功耗估算论文的计数器定义，选取其中一个计数器解释采样窗口与单位。需要先补指令基础时，执行[组成原理的 gcc/objdump 实验](computer-organization.md)。

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
