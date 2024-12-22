<?php
class sqli{
    public $conn=null;
    public function __construct($name) {
        include(__DIR__ . '/function.php');
        $this->conn=new mysqli("localhost:3306", $ub,$sb,$name);
    }
    public function query($sql){
        return $this->conn->query($sql);
    }
    public function prepare($sql,$params){
        $q=$this->conn->prepare($sql);
        //$tipos = "";
        $valores = [""];
        foreach ($params as &$valor) {
            if (is_int($valor)) {
                $valores[0] .= "i";  // "i" para inteiro
            } elseif (is_double($valor)) {
                $valores[0] .= "d";  // "d" para double
            } else {
                $valores[0] .= "s";  // "s" para string
            }
            $valores[]=&$valor;
        }
        // array_unshift($valores, $tipos);
        call_user_func_array(array($q, 'bind_param'), $valores);
        $q->execute();
        $q2=null;
        try{
            $q2=$q->get_result();
        } catch (Exception $e){
        }
        return $q2;
    }
}
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

$chaveSecreta=$GLOBALS["jwtKey"];
function jwt_verify($token){
    $chaveSecreta=$GLOBALS["jwtKey"];
    try {
        $decoded=JWT::decode($token, new Key($chaveSecreta, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        return false;
    }
}
function get_token($dados){
    $chaveSecreta=$GLOBALS["jwtKey"];
    $payload = [
        'iat' => time(),
        'exp' => strtotime('+1 year'), // time in the past
    ];
    $token = JWT::encode(array_merge($payload,$dados), $chaveSecreta, 'HS256');
    return $token;
}
function get_cookie($name){
    return isset($_COOKIE[$name]) ? $_COOKIE[$name] : null;
}
function get_user(){
    if (!isset($_COOKIE["token"])) return null;
    $v=jwt_verify($_COOKIE["token"]);
    return $v ? strval($v->usuario) : null;
}
$usuario=get_user();
if ($usuario){
    $conn=new sqli("anjoov00_posts");
    if (p($conn->prepare("SELECT cargo FROM user WHERE usuario=?",[$usuario]))[0]["cargo"]>0){
        readfile(__DIR__ . "/../public_html" .  $_SERVER["REQUEST_URI"]);
    } else {
    }
}