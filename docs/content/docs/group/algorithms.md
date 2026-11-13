---
title: "算法设计与分析"
---

分治、贪心、动态规划与图算法。

## 群友分享

### 算法：C 语言实现·第 5 部分 图算法

图的表示与遍历、最小生成树、最短路径和网络流。

[PDF · 35.50 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__algorithms-in-c-graph-algorithms__part5__0a422f3d28c0.pdf) · 作者：Robert Sedgewick · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 算法图解

二分查找、复杂度、递归、快速排序、散列表、图和动态规划。

[PDF · 17.09 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__grokking-algorithms__undated__52ac403dbcfa.pdf) · 作者：Aditya Bhargava · 群友分享：Cyan

### 算法导论 · 第3版

算法分析、分治、动态规划、贪心、数据结构、图和计算复杂性。

[PDF · 83.17 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__introduction-to-algorithms__3rd__51d63f231ab5.pdf) · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 算法：C 语言实现·第 1—4 部分

基础知识、数据结构、排序与搜索算法。

[PDF · 55.73 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__algorithms-in-c-parts-one-through-four__parts1-4__cc078a5e7eef.pdf) · 作者：Robert Sedgewick · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 算法竞赛入门经典 · 第2版

C\+\+ 竞赛入门、数据结构、搜索、动态规划、图论与数论。

[PDF · 95.47 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__competitive-programming-primer__2nd__9fbcb4dc46f9.pdf) · 作者：刘汝佳 · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 深入浅出程序设计竞赛·进阶篇 · v0\.8

洛谷网校内部资料，涵盖进阶数据结构、图论和动态规划。

[PDF · 77.88 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__programming-contests-in-depth-advanced__advanced-v0.8__c4d54de86a26.pdf) · 作者：洛谷学术组 · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 深入浅出程序设计竞赛·基础篇

竞赛编程基础、模拟、递推、搜索、数据结构和基础算法。

[PDF · 105.89 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__programming-contests-in-depth-basics__basic__01e826ef559b.pdf) · 作者：洛谷学术组；汪楚奇 · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 计算机程序设计艺术·第 1 卷 · 第3版

基本概念、信息结构、链表、树以及算法分析的数学准备。

[PDF · 48.22 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__the-art-of-computer-programming-volume-one__3rd-vol1__1ef4889da3ed.pdf) · 作者：Donald Knuth · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 算法笔记

算法竞赛所需的 C/C\+\+ 基础、数据结构、搜索、动态规划和图算法。

[PDF · 61.20 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__algorithm-notes__undated__782dff784b91.pdf) · 作者：胡凡；曾磊 · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 啊哈算法

排序、栈与队列、搜索、图、最短路径和树的入门实例。

[PDF · 75.90 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__aha-algorithms__undated__072b3bdb4590.pdf) · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 算法（第四版）样章

第四版《算法》的 129 页样章，介绍算法基础、分析方法及 Java 示例。

[PDF · 24.33 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/algorithms__book__algorithms-sample-chapters__4th-sample__5bd8a09e3da2.pdf) · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

## 验证二分查找的循环边界

配合二分查找与复杂度章节，使用左闭右开的区间：

```sh
cat > lower_bound.py <<'PY'
def lower_bound(a, value):
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < value:
            lo = mid + 1
        else:
            hi = mid
    return lo
for a, value in [([], 2), ([1, 2, 2, 4], 2), ([1, 2, 2, 4], 3), ([1, 2], 9)]:
    print(lower_bound(a, value))
PY
python3 lower_bound.py
```

预期结果：依次输出 0、1、3、2，返回第一个大于等于目标值的位置。

排查：若循环停不下来，检查 lo = mid + 1；用 [2,2] 查 2，确认答案落在第一个 2。

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
