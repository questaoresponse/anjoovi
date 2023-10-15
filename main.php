<?php
function verificar($conn,$database_name){
    $result = $conn->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database_name'");
    
    if ($result->num_rows == 0) {
        // O banco de dados não existe, então crie-o
        $sql = "CREATE DATABASE $database_name";
    
        if ($conn->query($sql) === TRUE) {
        } else {
        }
    } else {
    }
}
//$url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$url=$_GET['route'];
// echo $url;
// Feche a conexão
// Roteamento com base na URL
if ($_SERVER["REQUEST_METHOD"] == "GET") {
if ($url=="/"){
    include(__DIR__ . '/index.php');
} else if (substr($url, 0, strlen("admin"))=="admin"){
    $ip = $_SERVER['REMOTE_ADDR'];
    $conn = new mysqli("localhost:3306", "cpses_anyj8yi6ea",null,"ip");
    $conn->query("CREATE TABLE IF NOT EXISTS ips_logados(ip TEXT,usuario TEXT)");
    $s=$conn->prepare("SELECT * FROM ips_logados WHERE ip=?");
    $s->bind_param("s",$ip);
    $s->execute();
    $result=$s->get_result();
    if ($result->num_rows==0){
        if ($url=="admin"){
            include(__DIR__ . "/admin_login/admin_init.php");
        } else{
            include(__DIR__ . "/erro/404.html");
        }
    }else{
        $r=[];
        while ($row = $result->fetch_assoc()) {
                $r[] = $row;
        }
        $usuario=$r[0]["usuario"];
        // Lógica para a página "Sobre"
        switch ($url){
            case 'admin':
                include(__DIR__ . "/admin_barra/cadastro_usuario.php");
                    break;
            case 'admin/noticias_cadastro':
                include(__DIR__ . "/admin_noticias_cadastro/noticias_cadastro.php");
                break;
            case 'admin/noticias_lista':
                include(__DIR__ . "/admin_noticias_lista/noticias_lista.php");
                break;
            case 'admin/config_cadastro':
                include(__DIR__ . "/admin_config/config_cadastro.html");
                break;
            case 'admin/sair':
                $s=$conn->prepare("DELETE FROM ips_logados WHERE ip=?");
                $s->bind_param("s",$ip);
                $result=$s->execute();
                header("location: /");
                break;
            default:
            header("HTTP/1.0 404 Not Found");
            include(__DIR__ . "/erro/404.html");
        }
    }
} else if (substr($url, 0, strlen("noticia"))=="noticia"){
    $name=substr($url, strlen("noticia")+1, strlen($url));
    $conn = new mysqli("localhost:3306", "cpses_anyj8yi6ea",null,"posts");
    //$conn->query("CREATE TABLE IF NOT EXISTS post(ip TEXT,usuario TEXT)");
    $s=$conn->prepare("SELECT * FROM post WHERE titulo=?");
    echo $name;
    $s->bind_param("s",$name);
    $s->execute();
    $result=$s->get_result();
    if ($result->num_rows>0){
        $r=[];
        while ($row = $result->fetch_assoc()) {
                $r[] = $row;
        }
        include(__DIR__ . "/posts/post.php");
    } else {
        header("HTTP/1.0 404 Not Found");
        include(__DIR__ . "/erro/404.html");
    }
}else if ($url=="reload"){
    $conn = new mysqli("localhost:3306", "cpses_anyj8yi6ea",null);
    verificar($conn,"ip");
    verificar($conn,"config");
    verificar($conn,"posts");
    $conn = new mysqli("localhost:3306", "cpses_anyj8yi6ea",null,"posts");
    $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT)");
    $conn = new mysqli("localhost:3306", "cpses_anyj8yi6ea",null,"ip");
    $conn->query("CREATE TABLE IF NOT EXISTS ips_logados(ip TEXT,usuario TEXT)");
    $conn->query("CREATE TABLE IF NOT EXISTS ips(ip VARCHAR(255),n INT,d VARCHAR(255))");
    $conn = new mysqli("localhost:3306", "cpses_anyj8yi6ea",null,"config");
    $conn->query("CREATE TABLE IF NOT EXISTS config_noticias(selects JSON,categorias JSON)");
} else {
        header("HTTP/1.0 404 Not Found");
        include(__DIR__ . "/erro/404.html");
}
}
// echo $_SERVER["REQUEST_METHOD"];
?>