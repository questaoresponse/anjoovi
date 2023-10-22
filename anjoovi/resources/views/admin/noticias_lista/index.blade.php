<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.noticias=@json($r);
    window.usuario=@json([$usuario]);
</script>
@include('admin.noticias_lista.main')
@include('admin.admin_inicio.index')