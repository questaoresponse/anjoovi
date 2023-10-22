<?php
$c=__DIR__ . "/../key.json";
function p($r){ $rs=[];while ($l = $r->fetch_assoc()) {$rs[] = $l;}return $rs;}
function descrip($texto,$c){
    $keys = json_decode(file_get_contents($c));$key=$keys->key;$iv=base64_decode($keys->iv);return openssl_decrypt($texto, 'aes-256-cbc', $key, 0, $iv);
}
$ub;
$sb;
$pc=__DIR__ . "/../banco.json";
$ks=json_decode(file_get_contents($pc));$ub=$ks->user;$sb=$ks->senha;
session_start();
?>