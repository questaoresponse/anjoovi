<script>
    window.canal={};
    window.canal.name=@json($info[0]["usuario"]);
    window.posts=@json($posts);
    window.n=@json($num);
    window.info=@json($info[0]);
</script>
@include('canal.main')
@include('inicio.index')