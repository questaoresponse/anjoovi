<?php
// Obtenha a URL externa a partir do parâmetro 'url' na query string
$url = urldecode($_GET["url"]);

// Inicialize o cURL
$ch = curl_init();

// Defina a URL que será chamada pelo proxy
curl_setopt($ch, CURLOPT_URL, $url);


// Copie todos os headers da requisição original
$headers = getallheaders();
$curl_headers = [];
$ca=["Cookie"];
foreach ($headers as $key => $value) {
    // $curl_headers[] = "$key: $value";
    // echo $key;
    // echo $value;
}

curl_setopt($ch, CURLOPT_HTTPHEADER, $curl_headers);


// Ative a transferência de resposta
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// **Permitir conteúdo comprimido (gzip, deflate)**
curl_setopt($ch, CURLOPT_ENCODING, "");

// Execute a requisição
$response = curl_exec($ch); 

// Capture informações sobre a resposta
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// Feche o cURL
curl_close($ch);

// Defina o código de resposta HTTP e o tipo de conteúdo
http_response_code($http_code);
header("Content-Type: $content_type");
header("Cross-Origin-Opener-Policy: same-origin");
header("Cross-Origin-Embedder-Policy: require-corp");

// Imprima a resposta do servidor remoto
echo $response;
?>
