import json
import pandas as pd

url = "../data/poblaciones.csv"

def algorithm1(departamento):
    data = pd.read_csv(url)
    data2 = data[data["DEPARTAMENTO"] == departamento]
    responsePath = []
    for i, row in data2.iterrows():
        responsePath.append({"idx": i,
                             "lat": float(row["LATITUD"]),
                             "lon": float(row["LONGITUD"])})

    return json.dumps(responsePath)

def algorithm():
    data = pd.read_csv(url)
    responsePath = []
    for i, row in data.iterrows():
        responsePath.append({"idx": i,
                             "lat": float(row["LATITUD"]),
                             "lon": float(row["LONGITUD"])})

    return json.dumps(responsePath)

def peru1():
    data = pd.read_csv(url)
    dptos = data["DEPARTAMENTO"].unique()
    for dpto in dptos:
        dfdpto = data[data["DEPARTAMENTO"] == dpto]
        provs = dfdpto["PROVINCIA"].unique()
        for prov in provs:
            dfprov = dfdpto[dfdpto["PROVINCIA"] == prov]
            dists = dfprov["DISTRITO"].unique()
            for dist in dists:
                dfdist = dfprov[dfprov["DISTRITO"] == dist]
                # generar grafo
                # aplicar algoritmo
                # guardar pathdistrito

            # concatenar pathdistrito de toda la provincia
            # guardar pathprovincia

        # concatenar pathprovincia para todo el depto
        # guardar pathdepartamento

    # concatenar pathdepartamento para todo el peru
    # guardar pathperu
    # generar responsePath

    responsePath = []
    for i, row in data.iterrows(): ## de pathperu
        responsePath.append({"cp": row["CENTRO POBLADO"],
                             "lat": float(row["LATITUD"]),
                             "lon": float(row["LONGITUD"])})

    return json.dumps(responsePath)

def peru2():
    data = pd.read_csv(url)
    responsePath = []
    for i, row in data.iterrows():
        responsePath.append({"cp": row["CENTRO POBLADO"],
                             "lat": float(row["LATITUD"]),
                             "lon": float(row["LONGITUD"])})

    return json.dumps(responsePath)

