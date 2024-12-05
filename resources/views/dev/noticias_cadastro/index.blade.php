<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.select_options=@json($select_options);
    window.usuario=@json([$usuario]);
    window.setStyle={elemento:"#noticias_cadastro",color:"gray"};
</script>
@include('dev.noticias_cadastro.main')
@include('dev.dev_inicio.index')