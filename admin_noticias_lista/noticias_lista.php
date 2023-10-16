<script>
    window.noticias=<?php echo json_encode($r)?>;
    window.usuario=<?php echo json_encode([$usuario])?>
</script>
<?php
include(__DIR__ . "/noticias_lista.html");
include (__DIR__ . "/../admin_barra/cadastro_usuario.html");
?>