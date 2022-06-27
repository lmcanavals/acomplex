import json
import random as r

def graph():
    n, m = 120, 120
    Loc = [(i * 100 - r.randint(145, 155), j * 100 - r.randint(145, 155)) for i in range(1, n + 1) for j in range(1, m + 1)]
    G = [[] for _ in range(n * m)]
    for i in range(n):
        for j in range(m):
            adjs = [(i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)]
            for u, v in adjs:
                if u >= 0 and u < n and v >= 0 and v < m:
                    G[i * m + j].append((u * m + v, 0))

    response = {"loc": Loc, "g": G}

    return json.dumps(response)

def paths():
    bestpath = [-1, 0, 1, 0]
    path1 = [-1, 0, 1, 0]
    path2 = [-1, 0, 1, 0]

    response = {"bestpath": bestpath, "path1": path1, "path2": path2}

    return json.dumps(response)

