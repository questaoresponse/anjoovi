<?php
include(__DIR__ . "/../../function.php");
include(__DIR__ . "/../admin_v.php");
$usuario=descrip($_SESSION["key"],$c);
echo $usuario;
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
$id=$_GET["id"];
$id=intval($id);
$s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND id=?");$s->bind_param("si",$usuario,$id);$s->execute();$result=$s->get_result();
$r=p($result);
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
$result=$conn->query("SELECT nome FROM categorias");
$r2;
if ($result->num_rows>0){
    $r2=p($result);
}else{
    $r2=[];
}
$select_options=$r2;
?>
<script>
    window.select_options=<?php echo json_encode($select_options)?>;
    window.usuario=<?php echo json_encode([$usuario])?>;
    window.edit=true;
    window.post_edit=<?php echo json_encode($r) ?>;
    window.setStyle={elemento:"#noticias_lista",color:"gray"};
</script>
<?php
    include(__DIR__ . "/../noticias_cadastro/index.html");
    include(__DIR__ . "/../../admin_barra/cadastro_usuario.html");
?>