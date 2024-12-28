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
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0"); // Cache por 1 hora (3600 segundos)
header("Expires: Wed, 11 Jan 1984 05:00:00 GMT");  // Define a data de expiração
header("Content-Type: image/webp");
$arr=explode("/",explode("?",$_SERVER["REQUEST_URI"])[0]);
$filename=array_splice($arr,-1)[0];
if (isset($_COOKIE["token"])){
    $GLOBALS["conn"]=new sqli("anjoov00_posts");
    $r=$GLOBALS["conn"]->prepare("SELECT usuario,cargo FROM user WHERE hash=?",[$_COOKIE["token"]]);
    if ($r->num_rows>0){
        $r=p($r)[0];
        $GLOBALS["user"]=$r["usuario"];
        $GLOBALS["cargo"]=intval($r["cargo"]);
        if (($GLOBALS["cargo"] & 4)==4){
            readfile(__DIR__ . '/../public_html/images/' . $filename);
        } else {
            readfile(__DIR__ . '/../public_html/images/' . substr($filename,2));
        }
    } else {
        readfile(__DIR__ . '/../public_html/images/' . substr($filename,2));
    }
} else {
    readfile(__DIR__ . '/../public_html/images/' . substr($filename,2));
}