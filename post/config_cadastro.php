<?php
$c=__DIR__ . "/../../key.json";
$url;
function descrip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_decrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
function p($result){
    $resultados=[]; while ($row = $result->fetch_assoc()) { $resultados[] = $row; }; return $resultados;
}
session_start();
if (isset($_SESSION["key"]) && descrip($_SESSION["key"],$c)){ 
if (isset($_SERVER['HTTP_REFERER'])) {
    $url= $_SERVER['HTTP_REFERER'];
}
$url_parts = parse_url($url);
$url = $url_parts['path'];
$params=explode("/",$url);
$tipo=$params[0]=="admin" ? $_POST["tipo"] : null;
function verificar($conn,$database_name){
    $result = $conn->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database_name'");   
    if ($result->num_rows == 0) {
        $sql = "CREATE DATABASE $database_name";
        if ($conn->query($sql) === TRUE) {
        } else {
        }
    }
}
if ($tipo=="config_cadastro"){
    $opcao=$_POST["opcao"];
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_config");
    //$conn->query("CREATE TABLE IF NOT EXISTS config_noticias(selects JSON,categorias JSON)");
    $result=$conn->query("SELECT selects FROM config_noticias");
    $r=p($result);
    $r=json_decode($r[0]["selects"]);
    $r[] = $opcao;
    $r=json_encode($r);
    $s=$conn->prepare("UPDATE config_noticias SET selects=?");
    $s->bind_param("s",$r);
    $s->execute();
}
if ($tipo=="noticias_cadastro"){
    session_start();
    $usuario = descrip($_SESSION["key"],$c);
    $categoria=$_POST["categoria"];
    $destaque=$_POST["destaque"];
    $titulo=$_POST["titulo"];
    $subtitulo=$_POST["subtitulo"];
    $acessos=0;
    $texto;
    $imagem;
    $texto=isset($_POST["texto"]) ? $_POST["texto"] : "n";
    if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
        $nomeTemporario = $_FILES['imagem']['tmp_name'];
        $nomeDoArquivo = __DIR__ . '/../images/' . $_FILES['imagem']['name'];
        move_uploaded_file($nomeTemporario, $nomeDoArquivo);
        $imagem=$_FILES['imagem']['name'];
    } else {
        $imagem="n";
    }
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_posts");
    $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT, acessos INT, id INT)");
    $result=$conn->query("SELECT id FROM post");
    $id;
    if ($result->num_rows==0){
        $id=1;
    } else {
        $id=p($result);
        $id=end($id)["id"]+1;
    }
    $s=$conn->prepare("INSERT INTO post(usuario,categoria,destaque,titulo,subtitulo,texto,imagem,acessos,id) VALUES (?,?,?,?,?,?,?,?,?)");
    $s->bind_param("sssssssii",$usuario,$categoria,$destaque,$titulo,$subtitulo,$texto,$imagem,$acessos,$id);
    $s->execute();
    echo "true";
}
if ($params[2]=="categorias_cadastro" && $_GET["type"]=="cadastro"){
    $nome=$_POST["nome"];
    $descricao=$_POST["descricao"];
    $link=$_POST["link"];
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_config");
    $conn->query("CREATE TABLE IF NOT EXISTS categorias(id INT,nome TEXT,descricao TEXT,link TEXT)");
    $result=$conn->query("SELECT id FROM categorias");
    $id;
    if ($result->num_rows==0){
        $id=1;
    } else {
        $id=p($result);
        $id=end($id)["id"]+1;
    }
    $s=$conn->prepare("INSERT INTO categorias(id,nome,descricao,link) VALUES(?,?,?,?)");
    $s->bind_param("isss",$id,$nome,$descricao,$link);
    $s->execute();
    $result=$conn->query("SELECT * FROM categorias");
    $r=p($result);
    echo json_encode($r);
}
if ($params[2]=="categorias_edit" && $_GET["type"]=="edit"){
    $nome=$_POST["nome"];
    $descricao=$_POST["descricao"];
    $link=$_POST["link"];
    $id=$params[3];
    $id=intval($id);
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_config");
    $s=$conn->prepare("UPDATE categorias SET nome=?,descricao=?,link=? WHERE id=?");
    $s->bind_param("sssi",$nome,$descricao,$link,$id);
    $s->execute();
    $result=$conn->query("SELECT * FROM categorias");
    $r=p($result);
    echo json_encode($r);
}
if (($params[2]=="categorias_edit" || $params[2]=="categorias_cadastro") && $_GET["type"]=="remove"){
    $id=$_GET["id"];
    $id=intval($id);
    $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_config");
    $s=$conn->prepare("DELETE FROM categorias WHERE id=?");
    $s->bind_param("i",$id);
    $s->execute();
    $result=$conn->query("SELECT * FROM categorias");
    $r=p($result);
    echo json_encode($r);
}
}

?>