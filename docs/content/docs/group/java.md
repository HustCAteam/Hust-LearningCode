---
title: "Java程序设计"
---

对象、集合、异常与工程结构。

## 群友分享

### On Java 中文版·基础版

Java 对象、接口、泛型、集合、流与异常处理。

[PDF · 23.50 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/java__book__on-java-chinese-basics__basic__7dc1f8507f4f.pdf) · 作者：Bruce Eckel · 群友分享

### Java 开发实战经典 · 第2版

Java 语言、面向对象、类库和应用开发实例。

[PDF · 160.87 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/java__book__java-development-practice__2nd__429775af19c5.pdf) · 作者：李兴华 · 群友分享：22\-电磁\-郭烈材\(来水学码华科谢谢喵\)

### Effective Java · 第3版

对象创建、方法设计、泛型、枚举、异常、并发和序列化的条目式建议。

[PDF · 20.94 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/java__book__effective-java__3rd__da6d7d8dfdb0.pdf) · 作者：Joshua Bloch · 群友分享：Cyan

### Java 核心技术·卷 I 基础知识 · 第10版

Java 对象与继承、接口、异常、集合、泛型、图形界面和并发基础。

[PDF · 161.82 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/java__book__core-java-volume-one-fundamentals__10th-vol1__174ca710290a.pdf) · 群友分享：bzm

### Java 编程思想

Java 对象模型、初始化、继承、多态、泛型、集合和并发。

[PDF · 2.18 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/java__book__thinking-in-java__undated__13d3343b8599.pdf) · 作者：Bruce Eckel · 群友分享：Cyan

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

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
