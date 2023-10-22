<?php
$usuario="n";
$url;
if (isset($_SESSION["key"]) && descrip($_SESSION["key"],$c)){
    $usuario=descrip($_SESSION["key"],$c);
}
?>
<script>
    window.isLogado=<?php echo json_encode($usuario=="n" ? false : true)?>;
    window.usuario=<?php echo json_encode($usuario)?>;
</script>
<?php
if (!(array_key_exists("key_init",$_SESSION))){
    $t = 16; $ba = random_bytes($t); $ca = bin2hex($ba); $_SESSION["key_init"]=$ca;
}
include(__DIR__ . "/index.html");
?>