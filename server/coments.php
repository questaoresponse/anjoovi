<?php
// function getWavDuration($file){
//     // Abre o arquivo para leitura binária
//     $handle = fopen($filePath, 'rb');

//     // Verifica se o arquivo foi aberto corretamente
//     if (!$handle) {
//         die('Não foi possível abrir o arquivo.');
//     }

//     // Verifica se o arquivo é um arquivo WAV
//     $header = fread($handle, 12);
//     if (substr($header, 0, 4) !== 'RIFF' || substr($header, 8, 4) !== 'WAVE') {
//         die('O arquivo não é um arquivo WAV válido.');
//     }

//     // Procura o bloco 'fmt '
//     while (ftell($handle) < filesize($filePath)) {
//         $chunkType = fread($handle, 4);
//         $chunkSize = unpack('V', fread($handle, 4))[1];

//         if ($chunkType === 'fmt ') {
//             // Pula para o início dos dados de áudio
//             fseek($handle, $chunkSize - 8, SEEK_CUR);
//             break;
//         } else {
//             fseek($handle, $chunkSize, SEEK_CUR);
//         }
//     }

//     // Encontra o bloco 'data' e obtém o tamanho dos dados
//     while (ftell($handle) < filesize($filePath)) {
//         $chunkType = fread($handle, 4);
//         $chunkSize = unpack('V', fread($handle, 4))[1];

//         if ($chunkType === 'data') {
//             // Lê os 4 bytes que representam a duração
//             $durationBytes = fread($handle, 4);
//             $duration = unpack('V', $durationBytes)[1];
//             break;
//         } else {
//             fseek($handle, $chunkSize, SEEK_CUR);
//         }
//     }

//     // Fecha o arquivo
//     fclose($handle);

//     return $duration;
// }
// function getMp3Duration($filePath) {
//     // Abre o arquivo para leitura binária
//     $handle = fopen($filePath, 'rb');

//     // Verifica se o arquivo foi aberto corretamente
//     if (!$handle) {
//         die('Não foi possível abrir o arquivo.');
//     }

//     // Lê os primeiros 4 bytes para verificar se é um arquivo MP3
//     $header = fread($handle, 4);
//     if (substr($header, 0, 3) !== 'ID3') {
//         die('O arquivo não é um arquivo MP3 válido.');
//     }
//     // Fecha o arquivo
//     fclose($handle);
//     $mp3file = new MP3File($filePath);//http://www.npr.org/rss/podcast.php?id=510282
//     $duration1 = $mp3file->getDurationEstimate();//(faster) for CBR only
//     return $duration1;
// }    
// function getDuration($filePath) {
//     echo $filePath;
//     $handle = fopen($filePath, 'rb');

//     if (!$handle) {
//         die('Não foi possível abrir o arquivo.');
//     }

//     // Lê os primeiros 4 bytes para verificar se é um arquivo WAV
//     $header = fread($handle, 3);
//     fclose($handle);


//     if (!$header === "\xFF\xFB" && !$header === "\xFF\xF3") {
//         return getWavDuration($filePath);
//     } else {
//         return getMp3Duration($filePath);
//     }
// }
// Route::post("/ajeitar",function(){
//     $conn=new sqli("anjoov00_posts");
//     $rs=$conn->query("SELECT * FROM post");
//     $rs2=$conn->query("SELECT usuario,capa,id FROM post_musica");
//     $rs3=$conn->query("SELECT usuario,imagem,id FROM post_24");
//     $conn=new sqli("anjoov00_users_conteudo");
//     $rs4=$conn->query("SELECT logo,banner,usuario FROM user");
//     // $conn=new sqli("anjoov00_posts");
//     function create($img){
//         $absolute=__DIR__ . '/../public_html/images/';
//         $path;
//         $c1=pathinfo($absolute . $img)["filename"] . ".jpeg";
//         $c2=pathinfo($absolute . $img)["filename"] . ".jpg";
//         $c3=pathinfo($absolute . $img)["filename"] . ".webp";
//         if (is_file($absolute . $c1)){
//             $path=$c1;
//         }
//         if (is_file($absolute . $c2)){
//             $path=$c2;
//         }
//         if (is_file($absolute . $c3)){
//             $path=$c3;
//             return false;
//         }
//         // echo $img . "&" . $path;
//         // echo $path;
//         // $file=imagecreatefromwebp($absolute . $path);
//         // imagewebp($file, $absolute . $path, 80); // O terceiro parâmetro é a qualidade (de 0 a 100)
//         // imagedestroy($file);
//         $caminhoImagemOriginal=$absolute . $path;

