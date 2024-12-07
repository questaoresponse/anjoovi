<?php
function cm($i){
    return strpos($_SERVER["REQUEST_URI"],$i) === 0;
};
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    include(__DIR__ . '/../server/routes.php');
} else if ($_SERVER["REQUEST_URI"]=="/t"){
    echo $_SERVER["HTTP_ORIGIN"];
    echo json_encode($_COOKIE);
    $valorVazio = "";
    $expiracaoPassada = time() - 3600;
    setcookie("token", $valorVazio,[ 
        "expires"=>$expiracaoPassada,
        "path"=>"/",
        "domain"=>"www.anjoovi.com", 
        "secure"=>true,
        "httponly"=>true,
        "samesite"=>"None"]);
} else if (cm("/noticia") || cm("/imagem") || cm("/musica") || cm("/texto") || cm("/video")){
    include(__DIR__ . '/../server/routes.php');
} else {
    include(__DIR__ . '/index.html');
}
echo "<script>
localStorage.removeItem('lg');
</script>";
?>
