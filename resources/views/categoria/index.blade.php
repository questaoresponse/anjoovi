<script>
    window.categoria=@json($categoria);
    window.posts=@json($r);
</script>
@include('categoria.main')
@include('inicio.index')