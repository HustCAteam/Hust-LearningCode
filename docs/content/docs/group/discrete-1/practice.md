---
title: "离散数学与数学阅读 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：离散数学与数学阅读](../discrete-1.md)

## 枚举命题等价式的真值表

阅读离散数学的命题逻辑章节，验证蕴含式 p→q 与 ¬p∨q：

```sh
python3 - <<'PY'
from itertools import product
for p, q in product([False, True], repeat=2):
    implication = (not p) or q
    equivalent = q or (not p)
    print(int(p), int(q), int(implication), implication == equivalent)
PY
```

预期结果：四行的最后一列全为 True，蕴含值依次为 1、1、0、1。再将右式改为 p or (not q)，第三行出现 False。

排查：Python 的 not、and、or 对应逻辑运算；先加括号，把每个子式的值算清楚。


[返回主题目录](../discrete-1.md)
