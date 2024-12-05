<div id="server">
<script>
    window.select_options=@json($r);
    window.usuario=@json($usuario);
    window.token="teste";
</script>
</div>
<?php 
include(__DIR__ . '/main.html');
// include(__DIR__ . '/../admin_inicio/index.php');
?>
<!-- @include('admin.categorias_cadastro.main')
@include('admin.admin_inicio.index') -->