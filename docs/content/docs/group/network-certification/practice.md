---
title: "网络等级考试 · 动手练习"
description: "配合群资料完成一个具体的小实验，观察结果，再尝试修改。"
navHidden: true
---

[配套资料：网络等级考试](../network-certification.md)

## 计算子网边界与主机范围

读三级网络技术的地址规划题后，用 Python 标准库检查 192.168.10.37/27：

```sh
python3 - <<'PY'
import ipaddress
network = ipaddress.ip_network('192.168.10.37/27', strict=False)
hosts = list(network.hosts())
print(network.network_address, network.broadcast_address)
print(hosts[0], hosts[-1], len(hosts))
PY
```

预期结果：两行分别为 192.168.10.32 192.168.10.63 和 192.168.10.33 192.168.10.62 30。手算块大小 256−224=32，再与输出对应。

排查：strict=True 会拒绝带主机位的地址；手算可用主机数时减去网络地址和广播地址。


[返回主题目录](../network-certification.md)
