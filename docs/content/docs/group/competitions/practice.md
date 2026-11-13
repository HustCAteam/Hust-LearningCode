---
title: "竞赛与项目分享 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：竞赛与项目分享](../competitions.md)

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


[返回主题目录](../competitions.md)
