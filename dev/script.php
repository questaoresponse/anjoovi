<?php
require __DIR__ . "/../pay/vendor/autoload.php";
$ci=__DIR__ . '/../php-jwt/src/';
require $ci . 'JWT.php';
require $ci . 'JWTExceptionWithPayloadInterface.php';
require $ci . 'BeforeValidException.php';
require $ci . 'ExpiredException.php';
require $ci . 'SignatureInvalidException.php';
require $ci . 'Key.php';
require $ci . 'JWK.php';
require $ci . 'CachedKeySet.php';
require __DIR__ . "/../keys.php";
use \Firebase\JWT\JWT;
use \Firebase\JWT\KEY;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function get_token($dados){
    $chaveSecreta=$GLOBALS["jwtKey"];
    // $configuracaoToken=[
    //     'iss' => 'http://localhost:3000',
    //     'iat' => time(),
    //     'exp' => strtotime('+1 year') // Adiciona um ano ao timestamp atual
    // ];
    $payload = [
        'iat' => time(),
        'exp' => strtotime('+1 year'), // time in the past
    ];
    $token = JWT::encode(array_merge($payload,$dados), $chaveSecreta, 'HS256');
    return $token;
}
$emailContent = file_get_contents("php://stdin");

// Opcional: Salva o e-mail em um arquivo para depuração

// Processa o e-mail
if ($emailContent) {
    // Divida o conteúdo em cabeçalhos e corpo
    list($headers, $body) = explode("\r\n\r\n", $emailContent, 2);

    // Captura o remetente
    preg_match('/^From: (.*)$/mi', $headers, $matches);
    $from = isset($matches[1]) ? trim($matches[1]) : '';

    // Captura o assunto
    preg_match('/^Subject: (.*)$/mi', $headers, $matches);
    $subject = isset($matches[1]) ? trim($matches[1]) : '';

    // Exibe as informações capturadas
    // echo "De: $from\n";
    // echo "Assunto: $subject\n";
    // echo "Corpo:\n$body\n";
    if ($subject=="Restore" | $body=="Restore"){
        $mail->isSMTP();
        $mail->Host = 'mail.anjoovi.com'; // Altere para o seu servidor SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'account@anjoovi.com'; // Seu endereço de e-mail SMTP
        $mail->Password = $GLOBALS["payAccountKey"]; // Sua senha de e-mail SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilita a criptografia TLS
        $mail->Port = 587; // Porta TCP para conexão
    
        // Remetente e destinatário
        $mail->setFrom('account@anjoovi.com', 'Anjoovi');
        $mail->addAddress("vter493@gmail.com", "Caro usuario");
        $mail->isHTML(true);
        $params=[
            "key"=>$GLOBALS["updateKey"],
            "type"=>"update",
            "restoreValue"=>1
        ];
        $queryString=http_build_query($params);
        $mail->Body    = "updateCode?$queryString</div>";
        $mail->AltBody = "Clicke aqui.";
    }
}
?>
