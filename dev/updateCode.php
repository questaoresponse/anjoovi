<?php
$ci=__DIR__ . '/../php-jwt/src/';
require $ci . 'JWT.php';
require $ci . 'JWTExceptionWithPayloadInterface.php';
require $ci . 'BeforeValidException.php';
require $ci . 'ExpiredException.php';
require $ci . 'SignatureInvalidException.php';
require $ci . 'Key.php';
require $ci . 'JWK.php';
require $ci . 'CachedKeySet.php';
require __DIR__ . "/../keys/keys.php";
use \Firebase\JWT\JWT;
use \Firebase\JWT\KEY;
function jwt_verify($token){
    $chaveSecreta=$GLOBALS["jwtKey"];
    try {
        $decoded=JWT::decode($token, new Key($chaveSecreta, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        return false;
    }
}
require __DIR__ . '/../keys/keys.php';
$valid=false;
if (isset($_GET["key"]) && $_GET["key"]==$GLOBALS["updateKey"]){
    $valid=true;
} else if (isset($_GET["token"])) {
    $content=jwt_verify($_GET["token"]);
    if ($content){
        $d=new DateTime($content->d);
        $now=new DateTime($content->d);
        $interval=$now->diff($d);
        if ($interval->i<5 && $interval->h==0 && $interval->d==0 && $interval->m==0 && $interval->y==0){
            $valid=true;
        }
    }
}
if ($valid){
    if ($_GET["type"]=="restore"){
        $restoreValue=$_GET["restoreValue"];
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
    http_response_code(404);
}