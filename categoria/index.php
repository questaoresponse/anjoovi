<?php
include(__DIR__ . "/../function.php");
$id=$_GET["name"];
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
$s=$conn->prepare("SELECT * FROM categorias WHERE link=?");
$s->bind_param("s",$_GET["name"]);
$s->execute();
$result=$s->get_result();
if ($result->num_rows>0){
    $rc=p($result);
    $categoria=$rc[0]["nome"];
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
    $s=$conn->prepare("SELECT * FROM post WHERE categoria=? AND lixeira='false'");
    $s->bind_param("s",$categoria);
    $s->execute();
    $result=$s->get_result();
    $r=p($result);
} else {
    header("location: /erro/");
}
?>
<script>
    window.categoria=<?php echo json_encode($categoria) ?>;
    window.posts=<?php echo json_encode($r) ?>;
</script>
<?php
include(__DIR__ . "/index.html");
include(__DIR__ . "/../inicio/index.php");
?>