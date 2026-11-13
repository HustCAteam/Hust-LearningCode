const fence = (language, code) => `\n\n\`\`\`${language}\n${code.trim()}\n\`\`\`\n\n`;
const exercise = (title, intro, code, result, help) => `## ${title}\n\n${intro}${fence('sh', code)}预期结果：${result}\n\n排查：${help}\n\n`;
const plans = {
  c: exercise('从循环题跑到边界错误', '先做本页《实验三：循环程序设计》的循环题，再打开工具练习页的 bounds.c，运行 GCC AddressSanitizer 和 GDB。创建 sum.c：', `cat > sum.c <<'C'
#include <stdio.h>
int main(void) {
    int sum = 0;
    for (int i = 1; i <= 5; ++i) sum += i;
    printf("%d\\n", sum);
}
C
gcc -std=c17 -Wall -Wextra -g sum.c -o sum
./sum`, '输出 15。把上界改为 0，输出 0；改为 1，输出 1。', '若编译器报告缺少分号，定位到错误行的上一句；若得到 10，检查循环条件是否包含 5。'),
  cpp: '## 从群友程序开始调试\n\n群友的交换排序、数组插入、数组删除、阶乘与幂函数、猜数游戏源程序可按[完整调试练习](/Hust-LearningCode/guide/cpp-debugging/)逐个编译，使用文中的固定输入和结果检查每一处修改。数组插入的目标输出为 `1 99 2 3 999 4 5 6 7 8 9 10`，猜数输入为 `20 60 42`。EasyX 扫雷与贪吃蛇程序使用 Windows 和 EasyX；下载多文件项目后保留其图片目录，在 Visual Studio 中配置 EasyX，再按项目内的运行说明设置工作目录。\n\n',
  java: exercise('用集合检查 equals 与 hashCode', '配合 Java 书籍的对象与集合章节，在安装 JDK 17 或更新版的终端创建 Main.java：', `cat > Main.java <<'JAVA'
import java.util.HashSet;
public class Main {
    record Point(int x, int y) {}
    public static void main(String[] args) {
        var points = new HashSet<Point>();
        points.add(new Point(1, 2));
        points.add(new Point(1, 2));
        points.add(new Point(2, 1));
        System.out.println(points.size());
        System.out.println(points.contains(new Point(1, 2)));
    }
}
JAVA
javac Main.java
java Main`, '依次输出 2 和 true。record 按分量生成 equals/hashCode；两个 (1,2) 在 HashSet 中占一个元素。', '出现 record 语法错误时运行 java -version 与 javac -version，选择同一套 JDK 17+。再把 record 改成普通类并逐步实现 equals/hashCode，观察集合大小的变化。'),
  'python-basics': exercise('统计 Unicode 单词', '阅读 Python 书籍的字符串、字典与 Counter 章节。Python 3 下创建 words.py：', `cat > words.py <<'PY'
from collections import Counter
text = "群友 Python 群友 C Python 群友"
for word, count in Counter(text.split()).most_common():
    print(word, count)
PY
python3 words.py`, '输出三行：群友 3、Python 2、C 1。把输入改为一个空字符串，输出为空。', '若中文显示异常，用 UTF-8 保存文件；把 split() 改成 split(" ") 后试两个连续空格，观察空单词如何进入计数。'),
  'data-structures': exercise('用栈检查括号匹配', '配合栈章节，将每个左括号压栈，遇到右括号时检查栈顶：', `cat > brackets.py <<'PY'
def valid(text):
    stack = []
    pairs = {')': '(', ']': '['}
    for char in text:
        if char in '([':
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    return not stack
for text in ['([])', '([)]', '(', '']:
    print(repr(text), valid(text))
PY
python3 brackets.py`, '四个布尔值依次为 True、False、False、True。', '若单独一个右括号导致 IndexError，把空栈判断放在 pop() 前；若左括号单独出现仍为 True，检查结束时栈是否为空。'),
  algorithms: exercise('验证二分查找的循环边界', '配合二分查找与复杂度章节，使用左闭右开的区间：', `cat > lower_bound.py <<'PY'
def lower_bound(a, value):
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < value:
            lo = mid + 1
        else:
            hi = mid
    return lo
for a, value in [([], 2), ([1, 2, 2, 4], 2), ([1, 2, 2, 4], 3), ([1, 2], 9)]:
    print(lower_bound(a, value))
PY
python3 lower_bound.py`, '依次输出 0、1、3、2，返回第一个大于等于目标值的位置。', '若循环停不下来，检查 lo = mid + 1；用 [2,2] 查 2，确认答案落在第一个 2。'),
  databases: '## 执行 SQL 并观察索引\n\n打开[工具实作：SQLite 查询计划](/Hust-LearningCode/guide/tools/#sqlite-查询计划)，创建 students.db，插入三条数据，比较创建索引前后的 `EXPLAIN QUERY PLAN`。随后在事务中更新分数再 ROLLBACK，确认查询结果恢复为 85。配合本页教材的索引和事务章节阅读。\n\n',
  networks: '## 把 HTTP 请求发到本机\n\n按[工具实作：本地 HTTP](/Hust-LearningCode/guide/tools/#本地-http-请求)建立 web/index.txt，运行 Python HTTP 服务，再用 curl 查看 200、404 和 Content-Length。将文件正文改为 hello group 后重新请求，响应正文应同步改变。结合本页书籍的应用层章节，逐项解释请求方法、路径、状态码和响应头。\n\n',
  'network-certification': exercise('计算子网边界与主机范围', '读三级网络技术的地址规划题后，用 Python 标准库检查 192.168.10.37/27：', `python3 - <<'PY'
import ipaddress
network = ipaddress.ip_network('192.168.10.37/27', strict=False)
hosts = list(network.hosts())
print(network.network_address, network.broadcast_address)
print(hosts[0], hosts[-1], len(hosts))
PY`, '两行分别为 192.168.10.32 192.168.10.63 和 192.168.10.33 192.168.10.62 30。手算块大小 256−224=32，再与输出对应。', 'strict=True 会拒绝带主机位的地址；手算可用主机数时减去网络地址和广播地址。'),
  'operating-systems': exercise('手算银行家算法再执行安全性检查', '阅读群友的安全序列例题。下面使用 3 个进程、1 类资源，available=1，allocation=[1,1,1]，max=[3,2,3]：', `cat > banker.py <<'PY'
allocation = [1, 1, 1]
maximum = [3, 2, 3]
work = 1
finished = set()
sequence = []
while len(finished) < len(allocation):
    for pid in range(len(allocation)):
        if pid not in finished and maximum[pid] - allocation[pid] <= work:
            work += allocation[pid]
            finished.add(pid)
            sequence.append(pid)
            break
    else:
        print('unsafe')
        break
else:
    print('safe', sequence, 'available', work)
PY
python3 banker.py`, '输出 safe [1, 0, 2] available 4。把 work 的初值改为 0，输出 unsafe。', 'need = maximum − allocation；进程完成后释放 allocation。若每轮都选到相同进程，检查 finished 集合。'),
  'computer-organization': exercise('从 C 函数找到机器指令', 'Linux x86-64、GCC 与 GNU binutils 环境中创建 add.c，比较优化前后的指令：', `cat > add.c <<'C'
int add(int a, int b) { return a + b; }
C
gcc -O0 -g -c add.c -o add-o0.o
gcc -O2 -c add.c -o add-o2.o
objdump -d -Mintel add-o0.o
objdump -d -Mintel add-o2.o`, '两份反汇编都含 add 符号和 ret；x86-64 GCC 的 -O2 常用 lea eax,[rdi+rsi] 完成加法。对照教材解释寄存器、操作数与返回值。', '其他架构使用 objdump -d，去掉 -Mintel；找不到 objdump 时安装 binutils。-c 生成目标文件，无需 main。'),
  compilers: exercise('为算术表达式写词法分析器', '配合词法分析章节，把输入拆成整数、加号、乘号和括号：', `cat > lexer.py <<'PY'
import re
source = '12 + 3 * (4 + 5)'
pattern = re.compile(r'\\s*(?:(\\d+)|([+*()]))')
pos = 0
tokens = []
while pos < len(source):
    match = pattern.match(source, pos)
    if not match:
        raise ValueError(f'invalid token at {pos}')
    tokens.append(('INT', int(match[1])) if match[1] else (match[2], match[2]))
    pos = match.end()
print(tokens)
PY
python3 lexer.py`, '输出以 (\'INT\', 12)、(\'+\', \'+\') 开头的 9 个 token。语法树按乘法优先解析，表达式值为 39。把 + 改为 @，错误位置为 2。', '若空格触发错误，检查模式开头的 \\s*；若 12 被拆为两个 token，检查整数分支的 +。'),
  'software-engineering': exercise('为价格计算写可运行测试', '用 Python unittest 把“满 100 减 10”的边界写成具体测试：', `cat > test_price.py <<'PY'
import unittest

def price(total):
    return total - 10 if total >= 100 else total

class PriceTest(unittest.TestCase):
    def test_threshold(self):
        for total, expected in [(0, 0), (99, 99), (100, 90), (101, 91)]:
            with self.subTest(total=total):
                self.assertEqual(price(total), expected)

if __name__ == '__main__':
    unittest.main()
PY
python3 -m unittest -v test_price.py`, '输出 test_threshold ... ok 和 OK。把 >= 改为 >，输入 100 的子测试显示 100 != 90。', '若显示 Ran 0 tests，检查文件名 test_price.py、方法名前缀 test_ 与类继承 unittest.TestCase。'),
  'programming-project': '## 做一个带测试的课程设计切片\n\n先打开本页《软件课程设计选题与文档要求》，选择其中一个题目。以学生成绩管理为例，先按[工具实作：SQLite 查询计划](/Hust-LearningCode/guide/tools/#sqlite-查询计划)建立 students 表，完成按专业查询、成绩修改和回滚三个操作；再用[软件工程练习](/Hust-LearningCode/group/software-engineering/)的 unittest 形式为 99/100 两个边界写测试。界面接入前，SQL 查询应返回 A 的分数 85，回滚后仍为 85。\n\n',
  'discrete-1': exercise('枚举命题等价式的真值表', '阅读离散数学的命题逻辑章节，验证蕴含式 p→q 与 ¬p∨q：', `python3 - <<'PY'
from itertools import product
for p, q in product([False, True], repeat=2):
    implication = (not p) or q
    contrapositive = q or (not p)
    print(int(p), int(q), int(implication), implication == contrapositive)
PY`, '四行的最后一列全为 True，蕴含值依次为 1、1、0、1。再将右式改为 p or (not q)，第三行出现 False。', 'Python 的 not、and、or 对应逻辑运算；先加括号，把每个子式的值算清楚。'),
  'functional-programming': exercise('用 OCaml 模式匹配处理列表', '安装 OCaml 后，把以下内容写入 sum.ml，配合 Real World OCaml 的列表与递归章节：', `cat > sum.ml <<'ML'
let rec sum = function
  | [] -> 0
  | head :: tail -> head + sum tail
let () = Printf.printf "%d\\n" (sum [1; 2; 3; 4])
ML
ocaml sum.ml`, '输出 10。将输入改为 []，输出 0；改为 [-2; 5]，输出 3。', '列表元素用分号分隔；出现模式匹配不完整警告时检查 [] 分支。'),
  'programming-languages': exercise('把双向类型判断写成检查函数', '先读 Bidirectional Typing 的合成与检查规则。下面让整数合成 Int 类型，并检查注解：', `cat > typing.py <<'PY'
def synth(term):
    if type(term) is int:
        return 'Int'
    raise TypeError('no synthesis rule')
def check(term, expected):
    return synth(term) == expected
print(check(3, 'Int'))
print(check(3, 'Bool'))
PY
python3 typing.py`, '输出 True、False。扩展布尔值分支前，先为 True 写一个调用；目前会抛出 no synthesis rule。', 'Python 的 bool 是 int 的子类，使用 type(term) is int 可将两者分开；按照讲义的判断规则增加分支。'),
  mcs51: '## 按课件完成定时器实验\n\n阅读 01 结构、03 实验板与 GPIO，再打开 08 C51 定时器课件。使用 Keil µVision 的 8051 工程，器件选择 AT89C52；新建 main.c，在定时器 0 中断函数中翻转 P1.0。12 MHz 晶振、传统 12T 内核的 1 ms 重装值为 65536−1000=64536，即 TH0=0xFC、TL0=0x18。设置 TMOD=0x01、ET0=1、EA=1、TR0=1。进入 Simulator，在 Logic Analyzer 添加 P1.0，预期相邻翻转间隔约 1 ms，完整周期约 2 ms。若引脚恒定，检查中断向量 interrupt 1、总中断 EA 与运行位 TR0；若周期偏差 12 倍，检查目标芯片的 1T/12T 模式。硬件接线与外设地址使用群内对应实验板课件。\n\n',
  plc: '## 在 PLCSIM 做自保持启停\n\n配合 S7-1200 书籍，使用 TIA Portal 与对应版本 S7-PLCSIM，新建 S7-1200 项目，在 Main [OB1] 建三个 Bool 标签：Start=%I0.0、Stop=%I0.1、Motor=%Q0.0。梯形图使用 Stop 常闭触点串联 Start 与 Motor 常开触点的并联支路，线圈为 Motor。编译后下载到仿真 CPU 并切换 RUN。在监控表将 Start 设为 1 再设回 0，Motor 应保持 1；将 Stop 设为 1，Motor 变为 0。若 Motor 随 Start 归零，检查并联的自保持触点地址是否也为 Q0.0；若停止按钮无效，检查 Stop 触点类型与输入地址。\n\n',
  architecture: '## 从群内论文还原一次乘加的数据流\n\n先打开本页 CIMR-V 论文，定位 SRAM 存内计算的结构图，标出输入向量、权重、累加器三条路径。取输入 [1,2]、权重 [3,4]，手算点积为 11；沿论文的数据通路逐级填入乘积 3、8 与累加结果 11。继续阅读处理器功耗估算论文的计数器定义，选取其中一个计数器解释采样窗口与单位。需要先补指令基础时，执行[组成原理的 gcc/objdump 实验](/Hust-LearningCode/group/computer-organization/)。\n\n',
  'postgraduate-408': '## 用一道题串起四门基础课\n\n先独立完成本页 2024 年 408 回忆版中的一道进程同步题，明确每个信号量的初值、P/V 操作位置和临界区。再执行[操作系统安全序列练习](/Hust-LearningCode/group/operating-systems/)，比较 available=1 与 0 两种输入。网络题配合[子网计算练习](/Hust-LearningCode/group/network-certification/)完成 192.168.10.37/27 的网络地址 192.168.10.32、广播地址 192.168.10.63 和可用主机数 30。\n\n',
  assembly: exercise('对照浮点输出的两份汇编', '下载两份群友汇编，分别保存为 1i.s 与 1s.s。在 Windows 的 MSYS2 UCRT64 终端中使用 GCC 与 binutils，将它们组装为目标文件并查看带重定位的反汇编：', `gcc -c 1i.s -o wrapped.o
gcc -c 1s.s -o direct.o
objdump -dr wrapped.o
objdump -dr direct.o
objdump -s -j .rdata direct.o`, 'wrapped.o 的调用重定位包含 _Z6printfPKcz，direct.o 包含 printf；两份 main 都把 long double 临时存储区的地址送入 rdx，.rdata 中的格式字符串是 %.2f。沿 fldt、fstpt、leaq、movq 标出值与地址的流向，再比较格式要求的 double 参数与这里实际准备的指针。', '这些是 Windows x86-64、GCC 14.1 产生的汇编，使用 MSYS2 对应工具链；Linux 原生 as 遇到 .seh_* 会报目标格式错误。格式修正应从 C/C++ 调用点开始：long double 对应 %Lf，double 对应 %f；修改后重新生成汇编，比较参数寄存器和临时存储区。'),
  competitions: exercise('从两条岗位样例生成技能边', '先读群友分享的岗位与能力图谱比赛方案，列出输入、研究任务与交付物。用两条手工样例跑通岗位—技能边的生成过程，再逐步接入方案要求的数据：', `cat > skills.py <<'PY'
from collections import Counter
jobs = [
    {"id": "backend", "skills": ["Python", "SQL", "Python"]},
    {"id": "analysis", "skills": ["Python", "pandas"]},
]
edges = sorted((job["id"], skill)
               for job in jobs for skill in set(job["skills"]))
counts = Counter(skill for _, skill in edges)
print(edges)
print(sorted(counts.items()))
assert len(edges) == 4
assert counts["Python"] == 2
PY
python3 skills.py`, '第一行有四条边：analysis→Python、analysis→pandas、backend→Python、backend→SQL；第二行计数为 Python 2、SQL 1、pandas 1。一个岗位重复出现的 Python 只生成一条边。', '如果 Python 计数为 3，检查是否先对单个岗位的技能去重；如果岗位来源使用 python、Python 两种写法，先建立规范名称映射，再生成边。接入真实数据后，为每条边保留岗位来源和日期字段，按时间窗口比较同一技能的岗位数。'),
  hustca: '## 从一次可演示的分享开始\n\n阅读本页协会介绍后，可用[本地 HTTP 实验](/Hust-LearningCode/guide/tools/#本地-http-请求)准备一次五分钟演示：第一终端启动端口 8000，第二终端请求 /index.txt 得到 200，再请求 /missing 得到 404。演示时逐行解释状态码、Content-Type 与正文。把你实现的例子、运行环境和署名通过[分享资料](/Hust-LearningCode/guide/contributing/)入口提交。\n\n',
};
plans['computer-systems'] = plans['computer-organization'];
export function learningPlan(course) {
  if (!plans[course.id]) throw Error(`请为群专题 ${course.id} 添加具体学习练习`);
  return plans[course.id];
}
