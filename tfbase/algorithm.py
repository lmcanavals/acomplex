import json

def graph():
    Loc = [(10, 10), (10, 24), (23, 22), (22, 11)]
    G = [[(1, 2), (3, 1)],
         [(2, 3)],
         [(3, 3)],
         []]

    response = {"loc": Loc, "g": G}

    return json.dumps(response)

def paths():
    bestpath = [-1, 0, 1, 0]
    path1 = [-1, 0, 1, 0]
    path2 = [-1, 0, 1, 0]

    response = {"bestpath": bestpath, "path1": path1, "path2": path2}

    return json.dumps(response)

