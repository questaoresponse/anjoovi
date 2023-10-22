<?php
include(__DIR__ . "/../../function.php");
include(__DIR__ . "/../admin_v.php");
$v=true;
$id=$_GET["id"];
$id=intval($id);
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
$result=$conn->query("SELECT * FROM categorias");
$all=[];
 if ($result->num_rows>0){
    while ($row = $result->fetch_assoc()) { $all[] = $row; }
 } else {
    $v=false;
 }
$conn = new mysqli("localhost:3306", $ub, $sb,"anjoov00_config");
$s=$conn->prepare("SELECT * FROM categorias WHERE id=?");
$s->bind_param("i",$id);
$s->execute();
$result=$s->get_result();
$r=[];
while ($row = $result->fetch_assoc()) { $r[] = $row; }
?>
<script>
    if (<?php echo json_encode($v)?>){
        window.select_options=<?php echo json_encode($all) ?>;
        window.edit=true;
        window.categoria_edit=<?php echo json_encode($r) ?>;
    }
</script>
<?php
if ($v){
    include(__DIR__ . "/../categorias_cadastro/index.html");
    include(__DIR__ . "/../../admin_barra/cadastro_usuario.html");
}
?>