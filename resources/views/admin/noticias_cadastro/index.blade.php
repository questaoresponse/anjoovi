<meta name="csrf-token" content="{{ csrf_token() }}">
<script>
    window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.select_options=@json($select_options);
    window.usuario=@json([$usuario]);
     </script>
@if (isset($cargo))
    @if ($cargo=="admin")
        @include('admin.noticias_cadastro.admin')
    @else
        @include('admin.noticias_cadastro.main')
    @endif
@else
    @include('admin.noticias_cadastro.main')
@endif
@include('admin.admin_inicio.index')