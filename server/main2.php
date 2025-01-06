<?php

use Google\Auth\Credentials\ServiceAccountCredentials;
use Google\Auth\HttpHandler\HttpHandlerFactory;
use GuzzleHttp\Client;
class Oc{
    private $ch;
    private $response;
    public function __construct($ch,$response){
        $this->ch=$ch;
        $this->response=$response;
    }
    public function getStatusCode(){
        return curl_getinfo($this->ch, CURLINFO_HTTP_CODE);
    }
    public function getBody(){
        return json_decode($this->response,true);
    }
}
class Req{
    public function request($type,$url,$options=[]){
        
        // Inicializa a sessão cURL
        $ch = curl_init();
        
        $opts=[
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $type,
        ];
        // Configura as opções da solicitação
        if (isset($options["headers"])){
            $headers = [];
            foreach ($options["headers"] as $key => $value) {
                $headers[] = "$key: $value";
            }
            $headers[]='User-Agent: MeuClienteAPI/1.0';
            $opts[CURLOPT_HTTPHEADER]=$headers;

        }
        if ($type=="POST"){
            $opts[CURLOPT_POSTFIELDS]=json_encode($options["form_params"]);
        }
        curl_setopt_array($ch, $opts);
        // Executa a solicitação e obtém a resposta
        $response=curl_exec($ch);
        return new Oc($ch,$response);
    }   
}
if (!function_exists("delete_file_temps")){
function createKeyFile($key)
{
    $filename = 'serverKey.php';
    $content = "<?php\n";
    $content .= '$GLOBALS["FCM_SERVER_KEY"]="' . $key . '";';
    $content .= "?>";

    if (file_put_contents(__DIR__ . '/' . $filename, $content) !== false) {
    } else {
        echo "Erro ao criar o arquivo $filename." . PHP_EOL;
    }
}
function sendMessage($notification){
    // foreach ($tokens as $token){
    //     $notification["message"]["token"]=$token;
    //     $data = json_encode($notification);
        
    //     // URL de destino da solicitação
    //     $url = 'https://fcm.googleapis.com/v1/projects/anjoovi-6626/messages:send';
        
    //     // Inicializa a sessão cURL
    //     $ch = curl_init($url);
        
    //     // Configura as opções da solicitação
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //     curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    //         'Content-Type: application/json',
    //         'Authorization: Bearer '. $GLOBALS["FCM_SERVER_KEY"],
    //         'Content-Length: ' . strlen($data))
    //     );
    //     curl_setopt($ch, CURLOPT_POST, true);
    //     curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        
    //     // Executa a solicitação e obtém a resposta
    //     $response = curl_exec($ch);
    //     $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    //     if ($httpCode == 401) {

    //         function getAccessToken(){
    //             $keyFilePath = __DIR__ . '/../conf/service-account.json';
    //             $scopes = ['https://www.googleapis.com/auth/firebase.messaging'];

    //             // Create a service account credentials object
    //             $credentials = new ServiceAccountCredentials($scopes, $keyFilePath);

    //             // Use the credentials to obtain an access token
    //             $httpHandler = HttpHandlerFactory::build();
    //             $credentials->fetchAuthToken($httpHandler);

    //             return $credentials->getLastReceivedToken()['access_token'];
    //         }

    //         try {
    //             $accessToken = getAccessToken();
    //             createKeyFile($accessToken);
    //             $GLOBALS["FCM_SERVER_KEY"]=$accessToken;
    //             sendMessage($tokens,$notification);
    //         } catch (Exception $e) {
    //             echo 'Erro ao obter o token de acesso: ' . $e->getMessage() . PHP_EOL;
    //         }
    //     }
    //     break;
    // }   
    $data = json_encode($notification);
    
    // URL de destino da solicitação
    $url = 'https://onesignal.com/api/v1/notifications';
    
    // Inicializa a sessão cURL
    $ch = curl_init($url);
    
    // Configura as opções da solicitação
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Key os_v2_app_iedj7gvvcba6dcytihmscbljhdcxxtuanpnudh5kcrbtkj2o4o5h66lvin4vzq3mshcn6lxdjo4pmvbgqbrgpvtkxysqtgyguvvbf7a',
        'Content-Length: ' . strlen($data))
    );
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    
    // Executa a solicitação e obtém a resposta
    $response = curl_exec($ch);
    echo "<br> $response </br>";
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode == 401) {

        // function getAccessToken(){
        //     $keyFilePath = __DIR__ . '/../conf/service-account.json';
        //     $scopes = ['https://www.googleapis.com/auth/firebase.messaging'];

        //     // Create a service account credentials object
        //     $credentials = new ServiceAccountCredentials($scopes, $keyFilePath);

        //     // Use the credentials to obtain an access token
        //     $httpHandler = HttpHandlerFactory::build();
        //     $credentials->fetchAuthToken($httpHandler);

        //     return $credentials->getLastReceivedToken()['access_token'];
        // }

        // try {
        //     $accessToken = getAccessToken();
        //     createKeyFile($accessToken);
        //     $GLOBALS["FCM_SERVER_KEY"]=$accessToken;
        //     sendMessage($tokens,$notification);
        // } catch (Exception $e) {
        //     echo 'Erro ao obter o token de acesso: ' . $e->getMessage() . PHP_EOL;
        // }
    }
}
function get_date($q,$tipo){
    $q=explode(":",$q);
    if ($tipo=="post"){
        $q[count($q)-1]="00";
    } else if ($tipo=="post_24"){
        $q[count($q)-1]="01";
    } else if ($tipo=="post_imagem"){
        $q[count($q)-1]="02";
    } else if ($tipo=="post_musica"){
        $q[count($q)-1]="03";
    }
    return implode(":",$q);
}
function delete_file_temps($conn){
    $r2s=p($conn->query("SELECT d,id,views_id,type,filename FROM post_24"));
    $dataInicial = new DateTime();
    foreach ($r2s as $rs){
        $formato = "Y-m-d H:i:s"; // Formato da string de data
        $d=json_decode($rs["d"],true);
        $dataFinal = DateTime::createFromFormat($formato, $d["o"]);
        $diferenca = $dataInicial->diff($dataFinal);
        if ($diferenca->days>=1) {
            $id=$rs["id"];
            $views_id=$rs["views_id"];
            $rs["type"]=="mp4" ? unlink(__DIR__ . '/../public_html/videos/' . $rs["filename"]) : unlink(__DIR__ . '/../public_html/images/' . $rs["filename"]);
            $conn->prepare("DELETE FROM post_24 WHERE id=?",[$id]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE excluido='false' AND tipo='post_24' AND id=?",[$views_id]);
        }
    }
    // $r2s=p($conn->query("SELECT usuario,id,d,views_id,video,imagem FROM post_video"));
    // foreach($r2s as $rs){
    //     $formato = "Y-m-d H:i:s"; // Formato da string de data
    //     $d=json_decode($rs["d"],true);
    //     $dataFinal = DateTime::createFromFormat($formato, $d["o"]);
    //     $diferenca = $dataInicial->diff($dataFinal);
    //     if ($diferenca->days>=1) {
    //         $id=$rs["id"];
    //         $views_id=$rs["views_id"];
    //         unlink(__DIR__ . '/../public_html/videos/' . $rs["video"]);
    //         $rs["imagem"] && unlink(__DIR__ . '/../public_html/images/' . $rs["imagem"]);
    //         $conn->prepare("DELETE FROM post_video WHERE id=?",[$id]);
    //         $conn->prepare("UPDATE destaques SET post_video=-1,geral=CASE WHEN geral_tipo='post_video' THEN -1 ELSE geral END WHERE post_video=?",[$views_id]);
    //         $conn->prepare("UPDATE views SET excluido='true' WHERE excluido='false' AND tipo='post_video' AND id=?",[$views_id]);
    //         $conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts - 1,0) WHERE usuario=?",[$rs["usuario"]]);

    //     }
    // }
};
function get_posts($conn){
    return p($conn->query("SELECT id,usuario,titulo,imagem,tipo FROM (
        (SELECT id,acessos,usuario,titulo,imagem,'p' AS tipo FROM post WHERE privado=0 ORDER BY acessos DESC LIMIT 25)
        UNION
        (SELECT id,acessos,usuario,descricao AS titulo,imagem,'i' AS tipo FROM post_imagem WHERE privado=0 ORDER BY acessos DESC LIMIT 25)
        UNION
        (SELECT id,acessos,usuario,titulo,imagem,'m' AS tipo FROM post_musica WHERE privado=0 ORDER BY acessos DESC LIMIT 25)
    ) AS result ORDER BY acessos DESC LIMIT 25
    "));
}
function isJsonString($string) {
    // Tenta decodificar a string JSON
    $decoded = json_decode($string);

    // Verifica se ocorreu algum erro durante a decodificação
    if (json_last_error() === JSON_ERROR_NONE) {
        // A string é um JSON válido
        return true;
    } else {
        // A string não é um JSON válido
        return false;
    }
}
function gerarNumero($conn){
    $numeroAleatorio = rand(100000000, 999999999);
    if ($conn->prepare("SELECT * FROM chat WHERE chat_id=?",[$numeroAleatorio])->num_rows>0){
        return gerarNumero($conn);
    } else {
        return $numeroAleatorio;
    }
}
function getAtualDate(){
    $d= new DateTime();
    return $d->format('Y-m-d H:i:s');
}
function getAlgoritmoNoticia($isGeral,$conn,$usuario,$id,$pt=0,$limit=48){
    $s1="";
    $n1="";
    $i1="";
    $m1="";
    $t1="";
    $v1="";
    $pd1="";
    if (!$isGeral){
        $s1="n_comment,
            visualizacoes,
            logo,
            nome,";
        $n1="CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
            p2.logo,p2.nome,
            (SELECT COUNT(*) FROM comment WHERE post_id=p.id AND tipo='noticia') AS n_comment,";
        $i1="CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
            p2.logo,p2.nome,
            (SELECT COUNT(*) FROM comment WHERE post_id=p.id AND tipo='imagem') AS n_comment,";
        $m1="CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
            p2.logo,p2.nome,
            (SELECT COUNT(*) FROM comment WHERE post_id=p.id AND tipo='musica') AS n_comment,";
        $t1="CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
            p2.logo,p2.nome,
            (SELECT COUNT(*) FROM comment WHERE post_id=p.id AND tipo='texto') AS n_comment,";
        $v1="CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
            p2.logo,p2.nome,
            (SELECT COUNT(*) FROM comment WHERE post_id=p.id AND tipo='video') AS n_comment,";
        $pd1="CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
            p2.logo,p2.nome,
            (SELECT COUNT(*) FROM comment WHERE post_id=p.id AND tipo='product') AS n_comment,";
    }
    if ($usuario){
            return p($conn->prepare("WITH history AS (
                SELECT 
                    h.usuario,
                    MAX(CASE WHEN h.rnk = 1 THEN CONCAT('%', h.texto, '%') ELSE NULL END) AS latest_text,
                    MAX(CASE WHEN h.rnk = 2 THEN CONCAT('%', h.texto, '%') ELSE NULL END) AS second_latest_text
                FROM (
                    SELECT 
                        usuario,
                        texto,
                        ROW_NUMBER() OVER (PARTITION BY usuario ORDER BY id DESC) AS rnk
                    FROM historico
                ) h
                WHERE h.rnk <= 2
                GROUP BY h.usuario
            ),
            inscritos_check AS (
                SELECT
                    usuario,
                    CASE
                        WHEN JSON_CONTAINS(JSON_KEYS(inscritos), ?, '$') AND JSON_EXTRACT(inscritos, ?) IS NOT NULL THEN 'true'
                        ELSE 'false'
                    END AS inscrito
                FROM inscritos
            )
            SELECT 
                $s1
                inscrito,
                acessos,
                p.usuario,
                titulo,
                descricao,
                subtitulo,
                texto,
                imagem,
                arquivo,
                duration,
                zip,
                d,
                views_id,
                id,
                tipo,
                (
                    CASE 
                        WHEN h.latest_text IS NOT NULL AND LOWER(IFNULL(IFNULL(p.titulo,p.descricao),p.texto)) LIKE LOWER(h.latest_text) THEN 1 
                        ELSE 0 
                    END + 
                    CASE 
                        WHEN h.second_latest_text IS NOT NULL AND LOWER(IFNULL(IFNULL(p.titulo,p.descricao),p.texto)) LIKE LOWER(h.second_latest_text) THEN 0.5 
                        ELSE 0 
                    END
                ) AS accuracy 
            FROM (
                SELECT 
                    $n1
                    i.inscrito,
                    p.acessos, 
                    p.usuario,
                    p.titulo, 
                    NULL AS descricao, 
                    p.subtitulo, 
                    p.texto, 
                    p.imagem, 
                    NULL AS arquivo, 
                    NULL AS duration, 
                    NULL AS zip, 
                    p.d, 
                    p.views_id, 
                    p.id,
                    'p' AS tipo
                FROM post p
                INNER JOIN user p2 ON p.usuario = p2.usuario
                LEFT JOIN inscritos_check i ON i.usuario = p.usuario
                WHERE p.privado & 5 = 0 AND p.views_id != ?
                
                UNION ALL
                
                SELECT 
                    $i1
                    i.inscrito,
                    p.acessos, 
                    p.usuario,
                    NULL AS titulo, 
                    p.descricao, 
                    NULL AS subtitulo, 
                    NULL AS texto, 
                    p.imagem, 
                    NULL AS arquivo, 
                    NULL AS duration, 
                    NULL AS zip, 
                    p.d, 
                    p.views_id, 
                    p.id,
                    'i' AS tipo
                FROM post_imagem p
                INNER JOIN user p2 ON p.usuario = p2.usuario
                LEFT JOIN inscritos_check i ON i.usuario = p.usuario
                WHERE p.privado & 5 = 0 AND p.views_id != ?

                UNION ALL
                
                SELECT
                    $m1
                    i.inscrito,
                    p.acessos, 
                    p.usuario,
                    p.titulo, 
                    NULL AS descricao, 
                    NULL AS subtitulo, 
                    NULL AS texto, 
                    p.imagem, 
                    p.arquivo, 
                    p.duration, 
                    p.zip, 
                    p.d, 
                    p.views_id, 
                    p.id,
                    'm' AS tipo
                FROM post_musica p
                INNER JOIN user p2 ON p.usuario = p2.usuario
                LEFT JOIN inscritos_check i ON i.usuario = p.usuario
                WHERE p.privado & 5 = 0 AND p.views_id != ?

                UNION ALL
                
                SELECT
                    $t1
                    i.inscrito,
                    p.acessos, 
                    p.usuario,
                    NULL AS titulo, 
                    NULL AS descricao, 
                    NULL AS subtitulo, 
                    p.texto, 
                    NULL AS imagem, 
                    NULL AS arquivo, 
                    NULL AS duration, 
                    NULL AS zip, 
                    p.d, 
                    p.views_id, 
                    p.id,
                    't' AS tipo
                FROM post_texto p
                INNER JOIN user p2 ON p.usuario = p2.usuario
                LEFT JOIN inscritos_check i ON i.usuario = p.usuario
                WHERE p.privado & 7 = 0 AND p.views_id != ?

                UNION ALL
                
                SELECT
                    $v1
                    i.inscrito,
                    p.acessos, 
                    p.usuario,
                    p.titulo, 
                    NULL AS descricao, 
                    NULL AS subtitulo, 
                    NULL AS texto, 
                    JSON_ARRAY(p.video, p.imagem) AS imagem, 
                    NULL AS arquivo, 
                    NULL AS duration, 
                    NULL AS zip, 
                    p.d, 
                    p.views_id, 
                    p.id,
                    'v' AS tipo
                FROM post_video p
                INNER JOIN user p2 ON p.usuario = p2.usuario
                LEFT JOIN inscritos_check i ON i.usuario = p.usuario
                WHERE p.privado & 5 = 0 AND p.views_id != ?

                UNION ALL
                
                SELECT
                    $pd1
                    i.inscrito,
                    p.acessos, 
                    p.usuario,
                    NULL AS titulo, 
                    p.descricao, 
                    NULL AS subtitulo, 
                    NULL AS texto, 
                    p.imagem, 
                    NULL AS arquivo, 
                    NULL AS duration, 
                    NULL AS zip, 
                    p.d, 
                    p.views_id, 
                    p.id,
                    'pd' AS tipo
                FROM post_product p
                INNER JOIN user p2 ON p.usuario = p2.usuario
                LEFT JOIN inscritos_check i ON i.usuario = p.usuario
                WHERE p.privado & 7 = 0 AND p.views_id != ?
            ) AS p
            LEFT JOIN history h ON h.usuario = ?
            ORDER BY accuracy DESC, p.views_id DESC
            LIMIT ". $pt * $limit . "," . ($pt+1)*$limit,[
                '"' . $usuario . '"', '$."' . $usuario . '"',$id,
                $id,
                $id,
                $id,
                $id,
                $id,
                $usuario,
        ]));
    } else {
        return p($conn->query("SELECT * FROM (
            (
                SELECT 
                'false' AS inscrito,
                $n1
                GREATEST(
                    STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')), '%Y-%m-%d'),
                    STR_TO_DATE(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(d, '$.a')), JSON_UNQUOTE(JSON_EXTRACT(d, '$.o'))), '%Y-%m-%d')
                ) AS latest_date,
                'p' AS tipo,acessos,p.usuario,titulo,NULL AS descricao,subtitulo,texto,imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                0 AS accuracy FROM post p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado & 1=0 AND privado & 4=0
            )
            UNION
            (
                SELECT
                'false' AS inscrito,
                $i1
                GREATEST(
                    STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')), '%Y-%m-%d'),
                    STR_TO_DATE(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(d, '$.a')), JSON_UNQUOTE(JSON_EXTRACT(d, '$.o'))), '%Y-%m-%d')
                ) AS latest_date,
                'i' AS tipo,acessos,p.usuario,NULL AS titulo,descricao,NULL AS subtitulo,NULL AS texto,imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                0 AS accuracy FROM post_imagem p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0
            )
            UNION
            (
                SELECT 
                'false' AS inscrito,
                $m1
                GREATEST(
                    STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')), '%Y-%m-%d'),
                    STR_TO_DATE(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(d, '$.a')), JSON_UNQUOTE(JSON_EXTRACT(d, '$.o'))), '%Y-%m-%d')
                ) AS latest_date,   
                'm' AS tipo,acessos,p.usuario,titulo,NULL AS descricao,NULL AS subtitulo,NULL AS texto,imagem,arquivo,duration,zip,d,views_id,id,
                0 AS accuracy FROM post_musica p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0
            )
            UNION
            (
                SELECT 
                'false' AS inscrito,
                $t1
                GREATEST(
                    STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')), '%Y-%m-%d'),
                    STR_TO_DATE(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(d, '$.a')), JSON_UNQUOTE(JSON_EXTRACT(d, '$.o'))), '%Y-%m-%d')
                ) AS latest_date,   
                't' AS tipo,acessos,p.usuario,NULL AS titulo,NULL AS descricao,NULL AS subtitulo,texto,'' AS imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                0 AS accuracy FROM post_texto p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0
            )
            UNION
            (
                SELECT 
                'false' AS inscrito,
                $v1
                GREATEST(
                    STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')), '%Y-%m-%d'),
                    STR_TO_DATE(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(d, '$.a')), JSON_UNQUOTE(JSON_EXTRACT(d, '$.o'))), '%Y-%m-%d')
                ) AS latest_date,   
                'v' AS tipo,acessos,p.usuario,titulo,NULL AS descricao,NULL AS subtitulo,texto,JSON_ARRAY(video,imagem) AS imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                0 AS accuracy FROM post_video p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0
            )
            UNION
            (
                SELECT
                'false' AS inscrito,
                $pd1
                GREATEST(
                    STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')), '%Y-%m-%d'),
                    STR_TO_DATE(IFNULL(JSON_UNQUOTE(JSON_EXTRACT(d, '$.a')), JSON_UNQUOTE(JSON_EXTRACT(d, '$.o'))), '%Y-%m-%d')
                ) AS latest_date,
                'pd' AS tipo,acessos,p.usuario,NULL AS titulo,descricao,NULL AS subtitulo,NULL AS texto,imagem,NULL AS arquivo,NULL AS duration,NULL AS zip,d,views_id,id,
                0 AS accuracy FROM post_product p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE privado=0
            )
        ) AS ranked WHERE latest_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) ORDER BY latest_date DESC LIMIT ". $pt * $limit . "," . ($pt+1)*$limit));
    }
}
function get_d(){
    date_default_timezone_set('America/Sao_Paulo');
    $d = new DateTime();
    $d = $d->format('Y-m-d H:i:s');
    $d=["o"=>$d];
    return json_encode($d);
}
function get_updated_date(){
    date_default_timezone_set('America/Sao_Paulo');
    $d = new DateTime();
    return $d->format('Y-m-d H:i:s');
}
function get_year($year){
    // Verifica se o ano é bissexto
    $dias=($year % 4 === 0 && $year % 100 !== 0) || ($year % 400 === 0) ? 366 : 355;
    $array=[];
    for ($i=0;$i<$dias;$i++){
        $array[$i]=[];
    };
    return $array;
}
function update_acessos_d($usuario,$acessos_d,$index=null,$count=null){
    date_default_timezone_set('America/Sao_Paulo');
    $dt = new DateTime();
    $d = $dt->format('H:i:s');
    $year = strval($dt->format("Y"));
    $day = strval($dt->format("z"));
    $isMusic=$index && $count;
    if (!isset($acessos_d[$year])){
        $acessos_d[$year]=[];
    }
    $json=[];
    $json[$d]=$usuario;
    if (!isset($acessos_d[$year][$day])){
        $acessos_d[$year][$day]=[];
        for ($i=0;$i<$count;$i++){
            $acessos_d[$year][$day][]=[];
        }
    }
    if ($isMusic){
        array_push($acessos_d[$year][$day][$index],$json);
    } else {
        array_push($acessos_d[$year][$day],$json);
    }
    return json_encode($acessos_d);
}
}
Route::post("/inicio_header",function(){
    $logo=null;
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn = $GLOBALS["conn"];
        $config=$conn->prepare("SELECT logo FROM user WHERE usuario=?",[$usuario]);
        $logo=p($config)[0]["logo"];
    };
    response()->json(["logo"=>$logo,"usuario"=>$usuario]);
});
Route::post("/erro",function(){
    if (request("type")!="info"){
        response()->json(file_get_contents(__DIR__ . '/../public_html/templates/erro/404.html'));
    }
});
Route::get('/', function () {
    resp("index.html");
});
Route::post('/',function () {
    $start_time = microtime(true);
    $usuario=$GLOBALS["user"];
    if (request("type")=="info"){
        if (!session()->has("key_init")){
            $t = 16; $ba = random_bytes($t); $ca = bin2hex($ba); session(["key_init"=>$ca]);
        }
        $conn=$GLOBALS["conn"];
        // $r=p($conn->query("SELECT id,usuario,titulo,imagem,tipo FROM ( 
        //         (SELECT views_id,id,usuario,titulo,imagem,'p' AS tipo FROM post WHERE privado=0 ORDER BY id DESC LIMIT 48)
        //         UNION
        //         (SELECT views_id,id,usuario,descricao AS titulo,imagem,'i' AS tipo FROM post_imagem WHERE privado=0 ORDER BY id DESC LIMIT 48)
        //         UNION
        //         (SELECT views_id,id,usuario,titulo,imagem,'m' AS tipo FROM post_musica WHERE privado=0 ORDER BY id DESC LIMIT 48)
        //         UNION
        //         (SELECT p.views_id AS views_id,p.id AS id,p.usuario AS usuario,p.titulo AS titulo,
        //         (SELECT CONCAT('[\"',GROUP_CONCAT(p2.imagem SEPARATOR '\",\"'),'\"]') 
        //         FROM (
        //                 SELECT id AS id1, NULL AS id2, NULL AS id3, imagem FROM post
        //                 UNION
        //                 SELECT NULL AS id1, id AS id2, NULL AS id3, imagem FROM post_imagem
        //                 UNION
        //                 SELECT NULL AS id1, NULL AS id2, id AS id3, imagem FROM post_musica
        //             ) AS p2
        //             WHERE FIND_IN_SET(CASE WHEN p.tipo='post' THEN p2.id1 WHEN p.tipo='post_imagem' THEN p2.id2 ELSE p2.id3 END, REPLACE(REPLACE(REPLACE(p.posts, '[', ''), ']', ''),'\"',''))
        //         ) AS imagem,'playlist' AS tipo 
        //         FROM playlist p WHERE privado=0)
        //     ) AS result ORDER BY views_id DESC LIMIT 48
        // "));
        $r=getAlgoritmoNoticia(true,$conn,$usuario,0);
        $r2=[];
        $result=$conn->query("SELECT COUNT(*) AS num FROM post_24 WHERE privado=0");
        if (intval(p($result)[0]["num"])>0){
            $r2=p($conn->query("SELECT u.nome, u.logo, t.usuario, t.acessos, t.id, tp.max_id
                FROM post_24 t
                JOIN (
                    SELECT usuario, MIN(id) AS min_id, MAX(id) AS max_id
                    FROM post_24
                    WHERE privado=0
                    GROUP BY usuario
                    ORDER BY max_id DESC
                    LIMIT 20
                ) AS tp ON t.id = tp.min_id
                JOIN user u ON t.usuario=u.usuario
                ORDER BY t.id DESC
            "));
        };
 
        // $alta=p($conn->query("SELECT palavra, COUNT(*) AS frequencia 
        // FROM (
        //     (
        //         SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(titulo, ' ', n.n), ' ', -1) AS palavra,JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')) AS d FROM post 
        //         JOIN 
        //             (SELECT a.N + b.N * 10 + 1 n
        //             FROM 
        //                 (SELECT 0 N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) a,
        //                 (SELECT 0 N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) b
        //             ORDER BY n) n
        //         WHERE n.n <= 1 + (LENGTH(titulo) - LENGTH(REPLACE(titulo, ' ', ''))) AND STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')),'%Y-%m-%d %H:%i:%s') >= NOW() - INTERVAL 1 DAY
        //     )
        //     UNION ALL
        //     (
        //         SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(descricao, ' ', n.n), ' ', -1) AS palavra,JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')) AS d FROM post_imagem
        //         JOIN 
        //             (SELECT a.N + b.N * 10 + 1 n
        //             FROM 
        //                 (SELECT 0 N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) a,
        //                 (SELECT 0 N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) b
        //             ORDER BY n) n
        //         WHERE n.n <= 1 + (LENGTH(descricao) - LENGTH(REPLACE(descricao, ' ', ''))) AND STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')),'%Y-%m-%d %H:%i:%s') >= NOW() - INTERVAL 1 DAY
        //         )
        //     UNION ALL
        //     (
        //         SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(titulo, ' ', n.n), ' ', -1) AS palavra,JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')) AS d FROM post_musica
        //         JOIN 
        //             (SELECT a.N + b.N * 10 + 1 n
        //             FROM 
        //                 (SELECT 0 N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) a,
        //                 (SELECT 0 N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) b
        //             ORDER BY n) n
        //         WHERE n.n <= 1 + (LENGTH(titulo) - LENGTH(REPLACE(titulo, ' ', ''))) AND STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')),'%Y-%m-%d %H:%i:%s') >= NOW() - INTERVAL 1 DAY
        //     )
        // ) AS palavras
        // GROUP BY palavra
        // ORDER BY frequencia DESC LIMIT 30
        // "));
        $alta=p($conn->query("WITH palavras AS (
                SELECT 
                    SUBSTRING_INDEX(SUBSTRING_INDEX(column_data, ' ', n.n), ' ', -1) AS palavra
                FROM (
                    SELECT titulo AS column_data,d FROM post
                    UNION ALL
                    SELECT texto AS column_data,d FROM post
                    UNION ALL
                    SELECT descricao AS column_data,d FROM post_imagem
                    UNION ALL
                    SELECT titulo AS column_data,d FROM post_musica
                ) AS combined_columns
                JOIN (
                    SELECT a.N + b.N * 10 + 1 n
                    FROM 
                        (SELECT 0 N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) a,
                        (SELECT 0 N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) b
                    ORDER BY n
                ) n ON n.n <= 1 + (LENGTH(column_data) - LENGTH(REPLACE(column_data, ' ', '')))
                WHERE STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')),'%Y-%m-%d %H:%i:%s') >= NOW() - INTERVAL 1 DAY
            )
            SELECT palavra, COUNT(*) AS frequencia 
            FROM palavras
            WHERE palavra LIKE '#%' 
            GROUP BY palavra
            ORDER BY frequencia DESC
            LIMIT 30
        "));
            // $alta=[];

            // STR_TO_DATE(d,'%Y-%m-%d %H:%i:%s')
            response()->json(["posts"=>$r,"st"=>$r2,"usuario"=>$usuario,"alta"=>$alta]);
    } else if (request("type")=="posts" && isset($_POST["pt"])){
        $conn=$GLOBALS["conn"];
        $r=getAlgoritmoNoticia(true,$conn,$usuario,0,intval($_POST["pt"]));
        response()->json(["posts"=>$r,"result"=>"true"]);
    } else {
        response()->json(file_get_contents(__DIR__ . "/../public_html/templates/pagina_inicial/main.html"));
    }
});
Route::get("/busca",function(){
    resp("busca.html");
    // include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/busca",function(){
    if (request("type")=="info"){
    if (isset($_GET["q"])){
        $start_time = microtime(true);
        $usuario=$GLOBALS["user"];
        $ps=request()->query("q");
        if (trim($ps)!=""){
            $r=[];
            $n=0;
            if (substr($ps,0,1)=="@"){
                $p = substr($ps,1,strlen($ps));
                $conn = $GLOBALS["conn"];
                $result = $conn->prepare("SELECT nome,usuario,logo,n_posts FROM user WHERE usuario=? AND cargo & 1=0",[$p]);
                $canals=p($result);
                // return view("busca.index",compact("r","usuario","logo","canal"));
                $end_time = microtime(true);
                $execution_time = ($end_time - $start_time);
                $time=number_format($execution_time, 4);
                $n=1;
                response()->json(["posts"=>$r,"canals"=>$canals,"n_registros"=>$n,"time"=>$time]);
            } else {
                $conn = $GLOBALS["conn"];
                $p = '%' . $ps . '%' ;
                $list2=p($conn->prepare("SELECT usuario,logo FROM user WHERE LOWER(nome) LIKE LOWER(?) AND cargo & 1=0 LIMIT 8",[$p]));
                $list=[];
                foreach ($list2 as $el){
                    array_push($list,$el["usuario"]);
                }
                $filters=json_decode($_POST["filter"],true);
                if ($filters["canal"]){
                    $n+=count($list);
                }
                if (!$filters["canal"]){
                // $s = $conn->prepare("SELECT * FROM post  WHERE LOWER(titulo) LIKE LOWER(?) AND privado=0 ORDER BY id DESC LIMIT 15");
                    if (count($list)>0){
                        $list="'" . implode("','",$list) . "'";
                        $result = $conn->prepare("SELECT * FROM (
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,titulo,NULL AS texto, imagem,'p' AS tipo FROM post WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 5=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,descricao AS titulo,NULL AS texto,imagem,'i' AS tipo FROM post_imagem WHERE ( LOWER(descricao) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 5=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,titulo,NULL AS texto,imagem,'m' AS tipo FROM post_musica WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 5=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,NULL AS titulo,texto,'' AS imagem,'t' AS tipo FROM post_texto WHERE ( LOWER(texto) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 7=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,titulo,NULL AS texto,JSON_ARRAY(video,imagem) AS imagem,'v' AS tipo FROM post_video WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 5=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT posts,d,0 AS acessos,views_id,id,usuario,titulo,NULL AS texto,
                                (
                                    SELECT CONCAT('[',GROUP_CONCAT(JSON_OBJECT(p2.id,p2.imagem) SEPARATOR ','),']')  FROM (
                                        SELECT id AS id1, NULL AS id2, NULL AS id3, NULL AS id4, id, imagem FROM post
                                        UNION
                                        SELECT NULL AS id1, id AS id2, NULL AS id3, NULL AS id4, id, imagem FROM post_imagem
                                        UNION
                                        SELECT NULL AS id1, NULL AS id2, id AS id3, NULL AS id4, id, imagem FROM post_musica
                                        UNION
                                        SELECT NULL AS id1, NULL AS id2, NULL AS id3, id AS id4, id, '' AS imagem FROM post_texto
                                    ) AS p2 WHERE FIND_IN_SET(CASE WHEN p.tipo='post' THEN p2.id1 WHEN p.tipo='post_imagem' THEN p2.id2 WHEN p.tipo='post_musica' THEN p2.id3 ELSE p2.id4 END, REPLACE(REPLACE(REPLACE(p.posts, '[', ''), ']', ''),'\"',''))
                                ) AS imagem,
                            'pl' AS tipo FROM playlist p WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 7=0 ORDER BY JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')) DESC LIMIT 16 )
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,descricao AS titulo,NULL AS texto,imagem,'pd' AS tipo FROM post_product WHERE ( LOWER(descricao) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado=0 ORDER BY acessos DESC LIMIT 16)
                        ) AS result ORDER BY views_id DESC",[$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p]);
                        $r=p($result);
                        $result = $conn->prepare("SELECT COUNT(*) AS num FROM (
                            ( SELECT id,usuario,titulo,NULL AS texto,imagem FROM post  WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 5=0)
                            UNION
                            ( SELECT id,usuario,descricao AS titulo,NULL AS texto,imagem FROM post_imagem WHERE ( LOWER(descricao) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 5=0)
                            UNION
                            ( SELECT id,usuario,titulo,NULL AS texto,imagem FROM post_musica WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 5=0)
                            UNION
                            ( SELECT id,usuario,NULL AS titulo,texto,'' AS imagem FROM post_texto WHERE ( LOWER(texto) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 7=0)
                            UNION
                            ( SELECT id,usuario,titulo,NULL AS texto,JSON_ARRAY(video,imagem) AS imagem FROM post_video WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 5=0)
                            UNION
                            ( SELECT id,usuario,titulo,NULL AS texto,
                            (
                                SELECT CONCAT('[',GROUP_CONCAT(JSON_OBJECT(p2.id,p2.imagem) SEPARATOR ','),']')  FROM (
                                    SELECT id AS id1, NULL AS id2, NULL AS id3, NULL AS id4, id, imagem FROM post
                                    UNION
                                    SELECT NULL AS id1, id AS id2, NULL AS id3, NULL AS id4, id, imagem FROM post_imagem
                                    UNION
                                    SELECT NULL AS id1, NULL AS id2, id AS id3, NULL AS id4, id, imagem FROM post_musica
                                    UNION
                                    SELECT NULL AS id1, NULL AS id2, NULL AS id3, id AS id4, id, '' AS imagem FROM post_texto
                                ) AS p2 WHERE FIND_IN_SET(CASE WHEN p.tipo='post' THEN p2.id1 WHEN p.tipo='post_imagem' THEN p2.id2 WHEN p.tipo='post_musica' THEN p2.id3 ELSE p2.id4 END, REPLACE(REPLACE(REPLACE(p.posts, '[', ''), ']', ''),'\"',''))
                            ) AS imagem FROM playlist p WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 7=0 ORDER BY JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')) DESC LIMIT 16 )
                            UNION
                            ( SELECT id,usuario,descricao AS titulo,NULL AS texto,imagem FROM post_product WHERE ( LOWER(descricao) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) ) AND privado & 5=0)
                        ) AS result",[$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p]);
                        $n+=p($result)[0]["num"];
                        // $result = $conn->prepare("SELECT nome,usuario,logo,n_posts FROM user  WHERE (LOWER(nome) LIKE LOWER(?) OR LOWER(usuario) LIKE LOWER(?)) AND privado=0 ORDER BY id DESC LIMIT 5",[$p,$p]);
                        // $canal=p($result);
                        $result = $conn->prepare("SELECT COUNT(*) AS num FROM user  WHERE ( LOWER(nome) LIKE LOWER(?) OR LOWER(usuario) LIKE LOWER(?) ) AND cargo & 1=0",[$p,$p]);
                        $n+=p($result)[0]["num"];
                    } else {
                        $result = $conn->prepare("SELECT * FROM (
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,titulo,NULL AS texto,imagem,'p' AS tipo FROM post WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 5=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,descricao AS titulo,NULL AS texto,imagem,'i' AS tipo FROM post_imagem WHERE ( LOWER(descricao) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 5=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,titulo,NULL AS texto,imagem,'m' AS tipo FROM post_musica WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 5=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,NULL AS titulo,texto,'' AS imagem,'t' AS tipo FROM post_texto WHERE ( LOWER(texto) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 7=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,titulo,NULL AS texto,JSON_ARRAY(video,imagem) AS imagem,'v' AS tipo FROM post_video WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 5=0 ORDER BY acessos DESC LIMIT 16)
                            UNION
                            ( SELECT    posts,d,0 AS acessos,views_id,id,usuario,titulo,NULL AS texto,
                            (
                                SELECT CONCAT('[',GROUP_CONCAT(JSON_OBJECT(p2.id,p2.imagem) SEPARATOR ','),']')  FROM (
                                    SELECT id AS id1, NULL AS id2, NULL AS id3, NULL AS id4, id, imagem FROM post
                                    UNION
                                    SELECT NULL AS id1, id AS id2, NULL AS id3, NULL AS id4, id, imagem FROM post_imagem
                                    UNION
                                    SELECT NULL AS id1, NULL AS id2, id AS id3, NULL AS id4, id, imagem FROM post_musica
                                    UNION
                                    SELECT NULL AS id1, NULL AS id2, NULL AS id3, id AS id4, id, '' AS imagem FROM post_texto
                                ) AS p2 WHERE FIND_IN_SET(CASE WHEN p.tipo='post' THEN p2.id1 WHEN p.tipo='post_imagem' THEN p2.id2 WHEN p.tipo='post_musica' THEN p2.id3 ELSE p2.id4 END, REPLACE(REPLACE(REPLACE(p.posts, '[', ''), ']', ''),'\"',''))
                            ) AS imagem,
                            'pl' AS tipo FROM playlist p WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 7=0 ORDER BY JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')) DESC LIMIT 16 )
                            UNION
                            ( SELECT '[]' AS posts,d,acessos,views_id,id,usuario,descricao AS titulo,NULL AS texto,imagem,'pd' AS tipo FROM post_product WHERE ( LOWER(descricao) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 7=0 ORDER BY acessos DESC LIMIT 16)
                        ) AS result ORDER BY views_id DESC",[$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p]);
                        $r=p($result);
                        $result = $conn->prepare("SELECT COUNT(*) AS num FROM (
                            ( SELECT id,usuario,titulo,NULL AS texto,imagem FROM post  WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 5=0)
                            UNION
                            ( SELECT id,usuario,descricao AS titulo,NULL AS texto,imagem FROM post_imagem WHERE ( LOWER(descricao) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 5=0)
                            UNION
                            ( SELECT id,usuario,titulo,NULL AS texto,imagem FROM post_musica WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 5=0)
                            UNION
                            ( SELECT id,usuario,NULL AS titulo,texto,'' AS imagem FROM post_texto WHERE ( LOWER(texto) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 7=0)
                            UNION
                            ( SELECT id,usuario,titulo,NULL AS texto,JSON_ARRAY(video,imagem) AS imagem FROM post_video WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 5=0)
                            UNION
                            ( SELECT id,usuario,titulo,NULL AS texto,
                            (
                                SELECT CONCAT('[',GROUP_CONCAT(JSON_OBJECT(p2.id,p2.imagem) SEPARATOR ','),']')  FROM (
                                    SELECT id AS id1, NULL AS id2, NULL AS id3, NULL AS id4, id, imagem FROM post
                                    UNION
                                    SELECT NULL AS id1, id AS id2, NULL AS id3, NULL AS id4, id, imagem FROM post_imagem
                                    UNION
                                    SELECT NULL AS id1, NULL AS id2, id AS id3, NULL AS id4, id, imagem FROM post_musica
                                    UNION
                                    SELECT NULL AS id1, NULL AS id2, NULL AS id3, id AS id4, id, '' AS imagem FROM post_texto
                                ) AS p2 WHERE FIND_IN_SET(CASE WHEN p.tipo='post' THEN p2.id1 WHEN p.tipo='post_imagem' THEN p2.id2 WHEN p.tipo='post_musica' THEN p2.id3 ELSE p2.id4 END, REPLACE(REPLACE(REPLACE(p.posts, '[', ''), ']', ''),'\"',''))
                            ) AS imagem FROM playlist p WHERE ( LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 7=0 ORDER BY JSON_UNQUOTE(JSON_EXTRACT(d, '$.o')) DESC LIMIT 8 )
                            UNION
                            ( SELECT id,usuario,descricao AS titulo,NULL AS texto,imagem FROM post_product WHERE ( LOWER(descricao) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND privado & 7=0)
                        ) AS result",[$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p,$p]);
                        $n+=p($result)[0]["num"];
                        // $result = $conn->prepare("SELEC T nome,usuario,logo,n_posts FROM user  WHERE (LOWER(nome) LIKE LOWER(?) OR LOWER(usuario) LIKE LOWER(?)) AND privado=0 ORDER BY id DESC LIMIT 5",[$p,$p]);
                        // $canal=p($result);
                        $result = $conn->prepare("SELECT COUNT(*) AS num FROM user  WHERE ( LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) ) AND cargo & 1=0",[$p,$p]);
                        $n+=p($result)[0]["num"];
                    }
                }
                if ($usuario){
                    $d=get_updated_date();
                    $conn->prepare("INSERT INTO historico(usuario,texto,d,id)  SELECT ?,?,?,COUNT(*) FROM historico WHERE usuario=?",[$usuario,$ps,$d,$usuario]);
                }
                // echo $n;
                $end_time = microtime(true);
                $execution_time = ($end_time - $start_time);
                $time=number_format($execution_time, 4);
                response()->json(["posts"=>$r,"n_registros"=>$n,"canals"=>$filters["canal"] ? array_slice($list2,0,12) : [],"time"=>$time]);
                // echo json_encode(["posts"=>$r,"canal"=>$canal,"n_registros"=>$n,"time"=>$time]);
                // return view("busca.index",compact("r","usuario","logo","canal"));
            }
        } else {
            r404();
        }
    } else {
        r404();
    }
    } else {
        response()->json(file_get_contents(__DIR__ . '/../public_html/templates/busca/main.html'));
    }
});
// Route::get("/editorias",function(){
    
//     include(__DIR__ . "/inicio.php");
//     $conn = new sqli("anjoov00_config");
//     $result=$conn->query("SELECT * FROM categorias");
//     $r;
//     if ($result->num_rows>0){
//         $r=p($result);
//     }else{
//         $r=[];
//     }
//     $usuario=$GLOBALS["user"];
//     return view("editorias.index",compact("r","usuario","logo"));
// });
// Route::get("/noticia",function(){
//     // $usuario=$GLOBALS["user"] || header("location: /admin");
//     // include(__DIR__ . '/../../nextjs/templates/main/main.html');
//     // resp("noticia.html");
// });
Route::get("/noticia/{id}",function($id){
    $usuario=$GLOBALS["user"];
    // if (request("type")=="info"){
    // include(__DIR__ . "/inicio.php");
    // if (isset($_GET["id"])){
        // $id=request()->query("id");
    $id=intval($id);
    $conn = $GLOBALS["conn"];
    $result=null;
    if ($usuario){
        $clause=($GLOBALS["cargo"] & 4)==4 ? "privado & 4=0" : "privado & 2=0 AND privado & 4=0";
        $result=$conn->prepare("SELECT 
        (SELECT CASE 
                WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                ELSE 'false' 
            END 
        AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='noticia' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        acessos,p.usuario,titulo,subtitulo,texto,imagem,d,views_id,id,'p' AS tipo FROM post p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND $clause",['"' . $usuario . '"', '$."' . $usuario . '"',$id,$id]);
    } else {
        $clause="privado & 2=0 AND privado & 4=0";
        $result=$conn->prepare("SELECT 'false' AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='noticia' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        acessos,p.usuario,titulo,subtitulo,texto,imagem,d,views_id,id,'p' AS tipo FROM post p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND $clause",[$id,$id]); 
    }
    $r=[];
    if ($result->num_rows>0){
        $r=p($result)[0];
        $r["acessos"]++;
        if (is_js()){
            $acessos=$r["acessos"];
            $views_id=$r["views_id"];
            $acessos_d=json_decode(p($conn->prepare("SELECT d2 FROM views WHERE id=? AND tipo='post'",[$views_id]))[0]["d2"],true);
            $acessos_d=update_acessos_d($usuario,$acessos_d);
            $conn->prepare("UPDATE post SET acessos=? WHERE id=? AND privado & 4=0",[$acessos,$id]);
            $conn->prepare("UPDATE views SET d2=? WHERE id=? AND tipo='post'",[$acessos_d,$views_id]);
            $comentarios=p($conn->prepare("SELECT c.usuario,c.texto,c.d,c.id,u.logo FROM comment AS c LEFT JOIN user AS u ON c.user_id=u.id WHERE c.tipo='noticia' AND c.post_id=? AND c.privado=0 ORDER BY c.id DESC LIMIT 50",[$id]));
            unset($r["views"]);
            unset($r["acessos"]);
            unset($r["views_id"]);
            $response=["result"=>"true","usuario"=>$usuario,"comments"=>$comentarios,"post"=>$r];
            if (isset($_GET["i"])){
                $response["posts"]=getAlgoritmoNoticia(false,$conn,$usuario,$views_id,0,24);
            }
            response()->json($response);
            // client();
        } else {
            include(__DIR__ . "/noticia.php");
            client();
        }
        // return view("noticia.index",compact("r","usuario","logo"));
        // include(__DIR__ . '/../public_html/templates/noticia/index.php');
    } else {
        if (is_js()){
            r404();
        } else {
            r404g();
        }
    }
    // } else {
    //     r404();
    // }
    // } else {
    //     response()->json(file_get_contents(__DIR__ . '/../public_html/templates/noticia/main.html'));
    // }
});
// Route::post("/noticia/{id}",function($id){
//     $usuario=$GLOBALS["user"];
//     $id=intval($id);
//     $conn = $GLOBALS["conn"];
//     $result=$conn->prepare("SELECT usuario,titulo,subtitulo,texto,imagem,d,acessos,views_id FROM post WHERE id=? AND privado=0",[$id]);
//     $r=[];
//     if ($result->num_rows>0){
//         $r=p($result)[0];
//         $r["acessos"]++;
//         $acessos=$r["acessos"];
//         $views_id=$r["views_id"];
//         $acessos_d=json_decode(p($conn->prepare("SELECT acessos_d FROM views WHERE id=? AND tipo='post'",[$views_id]))[0]["acessos_d"],true);
//         $d = new DateTime();
//         $d = $d->format('Y-m-d H:i:s');
//         $json=[];
//         $json[$d]=$usuario;
//         $acessos_d[]=$json;
//         $acessos_d=json_encode($acessos_d);
//         $conn->prepare("UPDATE post SET acessos=? WHERE id=? AND privado=0",[$acessos,$id]);
//         $conn->prepare("UPDATE views SET acessos_d=? WHERE id=? AND tipo='post'",[$acessos_d,$views_id]);
//         unset($r["acessos"]);
//         unset($r["views_id"]);
//         // if (isset($_GET["c"]) && $_GET["c"]==1){
//         response()->json(["usuario"=>$usuario,"post"=>$r,"alta"=>get_posts($conn)]);
//         // } else {
//         //     include(__DIR__ . "/noticia.php");
//         // }
//         // return view("noticia.index",compact("r","usuario","logo"));
//         // include(__DIR__ . '/../public_html/templates/noticia/index.php');
//     } else {
//         if (is_js()){
//             r404();
//         } else {
//             r404g();
//         }
//     }
//     // } else {
//     //     response()->json(file_get_contents(__DIR__ . '/../public_html/templates/noticia/main.html'));
//     // }
// });
Route::get("/imagem/{id}",function($id){
    $usuario=$GLOBALS["user"];
    $id=intval($id);
    $conn = $GLOBALS["conn"];
    $result=null;
    if ($usuario){
        $result=$conn->prepare("SELECT 
        (SELECT CASE 
                WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                ELSE 'false' 
            END 
        AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='imagem' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        acessos,p.usuario,descricao,imagem,d,views_id,'i' AS tipo FROM post_imagem p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",['"' . $usuario . '"', '$."' . $usuario . '"',$id,$id]);
    } else {
        $result=$conn->prepare("SELECT 'false' AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='imagem' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        acessos,p.usuario,descricao,imagem,d,views_id,'i' AS tipo FROM post_imagem p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",[$id,$id]); 
    }
    $r=[];
    if ($result->num_rows>0){
        $r=p($result)[0];
        $r["acessos"]++;
        if (is_js()){
            $acessos=$r["acessos"];
            $views_id=$r["views_id"];
            $acessos_d=json_decode(p($conn->prepare("SELECT d2 FROM views WHERE id=? AND tipo='post_imagem'",[$views_id]))[0]["d2"],true);
            $acessos_d=update_acessos_d($usuario,$acessos_d);
            $conn->prepare("UPDATE post_imagem SET acessos=? WHERE id=? AND privado=0",[$acessos,$id]);
            $conn->prepare("UPDATE views SET d2=? WHERE id=? AND tipo='post_imagem'",[$acessos_d,$views_id]);
            $comentarios=p($conn->prepare("SELECT c.usuario,c.texto,c.d,c.id,u.logo FROM comment AS c LEFT JOIN user AS u ON c.user_id=u.id WHERE c.tipo='imagem' AND c.post_id=? AND c.privado=0 ORDER BY c.id DESC LIMIT 50",[$id]));
            unset($r["views"]);
            unset($r["acessos"]);
            unset($r["views_id"]);
            $response=["result"=>"true","usuario"=>$usuario,"comments"=>$comentarios,"post"=>$r];
            if (isset($_GET["i"])){
                $response["posts"]=getAlgoritmoNoticia(false,$conn,$usuario,$views_id,0,24);
            }
            response()->json($response);
        } else {
            include(__DIR__ . "/imagem.php");
            client();
        }
    } else {
        if (is_js()){
            r404();
        } else {
            r404g();
        }
    }
});
Route::get("/musica/{id}",function($id){
    $usuario=$GLOBALS["user"];
    $conn=$GLOBALS["conn"];
    $id=intval($id);
    $r=null;
    if ($usuario){
        $r=$conn->prepare("SELECT 
        (SELECT CASE 
                WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                ELSE 'false' 
            END 
        AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='musica' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        id,downloads,duration,acessos,titulo,p.usuario,imagem,views_id,arquivo,zip,'m' AS tipo FROM post_musica p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",['"' . $usuario . '"', "$." . $usuario,$id,$id]);
    } else {
        $r=$conn->prepare("SELECT 'false' AS inscrito, 
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='musica' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        id,downloads,duration,acessos,titulo,p.usuario,imagem,views_id,arquivo,zip,'m' AS tipo FROM post_musica p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",[$id,$id]); 
    }
    if ($r->num_rows>0){
        $r=p($r)[0];
        $acessos=0;
        $views_id=$r["views_id"];
        $comentarios=p($conn->prepare("SELECT c.usuario,c.texto,c.d,c.id,u.logo FROM comment AS c LEFT JOIN user AS u ON c.user_id=u.id WHERE c.tipo='musica' AND c.post_id=? AND c.privado=0 ORDER BY c.id DESC LIMIT 50",[$id]));
        // $conn->prepare("UPDATE post_musica SET acessos=? WHERE id=? AND privado=0",[$acessos,$id]);
        // $acessos_d=json_decode(p($conn->prepare("SELECT d2 FROM views WHERE id=?",[$views_id]))[0]["acessos_d"],true);
        // $d=get_updated_date();
        if (is_js()){
            $response=["result"=>"true","usuario"=>$usuario,"comments"=>$comentarios,"post"=>$r];
            if (isset($_GET["i"])){
                $response["posts"]=getAlgoritmoNoticia(false,$conn,$usuario,$views_id,0,24);
            }
            response()->json($response);
            // client();
        } else {
            include(__DIR__ . "/musica.php");
            client();
        }
    } else {
        if (is_js()){
            r404();
        } else {
            r404g();
        }
    }
    // } else {
    //     response()->json(["header_location"=>"/admin"]);
    // }
});
Route::post("/musica/{id}",function($id){
    $usuario=$GLOBALS["user"];
    if (request("type")=="info"){
        $conn=$GLOBALS["conn"];
        $id=intval(request("id"));
        $result=$conn->prepare("SELECT downloads,duration,acessos,titulo,usuario,imagem,views_id,arquivo,zip FROM post_musica WHERE id=? AND privado=0",[$id]);
        if ($result->num_rows>0){
            $result=p($result)[0];
            $durations=$result["duration"];
            $downloads=$result["downloads"];
            $acessos=0;
            $views_id=$result["views_id"];
            $titulo=$result["titulo"];
            $imagem=$result["imagem"];
            $arquivo=$result["arquivo"];
            $usuario_musica=$result["usuario"];
            $zip=$result["zip"];
            response()->json(["result"=>"true","downloads"=>$downloads,"zip"=>$zip,"durations"=>$durations,"titulo"=>$titulo,"imagem"=>$imagem,"arquivo"=>$arquivo,"usuario_musica"=>$usuario_musica,"usuario"=>$usuario]);
        } else {
            r404();
        }
    } else if (request("type")=="download"){
        $id=intval(request("id"));
        $conn=$GLOBALS["conn"];
        $conn->prepare("UPDATE post_musica SET downloads=downloads+1 WHERE id=?",[$id]);
        response()->json(["result"=>"true","usuario"=>$usuario]);
    } else if (request("type")=="view"){
        $id=intval(request("id"));
        $index=request("index");
        $conn=$GLOBALS["conn"];
        $result=p($conn->prepare("SELECT views_id,acessos,acessos_parcial,(SELECT d2 FROM views WHERE id=p.views_id AND tipo='musica') AS acessos_d FROM post_musica p WHERE id=?",[$id]))[0];
        $acessos_parcial=json_decode($result["acessos_parcial"],true);
        $acessos_parcial[$index]=$acessos_parcial[$index]+1;
        $acessos=$result["acessos"]+1;
        $views_id=$result["views_id"];
        $acessos_d=update_acessos_d($usuario,json_decode($result["acessos_d"],true),$index,count($acessos_parcial));
        $acessos_parcial=json_encode($acessos_parcial);
        $conn->prepare("UPDATE post_musica SET acessos=?,acessos_parcial=? WHERE id=?",[$acessos,$acessos_parcial,$id]);
        $conn->prepare("UPDATE views SET acessos_d=? WHERE id=? AND excluido='false'",[$acessos_d,$views_id]);
        response()->json(["result"=>"true","usuario"=>$usuario]);
    }
    // } else {
    //     response()->json(["header_location"=>"/admin"]);
    // }
});
Route::get("/texto/{id}",function($id){
    $usuario=$GLOBALS["user"];
    $id=intval($id);
    $conn = $GLOBALS["conn"];
    $result=null;
    if ($usuario){
        $result=$conn->prepare("SELECT 
        (SELECT CASE 
                WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                ELSE 'false' 
            END 
        AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='texto' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        id,acessos,p.usuario,texto,d,views_id,'t' AS tipo FROM post_texto p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado & 7=0",['"' . $usuario . '"', '$."' . $usuario . '"',$id,$id]);
    } else {
        $result=$conn->prepare("SELECT 'false' AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='texto' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        id,acessos,p.usuario,texto,d,views_id,'t' AS tipo FROM post_texto p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado & 7=0",[$id,$id]); 
    }
    $r=[];
    if ($result->num_rows>0){
        if (is_js()){
            $r=p($result)[0];
            $r["acessos"]++;
            $acessos=$r["acessos"];
            $views_id=$r["views_id"];
            $acessos_d=json_decode(p($conn->prepare("SELECT d2 FROM views WHERE id=? AND tipo='post_texto'",[$views_id]))[0]["d2"],true);
            $acessos_d=update_acessos_d($usuario,$acessos_d);
            $conn->prepare("UPDATE post_texto SET acessos=? WHERE id=? AND privado=0",[$acessos,$id]);
            $conn->prepare("UPDATE views SET d2=? WHERE id=? AND tipo='post_texto'",[$acessos_d,$views_id]);
            $comentarios=p($conn->prepare("SELECT c.usuario,c.texto,c.d,c.id,u.logo FROM comment AS c LEFT JOIN user AS u ON c.user_id=u.id WHERE c.tipo='texto' AND c.post_id=? AND c.privado=0 ORDER BY c.id DESC LIMIT 50",[$id]));
            unset($r["views"]);
            unset($r["acessos"]);
            unset($r["views_id"]);
            $response=["result"=>"true","usuario"=>$usuario,"comments"=>$comentarios,"post"=>$r];
            if (isset($_GET["i"])){
                $response["posts"]=getAlgoritmoNoticia(false,$conn,$usuario,$views_id,0,24);
            }
            response()->json($response);
        } else {
            include(__DIR__ . "/texto.php");
            client();
        }
    } else {
        if (is_js()){
            r404();
        } else {
            r404g();
        }
    }

});
Route::get("/video/{id}",function($id){
    $user=$GLOBALS["user"];
    $id=intval($id);
    $conn = $GLOBALS["conn"];
    $result=null;
    if ($user){
        $result=$conn->prepare("SELECT 
        (SELECT CASE 
                WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                ELSE 'false' 
            END 
        AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='video' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        id,acessos,p.usuario,titulo,JSON_ARRAY(video,imagem) AS imagem,texto,d,views_id,'v' AS tipo FROM post_video p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",['"' . $user . '"', '$."' . $user . '"',$id,$id]);
    } else {
        $result=$conn->prepare("SELECT 'false' AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='video' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        id,acessos,p.usuario,titulo,JSON_ARRAY(video,imagem) AS imagem,texto,d,views_id,'v' AS tipo FROM post_video p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",[$id,$id]); 
    }
    $r=[];
    if ($result->num_rows>0){
        if (is_js()){
            $r=p($result)[0];
            $views_id=$r["views_id"];
            $comentarios=p($conn->prepare("SELECT c.usuario,c.texto,c.d,c.id,u.logo FROM comment AS c LEFT JOIN user AS u ON c.user_id=u.id WHERE c.tipo='video' AND c.post_id=? AND c.privado=0 ORDER BY c.id DESC LIMIT 50",[$id]));
            $response=["result"=>"true","usuario"=>$user,"comments"=>$comentarios,"post"=>$r];
            if (isset($_GET["i"])){
                $response["posts"]=getAlgoritmoNoticia(false,$conn,$user,$views_id,0,24);
            }
            response()->json($response);
        } else {
            include(__DIR__ . "/video.php");
            client();
        }
    } else {
        r404g();
    }
    
});
Route::post("/video/{id}",function($id){
    $user=$GLOBALS["user"];
    $id=intval($id);
    $conn = $GLOBALS["conn"];
    $result=$conn->prepare("SELECT * FROM post_video WHERE id=?",[$id]);
    if ($result->num_rows>0){
        $r=p($result)[0];
        $r["acessos"]++;
        $acessos=$r["acessos"];
        $views_id=$r["views_id"];
        $acessos_d=json_decode(p($conn->prepare("SELECT d2 FROM views WHERE id=? AND tipo='post_video'",[$views_id]))[0]["d2"],true);
        $acessos_d=update_acessos_d($user,$acessos_d);
        $conn->prepare("UPDATE post_video SET acessos=? WHERE id=? AND privado=0",[$acessos,$id]);
        $conn->prepare("UPDATE views SET d2=? WHERE id=? AND tipo='post_video'",[$acessos_d,$views_id]);
        response()->json(["result"=>"true","usuario"=>$user]);
    } else {
        r404();
    }
});
Route::get("/playlist/{id}",function($id){
    $usuario=$GLOBALS["user"];
    $id=intval($id);
    $conn=$GLOBALS["conn"];
    $r=$conn->prepare("SELECT p.*, (SELECT CONCAT('[\"',GROUP_CONCAT(p2.titulo SEPARATOR '\",\"'),'\"]') 
        FROM (
                SELECT id AS id1, NULL AS id2, NULL AS id3, titulo FROM post
                UNION
                SELECT NULL AS id1, id AS id2, NULL AS id3, descricao AS titulo FROM post_imagem
                UNION
                SELECT NULL AS id1, NULL AS id2, id AS id3, titulo FROM post_musica
            ) AS p2
            WHERE FIND_IN_SET(CASE WHEN p.tipo='post' THEN p2.id1 WHEN p.tipo='post_imagem' THEN p2.id2 ELSE p2.id3 END, REPLACE(REPLACE(REPLACE(p.posts, '[', ''), ']', ''),'\"',''))
        ) AS titulos,
        (SELECT CONCAT('[\"',GROUP_CONCAT(p2.imagem SEPARATOR '\",\"'),'\"]') 
        FROM (
                SELECT id AS id1, NULL AS id2, NULL AS id3, imagem FROM post
                UNION
                SELECT NULL AS id1, id AS id2, NULL AS id3, imagem FROM post_imagem
                UNION
                SELECT NULL AS id1, NULL AS id2, id AS id3, imagem AS imagem FROM post_musica
            ) AS p2
            WHERE FIND_IN_SET(CASE WHEN p.tipo='post' THEN p2.id1 WHEN p.tipo='post_imagem' THEN p2.id2 ELSE p2.id3 END, REPLACE(REPLACE(REPLACE(p.posts, '[', ''), ']', ''),'\"',''))
        ) AS imagem,
        (SELECT CONCAT('[\"',GROUP_CONCAT(p2.id SEPARATOR '\",\"'),'\"]') 
        FROM (
                SELECT id AS id1, NULL AS id2, NULL AS id3, id FROM post
                UNION
                SELECT NULL AS id1, id AS id2, NULL AS id3, id FROM post_imagem
                UNION
                SELECT NULL AS id1, NULL AS id2, id AS id3, id FROM post_musica
            ) AS p2
            WHERE FIND_IN_SET(CASE WHEN p.tipo='post' THEN p2.id1 WHEN p.tipo='post_imagem' THEN p2.id2 ELSE p2.id3 END, REPLACE(REPLACE(REPLACE(p.posts, '[', ''), ']', ''),'\"',''))
        ) AS idd,
        'pl' AS tipo, tipo AS post_tipo,
    FROM playlist p WHERE id=? AND privado=0",[$id]);
    if ($r->num_rows>0){
        $r=p($r)[0];
        if (is_js()){
            $response=["result"=>"true","usuario"=>$usuario,"post"=>$r];
            if (isset($_GET["i"])){
                $response["posts"]=getAlgoritmoNoticia(false,$conn,$usuario,$views_id,0,24);
            }
            response()->json($response);
        } else {
            include(__DIR__ . "/playlist.php");
            client();
        }
    } else {
        if (is_js()){
            r404();
        } else {
            r404g();
        }
    }
});
Route::get("/product/{id}",function($id){
    $usuario=$GLOBALS["user"];
    $id=intval($id);
    $conn = $GLOBALS["conn"];
    $result=null;
    if ($usuario){
        $result=$conn->prepare("SELECT 
        (SELECT CASE 
                WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
                ELSE 'false' 
            END 
        AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='product' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        acessos,p.usuario,descricao,imagem,d,views_id,'i' AS tipo FROM post_product p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",['"' . $usuario . '"', '$."' . $usuario . '"',$id,$id]);
    } else {
        $result=$conn->prepare("SELECT 'false' AS inscrito,
        CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
        (SELECT COUNT(*) AS num FROM comment WHERE tipo='product' AND post_id=? AND privado=0) AS n_comment,
        p2.logo,p2.nome,
        acessos,p.usuario,descricao,imagem,d,views_id,'i' AS tipo FROM post_product p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",[$id,$id]); 
    }
    $r=[];
    if ($result->num_rows>0){
        $r=p($result)[0];
        $r["acessos"]++;
        if (is_js()){
            $acessos=$r["acessos"];
            $views_id=$r["views_id"];
            $acessos_d=json_decode(p($conn->prepare("SELECT d2 FROM views WHERE id=? AND tipo='post_product'",[$views_id]))[0]["d2"],true);
            $acessos_d=update_acessos_d($usuario,$acessos_d);
            $conn->prepare("UPDATE post_product SET acessos=? WHERE id=? AND privado=0",[$acessos,$id]);
            $conn->prepare("UPDATE views SET d2=? WHERE id=? AND tipo='post_product'",[$acessos_d,$views_id]);
            $comentarios=p($conn->prepare("SELECT c.usuario,c.texto,c.d,c.id,u.logo FROM comment AS c LEFT JOIN user AS u ON c.user_id=u.id WHERE c.tipo='product' AND c.post_id=? AND c.privado=0 ORDER BY c.id DESC LIMIT 50",[$id]));
            unset($r["views"]);
            unset($r["acessos"]);
            unset($r["views_id"]);
            $response=["result"=>"true","usuario"=>$usuario,"comments"=>$comentarios,"post"=>$r];
            if (isset($_GET["i"])){
                $response["posts"]=getAlgoritmoNoticia(false,$conn,$usuario,$views_id,0,24);
            }
            response()->json($response);
        } else {
            include(__DIR__ . "/product.php");
            client();
        }
    } else {
        if (is_js()){
            r404();
        } else {
            r404g();
        }
    }
});
Route::post(["/@{name}","/@{name}/{parte}"],function($name,$parte=null){
    if (request("type")=="info"){
        $tempo_inicial=microtime(true);
        $name=urldecode($name);
        $conn = $GLOBALS["conn"];
        // $name=request()->query("name");
        $usuario=$GLOBALS["user"];
        $result=$conn->prepare("SELECT nome,usuario,logo,banner,n_posts,cargo FROM user WHERE usuario=?",[$name]);
        $ss=p($result);
        if ($result->num_rows>0){
            if ((intval($ss[0]["cargo"]) & 1)==1){
                response()->json(["result"=>"privado"]);
                return;
            } else {
                $inscrito=false;
                if (isset($usuario)){
                    $s=$conn->prepare("SELECT inscritos FROM user WHERE usuario=?",[$usuario]);
                    $r=json_decode(p($s)[0]["inscritos"],true);
                    $inscrito=isset($r[$name]);
                }
                $s=$conn->prepare("SELECT n_inscritos FROM inscritos WHERE usuario=?",[$name]);
                $s=p($s)[0];
                $info=$ss;
                $info[0]["n_inscritos"]=$s["n_inscritos"];
                $result=$conn->prepare("SELECT MIN(id) AS id FROM post_24 WHERE usuario=? AND privado=0",[$name]);
                if ($result->num_rows>0){
                    $info[0]["post_24"]=p($result)[0]["id"];
                }
                $num=$info[0]["n_posts"];
                $description=$conn->prepare("SELECT descricao FROM descricao WHERE usuario=?",[$name]);
                if ($description->num_rows>0){
                    $description=p($description)[0]["descricao"];
                } else {
                    $description="";
                }
                $info[0]["description"]=$description;
                $card=$conn->prepare("SELECT links,titles,descriptions FROM card WHERE usuario=?",[$name]);
                if ($card->num_rows>0){
                    $card=p($card)[0];
                    $card=["links"=>json_decode($card["links"]),"titles"=>json_decode(($card["titles"])),"descriptions"=>json_decode($card["descriptions"])];
                } else {
                    $card=["links"=>[],"titles"=>[],"descriptions"=>[]];
                }
                $info[0]["card"]=json_encode($card);
                $posts=p($conn->prepare("SELECT usuario,titulo,NULL AS texto,id,views_id,imagem,'p' AS tipo FROM post WHERE usuario=? AND privado & 7=0 ORDER BY id DESC LIMIT 48",[$name]));
                $imagens=p($conn->prepare("SELECT usuario,descricao AS titulo,NULL AS texto,id,views_id,imagem,'i' AS tipo FROM post_imagem WHERE usuario=? AND privado & 7=0 ORDER BY id DESC LIMIT 48",[$name]));
                $musicas=p($conn->prepare("SELECT usuario,titulo,NULL AS texto,id,views_id,imagem,'m' AS tipo FROM post_musica WHERE usuario=? AND privado & 7=0 ORDER BY id DESC LIMIT 48",[$name]));
                $textos=p($conn->prepare("SELECT usuario,NULL AS titulo,texto,id,views_id,'' AS imagem,'t' AS tipo FROM post_texto WHERE usuario=? AND privado & 7=0 ORDER BY id DESC LIMIT 48",[$name]));
                $videos=p($conn->prepare("SELECT usuario,titulo,NULL AS texto,id,views_id,JSON_ARRAY(video,imagem) AS imagem,'v' AS tipo FROM post_video WHERE usuario=? AND privado & 7=0 ORDER BY id DESC LIMIT 48",[$name]));
                $visualized=false;
                if ($usuario){
                    $visualized=p($conn->prepare("SELECT (CASE WHEN COUNT(CASE WHEN d2 LIKE (?) THEN 1 ELSE NULL END) = COUNT(*) THEN COUNT(*) ELSE 0 END) AS visualized FROM views WHERE usuario=? AND excluido='false' AND tipo='post_24'
                    ",["%" . $usuario . "%",$name]))[0]["visualized"];
                    $visualized=$visualized!=0;
                }
                $result=$conn->prepare("SELECT * FROM destaques WHERE usuario=?",[$name]);
                $destaques=null;
                if ($result->num_rows>0){
                    $result=p($result)[0];
                    $name_tipo=$result["geral_tipo"];
                    $titulo_value=null;
                    $imagem_value=null;
                    $sigla_name_tipo=null;
                    $geral_select=null;
                    $values=null;
                    if (intval($result["geral"])==-1){
                        $geral_select="NULL AS geral,";
                        $values=[
                            $result["post"],$name,
                            $result["post_imagem"],$name,
                            $result["post_musica"],$name,
                            $result["post_texto"],$name,
                            $result["post_video"],$name,
                            $name,$name,$name,$name,$name,
                            $result["playlist"],$name
                        ];
                    } else {
                        $titulo_value=$name_tipo=="post_imagem" ? 'NULL' : ($name_tipo=="post_texto" ? "texto" : "titulo");
                        $imagem_value=$name_tipo=="post_texto" ? "''" : "imagem";
                        $types=[
                            "post"=>"p",
                            "post_imagem"=>"i",
                            "post_texto"=>"t",
                            "post_video"=>"v",
                            "playlist"=>"pl",
                        ];
                        $sigla_name_tipo=$types[$name_tipo];
                        $geral_select="(SELECT JSON_ARRAY($titulo_value,$imagem_value,id,'$sigla_name_tipo')  FROM $name_tipo WHERE views_id=? AND usuario=? AND privado=0) AS geral,";
                        $values=[
                            $result["geral"],$name,
                            $result["post"],$name,
                            $result["post_imagem"],$name,
                            $result["post_musica"],$name,
                            $result["post_texto"],$name,
                            $result["post_video"],$name,
                            $name,$name,$name,$name,$name,
                            $result["playlist"],$name
                        ];  
                    }
                    
                    $destaques=p($conn->prepare("SELECT 
                            $geral_select
                            (SELECT JSON_ARRAY(titulo,imagem,id,'p') AS materia FROM post WHERE views_id=? AND usuario=? AND privado & 7=0) AS materia,
                            (SELECT JSON_ARRAY(descricao,imagem,id,'i') AS imagem FROM post_imagem WHERE views_id=? AND usuario=? AND privado & 7=0) AS imagem,
                            (SELECT  JSON_ARRAY(titulo,imagem,id,'m') AS musica FROM post_musica WHERE views_id=? AND usuario=? AND privado & 7=0) AS musica,
                            (SELECT  JSON_ARRAY(texto,'',id,'t') AS texto FROM post_texto WHERE views_id=? AND usuario=? AND privado & 7=0) AS texto,
                            (SELECT  JSON_ARRAY(titulo,imagem,id,'v') AS texto FROM post_video WHERE views_id=? AND usuario=? AND privado & 7=0) AS video,
                            (
                                SELECT CASE 
                                    WHEN p.tipo='post' THEN (SELECT JSON_ARRAY(p.titulo,imagem,p.id,'pl') FROM post WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND usuario=? AND privado & 7=0)
                                    WHEN p.tipo='post_imagem' THEN (SELECT JSON_ARRAY(p.titulo,imagem,p.id,'pl') FROM post_imagem WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND usuario=? AND privado & 7=0)
                                    WHEN p.tipo='post_musica' THEN (SELECT JSON_ARRAY(p.titulo,imagem,p.id,'pl') FROM post_musica WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND usuario=? AND privado & 7=0)
                                    WHEN p.tipo='post_texto' THEN (SELECT JSON_ARRAY(p.titulo,'',p.id,'pl') FROM post_texto WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND usuario=? AND privado & 7=0)
                                    ELSE (SELECT JSON_ARRAY(p.titulo,imagem,p.id,'pl') FROM post_video WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND usuario=? AND privado & 7=0)
                                END AS imagem FROM playlist p WHERE views_id=? AND usuario=? AND privado & 7=0
                            ) AS playlist
                        FROM post LIMIT 1",$values))[0];
                } else {
                    $destaques=[
                        "geral"=>null,
                        "materia"=>null,
                        "imagem"=>null,
                        "musica"=>null,
                        "texto"=>null,
                        "video"=>null,
                        "playlist"=>null
                    ];
                }
                $playlists=p($conn->prepare("SELECT p.*,
                (
                    SELECT CONCAT('[',GROUP_CONCAT(JSON_OBJECT(p2.id,p2.imagem) SEPARATOR ','),']')  FROM (
                        SELECT id AS id1, NULL AS id2, NULL AS id3, id, imagem FROM post
                        UNION
                        SELECT NULL AS id1, id AS id2, NULL AS id3, id, imagem FROM post_imagem
                        UNION
                        SELECT NULL AS id1, NULL AS id2, id AS id3, id, imagem FROM post_musica
                    ) AS p2 WHERE FIND_IN_SET(CASE WHEN p.tipo='post' THEN p2.id1 WHEN p.tipo='post_imagem' THEN p2.id2 ELSE p2.id3 END, REPLACE(REPLACE(REPLACE(p.posts, '[', ''), ']', ''),'\"',''))
                ) AS imagem
                FROM playlist p WHERE usuario=? AND privado & 7=0",[$name]));
                $tempo_final = microtime(true);
                $diferenca = ($tempo_final - $tempo_inicial) * 1000;
                response()->json([
                    "result"=>"true",
                    "destaques"=>$destaques,
                    "visualized"=>$visualized,
                    "time"=>number_format($diferenca, 2),
                    "name"=>$info[0]["usuario"],
                    "materias"=>$posts,
                    "imagens"=>$imagens,
                    "musicas"=>$musicas,
                    "textos"=>$textos,
                    "videos"=>$videos,
                    "playlists"=>$playlists,
                    "n"=>$num,
                    "info"=>$info[0],
                    "inscrito"=>$inscrito,
                    "usuario"=>$usuario
                ]);
            }
        } else {
            r404();
        }
    } else if (request("type")=="option"){
        $name=urldecode($name);
        $conn = $GLOBALS["conn"];
        $usuario=$GLOBALS["user"];
        if ($usuario){
            $q=p($conn->prepare("SELECT u.inscritos, u.n_inscritos AS channel_n_inscritos, cargo, i.n_inscritos FROM user u INNER JOIN inscritos i ON u.usuario=i.usuario WHERE u.usuario=?",[$usuario]))[0];
            ["inscritos"=>$inscritos,"channel_n_inscritos"=>$channel_n_inscritos,"cargo"=>$cargo,"n_inscritos"=>$n_inscritos]=$q;
            if ((intval($cargo) & 1)==1){
                response()->json(["result"=>"privado"]);
                return;
            }
            if ($usuario==$name){
                response()->json(["result"=>"my","n_inscritos"=>$n_inscritos]);
                return;
            }
            $inscritos=json_decode($inscritos,true);
            if (isset($inscritos[$name])){
                unset($inscritos[$name]);
                $inscritos=json_encode($inscritos);
                $n_inscritos=intval($n_inscritos)-1;
                $s=$conn->prepare("UPDATE user SET inscritos=?, n_inscritos=? WHERE usuario=?",[$inscritos,$n_inscritos,$usuario]);
                $s=$conn->prepare("SELECT * FROM inscritos WHERE usuario=?",[$name]);
                $s=p($s)[0];
                $inscritos=json_decode($s["inscritos"],true);
                unset($inscritos[$usuario]);
                $n_inscritos=intval($channel_n_inscritos)-1;
                $inscritos=json_encode($inscritos);
                $s=$conn->prepare("UPDATE inscritos SET inscritos=?,n_inscritos=? WHERE usuario=?",[$inscritos,$n_inscritos,$name]);
                response()->json(["result"=>"true","n_inscritos"=>$n_inscritos,"usuario"=>$usuario]);
            } else {
                $inscritos[$name]="true";
                $inscritos=json_encode($inscritos);
                $n_inscritos=intval($n_inscritos)+1;
                $s=$conn->prepare("UPDATE user SET inscritos=?, n_inscritos=? WHERE usuario=?",[$inscritos,$n_inscritos,$usuario]);
                $s=$conn->prepare("SELECT * FROM inscritos WHERE usuario=?",[$name]);
                $s=p($s)[0];
                $inscritos=json_decode($inscritos,true);
                $inscritos[$usuario]="true";
                $n_inscritos=intval($channel_n_inscritos)+1;
                $inscritos=json_encode($inscritos);
                $s=$conn->prepare("UPDATE inscritos SET inscritos=?,n_inscritos=? WHERE usuario=?",[$inscritos,$n_inscritos,$name]);
                response()->json(["result"=>"true","n_inscritos"=>$n_inscritos,"usuario"=>$usuario]);
            };
        } else {
            response()->json(["header_location"=>"/admin"]);
        }
    } else {
        // echo json_encode(file_get_contents(__DIR__ . '/../public_html/templates/canal/main.html'));
    }
});
Route::post("/get-title",function(){
    $links=json_decode($_POST["links"]);
    $titles=[];
    foreach($links as $link){
        $ch = curl_init();

        // Configurações de cURL
        curl_setopt($ch, CURLOPT_URL, $link);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3); // Tempo limite de 10 segundos

        // Executa a requisição e obtém o conteúdo
        $html = curl_exec($ch);
        if (curl_errno($ch) || empty($html)) {
            $titles[$link]="";
        } else {
            try {
                // Cria um novo objeto DOMDocument
                $doc = new DOMDocument();
                libxml_use_internal_errors(true);
                // Carrega o conteúdo HTML no DOMDocument
                $doc->loadHTML($html);
                // Cria um objeto DOMXPath para consultar o DOM
                $xpath = new DOMXPath($doc);
            
                // Consulta a tag <title>
                $titleNodes = $xpath->query('//title');
            
                // Se o título for encontrado, retorna o texto
                if ($titleNodes->length > 0) {
                    $titles[$link]=$titleNodes->item(0)->textContent;
                } else {
                    $titles[$link]="";
                }
            } catch (Exception $e){
                $titles[$link]="";
            }
        }
        curl_close($ch);
    }    
    response()->json(["result"=>"true","titles"=>json_encode($titles)]);
});
// Route::get("/ajeitar",function(){
//     $conn=$GLOBALS["conn"];
//     $p=p($conn->query("SELECT id,arquivo,acessos FROM post_musica"));
//     foreach ($p as $s){
//         if (!isJsonString($p["acessos"])){
//             $acessos_bj=[];
//             $arquivos=json_decode($p["arquivos"]);
//             foreach($arquivos as $arquivo){
//                 array_push($acessos_obj,0);
//             }
//             $conn->prepare("UPDATE post_musica SET acessos=? WHERE id=?",[$id]);
//         }
//     }
// });
Route::get('/inscricoes', function () {
    $usuario=$GLOBALS["user"] || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/inscricoes",function(){
    // return view('welcome');
    // $logo;
    $usuario=$GLOBALS["user"];
    if ($usuario){
        if (request("type")=="info"){
            $conn=$GLOBALS["conn"];
            $r=$conn->prepare("SELECT inscritos FROM user WHERE usuario=? AND cargo & 1=0",[$usuario]);
            if ($r->num_rows>0){
                $r=json_decode(p($r)[0]["inscritos"],true);
                $rk=array_keys($r);
                $r=[];
                $r2=[];
                $canal=[];
                $lista=to_list($rk);
                $r=p($conn->query("SELECT * FROM (
                        (SELECT views_id,id,usuario,NULL AS texto,titulo,imagem,'p' AS tipo FROM post WHERE usuario IN ($lista) AND privado & 5=0 ORDER BY id DESC LIMIT 48)
                        UNION
                        (SELECT views_id,id,usuario,NULL AS texto,descricao AS titulo,imagem,'i' AS tipo FROM post_imagem WHERE usuario IN ($lista) AND privado & 5=0 ORDER BY id DESC LIMIT 48)
                        UNION
                        (SELECT views_id,id,usuario,NULL AS texto,titulo,imagem,'m' AS tipo FROM post_musica WHERE usuario IN ($lista) AND privado & 5=0 ORDER BY id DESC LIMIT 48)
                        UNION
                        (SELECT views_id,id,usuario,texto,NULL AS titulo,NULL AS imagem,'t' AS tipo FROM post_texto WHERE usuario IN ($lista) AND privado & 7=0 ORDER BY id DESC LIMIT 48)
                        UNION
                        (SELECT views_id,id,usuario,NULL AS texto,titulo,JSON_ARRAY('',imagem),'v' AS tipo FROM post_video WHERE usuario IN ($lista) AND privado & 5=0 ORDER BY id DESC LIMIT 48)
                        UNION
                        (SELECT views_id,id,usuario,NULL AS texto,NULL AS titulo,imagem,'pd' AS tipo FROM post_product WHERE usuario IN ($lista) AND privado & 5=0 ORDER BY id DESC LIMIT 48)
                    ) AS result ORDER BY views_id LIMIT 48
                "));
                $up="%".$usuario."%";
                $r2=p($conn->prepare("SELECT 
                    temp.*, 
                    (
                        SELECT 
                            CASE 
                                WHEN COUNT(CASE WHEN d2 LIKE (?) THEN 1 ELSE NULL END) != 0 
                                    AND COUNT(CASE WHEN d2 LIKE (?) THEN 1 ELSE NULL END) = COUNT(*) 
                                THEN 1 
                                ELSE 0 
                            END AS visualized
                        FROM views WHERE excluido='false' AND tipo='post_24' AND usuario=temp.usuario
                    ) AS visualized
                    FROM 
                    ( 
                        SELECT u.nome, u.logo, t.usuario, t.acessos, t.id, tp.max_id
                        FROM post_24 t
                        JOIN (
                            SELECT usuario, MIN(id) AS min_id, MAX(id) AS max_id
                            FROM post_24
                            WHERE usuario IN ($lista) AND privado=0
                            GROUP BY usuario
                            ORDER BY max_id DESC
                            LIMIT 20
                        ) AS tp ON t.id = tp.min_id
                        JOIN user u ON t.usuario=u.usuario
                        ORDER BY t.id DESC
                    ) AS temp",[$up,$up]));
                response()->json(["result"=>"true","posts"=>$r,"st"=>$r2,"usuario"=>$usuario]);
            } else {
                response()->json(["result"=>"true","canal"=>[],"posts"=>[],"st"=>[],"usuario"=>$usuario]);
            }
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/inscricoes/main.html'));
        }
    } else {
       response()->json(["header_location"=>"/admin"]);
    };
    //return 'true';
    //return view('pagina_inicial.index',compact('usuario','r','logo','canal'));
});
Route::get("/m_inscricoes",function(){
    $usuario=$GLOBALS["user"] || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/m_inscricoes",function(){
    
    $usuario=$GLOBALS["user"];
    if ($usuario){
        if (request("type")=="info"){
            $conn = $GLOBALS["conn"];
            $logo=$conn->prepare("SELECT inscritos FROM user WHERE usuario=?",[$usuario]);
            $cisg=p($logo)[0]["inscritos"];
            $cisg=json_decode($cisg,true);
            $cis=[];
            $cisgk=array_keys($cisg);
            foreach ($cisgk as $nome){
                $r=$conn->prepare("SELECT logo,nome,usuario FROM user WHERE usuario=?",[$nome]);
                $t=p($r)[0];
                array_push($cis,$t);
            };
            response()->json(["cis"=>$cis]);
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/m_inscricoes/main.html'));
        }
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
});
Route::get("/stories/{id}",function($id){
    $usuario=$GLOBALS["user"] || header("location: /admin");
    resp("/stories/[id].html");
    // include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/stories/{id}",function($id){
    function count_stories($conn,$id,$usuario){
        $s=$conn->prepare("SELECT acessos,views_id FROM post_24 WHERE privado=0 AND id=?",[$id]);
        $result=p($s)[0];
        $acessos=$result["acessos"]+1;
        $views_id=$result["views_id"];
        $s=$conn->prepare("UPDATE post_24 SET acessos=? WHERE id=? AND privado=0",[$acessos,$id]);
        $d=get_updated_date();
        $json=[];
        $json[$d]=$usuario;
        $acessos_d=json_decode(p($conn->prepare("SELECT d2 FROM views WHERE id=? AND tipo='post_24'",[$views_id]))[0]['d2'],true);
        $acessos_d=update_acessos_d($usuario,$acessos_d);
        $conn->prepare("UPDATE views SET d2=? WHERE id=? AND tipo='post_24'",[$acessos_d,$views_id]);
    }
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $id=intval($id);
        if (request("type")=="info"){
            $conn = $GLOBALS["conn"];
            count_stories($conn,$id,$usuario);
            $posts=p($conn->prepare("SELECT * FROM post_24 t JOIN ( SELECT usuario FROM post_24 WHERE id=? AND privado=0 ) u ON t.usuario=u.usuario",[$id]));
            response()->json(["result"=>"true","id"=>$id,"posts"=>$posts,"usuario"=>$usuario]);
        } else if (request("type")=="option"){
            $conn=$GLOBALS["conn"];
            count_stories($conn,$id,$usuario);
            response()->json(["result"=>"true","usuario"=>$usuario]);
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/stories/main.html'));
        } 
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
});
Route::get("/ajeitar2",function(){
    $conn=$GLOBALS["conn"];
    $result=$conn->query("SELECT id,acessos,usuario FROM post_24");
    $result=p($result);
    $conn->query("DELETE FROM views WHERE tipo='post_24'");
    foreach ($result as $post){
        $id=$post["id"];
        $usuario=$post["usuario"];
        $acessos=$post["acessos"];
        // $acessos_d=$post["views_id"];
        $acessos_d=[];
        for ($i=0;$i<$acessos;$i++){
        //$acessos_d=json_decode(p($conn->prepare("SELECT acessos_d FROM post_24 WHERE id=?",[$id]))[0]["acessos_d"],true);
        // $d = new DateTime();
        // $d = $d->format('Y-m-d H:i:s');
        $d= new DateTime('2023-12-03 00:00:00');
        $d=$d->format('Y-m-d H:i:s');
        $json=[];
        $json[$d]=null;
        $acessos_d[]=$json;
        };
        $acessos_d=json_encode($acessos_d);
        // $s=$conn->prepare("UPDATE views SET acessos_d=? WHERE id=?",[$acessos_d,$id]);
        $views_id=1;
        $rss=$conn->query("SELECT id FROM views ORDER BY id DESC LIMIT 1");
        if ($rss->num_rows>0){
            $views_id=p($rss)[0]["id"]+1;
        }
        echo $views_id;
        $tipo="post_24";
        $excluido="false";
        $s=$conn->prepare("INSERT INTO views(usuario,tipo,acessos_d,id,id_post,excluido) VALUES(?,?,?,?,?,?)",[$usuario,$tipo,$acessos_d,$views_id,$id,$excluido]);
        $conn->prepare("UPDATE post_24 SET views_id=? WHERE id=?",[$views_id,$id]);
        //$conn->prepare("UPDATE views SET usuario=? WHERE id=?",[$usuario,$id]);
    };
    echo "deu certo";
});
// Route::post("/texto/{id}",function($id){
//     $usuario=$GLOBALS["user"];
//     $id=intval($id);
//     $conn = $GLOBALS["conn"];
//     $result=null;
//     if ($usuario){
//         $result=$conn->prepare("SELECT 
//         (SELECT CASE 
//                 WHEN JSON_CONTAINS(JSON_KEYS(inscritos),?, '$') AND JSON_EXTRACT(inscritos,?) IS NOT NULL THEN 'true' 
//                 ELSE 'false' 
//             END 
//         AS inscritos FROM inscritos WHERE usuario=p.usuario) AS inscrito,
//         CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
//         p2.logo,p2.nome,
//         id,acessos,p.usuario,texto,d,views_id,'t' AS tipo FROM post_texto p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",['"' . $usuario . '"', "$." . $usuario,$id]);
//     } else {
//         $result=$conn->prepare("SELECT 'false' AS inscrito,
//         CASE WHEN p2.views='true' THEN acessos ELSE -1 END AS visualizacoes,
//         p2.logo,p2.nome,
//         id,acessos,p.usuario,texto,d,views_id,'t' AS tipo FROM post_texto p INNER JOIN (SELECT views,logo,nome,usuario FROM user) AS p2 ON p.usuario=p2.usuario WHERE id=? AND privado=0",[$id]); 
//     }
//     $r=[];
//     if ($result->num_rows>0){
//         if (is_js()){
//             $r=p($result)[0];
//             $r["acessos"]++;
//             $acessos=$r["acessos"];
//             $views_id=$r["views_id"];
//             $acessos_d=json_decode(p($conn->prepare("SELECT d2 FROM views WHERE id=? AND tipo='post_texto'",[$views_id]))[0]["d2"],true);
//             $acessos_d=update_acessos_d($usuario,$acessos_d);
//             $conn->prepare("UPDATE post_texto SET acessos=? WHERE id=? AND privado=0",[$acessos,$id]);
//             $conn->prepare("UPDATE views SET d2=? WHERE id=? AND tipo='post_texto'",[$acessos_d,$views_id]);
//             unset($r["views"]);
//             unset($r["acessos"]);
//             unset($r["views_id"]);
//             $algoritmo=getAlgoritmoNoticia(false,$conn,$usuario,$views_id,0,24);
//             response()->json(["result"=>"true","usuario"=>$usuario,"post"=>$r,"posts"=>$algoritmo,"alta"=>get_posts($conn)]);
//         } else {
//             include(__DIR__ . "/texto.php");
//             client();
//         }
//     } else {
//         if (is_js()){
//             r404();
//         } else {
//             r404g();
//         }
//     }

// });

// Route::post("/music_view",function(){
//     $id=request("id");
//     $n_arquivo=request("n_arquivo");
//     $conn=$GLOBALS["conn"];
//     $acessos=p($conn->prepare("SELECT acessos FROM musica WHERE id=?",[$id]));
//     $acessos_obj==json_decode($acessos);
//     if (count($acessos_obj)<=$n_arquivo) return;
//     $acessos_obj[$n_arquivos]=$acessos_obj[$n_arquivos]+1;
//     $acessos_str=json_encode($acessos_obj);
//     $conn->prepare("UPDATE post_musica SET acessos=? WHERE id=?",[$acessos_str,$id]);
//     return (["result"=>"true"]);
// });
Route::post("/comentarios",function(){
    $usuario=$GLOBALS["user"];
    if (request("type")=="option"){
        $dados=request()->all();
        $tipo=$dados["tipo"];
        $post_id=$dados["post_id"];
        $conn=$GLOBALS["conn"];
        $operation=request("operation");
        if ($operation=="comentar"){
            if (!$usuario){
                response()->json(["header_location"=>"/admin"]);
            } else {
                $texto=$dados["texto"];
                $id=p($conn->prepare("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM comment WHERE tipo=? AND post_id=? ORDER BY id DESC LIMIT 1",[$tipo,$post_id]))[0]["id"];
                $d=get_d(); 
                $conn->prepare("INSERT INTO comment(user_id,usuario,tipo,texto,d,post_id,id) SELECT id AS user_id, usuario, ? AS tipo, ? AS texto, ? AS d, ? AS post_id, ? AS id FROM user WHERE usuario=?",[$tipo,$texto,$d,$post_id,$id,$usuario]);
                response()->json(["result"=>"true","usuario"=>$usuario,"id"=>$id]);
            }
        } else if ($operation=="excluir"){
            $id=request("id");
            $conn->prepare("DELETE FROM comment WHERE usuario=? AND tipo=? AND post_id=? AND id=?",[$usuario,$tipo,$post_id,$id]);
            response()->json(["result"=>"true","usuario"=>$usuario]);
        }
    }
});
Route::post("/view",function(){
    $conn=$GLOBALS["conn"];
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $dados=request()->all();
        $tipo=$dados["tipo"];
        $d=new DateTime('now',new DateTimeZone('America/Sao_Paulo'));
        $users=p($conn->query("SELECT usuario,peer_tokens FROM user WHERE online!=0"));
        foreach ($users as $user){
            $newTokens=[];
            $modify=false;
            $peer_tokens=json_decode($user["peer_tokens"],true);
            foreach ($peer_tokens as $token){
                $token=json_decode($token,true);
                if (isset($dados["modify"]) && $user["usuario"]==$usuario && in_array($token["peer_id"],$dados["modify"])){
                    $token["d"]=$d->format('Y-m-d H:i:s');
                    array_push($newTokens,json_encode($token));
                    $modify=true;
                } else {
                    $dv=$token["d"];
                    $dv=DateTime::createFromFormat('Y-m-d H:i:s', $dv, new DateTimeZone('America/Sao_Paulo'))->modify('+10 seconds');
                    if ($dv>=$d){
                        array_push($newTokens,json_encode($token));
                    } else {
                        $modify=true;
                    }
                }
            }
            if ($modify){
                $conn->prepare("UPDATE user SET online=?, peer_tokens=? WHERE usuario=?",[count($newTokens) > 0 ? 2 : 0,json_encode($newTokens),$user["usuario"]]);
            }
        }
        $d=$d->format('Y-m-d H:i:s');
        $token=null;
        if (!has_cookie("token_view")){
            $token=uniqid();
            set_cookie("token_view",$token);
        } else {
            $token=get_cookie("token_view");
        }
        if (isset($dados["delete"])){
            if (is_array($dados["delete"])){
                $r=p($conn->prepare("SELECT online, peer_tokens FROM user WHERE usuario=?",[$usuario]))[0];
                $peer_tokens=json_decode($r["peer_tokens"],true);
                $peer_delete_map=[];
                foreach ($dados["delete"] as $peer_delete){
                    $peer_delete_map[$peer_delete]=true;
                }
                $peer_tokens=array_filter($peer_tokens,function($peer_token) use ($peer_delete_map){
                    return isset($peer_delete_map[$peer_token["peer_id"]]);
                });
                $online=count($peer_tokens)>0 ? intval($r["online"]) : 0;
                $peer_tokens=json_encode($peer_tokens);
                $conn->prepare("UPDATE user SET online=?,peer_tokens=? WHERE usuario=?",[$online,$peer_tokens]);
            } else {
                $peer_id=$dados["delete"];
                // $conn->prepare("DELETE FROM views_atual WHERE id=?",[$v["id"]]);
                $new_peer_id="%\"peer_id\":\"$peer_id\"%";
                // echo p($conn->prepare("SELECT JSON_REMOVE(
                //     peer_tokens,
                //     REPLACE(JSON_SEARCH(peer_tokens, 'one', ? , NULL, '$'),'\"','')
                // ) AS p, JSON_SEARCH(peer_tokens, 'one', ? , NULL, '$') AS d FROM user u WHERE usuario=?",[$new_peer_id,$new_peer_id,$usuario]))[0]["p"];
                $conn->prepare("UPDATE user SET online=(CASE WHEN JSON_LENGTH(
                    JSON_REMOVE(
                        peer_tokens,
                        REPLACE(JSON_SEARCH(peer_tokens, 'one', ? , NULL, '$[*]'),'\"','')
                    )
                    )=0 THEN 0 ELSE online END),
                    peer_tokens=IFNULL(
                        JSON_REMOVE(
                            peer_tokens,
                            REPLACE(JSON_SEARCH(peer_tokens, 'one', ? , NULL, '$[*]'),'\"','')
                        ),
                    '[]')
                WHERE usuario=?",[$new_peer_id,$new_peer_id,$usuario]);
            }
        }
        if (isset($dados["new"])){
            $peer_id=$dados["new"];
            $new_peer_id="%\"peer_id\":\"$peer_id\"%";
            $peer_token=json_encode(["peer_id"=>$peer_id,"token"=>$token,"d"=>$d,"type"=>$tipo]);
            // $conn->prepare("INSERT INTO views_atual(usuario,tipo,d,id) VALUES(?,?,?,?)",[$usuario,$tipo,$d,$token]);
    
            
            // $conn->prepare("UPDATE user SET online=2, peer_tokens=JSON_ARRAY_APPEND(peer_tokens,'$',?) WHERE usuario=?",[$peer_token,$usuario]);
            $conn->prepare("UPDATE user SET online=2, peer_tokens=(
                    CASE WHEN JSON_SEARCH(peer_tokens, 'one',?, NULL, '$[*]') IS NOT NULL 
                    THEN JSON_ARRAY_APPEND(
                        JSON_REMOVE(
                            peer_tokens,
                            REPLACE(JSON_SEARCH(peer_tokens, 'one', ? , NULL, '$[*]'),'\"','')
                        ),'$',?
                    ) ELSE JSON_ARRAY_APPEND(peer_tokens,'$',?) END
                ) 
            WHERE usuario=?",[$new_peer_id,$new_peer_id,$peer_token,$peer_token,$usuario]);
        };
        response()->json(["result"=>"true"]);
    } else {
        response()->json(["result"=>"false"]);
    }
    delete_file_temps($conn);
});
Route::post("/denuncia",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        if (isset($_POST["post_tipo"]) && isset($_POST["post_id"]) && isset($_POST["tipo"])){
            ["post_tipo"=>$post_tipo,"post_id"=>$post_id,"tipo"=>$tipo]=$_POST;
            $conn=$GLOBALS["conn"];
            $result=$conn->prepare("SELECT d,tipo,num FROM denuncia WHERE post_tipo=? AND post_id=?",[$post_tipo,$post_id]);
            if ($result->num_rows>0){
                $result=p($result)[0];
                $tp=json_decode($result["tipo"]);
                array_push($tp,$tipo);
                $tp=json_encode($tp);
                $d=json_decode($result["d"]);
                $dd=get_updated_date();
                array_push($d,$dd);
                $d=json_encode($d);
                $num=intval($result["num"])+1;
                $conn->prepare("UPDATE denuncia SET d=?,num=?,tipo=? WHERE post_tipo=? AND post_id=?",[$d,$num,$tp,$post_tipo,$post_id]);
                response()->json(["result"=>"true"]);
            } else {
                $dd=get_updated_date();
                $tp=[];
                array_push($tp,$tipo);
                $tp=json_encode($tp);
                $d=[];
                array_push($d,$dd);
                $d=json_encode($d);
                $id=p($conn->query("SELECT COALESCE(MAX(id) + 1,1) AS count FROM denuncia"))[0]["count"];
                $id=intval($id);
                $options=["noticia"=>"post","imagem"=>"post_imagem","musica"=>"post_musica","video"=>"post_video","product"=>"post_product"];
                $opt=$options[$post_tipo];
                $result=$conn->prepare("SELECT titulo FROM $opt WHERE id=?",[$post_id]);
                if ($result->num_rows>0){
                    $titulo=p($result)[0]["titulo"];
                    $num=1;
                    $conn->prepare("INSERT INTO denuncia(usuario,id,titulo,num,post_tipo,post_id,tipo,d) VALUES(?,?,?,?,?,?,?,?)",[$usuario,$id,$titulo,$num,$post_tipo,$post_id,$tp,$d]);
                    response()->json(["result"=>"true"]);
                } else {
                    response()->json(["result"=>"false"]);
                }
            }
        } else {
            response()->json(["result"=>"false"]);
        }
    } else {
        login();
    }
});
Route::post("/chat/{chat_id}",function($chat_id){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $type=isset($_POST["type"]) ? $_POST["type"] : null;
        if (!$type){
            return response()->json(["result"=>"false"]);
        }
        $result=null;
        $usuario2=null;
        $chat_id=intval($chat_id);
        $conn=$GLOBALS["conn"];
        $is_new_chat=$chat_id==0 && isset($_GET["user"]);
        if ($is_new_chat){
            $usuario2=base64_decode(urldecode($_GET["user"]));
            $result=$conn->prepare('SELECT id FROM chat WHERE JSON_CONTAINS(usuarios,CONCAT(\'"\',?,\'"\')) AND JSON_CONTAINS(usuarios,CONCAT(\'"\',?,\'"\')) UNION (SELECT COALESCE(MAX(id)+1,1) AS id FROM chat)',[$usuario,$usuario2]);
            if ($result->num_rows>1){
                return r404();
            }
            if ($type!="info"){
                $id=intval(p($result)[0]["id"]);
                $chat_id=gerarNumero($conn);
                $usuarios=json_encode([$usuario,$usuario2]);
                $jv=json_encode([]);
                $conn->prepare("INSERT INTO chat(usuarios,chat_id,id,privado) VALUES(?,?,?,?)",[$usuarios,$chat_id,$id,$jv]);
            }
        }
        if ($type=="info" && $is_new_chat){
            $usuario2=base64_decode(urldecode($_GET["user"]));
            $result=$conn->prepare("SELECT logo, nome AS name FROM user WHERE usuario=?",[$usuario2]);
        } else {
            $result=$conn->prepare("SELECT c.usuarios, u.logo, u.nome AS name FROM chat c JOIN user u ON JSON_CONTAINS(c.usuarios, CONCAT('\"', u.usuario, '\"'), '$') WHERE c.chat_id = ? AND u.usuario = JSON_UNQUOTE(
                JSON_EXTRACT(
                    c.usuarios,
                    CASE
                        WHEN JSON_CONTAINS(c.usuarios, JSON_QUOTE(?), '$') THEN
                            CASE
                                WHEN JSON_UNQUOTE(JSON_EXTRACT(c.usuarios, '$[0]')) = ? THEN '$[1]'
                                ELSE '$[0]'
                            END
                    END
                )
            )",[$chat_id,$usuario,$usuario]);
        }
        if ($result->num_rows>0){
            if ($type=="info"){
                $result=p($result)[0];
                if ($is_new_chat){

                } else {
                    $usuarios=json_decode($result["usuarios"]);
                    $usuario2=$usuarios[0]==$usuario ? $usuarios[1] : $usuarios[0];
                }
                $infos=["usuario"=>$usuario2,"logo"=>$result["logo"],"name"=>$result["name"]];
                $a=p($conn->prepare("SELECT usuario,online,peer_tokens FROM user WHERE usuario=? OR usuario=?",[$usuario,$usuario2]));
                $peer_tokens=json_encode([
                    json_decode($a[$a[0]["usuario"]==$usuario ? 0 : 1]["peer_tokens"]),
                    json_decode($a[$a[0]["usuario"]==$usuario ? 1 : 0]["peer_tokens"])
                ]);
                $messages=p($conn->prepare("SELECT * FROM (SELECT * FROM mensagem WHERE chat_id=? AND NOT JSON_CONTAINS(privado,?,'$') ORDER BY id DESC LIMIT 20) as t ORDER BY id",[$chat_id,'"' . $usuario . '"']));
                response()->json(["result"=>"true","a"=>json_encode($a),"messages"=>$messages,"infos"=>$infos,"online"=>$a[0]["online"],"peer_tokens"=>$peer_tokens]);
            } else if ($type=="pt"){
                $result=p($result)[0];
                $pt=intval(request("pt"));
                $a=$pt*20;
                $b=$a+20;
                $messages=p($conn->prepare("SELECT * FROM (SELECT * FROM mensagem WHERE chat_id=? AND NOT JSON_CONTAINS(privado,?,'$') ORDER BY id DESC LIMIT $a,$b) as t ORDER BY id",[$chat_id,'"' . $usuario . '"']));
                response()->json(["result"=>"true","messages"=>$messages]);

            } else if ($type=="message"){
                $texto=request("texto");
                $d=get_updated_date();
                $id=intval(p($conn->prepare("SELECT COALESCE(MAX(id)+1,1) AS id FROM mensagem WHERE chat_id=?",[$chat_id]))[0]["id"]);
                $jv=json_encode([]);
                if (!$is_new_chat){
                    $result=p($result)[0];
                    $usuarios=json_decode($result["usuarios"]);
                    $usuario2=$usuarios[0]==$usuario ? $usuarios[1] : $usuarios[0];
                }
                $tokens=json_decode(p($conn->prepare("SELECT tokens FROM user WHERE usuario=?",[$usuario2]))[0]["tokens"]);
                // $tks=[];
                // foreach ($tokens as $n=>$token){
                //     array_push($tks,$token);
                // }
                // sendMessage($tokens,[
                //     "message"=>[
                //         "notification"=> [
                //             "title"=> $usuario,
                //             "body"=> $texto,
                //         ],
                //         "data"=>[
                //             "type"=>"message",
                //             "id"=>strval($id),
                //             "user"=>$usuario,
                //             "message"=>$texto,
                //             "chat_id"=>strval($chat_id),
                //         ],
                //         "priority"=>"high",
                //         "android"=> [
                //           "notification"=> [
                //             "channel_id"=>"anjoovi_channel",
                //             "icon"=> "ic_notification"
                //             ]
                //         ]
                //     ]
                // ]);
                if (count($tokens)>0){
                    sendMessage([
                        "app_id"=>'41069f9a-b510-41e1-8b13-41d921056938',
                        "include_aliases"=>[
                            "external_id"=>$tokens
                        ],
                        "android_priority"=>"high",
                        "android_small_icon"=>"ic_notification",
                        "priority"=>10,
                        "existing_android_channel_id"=>"anjoovi_channel",
                        // "include_subscription_ids"=>[
                        //     "8aea8bf4-1e34-4efa-af13-0419b7e94cec"
                        // ],
                        "target_channel"=>"push",
                        // "include_player_ids"=> $tokens,
                        "headings"=>["en"=>$usuario2],
                        "contents"=>["en"=>$texto],
                    ]);
                }
                $message=json_encode(["usuario"=>$usuario2,"id"=>$id,"chat_id"=>$chat_id,"texto"=>$texto,"d"=>$d]);
                foreach ($tokens as $token){
                    $conn->prepare("INSERT INTO notifications(id,user,token,type,content) VALUES((SELECT COALESCE(MAX(id)+1,1) FROM (SELECT id, user FROM notifications) AS temp WHERE user=?),?,?,?,?)",[$usuario2,$usuario2,$token,"message",$message]);
                };
                $conn->prepare("INSERT INTO mensagem(usuario,id,chat_id,texto,d,privado) VALUES(?,?,?,?,?,?)",[$usuario,$id,$chat_id,$texto,$d,$jv]);
                response()->json(["result"=>"true","id"=>$id,"chat_id"=>$chat_id]);
            } else if ($type=="delete_message"){
                $id=request("id");
                $conn->prepare("DELETE FROM mensagem WHERE id=? AND usuario=?",[$id,$usuario]);
                $result=p($result)[0];
                $usuarios=json_decode($result["usuarios"]);
                $usuario2=$usuarios[0]==$usuario ? $usuarios[1] : $usuarios[0];
                $tokens=json_decode(p($conn->prepare("SELECT tokens FROM user WHERE usuario=?",[$usuario2]))[0]["tokens"]);
                // $tks=[];
                // foreach ($tokens as $n=>$token){
                //     array_push($tks,$token);
                // }
                if (count($tokens)>0){
                    sendMessage([
                        "message"=>[
                            // "notification"=> [
                            //     "title"=> $usuario,
                            //     "body"=> $texto,
                            // ],
                            "data"=>[
                                "id"=>strval($id),
                                "type"=>"delete_message",
                                "chat_id"=>strval($chat_id),
                            ],
                            "android"=> [
                            "notification"=> [
                                "channel_id"=>"anjoovi_channel_data",
                                // "icon"=> "ic_notification"
                                ]
                            ]
                        ]
                    ]);
                }
                response()->json(["result"=>"true"]);
            }
        } else {
            r404();
        }
    } else {
        login();
    }
});
Route::post("/notifications",function(){
    $usuario=$GLOBALS["user"];
    $token=$_POST["token"];
    $conn=$GLOBALS["conn"];
    $conn->prepare("INSERT INTO notifications(id,user,token,type,content) VALUES(1,'sla','1','1',?)",[json_encode($_POST)]);
    if ($token){
        $result=$conn->prepare("SELECT * FROM notifications WHERE token=?",[$token]);
        if ($result->num_rows>0){
            response()->json(["result"=>"true","notifications"=>json_encode(p($result))]);
        } else {
            response()->json(["result"=>"false"]);
        }
    } else {
        response()->json(["result"=>"false"]);
    }
});
Route::post("/teste_notification",function(){
    $usuario="musica";
    $chat_id=531939461;
    $conn=$GLOBALS["conn"];
    $result=$conn->prepare("SELECT c.usuarios, u.logo, u.nome AS name FROM chat c JOIN user u ON JSON_CONTAINS(c.usuarios, CONCAT('\"', u.usuario, '\"'), '$') WHERE c.chat_id = ? AND u.usuario = JSON_UNQUOTE(
        JSON_EXTRACT(
            c.usuarios,
            CASE
                WHEN JSON_CONTAINS(c.usuarios, JSON_QUOTE(?), '$') THEN
                    CASE
                        WHEN JSON_UNQUOTE(JSON_EXTRACT(c.usuarios, '$[0]')) = ? THEN '$[1]'
                        ELSE '$[0]'
                    END
            END
        )
    )",[$chat_id,$usuario,$usuario]);
    $d=get_updated_date();
    $result=p($result)[0];
    $usuarios=json_decode($result["usuarios"]);
    $usuario2=$usuarios[0]==$usuario ? $usuarios[1] : $usuarios[0];
    $tokens=json_decode(p($conn->prepare("SELECT tokens FROM user WHERE usuario=?",[$usuario2]))[0]["tokens"]);
    // $tks=[];
    // foreach ($tokens as $n=>$token){
    //     array_push($tks,$token);
    // }
    sendMessage($tokens,[
        "message"=>[
            // "notification"=> [
            //     "title"=> $usuario,
            //     "body"=> $texto,
            // ],
            "data"=>[
                "type"=>"message",
                "id"=>$d,
                "user"=>$usuario,
                "message"=>$d . " teste",
                "chat_id"=>strval($chat_id),
            ],
            "android"=> [
                "notification"=> [
                "channel_id"=>"anjoovi_channel_data",
                // "icon"=> "ic_notification"
                ]
            ]
        ]
    ]);
    response()->json(["result"=>"true","id"=>$d]);
});
Route::post("/chat_init",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $canal=request("canal");
        if ($canal && $canal!=$usuario){
            $conn=$GLOBALS["conn"];
            $result=$conn->prepare("SELECT usuario FROM user WHERE usuario=?",[$canal]);
            if ($result->num_rows>0){
                $result=$conn->prepare('SELECT privado,chat_id FROM chat WHERE JSON_CONTAINS(usuarios,CONCAT(\'"\',?,\'"\')) AND JSON_CONTAINS(usuarios,CONCAT(\'"\',?,\'"\'))',[$usuario,$canal]);
                if ($result->num_rows>0){
                    $result=p($result)[0];
                    ["chat_id"=>$chat_id,"privado"=>$privado]=$result;
                    $privado=json_decode($privado);
                    $privado=json_encode(array_filter($privado, function($value) use ($usuario) {
                        return $value !== $usuario;
                    }));
                    $conn->prepare("UPDATE chat SET privado=? WHERE chat_id=?",[$privado,intval($chat_id)]);
                    response()->json(["result"=>"true","chat_id"=>$chat_id]);
                } else {
                    response()->json(["result"=>"true","chat_id"=>0]);
                }
            } else {
                response()->json(["result"=>"false"]);
            }
        } else {
            response()->json(["result"=>"false"]);
        }
    } else {
        login();
    }
});
Route::post("/chats",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $type=request("type");
        if ($type=="info"){
            $conn=$GLOBALS["conn"];
            $result=p($conn->prepare("SELECT chat_id, (SELECT JSON_OBJECT('usuario',usuario,'online',online,'peer_tokens',peer_tokens,'logo',logo) AS usuario FROM user WHERE usuario!=? AND JSON_CONTAINS(c.usuarios, CONCAT('\"',REPLACE(usuario, '\"', '\\\"'),'\"'), '$') LIMIT 1) AS usuario,(SELECT texto FROM mensagem WHERE chat_id=c.chat_id AND NOT JSON_CONTAINS(privado,?) ORDER BY id DESC LIMIT 1) AS texto,(SELECT d FROM mensagem WHERE chat_id=c.chat_id AND NOT JSON_CONTAINS(privado,?) ORDER BY id DESC LIMIT 1) AS d FROM chat c WHERE NOT JSON_CONTAINS(privado,?) AND JSON_CONTAINS(usuarios, ?, '$')",[$usuario,'"' . $usuario . '"','"' . $usuario . '"','"' . $usuario . '"','"' . $usuario . '"']));
            response()->json(["result"=>"true","chats"=>$result]);
        } else if ($type=="excluir"){
            $id=intval(request("id"));
            $conn=$GLOBALS["conn"];
            $conn->prepare("UPDATE chat SET privado=JSON_ARRAY_APPEND(privado,'$',?) WHERE chat_id=?",[$usuario,$id]);
            $conn->prepare("UPDATE mensagem SET privado=JSON_ARRAY_APPEND(privado,'$',?) WHERE chat_id=?",[$usuario,$id]);
            $result=p($conn->prepare("SELECT chat_id, (SELECT JSON_OBJECT('usuario',usuario,'online',online,'peer_tokens',peer_tokens,'logo',logo) AS usuario FROM user WHERE usuario!=? AND JSON_CONTAINS(c.usuarios, CONCAT('\"',REPLACE(usuario, '\"', '\\\"'),'\"'), '$') LIMIT 1) AS usuario,(SELECT texto FROM mensagem WHERE chat_id=c.chat_id AND NOT JSON_CONTAINS(privado,?) ORDER BY id DESC LIMIT 1) AS texto,(SELECT d FROM mensagem WHERE chat_id=c.chat_id AND NOT JSON_CONTAINS(privado,?) ORDER BY id DESC LIMIT 1) AS d FROM chat c WHERE NOT JSON_CONTAINS(privado,?) AND JSON_CONTAINS(usuarios, ?, '$')",[$usuario,'"' . $usuario . '"','"' . $usuario . '"','"' . $usuario . '"','"' . $usuario . '"']));
            response()->json(["result"=>"true","chats"=>$result]);
        }
    } else {
        login();
    }
});
Route::post("/pay",function(){
    if (isset($_GET["isApi"])){
        $conn=$GLOBALS["conn"];
        $json = file_get_contents('php://input');
        // Decodifica o JSON
        $conn->prepare("INSERT INTO payments(val) VALUES(?)",[$json]);
    } else {
        $conn=$GLOBALS["conn"];
        $client = new Req();

        // echo $response->getStatusCode(); // 200
        // echo $response->getHeaderLine('content-type'); // 'application/json; charset=utf8'
        // echo $response->getBody(); // Corpo da resposta

        // Requisição POST
        $response = $client->request('POST', 'https://api.asaas.com/v3/customers', [
            'form_params' => [
                "name"=>$_POST["name"],
                "cpfCnpj"=>$_POST["cpf"],
                "email"=>$_POST["email"],
                "mobilePhone"=>$_POST["tel"],
                "notificationDisabled"=>true,
            ],
            'headers' => [
                'content-type'=> 'application/json',
                'access_token' => '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA0NTA3ODg6OiRhYWNoXzU3ZjJkNGIyLTNhZDEtNGEzYS04MTFiLTBhMmFiOTJhYTU1OA==',
                'accept' => 'application/json',
            ]
        ]);
        if ($response->getStatusCode() == 200) {
            $client_id=$response->getBody()["id"];
            // Inicializa a sessão cURL
            $response = $client->request('POST', 'https://api.asaas.com/v3/payments', [
                'form_params' => [
                    "customer"=>$client_id,
                    "billingType"=>"CREDIT_CARD",
                    "value"=>6,
                    'dueDate' => date('Y-m-d'),
                ],
                'headers' => [
                    'content-type'=> 'application/json',
                    'access_token' => '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA0NTA3ODg6OiRhYWNoXzU3ZjJkNGIyLTNhZDEtNGEzYS04MTFiLTBhMmFiOTJhYTU1OA==',
                    'accept' => 'application/json',
                ]
            ]);
            if ($response->getStatusCode()==200){
                $id=$response->getBody()["id"];
                $infos=[
                    "creditCard"=>[
                        "holderName"=>$_POST["cardName"],
                        "number"=>$_POST["cardNumber"],
                        "expiryMonth"=>explode("/",$_POST["validity"])[0],
                        "expiryYear"=>"20" . explode("/",$_POST["validity"])[1],
                        "ccv"=>$_POST["securityCode"],
                    ],
                    "creditCardHolderInfo"=>[
                        "name"=>$_POST["name"],
                        "email"=>$_POST["email"],
                        "cpfCnpj"=>$_POST["cpf"],
                        "postalCode"=>$_POST["cep"],
                        "addressNumber"=>"2289",
                        "phone"=>$_POST["tel"],
                        "mobilePhone"=>$_POST["tel"],
                    ]
                ];

                $response = $client->request('POST', "https://api.asaas.com/v3/payments/$id/payWithCreditCard", [
                    'form_params' => $infos,
                    'headers' => [
                        'content-type'=> 'application/json',
                        'access_token' => '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA0NTA3ODg6OiRhYWNoXzU3ZjJkNGIyLTNhZDEtNGEzYS04MTFiLTBhMmFiOTJhYTU1OA==',
                        'accept' => 'application/json',
                    ]
                ]);
                echo json_encode(["a"=>$response->getBody(),"b"=>$infos,"c"=>$id]);

                                // echo json_encode(["creditCard"=>[
                //     "holderName"=>$_POST["cardName"],
                //     "number"=>$_POST["cardNumber"],
                //     "expiryMonth"=>explode("/",$_POST["validity"])[0],
                //     "expiryYear"=>explode("/",$_POST["validity"])[1],
                //     "ccv"=>$_POST["securityCode"],
                // ],
                // "creditCardHolderInfo"=>[
                //     "name"=>$_POST["name"],
                //     "email"=>$_POST["email"],
                //     "cpfCnpj"=>$_POST["cpf"],
                //     "postalCode"=>$_POST["cep"],
                //     "addressNumber"=>2289,
                //     "phone"=>$_POST["tel"],
                // ]]);
                $response = $client->request("DELETE", "https://api.asaas.com/v3/customers/$client_id", [
                    'headers' => [
                        'content-type'=> 'application/json',
                        'access_token' => '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA0NTA3ODg6OiRhYWNoXzU3ZjJkNGIyLTNhZDEtNGEzYS04MTFiLTBhMmFiOTJhYTU1OA==',
                        'accept' => 'application/json',
                    ]
                ]);
                // echo json_encode($response->getBody());
            }
        } else {
            $code=$response->getBody()["errors"][0]["code"];
            if ($code=="invalid_cpfCnpj"){
                response()->json(["result"=>"false","invalid_cpf"=>true]);
            } else {
                // response()->json([""])
            }
        }
    }
});
// Route::get("/pay",function(){

// });
Route::post("/ups",function(){
    $tk="auHBnk*29)918@3#$837*j.=-h";
    if (!request("tk") || request("tk")!=$tk) return;
    $dados=request()->all();
    $type=$dados["type"];
    $name=$dados["name"];
    $name=str_replace("\\","/",$name);
    $path=root($dados["tipo"]);
    if ($type=="file"){
        $diretorioDaPasta = pathinfo($path . $name, PATHINFO_DIRNAME);
        // Verifica se a pasta já existe
        if (!is_dir($diretorioDaPasta)) {
            // Cria a pasta com permissões 0777 (pode ser ajustado conforme necessário)
            mkdir($diretorioDaPasta, 0777, true);
        }
        file_put_contents($path . $name,$dados["content"]);
        response()->json(["result"=>"true","n"=>$diretorioDaPasta]);
    } else if ($type=="clear_folder"){
        $diretorioDaPasta = $path . $name;
        function limparPasta($caminho) {
            // Verifica se o caminho é um diretório
            if (is_dir($caminho)) {
                // Abre o diretório
                $diretorio = opendir($caminho);
        
                // Loop para ler todos os arquivos e subdiretórios
                while (($arquivo = readdir($diretorio)) !== false) {
                    // Ignora as entradas '.' e '..'
                    if ($arquivo != '.' && $arquivo != '..') {
                        // Cria o caminho completo do arquivo ou subdiretório
                        $caminhoCompleto = $caminho . '/' . $arquivo;
        
                        // Se for um diretório, chama a função recursivamente
                        if (is_dir($caminhoCompleto)) {
                            limparPasta($caminhoCompleto);
                        } else {
                            // Se for um arquivo, exclui o arquivo
                            unlink($caminhoCompleto);
                        }
                    }
                }
        
                // Fecha o diretório
                closedir($diretorio);
        
                // Remove o diretório vazio
                rmdir($caminho);
            }
        }
        limparPasta($diretorioDaPasta);
        response()->json(["result"=>"true"]);
    } else if ($type=="zip"){
        if ($_FILES['file']['error'] == 0) {
            // Obtém informações sobre o arquivo
            $nomeArquivo = $name . ".zip";
            $dirToExtract = $path . $name;
            if (is_file($dirToExtract)){
                unlink($dirToExtract);
            }
            $tempPath = $_FILES['file']['tmp_name'];
        
            $dirToZip=$path . $nomeArquivo;
            // Caminho para o diretório de destino
            $dir=pathinfo($dirToZip, PATHINFO_DIRNAME);
            // Move o arquivo temporário para o destino
            if (move_uploaded_file($tempPath,$dirToZip)) {
                $zip = new ZipArchive;
                // Abre o arquivo ZIP
                if ($zip->open($dirToZip) === TRUE) {
                    // Diretório de destino para a descompactação
        
                    // Cria o diretório de destino, se não existir
                    if (!is_dir($dirToExtract)) {
                        mkdir($dirToExtract, 0777, true);
                    }
        
                    // Extrai o conteúdo para o diretório de destino
                    $zip->extractTo($dirToExtract);
        
                    // Fecha o arquivo ZIP
                    $zip->close();
        
                    response()->json(["result"=>"true"]);
                } else {
                    echo 'Falha ao abrir o arquivo ZIP.';
                }
            } else {
                echo 'Falha ao mover o arquivo para o destino.';
            }
        } else {
            echo 'Erro no envio do arquivo.';
        }
    }
});
// Route::post("/ajeitar",function(){
//     $conn=$GLOBALS["conn"];
//     $result_total=p($conn->query("SELECT tipo,usuario,id,id_post,acessos_d,excluido FROM views WHERE acessos_d!='[]' AND tipo!='post_musica'"));
//     foreach ($result_total as $result){
//         $q22=json_decode($result["acessos_d"],true);
//         foreach ($q22 as $q2){
//             $q3=array_keys($q2)[0];
//             $usuarios_query=$q2[$q3];
//             $q=get_date($q3,$result["tipo"]);
//             $post_id=$result["id_post"];
//             $query=$conn->prepare("SELECT acessos,acessos_u,posts_id FROM acessos WHERE data=?",[$q]);
//             if ($query->num_rows>0){
//                 $qq=p($query)[0];
//                 $acessos=$qq["acessos"]+1;
//                 $usuarios=json_decode($qq["acessos_u"]);
//                 $posts_id=json_decode($qq["posts_id"]);
//                 $usuarios[]=$usuarios_query;
//                 $posts_id[]=$post_id;
//                 $usuarios=json_encode($usuarios);
//                 $posts_id=json_encode($posts_id);
//                 $conn->prepare("UPDATE acessos SET acessos=?,acessos_u=?,posts_id=? WHERE data=?",[$acessos,$usuarios,$posts_id,$q]);
//             } else {
//                 $id=p($conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM acessos"))[0]["id"];
//                 $excluido=$result["excluido"];
//                 // $id=$result["id"];
//                 $usuario=$result["usuario"];
//                 $usuarios=json_encode([$usuarios_query]);
//                 $posts_id=json_encode([$post_id]);
//                 $conn->prepare("INSERT INTO acessos(id,posts_id,data,acessos_u,acessos,excluido) VALUES (?,?,?,?,?,?)",[$id,$posts_id,$q,$usuarios,1,$excluido]);
//             }
//         }
//     }
//        // $query=p($conn->query("SELECT titulo,arquivo,id,zip FROM post_musica"));
//     // foreach($query as $linha){
//     //     if(strpos($linha["zip"], "/") !== false) {
//     //         $slice=explode("/",$linha["zip"]);
//     //         $p=$slice[count($slice)-1];
//     //         $conn->prepare("UPDATE post_musica SET zip=?",[$p]);
//     //     }
//     // }
// });
// Route::post("/ajeitar",function(){
//     $conn=$GLOBALS["conn"];
//     $p=p($conn->query("SELECT id FROM views WHERE tipo='post_24' AND excluido='false' AND id NOT IN (SELECT views_id AS id FROM post_24)"));
//     foreach ($p as $p2){
//         $conn->prepare("UPDATE views SET excluido='true' WHERE id=?",[$p2["id"]]);
//     }
// });
// Route::post("/ajeitar",function(){
//     $conn=$GLOBALS["conn"];
//     $musics=p($conn->query("SELECT arquivo,zip,id FROM post_musica"));
//     $musics2=[];
//     $zips=[];
//     foreach ($musics as $music){
//         $arquivos=json_decode($music["arquivo"]);
//         $new_arquivos=[];
//         $zips[$music["zip"]]="";
//         foreach ($arquivos as $arquivo){
//             if (!str_contains($arquivo,"_m_m_")){
//                 $id=explode("_",$arquivo)[0];
//                 $name=$id . "_m_m_" . implode("_",array_slice(explode("_",$arquivo),1));
//                 rename(__DIR__ . "/../public_html/musics/" . $arquivo, __DIR__ . "/../public_html/musics/" . $name);
//                 $new_arquivos[]=$name;
//                 $musics2[$name]="";
//             } else {
//                 $new_arquivos[]=$arquivo;
//                 $musics2[$arquivo]="";
//             }
//         }
//         $new_arquivos=json_encode($new_arquivos);
//         $conn->prepare("UPDATE post_musica SET arquivo=? WHERE id=?",[$new_arquivos,$music["id"]]);
//         // echo $music["arquivo"];
//         // echo $new_arquivos;
//     }
//     $videos=p($conn->query("SELECT video,id FROM post_video"));
//     foreach ($videos as $video){
//         $filename=$video["video"];
//         $name=null;
//         if (!str_contains($filename,"_v_v_")){
//             $part_id=explode("_",$filename)[1];
//             if (preg_match('/^\d+/', $part_id, $matches)) {
//                 $id = $matches[0]; // Captura os dígitos iniciais
//                 $name=$id . "_v_v_" . preg_replace('/^\d+/', '',  implode("_",array_slice(explode("_",$filename),1)));
//                 rename(__DIR__ . "/../public_html/videos/" . $filename, __DIR__ . "/../public_html/videos/" . $name);
//             }
//         } else {
//             $name=$filename;
//         }
//         $conn->prepare("UPDATE post_video SET video=? WHERE id=?",[$name,$video["id"]]);
//         // echo $filename;
//         // echo $name;
//     }
//     $imagens=[];
//     $rs=p($conn->query("SELECT *  FROM (
//         (SELECT imagem FROM post)
//         UNION
//         (SELECT imagem FROM post_imagem)
//         UNION
//         (SELECT imagem FROM post_musica)
//         UNION
//         (SELECT imagem FROM post_video WHERE imagem!=NULL)
//         UNION
//         (SELECT logo AS imagem FROM user WHERE logo IS NOT NULL)
//         UNION
//         (SELECT banner AS imagem FROM user WHERE banner IS NOT NULL)
//         UNION
//         (SELECT filename AS imagem FROM post_24 WHERE type='jpeg')
//     ) AS result"));
//     $t=microtime(true);
//     foreach ($rs as $r){
//         $imagens[$r["imagem"]]="";
//     }
//     $d0=0;
//     $d01=0;
//     $diretorio=__DIR__ . "/../public_html/zips/";
//     if (is_dir($diretorio)) {
//         $arquivos = scandir($diretorio);
//         foreach ($arquivos as $arquivo) {
//             // Ignorar "." e ".."
//             if ($arquivo !== "." && $arquivo !== "..") {
//                 if (!isset($zips[$arquivo])){
//                     $d0++;
//                     // echo $arquivo;
//                     // if ($d<100){
//                     unlink(__DIR__ . "/../public_html/zips/".$arquivo);
//                     // }
//                     // echo $arquivo;
//                 } else {
//                     $d01++;
//                 }

//             }
//         }
//     }
//     $diretorio=__DIR__ . "/../public_html/musics/";
//     $d1=0;
//     $d2=0;
//     if (is_dir($diretorio)) {
//         $arquivos = scandir($diretorio);
//         foreach ($arquivos as $arquivo) {
//             // Ignorar "." e ".."
//             if ($arquivo !== "." && $arquivo !== "..") {
//                 if (!isset($musics2[$arquivo])){
//                     $d1++;
//                     // echo $arquivo;
//                     // if ($d<100){
//                         unlink(__DIR__ . "/../public_html/musics/".$arquivo);
//                     // }
//                     // echo $arquivo;
//                 }
//                 if (isset($musics2[$arquivo])){
//                     $d2++;
//                 }
//             }
//         }
//     }
//     echo count($musics2) . "_";
//     // echo $d01 . "_";
//     echo $d0 . "_";
//     // echo $d2 . "_";
//     echo $d1 . "_";
//     $d=0;
//     $diretorio=__DIR__ . "/../public_html/images/";
//     if (is_dir($diretorio)) {
//         $arquivos = scandir($diretorio);
//         foreach ($arquivos as $arquivo) {
//             // Ignorar "." e ".."
//             if ($arquivo !== "." && $arquivo !== "..") {
//                 if (!isset($imagens[$arquivo])){
//                     $d++;
//                     // if ($d<100){
//                         unlink(__DIR__ . "/../public_html/images/".$arquivo);
//                     // }
//                     echo $arquivo;
//                 }
//             }
//         }
//     }
//     $ts=microtime(true);
//     echo $d;
//     echo strval($ts-$t);

//     // $d=json_encode(["o"=>"2024-01-01 00:00:00"]);
//     // $conn->prepare("UPDATE views SET d=?",[$d]);

//     // $rs=p($conn->query("SELECT tipo,id,acessos_d FROM views"));
//     // foreach ($rs as $r){
//     //     $data=[];
//     //     $ds=json_decode($r["acessos_d"],true);
//     //     if (count($ds)>0){
//     //         foreach ($ds as $od){
//     //             if (count($od)>0 && is_array($od)){
//     //                 try {
//     //                     if (isset($od[0])){
//     //                         for ($i=0;$i<count($od[0]);$i++){
//     //                             $date=$od[$i];
//     //                             $d=array_keys($date)[0];
//     //                             $original_date=new DateTime($d);
//     //                             $strd=$original_date->format("H:i:s");
//     //                             $year=strval($original_date->format("Y"));
//     //                             $dr=strval($original_date->format("z"));
//     //                             if (!isset($data[$year])){
//     //                                 $data[$year]=[];
//     //                             }
//     //                             if (!isset($data[$year][$dr])){
//     //                                 $data[$year][$dr]=[];
//     //                             }
//     //                             if (count($data[$year][$dr])==0){
//     //                                 $data[$year][$dr][$i]=[];
//     //                             }
//     //                             $json=[];
//     //                             $json[$strd]=$date[$d];
//     //                             if (!isset($data[$year][$dr])){
//     //                                 $data[$year][$dr]=[[$json]];
//     //                             } else {
//     //                                 $data[$year][$dr][$i][]=$json;
//     //                             }
//     //                         }
//     //                     } else {
//     //                         $d=array_keys($od)[0];
//     //                         $original_date=new DateTime($d);
//     //                         $strd=$original_date->format("H:i:s");
//     //                         $year=strval($original_date->format("Y"));
//     //                         $dr=strval($original_date->format("z"));
//     //                         if (!isset($data[$year])){
//     //                             $data[$year]=[];
//     //                         }
//     //                         if (!isset($data[$year][$dr])){
//     //                             $data[$year][$dr]=[];
//     //                         }
//     //                         $json=[];
//     //                         $json[$strd]=$od[$d];
//     //                         if (!isset($data[$year][$dr])){
//     //                             $data[$year][$dr]=[$json];
//     //                         } else {
//     //                             $data[$year][$dr][]=$json;
//     //                         }
//     //                     }
                        
//     //                 } catch (Exception $e){
//     //                     if ($d===0){
//     //                         echo "<br>" . json_encode($od) . "</br>" . $e->getMessage();
//     //                     }
//     //                 }
//     //             }
//     //         }
//     //         $conn->prepare("UPDATE views SET d2=? WHERE id=?",[json_encode($data),$r["id"]]);
//     //     }
//     // }
//     // $conn->query("UPDATE views SET d2='{}' WHERE acessos_d='[]'");

//     // $conn->query("UPDATE view SET type='post_musica WHERE usuaos")
//     // $conn->query("UPDATE views SET type='post_musica' WHERE excluido='false' AND y");
//     // $r=p($conn->query("SELECT * FROM user"));
//     // foreach ($r as $u){
//     //     $usuario=$u["usuario"];
//     //     $num=0;
//     //     $num+=p($conn->prepare("SELECT COUNT(*) AS num FROM post WHERE usuario=? AND privado=0",[$usuario]))[0]["num"];
//     //     $num+=p($conn->prepare("SELECT COUNT(*) AS num FROM post_imagem WHERE usuario=? AND privado=0",[$usuario]))[0]["num"];
//     //     $num+=p($conn->prepare("SELECT COUNT(*) AS num FROM post_musica WHERE usuario=? AND privado=0",[$usuario]))[0]["num"];
//     //     $num+=p($conn->prepare("SELECT COUNT(*) AS num FROM post_texto WHERE usuario=? AND privado=0",[$usuario]))[0]["num"];
//     //     $num+=p($conn->prepare("SELECT COUNT(*) AS num FROM post_video WHERE usuario=? AND privado=0",[$usuario]))[0]["num"];
//     //     $num+=p($conn->prepare("SELECT COUNT(*) AS num FROM playlist WHERE usuario=? AND privado=0",[$usuario]))[0]["num"];
//     //     $conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$num,$usuario]);
//     // }
//     // echo $mp3_1->str;

//     // $conn=$GLOBALS["conn"];
//     // $conn->query("DELETE FROM post WHERE views_id=NULL");
//     // $conn->query("DELETE FROM post_imagem WHERE views_id=NULL");
//     // $conn->query("DELETE FROM post_24 WHERE views_id=NULL");
//     // $conn->query("DELETE FROM post_musica WHERE views_id=NULL");
//     // $conn->query("DELETE FROM playlist WHERE views_id=NULL");

//     // $p=p($conn->query("SELECT id FROM views WHERE tipo='post_24' AND excluido='false' AND id NOT IN (SELECT views_id AS id FROM post_24)"));
//     // foreach ($p as $p2){
//     //     $conn->prepare("UPDATE views SET excluido='true' WHERE id=?",[$p2["id"]]);
//     // }
// });
// Route::post("/ajeitar",function(){
//     $conn=$GLOBALS["conn"];
//     $r=p($conn->query("SELECT * FROM views LIMIT 1"));
//     $r2=p($conn->query("SELECT id,usuario FROM user"));
//     $users=[];
//     foreach ($r2 as $l){
//         $users[$l["usuario"]]=intval($l["id"]);
//     }
//     $t1=0;
//     $t2=0;
//     foreach ($r as $c){
//        $t1+=strlen($c["d2"]);
//         $p=json_decode($c["d2"],true);
//         $a=[];
//         foreach ($p as $y=>$yv){
//             // $y=bin2hex(pack("S",$y));
//             $a[$y]=[];
//             foreach ($yv as $d=>$dv){
//                 // $d=bin2hex(pack("S",$d));
//                 $a[$y][$d]=[];
//                 foreach ($dv as $array=>$arrayv){
//                     $anterior=0;
//                     foreach ($arrayv as $time=>$timev){
//                         // $codigo=0;
//                         // foreach (str_split($timev) as $char) {
//                         //     $codigo = $codigo * 256 + ord($char);  // Cria um número a partir da string
//                         // }
//                         $t=intval(strtotime($time) / 1000);
//                         $d=$t-$anterior;
//                         // echo $t,$anterior;
//                         $id=$timev!="" ? $users[$timev] : 0;
//                         $a[$y][$d][$array][]=( $id << 22) | $d;
//                         $anterior=$t;
//                     }
//                 }
//             }
//         }
//         $a=gzcompress(json_encode($a));
//         // echo gzuncompress($a);
//         // echo "." . strval(strlen($c["d2"]));
//         // echo "." . strval(strlen($a));
//         // echo strlen($a)>strlen($c["d2"]) ? "true" : "false";
//         // echo $c["d2"];
//         // echo $a;
//         // echo $a;
//     }
//     // echo ($t2 / $t1);
//     // $u=( 5 << 11) | 300;
//     // $e=$u & ((1 << 11) -1);
//     // echo "." . $e;
// });
Route::post("/ajeitar",function(){
    // $conn=$GLOBALS["conn"];
    // $r=p($conn->prepare("WITH history AS (
    //             SELECT 
    //                 h.usuario,
    //                 MAX(CASE WHEN h.rnk = 1 THEN CONCAT('%', h.texto, '%') ELSE NULL END) AS latest_text,
    //                 MAX(CASE WHEN h.rnk = 2 THEN CONCAT('%', h.texto, '%') ELSE NULL END) AS second_latest_text
    //             FROM (
    //                 SELECT 
    //                     usuario,
    //                     texto,
    //                     ROW_NUMBER() OVER (PARTITION BY usuario ORDER BY id DESC) AS rnk
    //                 FROM historico
    //             ) h
    //             WHERE h.rnk <= 2
    //             GROUP BY h.usuario
    //         )
    //         SELECT CASE WHEN h.latest_text IS NOT NULL AND p.descricao LIKE LOWER(h.latest_text) THEN 1 ELSE 0 END AS accuracy, p.descricao, id FROM (SELECT NULL AS titulo, descricao, id FROM post_imagem p WHERE p.privado & 1=0 UNION ALL SELECT titulo, NULL AS descricao, id FROM post p WHERE p.privado & 1=0) p LEFT JOIN history h ON h.usuario=? ORDER BY accuracy DESC LIMIT 2",['usuario']));
    // echo json_encode($r);

    // $r=p($conn->query("SELECT usuario FROM user"));
    // foreach ($r as $rs){
    //     $hash=get_token(["usuario"=>$rs["usuario"]]);
    //     $conn->prepare("UPDATE user SET hash=? WHERE usuario=?",[$hash,$rs["usuario"]]);
    // }
    // $r=p($conn->query("SELECT nome FROM user WHERE nome='amostradinho'"));
    // $t1=0;
    // $t2=0;
    // for ($i=0;$i<10;$i++){
    //     $i=microtime(true);
    //     $r=p($conn->prepare("SELECT u.cargo FROM comment c LEFT JOIN user u ON c.user_id=u.id WHERE c.user_id=?",[$GLOBALS["user_id"]]));
    //     $pi=microtime(true);
    //     $i2=microtime(true);
    //     $r=p($conn->prepare("SELECT u.cargo FROM comment c LEFT JOIN user u ON c.usuario=u.usuario WHERE c.usuario=?",[$GLOBALS["user"]]));
    //     $pi2=microtime(true);
    //     $t1+=($pi - $i) * 1000;
    //     $t2+=($pi2-$i2) * 1000;
    // }
    // echo json_encode(["time"=>$t1, "time2"=>$t2]);
});
Route::post("/functions",function(){
    if (isset($_POST["key"]) && $_POST["key"]=="7894j96~-[njd98n705yfhq´-d3=rfekk9"){
        $type=$_POST["type"];
        if ($type=="log"){
            $number_lines=intval($_POST["number_lines"]);
            $content=file_get_contents(__DIR__ . "/../public_html/error_log");
            $linhas = explode("\n", $content);
            if ($number_lines > count($linhas)){
                echo $content;
            } else {
                echo implode("\n",array_slice($linhas,$number_lines));
            }
        }
    } else {
        r404g();
    }
});
Route::post("/verifyPeerId",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn=$GLOBALS["conn"];
        $name=$_POST["name"];
        $peer_tokens=json_decode(p($conn->prepare("SELECT peer_tokens FROM user WHERE usuario=?",[$name]))[0]["peer_tokens"]);
        $verify=false;
        foreach($peer_tokens as $token){
            $token=json_decode($token,true);
            if ($token["peer_id"]==$_POST["id"]){
                $verify=true;
                break;
            }
        }
        return response()->json(["result"=>"true","verify"=>$verify ? "true" : "false","name"=>$name]);
    }
});
include(__DIR__ . '/admin.php');