<?php
function cm2($i){
    return strpos($s,$i) === 0;
};
echo $_SERVER["HTTP_REFERER"];
echo "oie";
if ($_SERVER["HTTP_REFERER"]){
    $s=implode("/",array_slice(explode("/",$_SERVER["HTTP_REFERER"]),3));
    if (cm2($s,"admin") && (cm2($s,"admin/noticias_cadastro") || cm2($s,"admin/24_cadastro") || cm2($s,"admin/imagens_cadastro") || cm2($s,"admin/musicas_cadastro") || cm2($s,"admin/textos_cadastro") || cm2($s,"admin/videos_cadastro") || cm2($s,"admin/products_cadastro"))){
        header("Cross-Origin-Opener-Policy: same-origin");
        header("Cross-Origin-Embedder-Policy: require-corp");
    }
    echo $s;
}
include(__DIR__ . "/assets/" . explode("/",$_SERVER["REQUEST_URI"])[2]);
