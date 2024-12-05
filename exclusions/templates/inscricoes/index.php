<div id="server">
<script>
    window.isLogado=<?php echo json_encode($usuario) ?>;
    window.posts=<?php echo json_encode($r)?>;
    window.canal=<?php echo json_encode($canal) ?>;
    window.st=<?php echo json_encode($r2) ?>;
    window.mlogo=<?php echo json_encode($logo) ?>;
    window.isLogado=<?php echo json_encode($usuario) ?>;
    window.usuario=<?php echo json_encode($usuario) ?>;
</script>
</div>
<?php
include(__DIR__ . '/index.html');
include(__DIR__ . '/script.html');
?>