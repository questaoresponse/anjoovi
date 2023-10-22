<?php
include(__DIR__ . "/../function.php");
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_users_conteudo");
$s=$conn->prepare("SELECT * FROM user WHERE usuario=?");$s->bind_param("s",$_GET["name"]);$s->execute();$result=$s->get_result();
if ($result->num_rows>0){
    $r=p($result);
} else {
    header("location: /erro/");
}
?>
<script>
    window.canal={};
    window.canal.name=<?php echo json_encode($r[0]["usuario"])?>;
</script>
<?php
    include(__DIR__ . "/index.html");
    include(__DIR__ . "/../inicio/index.php");
?>