---
title: "动态数组插入：群分享调试练习"
description: "西西扶柿分享的动态数组插入练习。跟踪原下标与目标下标、插入偏移和内存释放；配套调试手记给出完整结果。"
navHidden: true
materialId: "cpp-ad32ddfa224e"
source: "学码群"
authors: ["西西扶柿"]
---

西西扶柿分享的动态数组插入练习。跟踪原下标与目标下标、插入偏移和内存释放；配套调试手记给出完整结果。

## 阅读与下载

[打开 CPP · 0.5 KiB](../../../../../../001-%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%AF%AD%E8%A8%80/cpp/source/cpp__source__%E6%95%B0%E7%BB%84%E6%8F%92%E5%85%A5-%E8%B0%83%E8%AF%95%E5%8E%9F%E7%A8%BF__undated.cpp)

### 程序内容

```cpp
#include "iostream"
using namespace std;
int main()
{
    int *p = new int[10] {1,2,3,4,5,6,7,8,9,10};
    int *a = new int[2] {99,999};
    int *pnew = new int [12];
    int offset = 0;
    for (int i = 0;i <= 9;i++)
    {
        if( i == 1 || i == 3 )
        {
            pnew[i] = a[offset];
            offset++;
        }
        pnew[i + offset] = p[i];

    }
    delete [] p;
    int i = 0;
    while (i < 12)
    {
        cout << pnew[i] << endl;
        i++;
    }
    delete [] pnew;
    return 0;
}
```

## 关于这份资料

| 信息 | 内容 |
| --- | --- |
| 所属主题 | [C\+\+ 与面向对象](../../cpp.md) |
| 资料类型 | 源程序 |
| 文件格式 | CPP |
| 文件大小 | 0.5 KiB |
| 群文件上传者 | 西西扶柿 |
| 群内分享时间 | 2024-10-12 |
| 群文件目录 | / |
| 原始文件名 | 3\_指针\(1\)\.cpp |

感谢 西西扶柿 把这份资料带到学码群。

[配套阅读与调试手记](../../../guide/cpp-debugging.md)

## 继续阅读

[返回C\+\+ 与面向对象目录](../../cpp.md) · [补充资料与署名](../../../guide/contributing.md)
