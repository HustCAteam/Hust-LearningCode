---
title: "软件工程"
---

需求、设计、测试与协作。

## 群友分享

### 重构：改善既有代码的设计 · 第2版

用测试保护行为，通过提炼函数、移动特性和简化条件等重构改善设计。

[PDF · 122.68 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/software-engineering__book__refactoring-improving-the-design-of-existing-code__2nd__f25b94f9ed00.pdf) · 作者：Martin Fowler · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 软件工程：面向对象和传统的方法 · 第8版

软件过程、需求、分析、设计、实现、测试和维护。

[PDF · 109.03 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/software-engineering__book__object-oriented-and-classical-software-engineering__8th__c0ca9a80cb0f.pdf) · 群友分享：bzm

### 软技能：代码之外的生存指南

程序员职业规划、自学、效率、沟通、个人品牌与财务管理。

[PDF · 6.01 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/software-engineering__book__soft-skills-the-software-developers-life-manual__undated__f1458cd3bf60.pdf) · 群友分享：bzm

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

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
