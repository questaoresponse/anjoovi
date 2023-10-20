<script>
    window.post=<?php echo json_encode($r) ?>
</script>
<?php
include(__DIR__ . "/post.html");
include(__DIR__ . "/../inicio/index.html");
?>