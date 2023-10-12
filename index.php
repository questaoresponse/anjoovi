<?php
// index.php - seu arquivo central

// Analisar a URL da solicitação
$url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';

// Roteamento com base na URL
switch ($url) {
    case '/':
        // Lógica para a página inicial
        include('index.html');
        break;
    case '/login':
        // Lógica para a página "Sobre"
        include('admin.html');
        break;
    case '/contato':
        // Lógica para a página "Contato"
        include('contato.php');
        break;
    default:
        // Página de erro 404
        header("HTTP/1.0 404 Not Found");
        include('404.php');
        break;
}
$teste="<h1>oi</h1>";
echo $teste;