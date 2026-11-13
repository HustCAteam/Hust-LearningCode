---
title: "操作系统设计原理"
---

进程、同步、虚拟内存与文件系统。

## 群友分享

### 操作系统真象还原

在 x86 上构建引导、内核、线程、内存管理、文件系统与用户进程。

[PDF · 27.14 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/operating-systems__book__operating-system-implementation-demystified__undated__a5b9f863ed5b.pdf) · 作者：郑纲 · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 自己动手写操作系统

从引导、保护模式和中断到进程、内存、输入输出与文件系统。

[PDF · 62.93 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/operating-systems__book__write-your-own-operating-system__undated__46442863e7c8.pdf) · 作者：于渊 · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 现代操作系统 · 第4版

进程与线程、内存、文件系统、输入输出、死锁、虚拟化和安全。

[PDF · 184.57 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/operating-systems__book__modern-operating-systems__4th__ba8c1072fcc5.pdf) · 作者：Andrew S\. Tanenbaum；Herbert Bos · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 银行家算法：安全序列例题

从资源总量、最大需求和已分配矩阵计算可用资源，逐步检查进程执行序列，配有例题与计算过程。

[PDF · 290.3 KiB · 打开下载](../../../../006-%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/operating-systems/exercise/operating-systems__exercise__%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%95-%E5%AE%89%E5%85%A8%E5%BA%8F%E5%88%97%E4%BE%8B%E9%A2%98__undated.pdf) · 群友分享：23机械海臻黎

### Vanilla OS：GUADEC 2023 分享

Vanilla OS 在 GUADEC 2023 的项目介绍幻灯片。

[PDF · 26.51 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/operating-systems__talk__vanilla-os-guadec-talk__2023__da5bb252f0f0.pdf) · 群友分享：QQ用户

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

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
