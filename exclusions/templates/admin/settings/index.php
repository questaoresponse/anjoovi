<div id="server">
<script>
    window.token="teste";
    window.usuario=<?php echo json_encode($usuario) ?>;
    window.config=<?php echo json_encode($config) ?>;
</script>
</div>
<?php 
include(__DIR__ . '/main.html');
// include(__DIR__ . '/../admin_inicio/index.php');
?>