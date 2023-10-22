
<?php
include(__DIR__ . "/../function.php");
$id=$_GET["id"];
$id=intval($id);
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
$s=$conn->prepare("SELECT * FROM post WHERE id=?");
$s->bind_param("i",$id);
$s->execute();
$result=$s->get_result();
$r=[];
if ($result->num_rows>0){
    $r=p($result);
    $r[0]["acessos"]++;
    $acessos=$r[0]["acessos"];
    $s=$conn->prepare("UPDATE post SET acessos=? WHERE id=?");
    $s->bind_param("ii",$acessos,$id);
    $s->execute();
} else {
    header("location: /erro/");
}
?>
<script>
    window.post=<?php echo json_encode($r) ?>
</script>
<?php
include(__DIR__ . "/index.html");
include(__DIR__ . "/../inicio/index.php");
?>