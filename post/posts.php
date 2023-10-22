<?php
$c=__DIR__ . "/../../key.json";
$type=$_POST["type"];
$id=intval($_POST["id"]);
$conn = new mysqli("localhost:3306", $user,$senha,"anjoov00_posts");$result=$conn->query("SELECT id FROM post");
session_start();
function descrip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_decrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
$usuario=descrip($_SESSION["key"],$c);
switch ($type){
    case "delete":
        $s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?");$s->bind_param("is",$id,$usuario);$s->execute();
        $s=$conn->prepare("SELECT * FROM post WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
        $r=[]; while ($row = $result->fetch_assoc()) { $r[] = $row; }; echo json_encode($r);
        break;
    case "update":
        $s=$conn->prepare("SELECT * FROM post WHERE id=?");$s->bind_param("i",$id);$s->execute();$result=$s->get_result();
        $r=[]; while ($row = $result->fetch_assoc()) { $r[] = $row; }; echo json_encode($r);
        $imagem2=$r[0]["imagem"];
        $categoria=$_POST["categoria"];
        $destaque=$_POST["destaque"];
        $titulo=$_POST["titulo"];
        $subtitulo=isset($_POST["subtitulo"]) ? $_POST["subtitulo"] : "n";
        $texto;
        $imagem;
        $texto=isset($_POST["texto"]) ? $_POST["texto"] : "n";
        if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
            $nomeTemporario = $_FILES['imagem']['tmp_name'];
            $nomeDoArquivo = __DIR__ . '/../images/' . $_FILES['imagem']['name'];
            move_uploaded_file($nomeTemporario, $nomeDoArquivo);
            $imagem=$_FILES['imagem']['name'];
        } else {
            $imagem=$imagem2 ? $imagem2 : "n";
        }
        $conn = new mysqli("localhost:3306", $user,$senha,"anjoov00_posts");
        $s=$conn->prepare("UPDATE post SET categoria=?,destaque=?,titulo=?,subtitulo=?,texto=?,imagem=? WHERE id=? AND usuario=?");
        $s->bind_param("ssssssis",$categoria,$destaque,$titulo,$subtitulo,$texto,$imagem,$id,$usuario);
        $s->execute();
        echo "true";
}
?>