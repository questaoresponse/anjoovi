<?php
include(__DIR__ . "/../function.php");
$usuario;
$v=false;
if (isset($_SESSION["key"]) && descrip($_SESSION["key"],$c)){
    $v=true;
    $usuario=descrip($_SESSION["key"],$c);
}
?>
<script>
    window.usuario=<?php echo json_encode(isset($usuario) ? $usuario : null)?>;
    window.setStyle={elemento:"#inicio",color:"gray"};
</script>
<?php
if ($v){
    include(__DIR__ . "/../admin_barra/cadastro_usuario.php");
} else {
    include(__DIR__ . "/index.html");
}
?>