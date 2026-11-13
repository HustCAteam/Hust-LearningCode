---
title: "函数式编程"
---

模式匹配、高阶函数、类型与归纳。

## 群友分享

### Real World OCaml · 第2版

OCaml 的类型、模式匹配、模块、函数式数据结构和并发编程。

[PDF · 8.76 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/functional-programming__book__real-world-ocaml__2nd__6d4758932520.pdf) · 作者：Anil Madhavapeddy；Yaron Minsky · 群友分享：QQ用户

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

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
