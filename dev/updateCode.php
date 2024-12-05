<?php
require __DIR__ . '/../keys/keys.php';
if (isset($_GET["key"]) && $_GET["key"]==$GLOBALS["updateKey"]){
    if ($_GET["type"]=="restore"){
        $restoreValue=$_POST["restoreValue"];
        $commands=["git fetch origin","git checkout origin/main~$restoreValue ../server","git checkout origin/main~$restoreValue ../public_html"];
        foreach ($commands as $command){
            // Array para armazenar a saída
            $output = [];
            // Variável para armazenar o código de status de saída
            $return_var = 0;

            // Executa o comando
            exec($command, $output, $return_var);
            foreach ($output as $line) {
                echo $line . "\n";
            }
        }
    } else {
        $commands=["git fetch origin","git checkout origin/main ../server","git checkout origin/main ../public_html"];
        foreach ($commands as $command){
            // Array para armazenar a saída
            $output = [];
            // Variável para armazenar o código de status de saída
            $return_var = 0;

            // Executa o comando
            exec($command, $output, $return_var);
            foreach ($output as $line) {
                echo $line . "\n";
            }
        }
    }   
    echo "finished";
} else {
    header('HTTP/1.1 404');
}