<?php
// $c=__DIR__ . "/keys/key.json";
// $ub;
// $sb;
// $pc=__DIR__ . "/../banco.json";
// $ks=json_decode(file_get_contents($pc));$ub=$ks->user;$sb=$ks->senha;
// if (!file_exists($c)) {
//     $key = "31782212-00da-4358-8b84-d13de2b1a5f7";$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));$iv = base64_encode($iv);$conteudo=json_encode(["key"=>$key,"iv"=>$iv]);file_put_contents($c, $conteudo);
// }
// function crip($texto,$c){
//     $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_encrypt($texto, 'aes-256-cbc', $key, 0, $iv);
// }
// function descrip($texto,$c){
//     $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_decrypt($texto, 'aes-256-cbc', $key, 0, $iv);
// }
// function c($result){
//     $r=[];while ($row = $result->fetch_assoc()) { $r[] = $row; }; return $r;
// }
// function rt($texto){
//     $posicao_inicio = strpos($texto, '/');
// if ($posicao_inicio !== false) {
//     $posicao_fim = strpos($texto, '/', $posicao_inicio + 1);
//     if ($posicao_fim !== false) {
//         $texto_entre_barras = substr($texto, $posicao_inicio + 1, $posicao_fim - $posicao_inicio - 1);
//         return $texto_entre_barras;
//     }
// }
// }
// session_start();
// if (!(array_key_exists("key_init",$_SESSION))){
//     $t = 16; $ba = random_bytes($t); $ca = bin2hex($ba); $_SESSION["key_init"]=$ca;
// }
// $url=$_GET['route'];
// $params=explode("/",$url);
// if ($_SERVER["REQUEST_METHOD"] == "GET") {
// echo $url;
// if ($url=="/"){
//     include(__DIR__ . '/index.php');
// } else if ($params[0]=="admin" && array_key_exists("key",$_SESSION) && descrip($_SESSION["key"],$c)){
//     $usuario;
//     if ($url=="admin"){
//         include(__DIR__ . "/admin_inicio/index.php");
//     } else if ($params[0]=="admin" && count($params)>1 &&  $params[1]=="noticias_edit"){
//             $usuario=descrip($_SESSION["key"],$c);
//             $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
//             $id=$params[2];
//             $id=intval($id);
//             $s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND id=?");$s->bind_param("si",$usuario,$id);$s->execute();$result=$s->get_result();
//             $r=[];
//             if ($s->num_rows==0){
//                 if ($result->num_rows>0){
//                     while ($row = $result->fetch_assoc()) { $r[] = $row; };
//                 }
//                 include(__DIR__ . "/admin_noticias_cadastro/noticias_edit.php");
//             } else {
//                 include(__DIR__ . "/erro/404.html");
//             }
//         }else if ($params[0]=="admin" && count($params)>1 &&  $params[1]=="categorias_edit"){
//         $id=$params[2];
//         $id=intval($id);
//         $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
//         $result=$conn->query("SELECT * FROM categorias");
//          if ($result->num_rows>0){
//             $all=[];
//             while ($row = $result->fetch_assoc()) { $all[] = $row; }
//             include(__DIR__ . "/admin_categorias_cadastro/edit.php");
//         } else {
//             include(__DIR__ . "/erro/404.html");
//         }
//     } else{
//         $usuario=descrip($_SESSION["key"],$c);
//         switch ($url){
//             case 'admin': include(__DIR__ . "/admin_barra/cadastro_usuario.php");break;
//             case 'admin/noticias_cadastro': include(__DIR__ . "/admin_noticias_cadastro/noticias_cadastro.php");break;
//             case 'admin/noticias_lista':
//                 $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
//                 $s=$conn->prepare("SELECT * FROM post WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
//                 $r=[];
//                 if ($result->num_rows>0){
//                     while ($row = $result->fetch_assoc()) { $r[] = $row; }
//                 }
//                 include(__DIR__ . "/admin_noticias_lista/noticias_lista.php");break;
//             case 'admin/config_cadastro':
//                 include(__DIR__ . "/admin_config/config_cadastro.html");break;
//             case 'admin/categorias_cadastro':
//                 $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
//                 $result=$conn->query("SELECT * FROM categorias");
//                 $r=[];
//                 while ($row = $result->fetch_assoc()) { $r[] = $row; }
//                 include(__DIR__ . "/admin_categorias_cadastro/index.php");break;
//             case 'admin/sair':
//                 $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_ip");
//                 $s=$conn->prepare("DELETE FROM ips_logados WHERE ip=?");
//                 $ip=$_SESSION["key_init"];
//                 $_SESSION["key"]=null;
//                 $s->bind_param("s",$ip);
//                 $result=$s->execute();
//                 header("location: /");
//                 break;
//             default:
//             header("HTTP/1.0 404 Not Found");
//             include(__DIR__ . "/erro/404.html");
//         }
//     }
// } else if ($params[0]=="admin" && (!array_key_exists("key",$_SESSION) || !descrip($_SESSION["key"],$c))){
//     include (__DIR__ . "/login/index.html");
// } else if ($params[0]=="noticia"){
//     $id=intval($params[1]);
//     $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
//     $s=$conn->prepare("SELECT * FROM post WHERE id=?");
//     $s->bind_param("i",$id);
//     $s->execute();
//     $result=$s->get_result();
//     if ($result->num_rows>0){
//         $r=[];
//         while ($row = $result->fetch_assoc()) {
//                 $r[] = $row;
//         }
//         $acessos=$r[0]["acessos"]+1;
//         $s=$conn->prepare("UPDATE post SET acessos=? WHERE id=?");
//         $s->bind_param("ii",$acessos,$id);
//         $s->execute();
//         include(__DIR__ . "/posts/post.php");
//     } else {
//         header("HTTP/1.0 404 Not Found");include(__DIR__ . "/erro/404.html");
//     }
// } else if ($params[0]=="categoria"){
//     $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
//     $s=$conn->prepare("SELECT * FROM categorias WHERE link=?");
//     $s->bind_param("s",$params[1]);
//     $s->execute();
//     $result=$s->get_result();
//     if ($result->num_rows>0){
//         $rc=c($result);
//         $categoria=$rc[0]["nome"];
//         $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
//         $s=$conn->prepare("SELECT * FROM post WHERE categoria=?");
//         $s->bind_param("s",$categoria);
//         $s->execute();
//         $result=$s->get_result();
//         $r=c($result);
//         include(__DIR__ . "/categoria/index.php");
//     }else {
//         include(__DIR__ . "/erro/404.html");
//     }
// }else if ($url=="editorias"){
//     $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
//     $result=$conn->query("SELECT * FROM categorias");
//     $r=c($result);
//     include(__DIR__ . "/editorial/index.php");
// } else if ($params[0]=="busca"){
//     $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
//     $p = '%' . $params[1] . '%' ;
//     $s = $conn->prepare("SELECT * FROM post WHERE LOWER(titulo) LIKE LOWER(?)");
//     $s->bind_param("s", $p);
//     $s->execute();
//     $result = $s->get_result();
//     $r=c($result);
//     include(__DIR__ . "/busca/index.php");
// } else if ($url=="settings"){
//     include(__DIR__ . "/settings/index.php");
// } else if ($params[0]=="canal" && count($params)>1){
//     $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_users_conteudo");
//     $s=$conn->prepare("SELECT * FROM user WHERE usuario=?");$s->bind_param("s",$params[1]);$s->execute();$result=$s->get_result();
//     if ($result->num_rows>0){
//         $r=c($result);
//         include(__DIR__ . "/canal/index.php");
//     } else {
//         include(__DIR__ . "/erro/404.html");
//     }
// } else if ($url=="r"){
//    header("location: http://192.168.18.3:5500/anjoovi/login/index.html");
// } else if ($url=="reload"){
//     $conn = new mysqli("localhost:3306", $ub,$sb);
//     $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
//     $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT, acessos INT, id INT)");
//     $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_ip");
//     $conn->query("CREATE TABLE IF NOT EXISTS ips_logados(ip TEXT,usuario TEXT)");
//     $conn->query("CREATE TABLE IF NOT EXISTS ips(ip VARCHAR(255),n INT,d VARCHAR(255))");
//     $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
//     $conn->query("CREATE TABLE IF NOT EXISTS categorias(id INT,nome TEXT,descricao TEXT,link TEXT)");
//     $conn->query("CREATE TABLE IF NOT EXISTS config_noticias(selects JSON,categorias JSON)");
//     $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_users");
//     $conn->query("CREATE TABLE IF NOT EXISTS user(id INT, nome TEXT, email TEXT, senha TEXT, cargo JSON)");
// } else {
//         header("HTTP/1.0 404 Not Found");include(__DIR__ . "/erro/404.html");
// }
// }
header("location: /erro/");
?>