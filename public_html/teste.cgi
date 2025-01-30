#!/bin/bash
# Marca o tempo de início
start_time=$(date +%s)

# Executa o programa e captura a saída em uma variável
output=$( /home4/anjoov00/server/main )

# Marca o tempo de término
end_time=$(date +%s)

# Calcula o tempo de execução
execution_time=$((end_time - start_time))

# Exibe a saída do programa
echo "Saída do programa:"
echo "$output"

# Exibe o tempo de execução
echo "Tempo de execução: $execution_time segundos"