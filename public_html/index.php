<?php
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    include(__DIR__ . '/../../anjoovi/routes/routes.php');
} else {
    include(__DIR__ . '/index.html');
}
?>