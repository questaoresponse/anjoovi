
<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.select_options=@json($select_options);
    window.usuario=@json([$usuario]);
    window.edit=true;
    window.post_edit=@json($r);
    window.setStyle={elemento:"#noticias_lista",color:"gray"};
</script>
@include('dev.noticias_cadastro.main')
@include('dev.dev_inicio.index')