//         list($largura, $altura, $tipo) = getimagesize($caminhoImagemOriginal);

//         switch ($tipo) {
//             case IMAGETYPE_JPEG:
//                 $imagemOriginal = imagecreatefromjpeg($caminhoImagemOriginal);
//                 break;
//             case IMAGETYPE_PNG:
//                 $imagemOriginal = imagecreatefrompng($caminhoImagemOriginal);
//                 break;
//             case IMAGETYPE_GIF:
//                 $imagemOriginal = imagecreatefromgif($caminhoImagemOriginal);
//                 break;
//             case IMAGETYPE_WEBP:
//                 $imagemOriginal = imagecreatefromwebp($caminhoImagemOriginal);
//                 break;
//             default:
//                 // Se o tipo não for suportado, você pode lidar com isso ou emitir uma mensagem de erro
//                 // die('Tipo de imagem não suportado.' . $path);
//                 // echo $path;
//         }

//         // Criar uma nova imagem em branco (formato WebP)
//         $novaImagem = imagecreatetruecolor($largura, $altura);

//         // Copiar a imagem original para a nova imagem
//         imagecopy($novaImagem, $imagemOriginal, 0, 0, 0, 0, $largura, $altura);

//         // Caminho para salvar a nova imagem WebP
//         $caminhoImagemWebP = $absolute . pathinfo($absolute . $path)["filename"] . ".webp";

//         // Salvar a imagem como WebP
//         imagewebp($novaImagem, $caminhoImagemWebP, 80); // 80 é a qualidade (de 0 a 100)

//         // Liberar a memória
//         imagedestroy($imagemOriginal);
//         imagedestroy($novaImagem);
//         if ($path!=$c3){
//             unlink($absolute . $path);
//         }
//     }
//     // $p=p($rs);
//     $absolute=__DIR__ . '/../public_html/images/';
//     // $e=[];
//     // foreach ($p as $a){
//     //     // if (strpos($a["imagem"],".jpg")!=false){
//     //     array_push($e,substr($a["imagem"], -4));
//     //     // }
//     //     $img=pathinfo($absolute . $a["imagem"])["filename"] . ".webp";
//     //     create($img);
//     //     $conn->prepare("UPDATE post SET imagem=? WHERE id=?",[$img,$a["id"]]);

