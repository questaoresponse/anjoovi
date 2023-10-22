<?php 
include(__DIR__ . "/../function.php");
$conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
$p = '%' . $_GET["q"] . '%' ;
$s = $conn->prepare("SELECT * FROM post WHERE LOWER(titulo) LIKE LOWER(?) AND lixeira='false'");
$s->bind_param("s", $p);
$s->execute();
$result = $s->get_result();
$r=p($result);
?>
<script>
    window.posts=<?php echo json_encode($r) ?>;
</script>
<?php
include(__DIR__ . "/index.html");
include(__DIR__ . "/../inicio/index.php");
?>