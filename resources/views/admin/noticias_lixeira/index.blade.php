<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.noticias=@json($r); window.noticias.reverse();
    window.usuario=@json([$usuario]);
</script>
@if (isset($cargo))
    @if ($cargo=="admin")
        @include('admin.noticias_lixeira.admin')
    @else
        @include('admin.noticias_lixeira.main')
    @endif
@else
    @include('admin.noticias_lixeira.main')
@endif

@include('admin.admin_inicio.index')