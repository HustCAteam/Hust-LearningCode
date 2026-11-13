---
title: "操作系统 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：操作系统](../operating-systems.md)

## 手算银行家算法再执行安全性检查

阅读群友的安全序列例题。下面使用 3 个进程、1 类资源，available=1，allocation=[1,1,1]，max=[3,2,3]：

```sh
cat > banker.py <<'PY'
allocation = [1, 1, 1]
maximum = [3, 2, 3]
work = 1
finished = set()
sequence = []
while len(finished) < len(allocation):
    for pid in range(len(allocation)):
        if pid not in finished and maximum[pid] - allocation[pid] <= work:
            work += allocation[pid]
            finished.add(pid)
            sequence.append(pid)
            break
    else:
        print('unsafe')
        break
else:
    print('safe', sequence, 'available', work)
PY
python3 banker.py
```

预期结果：输出 safe [1, 0, 2] available 4。把 work 的初值改为 0，输出 unsafe。

排查：need = maximum − allocation；进程完成后释放 allocation。若每轮都选到相同进程，检查 finished 集合。


[返回主题目录](../operating-systems.md)
