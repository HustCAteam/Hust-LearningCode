#include "iostream"
#include "cmath"
using namespace std;
int jc(int n)           //阶乘
{
    int b = 1;
    for (int i = 1;i <= n;i++)
    {
        b *= i;
    }
    return b;
}

int ncf(int x,int n)          //x的n次方
{
    for (int i = 1;i < n;i++)
    {
        x *= x;
    }
    return x;
}

int main()              //阶乘的应用
{
    int a = 6;
    int b = jc(6);
    cout << b <<endl;
    int x = 3;
    int n = 2;
    int s = ncf(x,n);
    cout << s <<endl;
}
