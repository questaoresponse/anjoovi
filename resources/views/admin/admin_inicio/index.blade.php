<script>
    if (@json($usuario)){
    window.usuario=@json($usuario);
    }
</script>

@if (isset($cargo))
    @if ($cargo=="admin")
        @include('admin.admin_inicio.admin')
    @else
        @include('admin.admin_inicio.main')
    @endif
@else
    @include('admin.admin_inicio.main')
@endif