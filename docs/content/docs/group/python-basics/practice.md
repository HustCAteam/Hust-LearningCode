---
title: "Python · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：Python](../python-basics.md)

## 统计 Unicode 单词

阅读 Python 书籍的字符串、字典与 Counter 章节。Python 3 下创建 words.py：

```sh
cat > words.py <<'PY'
from collections import Counter
text = "群友 Python 群友 C Python 群友"
for word, count in Counter(text.split()).most_common():
    print(word, count)
PY
python3 words.py
```

预期结果：输出三行：群友 3、Python 2、C 1。把输入改为一个空字符串，输出为空。

排查：若中文显示异常，用 UTF-8 保存文件；把 split() 改成 split(" ") 后试两个连续空格，观察空单词如何进入计数。


[返回主题目录](../python-basics.md)
