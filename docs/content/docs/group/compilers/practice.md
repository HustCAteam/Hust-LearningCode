---
title: "编译原理 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：编译原理](../compilers.md)

## 为算术表达式写词法分析器

配合词法分析章节，把输入拆成整数、加号、乘号和括号：

```sh
cat > lexer.py <<'PY'
import re
source = '12 + 3 * (4 + 5)'
pattern = re.compile(r'\s*(?:(\d+)|([+*()]))')
pos = 0
tokens = []
while pos < len(source):
    match = pattern.match(source, pos)
    if not match:
        raise ValueError(f'invalid token at {pos}')
    tokens.append(('INT', int(match[1])) if match[1] else (match[2], match[2]))
    pos = match.end()
print(tokens)
PY
python3 lexer.py
```

预期结果：输出以 ('INT', 12)、('+', '+') 开头的 9 个 token。语法树按乘法优先解析，表达式值为 39。把 + 改为 @，错误位置为 2。

排查：若空格触发错误，检查模式开头的 \s*；若 12 被拆为两个 token，检查整数分支的 +。


[返回主题目录](../compilers.md)
