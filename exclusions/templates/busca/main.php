<div id="server">
<script>
    window.posts=<?php echo json_encode($r) ?>;
    window.canal=<?php echo json_encode($canal) ?>;
    window.n_registros=<?php echo json_encode($n) ?>;
    window.isLogado=<?php echo json_encode($usuario) ?>;
    window.usuario=<?php echo json_encode($usuario) ?>;
    window.mlogo=<?php echo json_encode($usuario) ?>;
</script>
</div>
<?php
include(__DIR__ . '/index.html');
// include(__DIR__ . '/../inicio/index.php');
?>
<!-- @include('busca.main')
@include('inicio.index') -->