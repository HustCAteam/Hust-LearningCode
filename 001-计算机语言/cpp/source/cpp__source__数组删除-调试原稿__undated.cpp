#include "iostream"
using namespace std;
int main()
{
    int *p = new int[5] {1,2,3,4,5};
    int *pnew = new int [4];
    for (int i = 0;i <= 4;i++)
    {
        if ( i < 2 )
        {
            pnew[i] = p[i];
        }
        else if ( i > 2 )
        {
            pnew[i - 1] = p[i];
        }
        else
        {
            break;
        }
    }
    delete [] p;
    int i = 0;
    while (i < 4)
    {
        cout << pnew[i] << endl;
        i++;
    }
    delete [] pnew;
    return 0;
}