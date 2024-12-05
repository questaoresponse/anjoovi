<?php
session_start();
$_SESSION["key"]=null;
header("location: /");
?>