<div id="server">
<script>
    window.post=<?php echo json_encode($r)?>;
    window.isLogado=<?php echo json_encode($usuario) ?>;
    window.usuario=<?php echo json_encode($usuario) ?>;
    window.mlogo=<?php echo json_encode($logo) ?>;
</script>
</div>
<?php
include(__DIR__ . '/main.html');
?>
<!-- @include('noticia.main')
@include('inicio.index') -->