<?php
function cm($i){
    return strpos($_SERVER["REQUEST_URI"],$i) === 0;
};
function cm2($i){
    return strpos($_SERVER["REQUEST_URI"],$i) === 0;
};
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    include(__DIR__ . '/../server/routes.php');
} else if (cm("/noticia") || cm("/imagem") || cm("/musica") || cm("/texto") || cm("/video") || cm("/playlist") || cm("/product")){
    include(__DIR__ . '/../server/routes.php');
} else {
    if ($_SERVER["HTTP_REFERER"] && cm2("/admin") && (cm2("/admin/notciias_cadastro") || cm2("/admin/24_cadastro") || cm2("/admin/imagens_cadastro") || cm2("/admin/musicas_cadastro") || cm2("/admin/textos_cadastro") || cm2("/admin/videos_cadastro") || cm2("/admin/products_cadastro"))){
        header("Cross-Origin-Opener-Policy: same-origin");
        header("Cross-Origin-Embedder-Policy: require-corp");
    }
    include(__DIR__ . '/index.html');
}
?>