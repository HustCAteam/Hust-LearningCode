---
title: "类型系统与形式化验证分享"
---

双向类型检查、归纳与共归纳及形式化验证。

## 群友分享

### Program Verification by Coinduction

ESOP 2018 论文，30 页，提出以操作语义为输入的共归纳验证框架。DOI：10\.1007/978\-3\-319\-89884\-1\_21。

[PDF · 796.2 KiB · 打开下载](../../../../008-%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/programming-languages/talk/programming-languages__talk__Program-Verification-by-Coinduction__2018.pdf) · 作者：Brandon Moore、Lucas Peña、Grigore Roșu · 群友分享：QQ用户

### Bidirectional Typing

ACM Computing Surveys 综述，38 页，讲述类型检查与类型综合两种模式、设计原则与发展脉络。DOI：10\.1145/3450952。

[PDF · 589.5 KiB · 打开下载](../../../../008-%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/programming-languages/talk/programming-languages__talk__Bidirectional-Typing__2021.pdf) · 作者：Jana Dunfield、Neel Krishnaswami · 群友分享：QQ用户

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

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
