<?php
// function cm($i){
//     return strpos($_SERVER["REQUEST_URI"],$i) === 0;
// };
// if (cm("/admin") && (cm("/admin/noticias_cadastro") || cm("/admin/24_cadastro") || cm("/admin/imagens_cadastro") || cm("/admin/musicas_cadastro") || cm("/admin/textos_cadastro") || cm("/admin/videos_cadastro") || cm("/admin/products_cadastro"))){
    header("Cross-Origin-Opener-Policy: same-origin");
    header("Cross-Origin-Embedder-Policy: require-corp");
// }
include(__DIR__ . "/assets/" . explode("/",$_SERVER["REQUEST_URI"])[1]);