<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.usuario=@json($usuario);
    window.config=@json($config);
</script>
@include('dev.settings.main')
@include('dev.dev_inicio.index')