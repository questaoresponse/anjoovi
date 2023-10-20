<?php
$conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_config");
$s=$conn->prepare("SELECT * FROM categorias WHERE id=?");
$s->bind_param("i",$id);
$s->execute();
$result=$s->get_result();
$r=[];
while ($row = $result->fetch_assoc()) { $r[] = $row; }
?>
<script>
    window.select_options=<?php echo json_encode($all) ?>;
    window.edit=true;
    window.categoria_edit=<?php echo json_encode($r) ?>;
</script>
<?php
include(__DIR__ . "/index.html");
include(__DIR__ . "/../admin_barra/cadastro_usuario.html");
?>