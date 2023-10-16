<script>
window.r=<?php echo json_encode($r ? $r : ["type"=>"null"]) ?>
</script>
<?php
include(__DIR__ . "/admin.html");
include(__DIR__ . "/../admin_barra/cadastro_usuario.html");
?>