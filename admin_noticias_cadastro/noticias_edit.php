<?php
function p($result){
$resultados=[];
while ($row = $result->fetch_assoc()) {
        $resultados[] = $row;
}
return $resultados;
}
$conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_config");
$conn->query("CREATE TABLE IF NOT EXISTS config_noticias(selects JSON,categorias JSON)");

$result=$conn->query("SELECT * FROM config_noticias");
$r2;
if ($result->num_rows>0){
    $r2=p($result);
}else{
    $s=$conn->prepare("INSERT INTO config_noticias(selects,categorias) VALUES(?,?)");
    $j1=json_encode([]);
    $j2=$j1;
    $s->bind_param("ss",$j1,$j2);
    $s->execute();
    
}
$select_options=$r2;
?>
<script>
    window.select_options=<?php echo json_encode($select_options)?>;
    window.usuario=<?php echo json_encode([$usuario])?>;
    window.edit="true";
    window.post_edit=<?php echo json_encode($r) ?>;
    window.setStyle={elemento:"#noticias_lista",color:"gray"};
</script>
<?php
include(__DIR__ . "/noticias_cadastro.html");
include(__DIR__ . "/../admin_barra/cadastro_usuario.html");
?>