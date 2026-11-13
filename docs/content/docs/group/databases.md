---
title: "数据库系统原理"
---

关系模型、SQL、索引、事务与恢复。

## 群友分享

### MySQL 技术内幕：InnoDB 存储引擎 · 第2版

InnoDB 体系结构、文件、表、索引、锁、事务及备份恢复。

[PDF · 39.36 MiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/databases__book__mysql-innodb-storage-engine-internals__2nd__b0e0960c1a75.pdf) · 群友分享：bzm

## 执行 SQL 并观察索引

打开[工具实作：SQLite 查询计划](../guide/tools.md#sqlite-查询计划)，创建 students.db，插入三条数据，比较创建索引前后的 `EXPLAIN QUERY PLAN`。随后在事务中更新分数再 ROLLBACK，确认查询结果恢复为 85。配合本页教材的索引和事务章节阅读。

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
