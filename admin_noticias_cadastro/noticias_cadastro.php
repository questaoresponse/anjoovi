<?php
function p($result){
$resultados=[];
while ($row = $result->fetch_assoc()) {
        $resultados[] = $row;
}
return $resultados;
}
// $conn->query("CREATE TABLE config(select_options JSON)");
// function verificar($conn,$database_name){
//     $result = $conn->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database_name'");
    
//     if ($result->num_rows == 0) {
//         // O banco de dados não existe, então crie-o
//         $sql = "CREATE DATABASE $database_name";
    
//         if ($conn->query($sql) === TRUE) {
//         } else {
//         }
//     } else {
//     }
// }
$conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_config");
//verificar($conn,"anjoov00_config");
//$conn->query("DROP TABLE config_noticias");
$conn->query("CREATE TABLE IF NOT EXISTS config_noticias(selects JSON,categorias JSON)");

$result=$conn->query("SELECT * FROM config_noticias");
$r;
if ($result->num_rows>0){
    $r=p($result);
}else{
    $s=$conn->prepare("INSERT INTO config_noticias(selects,categorias) VALUES(?,?)");
    $j1=json_encode([]);
    $j2=$j1;
    $s->bind_param("ss",$j1,$j2);
    $s->execute();
    
}
$select_options=$r;
?>
<script>
    window.select_options=<?php echo json_encode($select_options)?>;
    window.usuario=<?php echo json_encode([$usuario])?>
</script>
<?php
include(__DIR__ . "/noticias_cadastro.html");
include (__DIR__ . "/../admin_barra/cadastro_usuario.php");
?>