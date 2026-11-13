---
title: "数据结构 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：数据结构](../data-structures.md)

## 用栈检查括号匹配

配合栈章节，将每个左括号压栈，遇到右括号时检查栈顶：

```sh
cat > brackets.py <<'PY'
def valid(text):
    stack = []
    pairs = {')': '(', ']': '['}
    for char in text:
        if char in '([':
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    return not stack
for text in ['([])', '([)]', '(', '']:
    print(repr(text), valid(text))
PY
python3 brackets.py
```

预期结果：四个布尔值依次为 True、False、False、True。

排查：若单独一个右括号导致 IndexError，把空栈判断放在 pop() 前；若左括号单独出现仍为 True，检查结束时栈是否为空。


[返回主题目录](../data-structures.md)
