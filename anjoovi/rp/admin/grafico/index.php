<?php
include(__DIR__ . "/../../function.php");
include(__DIR__ . "/../admin_v.php");
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
$usuario=descrip($_SESSION["key"],$c);
$s=$conn->prepare("SELECT acessos FROM post WHERE usuario=? AND lixeira='false'");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
$r=p($result);
?>
<script>
    window.acessos=<?php echo json_encode($r)?>
</script>
<?php
include(__DIR__ . "/index.html");
include (__DIR__ . "/../../admin_barra/cadastro_usuario.html");
?>