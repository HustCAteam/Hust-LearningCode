---
title: "竞赛指南"
---

竞赛信息与准备经验。

## 群友分享

### 多源异构数据驱动岗位与能力图谱比赛方案

岗位与能力图谱构建、动态演化分析的赛题背景、研究任务和交付要求。

[PDF · 258.0 KiB · 打开下载](https://github.com/HustCAteam/Hust-LearningCode/releases/download/group-library/competitions__lab__multisource-job-and-competency-graph-competition-plan__2026__c9b28e107027.pdf) · 作者：科大讯飞股份有限公司 · 群友分享：shipship

## 从两条岗位样例生成技能边

先读群友分享的岗位与能力图谱比赛方案，列出输入、研究任务与交付物。用两条手工样例跑通岗位—技能边的生成过程，再逐步接入方案要求的数据：

```sh
cat > skills.py <<'PY'
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
python3 skills.py
```

预期结果：第一行有四条边：analysis→Python、analysis→pandas、backend→Python、backend→SQL；第二行计数为 Python 2、SQL 1、pandas 1。一个岗位重复出现的 Python 只生成一条边。

排查：如果 Python 计数为 3，检查是否先对单个岗位的技能去重；如果岗位来源使用 python、Python 两种写法，先建立规范名称映射，再生成边。接入真实数据后，为每条边保留岗位来源和日期字段，按时间窗口比较同一技能的岗位数。

[动手工具](../guide/tools.md) · [分享资料](../guide/contributing.md)
