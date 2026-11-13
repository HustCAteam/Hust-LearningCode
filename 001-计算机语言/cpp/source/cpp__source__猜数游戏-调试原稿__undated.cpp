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