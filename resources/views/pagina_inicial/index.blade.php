<script>
    window.posts=@json($r);
    window.canal=@json($canal);
</script>
<!-- @if (request()->getHttpHost() == 'anjoovi.com.br' || request()->getHttpHost() == 'www.anjoovi.com.br') -->
<!-- @endif -->
@php
include_base('public_html/templates/pagina_inicial/index.html');
include_base('public_html/templates/pagina_inicial/script.html');
@endphp
@include('inicio.index')