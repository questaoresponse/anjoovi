<!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->
<div id="server">
<script>
    // window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.token="teste";
    window.usuario=<?php echo json_encode($usuario) ?>;
    window.select_options=<?php echo json_encode($all) ?>;
    window.edit=true;
    window.categoria_edit=<?php echo json_encode($r) ?>;
</script>
</div>
<?php
include(__DIR__ . '/../categorias_cadastro/main.html');
// include(__DIR__ . '/../admin_inicio/index.php');
?>
<!-- @include('admin.categorias_cadastro.main')
@include('admin.admin_inicio.index') -->