//     // }
//     // // print_r($e);
//     // $p2=p($rs2);
//     // foreach ($p2 as $a){
//     //     $img=pathinfo($absolute . $a["capa"])["filename"] . ".webp";
//     //     create($img);
//     //     $conn->prepare("UPDATE post_musica SET capa=? WHERE id=?",[$img,$a["id"]]);
//     // }
//     // $p3=p($rs3);
//     // foreach ($p3 as $a){
//     //     $img=pathinfo($absolute . $a["imagem"])["filename"] . ".webp";
//     //     create($img);
//     //     $conn->prepare("UPDATE post_24 SET imagem=? WHERE id=?",[$img,$a["id"]]);
//     // }
//     $p4=p($rs4);
//     foreach ($p4 as $a){
//         $logo=isset($a["logo"]) ? pathinfo($absolute . $a["logo"])["filename"] . ".webp" : null;
//         $banner && create($logo);
//         $banner=isset($a["banner"]) ? pathinfo($absolute . $a["banner"])["filename"] . ".webp" : null;
//         $banner && create($banner);
//         $conn->prepare("UPDATE user SET logo=?,banner=? WHERE usuario=?",[$logo,$banner,$a["usuario"]]);
//     }
// }); 
// Route::post("/ajeitar",function(){
//     $dir=__DIR__ . "/../public_html/images";
//     $arquivos=scandir($dir);
//     $n=0;
//     foreach ($arquivos as $arquivo){
//         if ($arquivo != "." && $arquivo != "..") {
//             $conn=new sqli("anjoov00_posts");
//             $p=$conn->prepare("SELECT imagem FROM post WHERE imagem=?",[$arquivo]);
//             if ($p->num_rows>0){
//                 continue;
//             };
//             $p=$conn->prepare("SELECT imagem FROM post_24 WHERE imagem=?",[$arquivo]);
//             if ($p->num_rows>0){
//                 continue;
//             }
//             $p=$conn->prepare("SELECT capa FROM post_musica WHERE capa=?",[$arquivo]);
//             if ($p->num_rows>0){
//                 continue;
//             }
//             $conn=new sqli("anjoov00_users_conteudo");
//             $p=$conn->prepare("SELECT logo,banner FROM user WHERE logo=? OR banner=?",[$arquivo,$arquivo]);
//             if ($p->num_rows>0){
//                 continue;
//             }
//             $n++;
//             $path=$dir . '/' . $arquivo;
//             unlink($path);
//         }
//     }
//     echo $n;
// });
// Route::post("/ajeitar",function(){
//     $conn=new sqli("anjoov00_users_conteudo");
//     $canals=p($conn->query("SELECT usuario FROM user"));
//     foreach ($canals as $c){
//         $conn=new sqli("anjoov00_posts");
//         $usuario=$c["usuario"];
//         $n2=0;
//         $qs=$conn->prepare("SELECT COUNT(*) AS num FROM post WHERE usuario=? AND privado='false' AND lixeira='false'",[$usuario]);
//         if ($qs->num_rows>0){
//             $n2=$n2+p($qs)[0]["num"];
//         }
//         $qs=$conn->prepare("SELECT COUNT(*) AS num FROM post_musica WHERE usuario=?",[$usuario]);
//         if ($qs->num_rows>0){
//             $n2=$n2+p($qs)[0]["num"];
//         }
//         $conn=new sqli("anjoov00_users_conteudo");
//         $conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$n2,$usuario]);
//     }
// });
// $result=json_decode($linha["arquivo"]);

        // $zip = new ZipArchive();

        // // Especifique o nome e o caminho do arquivo ZIP que você deseja criar
        // $nm='zip_' . $linha["id"] . '_' . preg_replace('/[\/\\:\*\?"<>\|]/', '', $linha["titulo"]) . ".zip";
        // $nomeArquivoZip = __DIR__ . '/../public_html/zips/'.$nm;
        
        // // Abra o arquivo ZIP para escrita
        // if ($zip->open($nomeArquivoZip, ZipArchive::CREATE) === TRUE) {
        //     // Adicione arquivos ao arquivo ZIP
        //     // foreach($result as $arquivo){
        //     //     echo $arquivo;
        //         $zip->addFile(__DIR__ . '/../public_html/musics/'.$result[0], $result[0]);
        //         // unlink(__DIR__ . '/../public_html/musics/'.$arquivo);
        //         // $zip->addFile(__DIR__ . '/main2.php', 'arquivo2.txt');
        //     // }
        //     $zip->close();
        //     $conn->prepare("UPDATE post_musica SET zip=? WHERE id=?",[$nm,$linha["id"]]);
        //     echo 'Arquivo ZIP criado com sucesso.';
        // } else {
        //     echo 'Falha ao criar o arquivo ZIP.';
        // }
    
        // $result=$conn->query("SELECT titulo,id,views_id
    // FROM post   
    // WHERE lixeira='false'
    // ORDER BY id
    //  DESC LIMIT 48

    // UNION ALL

    // SELECT titulo,id,views_id
    // FROM post_musica
    // ORDER BY id
    //  DESC LIMIT 48 ");
    // $result1=$conn->query("SELECT * FROM post WHERE lixeira='false' ORDER BY id DESC LIMIT 48");
    // $result2=$conn->query("SELECT * FROM post_musica ORDER BY id DESC LIMIT 48");
    // $res1=p($result1);
    // $res2=p($result2);
    // function cp($a, $b) {
    //     return  $b['views_id'] - $a['views_id'];
    // }
    // $r=array_merge($res1,$res2);
    // usort($r,'cp');
    // $r=count($r)>48 ? array_slice($r,0,48) : $r;
    // $r=p($conn->query("SELECT * 
    //     FROM post t 
    //     JOIN (SELECT * FROM post_musica ORDER BY id DESC LIMIT 48) u 
    //     ON '1'='1' 
    //     ORDER BY t.views_id DESC, u.views_id DESC 
    //     LIMIT 48;
    // "));
    // $rss=$conn->query("SELECT COUNT(*) AS num FROM post WHERE lixeira='false'");
    // $n=p($rss)[0]["num"];
    //print_r($r);
    // $r=array_slice($r,$n>=48 ? $n-48 : 0,$n);