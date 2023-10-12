<?php
// Define a porta em que o servidor irá escutar
$port = 2000;

// Cria um servidor socket
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

// Vincula o servidor a um endereço e porta
socket_bind($socket, '0.0.0.0', $port);

// Coloca o servidor em modo de escuta
socket_listen($socket);

echo "Servidor HTTP está ouvindo na porta $port...\n";

while (true) {
    // Aceita uma conexão
    $client = socket_accept($socket);

    // Lê a solicitação do cliente
    $request = socket_read($client, 2048);

    // Analisa a solicitação
    list($method, $uri, $version) = explode(' ', $request);

    // Define rotas e suas ações
    $routes = [
        '/' => 'Página Inicial',
        '/about' => 'Sobre',
        '/contact' => 'Contato',
    ];

    // Verifica se a rota existe e responde
    if (array_key_exists($uri, $routes)) {
        $response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n{$routes[$uri]}";
    } else {
        $response = "HTTP/1.1 404 Not Found\r\nContent-Type: text/html\r\n\r\nPágina não encontrada";
    }

    // Envia a resposta ao cliente
    socket_write($client, $response, strlen($response));

    // Fecha a conexão
    socket_close($client);
}
