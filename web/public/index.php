<?php
function cm($i){
    return strpos($_SERVER["REQUEST_URI"],$i) === 0;
};
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    include(__DIR__ . '/../server/routes.php');
} else if (cm("/noticia") || cm("/imagem") || cm("/musica") || cm("/texto") || cm("/video") || cm("/playlist") || cm("/product")){
    include(__DIR__ . '/../server/routes.php');
} else {
    if (cm("/admin") && (cm("/admin/notciias_cadastro") || cm("/admin/24_cadastro") || cm("/admin/imagens_cadastro") || cm("/admin/musicas_cadastro") || cm("/admin/textos_cadastro") || cm("/admin/videos_cadastro") || cm("/admin/products_cadastro"))){
        header("Cross-Origin-Opener-Policy: same-origin");
        header("Cross-Origin-Embedder-Policy: require-corp");
    }
    include(__DIR__ . '/index.html');
}
?>