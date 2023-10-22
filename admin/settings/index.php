<?php 
    include(__DIR__ . "/../../function.php");
    include(__DIR__ . "/../admin_v.php");
    $usuario="n";
    if (isset($_SESSION["key"]) && descrip($_SESSION["key"],$c)){
        $usuario=descrip($_SESSION["key"],$c);
    }
?>
<script>
    window.usuario=<?php echo json_encode($usuario);?>;
</script>
<?php 
include(__DIR__ . "/index.html");
?>