<?php
include(__DIR__ . "/../../function.php");
include(__DIR__ . "/../admin_v.php");
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
$result=$conn->query("SELECT nome FROM categorias");
$r;
if ($result->num_rows>0){
    $r=p($result);
} else {
    $r=[];
}
$select_options=$r;
$usuario=descrip($_SESSION["key"],$c);
?>
<script>
    window.select_options=<?php echo json_encode($select_options)?>;
    window.usuario=<?php echo json_encode([$usuario])?>;
    window.setStyle={elemento:"#noticias_lista",color:"gray"};
</script>
<?php
include(__DIR__ . "/index.html");
include (__DIR__ . "/../../admin_barra/cadastro_usuario.php");
?>