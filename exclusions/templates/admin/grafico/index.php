<div id="server">
<script>
    window.usuarios=<?php echo json_encode($r) ?>;
</script>
</div>
<?php
include(__DIR__ . '/main.html');
// include(__DIR__ . '/../admin_inicio/index.php');
?>