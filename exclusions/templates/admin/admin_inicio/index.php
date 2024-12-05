<script>
    if (<?php echo json_encode(isset($usuario))?>){
    window.usuario=<?php echo json_encode($usuario) ?>;
    }
</script>
<?php 
function b(){
    // include(__DIR__ . '/main.html');
}
$cargo=cargo($usuario);
if (isset($cargo)){
    if ($cargo=="admin"){
        // include(__DIR__ . '/admin.html');
    } else {
        b();
    }
} else {
    b();
}
?>
<div id="server">
<script>
    window.cargo=<?php echo json_encode($cargo)?>;
</script>
</div>
<div id="script">
<script src="/templates/admin/admin_inicio/index.js"></script>
</div>

<!-- @if (isset($cargo))
    @if ($cargo=="admin")
        @include('admin.admin_inicio.admin')
    @else
        @include('admin.admin_inicio.main')
    @endif
@else
    @include('admin.admin_inicio.main')
@endif -->