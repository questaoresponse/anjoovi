<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.usuario=@json($usuario);
    window.select_options=@json($all);
    window.edit=true;
    window.categoria_edit=@json($r);
</script>
@include('dev.categorias_cadastro.main')
@include('dev.dev_inicio.index')