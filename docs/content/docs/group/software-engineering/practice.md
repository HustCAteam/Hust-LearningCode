---
title: "软件工程与代码设计 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：软件工程与代码设计](../software-engineering.md)

## 为价格计算写可运行测试

用 Python unittest 把“满 100 减 10”的边界写成具体测试：

```sh
cat > test_price.py <<'PY'
import unittest

def price(total):
    return total - 10 if total >= 100 else total

class PriceTest(unittest.TestCase):
    def test_threshold(self):
        for total, expected in [(0, 0), (99, 99), (100, 90), (101, 91)]:
            with self.subTest(total=total):
                self.assertEqual(price(total), expected)

if __name__ == '__main__':
    unittest.main()
PY
python3 -m unittest -v test_price.py
```

预期结果：输出 test_threshold ... ok 和 OK。把 >= 改为 >，输入 100 的子测试显示 100 != 90。

排查：若显示 Ran 0 tests，检查文件名 test_price.py、方法名前缀 test_ 与类继承 unittest.TestCase。


[返回主题目录](../software-engineering.md)
