<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.select_options=@json($r);
    window.usuario=@json($usuario);
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
</script>
@include('admin.categorias_cadastro.main')
@include('admin.admin_inicio.index')