---
title: "算法与程序设计竞赛 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：算法与程序设计竞赛](../algorithms.md)

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


[返回主题目录](../algorithms.md)
