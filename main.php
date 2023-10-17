<?php
$c=__DIR__ . "/../key.json";
if (!file_exists($c)) {
    $key = "31782212-00da-4358-8b84-d13de2b1a5f7";$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));$iv = base64_encode($iv);$conteudo=json_encode(["key"=>$key,"iv"=>$iv]);file_put_contents($c, $conteudo);
}
function crip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_encrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
function descrip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_decrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
function rt($texto){
    $posicao_inicio = strpos($texto, '/');
if ($posicao_inicio !== false) {
    $posicao_fim = strpos($texto, '/', $posicao_inicio + 1);
    if ($posicao_fim !== false) {
        $texto_entre_barras = substr($texto, $posicao_inicio + 1, $posicao_fim - $posicao_inicio - 1);
        return $texto_entre_barras;
    }
}
}
session_start();
if (!(array_key_exists("key_init",$_SESSION))){
    $t = 16; $ba = random_bytes($t); $ca = bin2hex($ba); $_SESSION["key_init"]=$ca;
}
// function verificar($conn,$database_name){
//     $result = $conn->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database_name'");
    
//     if ($result->num_rows == 0) {
//         // O banco de dados não existe, então crie-o
//         $sql = "CREATE DATABASE $database_name";
    
//         if ($conn->query($sql) === TRUE) {
//         } else {
//         }
//     } else {
//     }
// }
//$url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$url=$_GET['route'];
$params=explode("/",$url);
if ($_SERVER["REQUEST_METHOD"] == "GET") {
if ($url=="/"){
    include(__DIR__ . '/index.php');
} else if ($params[0]=="admin" && array_key_exists("key",$_SESSION) && descrip($_SESSION["key"],$c)){
    $usuario;
    if ($url=="admin"){
        include(__DIR__ . "/admin_inicio/index.php");
    } else if ($params[0]=="admin" && count($params)>1 &&  $params[1]=="noticias_edit"){
            $usuario=descrip($_SESSION["key"],$c);
            $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_posts");
            $id = explode('/', $url)[2]; // Divide a URI em partes
            $id=intval($id);
            $s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND id=?");$s->bind_param("si",$usuario,$id);$s->execute();$result=$s->get_result();
            $r=[];
            if ($result->num_rows>0){
                while ($row = $result->fetch_assoc()) { $r[] = $row; }
            }
            include(__DIR__ . "/admin_noticias_cadastro/noticias_edit.php");
    } else{
        $usuario=descrip($_SESSION["key"],$c);
        switch ($url){
            case 'admin': include(__DIR__ . "/admin_barra/cadastro_usuario.php");break;
            case 'admin/noticias_cadastro': include(__DIR__ . "/admin_noticias_cadastro/noticias_cadastro.php");break;
            case 'admin/noticias_lista':
                $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_posts");
                $s=$conn->prepare("SELECT * FROM post WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
                $r=[];
                if ($result->num_rows>0){
                    while ($row = $result->fetch_assoc()) { $r[] = $row; }
                }
                include(__DIR__ . "/admin_noticias_lista/noticias_lista.php");break;
            case 'admin/config_cadastro':
                include(__DIR__ . "/admin_config/config_cadastro.html");break;
            case 'admin/sair':
                $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_ip");
                $s=$conn->prepare("DELETE FROM ips_logados WHERE ip=?");
                $ip=$_SESSION["key_init"];
                $s->bind_param("s",$ip);
                $result=$s->execute();
                header("location: /");
                break;
            default:
            header("HTTP/1.0 404 Not Found");
            include(__DIR__ . "/erro/404.html");
        }
    }
} else if ($params[0]=="admin" && (!array_key_exists("key",$_SESSION) || !descrip($_SESSION["key"],$c))){
    include (__DIR__ . "/admin_login/admin_init.php");
} else if ($params[0]=="noticia"){
    $id=intval($params[1]);
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_posts");
    $s=$conn->prepare("SELECT * FROM post WHERE id=?");
    $s->bind_param("i",$id);
    $s->execute();
    $result=$s->get_result();
    if ($result->num_rows>0){
        $r=[];
        while ($row = $result->fetch_assoc()) {
                $r[] = $row;
        }
        $acessos=$r[0]["acessos"]+1;
        $s=$conn->prepare("UPDATE post SET acessos=? WHERE id=?");
        $s->bind_param("ii",$acessos,$id);
        $s->execute();
        include(__DIR__ . "/posts/post.php");
    } else {
        header("HTTP/1.0 404 Not Found");include(__DIR__ . "/erro/404.html");
    }
}else if ($url=="reload"){
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea");
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_posts");
    $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT, acessos INT, id INT)");
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_ip");
    $conn->query("CREATE TABLE IF NOT EXISTS ips_logados(ip TEXT,usuario TEXT)");
    $conn->query("CREATE TABLE IF NOT EXISTS ips(ip VARCHAR(255),n INT,d VARCHAR(255))");
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_config");
    $conn->query("CREATE TABLE IF NOT EXISTS config_noticias(selects JSON,categorias JSON)");
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_users");
    $conn->query("CREATE TABLE IF NOT EXISTS user(id INT, nome TEXT, email TEXT, senha TEXT, cargo JSON)");
} else {
        header("HTTP/1.0 404 Not Found");include(__DIR__ . "/erro/404.html");
}
}
?>