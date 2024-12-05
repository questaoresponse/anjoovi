<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

Route::post("/pay",function(){
    include(__DIR__ . "/../../keys/keys.php");
    if (isset($_GET["isApi"]) && isset($_GET["token"]) && $_GET["token"]==$GLOBALS["payKey"]){
        $json = file_get_contents('php://input');
        $dados=json_decode($json,true);
        $product_id=$dados["data"]["items"][0]["productId"];
        $types=[
            "2415251"=>[
                "name"=>"Anjoovi Premium Start",
                "cargo"=>2,
                "expiry"=>"30",
            ],
            "2416145"=>[
                "name"=>"Anjoovi Premium Pro",
                "cargo"=>3,
                "expiry"=>"60",
            ],
            "2416726"=>[
                "name"=>"Anjoovi Premium Plus",
                "cargo"=>4,
                "expiry"=>"90",
            ],
            "2431416"=>[
                "name"=>"Anjoovi Premium Ultra",
                "cargo"=>5,
                "expiry"=>"360",
            ],
        ];
        if (isset($types[$product_id])){
            $conn=new sqli("anjoov00_posts");
            $name=$dados["data"]["buyer"]["name"];
            $email=$dados["data"]["buyer"]["email"];

            $date=$dados["sentDate"];
            // Criar um objeto DateTime a partir da string fornecida
            $data = new DateTime($date);

            $expiryDate=$types[$product_id]["expiry"];
            $cargo=$types[$product_id]["cargo"];
            
            // Adicionar 30 dias à data
            $data->modify("+$expiryDate days");

            // Formatar a nova data no formato desejado
            $expiry = $data->format('Y-m-d\TH:i:s.u\Z');
            // Conteúdo do e-mail
            $license=get_token(["email"=>$email,"date"=>$date,"expiry"=>$expiry],"+$expiryDate days");

            $response=$conn->prepare("SELECT * FROM user WHERE email=?",[$email]);
            $exists=$response->num_rows>0;
            $user=null;
            if ($exists){
                $user=p($response)[0]["usuario"];
                $conn->prepare("UPDATE payments SET valid=0 WHERE user=?",[$user]);
                $conn->prepare("UPDATE user SET cargo=? WHERE usuario=?",[$cargo,$user]);
            } else {
                $mail = new PHPMailer(true);
                try {
                    // Configurações do servidor SMTP
                    $mail->isSMTP();
                    $mail->Host = 'mail.anjoovi.com'; // Altere para o seu servidor SMTP
                    $mail->SMTPAuth = true;
                    $mail->Username = 'pay@anjoovi.com'; // Seu endereço de e-mail SMTP
                    $mail->Password = $GLOBALS["payAccountKey"]; // Sua senha de e-mail SMTP
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilita a criptografia TLS
                    $mail->Port = 587; // Porta TCP para conexão
                
                    // Remetente e destinatário
                    $mail->setFrom('pay@anjoovi.com', 'Anjoovi');
                    $mail->addAddress($email, $name);
                    $mail->isHTML(true);
                    $mail->Subject = 'Assunto do E-mail';
                    $mail->Body    = '<div>baixe sua licensa!';
                    $mail->AltBody = 'Este é o corpo da mensagem em texto simples para clientes de e-mail que não suportam HTML.';
                    $mail->addStringAttachment($license,"license.txt");
                
                    $mail->send();
                    echo "";
                } catch (Exception $e) {
                    echo "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
                }
            }
            // Decodifica o JSON
            $conn->prepare("INSERT INTO payments(data,date,value,expiry,license,used,user,cargo) VALUES(?,?,?,?,?,?,?,?)",[$json,$date,$dados["data"]["items"][0]["price"]["value"],$expiry,$license,$exists ? 1 : 0,$user,$cargo]);
        } else {
            response()->json(["result"=>"false"]);
        }
    } else {
        response()->json(["result"=>"false"]);
    }
});
Route::get("/",function(){

    // $e=get_token(["expiryDate"=>"0"]);
// Calcula o tempo de execução
    // $mail = new PHPMailer(true);
    // try {
    //     // Configurações do servidor SMTP
    //     $mail->isSMTP();
    //     $mail->Host = 'mail.anjoovi.com'; // Altere para o seu servidor SMTP
    //     $mail->SMTPAuth = true;
    //     $mail->Username = 'pay@anjoovi.com'; // Seu endereço de e-mail SMTP
    //     $mail->Password = 'PAH8df2#mL'; // Sua senha de e-mail SMTP
    //     $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilita a criptografia TLS
    //     $mail->Port = 587; // Porta TCP para conexão
    
    //     // Remetente e destinatário
    //     $mail->setFrom('pay@anjoovi.com', 'Anjoovi');
    //     $mail->addAddress('joaovitor.licompda@gmail.com', 'Corno');
    
    //     // Conteúdo do e-mail
    //     $mail->isHTML(true);
    //     $mail->Subject = 'Assunto do E-mail';
    //     $mail->Body    = '<h1>isso é uma fonte22</h1><p>esse é um texto</p><div style="color:red">yyy</div>.';
    //     $mail->AltBody = 'Este é o corpo da mensagem em texto simples para clientes de e-mail que não suportam HTML.';
    
    //     $mail->send();
    //     echo 'E-mail enviado com sucesso!';
    // } catch (Exception $e) {
    //     echo "Erro ao enviar o e-mail: {$mail->ErrorInfo}";
    // }
});
?>
