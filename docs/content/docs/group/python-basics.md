---
title: "Python 语言与对象协议"
---

Python 数据模型、容器、迭代器、函数与协程。

## 群友分享

### 流畅的 Python

Python 数据模型、序列、映射、函数、迭代器、协程与对象协议。

[PDF · 14.53 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/python-basics__book__fluent-python__undated__10bfbaf44bc1.pdf) · 群友分享：Cyan

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

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
