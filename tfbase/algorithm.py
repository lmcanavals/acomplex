import json
import random as r
import math
import heapq as hq
from perlin_noise import PerlinNoise


def transformGraph():
    n, m= 120, 60

    noise = PerlinNoise(octaves=5, seed=1981)
    xpix, ypix = n, m
    pic = [[noise([i/xpix, j/ypix]) for j in range(xpix)] for i in range(ypix)]

    Loc= [(i * 100 - r.randint(145, 155), j * 100 - r.randint(145, 155))
           for i in range(1, n + 1) for j in range(1, m + 1)]
    G= [[] for _ in range(n * m)]
    for i in range(n):
        for j in range(m):
            adjs= [(i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)]
            r.shuffle(adjs)
            for u, v in adjs:
                if u >= 0 and u < n and v >= 0 and v < m:
                    G[i * m + j].append((u * m + v, pic[j][i] + 1000))
    return G, Loc

def bfs(G, s):
  n= len(G)
  visited= [False]*n
  path= [-1]*n # parent
  queue= [s]
  visited[s]= True

  while queue:
    u= queue.pop(0)
    for v, _ in G[u]:
      if not visited[v]:
        visited[v]= True
        path[v]= u
        queue.append(v)

  return path

def dfs(G, s, t):
  n= len(G)
  path= [-1]*n
  visited= [False]*n

  stack= [s]
  while stack:
    u= stack.pop()
    visited[u]= True
    if u == t:
        break
    for v, _ in G[u]:
      if not visited[v]:
        path[v]= u
        stack.append(v)

  return path

def dijkstra(G, s):
    n= len(G)
    visited= [False]*n
    path= [-1]*n
    cost= [math.inf]*n

    cost[s]= 0
    pqueue= [(0, s)]
    while pqueue:
        g, u= hq.heappop(pqueue)
        if not visited[u]:
            visited[u]= True
            for v, w in G[u]:
                if not visited[v]:
                    f= g + w
                    if f < cost[v]:
                        cost[v]= f
                        path[v]= u
                        hq.heappush(pqueue, (f, v))

    return path, cost

G, Loc= transformGraph()

def graph():
    return json.dumps({"loc": Loc, "g": G})


def paths(s, t):
    bestpath, _= dijkstra(G, s)
    path1= bfs(G, s)
    path2= dfs(G, s, t)

    return json.dumps({"bestpath": bestpath, "path1": path1, "path2": path2})
