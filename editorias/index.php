<?php
include(__DIR__ . "/../function.php");
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
$result=$conn->query("SELECT * FROM categorias");
$r;
if ($result->num_rows>0){
    $r=p($result);
}else{
    $r=[];
}
?>
<script>
    window.categorias=<?php echo json_encode($r) ?>;
</script>
<?php
    include(__DIR__ . "/index.html");
    include(__DIR__ . "/../inicio/index.php");
?>