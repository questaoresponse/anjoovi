#!/bin/bash
#!/bin/bash

# Recupera a URL completa (CGI envia como variável de ambiente)
url="$REQUEST_URI"  # Essa variável contém a URL requisitada

# Recupera o cabeçalho HTTP_ORIGIN
origin="$HTTP_ORIGIN"  # O servidor passa o valor do cabeçalho HTTP_ORIGIN

# Exibe as informações para o browser (opcional)
echo "Content-Type: text/html"
echo ""
echo "<html><body>"
echo "<h1>Dados da Requisição</h1>"
echo "<p><strong>URL:</strong> $url</p>"
echo "<p><strong>HTTP_ORIGIN:</strong> $origin</p>"

# Passa os dados como parâmetros para o executável C++
# Exemplo de chamada de executável C++ passando os dados como parâmetros
../server/cgi/cgi "$url" "$origin"