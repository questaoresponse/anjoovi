<script>
    window.isLogado=@json($usuario=="n" ? false : true);
    window.usuario=@json($usuario);
</script>
@include('inicio.main')