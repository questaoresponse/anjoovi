<script>
    window.isLogado=@json($usuario=="n" ? false : true);
    window.usuario=@json($usuario);
    window.logo=@json($logo);
</script>
@include('inicio.main')