<!-- <?php
$con
?> -->
<script>
    window.select_options=<?php echo json_encode($r)?>;
</script>
<?php
include(__DIR__ . "/index.html");
include(__DIR__ . "/../admin_barra/cadastro_usuario.html")
?>