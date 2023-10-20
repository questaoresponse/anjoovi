<script>
    window.categoria=<?php echo json_encode($categoria) ?>;
    window.posts=<?php echo json_encode($r) ?>;
</script>
<?php
include(__DIR__ . "/index.html");
include(__DIR__ . "/../inicio/index.html");
?>