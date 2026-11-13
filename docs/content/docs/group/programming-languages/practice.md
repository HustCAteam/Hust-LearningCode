---
title: "程序语言与类型系统 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：程序语言与类型系统](../programming-languages.md)

## 把双向类型判断写成检查函数

先读 Bidirectional Typing 的合成与检查规则。下面让整数合成 Int 类型，并检查注解：

```sh
cat > typing.py <<'PY'
def synth(term):
    if type(term) is int:
        return 'Int'
    raise TypeError('no synthesis rule')
def check(term, expected):
    return synth(term) == expected
print(check(3, 'Int'))
print(check(3, 'Bool'))
PY
python3 typing.py
```

预期结果：输出 True、False。扩展布尔值分支前，先为 True 写一个调用；目前会抛出 no synthesis rule。

排查：Python 的 bool 是 int 的子类，使用 type(term) is int 可将两者分开；按照讲义的判断规则增加分支。


[返回主题目录](../programming-languages.md)
