# C++ 群分享调试手记

感谢西西扶柿把五份小程序分享到群里。我们保留分享时的控制流和数据结构，从循环、下标、函数和输入这几个角度继续做实验。猜数程序的中文字符串已转为 UTF-8，原件摘要保存在资料记录中。

下面的片段可替换原稿中的对应部分。先手工写出预期结果，再编译运行，观察第一处出现差异的位置。

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic -g exercise.cpp -o exercise
./exercise
```

## 相邻交换与提前退出

[打开《交换排序》原稿](../../001-计算机语言/cpp/source/cpp__source__交换排序-调试原稿__undated.cpp)。

`flag` 记录这一整轮有无交换。把检查放在内层循环结束之后，才能让这一轮访问完所有相邻元素。原稿第一轮从数组尾部向前扫描，可以保留这个方向：

```cpp
for (int i = 0; i < 11; ++i) {
    bool swapped = false;
    for (int j = 11; j > i; --j) {
        if (b[j] < b[j - 1]) {
            int t = b[j];
            b[j] = b[j - 1];
            b[j - 1] = t;
            swapped = true;
        }
    }
    if (!swapped) break;
}
```

原稿的 12 个数排序后应为：`13 34 42 43 64 76 94 316 431 435 1513 431366`。

## 删除元素后继续复制

[打开《2_指针》原稿](../../001-计算机语言/cpp/source/cpp__source__数组删除-调试原稿__undated.cpp)。

删除下标为 2 的元素时，后面的元素需要继续复制，并向前移动一个位置。将原稿的复制循环替换为：

```cpp
for (int i = 0; i < 5; ++i) {
    if (i == 2) continue;
    pnew[i < 2 ? i : i - 1] = p[i];
}
```

输入数组为 `1 2 3 4 5` 时，结果为 `1 2 4 5`。可以给循环设置断点，逐次记录 `i` 和目标下标。

## 插入元素时区分两种下标

[打开《3_指针》原稿](../../001-计算机语言/cpp/source/cpp__source__数组插入-调试原稿__undated.cpp)。

`i` 是原数组下标，`i + offset` 是新数组的写入位置。插入值和原值都沿着新数组的位置前进：

```cpp
int offset = 0;
for (int i = 0; i < 10; ++i) {
    if (i == 1 || i == 3) {
        pnew[i + offset] = a[offset];
        ++offset;
    }
    pnew[i + offset] = p[i];
}
delete[] a;
```

保留原稿中对 `p` 和 `pnew` 的释放。结果应为 `1 99 2 3 999 4 5 6 7 8 9 10`。

## 用不同指数检查乘方函数

[打开《函数集合》原稿](../../001-计算机语言/cpp/source/cpp__source__阶乘与幂函数-调试原稿__undated.cpp)。

用一个独立累乘结果保存 `x` 的幂，循环中保持底数 `x` 不变。这里练习非负整数指数：

```cpp
int ncf(int x, int n) {
    int result = 1;
    for (int i = 0; i < n; ++i) result *= x;
    return result;
}
```

检查 `ncf(3, 0) == 1`、`ncf(3, 2) == 9`、`ncf(3, 3) == 27`。继续观察 `int` 的表示范围，选小数值手工核对阶乘与乘方。

## 先读输入，再比较猜测值

[打开《随机数猜》原稿](../../001-计算机语言/cpp/source/cpp__source__猜数游戏-调试原稿__undated.cpp)。

保留随机数函数，将 `main` 改成下面的输入循环。每次比较都使用刚刚成功读到的值；输入结束时循环自然结束。

```cpp
int main() {
    const int num = get_random_num(1, 100);
    int guess;
    int attempts = 0;
    std::cout << "请输入一个数字\n";
    while (std::cin >> guess) {
        ++attempts;
        if (guess == num) {
            std::cout << "对了，尝试次数：" << attempts << '\n';
            break;
        }
        std::cout << (guess < num ? "小了" : "大了") << '\n';
    }
}
```

调试时可以暂时将目标值设为 `42`，依次输入 `20 60 42`，预期提示为“小了”“大了”，第三次猜中。再试一次空输入，观察程序直接结束。

## 继续练习

- 在纸上画出数组中的每一次写入，再尝试用 `std::vector` 表达插入与删除。
- 配合 [Stanford CS106L](https://csdiy.wiki/%E7%BC%96%E7%A8%8B%E5%85%A5%E9%97%A8/cpp/CS106L/) 学习容器、迭代器与资源管理。
- 把自己找到的输入样例、解释和改进方案补充到仓库，让这次分享继续生长。

[回到 C++ 课程页](../courses/programming/cpp.md) · [工具与学习习惯](tools.md)
