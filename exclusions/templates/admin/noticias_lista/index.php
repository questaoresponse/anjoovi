<div id="server">
<script>
    window.token="teste";
    window.noticias=<?php echo json_encode($r)?>; window.noticias.reverse();
    window.usuario=<?php echo json_encode([$usuario])?>;
    window.n_registros=<?php echo json_encode($num)?>;
</script>
</div>
<?php 
function a(){
    include(__DIR__ . '/admin.html');
}
if (isset($cargo)){
    if ($cargo=="admin"){
        include(__DIR__ . '/admin.html');
    } else {
        a();
    }
} else {
    a();
}
// include(__DIR__ . '/../admin_inicio/index.php');
?>
<!-- @if (isset($cargo))
    @if ($cargo=="admin")
        @include('admin.noticias_lista.admin')
    @else
        @include('admin.noticias_lista.main')
    @endif
@else
    @include('admin.noticias_lista.main')
@endif

@include('admin.admin_inicio.index') -->