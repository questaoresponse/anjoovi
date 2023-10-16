<?php
session_start();
if (!(array_key_exists("key_init",$_SESSION))){
    $t = 16; $ba = random_bytes($t); $ca = bin2hex($ba); $_SESSION["key_init"]=$ca;
}
include(__DIR__ . "/index.html");
?>