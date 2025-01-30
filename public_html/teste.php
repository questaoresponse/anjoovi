<?php
    shell_exec("../server/main & disown");
    $output=shell_exec("ps aux 2>&1");
    $handle = popen("ps aux 2>&1", "r"); // Substitua pelo seu comando
    echo "<pre>";
    while (!feof($handle)) {
        $line = fgets($handle); // Lê uma linha por vez
        echo $line . "<br>"; // Exibe a linha com quebra de linha no HTML
        ob_flush(); // Força a saída no navegador
        flush();
    }
    echo "</pre>";

    pclose($handle);
?>