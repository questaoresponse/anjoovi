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
require __DIR__ . "/../keys/keys.php";
use \Firebase\JWT\JWT;
use \Firebase\JWT\KEY;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
function get_token($dados){
    $chaveSecreta=$GLOBALS["jwtKey"];
    $payload = [
        'iat' => time(),
        'exp' => strtotime('+1 year'), // time in the past
    ];
    $token = JWT::encode(array_merge($payload,$dados), $chaveSecreta, 'HS256');
    return $token;
}
try{
$emailContent = file_get_contents("php://stdin");

// Opcional: Salva o e-mail em um arquivo para depuração

// Processa o e-mail
if ($emailContent) {
    file_put_contents(__DIR__ . "/log.txt",$emailContent);
    // // Divida o conteúdo em cabeçalhos e corpo
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
    if ($subject=="Restore" || $body=="Restore"){
        file_put_contents(__DIR__ . "/log.txt",$emailContent . "restore");
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'mail.anjoovi.com'; // Altere para o seu servidor SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'account@anjoovi.com'; // Seu endereço de e-mail SMTP
        $mail->Password = $GLOBALS["scriptKey"]; // Sua senha de e-mail SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilita a criptografia TLS
        $mail->Port = 587; // Porta TCP para conexão
    
        // Remetente e destinatário
        $mail->setFrom('account@anjoovi.com', 'Anjoovi');
        $mail->addAddress("vtder493@gmail.com", "INCÉNDIO FF");
        $mail->isHTML(true);
        $mail->Subject = 'Link para ativar.';
        $d=new DateTime();
        $d=$d->format("Y-m-d H:i:s");
        $params=[
            "token"=>get_token(["d"=>$d]),
            "type"=>"update",
            "restoreValue"=>1
        ];
        $queryString=http_build_query($params);
        $mail->Body    = "<a href=\"https://dev.anjoovi.com/updateCode?$queryString\"=>https://dev.anjoovi.com/updateCode?$queryString</a>";
        $mail->AltBody = "Clicke aqui.";
        $mail->send();
    }
} else {
    file_put_contents(__DIR__ . "/log.txt","not");
}
} catch (Exception $e){
    file_put_contents(__DIR__ . "/log.txt",$e->getMessage());
}
