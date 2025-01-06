<?php
function cm($i){
    return strpos($_SERVER["REQUEST_URI"],$i) === 0;
};
function cm2($s,$i){
    return strpos($s,$i) === 0;
};
echo exlode("/",$_SERVER["HTTP_REFERER"])[3];
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    include(__DIR__ . '/../server/routes.php');
} else if (cm("/noticia") || cm("/imagem") || cm("/musica") || cm("/texto") || cm("/video") || cm("/playlist") || cm("/product")){
    include(__DIR__ . '/../server/routes.php');
} else {
    if ($_SERVER["HTTP_REFERER"]){
        $s=exlode("/",$_SERVER["HTTP_REFERER"])[3];
        if (cm2($s,"admin") && (cm2($s,"admin/noticias_cadastro") || cm2($s,"admin/24_cadastro") || cm2($s,"admin/imagens_cadastro") || cm2($s,"admin/musicas_cadastro") || cm2($s,"admin/textos_cadastro") || cm2($s,"admin/videos_cadastro") || cm2($s,"admin/products_cadastro"))){
            header("Cross-Origin-Opener-Policy: same-origin");
            header("Cross-Origin-Embedder-Policy: require-corp");
        }
    }
    include(__DIR__ . '/index.html');
}
?>