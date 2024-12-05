<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.select_options=@json($r);
    window.usuario=@json($usuario);
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
</script>
@include('dev.categorias_cadastro.main')
@include('dev.dev_inicio.index')