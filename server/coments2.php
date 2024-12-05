// foreach($p as $s){
    //     $id=$s["id"];
    //     $arquivo=$s["arquivo"];
    //     $length=[];
    //     if (isJsonString($arquivo)){
    //         $arq=json_decode($arquivo);
    //         foreach($arq as $a){
    //             array_push($length,$a);
    //         }
    //     } else {
    //         array_push($length,$arquivo);
    //     }
    //     count($length)>1 && print_r($length);
    //     $durations=[];
    //     foreach ($length as $d){
    //         array_push($durations,getDuration(__DIR__ . "/../public_html/musics/".$d));
    //     }
    //     $duration=json_encode($durations);
    //     $conn->prepare("UPDATE post_musica SET duration=? WHERE id=?",[$duration,$id]);
    //     // print_r($length);
    // }
    // echo "foi";
});
Route::post("/a",function(){
//     $ffi = FFI::cdef("
//     void teste();
//     // Declare outras funções conforme necessário
// ", "./libserver.so");

// // Chame a função da biblioteca
// $ffi->teste();
// echo "opa";
});
// Route::get("/ajeitar",function(){
//     // require(__DIR__ . "/function.php");
//     // $conn = new sqli("anjoov00_users_conteudo");
//     // $s=$conn->query("SELECT * FROM user");
//     // $r=p($s);
//     // $t=[];
//     $conn=new sqli("anjoov00_users_conteudo");
//     $users=p($conn->query("SELECT usuario,n_posts FROM user"));
//     foreach($users as $user){
//         $usuario=$user["usuario"];
//         $conn=new sqli("anjoov00_posts");
//         $num=p($conn->prepare("SELECT COUNT(*) AS num FROM post WHERE privado='false' AND lixeira='false' AND usuario=?",[$usuario]))[0]["num"];
//         $conn=new sqli("anjoov00_users_conteudo");
//         $conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$num,$usuario]);
//     }
//     // $sj=json_encode([]);
//     // $s=$conn->prepare("UPDATE user SET inscritos=?,n_inscritos=0",[$sj]);
//     // $s=$conn->prepare("UPDATE inscritos SET inscritos=?,n_inscritos=0",[$sj]);
//     // $nn=0;
//     // foreach ($r as $user){
//     //     $nn++;
//     //     $usuario=$user["usuario"];
//     //     $id=$nn;
//     //     $conn->query("UPDATE user SET id=$id WHERE usuario='$usuario'");
//     //     $s=$conn->prepare("UPDATE user SET inscritos=? WHERE usuario=?");
//     //     $conn = new sqli("anjoov00_posts");
//     //     $result=$conn->prepare("SELECT COUNT(*) AS num FROM post WHERE usuario=? AND lixeira='false'",[$usuario]);
//     //     $num=p($result)[0]["num"];
//     //     $t[$usuario]=$num;
//     //     $nome=$user["nome"];
//     //     $s=$conn->prepare("UPDATE post SET nome=? WHERE usuario=?",[$nome,$usuario]);
//     //     $conn = new sqli("anjoov00_users_conteudo");
//     //     $s=$conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$num,$usuario]);
//     // }
//     // $conn = new sqli("anjoov00_posts");
//     // $result=$conn->query("SELECT * FROM post");
//     // $r=p($result);
//     // foreach ($r as $p){
//     //     $id=$p["id"];
//     //     date_default_timezone_set('GMT'); 
//     //     $d = new DateTime();
//     //     $d = $d->format('Y-m-d H:i:s');
//     //     $d=["o"=>$d];
//     //     $d=json_encode($d);
//     //     $s=$conn->prepare("UPDATE post SET d=? WHERE id=?",[$d,$id]);
//     // }
//     // $conn = new sqli("anjoov00_posts");
//     // $result=$conn->query("SELECT * FROM post");
//     // $r=p($result);
//     // foreach ($r as $p){
//     //     if ($p["imagem"]!="n" && $p["imagem"]!=""){
//     //     $img=imagem(__DIR__ . '/../public_html/images/' . $p["imagem"]);
//     //     $img->resize(1280,720);
//     //     }
//     // }
//     return response()->json(["teste"=>true]);
// });
// $r2=p($conn2->query("SEE"))
            // $result2=$conn->query("SELECT * FROM post_musica WHERE usuario IN ($lista) ORDER BY id DESC LIMIT 10");
            // foreach($rk as $nome){
            // $result=$conn->prepare("SELECT * FROM post WHERE lixeira='false' AND usuario=? ORDER BY id DESC LIMIT 10",[$nome]);
            // $result2=$conn->prepare("SELECT * FROM post_musica WHERE usuario=? ORDER BY id DESC LIMIT 10",[$nome]);
            // $rs=p($result);
            // $rs2=p($result2);
            // $rs=array_merge($rs,$rs2);
            // $n=count($rs);
            // usort($rs,"pmo");
            // $rs=$n>10 ? array_slice($rs,0,10) : $rs;
            // $c=[];
            // $r=array_merge($r,$rs);
            // $t;
            // $result=$conn->prepare("SELECT * FROM post_24 WHERE usuario=?",[$nome]);
            // $r2s=p($result);
            // foreach($r2s as $s){
            //     array_push($r2,$s);
            // }
            // foreach ($r2s as $r22){
            //         if (!in_array($r22["usuario"],$c)){
            //             array_push($c,$r22["usuario"]);
            //         }
            // } foreach ($c as $cs){
            //     $conn=new sqli("anjoov00_users_conteudo");
            //     $result=$conn->prepare("SELECT nome,usuario,logo FROM user WHERE usuario=?",[$cs]);
            //     $rs=p($result);
            //     array_push($canal,$rs[0]);
            // }
            // include_base("public_html/templates/pagina_inicial/index.php");
            // $conn=new sqli("anjoov00_users_conteudo");
            // $logo=$conn->query("SELECT logo FROM user WHERE usuario='$usuario'");
            // $logo=p($logo)[0];
            // };
            // function cp($a, $b) {
            //     return  $b['views_id'] - $a['views_id'];
            // }
            // usort($r,'cp');
            // $r=$n>48 ? array_slice($r,0,48) : $rs;
            // $json[$d]=$usuario;
                // $acessos_d[]=$json;
                // $acessos_d=json_encode($acessos_d);
                // $conn->prepare("UPDATE views SET acessos_d=? WHERE id=? AND tipo='post_musica'",[$acessos_d,$views_id]);       
                // Route::post("/inscricoes",function(){
                //     
                //     $id=request("id");
                //     $conn=new sqli("anjoov00_posts");
                //     $s=$conn->query("SELECT acessos FROM post_24 WHERE id=$id");
                //     $acessos=p($s)[0]["acessos"]+1;
                //     $s=$conn->prepare("UPDATE post_24 SET acessos=? WHERE id=?",[$acessos,$id]);
                // });