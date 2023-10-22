<?php
include(__DIR__ . "/../../function.php");
include(__DIR__ . "/../admin_v.php");
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
$result=$conn->query("SELECT * FROM categorias");
$r=[];
while ($row = $result->fetch_assoc()) { $r[] = $row; }
?>
<script>
    window.select_options=<?php echo json_encode($r)?>;
</script>
<?php
include(__DIR__ . "/index.html");
include(__DIR__ . "/../../admin_barra/cadastro_usuario.html");
?>