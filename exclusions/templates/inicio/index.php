<div id="server">
<script>
    window.isLogado=<?php echo json_encode($usuario ? true : false) ?>;
    window.usuario=<?php echo json_encode($usuario) ?>;
    window.mlogo=<?php echo json_encode($logo) ?>;
    window.isLogado=<?php echo json_encode($usuario) ?>;
    window.usuario=<?php echo json_encode($usuario) ?>;
</script>
</div>
<?php
include(__DIR__ . '/main.html');
?>