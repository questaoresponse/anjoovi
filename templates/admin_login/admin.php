<script>
window.r=<?php echo json_encode($r ? $r : ["type"=>"null"]) ?>
</script>
<?php
include(__DIR__ . "/admin.html");
?>