<?php
    shell_exec("../server/main & disown");
    $output=shell_exec("ps aux");
    echo $output;
?>