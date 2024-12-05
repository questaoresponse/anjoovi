<div id="server">
<script>
    window.id=<?php echo json_encode($id)?>;
    window.posts=<?php echo json_encode($posts)?>;
    window.isLogado=<?php echo json_encode($usuario) ?>;
    window.usuario=<?php echo json_encode($usuario) ?>;
</script>
</div>
<?php
include(__DIR__ . '/index.html');
?>
