<?php
$c=__DIR__ . "/../conf/key.json";
if (!function_exists("p")){
function p($r){ $rs=[];while ($l = $r->fetch_assoc()) {$rs[] = $l;}return $rs;}
function descrip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_decrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
function descrip2($texto){
    $c=__DIR__ . "/../conf/key.json";$keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_decrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
function crip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_encrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
function crip2($texto){
    $c=__DIR__ . "/../conf/key.json";$keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_encrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
}
$ub;
$sb;
$pc=__DIR__ . "/../conf/banco.json";
$ks=json_decode(file_get_contents($pc));$ub=$ks->user;$sb=$ks->senha
?>