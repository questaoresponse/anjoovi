<?php
// index.php - seu arquivo central

// Analisar a URL da solicitação
$url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';

// Roteamento com base na URL
switch ($url) {
    case '/':
        // Lógica para a página inicial
        include('templates/index.php');
    default:
        // Página de erro 404
        header("HTTP/1.0 404 Not Found");
}
$teste="<h1>oi</h1>";
echo $teste;
<!-- <html>
<body>
<div>minha pika</div>
<?php
// index.php - seu arquivo central

// Analisar a URL da solicitação
$url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
echo $url;
// Roteamento com base na URL
switch ($url) {
    case '/':
        // Lógica para a página inicial
        require __DIR__ . '/templates/index.php';
    case '/login':
        // Lógica para a página "Sobre"
        require __DIR__ . '/templates/admin.php';
        break;
    case '/contato':
        // Lógica para a página "Contato"
        include('contato.php');
        break;
    default:
        // Página de erro 404
        header("HTTP/1.0 404 Not Found");
        include('templates/index.php');
        break;
}
// $conteudo="";
// echo $conteudo;
?>
</body>
</html> -->