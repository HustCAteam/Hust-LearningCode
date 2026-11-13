---
title: "Java · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：Java](../java.md)

## 用集合检查 equals 与 hashCode

配合 Java 书籍的对象与集合章节，在安装 JDK 17 或更新版的终端创建 Main.java：

```sh
cat > Main.java <<'JAVA'
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
java Main
```

预期结果：依次输出 2 和 true。record 按分量生成 equals/hashCode；两个 (1,2) 在 HashSet 中占一个元素。

排查：出现 record 语法错误时运行 java -version 与 javac -version，选择同一套 JDK 17+。再把 record 改成普通类并逐步实现 equals/hashCode，观察集合大小的变化。


[返回主题目录](../java.md)
