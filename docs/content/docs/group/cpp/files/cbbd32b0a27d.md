---
title: "猜数游戏：群分享调试练习"
description: "随机猜数练习；配套调试手记从首次读取变量和输入结束两条路径展开。"
navHidden: true
materialId: "cpp-cbbd32b0a27d"
source: "学码群"
authors: ["西西扶柿"]
---

随机猜数练习；配套调试手记从首次读取变量和输入结束两条路径展开。

## 阅读与下载

[打开 CPP · 0.7 KiB](../../../../../../001-%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%AF%AD%E8%A8%80/cpp/source/cpp__source__%E7%8C%9C%E6%95%B0%E6%B8%B8%E6%88%8F-%E8%B0%83%E8%AF%95%E5%8E%9F%E7%A8%BF__undated.cpp)

### 程序内容

```cpp
#include "iostream"
#include "random"


using namespace std;


int get_random_num(int min, int max)
{
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(min,max);
    int random_number = dis(gen);
    return random_number;
}
int main(){
    int num = get_random_num(1,100);
    cout << "请输入一个数字" << endl;
    int a;
    int b = 0;
    cout << num << endl;
    while ( a != num )
    {
        cin >> a;
        ++b;
        cout << "你已尝试" << b << "次" << endl;
        if (a < num)
        {
            cout << "小了" << endl;
        }
        else if ( a > num)
        {
            cout << "大了" << endl;
        }
    }
    cout << "对了" <<endl;
    return 0;
}
```

## 关于这份资料

| 信息 | 内容 |
| --- | --- |
| 所属主题 | [C\+\+ 与面向对象](../../cpp.md) |
| 资料类型 | 源程序 |
| 文件格式 | CPP |
| 文件大小 | 0.7 KiB |
| 群文件上传者 | 西西扶柿 |
| 群内分享时间 | 2024-10-03 |
| 群文件目录 | / |
| 原始文件名 | 2\_随机数猜\.cpp |

感谢 西西扶柿 把这份资料带到学码群。

[配套阅读与调试手记](../../../guide/cpp-debugging.md)

## 继续阅读

[返回C\+\+ 与面向对象目录](../../cpp.md) · [补充资料与署名](../../../guide/contributing.md)
