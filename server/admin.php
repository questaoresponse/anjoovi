<?php
putenv('PATH=' . getenv('PATH') . ':/home/anjoov00/ffmpeg');
if (!function_exists("cargo")){
    function cargo($usuario){
        $conn=$GLOBALS["conn"];
        $s=$conn->prepare("SELECT cargo FROM user WHERE usuario=?",[$usuario]);
        return p($s)[0]["cargo"];
    }
    function delete_post($conn,$id,$usuario=null){
        $imagem=null;
        $views_id=null;
        $user=null;
        $permission=null;
        if ($usuario){
            $q=$conn->prepare("SELECT imagem,views_id,privado FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $imagem=$q["imagem"];
            $views_id=$q["views_id"];
            $user=$usuario;
            $permission=($q["privado"] & 2)==2;
            $conn->prepare("DELETE FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post' AND excluido='false' AND id=? AND usuario=?",[$views_id,$usuario]);
        } else {
            $q=$conn->prepare("SELECT usuario,imagem,views_id,privado FROM post WHERE id=?",[$id]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $imagem=$q["imagem"];
            $views_id=$q["views_id"];
            $user=$q["usuario"];
            $permission=($q["privado"] & 2)==2;
            $conn->prepare("DELETE FROM post WHERE id=?",[$id]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post' AND  excluido='false' AND id=?",[$views_id]);
        }
        $conn->prepare("DELETE FROM comment WHERE tipo='noticia' AND post_id=?",[$id]);
        $conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts - 1,0) WHERE usuario=?",[$user]);

        unlink(__DIR__ . '/../public_html/images/'.$imagem);
        if ($permission){
            unlink(__DIR__ . '/../public_html/images/'. substr($imagem,2));
        }
        // update_sitemap();
    }
    function delete_24($conn,$id,$usuario=null){
        $type=null;
        $filename=null;
        $views_id=null;
        if ($usuario){
            $q=$conn->prepare("SELECT type,filename,views_id FROM post_24 WHERE id=? AND usuario=?",[$id,$usuario]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $type=$q["type"];
            $filename=$q["filename"];
            $views_id=$q["views_id"];
            $conn->prepare("DELETE FROM post_24 WHERE id=? AND usuario=?",[$id,$usuario]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_24' AND excluido='false' AND id=? AND usuario=?",[$views_id,$usuario]);
        } else {
            $q=p($conn->prepare("SELECT type,filename,views_id FROM post_24 WHERE id=?",[$id]))[0];
            $type=$q["type"];
            $filename=$q["filename"];
            $views_id=$q["views_id"];
            $conn->prepare("DELETE FROM post_24 WHERE id=?",[$id]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_24' AND  excluido='false' AND id=?",[$views_id]);
        }
        $type=="mp4" ? unlink(__DIR__ . '/../public_html/videos/'.$filename) : unlink(__DIR__ . '/../public_html/images/'.$filename);
    }
    function delete_imagem($conn,$id,$usuario=null){
        $imagens=null;
        $views_id=null;
        $user=null;
        $privado=null;
        if ($usuario){
            $q=$conn->prepare("SELECT imagem,views_id,privado FROM post_imagem WHERE id=? AND usuario=?",[$id,$usuario]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $imagens=$q["imagem"];
            $views_id=$q["views_id"];
            $privado=$q["privado"];
            $user=$usuario;
            $conn->prepare("DELETE FROM post_imagem WHERE id=? AND usuario=?",[$id,$usuario]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_imagem' AND excluido='false' AND id=? AND usuario=?",[$views_id,$usuario]);
        } else {
            $q=$conn->prepare("SELECT usuario,imagem,views_id,privado FROM post_imagem WHERE id=?",[$id]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $user=$q["usuario"];
            $imagens=$q["imagem"];
            $views_id=$q["views_id"];
            $privado=$q["privado"];
            $conn->prepare("DELETE FROM post_imagem WHERE id=?",[$id]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_imagem' AND excluido='false' AND id=?",[$views_id]);
        }
        $conn->prepare("DELETE FROM comment WHERE tipo='imagem' AND post_id=?",[$id]);
        $conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts - 1,0) WHERE usuario=?",[$user]);
        $imagens=json_decode($imagens,true);
        foreach ($imagens as $image){
            unlink(__DIR__ . '/../public_html/images/' . $image);
            
        }
        if (($privado & 2)==2){
            preg_match('/^(.*)(_\d+_i)/', $imagens[0], $matches);
            $r=intval(base_convert($matches[1],36,10));
            if (($r & 1)==1) {
                unlink(__DIR__ . '/../public_html/images/' . base_convert($r & ~1,10,36) . $matches[2] . "_premium.webp");
            }
        }
        // update_sitemap();
    }
    function delete_musica($conn,$id,$usuario=null){
        $imagem=null;
        $zip=null;
        $arquivos=[];
        $user=null;
        $views_id=null;
        if ($usuario){
            $q=$conn->prepare("SELECT imagem,views_id,zip,arquivo FROM post_musica WHERE id=? AND usuario=?",[$id,$usuario]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $imagem=$q["imagem"];
            $zip=$q["zip"];
            $views_id=$q["views_id"];
            $arquivos=json_decode($q["arquivo"]);
            $user=$usuario;
            $conn->prepare("DELETE FROM post_musica WHERE id=? AND usuario=?",[$id,$usuario]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_musica' AND excluido='false' AND id=? AND usuario=?",[$views_id,$usuario]);
        } else {
            $q=$conn->prepare("SELECT usuario,imagem,views_id,usuario,zip,arquivo FROM post_musica WHERE id=?",[$id]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $user=$q["usuario"];
            $imagem=$q["imagem"];
            $zip=$q["zip"];
            $views_id=$q["views_id"];
            $arquivos=json_decode($q["arquivo"]);
            $user=$q["usuario"];
            $conn->prepare("DELETE FROM post_musica WHERE id=?",[$id]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_musica' AND exlcuido='false' AND id=?",[$views_id]);
        }
        $conn->prepare("DELETE FROM comment WHERE tipo='musica' AND post_id=?",[$id]);
        $conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts - 1,0) WHERE usuario=?",[$user]);
        unlink(__DIR__ . "/../public_html/images/" . $imagem);
        unlink(__DIR__ . "/../public_html/zips/" . $zip);
        foreach($arquivos as $arquivo){
            unlink(__DIR__ . "/../public_html/musics/" . $arquivo);
        }
        // update_sitemap();
    }
    function delete_texto($conn,$id,$usuario=null){
        $views_id=null;
        $user=null;
        if ($usuario){
            $q=$conn->prepare("SELECT views_id FROM post_texto WHERE id=? AND usuario=?",[$id,$usuario]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $views_id=$q["views_id"];
            $user=$usuario;
            $conn->prepare("DELETE FROM post_texto WHERE id=? AND usuario=?",[$id,$usuario]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_texto' AND excluido='false' AND id=? AND usuario=?",[$views_id,$usuario]);
        } else {
            $q=$conn->prepare("SELECT usuario,views_id FROM post_texto WHERE id=?",[$id]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $user=$q["usuario"];
            $views_id=$q["views_id"];
            $conn->prepare("DELETE FROM post_texto WHERE id=?",[$id]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_texto' AND excluido='false' AND id=?",[$views_id]);
        }
        $conn->prepare("DELETE FROM comment WHERE tipo='texto' AND post_id=?",[$id]);
        $conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts - 1,0) WHERE usuario=?",[$user]);
        // update_sitemap();
    }
    function delete_video($conn,$id,$usuario=null){
        $video=null;
        $views_id=null;
        $user=null;
        if ($usuario){
            $q=$conn->prepare("SELECT video,views_id FROM post_video WHERE id=? AND usuario=?",[$id,$usuario]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $video=$q["video"];
            $views_id=$q["views_id"];
            $user=$usuario;
            $conn->prepare("DELETE FROM post_video WHERE id=? AND usuario=?",[$id,$usuario]);
            $conn->prepare("UPDATE destaques SET post_video=-1,geral=CASE WHEN geral_tipo='post_video' THEN -1 ELSE geral END WHERE post_video=?",[$views_id]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_video' AND excluido='false' AND id=? AND usuario=?",[$views_id,$usuario]);
        } else {
            $q=$conn->prepare("SELECT usuario,video,views_id FROM post_video WHERE id=?",[$id]);
            if ($q->num_rows==0) return;
            $q=p($q)[0];
            $user=$q["usuario"];
            $video=$q["video"];
            $views_id=$q["views_id"];
            $conn->prepare("DELETE FROM post_video WHERE id=?",[$id]);
            $conn->prepare("UPDATE destaques SET post_video=-1,geral=CASE WHEN geral_tipo='post_video' THEN -1 ELSE geral END WHERE post_video=?",[$views_id]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE tipo='post_video' AND excluido='false' AND id=?",[$views_id]);
        }
        $conn->prepare("DELETE FROM comment WHERE tipo='video' AND post_id=?",[$id]);
        $conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts - 1,0) WHERE usuario=?",[$user]);

        unlink(__DIR__ . '/../public_html/videos/'.$video);
        // update_sitemap();
    }
    function delete_playlist($conn,$id,$usuario=null){
        $user=null;
        if ($usuario){
            $q=$conn->prepare("SELECT usuario FROM playlist WHERE id=? AND usuario=?",[$id,$usuario]);
            if ($q->num_rows==0) return;
            $user=$usuario;
            $conn->prepare("DELETE FROM playlist WHERE id=? AND usuario=?",[$id,$usuario]);
        } else {
            $q=$conn->prepare("SELECT usuario FROM playlist WHERE id=?",[$id]);
            if ($q->num_rows==0) return;
            $user=p($q)[0]["usuario"];
            $conn->prepare("DELETE FROM playlist WHERE id=?",[$id]);
        }
        $conn->prepare("DELETE FROM comment WHERE tipo='playlist' AND post_id=?",[$id]);
        $conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts - 1,0) WHERE usuario=?",[$user]);
    }
    function delete_account($isAdmin,$usuario){
        $conn=$GLOBALS["conn"];
        $rr=p($conn->prepare("SELECT inscritos,logo,banner FROM user WHERE usuario=?",[$usuario]))[0];
        if (isset($rr["logo"])){
            unlink(__DIR__ . "/../public_html/images/".$rr["logo"]);
        }
        if (isset($rr["banner"])){
            unlink(__DIR__ . "/../public_html/images/".$rr["banner"]);
        }
        $inscritos=json_decode($rr["inscritos"],true);
        foreach ($inscritos as $subs => $valor){
            $result=p($conn->prepare("SELECT inscritos,n_inscritos FROM inscritos WHERE usuario=?",[$subs]))[0];
            $n_inscritos=$result["n_inscritos"]-1;
            $novos_inscritos=json_decode($result["inscritos"],true);
            unset($novos_inscritos[$usuario]);
            $novos_inscritos=json_encode($novos_inscritos);
            $conn->prepare("UPDATE inscritos SET inscritos=?,n_inscritos=? WHERE usuario=?",[$novos_inscritos,$n_inscritos,$subs]);
        }
        $ins=p($conn->prepare("SELECT inscritos FROM inscritos WHERE usuario=?",[$usuario]))[0]["inscritos"];
        $ins=json_decode($ins,true);
        foreach ($inscritos as $subs => $valor){
            $result=p($conn->prepare("SELECT inscritos FROM user WHERE usuario=?",[$subs]))[0];
            $novos_inscritos=json_decode($result["inscritos"],true);
            unset($novos_inscritos[$usuario]);
            $novos_inscritos=json_encode($novos_inscritos);
            $conn->prepare("UPDATE user SET inscritos=? WHERE usuario=?",[$novos_inscritos,$subs]);
        }
        $result=p($conn->prepare("SELECT type,filename FROM post_24 WHERE usuario=?",[$usuario]));
        foreach ($result as $arquivo){
            $arquivo["type"]=="mp4" ? unlink(__DIR__. "/../public_html/videos/". $arquivo["filename"]) : unlink(__DIR__. "/../public_html/images/". $arquivo["filename"]);
        }
        $result=p($conn->prepare("SELECT imagem FROM post WHERE usuario=?",[$usuario]));
        foreach($result as $arquivo){
            unlink(__DIR__. "/../public_html/images/". $arquivo["imagem"]);
        }
        $result=p($conn->prepare("SELECT imagem FROM post_imagem WHERE usuario=?",[$usuario]));
        foreach ($result as $arquivo){
            $image=$arquivo["imagem"];
            unlink(__DIR__ . '/../public_html/images/' . $image);
            preg_match('/.*(?=_)/', $image, $matches);
            $r=intval(base_convert($matches[0],36,10));
            if (($r & 1)==1) {
                unlink(__DIR__ . '/../public_html/images/' . preg_replace('/.*(?=_)/', base_convert($r & ~1,10,36), $image,1));
            }
        }
        $result=p($conn->prepare("SELECT imagem,zip,arquivo FROM post_musica WHERE usuario=?",[$usuario]));
        foreach ($result as $arquivo){
            unlink(__DIR__. "/../public_html/images/". $arquivo["imagem"]);
            unlink(__DIR__. "/../public_html/zips/". $arquivo["zip"]);
            $arquivos=json_decode($result["arquivo"]);
            foreach($arquivos as $arquivo){
                unlink(__DIR__ . "/../public_html/musics/" . $arquivo);
            }
        }
        $result=p($conn->prepare("SELECT video,imagem FROM post_video WHERE usuario=?",[$usuario]));
        foreach($result as $arquivo){
            unlink(__DIR__. "/../public_html/videos/". $arquivo["video"]);
            $arquivo["imagem"] && unlink(__DIR__. "/../public_html/images/". $arquivo["imagem"]);
        }
        $conn->prepare("DELETE FROM user WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM post_24 WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM post WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM post_imagem WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM post_musica WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM post_texto WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM post_video WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM playlist WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM comment WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM views WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM inscritos WHERE usuario=?",[$usuario]);
        $conn->prepare("DELETE FROM historico WHERE usuario=?",[$usuario]);
        $result=p($conn->prepare('SELECT chat_id FROM chat WHERE JSON_CONTAINS(usuarios,CONCAT(\'"\',?,\'"\'))',[$usuario]));
        foreach ($result as $line){
            $chat_id=intval($line["chat_id"]);
            $conn->prepare("DELETE FROM mensagem WHERE chat_id=?",[$chat_id]);
            $conn->prepare("DELETE FROM chat WHERE chat_id=?",[$chat_id]);
        }
        $cargo=$GLOBALS["cargo"];
        if ($cargo>1){
            $conn->prepare("UPDATE payments SET valid=0 WHERE usuario=?",[$usuario]);
        }
        if (!$isAdmin) {
            response()->json(["header_location"=>"/admin/sair"]);
        }
        // update_sitemap();
    }
    function get_views_id($conn){
        $rss=$conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM views");
        return intval(p($rss)[0]["id"]);
    }
    function insert_views($conn,$usuario,$tipo,$views_id,$id){
        $excluido="false";
        $acessos_d=json_encode([]);
        $d2=json_encode([]);
        $d=json_encode(["o"=>get_updated_date()]);
        $conn->prepare("INSERT INTO views(usuario,tipo,acessos_d,d2,d,id,id_post,excluido) VALUES(?,?,?,?,?,?,?,?)",[$usuario,$tipo,$acessos_d,$d2,$d,$views_id,$id,$excluido]);
        // update_sitemap();  
    }
    function add_n_posts($usuario,$conn){
        $s=$conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts + 1,1) WHERE usuario=?",[$usuario]);
    }
    function get_token_id(){
        return uniqid("anjoovi-");
    }
    function update_sitemap(){
        $arquivo=__DIR__ . '/../public_html/sitemap.xml';
        $dominio="https://www.anjoovi.com";
        $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
        $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;
        $sitemap .= '    <url>
        <loc>https://www.anjoovi.com/</loc>
        <lastmod>2025-01-01</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>' . PHP_EOL . "    ";
        $lines=$GLOBALS["conn"]->query("SELECT * FROM (
            (SELECT NULL AS usuario,id,acessos,d,0 AS inscritos,'p' AS tipo FROM post)
            UNION ALL
            (SELECT NULL AS usuario,id,acessos,d,0 AS inscritos,'i' AS tipo FROM post_imagem)
            UNION ALL
            (SELECT NULL AS usuario,id,acessos,d,0 AS inscritos,'m' AS tipo FROM post_musica)
            UNION ALL
            (SELECT NULL AS usuario,id,acessos,d,0 AS inscritos,'t' AS tipo FROM post_texto)
            UNION ALL
            (SELECT NULL AS usuario,id,acessos,d,0 AS inscritos,'v' AS tipo FROM post_video)
            UNION ALL
            (SELECT NULL AS usuario,id,acessos,d,0 AS inscritos,'pd' AS tipo FROM post_product)
            UNION ALL
            (SELECT usuario,0 id,0 AS acessos,d,inscritos+1 AS inscritos,'c' AS tipo FROM user)
        ) AS resultTable ORDER BY inscritos DESC, acessos DESC LIMIT 49999");
        $types=["p"=>"/noticia/","i"=>"/imagem/","m"=>"/musica/","t"=>"/texto/","v"=>"/video/","pd"=>"/product/"];
        foreach ($lines as $line){
            if ($line["d"]){
                $sitemap .= '<url>';
                $t=json_decode($line['d'],true);
                if (isset($t["o"])){
                    $t=strtotime($t["o"]);
                    $time=1672531200 > $t ? 1672531200 : $t;
                    if ($line["tipo"]=="c"){
                        $sitemap .= '<loc>' . $dominio . "/@" . $line["usuario"] . '</loc>';
                        $sitemap .= '<lastmod>' . date('Y-m-d', $time)  . '</lastmod>';
                        $sitemap .= '<changefreq>weekly</changefreq>';
                        $sitemap .= '<priority>0.8</priority>';
                        $sitemap .= '</url>';
                    } else {
                        $sitemap .= '<loc>' . $dominio . $types[$line["tipo"]] . $line["id"] . '</loc>';
                        $sitemap .= '<lastmod>' . date('Y-m-d', $time) . '</lastmod>';
                        $sitemap .= '<changefreq>weekly</changefreq>';
                        $sitemap .= '<priority>0.7</priority>';
                        $sitemap .= '</url>';
                    }
                }
            }
        }
        
        $sitemap .= PHP_EOL . '</urlset>';
        file_put_contents($arquivo, $sitemap);

        $googlePingUrl = 'https://www.google.com/ping?sitemap=' . urlencode('https://www.anjoovi.com/sitemap.xml');
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $googlePingUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
    }
}
Route::post("/admin_header",function(){
    $usuario=$GLOBALS["user"];
    response()->json(["usuario"=>$usuario]);
});
Route::post("/isAdmin",function(){
    $usuario=$GLOBALS["user"];
    response()->json($usuario ? "true" : "false");
});
Route::post("/admin/cargo",function(){
    $usuario=$GLOBALS["user"];
    response()->json($usuario ? ["result"=>"true","cargo"=>$GLOBALS["cargo"]] : ["header_location"=>"/admin"]);
});
Route::get('/admin', function(){
    // get_user : header("location:/admin");
    resp("/admin/index.html");
    // include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post('/admin',function(){
    $type=$_POST["type"];
    if ($type=="info"){
        // $usuario=$GLOBALS["user"];
        // $conn=$GLOBALS["conn"];
        // $r=p($conn->prepare("SELECT tokens FROM user WHERE usuario=?",[$usuario]))[0];
        // sendMessage(json_decode($r["tokens"]),[
        //     "message"=>[
                
        //         "notification"=> [
        //             "title"=> 'passa o celular',
        //             "body"=> 'peciso testar',
        //         ],
        //         "android"=> [
        //           "notification"=> [
        //             "channel_id"=>"anjoovi_channel",
        //             "icon"=> "ic_notification"
        //             ]
        //         ]
        //     ]
        // ]);
        response()->json(["result"=>"true","usuario"=>$GLOBALS["user"]]);
        $dados=request()->all();
    } else if ($type=="login"){
        function cript($usuario){
            $k=crip2($usuario);
            session(["key"=>$k]);
        }
        $dados=request()->all();
        $email=$dados["email"];
        $password=$dados["password"];
        if ($email=="" || $password==""){
            response()->json(["result"=>"false"]);
        } else {
            $conn=$GLOBALS["conn"];
            $result=$conn->prepare("SELECT usuario,hash,logo,cargo FROM user WHERE (usuario=? OR email=?) AND senha=?",[$email,$email,$password]);
            if ($result->num_rows>0){
                $rs=p($result)[0];
                ["cargo"=>$cargo,"usuario"=>$usuario,"logo"=>$logo,"hash"=>$hash]=$rs;
                $token=isset($_POST["getTokenId"]);
                if ($token){
                    $token=get_token_id();
                    $conn->prepare("UPDATE user SET tokens=JSON_ARRAY_APPEND(tokens,'$',?) WHERE usuario=?",[$token,$hash,$usuario]);
                }
                set_cookie("token",$hash);
                $GLOBALS["cargo"]=intval($cargo);
                response()->json(["result"=>"true","token"=>"token","tokenId"=>$token,"usuario"=>$usuario,"lsrc"=>$logo]);
            } else {
                response()->json(["result"=>"false"]);
            }
        }
    } else if ($type=="cadastro"){
        function cript($usuario){
            $k=crip2($usuario);
            session(["key"=>$k]);
        }
        $dados=request()->all();
        if (isset($dados["name"]) && isset($dados["user"]) && isset($dados["email"]) && isset($dados["password"]) && isset($dados["month"]) && isset($dados["day"]) && isset($dados["year"])){
            ["name"=>$name,"user"=>$user,"email"=>$email,"password"=>$password,"month"=>$month,"day"=>$day,"year"=>$year]=$dados;
            if (preg_match("/.+/",$name) && preg_match("/^[a-z0-9._]+$/",$user) && preg_match("/^[^\s@]+@[^\s@]+\.[^\s@]+$/",$email) && preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/",$password)){
                $imonth=intval($month);
                $iday=intval($day);
                $iyear=intval($year);
                $nowYear=date('Y');
                if ($imonth<=12 && $iyear+18<=$nowYear && $iyear>=$nowYear-100 && $iday>0 && $iday<=cal_days_in_month(CAL_GREGORIAN,$imonth,$iyear)){
                    $conn=$GLOBALS["conn"];
                    $result=$conn->prepare("SELECT * FROM user WHERE usuario=? OR email=?",[$user,$email]);
                    if ($result->num_rows>0){
                        response()->json(["result"=>"false"]);
                    } else {
                        $dataString = sprintf('%d-%02d-%02d', $year, $month, $day);
                        $data = DateTime::createFromFormat('Y-m-d', $dataString);
                        $data_str = $data->format('d/m/Y');
                        $n_posts=0;
                        $inscritos=json_encode([]);
                        $cargo=0;
                        $s=$conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM user");
                        $id=p($s)[0]["id"];
                        $id=intval($id);
                        $d=get_updated_date();
                        $tokens=[];
                        $token=isset($_POST["getTokenId"]) ? true : false;
                        if ($token){
                            $token=get_token_id();
                            array_push($tokens,$token);
                        }
                        $tokens=json_encode($tokens);
                        $peer_tokens=json_encode([]);
                        $user_token=get_token(["usuario"=>$user]);
                        $s=$conn->prepare("INSERT INTO user(nome,usuario,email,senha,hash,cargo,data_n,n_posts,inscritos,id,d,tokens,peer_tokens) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",[$name,$user,$email,$password,$user_token,$cargo,$data_str,$n_posts,$inscritos,$id,$d,$tokens,$peer_tokens]);
                        $json=json_encode([]);
                        $conn->prepare("INSERT INTO inscritos(usuario,inscritos) VALUES(?,?)",[$user,$json]);
                        set_cookie("token",$user_token);
                        $GLOBALS["cargo"]=0;
                        // update_sitemap();
                        response()->json(["result"=>"true","token"=>"token","tokenId"=>$token,"usuario"=>$user]);
                    }
                } else {
                    response()->json(["result"=>"false"]);
                }
            } else {
                response()->json(["result"=>"false"]);
            }
        } else {
            response()->json(["result"=>"false"]);
        }
    } else if ($type=="verify"){
        $part=$_POST["part"];
        if ($part=="1"){
            if (isset($_POST["user"])){
                $conn=$GLOBALS["conn"];
                $r=$conn->prepare("SELECT usuario FROM user WHERE usuario=?",[$_POST["user"]]);
                if ($r->num_rows>0){
                    response()->json(["result"=>"false"]);
                } else {
                    response()->json(["result"=>"true"]);
                }
            } else {
                response()->json(["result"=>"false"]);
            }
        } else if ($part=="2"){
            if (isset($_POST["email"])){
                $conn=$GLOBALS["conn"];
                $r=$conn->prepare("SELECT hash FROM user WHERE email=?",[$_POST["email"]]);
                if ($r->num_rows>0){
                    response()->json(["result"=>"false"]);
                } else {
                    response()->json(["result"=>"true"]);
                }
            } else {
                response()->json(["result"=>"false"]);
            }
        } else {
            response()->json(["result"=>"false"]);
        }
    } else {
        $usuario=$GLOBALS["user"];
        if ($usuario){
            $cargo=$GLOBALS["cargo"];
            // return view("admin.admin_inicio.index",compact("usuario","cargo"));
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/inicio/main.html'));
        } else{
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/admin_login/main.html'));
            // return view("admin.admin_login.index");
        }
    }
});
Route::post("/admin/token",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $type=$_POST["type"];
        if ($type=="replace"){
            $oldToken=$_POST["oldToken"];
            $token=isset($_POST["mToken"]) ? $_POST["mToken"] : null;
            $conn=$GLOBALS["conn"];
            // $conn->prepare("UPDATE user SET tokens=JSON_SET(tokens,'$',?) WHERE usuario=?",[$token,$usuario]);
            $p=p($conn->prepare("SELECT tokens FROM user WHERE usuario=?",[$usuario]))[0];
            $tokens=json_decode($p["tokens"]);
            $tokens=array_diff($tokens,[$oldToken]);
            $tokens=json_encode(array_push($tokens,$token));
            $conn->prepare("UPDATE user SET tokens=? WHERE usuario=?",[$tokens,$usuario]);
            response()->json(["result"=>"true"]);
        } else if ($type=="insert"){
            $token=isset($_POST["mToken"]) ? $_POST["mToken"] : null;
            $conn=$GLOBALS["conn"];
            $conn->prepare("UPDATE user SET tokens=JSON_ARRAY_APPEND(tokens,'$',?) WHERE usuario=?",[$token,$usuario]);
            response()->json(["result"=>"true"]);
        }
    } else {
        response()->json(["result"=>"false"]);
    }
});
Route::get("/admin/noticias_cadastro",function(){
    $GLOBALS["user"] || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/noticias_cadastro", function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $type=$_GET["type"];
        if (request("type"=="option")){
            $cargo=$GLOBALS["cargo"];
            if (($cargo & 2)==2){
                r404();
            } else {
                $isCadastro=$type=="cadastro";
                // if (!session()->has("key")) return;
                $conn = $GLOBALS["conn"];
                $dados=request()->all();
                ['titulo'=>$titulo ] = $_POST;
                $permission=($GLOBALS["cargo"] & 4)==4 ? ($_POST["permission"]=="0" ? 0 : 2) : 0;
                // if (strlen($titulo)==0) return;
                $subtitulo=isset($dados["subtitulo"]) ? $dados["subtitulo"] : null;
                $original_format=isset($dados["original_format"]);
                $original_format_d=isset($dados["original_format_d"]);
                $acessos=0;
                $texto=null;
                $old_image=null;
                $imagem=null;
                $old_permission=0;
                $d=null;
                $id=null;
                if ($isCadastro){
                    $id=intval(p($conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM post"))[0]["id"]);
                } else {
                    $id=$_POST["id"];
                    $result=$conn->prepare("SELECT imagem,privado,d FROM post WHERE usuario=? AND id=?",[$usuario,$id]);
                    if ($result->num_rows>0){
                        ["imagem"=>$imagem,"privado"=>$old_permission,"d"=>$d]=p($result)[0];
                        $old_image=$imagem;
                        $old_permission=intval($permission) & 2;
                    } else {
                        return response()->json(["result"=>"false","type"=>"id"]);
                    }
                }
                $texto=isset($dados["texto"]) ? $dados["texto"] : null;
                $hasDImage=$permission==2;
                // $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT, acessos INT, id INT)");
                if (($isCadastro || isset($dados["imagens_edit"])) && (request()->has("imagem") || ($hasDImage && request()->has("dImagem")))) {
                    $file = request()->file("imagem");
                    $dFile = request()->has("dImagem") ? request()->file("dImagem") : null;
                    if (mime_content_type($file->file["tmp_name"]) === 'image/jpeg' || mime_content_type($dFile->file["tmp_name"]) === 'image/jpeg'){
                        $caminhoDestino = __DIR__ . "/../public_html/images/";
                        $filename=null;
                        if (!$imagem || ($imagem && $file)){
                            if ($imagem){
                                unlink($caminhoDestino . $imagem);
                            }
                            $filename = $file->getClientOriginalName("webp");
                            $imagem=(($permission & 2)==2 ? "p_" : "") . (!$original_format ? "r_" : "") . $id . "_p_" . $filename;
                            $file->createwebp($caminhoDestino,$imagem);
                            $img=imagem($caminhoDestino.$imagem);
                        } else {
                            $filename=$imagem;
                        }
                        if ($permission==2 && $dFile){
                            if ($old_permission){
                                unlink($caminhoDestino . substr($imagem,2));
                            }
                            if ($hasDImage && $dFile){
                                $dImagem=(!$original_format ? "r_" : "") . $id . "_p_" . $filename;
                                $dFile->createwebp($caminhoDestino,$dImagem);
                                $img=imagem($caminhoDestino.$dImagem);
                            }
                        }
                        // if permission has changed and new permission is public;
                        // Salvar a imagem em um diretório
                    } else {
                        return response()->json(["result"=>"false","type"=>"mimeType"]);
                    }
                } else {
                    if ($isCadastro){
                        return response()->json(["result"=>"false","type"=>"image"]);
                    }
                }
                if ($permission==0 && $permission!=$old_permission){
                    unlink(__DIR__ . '/../public_html/images/' . substr($old_image,2));
                }
                if ($isCadastro){
                    $conn = $GLOBALS["conn"];
                    $d=get_d();
                    $views_id=get_views_id($conn);
                    $conn->prepare("INSERT INTO post(nome,usuario,titulo,subtitulo,texto,imagem,acessos,views_id,id,d,privado) 
                        SELECT nome, usuario, ? AS titulo, ? AS subtitulo, ? AS texto, ? AS imagem, ? AS acessos, ? AS views_id, ? AS id, ? AS d,(CASE WHEN cargo & 1=1 THEN ? | 8 ELSE ? END) AS privado FROM user WHERE usuario=?",[$titulo,$subtitulo,$texto,$imagem,$acessos,$views_id,$id,$d,$permission,$permission,$usuario]);
                    insert_views($conn,$usuario,"post",$views_id,$id);
                    add_n_posts($usuario,$conn);
                } else {
                    $d=json_decode($d,true);
                    $d["a"]=get_updated_date();
                    $d=json_encode($d);
                    $conn->prepare("UPDATE post SET titulo=?,subtitulo=?,texto=?,imagem=?,d=?,privado=CASE WHEN ?==2 THEN privado | 2 ELSE privado & ~2 END WHERE usuario=? AND id=?",[$titulo,$subtitulo,$texto,$imagem,$d,$permission,$usuario,$id]);
                }
                response()->json(["result"=>"true","usuario"=>$usuario]);
            }
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/noticias_cadastro/main.html'));
        }
    }else{
        login();
    }
});
Route::get("/admin/noticias_edit",function(){
    !$GLOBALS["user"] && header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/noticias_edit",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn=$GLOBALS["conn"];
        if (request()->query("id")){
            $id=intval(request()->query("id"));
            $result=$conn->prepare("SELECT titulo,subtitulo,texto,imagem,id,(privado & 2) AS privado FROM post WHERE usuario=? AND id=?",[$usuario,$id]);
            if ($result->num_rows>0){
                response()->json(["result"=>"true","post_edit"=>p($result)]);
            } else {
                response()->json(["result"=>"false"]);
            }
        } else {
            response()->json(["result"=>"false"]);
        }
    } else {
        login();
    }
    // return view("admin.noticias_edit.index",compact("select_options","r","usuario","cargo"));
});
Route::get("/admin/noticias_lista",function(){
    // $GLOBALS["user"] || header("location:/admin");
    resp("/admin/noticias_lista.html");
    // include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/noticias_lista",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $tipo=isset($_POST["tipo"]) ? request("tipo") : "normal";
        function gpa($type){
            $type=isset($_GET["search"]) ? "pesquisa" : "normal";
            $usuario=$GLOBALS["user"];
            $cargo=$GLOBALS["cargo"];
            $conn=$GLOBALS["conn"];
            $s=null;
            $num=null;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
            $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
            $search=$type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
            if(($cargo & 2)==2){
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,titulo,usuario,acessos,d,privado FROM post WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$search,$search,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$search,$search,$search,$search]);
                } else {
                    $s=$conn->query("SELECT id,titulo,usuario,acessos,d,privado FROM post ORDER BY id DESC LIMIT $n,10");
                    $num=$conn->query("SELECT COUNT(*) AS num FROM post");
                }
            } else {
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,titulo,acessos,d,privado FROM post WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$usuario,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$usuario,$search,$search]);
                } else {
                    $s=$conn->prepare("SELECT id,titulo,acessos,d,privado FROM post WHERE usuario=? ORDER BY id DESC LIMIT $n,10",[$usuario]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post WHERE usuario=?",[$usuario]);
                }
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["result"=>"true","posts"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
        if (request("type")=="info"){
            gpa($tipo);
        } else if (request("type")=="option"){
            if ($tipo=="normal"){
                $cargo=$GLOBALS["cargo"];
                $id=request("id");
                $operation=request("operation") ? request("operation") : null;
                $conn = $GLOBALS["conn"];
                //$s=$conn->prepare("SELECT * FROM post WHERE usuario=?AND privado=0",[$usuario]);
                // unlink(__DIR__ . "/../images/" . p($result)[0]["imagem"]);
                //$s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
                if ($operation){
                    $user=null;
                    $li=$operation=="privado";
                    $case=($GLOBALS["cargo"] & 2)==2 ? ($li ? "privado | 4" : "privado & ~4") : ($li ? "privado | 1" : "privado & ~1"); 
                    $sum=$li ? -1 : 1;
                    if (($cargo & 2)==2){
                        $result=$conn->prepare("UPDATE post SET privado=$case WHERE id=?",[$id]);
                        $user=p($conn->prepare("SELECT usuario FROM post WHERE id=?",[$id]))[0]["usuario"];
                    } else {
                        $result=$conn->prepare("UPDATE post SET privado=$case WHERE usuario=? AND id=?",[$usuario,$id]);
                        $user=$usuario;
                    }
                    $sum_str=$sum==1 ? " + 1" : " - 1";
                    $s=$conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts" . $sum_str . ",0) WHERE usuario=? ORDER BY id DESC",[$user]);
                    response()->json(["result"=>"true","usuario"=>$usuario]);
                } else {
                    if (($cargo & 2)==2){
                        delete_post($conn,$id);
                    } else {
                        delete_post($conn,$id,$usuario);
                    }
                    gpa($tipo);
                }
            } else {
                gpa($tipo);
            }
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/noticias_lista/admin.html'));
        }
    } else {
        login();
    }
    // return view("admin.noticias_lista.index",compact("r","usuario","cargo"));
});
Route::get("/admin/24_cadastro",function(){
    $GLOBALS["user"] || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/24_cadastro",function(){
    include(__DIR__ . '/../conf/config.php');
    $usuario=$GLOBALS["user"];
    if ($usuario){
        if (request("type")=="info"){
            response()->json([]);
        } else if (request("type")=="option"){
            $dados=request()->all();
            $titulo=isset($dados["titulo"]) ? $dados["titulo"] : null;
            $typeMime=$dados["typeMime"];
            $original_format=isset($dados["original_format"]);
            $acessos=0;
            $filename=null;
            $conn = $GLOBALS["conn"];
            $rs=$conn->prepare("SELECT nome FROM user WHERE usuario=?",[$usuario]);
            $nome=p($rs)[0]["nome"];
            $id=intval(p($conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM post_24"))[0]["id"]);
            if (request()->has("file")){
                if ($_FILES["file"]["error"] !==  UPLOAD_ERR_INI_SIZE){
                    $file = request()->file("file");
                    $fileType = mime_content_type($file->file["tmp_name"]);
                    if (($typeMime=="mp4" && $fileType === 'video/mp4') || ($typeMime=="jpeg" && $fileType === "image/jpeg")){
                        if ($typeMime=="mp4"){
                            $duration=shell_exec($GLOBALS["ffprobe_path"] . ' "' . $file->file["tmp_name"]. '" -show_entries format=duration -v quiet -of csv="p=0"');
                            if (filter_var($duration, FILTER_VALIDATE_FLOAT) !== false && intval($duration)<=60){
                                    $caminhoDestino = __DIR__ . "/../public_html/videos/";
                                    $filename = $file->getClientOriginalName("mp4");
                                    $filename =$id . '_24_' . $filename;
                                    $file->createmp4($caminhoDestino,$filename);
                            } else {
                                return response()->json(["result"=>"false","type"=>"time"]);
                            }
                        } else {
                            $caminhoDestino = __DIR__ . "/../public_html/images/";
                            $filename = $file->getClientOriginalName("webp");
                            $filename =$id . '_24_' . $filename;
                            $file->createwebpwithquality($caminhoDestino,$filename);
                            $img=imagem($caminhoDestino.$filename);
                            // $img->resize(1280,720);
                            if ($original_format){
                                $img->resize(720,null);
                            } else {
                                $img->resize(720,1280);
                            }
                        }
                    } else {
                        return response()->json(["result"=>"false","type"=>"mimeType"]);
                    }
                } else {
                    return response()->json(["result"=>"false","type"=>"size"]);
                }
            } else {
                return response()->json(["result"=>"false","type"=>"image"]);
            }
            $d=get_d();
            $views_id=get_views_id($conn);
            $conn->prepare("INSERT INTO post_24(nome,usuario,titulo,type,filename,d,acessos,views_id,id) VALUES (?,?,?,?,?,?,?,?,?)",[$nome,$usuario,$titulo,$typeMime,$filename,$d,$acessos,$views_id,$id]);
            insert_views($conn,$usuario,"post_24",$views_id,$id); 
            // $rs=$conn->prepare("SELECT * FROM user WHERE usuario=?",[$usuario]);
            // $n=p($rs)[0]["n_posts"]+1;
            // $s=$conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$usuario]);
            response()->json(["result"=>"true","usuario"=>$usuario]);
            } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/24_cadastro/main.html'));
        }
    } else {
        login();
    }
});
Route::get("/admin/24_lista",function(){
    $GLOBALS["user"] || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/24_lista",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $tipo=isset($_POST["tipo"]) ? request("tipo") : "normal";
        $cargo=$GLOBALS["cargo"];
        function gpa($type,$cargo){
            $type=isset($_GET["search"]) ? "pesquisa" : "normal";
            $usuario=$GLOBALS["user"];
            $conn=$GLOBALS["conn"];
            $s=null;
            $num=null;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
            $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
            $search = $type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
            if(($cargo & 2)==2){
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,titulo,usuario,acessos,d FROM post_24 WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$search,$search,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_24 WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$search,$search,$search,$search]);  
                } else {
                    $s=$conn->query("SELECT id,titulo,usuario,acessos,d FROM post_24 ORDER BY id DESC LIMIT $n,10");
                    $num=$conn->query("SELECT COUNT(*) AS num FROM post_24");
                }
            } else {
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,titulo,acessos,d FROM post_24 WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$usuario,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_24 WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?)",[$usuario,$search]);
                } else {
                    $s=$conn->prepare("SELECT id,titulo,acessos,d FROM post_24 WHERE usuario=? ORDER BY id DESC LIMIT $n,10",[$usuario]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_24 WHERE usuario=?",[$usuario]);
                }
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["result"=>"true","posts"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
        if (request("type")=="info"){
            // $conn = $GLOBALS["conn"];
            // $result=$conn->prepare("SELECT * FROM post_24 WHERE usuario=? ORDER BY id DESC",[$usuario]);
            // $r=p($result);
            // response()->json(["usuairo"=>$r,"noticias"=>$r,"n_registros"=>$result->num_rows]);
            gpa($tipo,$cargo);
        } else if (request("type")=="option"){
            if ($tipo=="normal"){
                $cargo=$GLOBALS["cargo"];
                $id=$_POST["id"];
                $conn=$GLOBALS["conn"];
                if (($cargo & 2)==2){
                    delete_24($conn,$id);
                } else {
                    delete_24($conn,$id,$usuario);
                }
                gpa($tipo,$cargo);
            } else {
                gpa($tipo,$cargo);
            }
        }
    } else {
        login();
    }
});
Route::post("/admin/denuncias_lista",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $cargo=$GLOBALS["cargo"];
        if (($cargo & 2)==2){
            $tipo=isset($_POST["tipo"]) ? request("tipo") : "normal";
            function gpa($type){
                $type=isset($_GET["search"]) ? "pesquisa" : "normal";
                $usuario=$GLOBALS["user"];
                $conn=$GLOBALS["conn"];
                $s=null;
                $num=null;
                $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
                $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
                $search=$type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,titulo,num,post_tipo,post_id,d FROM denuncia WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM denuncia WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$search,$search]);
                } else {
                    $s=$conn->query("SELECT id,titulo,num,post_tipo,post_id,d FROM denuncia GROUP BY post_id,post_tipo ORDER BY id DESC LIMIT $n,10");
                    $num=$conn->query("SELECT COUNT(*) AS num FROM denuncia");
                }
                $r=p($s);
                $num=p($num)[0]["num"];
                response()->json(["result"=>"true","noticias"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
            }
            if (request("type")=="info"){
                gpa($tipo);
            } else if (request("type")=="option"){
                if ($tipo=="normal"){
                    $cargo=$GLOBALS["cargo"];
                    $id=intval(request("id"));
                    $conn = $GLOBALS["conn"];
                    //$s=$conn->prepare("SELECT * FROM post WHERE usuario=?AND privado=0",[$usuario]);
                    // unlink(__DIR__ . "/../images/" . p($result)[0]["imagem"]);
                    //$s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
                    if (($cargo & 2)==2){
                        $conn->prepare("DELETE FROM denuncia WHERE id=?",[$id]);
                    } else {
                        $conn->prepare("DELETE FROM denuncia WHERE usuario=? AND id=?",[$usuario,$id]);
                    }
                    gpa($tipo);
                } else {
                    gpa($tipo);
                }
                // $num=$conn->query("SELECT COUNT(*) AS num FROM post WHERE usuario")
            } else {
                response()->json(["result"=>"false"]);
            }
        } else {
            r404();
        }
    } else {
        login();
    }
});
Route::post("/admin/denuncias_infos/{id}",function($id){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $cargo=$GLOBALS["cargo"];
        if (($cargo & 2)==2){
            $conn=$GLOBALS["conn"];
            $result=$conn->prepare("SELECT * FROM denuncia WHERE id=?",[$id]);
            if ($result->num_rows>0){
                $result=p($result)[0];
                response()->json(["result"=>"true","tipos"=>$result["tipo"],"datas"=>$result["d"]]);
            } else {
                r404();
            }
        } else {
            r404();
        }
    } else {
        login();
    }
});
Route::get("/admin/settings",function(){
    $GLOBALS["user"] || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/settings",function(){
    
    $usuario=$GLOBALS["user"];
    if ($usuario){
    if (request("type")=="info"){
        $conn = $GLOBALS["conn"];
        $config=$conn->prepare("SELECT usuario,logo,banner FROM user WHERE usuario=?",[$usuario]);
        $config=p($config)[0];
        response()->json(["config"=>$config,"usuario"=>$usuario]);
    } else if (request("type")=="option"){
        $type=request()->query("type");
        $conn = $GLOBALS["conn"];
        $config=$conn->prepare("SELECT logo,banner,id FROM user WHERE usuario=?",[$usuario]);
        $config=p($config)[0];
        if ($type=="logo"){
            if (request("operation")=="d"){
                if (isset($config["logo"])){
                    unlink(__DIR__ . "/../public_html/images/" . $config["logo"]);
                }
                $s=$conn->prepare("UPDATE user SET logo=NULL WHERE usuario=?",[$usuario]);
            } else {
                if (isset($config["logo"])){
                    unlink(__DIR__ . "/../public_html/images/" . $config["logo"]);
                }
                $logo=null;
                if (request()->has("logo")) {
                    $file = request()->file("logo");
                    $caminhoDestino = __DIR__ . "/../public_html/images/";
                    $logo = $file->getClientOriginalName();
                    $logo=$config["id"] . "_logo_" . $logo;
                    $file->move($caminhoDestino,$logo);
                    // Caminho para a imagem original
                    $img=imagem($caminhoDestino.$logo);
                    $img->resize(800,800);
                }
                $s=$conn->prepare("UPDATE user SET logo=? WHERE usuario=?",[$logo,$usuario]);
                response()->json(["result"=>"true","usuario"=>$usuario,"lsrc"=>$logo]);
            }
        }
        if ($type=="banner"){
            if (request("operation")=="d"){
                if (isset($config["banner"])){
                    unlink(__DIR__ . "/../public_html/images/" . $config["banner"]);
                }
                $s=$conn->prepare("UPDATE user SET banner=NULL WHERE usuario=?",[$usuario]);
            } else {
                if (isset($config["banner"])){
                    unlink(__DIR__ . "/../public_html/images/" . $config["banner"]);
                }
                $banner=null;
                if (request()->has("banner")) {
                    $file = request()->file("banner");
                    $caminhoDestino = __DIR__ . "/../public_html/images/";
                    $banner = $file->getClientOriginalName();
                    $banner=$config["id"] . "_banner_" . $banner;
                    $file->move($caminhoDestino,$banner);
                    $img=imagem($caminhoDestino.$banner);
                    $img->resize(2048,512);
                }
                $s=$conn->prepare("UPDATE user SET banner=? WHERE usuario=?",[$banner,$usuario]);
                response()->json(["result"=>"true","usuario"=>$usuario,"banner"=>$banner]);
            }
        }
    } else {
        response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/settings/main.html'));
    }
    } else {
        login();
    }
});
// Route::get("/admin/usuarios",function(){
//     $usuario=$GLOBALS["user"];
//     if ($usuario){
//         $cargo=$GLOBALS["cargo"];
//         ($cargo & 2)==2 ? include(__DIR__ . '/../public_html/templates/main/main.html') : header("location:/erro?origin=/");
//     } else {
//         header("location:/erro?origin=/");
//     }
// });
// Route::post("/admin/usuarios",function(){
//     $usuario=$GLOBALS["user"];
//     $cargo=$GLOBALS["cargo"];
//     if ($usuario && ($cargo & 2)==2){
//         if (request("type")=="info"){
//             $conn = $GLOBALS["conn"];
//             $s=$conn->prepare("SELECT nome,usuario,banner FROM user WHERE usuario!=?",[$usuario]);
//             $r=p($s);
//             response()->json(["usuarios"=>$r]);
//         } else {
//             response()->json(file_get_contents(__DIR__ . '/../public_html/templates/lista_usuarios/main.html'));
//         }
//     } else {
//         login();
//     }
//     // include(__DIR__ . '/../public_html/templates/admin/lista_usuarios/index.php');
// });
Route::get("/admin/metricas",function(){
    $GLOBALS["user"] || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/metricas",function(){
    
    $usuario=$GLOBALS["user"];
    if ($usuario){
        if (request("type")=="info"){
        $cargo=$GLOBALS["cargo"];
        $conn = $GLOBALS["conn"];
        $p=null;
        $total_u=null;
        if (($cargo & 2)==2){
            $p=$conn->query("SELECT tipo,d2,d FROM views WHERE tipo!='playlist'");
            // $result=p($conn->query("SELECT * FROM views_atual"));
            // $d=new DateTime();
            // foreach($result as $v){
            //     $dv=$v["d"];
            //     $dv=DateTime::createFromFormat('Y-m-d H:i:s', $dv);
            //     $dv->modify('+10 seconds');
            //     if ($d>$dv){
            //         $conn->prepare("DELETE FROM views_atual WHERE id=?",[$v["id"]]);
            //     }
            // }
            // $total_u=p($conn->query("SELECT tipo,usuario FROM views_atual"));
            $total_u=p($conn->query("SELECT usuario,peer_tokens FROM user WHERE online=2"));
        } else {
            $p=$conn->prepare("SELECT tipo,d2,d FROM views WHERE usuario=? AND tipo!='playlist'",[$usuario]);
        }
        $p=p($p);
        response()->json(["posts"=>$p,"total_u"=>$total_u,"usuario"=>$usuario]);
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/grafico/main.html'));
        }
    } else {
        login();
    }
});
// Route::post("/admin/metricas",function(){
//     $usuario=$GLOBALS["user"];
//     if ($usuario){
//         if (request("type")=="info"){
//             $cargo=$GLOBALS["cargo"];
//             $conn = $GLOBALS["conn"];
//             $r=null;
//             $total_u=null;
//             $t1=0;
//             $t2=0;
//             if (($cargo & 2)==2){
//                 $r=p($conn->query("SELECT tipo,d2,d FROM views WHERE tipo!='playlist'"));
//                 $t1=strlen(json_encode($r));
//                 $ba=microtime(true);
//                 $r2=p($conn->query("SELECT id,usuario FROM user"));
//                 $users=[];
//                 foreach ($r2 as $l){
//                     $users[$l["usuario"]]=intval($l["id"]);
//                 }
//                 for ($i=0;$i<count($r);$i++){
//                     $c=$r[$i];
//                     $p=json_decode($c["d2"],true);
//                     $a=[];
//                     try{
//                         foreach ($p as $y=>$yv){
//                             // $y=bin2hex(pack("S",$y));
//                             $a[$y]=[];
//                             foreach ($yv as $d=>$dv){
//                                 // $d=bin2hex(pack("S",$d));
//                                 $a[$y][$d]=[];
//                                 foreach ($dv as $array=>$arrayv){
//                                     $anterior=0;
//                                     foreach ($arrayv as $time=>$timev){
//                                         // $codigo=0;
//                                         // foreach (str_split($timev) as $char) {
//                                         //     $codigo = $codigo * 256 + ord($char);  // Cria um número a partir da string
//                                         // }
//                                         $t=intval(strtotime($time) / 1000);
//                                         $d=$t-$anterior;
//                                         // echo $t,$anterior;
//                                         $id=$timev && is_string($timev) && isset($users[$timev]) ? $users[$timev] : 0;
//                                         $a[$y][$d][$array][]=( $id << 22) | $d;
//                                         $anterior=$t;
//                                     }
//                                 }
//                             }
//                         }
//                         $r[$i]["d2"]=json_encode($a);
//                         $d=json_decode($r[$i]["d"],true)["o"];
//                         $r[$i]["d"]=json_encode(["d"=>strtotime($d) / 1000]);
//                     } catch (Exception $e){
//                         echo $e->getMessage();
//                         $r[$i]=[];
//                     }
//                 }
//                 // $result=p($conn->query("SELECT * FROM views_atual"));
//                 // $d=new DateTime();
//                 // foreach($result as $v){
//                 //     $dv=$v["d"];
//                 //     $dv=DateTime::createFromFormat('Y-m-d H:i:s', $dv);
//                 //     $dv->modify('+10 seconds');
//                 //     if ($d>$dv){
//                 //         $conn->prepare("DELETE FROM views_atual WHERE id=?",[$v["id"]]);
//                 //     }
//                 // }
//                 // $total_u=p($conn->query("SELECT tipo,usuario FROM views_atual"));
//                 $total_u=p($conn->query("SELECT usuario,peer_tokens FROM user WHERE online=2"));
//             } else {
//                 $r=p($conn->prepare("SELECT tipo,d2,d FROM views WHERE usuario=? AND tipo!='playlist' AND tipo!='musica' AND tipo!='post_musica'",[$usuario]));
//                 $ba=microtime(true);
//                 $r2=p($conn->query("SELECT id,usuario FROM user"));
//                 $users=[];
//                 foreach ($r2 as $l){
//                     $users[$l["usuario"]]=intval($l["id"]);
//                 }
//                 $t1=0;
//                 $t2=0;
//                 for ($i=0;$i<count($r);$i++){
//                     $c=$r[$i];
//                     $t1+=strlen($c["d2"]);
//                     $p=json_decode($c["d2"],true);
//                     $a=[];
//                     try{
//                         foreach ($p as $y=>$yv){
//                             // $y=bin2hex(pack("S",$y));
//                             $a[$y]=[];
//                             foreach ($yv as $d=>$dv){
//                                 // $d=bin2hex(pack("S",$d));
//                                 $a[$y][$d]=[];
//                                 foreach ($dv as $array=>$arrayv){
//                                     $anterior=0;
//                                     foreach ($arrayv as $time=>$timev){
//                                         // $codigo=0;
//                                         // foreach (str_split($timev) as $char) {
//                                         //     $codigo = $codigo * 256 + ord($char);  // Cria um número a partir da string
//                                         // }
//                                         $t=intval(strtotime($time) / 1000);
//                                         $d=$t-$anterior;
//                                         // echo $t,$anterior;
//                                         $id=$timev && is_string($timev) && isset($users[$timev]) ? $users[$timev] : 0;
//                                         $a[$y][$d][$array][]=( $id << 22) | $d;
//                                         $anterior=$t;
//                                     }
//                                 }
//                             }
//                         }
//                         $r[$i]=gzcompress(json_encode($a));
//                     } catch (Exception $e){
//                         echo $e->getMessage();
//                         $r[$i]=[];
//                     }
//                 }
//             }
//             $zi=microtime(true);
//             $t2=strlen(json_encode($r));
//             $compressedData=json_encode(["a"=>$t2/$t1,"b"=>$t2,"c"=>$t1,"posts"=>$r,"total_u"=>$total_u,"usuario"=>$usuario,"t"=>$zi-$ba]);
//             // header('Content-Type: application/octet-stream');  // Ou um tipo adequado dependendo dos dados
//             // header('Content-Length: ' . strlen($compressedData));  // Tamanho dos dados comprimidos

//             // Enviar os dados comprimidos para o cliente
//             echo $compressedData;
//         } else {
//             response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/grafico/main.html'));
//         }
//     } else {
//         login();
//     }
// });
Route::get("/admin/sair",function(){
    session()->forget("key");
    return redirect("/");
});
Route::post("/admin/sair",function(){
    // session()->forget("key");
    // response()->json(["header_location"=>"/"]);
    $user=$GLOBALS["user"];
    if ($user){
        $GLOBALS["cargo"]=128;
        $token=isset($_POST["mToken"]) ? $_POST["mToken"] : null;
        if ($token){
            $conn=$GLOBALS["conn"];
            $tokens=json_decode(p($conn->prepare("SELECT tokens FROM user WHERE usuario=?",[$user]))[0]["tokens"]);
            $tokens=json_encode(array_diff($tokens,[$token]));
            $conn->prepare("UPDATE user SET tokens=? WHERE usuario=?",[$tokens,$user]);
        }
        logout();
    }
    response()->json(["result"=>"true"]);
});
Route::post("/cargo",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        response()->json(["result"=>"true","cargo"=>$GLOBALS["cargo"]]);
    } else {
        response()->json(["result"=>"true","cargo"=>null]);
    }
});
Route::post("/admin/imagens_cadastro", function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $type=$_GET["type"];
        if (request("type")!="get"){
            $cargo=$GLOBALS["cargo"];
            if (($cargo & 2)==2){
                r404();
            } else if ($type=="cadastro" || $type=="edit"){
                $dados=request()->all();
                if (!isset($dados["original_formats"])) return response()->json(["result"=>"false"]);
                $isCadastro=$type=="cadastro";
                $conn = $GLOBALS["conn"];
                // if (!session()->has("key")) return;
                // if (strlen($titulo)==0) return;
                $acessos=0;
                $permission=isset($dados["permission"]) ? 2 : 0;
                $original_format=json_decode($dados["original_formats"],true);
                $original_format_premium=isset($dados["original_format_premium"]) ? $dados["original_format"] : 0;
                $descricao=isset($dados["descricao"]) ? $dados["descricao"] : null;
                // $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT, acessos INT, id INT)");
                $id=null;
                $d=null;
                if ($isCadastro){
                    $id=intval(p($conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM post_imagem"))[0]["id"]);
                } else {
                    $id=$_POST["id"];
                    $result=$conn->prepare("SELECT privado,d FROM post_imagem WHERE usuario=? AND id=?",[$usuario,$id]);
                    if ($result->num_rows>0){
                        ["privado"=>$privado,"d"=>$d]=p($result)[0];
                        $permission=$privado & 2;
                    } else {
                        return response()->json(["result"=>"false","type"=>"id"]);
                    }
                }
                $images=[];
                if ($isCadastro && request()->has("imageFile") && (($permission==2 && request()->has("imageFilePremium")) || ($permission==0))) {
                    $caminhoDestino = __DIR__ . "/../public_html/images/";
                    $file = request()->file("imageFile");
                    $file_count=0;
                    $number=$permission==2 ? 1 : 0;
                    foreach ($_FILES["imageFile"]["tmp_name"] as $key => $tmpName){
                        // reset the bits between 28 and 63 and shift the bits between 0 and 27 to 8 positions, leaving free the firsts 8 bits;
                        $flag=$number | ((($original_format[$key] ? $original_format[$key] : 0) & ((1 << 37) - 1)) << 8);
                        $image=base_convert($flag,10,36) . "_" . $id . "_i_" . $file_count . "_file.webp";
                        $file->createwebp($caminhoDestino,$image,$key);
                        $file_count++;
                        array_push($images,$image);
                    }
                    if ($permission==2){
                        $filePremium=request()->file("imageFilePremium");
                        // deactive the frist bit, because its file is visible for all users non-premium;
                        $number=$number & ~1;
                        // reset the bits between 28 and 63 and shift the bits between 0 and 27 to 8 positions, leaving free the firsts 8 bits;
                        $flag=$number | (($original_format_premium & ((1 << 37) - 1)) << 8);
                        $dImage=base_convert($flag,10,36) . "_" . $id . "_i_premium.webp";
                        $filePremium->createwebp($caminhoDestino,$dImage);
                    }
                    $images=json_encode($images);
                } else if ($isCadastro){
                    return response()->json(["result"=>"false","type"=>"image"]);
                }
                if ($isCadastro){
                    $conn = $GLOBALS["conn"];
                    $d=get_d();
                    $views_id=get_views_id($conn);
                    $conn->prepare("INSERT INTO post_imagem(nome,usuario,descricao,imagem,acessos,views_id,id,d,privado) 
                        SELECT nome, usuario, ? AS descricao, ? AS imagem, ? AS acessos, ? AS views_id, ? AS id, ? AS d, (CASE WHEN cargo & 5=5 THEN ? | 8 WHEN cargo & 4=4 THEN ? WHEN cargo & 1=1 THEN 8 ELSE 0 END) AS privado FROM user WHERE id=?",[$descricao,$images,$acessos,$views_id,$id,$d,$permission,$permission,$GLOBALS["user_id"]]);
                    insert_views($conn,$usuario,"post_imagem",$views_id,$id);
                    add_n_posts($usuario,$conn);
                } else {
                    $d=json_decode($d,true);
                    $d["a"]=get_updated_date();
                    $d=json_encode($d);
                    $conn->prepare("UPDATE post_imagem p LEFT JOIN user u ON p.usuario=u.usuario SET privado=(CASE WHEN cargo & 4=4 THEN privado | ? ELSE privado END),descricao=?,p.d=? WHERE p.usuario=? AND p.id=?",[$privado,$descricao,$d,$usuario,$id]);
                }
                response()->json(["result"=>"true","usuario"=>$usuario]);
            }
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/noticias_cadastro/main.html'));
        }
    }else{
        login();
    }
});
Route::post("/admin/imagens_edit",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $id=request()->query("id");
        $id=intval($id);
        $conn=$GLOBALS["conn"];
        $result=null;
        if ($GLOBALS["cargo"]=="admin"){
            $result=$conn->prepare("SELECT privado,imagem,descricao,id FROM post_imagem WHERE id=?",[$id]);
        } else {
            $result=$conn->prepare("SELECT privado,imagem,descricao,id FROM post_imagem WHERE id=? AND usuario=?",[$id,$usuario]);
        }
        if ($result->num_rows>0){
            $result=p($result)[0];
            response()->json(["result"=>"true","post_edit"=>$result]);
        } else {
            r404();
        }
    } else {
        r404();
    }
});
Route::post("/admin/imagens_lista",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $tipo=isset($_POST["tipo"]) ? request("tipo") : "normal";
        function gpa($type){
            $type=isset($_GET["search"]) ? "pesquisa" : "normal";
            $usuario=$GLOBALS["user"];
            $cargo=$GLOBALS["cargo"];
            $conn=$GLOBALS["conn"];
            $s=null;
            $num=null;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
            $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
            $search=$type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
            if(($cargo & 2)==2){
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,descricao AS titulo,usuario,acessos,d,privado FROM post_imagem WHERE LOWER(descricao) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$search,$search,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_imagem WHERE LOWER(descricao) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$search,$search,$search,$search]);
                } else {
                    $s=$conn->query("SELECT id,descricao AS titulo,usuario,acessos,d,privado FROM post_imagem ORDER BY id DESC LIMIT $n,10");
                    $num=$conn->query("SELECT COUNT(*) AS num FROM post_imagem");
                }
            } else {
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,descricao AS titulo,acessos,d,privado FROM post_imagem WHERE usuario=? AND LOWER(descricao) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$usuario,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_imagem WHERE usuario=? AND LOWER(descricao) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$usuario,$search,$search]);
                } else {
                    $s=$conn->prepare("SELECT id,descricao AS titulo,acessos,d,privado FROM post_imagem WHERE usuario=? ORDER BY id DESC LIMIT $n,10",[$usuario]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_imagem WHERE usuario=?",[$usuario]);
                }
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["result"=>"true","posts"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
        if (request("type")=="info"){
            gpa($tipo);
        } else if (request("type")=="option"){
            if ($tipo=="normal"){
                $cargo=$GLOBALS["cargo"];
                $id=request("id");
                $operation=request("operation") ? request("operation") : null;
                $conn = $GLOBALS["conn"];
                //$s=$conn->prepare("SELECT * FROM post WHERE usuario=?AND privado=0",[$usuario]);
                // unlink(__DIR__ . "/../images/" . p($result)[0]["imagem"]);
                //$s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
                if ($operation){
                    $user=null;
                    $li=$operation=="privado";
                    $case=$li ? "privado | 1" : "privado & ~1"; 
                    $sum=$li ? -1 : 1;
                    if (($cargo & 2)==2){
                        $result=$conn->prepare("UPDATE post_imagem SET privado=$case WHERE id=?",[$id]);
                        $user=p($conn->prepare("SELECT usuario FROM post_imagem WHERE id=?",[$id]))[0]["usuario"];
                    } else {
                        $result=$conn->prepare("UPDATE post_imagem SET privado=$case WHERE usuario=? AND id=?",[$usuario,$id]);
                        $user=$usuario;
                    }
                    $sum_str=$sum== 1 ? " + 1" : " - 1";
                    $s=$conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts" . $sum_str . ",0) WHERE usuario=? ORDER BY id DESC",[$user]);
                    response()->json(["result"=>"true","usuario"=>$usuario]);
                } else {
                    if (($cargo & 2)==2){
                        delete_imagem($conn,$id);
                    } else {
                        delete_imagem($conn,$id,$usuario);
                    }
                    gpa($tipo);
                }
            } else {
                gpa($tipo);
            }
            // $num=$conn->query("SELECT COUNT(*) AS num FROM post WHERE usuario")
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/noticias_lista/admin.html'));
        }
    } else {
        login();
    }
    // return view("admin.noticias_lista.index",compact("r","usuario","cargo"));
});
Route::get("/admin/musicas_cadastro",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        include(__DIR__ . '/../public_html/templates/main/main.html');
    } else {
        header("location:/erro?origin=/");
    }
});
Route::post("/admin/musicas_cadastro",function(){
    include(__DIR__ . '/../conf/config.php');
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $type=$_GET["type"];
        // if (request("type")=="chunk"){
        //     $targetDir=__DIR__ . "/chunks/";
        //     $filename = $_POST['filename']; // Nome do arquivo original
        //     $totalChunks = $_POST['totalChunks']; // Total de chunks
        //     $currentChunk = $_POST['currentChunk']; // Chunk atual

        //     // Criar um diretório temporário para armazenar os chunks se não existir
        //     if (!file_exists($targetDir)) {
        //         mkdir($targetDir, 0777, true);
        //     }

        //     // Caminho do arquivo temporário
        //     $tempFile = $targetDir . $filename . ".part" . $currentChunk;

        //     // Receber o chunk e salvá-lo
        //     if (isset($_FILES['file'])) {
        //         $file = $_FILES['file'];
                
        //         // Mover o chunk para o diretório temporário
        //         move_uploaded_file($file['tmp_name'], $tempFile);
                
        //         // Verificar se todos os chunks foram enviados
        //         $allChunksReceived = true;
        //         for ($i = 0; $i < $totalChunks; $i++) {
        //             if (!file_exists($targetDir . $filename . ".part" . $i)) {
        //                 $allChunksReceived = false;
        //                 break;
        //             }
        //         }

        //         // Se todos os chunks foram recebidos, juntar os arquivos
        //         if ($allChunksReceived) {
        //             $finalFile = fopen($targetDir . $filename, "wb");

        //             for ($i = 0; $i < $totalChunks; $i++) {
        //                 $chunkFile = $targetDir . $filename . ".part" . $i;
        //                 $chunkData = file_get_contents($chunkFile);
        //                 fwrite($finalFile, $chunkData);
        //                 unlink($chunkFile); // Apagar o chunk após a escrita
        //             }

        //             fclose($finalFile);
                    
        //             echo json_encode(["result"=>"true"]);
        //         } else {
        //             echo json_encode(["result"=>"true","type"=>"partial"]);
        //         }
        //     } else {
        //         echo json_encode(["result"=>"false","type"=>"errorChunk"]);
        //     }
        // }
        if (request("type")=="info" && ($type=="cadastro" || $type=="edit")){
            response()->json([]);
        } else if (request("type")=="option"){
            ["titulo"=>$titulo]=$_POST;
            //if (strlen($titulo)==0) return;
            $conn=$GLOBALS["conn"];
            $isCadastro=$type=="cadastro";
            $dados=request()->all();
            $arquivos=[];
            $acessos_parcial=[];
            $durations=[];
            $zip;
            $imagem=null;
            $id=null;
            $d=null;
            if ($isCadastro){
                $id=intval(p($conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM post_musica"))[0]["id"]);
            } else {
                $id=$_POST["id"];
                $result=$conn->prepare("SELECT imagem,d FROM post_musica WHERE usuario=? AND id=?",[$usuario,$id]);
                if ($result->num_rows>0){
                    ["imagem"=>$imagem,"d"=>$d]=p($result)[0];
                } else {
                    return response()->json(["result"=>"false","type"=>"id"]);
                }
            }
            $validImage=false;
            if (($isCadastro || isset($_POST["imagens_edit"]))  && request()->has("imagem")){
                if (mime_content_type(request()->file("imagem")->file["tmp_name"]) === 'image/jpeg'){
                    $validImage=true;
                } else {
                    return response()->json(["result"=>"false","type"=>"mimeType"]);
                }
            } else {
                if ($isCadastro){
                    return response()->json(["result"=>"false","type"=>"image"]);
                }
            }
            if ($isCadastro){
                $zip='zip_' . $id . "_archive.zip";
                $zip_name=__DIR__ . '/../public_html/zips/' . $zip;
                try {
                    $zip_archive=new ZipArchive();
                    if ($zip_archive->open($zip_name, ZipArchive::CREATE) === TRUE) {
                        if (isset($_FILES["musics"])){
                            $idi=0;
                            foreach ($_FILES["musics"]["tmp_name"] as $key=>$tmp_name){
                                $dir = __DIR__ . "/../public_html/musics/";
                                $filename=$_FILES["musics"]["name"][$key];
                                // Salvar a imagem em um diretório
                                $name="0_" . $id . "_m_m_" . $idi . "_" . $filename;
                                $absolute_path = $dir . $name;
                                move_uploaded_file($tmp_name, $absolute_path);
                                $zip_archive->addFile($absolute_path,$filename);
                                array_push($arquivos,$name);
                                array_push($durations,intval(shell_exec($GLOBALS["ffprobe_path"] . ' "' . $absolute_path  . '" -show_entries format=duration -v quiet -of csv="p=0"')));
                                array_push($acessos_parcial,0);
                                $idi++;
                            }
                        }
                        $zip_archive->close();
                    } else {
                        echo 'Falha ao criar o arquivo ZIP.';
                    }
                } catch (Exception $e){
                    echo $e->getMessage();
                }
            }
            if ($validImage){
                $file = request()->file("imagem");
                // Salvar a imagem em um diretório
                $caminhoDestino = __DIR__ . "/../public_html/images/";
                $imagem = $file->getClientOriginalName("webp");
                $imagem=$id . "_m_i_" . $imagem;
                $file->createwebp($caminhoDestino,$imagem);
                $img=imagem($caminhoDestino.$imagem);
                $img->resize(640,640);
            }
            // $acessos_d=json_encode([]);
            if ($isCadastro){
                $views_id=get_views_id($conn);
                $d=get_d();
                $acessos_parcial=json_encode($acessos_parcial);
                $arquivos_json=json_encode($arquivos);
                $durations=json_encode($durations);
                $permission=0;
                $conn->prepare("INSERT INTO post_musica(usuario,titulo,imagem,arquivo,acessos_parcial,views_id,id,d,privado,duration,zip)
                    SELECT usuario, ? AS titulo, ? AS imagem, ? AS arquivo, ? AS acessos_parcial, ? AS views_id, ? AS id, ? AS d, (CASE WHEN cargo & 1=1 THEN ? | 8 ELSE ? END) AS privado, ? AS duration, ? AS zip FROM user WHERE id=?",[$titulo,$imagem,$arquivos_json,$acessos_parcial,$views_id,$id,$d,$permission,$permission,$durations,$zip,$GLOBALS["user_id"]]);
                insert_views($conn,$usuario,"post_musica",$views_id,$id);
                add_n_posts($usuario,$conn);
            } else { 
                $s=$conn->prepare("SELECT d FROM post_musica WHERE usuario=? AND id=?",[$usuario,$id]);
                $d=json_decode(p($s)[0]["d"],true);
                $d["a"]=get_updated_date();
                $d=json_encode($d);
                $s=$conn->prepare("UPDATE post_musica SET titulo=?,imagem=?,d=? WHERE usuario=? AND id=?",[$titulo,$imagem,$d,$usuario,$id]);
            }
            response()->json(["result"=>"true","usuario"=>$usuario]);
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/musicas_cadastro/main.html'));
        }
    } else {
        print_r($_POST);
        // r404();
    }
});
Route::post("/admin/musicas_edit",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn=$GLOBALS["conn"];
        if (request()->query("id")){
            $id=intval(request()->query("id"));
            $result=$conn->prepare("SELECT titulo,imagem,arquivo,id FROM post_musica WHERE usuario=? AND id=?",[$usuario,$id]);
            if ($result->num_rows>0){
                response()->json(["result"=>"true","post_edit"=>p($result)]);
            } else {
                response()->json(["result"=>"false"]);
            }
        } else {
            response()->json(["result"=>"false"]);
        }
    } else {
        login();
    }
    // return view("admin.noticias_edit.index",compact("select_options","r","usuario","cargo"));
});
Route::get("/admin/musicas_lista",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        include(__DIR__ . '/../public_html/templates/main/main.html');
    } else {
        header("location:/erro?origin=/");
    }
});
Route::post("/admin/musicas_lista",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $tipo=isset($_POST["tipo"]) ? request("tipo") : "normal";
        function gpa($type){
            $type=isset($_GET["search"]) ? "pesquisa" : "normal";
            $usuario=$GLOBALS["user"];
            $cargo=$GLOBALS["cargo"];
            $conn=$GLOBALS["conn"];
            $s=null;
            $num=null;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
            $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
            $search=$type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
            if (($cargo & 2)==2){
                if ($type=="pesquisa"){
                    $nomes=p($conn->prepare("SELECT usuario FROM user WHERE LOWER(nome) LIKE LOWER(?)",[$search]));
                    $list2=[];
                    foreach ($nomes as $nome){
                        $list2[]="'" . $nome["usuario"] . "'";
                    }
                    $list="";
                    if (count($list2)>1){
                        $list=implode(",",$list2);
                    } else if (count($list2)==1){
                        $list=$list2[0];
                    }
                    $s=$conn->prepare("SELECT * FROM post_musica WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$search,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_musica WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) || LOWER(d) LIKE LOWER(?)",[$search,$search,$search]);
                } else {
                    $s=$conn->query("SELECT * FROM post_musica ORDER BY id DESC LIMIT $n,10");
                    $num=$conn->query("SELECT COUNT(*) AS num FROM post_musica");
                }
            } else {
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT * FROM post_musica WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$usuario,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_musica WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$usuario,$search,$search]);
                } else {
                    $s=$conn->prepare("SELECT * FROM post_musica WHERE usuario=? ORDER BY id DESC LIMIT $n,10",[$usuario]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_musica WHERE usuario=?",[$usuario]);
                }
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["result"=>"true","posts"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
        if (request("type")=="info"){
            gpa($tipo);
        } else if (request("type")=="option"){
            if ($tipo=="normal"){
                $cargo=$GLOBALS["cargo"];
                $conn=$GLOBALS["conn"];
                $id=request("id");
                function delete($result){
                    if (isset($result[0]["imagem"])){
                        unlink(__DIR__ . "/../public_html/images/".$result[0]["imagem"]);
                    }
                    unlink(__DIR__ . "/../public_html/zips/".$result[0]["zip"]);
                    $arquivos=json_decode($result[0]["arquivo"]);
                    foreach($arquivos as $arquivo){
                        unlink(__DIR__ . "/../public_html/musics/" . $arquivo);
                    }
                }
                if (($cargo & 2)==2){
                    delete_musica($conn,$id);
                } else {
                    delete_musica($conn,$id,$usuario);
                }
                gpa($tipo);
            } else {
                gpa($tipo);
            }
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/musicas_lista/main.html'));
        }
    } else {
        r404();
    }
});
Route::post("/admin/textos_cadastro",function(){
    $user=$GLOBALS["user"];
    if ($user){
        $type=$_GET["type"];
        if ($type=="cadastro" || $type=="edit"){
            $isCadastro=$type=="cadastro";
            $conn=$GLOBALS["conn"];
            // if (request("type")=="info"){
            $texto=$_POST["texto"];
            $views_id=get_views_id($conn);
            $d=null;
            $id=null;
            if ($isCadastro){
                $id=intval(p($conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM post_texto"))[0]["id"]);
            } else {
                $id=$_POST["id"];
                $result=$conn->prepare("SELECT d FROM post_texto WHERE usuario=? AND id=?",[$user,$id]);
                if ($result->num_rows>0){
                    ["d"=>$d]=p($result)[0];
                } else {
                    return response()->json(["result"=>"false","type"=>"id"]);
                }
            }
            if ($isCadastro){
                $d=get_d();
                $permission=0;
                $conn->prepare("INSERT INTO post_texto(nome,usuario,texto,acessos,views_id,id,d,privado) 
                    SELECT nome, usuario, ? AS texto, 0 AS acessos, ? AS views_id, 
                    ? AS id,
                    ? AS d, (CASE WHEN cargo & 1=1 THEN ? | 8 ELSE ? END) AS privado FROM user WHERE id=?",[$texto,$views_id,$id,$d,$permission,$permission,$GLOBALS["user_id"]]);
                // }
                insert_views($conn,$user,"post_texto",$views_id,$id);
                add_n_posts($user,$conn);
            } else {
                $d=json_decode($d,true);
                $d["a"]=get_updated_date();
                $d=json_encode($d);
                $conn->prepare("UPDATE post_texto SET texto=?,d=? WHERE usuario=? AND id=?",[$texto,$d,$user,$id]);
            }
            response()->json(["result"=>"true","usuario"=>$user]);
        }
    } else {
        login();
    }
});
Route::post("/admin/textos_edit",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn=$GLOBALS["conn"];
        if (request()->query("id")){
            $id=intval(request()->query("id"));
            $result=$conn->prepare("SELECT texto,id FROM post_texto WHERE usuario=? AND id=?",[$usuario,$id]);
            if ($result->num_rows>0){
                response()->json(["result"=>"true","post_edit"=>p($result)]);
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
Route::post("/admin/textos_lista",function(){
    $user=$GLOBALS["user"];
    if ($user){
        $tipo=isset($_POST["tipo"]) ? request("tipo") : "normal";
        function gpa($type){
            $type=isset($_GET["search"]) ? "pesquisa" : "normal";
            $usuario=$GLOBALS["user"];
            $cargo=$GLOBALS["cargo"];
            $conn=$GLOBALS["conn"];
            $s=null;
            $num=null;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
            $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
            $search=$type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
            if(($cargo & 2)==2){
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,texto AS titulo,usuario,acessos,d,privado FROM post_texto WHERE LOWER(texto) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$search,$search,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_texto WHERE LOWER(texto) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(texto) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$search,$search,$search,$search]);
                } else {
                    $s=$conn->query("SELECT id,texto AS titulo,usuario,acessos,d,privado FROM post_texto ORDER BY id DESC LIMIT $n,10");
                    $num=$conn->query("SELECT COUNT(*) AS num FROM post_texto");
                }
            } else {
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,texto AS titulo,acessos,d,privado FROM post_texto WHERE usuario=? AND LOWER(texto) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$usuario,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_texto WHERE usuario=? AND LOWER(texto) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$usuario,$search,$search]);
                } else {
                    $s=$conn->prepare("SELECT id,texto AS titulo,acessos,d,privado FROM post_texto WHERE usuario=? ORDER BY id DESC LIMIT $n,10",[$usuario]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_texto WHERE usuario=?",[$usuario]);
                }
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["result"=>"true","posts"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
        if (request("type")=="info"){
            gpa($tipo);
        } else if (request("type")=="option"){
            if ($tipo=="normal"){
                $cargo=cargo($user);
                $id=request("id");
                $operation=request("operation") ? request("operation") : null;
                $conn = $GLOBALS["conn"];
                //$s=$conn->prepare("SELECT * FROM post WHERE usuario=?AND privado=0",[$usuario]);
                // unlink(__DIR__ . "/../images/" . p($result)[0]["imagem"]);
                //$s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
                if ($operation){
                    $username=null;
                    $li=$operation=="privado" ? "true" : "false";
                    $case=$li ? "privado | 1" : "privado & ~1"; 
                    $sum=$li=="true" ? -1 : 1;
                    if (($cargo & 2)==2){
                        $conn->prepare("UPDATE post_texto SET privado=$case WHERE id=?",[$id]);
                        $username=p($conn->prepare("SELECT usuario FROM post_texto WHERE id=?",[$id]))[0]["usuario"];
                    } else {
                        $conn->prepare("UPDATE post_texto SET privado=$case WHERE usuario=? AND id=?",[$user,$id]);
                        $username=$user;
                    }
                    $sum_str=$sum== 1 ? " + 1" : " - 1";
                    $conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts" . $sum_str . ",0) WHERE usuario=? ORDER BY id DESC",[$username]);
                    response()->json(["result"=>"true","usuario"=>$user]);
                } else {
                    if (($cargo & 2)==2){
                        delete_texto($conn,$id);
                    } else {
                        delete_texto($conn,$id,$user);
                    }
                    gpa($tipo);
                }
            } else {
                gpa($tipo);
            }
            // $num=$conn->query("SELECT COUNT(*) AS num FROM post WHERE usuario")
        } else {
            r404();
        }
    } else {
        login();
    }
});
Route::post("/admin/videos_cadastro",function(){
    include(__DIR__ . '/../conf/config.php');
    $user=$GLOBALS["user"];
    if ($user){
        $type=$_GET["type"];
        if (request("type")=="info"){
            response()->json([]);
        } else if (request("type")=="option" && isset($_POST["titulo"]) && ($type=="cadastro" || $type=="edit")){
            $isCadastro=$type=="cadastro";
            ["titulo"=>$titulo]=$_POST;
            $video=null;
            $imagem=null;
            $texto=isset($_POST["texto"]) ? $_POST["texto"] : null;
            $conn = $GLOBALS["conn"];
            $id=null;
            $imagem=null;
            $d=null;
            if ($isCadastro){
                $id=intval(p($conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM post_video"))[0]["id"]);
            } else {
                $id=$_POST["id"];
                $result=$conn->prepare("SELECT imagem,d FROM post_video WHERE usuario=? AND id=?",[$user,$id]);
                if ($result->num_rows>0){
                    ["imagem"=>$imagem,"d"=>$d]=p($result)[0];
                } else {
                    return response()->json(["result"=>"false","type"=>"id"]);
                }
            }
            $validImage=false;
            if (($isCadastro || isset($_POST["imagens_edit"]))  && request()->has("imagem")){
                if (mime_content_type(request()->file("imagem")->file["tmp_name"]) === 'image/jpeg'){
                    $validImage=true;
                } else {
                    return response()->json(["result"=>"false","type"=>"mimeType"]);
                }
            }
            if ($isCadastro){
                if (request()->has("video")){
                    $file = request()->file("video");
                    if ($_FILES["video"]["error"] !==  UPLOAD_ERR_INI_SIZE){
                        $duration=shell_exec($GLOBALS["ffprobe_path"] . ' "' . $file->file["tmp_name"] . '" -show_entries format=duration -v quiet -of csv="p=0" 2>&1');
                        if (filter_var($duration, FILTER_VALIDATE_FLOAT) !== false && intval($duration)<61){
                            if (mime_content_type($file->file["tmp_name"]) === 'video/mp4'){
                                $caminhoDestino = __DIR__ . "/../public_html/videos/";
                                $video = $file->getClientOriginalName("mp4");
                                $video =$id . '_v_v_' . $video;
                                $file->createmp4($caminhoDestino,$video);
                            }
                        } else {
                            return response()->json(["result"=>"false","type"=>"time"]);
                        }
                    } else {
                        return response()->json(["result"=>"false","type"=>"size"]);
                    }
                } else {
                    return response()->json(["result"=>"false","type"=>"video"]);
                }
            }
            if ($validImage){
                    $file=request()->file("imagem");
                    $caminhoDestino = __DIR__ . "/../public_html/images/";
                    if ($imagem){
                        unlink($caminhoDestino . $imagem);
                    }
                    $original_format=isset($_POST["original_format"]);
                    // Salvar a imagem em um diretório
                    $imagem = $file->getClientOriginalName("webp");
                    $imagem=(!$original_format ? "r_" : "") . $id . "_v_i_" . $imagem;
                    $file->createwebp($caminhoDestino,$imagem);
                    $img=imagem($caminhoDestino.$imagem);
                    // Agora a imagem foi salva no diretório especificado
            }
            if ($isCadastro){
                $d=get_d();
                $views_id=get_views_id($conn);
                $permission=0;
                $conn->prepare("INSERT INTO post_video(nome,usuario,titulo,texto,video,imagem,acessos,views_id,id,d,privado)
                    SELECT nome, usuario, ? AS titulo, ? AS texto, ? AS video, ? AS imagem, 0 AS acessos, ? AS views_id, ? AS id, ? AS d, (CASE WHEN cargo & 1=1 THEN ? | 8 ELSE ? END) AS privado FROM user WHERE id=?",[$titulo,$texto,$video,$imagem,$views_id,$id,$d,$permission,$permission,$GLOBALS["user_id"]]);
                insert_views($conn,$user,"post_video",$views_id,$id); 
                add_n_posts($user,$conn);
            } else {
                $d=json_decode($d,true);
                $d["a"]=get_updated_date();
                $d=json_encode($d);
                $conn->prepare("UPDATE post_video SET titulo=?,imagem=?,d=? WHERE usuario=? AND id=?",[$titulo,$imagem,$d,$user,$id]);
            }
            response()->json(["result"=>"true","usuario"=>$user]);
        }
    } else {
        login();
    }
});
Route::post("/admin/videos_edit",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn=$GLOBALS["conn"];
        if (request()->query("id")){
            $id=intval(request()->query("id"));
            $result=$conn->prepare("SELECT titulo,video,imagem,id FROM post_video WHERE usuario=? AND id=?",[$usuario,$id]);
            if ($result->num_rows>0){
                response()->json(["result"=>"true","post_edit"=>p($result)]);
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
Route::post("/admin/videos_lista",function(){
    $user=$GLOBALS["user"];
    if ($user){
        $tipo=isset($_POST["tipo"]) ? request("tipo") : "normal";
        $cargo=cargo($user);
        function gpa($type,$cargo,$user){
            $type=isset($_GET["search"]) ? "pesquisa" : "normal";
            $conn=$GLOBALS["conn"];
            $s=null;
            $num=null;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
            $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
            $search = $type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
            if(($cargo & 2)==2){
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,titulo,usuario,acessos,d FROM post_video WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$search,$search,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_video WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$search,$search,$search,$search]);  
                } else {
                    $s=$conn->query("SELECT id,titulo,usuario,acessos,d FROM post_video ORDER BY id DESC LIMIT $n,10");
                    $num=$conn->query("SELECT COUNT(*) AS num FROM post_video");
                }
            } else {
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,titulo,acessos,d FROM post_video WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$user,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_video WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?)",[$user,$search]);
                } else {
                    $s=$conn->prepare("SELECT id,titulo,acessos,d FROM post_video WHERE usuario=? ORDER BY id DESC LIMIT $n,10",[$user]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_video WHERE usuario=?",[$user]);

                }
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["result"=>"true","posts"=>$r,"n_registros"=>$num,"usuario"=>$user]);
        }
        if (request("type")=="info"){
            // $conn = $GLOBALS["conn"];
            // $result=$conn->prepare("SELECT * FROM post_24 WHERE usuario=? ORDER BY id DESC",[$usuario]);
            // $r=p($result);
            // response()->json(["usuairo"=>$r,"noticias"=>$r,"n_registros"=>$result->num_rows]);
            gpa($tipo,$cargo,$user);
        } else if (request("type")=="option"){
            if ($tipo=="normal"){
                $requested_user;
                $cargo=$GLOBALS["cargo"];
                $id=request("id");
                $operation=request("operation") ? request("operation") : null;
                $conn = $GLOBALS["conn"];
                if ($operation){
                    $li=$operation=="privado";
                    $case=($GLOBALS["cargo"] & 2)==2 ? ($li ? "privado | 4" : "privado & ~4") : ($li ? "privado | 1" : "privado & ~1"); 
                    $sum=$li ? -1 : 1;
                    if (($cargo & 2)==2){
                        $result=$conn->prepare("UPDATE post_video SET privado=$case WHERE id=?",[$id]);
                        $requested_user=p($conn->prepare("SELECT usuario FROM post_video WHERE id=?",[$id]))[0]["usuario"];
                    } else {
                        $result=$conn->prepare("UPDATE post_video SET privado=$case WHERE usuario=? AND id=?",[$user,$id]);
                        $requested_user=$user;
                    }
                    $sum_str=$sum== 1 ? " + 1" : " - 1";
                    $s=$conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts" . $sum_str . ",0) WHERE usuario=? ORDER BY id DESC",[$requested_user]);
                    response()->json(["result"=>"true","usuario"=>$user]);
                } else {
                    if (($cargo & 2)==2){
                        delete_video($conn,$id);
                    } else {
                        delete_video($conn,$id,$usuario);
                    }
                    gpa($tipo);
                }
            } else {
                gpa($tipo);
            }
        }
    } else {
        login();
    }
});
Route::post("/admin/playlists_cadastro",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $type=request("type");
        if ($type=="info"){
            $conn=$GLOBALS["conn"];
            $data_type=request("data_type");
            $valid_types=["post","post_imagem","post_musica"];
            if (in_array($data_type,$valid_types)){
                $result=null;
                $titulo=$data_type=="post_imagem" ? "descricao" : "titulo";
                $search=$_GET["search"];
                if ($search!=""){
                    $search="%". $search . "%";
                    if ($data_type=="post" || $data_type=="post_imagem"){
                        $result=p($conn->prepare("SELECT id,$titulo FROM $data_type WHERE usuario=? AND privado=0 AND LOWER($titulo) LIKE LOWER(?)",[$usuario,$search]));
                    } else {
                        $result=p($conn->prepare("SELECT id,titulo FROM $data_type WHERE usuario=? AND privado=0 AND LOWER($titulo) LIKE LOWER(?)",[$usuario,$search]));
                    }
                } else {
                    if ($data_type=="post" || $data_type=="post_imagem"){
                        $result=p($conn->prepare("SELECT id,$titulo AS titulo FROM $data_type WHERE usuario=? AND privado=0",[$usuario]));
                    } else {
                        $result=p($conn->prepare("SELECT id,titulo FROM $data_type WHERE usuario=? AND privado=0",[$usuario]));
                    }
                }
                response()->json(["result"=>"true","posts"=>$result]);
            } else {
                response()->json(["result"=>"false"]);
            }
        } else if ($type=="cadastro"){
            if (request("titulo")){
                $conn=$GLOBALS["conn"];
                $data_type=request("data_type");
                $valid_types=["post","post_imagem","post_musica"];
                if (in_array($data_type,$valid_types)){
                    $posts=json_decode(request("posts"));
                    $list_posts=to_list($posts);
                    $num=p($conn->prepare("SELECT COUNT(*) AS num FROM $data_type WHERE id IN ($list_posts) AND usuario=?",[$usuario]))[0]["num"];
                    if ($num==count($posts)){
                        $titulo=request("titulo");
                        $d=get_d();
                        $posts=json_encode($posts);
                        $views_id=get_views_id($conn);
                        $id=intval(p($conn->query("SELECT COALESCE(MAX(id)+1,1) AS id FROM playlist"))[0]["id"]);
                        $conn->prepare("INSERT INTO playlist(usuario,views_id,id,titulo,d,tipo,posts) VALUES(?,?,?,?,?,?,?)",[$usuario,$views_id,$id,$titulo,$d,$data_type,$posts]);
                        insert_views($conn,$usuario,"playlist",$views_id,$id);
                        add_n_posts($usuario,$conn);
                        response()->json(["result"=>"true"]);
                    } else {
                    response()->json(["result"=>"false"]);
                    }
                } else {
                    response()->json(["result"=>"false"]);
                }
            }
        } else if ($type=="add"){

        } else {
            response()->json(["result"=>"false"]);
        }
    } else {
        login();
    }
});
Route::post("/admin/playlists_lista",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $tipo=isset($_POST["tipo"]) ? request("tipo") : "normal";
        function gpa($type){
            $type=isset($_GET["search"]) ? "pesquisa" : "normal";
            $usuario=$GLOBALS["user"];
            $cargo=$GLOBALS["cargo"];
            $conn=$GLOBALS["conn"];
            $s=null;
            $num=null;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
            $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
            $search=$type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
            if (($cargo & 2)==2){
                if ($type=="pesquisa"){
                    $nomes=p($conn->prepare("SELECT usuario FROM user WHERE LOWER(nome) LIKE LOWER(?)",[$search]));
                    $list2=[];
                    foreach ($nomes as $nome){
                        $list2[]="'" . $nome["usuario"] . "'";
                    }
                    $list="";
                    if (count($list2)>1){
                        $list=implode(",",$list2);
                    } else if (count($list2)==1){
                        $list=$list2[0];
                    }
                    $s=$conn->prepare("SELECT * FROM playlist WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$search,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM playlist WHERE LOWER(titulo) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || usuario IN ($list) || LOWER(d) LIKE LOWER(?)",[$search,$search,$search]);
                } else {
                    $s=$conn->query("SELECT * FROM playlist ORDER BY id DESC LIMIT $n,10");
                    $num=$conn->query("SELECT COUNT(*) AS num FROM playlist");
                }
            } else {
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT * FROM playlist WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$usuario,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM playlist WHERE usuario=? AND LOWER(titulo) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$usuario,$search,$search]);
                } else {
                    $s=$conn->prepare("SELECT * FROM playlist WHERE usuario=? ORDER BY id DESC LIMIT $n,10",[$usuario]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM playlist WHERE usuario=?",[$usuario]);
                }
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["result"=>"true","posts"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
        if (request("type")=="info"){
            gpa($tipo);
        } else if (request("type")=="option"){
            if ($tipo=="normal"){
                $cargo=$GLOBALS["cargo"];
                $conn=$GLOBALS["conn"];
                $id=request("id");
                if (($cargo & 2)==2){
                    delete_playlist($conn);                
                } else {
                    delete_playlist($conn,$user);
                }
                gpa($tipo);
            } else {
                gpa($tipo);
            }
        } else {
            r404();
        }
    } else {
        login();
    }
});
Route::post("/admin/products_cadastro", function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $type=$_GET["type"];
        if (request("type")!="get"){
            $cargo=$GLOBALS["cargo"];
            if (($cargo & 2)==2){
                r404();
            } else if ($type=="cadastro" || $type=="edit"){
                $isCadastro=$type=="cadastro";
                $conn = $GLOBALS["conn"];
                // if (!session()->has("key")) return;
                $dados=request()->all();
                // if (strlen($titulo)==0) return;
                $acessos=0;
                $imagem=null;
                $original_format=isset($dados["original_format"]);
                $id=$isCadastro ? null : $dados["id"];
                $descricao=isset($dados["descricao"]) ? $dados["descricao"] : null;
                // $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT, acessos INT, id INT)");
                $id=null;
                $imagem=null;
                $d=null;
                if ($isCadastro){
                    $id=intval(p($conn->query("SELECT COALESCE(MAX(id) + 1, 1) AS id FROM post_product"))[0]["id"]);
                } else {
                    $id=$_POST["id"];
                    $result=$conn->prepare("SELECT imagem,d FROM post_product WHERE usuario=? AND id=?",[$usuario,$id]);
                    if ($result->num_rows>0){
                        ["imagem"=>$imagem,"d"=>$d]=p($result)[0];
                    } else {
                        return response()->json(["result"=>"false","type"=>"id"]);
                    }
                }
                if (($isCadastro || isset($dados["imagens_edit"])) && request()->has("imagem")) {
                    $caminhoDestino = __DIR__ . "/../public_html/images/";
                    if ($imagem){
                        unlink($caminhoDestino . $imagem);
                    }
                    $file = request()->file("imagem");
                    // Salvar a imagem em um diretório
                    $imagem = $file->getClientOriginalName("webp");
                    $imagem=$id . "_i_" . $imagem;
                    $file->createwebp($caminhoDestino,$imagem);
                    $img=imagem($caminhoDestino.$imagem);
                    if ($original_format){
                        $img->resize(null,720);
                    } else {
                        $img->resize(1280,720);
                    }
                } else {
                    if ($isCadastro){
                        return response()->json(["result"=>"false","type"=>"image"]);
                    }
                }
                if ($isCadastro){
                    $conn = $GLOBALS["conn"];
                    $d=get_d();
                    $views_id=get_views_id($conn);
                    $permission=0;
                    $conn->prepare("INSERT INTO post_product(nome,usuario,descricao,imagem,acessos,views_id,id,d,privado) 
                        SELECT nome, usuario, ? AS descricao, ? AS imagem, ? AS acessos, ? AS views_id, ? AS id, (CASE WHEN cargo & 1=1 THEN ? | 8 ELSE ? END) AS privado FROM user WHERE id=?",[$nome,$usuario,$descricao,$imagem,$acessos,$views_id,$id,$d,$permission,$permission,$GLOBALS["user"]]);
                    insert_views($conn,$usuario,"post_product",$views_id,$id);
                    add_n_posts($usuario,$conn);
                } else {
                    $d=json_decode($d,true);
                    $d["a"]=get_updated_date();
                    $d=json_encode($d);
                    $conn->prepare("UPDATE post_product SET descricao=?,imagem=?,d=? WHERE usuario=? AND id=?",[$descricao,$imagem,$d,$usuario,$id]);
                }
                response()->json(["result"=>"true","usuario"=>$usuario]);
            }
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/noticias_cadastro/main.html'));
        }
    }else{
        login();
    }
});
Route::post("/admin/products_edit",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $id=request()->query("id");
        $id=intval($id);
        $conn=$GLOBALS["conn"];
        $result=null;
        if ($GLOBALS["cargo"]=="admin"){
            $result=$conn->prepare("SELECT imagem,descricao,id FROM post_product WHERE id=? AND privado=0",[$id]);
        } else {
            $result=$conn->prepare("SELECT imagem,descricao,id FROM post_product WHERE id=? AND usuario=? AND privado=0",[$id,$usuario]);
        }
        if ($result->num_rows>0){
            $result=p($result)[0];
            response()->json(["result"=>"true","post_edit"=>$result]);
        } else {
            r404();
        }
    } else {
        r404();
    }
});
Route::post("/admin/products_lista",function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $tipo=isset($_POST["tipo"]) ? request("tipo") : "normal";
        function gpa($type){
            $type=isset($_GET["search"]) ? "pesquisa" : "normal";
            $usuario=$GLOBALS["user"];
            $cargo=$GLOBALS["cargo"];
            $conn=$GLOBALS["conn"];
            $s=null;
            $num=null;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
            $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
            $search=$type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
            if(($cargo & 2)==2){
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,descricao AS titulo,usuario,acessos,privado,d FROM post_product WHERE LOWER(descricao) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$search,$search,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_product WHERE LOWER(descricao) LIKE LOWER(?) || LOWER(nome) LIKE LOWER(?) || LOWER(usuario) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$search,$search,$search,$search]);
                } else {
                    $s=$conn->query("SELECT id,descricao AS titulo,usuario,acessos,privado,d FROM post_product ORDER BY id DESC LIMIT $n,10");
                    $num=$conn->query("SELECT COUNT(*) AS num FROM post_product");
                }
            } else {
                if ($type=="pesquisa"){
                    $s=$conn->prepare("SELECT id,descricao AS titulo,acessos,d,privado FROM post_product WHERE usuario=? AND LOWER(descricao) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?) ORDER BY id DESC LIMIT $n,10",[$usuario,$search,$search]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_product WHERE usuario=? AND LOWER(descricao) LIKE LOWER(?) || LOWER(d) LIKE LOWER(?)",[$usuario,$search,$search]);
                } else {
                    $s=$conn->prepare("SELECT id,descricao AS titulo,acessos,d,privado FROM post_product WHERE usuario=? ORDER BY id DESC LIMIT $n,10",[$usuario]);
                    $num=$conn->prepare("SELECT COUNT(*) AS num FROM post_product WHERE usuario=?",[$usuario]);
                }
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["result"=>"true","posts"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
        if (request("type")=="info"){
            gpa($tipo);
        } else if (request("type")=="option"){
            if ($tipo=="normal"){
                $cargo=$GLOBALS["cargo"];
                $id=request("id");
                $operation=request("operation") ? request("operation") : null;
                $conn = $GLOBALS["conn"];
                //$s=$conn->prepare("SELECT * FROM post WHERE usuario=?AND privado=0",[$usuario]);
                // unlink(__DIR__ . "/../images/" . p($result)[0]["imagem"]);
                //$s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
                if ($operation){
                    $user=null;
                    $li=$operation=="privado";
                    $case=$li ? "privado | 1" : "privado & ~1"; 
                    $sum=$li ? -1 : 1;
                    if (($cargo & 2)==2){
                        $result=$conn->prepare("UPDATE post_product SET privado=$case WHERE id=?",[$id]);
                        $user=p($conn->prepare("SELECT usuario FROM post_product WHERE id=?",[$id]))[0]["usuario"];
                    } else {
                        $result=$conn->prepare("UPDATE post_product SET privado=$case WHERE usuario=? AND id=?",[$usuario,$id]);
                        $user=$usuario;
                    }
                    $sum_str=$sum== 1 ? " + 1" : " - 1";
                    $s=$conn->prepare("UPDATE user SET n_posts=COALESCE(n_posts" . $sum_str . ",0) WHERE usuario=? ORDER BY id DESC",[$user]);
                    response()->json(["result"=>"true","usuario"=>$usuario]);
                } else {
                    if (($cargo & 2)==2){
                        delete_imagem($conn,$id);
                    } else {
                        delete_imagem($conn,$id,$usuario);
                    }
                    gpa($tipo);
                }
            } else {
                gpa($tipo);
            }
            // $num=$conn->query("SELECT COUNT(*) AS num FROM post WHERE usuario")
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/noticias_lista/admin.html'));
        }
    } else {
        login();
    }
    // return view("admin.noticias_lista.index",compact("r","usuario","cargo"));
});
Route::post('/admin/destaque',function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn=$GLOBALS["conn"];
        $tipo=request("tipo");
        $tipos=["geral","materia","imagem","musica","texto","video","playlist"];
        if (request("type")=="info"){
            $result=$conn->prepare("SELECT * FROM destaques WHERE usuario=?",[$usuario]);
            if ($result->num_rows>0){
                $result2=p($result);
                $result=$result2[0];
                $name=$result["geral_tipo"];
                $image_column=$name=="post_texto" ? "JSON_ARRAY(texto,'t')" : "imagem";
                $geral_select=null;
                $values=null;
                if (intval($result["geral"]==-1)){
                    $geral_select="NULL AS geral,";
                    $values=[$result["post"],$usuario,$result["post_imagem"],$usuario,$result["post_musica"],$usuario,$result["post_texto"],$usuario,$result["post_video"],$usuario,$usuario,$usuario,$usuario,$usuario,$usuario,$result["playlist"],$usuario];
                } else {
                    $geral_select="(SELECT $image_column AS geral FROM $name WHERE views_id=? AND privado=0 AND usuario=?) AS geral,";    
                    $values=[$result["geral"],$usuario,$result["post"],$usuario,$result["post_imagem"],$usuario,$result["post_musica"],$usuario,$result["post_texto"],$usuario,$result["post_video"],$usuario,$usuario,$usuario,$usuario,$usuario,$usuario,$result["playlist"],$usuario];
                }
                $result=p($conn->prepare("SELECT
                        (SELECT imagem AS materia FROM post WHERE views_id=? AND privado=0 AND usuario=?) AS materia,
                        (SELECT JSON_UNQUOTE(JSON_EXTRACT(imagem, '$[0]')) AS imagem FROM post_imagem WHERE views_id=? AND privado=0 AND usuario=?) AS imagem,
                        (SELECT imagem AS musica FROM post_musica WHERE views_id=? AND privado=0 AND usuario=?) AS musica,
                        (SELECT JSON_ARRAY(texto,'t') AS texto FROM post_texto WHERE views_id=? AND privado=0 AND usuario=?) AS texto,
                        (SELECT imagem AS video FROM post_video WHERE views_id=? AND privado=0 AND usuario=?) AS video,
                        (SELECT CASE 
                            WHEN p.tipo='post' THEN (SELECT imagem FROM post WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                            WHEN p.tipo='post_imagem' THEN (SELECT JSON_UNQUOTE(JSON_EXTRACT(imagem, '$[0]')) AS imagem FROM post_imagem WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                            WHEN p.tipo='post_musica' THEN (SELECT imagem FROM post_musica WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                            WHEN p.tipo='post_texto' THEN (SELECT JSON_ARRAY(texto,'t') AS imagem FROM post_texto WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                            ELSE (SELECT imagem FROM post_video WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                        END AS playlist FROM playlist p WHERE views_id=? AND privado=0 AND usuario=?) AS playlist
                    FROM post LIMIT 1",$values))[0];
                $destaques=[];
                foreach($result as $chave=>$valor){
                    $destaques[$chave]=["src"=>$valor];
                }
                response()->json(["result"=>"true","response"=>"true","destaques"=>$destaques]);
            } else {
                response()->json(["result"=>"true","response"=>"false"]);
            }
        } else if (in_array($tipo,$tipos) && request("type")=="search"){
            $search="%" . request()->query("search") . "%";
            $result=null;
            if ($tipo=="geral"){
                $result=p($conn->prepare("SELECT views_id AS id,id_post,titulo,tipo FROM (
                    (SELECT views_id,id AS id_post,titulo,'p' AS tipo FROM post WHERE privado=0 AND LOWER(titulo) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48)
                    UNION
                    (SELECT views_id,id AS id_post,descricao AS titulo,'i' AS tipo FROM post_imagem WHERE privado=0 AND LOWER(descricao) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48)
                    UNION
                    (SELECT views_id,id AS id_post,titulo,'m' AS tipo FROM post_musica WHERE privado=0 AND LOWER(titulo) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48) 
                    UNION
                    (SELECT views_id,id AS id_post,texto AS titulo,'t' AS tipo FROM post_texto WHERE privado=0 AND LOWER(texto) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48) 
                    UNION
                    (SELECT views_id,id AS id_post,titulo,'v' AS tipo FROM post_video WHERE privado=0 AND LOWER(titulo) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48) 
                ) AS result ORDER BY views_id DESC LIMIT 48",[$search,$usuario,$search,$usuario,$search,$usuario,$search,$usuario,$search,$usuario]));
            } else if ($tipo=="materia"){
                $result=p($conn->prepare("SELECT views_id AS id,id AS id_post,titulo,'p' AS tipo FROM post WHERE privado=0 AND LOWER(titulo) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48",[$search,$usuario]));
            } else if ($tipo=="imagem"){
                $result=p($conn->prepare("SELECT views_id AS id,id AS id_post,descricao,'t' AS tipo AS titulo FROM post_imagem WHERE privado=0 AND LOWER(descricao) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48",[$search,$usuario]));
            } else if ($tipo=="musica"){
                $result=p($conn->prepare("SELECT views_id AS id,id AS id_post,titulo,'m' AS tipo FROM post_musica WHERE privado=0 AND LOWER(titulo) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48",[$search,$usuario]));
            } else if ($tipo=="texto"){
                $result=p($conn->prepare("SELECT views_id AS id,id AS id_post,texto AS titulo,'t' AS tipo FROM post_texto WHERE privado=0 AND LOWER(texto) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48",[$search,$usuario]));
            } else if ($tipo=="video"){
                $result=p($conn->prepare("SELECT views_id AS id,id AS id_post,titulo,'v' AS tipo FROM post_video WHERE privado=0 AND LOWER(titulo) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48",[$search,$usuario]));
            } else if ($tipo=="playlist"){
                $result=p($conn->prepare("SELECT views_id AS id,id AS id_post,titulo,'pl' AS tipo FROM playlist WHERE privado=0 AND LOWER(titulo) LIKE LOWER(?) AND usuario=? ORDER BY id DESC LIMIT 48",[$search,$usuario]));
            }
            response()->json(["result"=>"true","noticias"=>$result]);
        } else if (in_array($tipo,$tipos) && request("type")=="option"){
            // saida para entrada de tipos
            $options=["geral"=>"geral","materia"=>"post","imagem"=>"post_imagem","musica"=>"post_musica","texto"=>"post_texto","video"=>"post_video","playlist"=>"playlist"];
            $tipo=request("tipo");
            // verifica se tem tipo na requisição
            if (isset($options[$tipo])){
                $option=$options[$tipo];
                $id=intval(request("id"));
                $tipo=request("tipo");
                $result=$conn->prepare("SELECT tipo FROM views WHERE id=? AND usuario=? AND excluido='false'",[$id,$usuario]);
                if ($result->num_rows>0){
                    $result=p($result)[0];
                    // caso exista o id recebido no banco e o tipo dele seja o mesmo tipo do recebido
                    $name=$option=="geral" || $option==$result["tipo"] ? $result['tipo'] : null;
                    if ($name){ 
                        $result=$conn->prepare("SELECT usuario FROM destaques WHERE usuario=?",[$usuario]);
                        // veriica se o usuario já em um destaque
                        if ($name=="playlist"){
                            $src=p($conn->prepare("SELECT CASE 
                                WHEN p.tipo='post' THEN (SELECT imagem FROM post WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                                WHEN p.tipo='post_imagem' THEN (SELECT JSON_UNQUOTE(JSON_EXTRACT(imagem, '$[0]')) AS imagem FROM post_imagem WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                                WHEN p.tipo='post_musica' THEN (SELECT imagem FROM post_musica WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                                WHEN p.tipo='post_texto' THEN (SELECT NULL AS imagem FROM post_texto WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                                ELSE (imagem FROM post_video WHERE id=CAST(REPLACE(JSON_EXTRACT(p.posts,'$[0]'),'\\\"','') AS UNSIGNED) AND privado=0 AND usuario=?)
                            END AS imagem FROM playlist p WHERE views_id=? AND privado=0 AND usuario=?",[$usuario,$usuario,$usuario,$usuario,$usuario,$id,$usuario]))[0];
                        } else {
                            $image_column=$name=="post_texto" ? "JSON_ARRAY(texto,'t')" : "imagem";
                            $src=p($conn->prepare("SELECT $image_column AS imagem FROM $name WHERE privado=0 AND views_id=? AND usuario=?",[$id,$usuario]))[0];
                        }
                        $src=$src["imagem"];
                        if ($result->num_rows>0){
                            if ($tipo!="geral"){
                                $conn->prepare("UPDATE destaques SET " . $name . "=? WHERE usuario=?",[$id,$usuario]);
                            } else {
                                $conn->prepare("UPDATE destaques SET geral=?,geral_tipo=? WHERE usuario=?",[$id,$name,$usuario]);
                            }
                            response()->json(["result"=>"true","destaque"=>["id"=>$id,"src"=>$src]]);                    
                        } else {
                            $inputs=["geral"=>-1,"materia"=>-1,"imagem"=>-1,"musica"=>-1,"texto"=>-1,"video"=>-1,"playlist"=>-1];
                            $inputs[$tipo]=$id;
                            $geral_tipo=$tipo=="geral" ? $name : "";
                            $conn->prepare("INSERT INTO destaques(usuario,geral,geral_tipo,post,post_imagem,post_musica,post_texto,post_video,playlist) VALUES(?,?,?,?,?,?,?,?,?)",[$usuario,$inputs["geral"],$geral_tipo,$inputs["materia"],$inputs["imagem"],$inputs["musica"],$inputs["texto"],$inputs["video"],$inputs["playlist"]]);
                            response()->json(["result"=>"true","destaque"=>["id"=>$id,"src"=>$src]]);                    
                            // $inputs[$tipo]=
                        }
                    } else {
                        response()->json(["result"=>"false"]);
                    }
                } else {    
                    response()->json(["result"=>"false"]);
                }
            } else {    
                response()->json(["result"=>"false"]);
            }
        } else if (in_array($tipo,$tipos) && request("type")=="disable"){
            $options=["geral"=>"geral","materia"=>"post","imagem"=>"post_imagem","musica"=>"post_musica","texto"=>"post_texto","video"=>"post_video"];
            $conn->prepare("UPDATE destaques SET " . $options[$tipo] . "=-1 WHERE usuario=?",[$usuario]);
            response()->json(["result"=>"true"]);
        } else {
            response()->json(["result"=>"false"]);
        }
    } else {
        login();
    }
});
Route::post('/admin/description',function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn=$GLOBALS["conn"];
        if (request("type")=="info"){
            $description=$conn->prepare("SELECT descricao FROM descricao WHERE usuario=?",[$usuario]);
            if ($description->num_rows>0){
                $description=p($description)[0]["descricao"];
            } else {
                $conn->prepare("INSERT INTO descricao(usuario,descricao) VALUES(?,?)",[$usuario,""]);
                $description="";
            }
            response()->json(["result"=>"true","description"=>$description]);
        } else if (request("type")=="update"){
            $description=$_POST["description"];
            $conn->prepare("UPDATE descricao SET descricao=? WHERE usuario=?",[$description,$usuario]);
            response()->json(["result"=>"true"]);
        }
    } else {
        login();
    }
});
Route::post('/admin/card',function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn=$GLOBALS["conn"];
        if (request("type")=="info"){
            $card=$conn->prepare("SELECT links,titles,descriptions FROM card WHERE usuario=?",[$usuario]);
            if ($card->num_rows>0){
                $card=p($card)[0];
                $card=["links"=>json_decode($card["links"]),"titles"=>json_decode($card["titles"]),"descriptions"=>json_decode($card["descriptions"])];
            } else {
                $conn->prepare("INSERT INTO card(usuario,links,titles,descriptions) VALUES(?,?,?,?)",[$usuario,"[]","[]","[]"]);
                $card=["links"=>[],"titles"=>[],"descriptions"=>[]];
            }
            response()->json(["result"=>"true","card"=>json_encode($card)]);
        } else if (request("type")=="update"){
            $links=json_decode($_POST["links"]);
            $titles=$_POST["titles"];
            $descriptions=[];
            foreach($links as $link){
                $ch = curl_init();
        
                // Configurações de cURL
                curl_setopt($ch, CURLOPT_URL, $link);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_TIMEOUT, 3); // Tempo limite de 10 segundos
        
                // Executa a requisição e obtém o conteúdo
                $html = curl_exec($ch);
                if (curl_errno($ch) || empty($html)) {
                    $descriptions[$link]="";
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
                            $descriptions[$link]=$titleNodes->item(0)->textContent;
                        } else {
                            $descriptions[$link]="";
                        }
                    } catch (Exception $e){
                        $descriptions[$link]="";
                    }
                }
                curl_close($ch);
            }  
            $conn->prepare("UPDATE card SET links=?,titles=?,descriptions=? WHERE usuario=?",[json_encode($links),$titles,json_encode($descriptions),$usuario]);
            $card=["links"=>$links,"titles"=>json_decode($titles),"descriptions"=>$descriptions];
            response()->json(["result"=>"true","card"=>json_encode($card)]);
        }
    } else {
        login();
    }
});
Route::post('/admin/views',function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        $conn=$GLOBALS["conn"];
        if (request("type")=="info"){
            $result=p($conn->prepare("SELECT views FROM user WHERE usuario=?",[$usuario]))[0];
            response()->json(["result"=>"true","response"=>$result["views"]]);
        } else if (request("type")=="option"){
            $conn->prepare("UPDATE user SET views=? WHERE usuario=?",[request("value")=="true" ? "true" : "false",$usuario]);
            response()->json(["result"=>"true"]);
        }
    } else {
        login();
    }
});
Route::post('/admin/account',function(){
    $usuario=$GLOBALS["user"];
    if ($usuario){
        if (request("type")=="info"){
            $conn=$GLOBALS["conn"];
            $result=p($conn->prepare("SELECT * FROM user WHERE usuario=?",[$usuario]))[0];
            $nome=$result["nome"];
            $usuario=$result["usuario"];
            $senha=strlen($result["senha"]);
            response()->json(["nome"=>$nome,"usuario"=>$usuario,"senha"=>$senha]);
        } else {
            $conn=$GLOBALS["conn"];
            $result=p($conn->prepare("SELECT senha FROM user WHERE usuario=?",[$usuario]))[0];
            $senha_atual=$result["senha"];
            $dados=request()->all();
            $type=$dados["tipo"];
            $senha=$dados["senha_inserida"];
            if ($type=="trocar_nome"){
                $novo_nome=$dados["nome"];
                if ($senha_atual==$senha){
                    $conn->prepare("UPDATE post_24 SET nome=? WHERE usuario=?",[$novo_nome,$usuario]);
                    $conn->prepare("UPDATE post SET nome=? WHERE usuario=?",[$novo_nome,$usuario]);
                    $conn->prepare("UPDATE post_imagem SET nome=? WHERE usuario=?",[$novo_nome,$usuario]);
                    $conn->prepare("UPDATE post_texto SET nome=? WHERE usuario=?",[$novo_nome,$usuario]);
                    $conn->prepare("UPDATE post_video SET nome=? WHERE usuario=?",[$novo_nome,$usuario]);
                    $conn->prepare("UPDATE user SET nome=? WHERE usuario=?",[$novo_nome,$usuario]);
                    response()->json(["result"=>"true","nome"=>$novo_nome,"usuario"=>$usuario]);
                } else {
                    response()->json(["result"=>"false"]);
                }
            } else if ($type=="trocar_usuario"){
                $novo_usuario=$dados["usuario"];
                if ($senha_atual==$senha){
                    $result=$conn->prepare("SELECT usuario FROM user WHERE usuario=?",[$novo_usuario]);
                    if ($result->num_rows==0){
                        $conn->prepare("UPDATE post_24 SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE post SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE post_imagem SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE post_musica SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE post_texto SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE post_video SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE playlist SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);

                        $conn->prepare("UPDATE comment SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        // $registros=p($conn->prepare("SELECT id,acessos_d FROM views WHERE acessos_d LIKE ?",[$like_usuario]));
                        // function substituirValorNoJSON($json, $valorAntigo, $novoValor) {
                        //     array_walk_recursive($json, function (&$item) use ($valorAntigo, $novoValor) {
                        //         if ($item === $valorAntigo) {
                        //             $item = $novoValor;
                        //         }
                        //     });
                        //     return $json;
                        // }
                        // foreach ($registros as $registro) {
                        //     $id = $registro['id'];
                        //     $jsonOriginal = json_decode($registro["acessos_d"], true);
                            
                        //     // Substituir os valores no JSON
                        //     $jsonModificado = substituirValorNoJSON($jsonOriginal, $usuario, $novo_usuario);

                        //     $conn->prepare("UPDATE views SET acessos_d=? WHERE id=?",[json_encode($jsonModificado),$id]);
                        // }

                        // atualiza qualquer valor de chave para o nome do novo usuario em que o nome de usuário antigo esteja presente;
                        // pois o valor de um json começa com ':"' e termina com '"';
                        $conn->prepare("UPDATE views SET d2=REPLACE(d2,?,?) WHERE d2 LIKE(?)",[':"' . $usuario . '"',':"' . $novo_usuario . '"','%:"' . $usuario . '"%']);
                        // Função para substituir valores no JSON
                        $conn->prepare("UPDATE views SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->query("UPDATE inscritos SET inscritos = 
                        JSON_SET(inscritos, '$.{$novo_usuario}',
                        JSON_EXTRACT(inscritos, '$.{$usuario}')), inscritos = JSON_REMOVE(inscritos,'$.{$usuario}')  
                        WHERE JSON_UNQUOTE(JSON_EXTRACT(inscritos, '$.{$usuario}')) IS NOT NULL"
                        );
                        // $conn->query("UPDATE inscritos SET inscritos = 
                        // JSON_SET(inscritos, '$.{$novo_usuario}',
                        // JSON_EXTRACT(inscritos, '$.{$usuario}')), inscritos = JSON_REMOVE(inscritos,'$.{$usuario}')  
                        // WHERE JSON_UNQUOTE(JSON_EXTRACT(inscritos, '$.{$usuario}')) IS NOT NULL"
                        // );
                        $conn->prepare("UPDATE inscritos SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->query("UPDATE user SET inscritos = 
                        JSON_SET(inscritos, '$.{$novo_usuario}',
                        JSON_EXTRACT(inscritos, '$.{$usuario}')), inscritos = JSON_REMOVE(inscritos,'$.{$usuario}')  
                        WHERE JSON_UNQUOTE(JSON_EXTRACT(inscritos, '$.{$usuario}')) IS NOT NULL"
                        );
                        // $conn->prepare("UPDATE chat c SET usuarios=JSON_REPLACE(
                        //     c.usuarios,
                        //     JSON_SEARCH(c.usuarios, 'one', CONCAT('\"',REPLACE(?, '\"', '\\\"'),'\"')),
                        //     ?
                        // ) WHERE JSON_CONTAINS(usuarios,CONCAT('\"',REPLACE(?, '\"', '\\\"'),'\"'),'$')",[$usuario,$novo_usuario,$usuario]);
                        // $t=$conn->prepare("SELECT JSON_SEARCH(usuarios, 'one', CONCAT('\"',REPLACE(?, '\"', '\\\"'),'\"')) AS r FROM chat WHERE JSON_CONTAINS(usuarios,CONCAT('\"',REPLACE(?, '\"', '\\\"'),'\"'),'$')",[$usuario,$usuario]);

                        // $t=$conn->prepare("SELECT  
                        //     CASE WHEN JSON_UNQUOTE(JSON_EXTRACT(usuarios,'$[0]'))=? 
                        //     THEN JSON_ARRAY(?,JSON_UNQUOTE(JSON_EXTRACT(usuarios,'$[1]'))) 
                        //     ELSE JSON_ARRAY(JSON_UNQUOTE(JSON_EXTRACT(usuarios,'$[0]')),?) 
                        //     END AS t FROM chat WHERE JSON_CONTAINS(usuarios,CONCAT('\"',REPLACE(?, '\"', '\\\"'),'\"'),'$')
                        // ",[$usuario,$novo_usuario,$novo_usuario,$usuario]);

                        $conn->prepare("UPDATE chat SET usuarios=CASE 
                            WHEN JSON_UNQUOTE(JSON_EXTRACT(usuarios,'$[0]'))=? 
                            THEN JSON_ARRAY(?,JSON_UNQUOTE(JSON_EXTRACT(usuarios,'$[1]'))) 
                            ELSE JSON_ARRAY(JSON_UNQUOTE(JSON_EXTRACT(usuarios,'$[0]')),?) 
                             END WHERE JSON_CONTAINS(usuarios,CONCAT('\"',REPLACE(?, '\"', '\\\"'),'\"'),'$')
                        ",[$usuario,$novo_usuario,$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE user SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE payments SET user=? WHERE user=?",[$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE mensagem SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        $conn->prepare("UPDATE historico SET usuario=? WHERE usuario=?",[$novo_usuario,$usuario]);
                        set_cookie("token",$novo_usuario);
                        response()->json(["result"=>"true","usuario"=>$novo_usuario,"token"=>"token"]);
                    } else {
                        response()->json(["result"=>"false"]);
                    }
                } else {
                    response()->json(["result"=>"false"]);
                }
            } else if ($type=="trocar_senha"){
                $nova_senha=$dados["senha"];
                if ($senha_atual==$senha){
                    $conn->prepare("UPDATE user SET senha=? WHERE usuario=?",[$nova_senha,$usuario]);
                    response()->json(["result"=>"true","senha"=>strlen($nova_senha)]);
                } else {
                    response()->json(["result"=>"false"]);
                }
            } else if ($type=="excluir_conta"){
                $nome_usuario=$dados["conta"];
                if ($senha_atual==$senha && $nome_usuario==$usuario){
                    delete_account(false,$usuario);
                } else {
                    response()->json(["result"=>"false"]);
                }
            }
        }
    } else {
        login();
    }
});
Route::post("/admin/premium",function(){
    $user=$GLOBALS["user"];
    if ($user){
        if (isset($_POST["type"])){
            $type=$_POST["type"];
            if ($type=="active_license"){
                $conn=$GLOBALS["conn"];
                if (isset($_POST["license"])){
                    $license=$_POST["license"];
                    if (jwt_verify($license)){
                        $result=$conn->prepare("SELECT license,cargo FROM payments WHERE license=? AND used=0 AND valid=1",[$license]);
                        if ($result->num_rows>0){
                            $cargo=p($result)[0]["cargo"];
                            $conn->prepare("UPDATE payments SET used=1, user=? WHERE license=?",[$user,$license]);
                            $conn->prepare("UPDATE user SET cargo=? WHERE usuario=?",[$cargo,$user]);
                            response()->json(["result"=>"true","active_license"=>"true","cargo"=>$cargo]);
                        } else {
                            response()->json(["result"=>"true","active_license"=>"false"]);
                        } 
                    } else {
                        response()->json(["result"=>"true","active_license"=>"false"]);
                    } 
                } else {
                    response()->json(["result"=>"false"]);
                }
            } else {
                response()->json(["result"=>"false"]);
            }
        }
    } else {
        login();
    }
});
Route::post("/admin/users",function(){
    $usuario=$GLOBALS["user"];
    $cargo=$GLOBALS["cargo"];
    if (($cargo & 2)==2 && request("name")!=$usuario){
        $tipo=isset($_POST["tipo"])  ? request("tipo") : "normal";
        function gpa($type){
            $type=isset($_GET["search"]) ? "pesquisa" : "normal";
            $usuario=$GLOBALS["user"];
            $conn=$GLOBALS["conn"];
            $pg=isset($_GET["pg"]) ? request()->query("pg") : 1;
            $n=($pg-1)*10 >= 0 ? ($pg-1)*10 : 0;
            $search=$type=="pesquisa" ? "%" . request()->query("search") . "%" : null;
            if ($type=="pesquisa"){
                $s=$conn->prepare("SELECT id,usuario,cargo FROM user WHERE LOWER(usuario) LIKE LOWER(?) AND cargo & 2=0 ORDER BY id DESC LIMIT $n,10",[$search]);
                $num=$conn->prepare("SELECT COUNT(*) AS num FROM user WHERE LOWER(usuario) LIKE LOWER(?) AND cargo & 2=0",[$search]);
            } else {
                $s=$conn->query("SELECT id,usuario,cargo FROM user WHERE cargo & 2=0 ORDER BY id DESC LIMIT $n,10");
                $num=$conn->query("SELECT COUNT(*) AS num FROM user WHERE cargo & 2=0");
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["result"=>"true","posts"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        };
        if (request("type")=="info"){
            gpa($tipo);
        } else if (request("type")=="option"){
            if ($tipo=="delete"){
                if (request("senha")==$GLOBALS["delete_account"]){
                    delete_account(true,request("name"));
                    gpa($tipo);
                } else {
                    response()->json(["result"=>"false"]);
                }
            } else if ($tipo=="private"){
                if (request("senha")==$GLOBALS["delete_account"]){
                    $name=request("name");
                    $conn=$GLOBALS["conn"];
                    $private_user=intval(p($conn->prepare("SELECT cargo FROM user WHERE usuario=?",[$name]))[0]["cargo"]) ^ 1;
                    $private_clause=$private_user & 1==1 ? "privado | 8" : "privado & ~8";
                    $conn->prepare("UPDATE post_24 SET privado=$private_clause WHERE usuario=?",[$name]);
                    $conn->prepare("UPDATE post SET privado=$private_clause WHERE usuario=?",[$name]);
                    $conn->prepare("UPDATE post_imagem SET privado=$private_clause WHERE usuario=?",[$name]);
                    $conn->prepare("UPDATE post_musica SET privado=$private_clause WHERE usuario=?",[$name]);
                    $conn->prepare("UPDATE post_texto SET privado=$private_clause WHERE usuario=?",[$name]);
                    $conn->prepare("UPDATE post_video SET privado=$private_clause WHERE usuario=?",[$name]);
                    $conn->prepare("UPDATE playlist SET privado=$private_clause WHERE usuario=?",[$name]);
                    $conn->prepare("UPDATE comment SET privado=$private_clause WHERE usuario=?",[$name]);
                    $conn->prepare("UPDATE user SET cargo=$private_user WHERE usuario=?",[$name]);
                    gpa(request("search") ? "pesquisa" : "normal");
                } else {
                    response()->json(["result"=>"false"]);
                }
            } else if ($tipo=="pesquisa"){
                gpa($tipo);
                return;
            } else if ($tipo=="normal"){
                gpa($tipo);
            }
        }
    } else {
        r404();
    }
});
// Route::post("/ajeitar3",function(){
//     update_sitemap();
// });

