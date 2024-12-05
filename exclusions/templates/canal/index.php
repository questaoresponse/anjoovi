<div id="server">
<script>
    window.canal={};
    window.canal.name=<?php echo json_encode($info[0]["usuario"]) ?>;
    window.posts=<?php echo json_encode($posts) ?>;
    window.n=<?php echo json_encode($num) ?>;
    window.info=<?php echo json_encode($info[0]) ?>;
    window.inscrito=<?php echo json_encode($inscrito) ?>;
    window.isLogado=<?php echo json_encode($usuario) ?>;
    window.usuario=<?php echo json_encode($usuario) ?>;
    window.mlogo=<?php echo json_encode($logo) ?>;
</script>
</div>
<?php
include(__DIR__ . '/main.html');
// include(__DIR__ . '/../inicio/index.php');
?>
<!-- @include('canal.main')
@include('inicio.index') -->