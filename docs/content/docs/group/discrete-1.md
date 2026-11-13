---
title: "离散数学(一)"
---

集合、关系、图与离散结构。

## 群友分享

### 离散数学及其应用

逻辑与证明、集合、关系、计数、离散概率、图和树。

[PDF · 85.60 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/discrete-1__book__discrete-mathematics-and-its-applications__undated__216c03ebd914.pdf) · 作者：Kenneth H\. Rosen · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 数学之美

信息论、概率、搜索、语言处理与互联网应用中的数学思想。

[PDF · 50.87 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/discrete-1__book__the-beauty-of-mathematics__undated__5167341ea8c3.pdf) · 作者：吴军 · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

## 枚举命题等价式的真值表

阅读离散数学的命题逻辑章节，验证蕴含式 p→q 与 ¬p∨q：

```sh
python3 - <<'PY'
from itertools import product
for p, q in product([False, True], repeat=2):
    implication = (not p) or q
    contrapositive = q or (not p)
    print(int(p), int(q), int(implication), implication == contrapositive)
PY
```

预期结果：四行的最后一列全为 True，蕴含值依次为 1、1、0、1。再将右式改为 p or (not q)，第三行出现 False。

排查：Python 的 not、and、or 对应逻辑运算；先加括号，把每个子式的值算清楚。

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
