<script>
    if (@json($usuario)){
    window.usuario=@json($usuario);
    }
    window.setStyle={elemento:"#inicio",color:"gray"};
</script>
@include('admin.admin_inicio.main')