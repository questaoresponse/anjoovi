<?php
$isLoged=isset($_SESSION["key"]) && descrip($_SESSION["key"],$c) ? true : false;
!$isLoged ? header("location: /erro/") : null;
?>