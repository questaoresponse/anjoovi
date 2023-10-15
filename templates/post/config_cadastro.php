<?php
$tipo=$_POST["tipo"];
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
function p($result){
    $resultados=[];
    while ($row = $result->fetch_assoc()) {
            $resultados[] = $row;
    }
    return $resultados;
}
if ($tipo=="config_cadastro"){
    $opcao=$_POST["opcao"];
    $conn = new mysqli("127.0.0.1:3306", "root",null,"config");
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
    $ip = $_SERVER['REMOTE_ADDR'];
    $conn = new mysqli("127.0.0.1:3306", "root",null,"ip");
    $conn->query("CREATE TABLE IF NOT EXISTS ips_logados(ip TEXT,usuario TEXT)");
    $s=$conn->prepare("SELECT * FROM ips_logados WHERE ip=?");
    $s->bind_param("s",$ip);
    $s->execute();
    $result=$s->get_result();
    $r=[];
    while ($row = $result->fetch_assoc()) {
            $r[] = $row;
    }
    $usuario=$r[0]["usuario"];
    $categoria=$_POST["categoria"];
    $destaque=$_POST["destaque"];
    $titulo=$_POST["titulo"];
    $subtitulo=$_POST["subtitulo"];
    $texto;
    $imagem;
    $texto=isset($_POST["texto"]) ? $_POST["texto"] : "n";
    if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
        $nomeTemporario = $_FILES['imagem']['tmp_name'];
        $nomeDoArquivo = __DIR__ . '/../../images/' . $_FILES['imagem']['name'];
        move_uploaded_file($nomeTemporario, $nomeDoArquivo);
        $imagem=$_FILES['imagem']['name'];
    } else {
        $imagem="n";
    }
    $conn = new mysqli("127.0.0.1:3306", "root",null,"posts");
    $s=$conn->prepare("SELECT * FROM post WHERE titulo=?");
    $s->bind_param("s",$titulo);
    $s->execute();
    $result=$s->get_result();
    if ($result->num_rows==0){
        $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT)");
        $s=$conn->prepare("INSERT INTO post(usuario,categoria,destaque,titulo,subtitulo,texto,imagem) VALUES (?,?,?,?,?,?,?)");
        $s->bind_param("sssssss",$usuario,$categoria,$destaque,$titulo,$subtitulo,$texto,$imagem);
        $s->execute();
    } else {
        echo "true";
    }
}
?>