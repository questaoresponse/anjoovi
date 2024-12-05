<div id="server">
<script>
    window.usuarios_lista=<?php echo json_encode($r) ?>;
    window.usuario=<?php echo json_encode($usuario) ?>;
</script>
</div>
<?php
include(__DIR__ . '/main.html');
// include(__DIR__ . '/../admin_inicio/index.php');
?>