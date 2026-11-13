---
title: "C 语言 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：C 语言](../c.md)

## 从循环题跑到边界错误

先做主题目录中的《实验三：循环程序设计》的循环题，再打开[工具练习](../../guide/tools.md#c-数组越界与-addresssanitizer)的 bounds.c，运行 GCC AddressSanitizer 和 GDB。创建 sum.c：

```sh
cat > sum.c <<'C'
#include <stdio.h>
int main(void) {
    int sum = 0;
    for (int i = 1; i <= 5; ++i) sum += i;
    printf("%d\n", sum);
}
C
gcc -std=c17 -Wall -Wextra -g sum.c -o sum
./sum
```

预期结果：输出 15。把上界改为 0，输出 0；改为 1，输出 1。

排查：若编译器报告缺少分号，定位到错误行的上一句；若得到 10，检查循环条件是否包含 5。


[返回主题目录](../c.md)
