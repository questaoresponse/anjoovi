<?php
include(__DIR__ . "/../../function.php");
include(__DIR__ . "/../admin_v.php");
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
$usuario=descrip($_SESSION["key"],$c);
$s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND lixeira='false'");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
$r=[];
if ($result->num_rows>0){
    while ($row = $result->fetch_assoc()) { $r[] = $row; }
}
?>
<script>
    window.noticias=<?php echo json_encode($r)?>;
    window.usuario=<?php echo json_encode([$usuario])?>;
</script>
<?php
include(__DIR__ . "/index.html");
include (__DIR__ . "/../../admin_barra/cadastro_usuario.html");
?>