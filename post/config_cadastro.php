<?php
$c=__DIR__ . "/../../key.json";
$url;
function descrip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_decrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
function crip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_encrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
function p($result){
    $resultados=[]; while ($row = $result->fetch_assoc()) { $resultados[] = $row; }; return $resultados;
}
$ub;
$sb;
$pc=__DIR__ . "/../../banco.json";
$ks=json_decode(file_get_contents($pc));$ub=$ks->user;$sb=$ks->senha;
session_start();
if (isset($_SERVER['HTTP_REFERER'])) {
    $url= $_SERVER['HTTP_REFERER'];
}
$url_parts = parse_url($url);
$url = $url_parts['path'];
$params=explode("/",$url);
$type=isset($_GET["type"]) ? $_GET["type"] : null;
if ($params[1]=="admin" && count($params)==3){
    function cript($usuario){
        global $c;
        $k=crip($usuario,$c);
        $_SESSION["key"]=$k;
    }
    $type=$_POST["type"];
    if ($type=="login"){
        $email=$_POST["email"];
        $senha=$_POST["senha"];
        $conn=new mysqli("localhost:3306", $ub,$sb,"anjoov00_users_conteudo");
        $conn->query("CREATE TABLE IF NOT EXISTS user(nome TEXT, usuario TEXT, email TEXT, senha TEXT,data_n TEXT)");
        $s=$conn->prepare("SELECT usuario,email,senha FROM user WHERE (usuario=? || email=?) AND senha=?");
        $s->bind_param("sss",$email,$email,$senha);$s->execute();$result=$s->get_result();
        if ($result->num_rows>0){
            $usuario=p($result)[0]["usuario"];
            cript($usuario);
            echo "true";
        } else {
            echo "false";
        }
    } else if ($type=="cadastro"){
        $nome=$_POST["nome"];
        $usuario=$_POST["usuario"];
        $email=$_POST["email"];
        $senha=$_POST["senha"];
        $month=$_POST["month"];
        $day=$_POST["day"];
        $year=$_POST["year"];
        $conn=new mysqli("localhost:3306", $ub,$sb,"anjoov00_users_conteudo");
        $s=$conn->prepare("SELECT * FROM user WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
        if ($result->num_rows>0){
            echo "false";
        } else {
            $data = new DateTime("$year-$month-$day");
            $data_str= $data->format('d/m/Y');
            $s=$conn->prepare("INSERT INTO user(nome,usuario,email,senha,data_n) VALUES(?,?,?,?,?)");$s->bind_param("sssss",$nome,$usuario,$email,$senha,$data_n);$s->execute();
            cript($usuario);
            echo "true";
        }
        }
};
if (isset($_SESSION["key"]) && descrip($_SESSION["key"],$c) && $url_parts["path"]!="/admin/"){ 
$tipo=$params[1]=="admin" ? $_POST["tipo"] : null;
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
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
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
if ($tipo=="noticias_lista" && $type=="remove"){
    $usuario=descrip($_SESSION["key"],$c);
    $id=$_POST["id"];
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
    $s=$conn->prepare("SELECT * FROM post WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
    // unlink(__DIR__ . "/../images/" . p($result)[0]["imagem"]);
    //$s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?");$s->bind_param("is",$id,$usuario);$s->execute();
    $s=$conn->prepare("UPDATE post SET lixeira='true' WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
    $s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND lixeira='false'");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
    $r=[]; while ($row = $result->fetch_assoc()) { $r[] = $row; }; echo json_encode($r);
}
if ($tipo=="noticias_cadastro"){
    $usuario = descrip($_SESSION["key"],$c);
    $categoria=$_POST["categoria"];
    $destaque=$_POST["destaque"];
    $titulo=$_POST["titulo"];
    $subtitulo=$_POST["subtitulo"];
    $acessos=0;
    $texto;
    $imagem;
    $id=$type=="cadastro" ? null : $_POST["id"];
    $texto=isset($_POST["texto"]) ? $_POST["texto"] : "n";
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
    $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT, acessos INT, id INT, lixeira TEXT)");
    if ($type=="cadastro"){
        $result=$conn->query("SELECT id FROM post");
        $id;
        if ($result->num_rows==0){
            $id=1;
        } else {
            $id=p($result);
            $id=end($id)["id"]+1;
        }
    }
    if (($type=="cadastro" || isset($_POST["imagem_edit"])) && isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
        $nomeTemporario = $_FILES['imagem']['tmp_name'];
        $nomeDoArquivo = __DIR__ . '/../images/' . $id . "_" . $_FILES['imagem']['name'];
        move_uploaded_file($nomeTemporario, $nomeDoArquivo);
        $imagem=$id . "_" . $_FILES['imagem']['name'];
    } else {
        $imagem=$type=="cadastro" ? "n" : $imagem=$_POST["imagem"];
    }
    if ($type=="cadastro"){
    $s=$conn->prepare("INSERT INTO post(usuario,categoria,destaque,titulo,subtitulo,texto,imagem,acessos,id,lixeira) VALUES (?,?,?,?,?,?,?,?,?,?)");
    $lixeira="false";
    $s->bind_param("sssssssiis",$usuario,$categoria,$destaque,$titulo,$subtitulo,$texto,$imagem,$acessos,$id,$lixeira);
    $s->execute();
    } else if ($type=="edit"){
    $s=$conn->prepare("UPDATE post SET categoria=?,destaque=?,titulo=?,subtitulo=?,texto=?,imagem=?,acessos=? WHERE usuario=? AND id=?");
    $s->bind_param("ssssssisi",$categoria,$destaque,$titulo,$subtitulo,$texto,$imagem,$acessos,$usuario,$id);
    $s->execute();
    }
    echo "true";
}
if ($params[2]=="categorias_cadastro" && $_GET["type"]=="cadastro"){
    $nome=$_POST["nome"];
    $descricao=$_POST["descricao"];
    $link=$_POST["link"];
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
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
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
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
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
    $s=$conn->prepare("DELETE FROM categorias WHERE id=?");
    $s->bind_param("i",$id);
    $s->execute();
    $result=$conn->query("SELECT * FROM categorias");
    $r=p($result);
    echo json_encode($r);
}
}

?>