---
title: "编译原理"
---

词法、语法、语义、中间表示与代码生成。

## 群友分享

### 编译原理 · 第2版

词法分析、语法分析、语义分析、中间代码、运行环境和优化。

[PDF · 24.46 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/compilers__book__compilers-principles-techniques-and-tools__2nd__68f242244e8b.pdf) · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### 编译器设计 · 第2版

词法语法分析、中间表示、优化、指令选择和寄存器分配。

[PDF · 181.50 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/compilers__book__engineering-a-compiler__2nd__1c9fafb60467.pdf) · 作者：Keith Cooper；Linda Torczon · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

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

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
