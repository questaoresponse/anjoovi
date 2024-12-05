<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.noticias=@json($r);
    window.usuario=@json([$usuario]);
</script>
@include('dev.noticias_lixeira.main')
@include('dev.dev_inicio.index')