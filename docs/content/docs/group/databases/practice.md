---
title: "数据库 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：数据库](../databases.md)

## 执行 SQL 并观察索引

打开[工具实作：SQLite 查询计划](../../guide/tools.md#sqlite-查询计划)，创建 students.db，插入三条数据，比较创建索引前后的 `EXPLAIN QUERY PLAN`。随后在事务中更新分数再 ROLLBACK，确认查询结果恢复为 85。配合主题目录中的教材的索引和事务章节阅读。


[返回主题目录](../databases.md)
