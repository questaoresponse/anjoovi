#!/bin/bash
echo "Content-Type: text/html"
echo ""
echo "<html><body><h1>Executando o programa...</h1>"

# Caminho do executável
output=$(/home/anjoov00/server/main)  # Captura a saída do programa

# Exibe a saída do programa dentro do HTML
echo "<pre>$output</pre>" 

echo "<h2>Programa finalizado!</h2>"
echo "</body></html>"