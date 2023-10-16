<?php
$c=__DIR__ . "/../../key.json";
function descrip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_decrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
$tipo=$_POST["tipo"];
function verificar($conn,$database_name){
    $result = $conn->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database_name'");   
    if ($result->num_rows == 0) {
        $sql = "CREATE DATABASE $database_name";
        if ($conn->query($sql) === TRUE) {
        } else {
        }
    }
}
function p($result){
    $resultados=[]; while ($row = $result->fetch_assoc()) { $resultados[] = $row; }; return $resultados;
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
?>