<?php 
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . "/../../keys/keys.php";

if (isset($_SERVER["HTTP_ORIGIN"])){
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
}

$tiem=microtime(true);
function get_time(){
    global $tiem;
    return $tiem;
}
function is_js(){
    return isset($_GET["c"]) && $_GET["c"]=="1";
}
function to_list($array){
    $arr=array();
    foreach($array as $e){
        array_push($arr,$e);
    }
    return "'" . implode("','",$arr) .  "'";
};  
$type=$_SERVER["REQUEST_METHOD"];
// $_SERVER["DOCUMENT_ROOT" ]
// $caminho=__DIR__ . '/../nextjs/out' . $_SERVER["REQUEST_URI"] . ".html";
// echo $caminho;
// if ($type=="GET"){
// if (file_exists($caminho) && is_file($caminho)) {
//     if (is_readable($caminho)) {
//         $content=file_get_contents($caminho);
//         echo $content;
//         exit();
//     } else {
//     }
// } else {
// }
// }
function resp($name){
    include(__DIR__ . '/../../nextjs/out/'.$name);
}
class sqli{
    public $conn=null;
    public function __construct($name) {
        include(__DIR__ . '/../../function.php');
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
function same_site(){
    return true;
    // return ($_SERVER['HTTP_REFERER'] && strpos($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST']) !== false);
}
function r404(){
    // if ($n){
    //     return(file_get_contents(__DIR__ . '/../public_html/templates/erro/404.html'));
    // } else {
    //     echo json_encode(file_get_contents(__DIR__ . '/../public_html/templates/erro/404.html'));
    // }
    echo json_encode(["header_erro"=>"true"]);
}
function r404g(){
    // header("Location: /erro?origin=". urlencode($_SERVER["REQUEST_URI"]));
}
session_start();
class ss{
    public function has($key){
        return isset($_COOKIE[$key]) ? true : false;
    }
    public function forget($key){
        unset($_COOKIE[$key]);
        setcookie($key, "", time() - 3600, "/");
    }
}
class fi{
    public $file;
    public function __construct($file){
        $this->file=$file;
    }
    public function getClientOriginalName($format=null){
        $name = pathinfo($this->file["name"],PATHINFO_FILENAME);
        return $format ? $name . '.' . $format : $this->file["name"];
    }
    public function move($d,$n){
        $nt = $this->file["tmp_name"];
        move_uploaded_file($nt,$d.$n);
    }
    public function createwebp($path,$name){
        $this->move($path,$name);
        $imagem = imagecreatefromjpeg($path . $name);
        imagewebp($imagem, $path . $name, 80); // O terceiro parâmetro é a qualidade (de 0 a 100)
        imagedestroy($imagem);
    }
}
class image{
    public $c=null;
    public function __construct($c){
        $this->c=$c;
    }
    public function resize($w,$h){
        $n=pathinfo($this->c,PATHINFO_FILENAME);
        $parts=explode("/",$this->c);
        $np=$parts[count($parts)-1];
        $imagem=null;
        $imagem_size=getimagesize($this->c);
        $width=$imagem_size[0];
        $height=$imagem_size[1];
        if ($n . ".jpg"==$np || $n . ".jpeg"==$np){
            $imagem=imagecreatefromjpeg($this->c);
        } else if ($n . '.webp'==$np){
            $imagem=imagecreatefromwebp($this->c);
        }
        if ($w && !$h){
            $h=$w/$width * $height;
        } else if (!$w && $h){
            $w=$h/$height * $width;
        }
        $novaImagem = imagecreatetruecolor($w, $h);
        imagecopyresampled($novaImagem, $imagem, 0, 0, 0, 0, $w, $h, imagesx($imagem), imagesy($imagem));
        if ($n . ".jpg"==$np || $n . ".jpeg"==$np){
            imagejpeg($novaImagem,$this->c);
        } else if ($n . '.webp'==$np){
            imagewebp($novaImagem, $this->c,80);
        }
        imagedestroy($imagem);
        imagedestroy($novaImagem);
    }
}
class re{
    public $type;
    public function __construct($type) {
        $this->type=$type;
    }
    public function all(){
        return $this->type=="POST" ? $_POST : null;
    }
    public function query($name){
        return $_GET[$name];
    }
    public function has($name){
        return (isset($_POST[$name]) || isset($_FILES[$name])) ? true : false;
    }
    public function file($nome){
        return new fi($_FILES[$nome]);
    }
}
function request($key=null){
    global $type;
    if ($key){
        return $type=="POST" ? isset($_POST[$key]) ? $_POST[$key] : null : null;
    } else {
        return new re($type);
    }
}
function session($key=null){
    if ($key){
        if (is_array($key)){
            $keys = array_keys($key);
            foreach ($keys as $k){
                if (isset($key["usuario"])){
                    $uniqueID = uniqid();
                    setcookie('cid', $uniqueID, time() + 365 * 24 * 60 * 60, '/');
                }
                setcookie($k, $key[$k], time() + 365 * 24 * 60 * 60, "/");
            }
        } else {
            return isset($_COOKIE[$key]) ? $_COOKIE[$key] : null;
        }
    } else {
        return new ss();
    }  
}
class rsp{
    public function json($v){
        if (is_array($v)){
            echo json_encode($v);
        } else {
            echo $v;
        }
    }
}
function response(){
    return new rsp();
}
function imagem($c){
    return new image($c);
}
function redirect($v){
    header("location: $v");
}
function pgp($fc){
    $v = new ReflectionFunction($fc);
    return $v->getNumberOfParameters();
}
// class Route{
//     public static $gets=[];
//     public static $posts=[];
//     public static $domains=[];
//     public static function domain($domain,$function){
//         self::$domains[$domain]=$function;
//     }
//     public static function get($route,$function){
//         self::$gets[$route]=$function;
//     }
//     public static function post($route,$function){
//         self::$posts[$route]=$function;
//     }
//     public static function url($dominio,$url,$type){
//         include(__DIR__ . '/../function.php');
//         //isset(self::$domains[$dominio]) ? self::$domains[$dominio]() : null;
//         if ($type=="GET"){
//         //     $ks=array_keys(self::$gets);
//         //     $n=[];
//         //     foreach ($ks as $k){
//         //         if (strpos($k, '{') !== false) {
//         //             if (vf($k,$url)){
//         //                 $n[]=true;
//         //                 self::$gets[$k](vf($k,$url));
//         //             }
//         //         }
//         //     }
//         //     isset(self::$gets[$url]) ? self::$gets[$url]() : (count($n)==0 ? r404g() : null);
//         } else if ($type=="POST") {
//             // isset(self::$posts[$url]) ? self::$posts[$url]() : r404();
//             $ks=array_keys(self::$posts);
//             $n=[];
//             foreach ($ks as $k){
//                 if (strpos($k, '{') !== false) {
//                     if (vf($k,$url)){
//                         $n[]=true;
//                         self::$posts[$k](vf($k,$url));
//                     }
//                 }
//             }
//             isset(self::$posts[$url]) ? self::$posts[$url]() : (count($n)==0 ? r404() : null);
//         };
//     }
// }
// Route::url($dominio,$url,$type);
use \Firebase\JWT\JWT;
use \Firebase\JWT\KEY;

$chaveSecreta=$GLOBALS["jwtKey"];
function generate_number(){
    function generateRandomString($length) {
        // Caracteres ASCII imprimíveis (33-126)
        $chars = array_merge(range('a', 'z'), range('A', 'Z'), range('0', '9'), ['-', '_', '.']); // Array contendo os caracteres ASCII imprimíveis
        $randomString = '';
        $maxIndex = count($chars) - 1;

        // Gerar a string aleatória
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $chars[random_int(0, $maxIndex)];
        }
        return $randomString;
    }

    // String aleatória de 1000 caracteres
    $randomString = generateRandomString(10);

    // // Calcula o tamanho em bytes da string
    // $bytes = strlen($randomString);

    // echo "Tamanho da string em bytes: " . $bytes . " bytes\n";

    return $randomString;
    // Função para gerar uma string aleatória de comprimento especificado

}
function jwt_verify($token){
    $chaveSecreta=$GLOBALS["jwtKey"];
    try {
        $decoded=JWT::decode($token, new Key($chaveSecreta, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        return false;
    }
}
function get_token($dados,$time='+1 year'){
    $chaveSecreta=$GLOBALS["jwtKey"];
    // $configuracaoToken=[
    //     'iss' => 'http://localhost:3000',
    //     'iat' => time(),
    //     'exp' => strtotime('+1 year') // Adiciona um ano ao timestamp atual
    // ];
    $payload = [
        'iat' => time(),
        'exp' => strtotime($time), // time in the past
    ];
    $token = JWT::encode(array_merge($payload,$dados), $chaveSecreta, 'HS256');
    return $token;
}
function set_cookie($name,$value){
    $tempoExpiracao = time() + (365 * 24 * 60 * 60);
    $caminho = "/";
    $dominio = "";
    setcookie($name, $value, $tempoExpiracao, $caminho, $dominio, false, true);
}
function get_cookie($name){
    return isset($_COOKIE[$name]) ? $_COOKIE[$name] : null;
}
function delete_cookie($name){
    $valorVazio = "";
    $expiracaoPassada = time() - 3600;
    setcookie($name, $valorVazio, $expiracaoPassada, "/");
    unset($_COOKIE[$name]);
}
function has_cookie($name){
    return isset($_COOKIE[$name]);
}
function set_user($user){
    set_cookie("token",get_token(["usuario"=>$user]));
}
function get_user(){
    // if (!isset($_POST["token"]) || $_POST["token"]=="null") return null;
    if (!isset($_COOKIE["token"])) return null;
    $v=jwt_verify($_COOKIE["token"]);
    return $v ? strval($v->usuario) : null;
}
function logout(){
    delete_cookie("token");
}

use FastRoute\RouteCollector;
use function FastRoute\simpleDispatcher;
class Route
{
    public static $routes=[];
    public static $domain=[];
    public static function init()
    {
        self::$routes=[
            'GET' => [],
            'POST' => [],
        ];
        self::$domain=$_SERVER['HTTP_HOST'];
    }
    public static function domain($domain_atual,$handler)
    {
        if (self::$domain==$domain_atual){
            $handler();
        }
    }

    public static function get($uri, $handler)
    {
        if (is_array($uri)){
            foreach($uri as $uniqueURI){
                self::addRoute('GET', $uniqueURI, $handler);
            }
        } else {
            self::addRoute('GET', $uri, $handler);
        }
    }

    public static function post($uri, $handler)
    {
        if (is_array($uri)){
            foreach($uri as $uniqueURI){
                self::addRoute('POST', $uniqueURI, $handler);
            }
        } else {
            self::addRoute('POST', $uri, $handler);
        }
    }

    public static function addRoute($method, $uri, $handler)
    {
        self::$routes[$method][$uri] = $handler;
    }

    public static function dispatch($httpMethod, $uri)
    {
        $dispatcher = simpleDispatcher(function(RouteCollector $r) {
            foreach (self::$routes as $method => $routes) {
                foreach ($routes as $uri => $handler) {
                    $r->addRoute($method, $uri, $handler);
                }
            }
        });

        $routeInfo = $dispatcher->dispatch($httpMethod, $uri);

        switch ($routeInfo[0]) {
            case \FastRoute\Dispatcher::NOT_FOUND:
                self::handleNotFound($httpMethod);
                break;
            case \FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
                self::handleMethodNotAllowed();
                break;
            case \FastRoute\Dispatcher::FOUND:
                self::handleRouteFound($routeInfo[1], $routeInfo[2]);
                break;
        }
    }

    public static function handleNotFound($method)
    {
        $method=='GET' ? r404g() : r404();
    }

    public static function handleMethodNotAllowed()
    {
        echo '405 Method Not Allowed';
    }

    public static function handleRouteFound($handler, $params)
    {
        include(__DIR__ . '/../../function.php');
        call_user_func_array($handler,$params);
    }
}
Route::init();
// include(__DIR__ . '/mp3file.class.php');
include(__DIR__ . '/main.php');
Route::dispatch($_SERVER["REQUEST_METHOD"],parse_url($_SERVER["REQUEST_URI"])['path']);