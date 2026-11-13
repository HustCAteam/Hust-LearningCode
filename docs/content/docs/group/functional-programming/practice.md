---
title: "函数式编程与 OCaml · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：函数式编程与 OCaml](../functional-programming.md)

## 用 OCaml 模式匹配处理列表

安装 OCaml 后，把以下内容写入 sum.ml，配合 Real World OCaml 的列表与递归章节：

```sh
cat > sum.ml <<'ML'
let rec sum = function
  | [] -> 0
  | head :: tail -> head + sum tail
let () = Printf.printf "%d\n" (sum [1; 2; 3; 4])
ML
ocaml sum.ml
```

预期结果：输出 10。将输入改为 []，输出 0；改为 [-2; 5]，输出 3。

排查：列表元素用分号分隔；出现模式匹配不完整警告时检查 [] 分支。


[返回主题目录](../functional-programming.md)
