<!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->
<div id="server">
<script>
    // window.token=document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    window.token="teste";
</script>
</div>
<?php
include(__DIR__ . '/main.html');
?>
<!-- @include('admin.admin_login.main') -->
