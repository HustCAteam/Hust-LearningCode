---
title: 工具实作：从报错到查询计划
---

以下示例使用 Linux 终端、GCC、GDB、Python 3、curl 与 SQLite。Ubuntu / WSL Ubuntu 可执行 `sudo apt install build-essential gdb python3 curl sqlite3`；Arch Linux 使用 `sudo pacman -S gcc gdb python curl sqlite`。

## C 数组越界与 AddressSanitizer

新建目录并写入完整的 `bounds.c`：

```sh
mkdir -p learning-lab
cd learning-lab
cat > bounds.c <<'C'
#include <stdio.h>
int sum(const int *a, int n) {
    int total = 0;
    for (int i = 0; i <= n; ++i) {
        total += a[i];
    }
    return total;
}
int main(void) {
    int a[] = {10, 20, 30};
    printf("%d\n", sum(a, 3));
    return 0;
}
C
gcc -std=c17 -Wall -Wextra -g -O0 -fsanitize=address -fno-omit-frame-pointer bounds.c -o bounds-asan
./bounds-asan
```

预期报错包含 `AddressSanitizer: stack-buffer-overflow`、`READ of size 4` 与 `sum` 中的 `bounds.c:5`。第 4 行循环条件允许 i=3，而数组有效下标为 0、1、2。将 `i <= n` 改为 `i < n`，用相同命令重新编译运行，输出应为 `60`。

若出现 `gcc: command not found`，安装上面的编译工具；若出现无法加载 `libasan`，安装与 GCC 配套的运行库。错误中的内存地址随每次运行变化，定位时使用函数名和源码行号。

## GDB 查看下标与调用栈

先使用原始的 `i <= n` 版本，生成独立的调试程序：

```sh
gcc -std=c17 -g -O0 bounds.c -o bounds-debug
gdb ./bounds-debug
```

在 GDB 提示符内输入：

```text
break bounds.c:5 if i == 3
run
print i
print n
print a[0]@3
backtrace
```

预期停在第 5 行，`i` 与 `n` 均为 3，数组显示 `{10, 20, 30}`。调用栈包含 `sum` 和 `main`。输入 `quit` 退出，修正循环条件后再执行 ASan 版本，输出 `60`。

若断点报告找不到源文件，确认当前目录有 bounds.c，并重新使用 `-g -O0` 编译；如果 GDB 显示变量 optimized out，检查优化参数。GDB 的 `$1` 等编号随 print 次数递增。

## 本地 HTTP 请求

在第一终端创建一个文本文件并启动服务：

```sh
mkdir -p web
printf 'hello network\n' > web/index.txt
python3 -m http.server 8000 --bind 127.0.0.1 --directory web
```

在第二终端执行：

```sh
curl -i http://127.0.0.1:8000/index.txt
curl -i http://127.0.0.1:8000/missing
```

第一个请求应返回 `HTTP/1.0 200 OK`、`Content-type: text/plain`、`Content-Length: 14` 与正文 `hello network`；第二个返回 `404 File not found`。响应的 Date 由本地服务产生。第一终端按 Ctrl+C 关闭服务。

若连接失败，确认服务终端仍在运行、地址与端口相同；若 8000 被占用，将服务命令和 curl URL 中的端口同时改为 8001；若文件返回 404，检查 `web/index.txt` 的位置与大小写。

## SQLite 查询计划

将以下脚本保存为 `students.sql`。每次运行会重新创建 students 表：

```sql
DROP TABLE IF EXISTS students;
CREATE TABLE students(id INTEGER PRIMARY KEY, name TEXT, major TEXT, score INTEGER);
INSERT INTO students VALUES (1, 'A', 'CS', 85), (2, 'B', 'EE', 91), (3, 'C', 'CS', 78);
EXPLAIN QUERY PLAN SELECT name FROM students WHERE major = 'CS';
CREATE INDEX students_major ON students(major);
EXPLAIN QUERY PLAN SELECT name FROM students WHERE major = 'CS';
SELECT name, score FROM students WHERE major = 'CS' ORDER BY id;
BEGIN;
UPDATE students SET score = 100 WHERE id = 1;
ROLLBACK;
SELECT score FROM students WHERE id = 1;
```

```sh
sqlite3 students.db < students.sql
```

第一份查询计划的 detail 包含 `SCAN students`；创建索引后的 detail 包含 `SEARCH students USING INDEX students_major (major=?)`。两条成绩为 `A|85`、`C|78`，最后一行是回滚后的 `85`。SQLite 各版本的树形前缀会有差异。

若报告 `no such table`，从脚本的建表语句开始运行；若第二次创建索引报告已存在，确认脚本首句 DROP TABLE 已执行；若数据库显示 locked，关闭其他终端中尚未提交的事务。

[使用群友 C++ 程序继续调试](cpp-debugging.md) · [学码群资料](../group/index.md)
