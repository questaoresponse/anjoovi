<?php
echo "eae";
$url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
echo $url;
// Roteamento com base na URL
switch ($url) {
    case '/':
        // Lógica para a página inicial
        require __DIR__ . '/templates/index.php' ;
        break;
    case '/admin':
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
        require __DIR__ . '/templates/index.php';
        break;
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($url=="/admin"){
    // Verifica se a solicitação é do tipo POST

    // Recupere os dados do formulário usando a variável $_POST
    $email = $_POST["email"];
    $senha = $_POST["password"];

    // Faça o que desejar com os dados, como salvá-los em um banco de dados ou exibi-los
    if ($email=="t@gmail.com" && $senha=="1"){
        require __DIR__ . '/templates/admin.php' ;
    }else{
        require __DIR__ . '/templates/admin-error.html'
    }
} else {
    // Se a solicitação não for do tipo POST, você pode exibir um formulário HTML
    // para que os usuários possam enviar dados por POST
    echo "Método incorreto. Use o método POST para enviar dados.";
}
}else{
    echo "teste falido";
}
?>