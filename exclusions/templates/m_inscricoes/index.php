<div id="server">
<script>
    window.cis=<?php echo json_encode($cis)?>;
    window.isLogado=<?php echo json_encode($usuario) ?>;
    window.usuario=<?php echo json_encode($usuario) ?>;
    window.mlogo=<?php echo json_encode($logo) ?>;
</script>
</div>
<?php
include(__DIR__ . '/index.html');
?>