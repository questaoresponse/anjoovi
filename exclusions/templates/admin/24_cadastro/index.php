<div id="server">
<script>
    window.token="teste";
    window.select_options=<?php echo json_encode($select_options) ?>;
    window.usuario=<?php echo json_encode([$usuario]) ?>;
    </script>
</div>
<?php 
// function a(){
//     include(__DIR__ . '/main.html');
// }
if (isset($cargo)){
    if ($cargo=="admin"){
        include(__DIR__ . '/admin.html');
    } else {
        include(__DIR__ . '/main.html');
    }
} else {
    include(__DIR__ . '/main.html');
}
// include(__DIR__ . '/../admin_inicio/index.php');
?>
<!-- @if (isset($cargo))
    @if ($cargo=="admin")
        @include('admin.noticias_cadastro.admin')
    @else
        @include('admin.noticias_cadastro.main')
    @endif
@else
    @include('admin.noticias_cadastro.main')
@endif
@include('admin.admin_inicio.index') -->