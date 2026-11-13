#include <iostream>
using namespace std;
int main() 
{
    int b[12] = {64,316,42,1513,431366,43,13,435,94,431,76,34};
    for (int i = 0;i <= 10;i++)
    {
        bool flag = 1;
        int t;
        for(int j = 11;j >= i + 1;j--)
        {
            if (b[j] < b[j - 1])
            {
                t = b[j];
                b[j] = b[j - 1];
                b[j - 1] = t;
                flag = 0;
            }
            if (flag)
            {
                break;
            }
        }
    }
    for(int j = 0;j <= 11;j++)
    {
        cout << b[j] <<endl;
    }
    return 0;
}