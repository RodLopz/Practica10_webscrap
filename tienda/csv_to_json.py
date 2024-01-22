import csv
import json

productos = []  # muestra los productos

# Rlee los datos de csv
with open('productos.csv', 'r', encoding='utf-8') as csvfile:
    csvreader = csv.DictReader(csvfile)
    for row in csvreader:
        productos.append(row)

# escribe el fichero json
with open('productos.json', 'w', encoding='utf-8') as jsonfile:
    json.dump(productos, jsonfile, indent=4)
