<?php
if (!function_exists("cargo")){
    function cargo($usuario){
        $conn=new sqli("anjoov00_users_conteudo");
        $s=$conn->prepare("SELECT cargo FROM user WHERE usuario=?",[$usuario]);return p($s)[0]["cargo"];
    }
}
Route::post("/admin_header",function(){
    $usuario=get_user();
    response()->json(["usuario"=>$usuario]);
});
Route::post("/isAdmin",function(){
    $usuario=get_user();
    response()->json($usuario ? "true" : "false");
});
Route::get('/admin', function(){
    // get_user : header("location:/admin");
    resp("/admin/index.html");
    // include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post('/admin',function(){
    if (request("type")=="info"){
        response()->json([]);
    }  else if (request("type")=="option"){
    $dados=request()->all();
    // try{
    function cript($usuario){
        $k=crip2($usuario);
        session(["key"=>$k]);
    }
    $tipo=$dados["tipo"];
    if ($tipo=="login"){
        $email=$dados["email"];
        $senha=$dados["senha"];
        $conn=new sqli("anjoov00_users_conteudo");
       $result=$conn->prepare("SELECT usuario,email,senha,logo FROM user WHERE (usuario=? OR email=?) AND senha=?",[$email,$email,$senha]);
        if ($result->num_rows>0){
            $rs=p($result)[0];
            $usuario=$rs["usuario"];
            $logo=$rs["logo"];
            response()->json(["result"=>"true","token"=>get_token(["usuario"=>$usuario]),"usuario"=>$usuario,"lsrc"=>$logo]);
        } else {
            response()->json(["result"=>"false"]);
        }
    } else if ($tipo=="cadastro"){
        $nome=$dados["nome"];
        $usuario=$dados["usuario"];
        $email=$dados["email"];
        $senha=$dados["senha"];
        $month=$dados["month"];
        $day=$dados["day"];
        $year=$dados["year"];
        // if (!ctype_digit($month)) return;
        // if (!ctype_digit($day)) return;
        // if (!ctype_digit($year)) return;
        // if (strlen($nome)==0) return;
        // if (strlen($usuario)==0) return;
        // if (!preg_match("/[A-Z]/",$senha) || !preg_match("/[a-z]/",$senha) || !preg_match("/[^a-zA-Z0-9]/",$senha) || !preg_match("/\d/",$senha) || strlen($senha)<8) return;
        // if (!preg_match("/^[^\s@]+@[^\s@]+\.[^\s@]+$/",$email)) return;
        $conn=new sqli("anjoov00_users_conteudo");
        $result=$conn->prepare("SELECT * FROM user WHERE usuario=? OR email=?",[$usuario,$email]);
        if ($result->num_rows>0){
            response()->json(["result"=>"false"]);
        } else {
            $dataString = sprintf('%d-%02d-%02d', $year, $month, $day);
            $data = DateTime::createFromFormat('Y-m-d', $dataString);
            $data_str = $data->format('d/m/Y');
            $n_posts=0;
            $inscritos=json_encode([]);
            $cargo="normal";
            $s=$conn->query("SELECT  id FROM user ORDER BY id DESC LIMIT 1");
            $id;
            if ($s->num_rows==0){
                $id=1;
            } else {
                $id=p($s)[0]["id"]+1;
            }
            $id=intval($id);
            $s=$conn->prepare("INSERT INTO user(nome,usuario,email,senha,cargo,data_n,n_posts,inscritos,id) VALUES(?,?,?,?,?,?,?,?,?)",[$nome,$usuario,$email,$senha,$cargo,$data_str,$n_posts,$inscritos,$id]);
            $json=json_encode([]);
            $s2=$conn->prepare("INSERT INTO inscritos(usuario,inscritos) VALUES(?,?)",[$usuario,$json]);
            response()->json(["result"=>"true","token"=>get_token(["usuario"=>$usuario]),"usuario"=>$usuario]);
        }
        }
    // } catch (Exception $e){
    //     return resp($e);
    // }
    } else {
        $usuario=get_user();
        if ($usuario){
            $cargo=cargo($usuario);
            // return view("admin.admin_inicio.index",compact("usuario","cargo"));
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/inicio/main.html'));
        } else{
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/admin_login/main.html'));
            // return view("admin.admin_login.index");
        }
    }
});
Route::get("/admin/noticias_cadastro",function(){
    get_user() || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/noticias_cadastro", function(){
    
    $usuario=get_user();
    if ($usuario){
        if (request("type")!="get"){
    $cargo=cargo($usuario);
    if ($cargo=="admin"){
        r404();
    } else {
    // if (!session()->has("key")) return;
    $dados=request()->all();
    $type=request()->query("type");
    $categoria=$dados["categoria"];
    $destaque=$dados["destaque"];
    $titulo=$dados["titulo"];
    if (strlen($titulo)==0) return;
    $subtitulo=isset($dados["subtitulo"]) ? $dados["subtitulo"] : null;
    $acessos=0;
    $texto;
    $imagem;
    $id=$type=="cadastro" ? null : $dados["id"];
    $texto=isset($dados["texto"]) ? $dados["texto"] : "n";
    $conn = new sqli("anjoov00_posts");
    $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT, acessos INT, id INT, lixeira TEXT)");
    if ($type=="cadastro"){
        $result=$conn->query("SELECT id FROM post ORDER BY id DESC LIMIT 1");
        $id;
        if ($result->num_rows==0){
            $id=1;
        } else {
            $id=p($result)[0]["id"]+1;
        }
    }
    if (($type=="cadastro" || isset($dados["imagem_edit"])) && request()->has("imagem")) {
        if (request()->has("imagem")) {
            $file = request()->file("imagem");
    
            // Salvar a imagem em um diretório
            $caminhoDestino = __DIR__ . "/../public_html/images/";
            $imagem = $file->getClientOriginalName("webp");
            $imagem=$id . "_" . $imagem;
            $fileName=$file->createwebp($caminhoDestino,$imagem);
            $img=imagem($caminhoDestino.$imagem);
            $img->resize(1280,720);
    
            // Agora a imagem foi salva no diretório especificado
        }
    } else {
        $imagem=$type=="cadastro" ? "n" : $imagem=$dados["imagem"];
    }
    if ($type=="cadastro"){
        $conn = new sqli("anjoov00_users_conteudo");
        $result=$conn->query("SELECT nome FROM user WHERE usuario='$usuario'");
        $nome=p($result)[0]["nome"];
        $conn = new sqli("anjoov00_posts");
        $lixeira="false";
        date_default_timezone_set('GMT'); 
        $d = new DateTime();
        $d = $d->format('Y-m-d H:i:s');
        $d=["o"=>$d];
        $d=json_encode($d);
        $views_id=1;
        $rss=$conn->query("SELECT id FROM views ORDER BY id DESC LIMIT 1");
        if ($rss->num_rows>0){
            $views_id=p($rss)[0]["id"]+1;
        }
        $s=$conn->prepare("INSERT INTO post(nome,usuario,categoria,destaque,titulo,subtitulo,texto,imagem,acessos,views_id,id,lixeira,d) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",[$nome,$usuario,$categoria,$destaque,$titulo,$subtitulo,$texto,$imagem,$acessos,$views_id,$id,$lixeira,$d]);
        $tipo="post";
        $excluido="false";
        $acessos_d=json_encode([]);
        $conn->prepare("INSERT INTO views(usuario,tipo,acessos_d,id,id_post,excluido) VALUES(?,?,?,?,?,?)",[$usuario,$tipo,$acessos_d,$views_id,$id,$excluido]);
        $conn = new sqli("anjoov00_users_conteudo");
        $rs=$conn->prepare("SELECT n_posts FROM user WHERE usuario=?",[$usuario]);
        $n_posts=p($rs)[0]["n_posts"];
        $n_posts=intval($n_posts)+1;
        $s=$conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$n_posts,$usuario]);
    } else if ($type=="edit"){
        $s=$conn->prepare("SELECT d FROM post WHERE usuario=? AND id=?",[$usuario,$id]);
        $d=json_decode(p($s)[0]["d"],true);
        $da = new DateTime();
        $da = $da->format('Y-m-d H:i:s');
        $d["a"]=$da;
        $d=json_encode($d);
        $s=$conn->prepare("UPDATE post SET categoria=?,destaque=?,titulo=?,subtitulo=?,texto=?,imagem=?,acessos=?,d=? WHERE usuario=? AND id=?",[$categoria,$destaque,$titulo,$subtitulo,$texto,$imagem,$acessos,$d,$usuario,$id]);
    }
    response()->json(["result"=>"true","usuario"=>$usuario]);
    }
    } else {
        response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/noticias_cadastro/main.html'));
    }
    }else{
        response()->json(["header_location"=>"/admin"]);
    }
});
Route::get("/admin/noticias_edit",function(){
    !get_user() && header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/noticias_edit",function(){
    if (request("type")=="info"){
        $usuario=get_user();
        $cargo=cargo($usuario);

        $conn = new sqli("anjoov00_posts");
        $id=request()->query("id");
        $id=intval($id);
        $result=$conn->prepare("SELECT * FROM post WHERE usuario=? AND id=? AND lixeira='false'",[$usuario,$id]);
        $r=p($result);
        $conn = new sqli("anjoov00_config");
        $result=$conn->query("SELECT nome FROM categorias");
        $r2;
        if ($result->num_rows>0){
            $r2=p($result);
        }else{
            $r2=[];
        }
        $select_options=$r2;
        response()->json(["select_options"=>$select_options,"post_edit"=>$r]);
    } else {
        response()->json(file_get_contents(__DIR__ . "/../public_html/templates/admin/noticias_cadastro/main.html"));
    }
    // return view("admin.noticias_edit.index",compact("select_options","r","usuario","cargo"));
});
Route::get("/admin/noticias_lista",function(){
    // get_user() || header("location:/admin");
    resp("/admin/noticias_lista.html");
    // include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/noticias_lista",function(){
    
    $usuario=get_user();
    if ($usuario){
        function gpa(){
            $usuario=get_user();
            $cargo=cargo($usuario);
            $conn=new sqli("anjoov00_posts");
            $s;
            $num;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : null;
            if($cargo=="admin"){
                if ($pg){
                    $n=($pg-1)*10;
                    $s=$conn->query("SELECT id,titulo,categoria,usuario,acessos,lixeira FROM post ORDER BY id DESC LIMIT $n,10");
                } else {
                    $s=$conn->query("SELECT id,titulo,categoria,usuario,acessos,lixeira FROM post ORDER BY id DESC LIMIT 10");
                }
                $num=$conn->query("SELECT COUNT(*) AS num FROM post");
            } else {
                if ($pg){
                    $n=($pg-1)*10;
                    $s=$conn->query("SELECT id,titulo,acessos,lixeira FROM post WHERE usuario='$usuario' ORDER BY id DESC LIMIT $n,10");
                } else {
                    $s=$conn->query("SELECT id,titulo,acessos,lixeira FROM post WHERE usuario='$usuario' ORDER BY id DESC LIMIT 10");
                }
                $num=$conn->query("SELECT COUNT(*) AS num FROM post WHERE usuario='$usuario'");
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["noticias"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
    if (request("type")=="info"){
        gpa();
    } else if (request("type")=="option"){
        $cargo=cargo($usuario);
        $id=request("id");
        $operation=request("operation") ? request("operation") : null;
        $conn = new sqli("anjoov00_posts");
        //$s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND lixeira='false'",[$usuario]);
        // unlink(__DIR__ . "/../images/" . p($result)[0]["imagem"]);
        //$s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
        if ($operation){
            $user;
            $li=$operation=="privado" ? "true" : "false";
            $sum=$li=="true" ? -1 : 1;
            if ($cargo=="admin"){
                $result=$conn->prepare("UPDATE post SET lixeira='$li' WHERE id=?",[$id]);
                $user=$usuario;
            } else {
                $result=$conn->prepare("UPDATE post SET lixeira='$li' WHERE usuario=? AND id=?",[$usuario,$id]);
                $user=p($conn->prepare("SELECT usuario FROM post WHERE id=?",[$id]))[0]["usuario"];
            }
            $conn = new sqli("anjoov00_users_conteudo");
            $rs=$conn->prepare("SELECT n_posts FROM user WHERE usuario=?",[$user]);
            $n=p($rs)[0]["n_posts"]+$sum;
            $s=$conn->prepare("UPDATE user SET n_posts=? WHERE usuario=? ORDER BY id DESC",[$n,$user]);
            response()->json(["result"=>"true","usuario"=>$usuario]);
        } else {
            $conn = new sqli("anjoov00_posts");
            $views_id=p($conn->prepare("SELECT views_id FROM post WHERE id=? AND usuario=?",[$id,$usuario]))[0]["views_id"];
            $s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
            $conn->prepare("UPDATE views SET excluido='true' WHERE excluido='false' AND id=?",[$views_id]);
            gpa();
        }
        // $num=$conn->query("SELECT COUNT(*) AS num FROM post WHERE usuario")
    } else {
        response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/noticias_lista/admin.html'));
    }
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
    // return view("admin.noticias_lista.index",compact("r","usuario","cargo"));
});
Route::get("/admin/24_cadastro",function(){
    get_user() || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/24_cadastro",function(){
    $usuario=get_user();
    if ($usuario){
    if (request("type")=="info"){
        response()->json([]);
    } else if (request("type")=="option"){
    $dados=request()->all();
    $titulo=isset($dados["titulo"]) ? $dados["titulo"] : null;
    $acessos=0;
    $imagem;
    $id;
    $conn = new sqli("anjoov00_users_conteudo");
    $rs=$conn->prepare("SELECT nome FROM user WHERE usuario=?",[$usuario]);
    $nome=p($rs)[0]["nome"];
    $conn = new sqli("anjoov00_posts");
    $result=$conn->query("SELECT id FROM post_24 ORDER BY id DESC LIMIT 1");
    $id;
    if ($result->num_rows==0){
        $id=1;
    } else {
        $id=p($result)[0]["id"]+1;
    }
    if (request()->has("imagem")) {
            $file = request()->file("imagem");
            $caminhoDestino = __DIR__ . "/../public_html/images/";
            $imagem = $file->getClientOriginalName("webp");
            $imagem='24_' . $id . $imagem;
            $file->createwebp($caminhoDestino,$imagem);
            $img=imagem($caminhoDestino.$imagem);
            $img->resize(1280,720);
    } else {
        $imagem=$type=="cadastro" ? "n" : $imagem=$dados["imagem"];
    }
    $d = new DateTime();
    $d = $d->format('Y-m-d H:i:s');
    $d=json_encode($d);
    $views_id=1;
    $rss=$conn->query("SELECT id FROM views ORDER BY id DESC LIMIT 1");
    if ($rss->num_rows>0){
        $views_id=p($rss)[0]["id"]+1;
    }
    $s=$conn->prepare("INSERT INTO post_24(nome,usuario,titulo,imagem,d,acessos,views_id,id) VALUES (?,?,?,?,?,?,?,?)",[$nome,$usuario,$titulo,$imagem,$d,$acessos,$views_id,$id]);
    $tipo="post_24";
    $excluido="false";
    $acessos_d=json_encode([]);
    $conn->prepare("INSERT INTO views(usuario,tipo,acessos_d,id,id_post,excluido) VALUES(?,?,?,?,?,?)",[$usuario,$tipo,$acessos_d,$views_id,$id,$excluido]);
    // $conn = new sqli("anjoov00_users_conteudo");
    // $rs=$conn->prepare("SELECT * FROM user WHERE usuario=?",[$usuario]);
    // $n=p($rs)[0]["n_posts"]+1;
    // $s=$conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$usuario]);
    response()->json(["result"=>"true","usuario"=>$usuario]);
    } else {
        response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/24_cadastro/main.html'));
    }
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
});
Route::get("/admin/24_lista",function(){
    get_user() || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/24_lista",function(){
    
    $usuario=get_user();
    if ($usuario){
        $cargo=cargo($usuario);
        function gpa(){
            $usuario=get_user();
            $cargo=cargo($usuario);
            $conn=new sqli("anjoov00_posts");
            $s;
            $num;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : null;
            if($cargo=="admin"){
                if ($pg){
                    $n=($pg-1)*10;
                    $s=$conn->query("SELECT id,titulo,usuario,acessos FROM post_24 ORDER BY id DESC LIMIT $n,10");
                } else {
                    $s=$conn->query("SELECT id,titulo,usuario,acessos FROM post_24 ORDER BY id DESC LIMIT 10");
                }
                $num=$conn->query("SELECT COUNT(*) AS num FROM post_24");
            } else {
                if ($pg){
                    $n=($pg-1)*10;
                    $s=$conn->query("SELECT id,titulo,acessos FROM post_24 WHERE usuario='$usuario' ORDER BY id DESC LIMIT $n,10");
                } else {
                    $s=$conn->query("SELECT id,titulo,acessos FROM post_24 WHERE usuario='$usuario' ORDER BY id DESC LIMIT 10");
                }
                $num=$conn->query("SELECT COUNT(*) AS num FROM post_24 WHERE usuario='$usuario'");
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["noticias"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
        if (request("type")=="info"){
            // $conn = new sqli("anjoov00_posts");
            // $result=$conn->prepare("SELECT * FROM post_24 WHERE usuario=? ORDER BY id DESC",[$usuario]);
            // $r=p($result);
            // response()->json(["usuairo"=>$r,"noticias"=>$r,"n_registros"=>$result->num_rows]);
            gpa();
        } else if (request("type")=="option"){
            $dados=request()->all();
            $id=$dados["id"];
            $conn = new sqli("anjoov00_posts");
            if ($cargo=="admin"){
                $s=$conn->prepare("DELETE FROM post_24 WHERE id=?",[$id]);
            } else {
                $s=$conn->prepare("DELETE FROM post_24 WHERE usuario=? AND id=?",[$usuario,$id]);
            }
            gpa();
        } else {
            response()->json(file_get_contents(__DIR__. '/../public_html/templates/admin/24_lista/main.html'));
        }
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
});
// Route::post("/admin/24_cadastro",function(){
//     include(__DIR__. '/../public_html/templates/admin/24_lista/index.php');
// });
// Route::get("/admin/noticias_lixeira",function(){
//     get_user() : header("location:/admin");
//     include(__DIR__ . '/../public_html/templates/main/main.html');
// });
// Route::post("/admin/noticias_lixeira",function(){
    
//     $usuario=get_user();
//     if ($usuario){
//         $cargo=cargo($usuario);
//         function gpa(){
//             $usuario=get_user();
//             $cargo=cargo($usuario);
//             $conn=new sqli("anjoov00_posts");
//             $s;
//             $num;
//             $pg=isset($_GET["pg"]) ? request()->query("pg") : null;
//             if($cargo=="admin"){
//                 if ($pg){
//                     $n=($pg-1)*10;
//                     $s=$conn->query("SELECT id,titulo,categoria,usuario,acessos FROM post WHERE lixeira='true' ORDER BY id DESC LIMIT $n,10");
//                 } else {
//                     $s=$conn->query("SELECT id,titulo,categoria,usuario,acessos FROM post WHERE lixeira='true' ORDER BY id DESC LIMIT 10");
//                 }
//                 $num=$conn->query("SELECT COUNT(*) AS num FROM post WHERE lixeira='true'");
//             } else {
//                 if ($pg){
//                     $n=($pg-1)*10;
//                     $s=$conn->query("SELECT id,titulo,acessos FROM post WHERE usuario='$usuario' AND lixeira='true' ORDER BY id DESC LIMIT $n,10");
//                 } else {
//                     $s=$conn->query("SELECT id,titulo,acessos FROM post WHERE usuario='$usuario' AND lixeira='true' ORDER BY id DESC LIMIT 10");
//                 }
//                 $num=$conn->query("SELECT COUNT(*) AS num FROM post WHERE usuario='$usuario' AND lixeira='true'");
//             }
//             $r=p($s);
//             $num=p($num)[0]["num"];
//             response()->json(["noticias"=>$r,"n_registros"=>$num]);
//         }
//         if (request("type")=="info"){
//         gpa();
//         //return view("admin.noticias_lixeira.index",compact("r","usuario"));
//     } else if (request("type")=="option"){
//     $dados=request()->all();
//     $type=request()->query("type");
//     $cargo=cargo($usuario);
//     if ($type=="repor"){
//         $id=$dados["id"];
//         $id=intval($id);
//         $conn = new sqli("anjoov00_posts");
//         if ($cargo=="admin"){
//             $result=$conn->prepare("UPDATE post SET lixeira='false' WHERE id=?",[$id]);
//         } else {
//             $result=$conn->prepare("UPDATE post SET lixeira='true' WHERE usuario=? AND id=?",[$usuario,$id]);
//         }
//         $conn = new sqli("anjoov00_users_conteudo");
//         $rs=$conn->prepare("SELECT n_posts FROM user WHERE usuario=?",[$usuario]);
//         $n=p($rs)[0]["n_posts"]+1;
//         $rs=$conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$n,$usuario]);
//         gpa();
//     }
//     if ($type=="remove"){
//         $id=$dados["id"];
//         $id=intval($id);
//         $conn = new sqli("anjoov00_posts");
//         $views_id=p($conn->prepare("SELECT views_id FROM post WHERE id=? AND usuario=?",[$id,$usuario]))[0]["views_id"];
//         $s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?",[$id,$usuario]);
//         $conn->prepare("UPDATE views SET excluido='true' WHERE excluido='false' AND id=?",[$views_id]);
//         gpa();
//     }
//     } else {
//         response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/noticias_lixeira/' . ($cargo=="admin" ? "admin.html" : "main.html")));
//     }
//     } else {
//         response()->json(["header_location"=>"/admin"]);
//     }
// });
Route::get("/admin/categorias_cadastro",function(){
    
    include(__DIR__ . '/../admin_v.php');
    $usuario=get_user();
    if(include(__DIR__ . "/require.php")) return;
    $cargo=cargo($usuario);
    $conn = new sqli("anjoov00_config");
    $result=$conn->query("SELECT * FROM categorias");
    $r=p($result);
    return view("admin.categorias_cadastro.index",compact("r","usuario","cargo"));
});
Route::post("/admin/categorias_cadastro",function(){
    
    if (!session()->has("key")) return;
    $dados=request()->all();
    if ($dados["type"]=="cadastro"){
        $nome=$dados["nome"];
        $descricao=$dados["descricao"];
        $link=$dados["link"];
        $conn = new sqli("anjoov00_config");
        $conn->query("CREATE TABLE IF NOT EXISTS categorias(id INT,nome TEXT,descricao TEXT,link TEXT)");
        $result=$conn->query("SELECT id FROM categorias");
        $id;
        if ($result->num_rows==0){
            $id=1;
        } else {
            $id=p($result);
            $id=end($id)["id"]+1;
        }
        $s=$conn->prepare("INSERT INTO categorias(id,nome,descricao,link) VALUES(?,?,?,?)",[$id,$nome,$descricao,$link]);
        $result=$conn->query("SELECT * FROM categorias");
        $r=p($result);
        response()->json($r);
    } else if ($dados["type"]=="remove"){
        $id=request()->query("id");
        $id=intval($id);
        $conn = new sqli("anjoov00_config");
        $s=$conn->prepare("DELETE FROM categorias WHERE id=?",[$id]);
        $result=$conn->query("SELECT * FROM categorias");
        $r=p($result);
        response()->json($r);
    }
});
Route::get("/admin/categorias_edit",function(){
    
    include(__DIR__ . '/../admin_v.php');
    $usuario=get_user();
    if(include(__DIR__ . "/require.php")) return;
    $cargo=cargo($usuario);
    $id=request()->query("id");
    $id=intval($id);
    $conn = new sqli("anjoov00_config");
    $result=$conn->query("SELECT * FROM categorias");
    $all=[];
    if ($result->num_rows>0){
        while ($row = $result->fetch_assoc()) { $all[] = $row; }
    } else {
        return view("erro.404");
    }
    $conn = new sqli("anjoov00_config");
    $result=$conn->prepare("SELECT * FROM categorias WHERE id=?",[$id]);
    $r=p($result);
    return view("admin.categorias_edit.index",compact("all","r","usuario","cargo"));
});
Route::get("/admin/settings",function(){
    get_user() || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/settings",function(){
    
    $usuario=get_user();
    if ($usuario){
    if (request("type")=="info"){
        $conn = new sqli("anjoov00_users_conteudo");
        $config=$conn->prepare("SELECT usuario,logo,banner FROM user WHERE usuario=?",[$usuario]);
        $config=p($config)[0];
        response()->json(["config"=>$config,"usuario"=>$usuario]);
    } else if (request("type")=="option"){
        $type=request()->query("type");
        $conn = new sqli("anjoov00_users_conteudo");
        $config=$conn->prepare("SELECT logo,banner FROM user WHERE usuario=?",[$usuario]);
        $config=p($config)[0];
        if ($type=="logo"){
            if (isset($config["logo"])){
                unlink(__DIR__ . "/../public_html/images/".$config["logo"]);
            }
            $logo=null;
            if (request()->has("logo")) {
                $file = request()->file("logo");
                $caminhoDestino = __DIR__ . "/../public_html/images/";
                $logo = $file->getClientOriginalName("webp");
                $logo=$usuario . "_logo_" . $logo;
                $file->createwebp($caminhoDestino,$logo);
                // Caminho para a imagem original
                $img=imagem($caminhoDestino.$logo);
                $img->resize(800,800);
            }
            $s=$conn->prepare("UPDATE user SET logo=? WHERE usuario=?",[$logo,$usuario]);
            response()->json(["result"=>"true","usuario"=>$usuario,"lsrc"=>$logo]);
        }
        if ($type=="banner"){
            if (isset($config["banner"])){
                unlink(__DIR__ . "/../public_html/images/".$config["banner"]);
            }
            $banner;
            if (request()->has("banner")) {
                $file = request()->file("banner");
                $caminhoDestino = __DIR__ . "/../public_html/images/";
                $banner = $file->getClientOriginalName("webp");
                $banner=$usuario . "_banner_" . $banner;
                $file->createwebp($caminhoDestino,$banner);
                $img=imagem($caminhoDestino.$banner);
                $img->resize(2048,1152);
            }
            $s=$conn->prepare("UPDATE user SET banner=? WHERE usuario=?",[$banner,$usuario]);
            response()->json(["result"=>"true","usuario"=>$usuario,"banner"=>$banner]);
        }
    } else {
        response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/settings/main.html'));
    }
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
});
Route::get("/admin/usuarios",function(){
    $usuario=get_user();
    if ($usuario){
        $cargo=cargo($usuario);
        $cargo=="admin" ? include(__DIR__ . '/../public_html/templates/main/main.html') : header("location:/erro?origin=/");
    } else {
        header("location:/erro?origin=/");
    }
});
Route::post("/admin/usuarios",function(){
    $usuario=get_user();
    $cargo=cargo($usuario);
    if ($usuario && $cargo=="admin"){
        if (request("type")=="info"){
            $conn = new sqli("anjoov00_users_conteudo");
            $s=$conn->prepare("SELECT nome,usuario,banner FROM user WHERE usuario!=?",[$usuario]);
            $r=p($result);
            response()->json(["usuarios"=>$r]);
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/lista_usuarios/main.html'));
        }
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
    // include(__DIR__ . '/../public_html/templates/admin/lista_usuarios/index.php');
});
Route::get("/admin/metricas",function(){
    get_user() || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/admin/metricas",function(){
    
    $usuario=get_user();
    if ($usuario){
        if (request("type")=="info"){
        $cargo=cargo($usuario);
        $conn = new sqli("anjoov00_posts");
        $s;
        $s2;
        $p;
        $total_u=null;
        if ($cargo=="admin"){
            $s=$conn->query("SELECT SUM(acessos) as total FROM post");
            $s2=$conn->query("SELECT SUM(acessos) as total FROM post_24");
            $p=$conn->query("SELECT acessos_d FROM views");
            $result=p($conn->query("SELECT * FROM views_atual"));
            $d=new DateTime();
            foreach($result as $v){
                $dv=$v["d"];
                $dv=DateTime::createFromFormat('Y-m-d H:i:s', $dv);
                $dv->modify('+10 seconds');
                if ($d>$dv){
                    $conn->prepare("DELETE FROM views_atual WHERE id=?",[$v["id"]]);
                }
            }
            $total_u=p($conn->query("SELECT tipo,usuario FROM views_atual"));
        } else {
            $s=$conn->query("SELECT SUM(acessos) as total FROM post WHERE usuario='$usuario'"); 
            $s2=$conn->query("SELECT SUM(acessos) as total FROM post_24 WHERE usuario='$usuario'");
            $p=$conn->query("SELECT acessos_d FROM views WHERE usuario='$usuario'");
        }
        $r=p($s)[0]["total"]; 
        $r2=p($s2)[0]["total"]; 
        $p=p($p);
        response()->json(["total"=>$r,"total_24"=>$r2,"posts"=>$p,"total_u"=>$total_u,"usuario"=>$usuario]);
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/grafico/main.html'));
        }
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
});
Route::get("/admin/sair",function(){
    session()->forget("key");
    return redirect("/");
});
Route::post("/admin/sair",function(){
    session()->forget("key");
    response()->json(["header_location"=>"/"]);
});
Route::post("/cargo",function(){
    $usuario=get_user();
    if ($usuario){
        response()->json(["cargo"=>cargo($usuario)]);
    } else {
        response()->json(["cargo"=>null]);
    }
});
Route::get("/admin/musicas_cadastro",function(){
    $usuario=get_user();
    if ($usuario){
        include(__DIR__ . '/../public_html/templates/main/main.html');
    } else {
        header("location:/erro?origin=/");
    }
});
Route::post("/admin/musicas_cadastro",function(){
    $usuario=get_user();
    if ($usuario){
        if (request("type")=="info"){
            response()->json([]);
        } else if (request("type")=="option"){
            $dados=request()->all();
            $titulo=$dados["titulo"];
            //if (strlen($titulo)==0) return;
            $capa;
            $arquivo;
            $id=1;
            $conn=new sqli("anjoov00_posts");
            $result=$conn->query("SELECT id FROM post_musica ORDER BY id DESC LIMIT 1");
            if ($result->num_rows>0){
                $id=p($result)[0]["id"]+1;
            }
            if (request()->has("capa")) {
                $file = request()->file("capa");
        
                // Salvar a imagem em um diretório
                $caminhoDestino = __DIR__ . "/../public_html/images/";
                $capa = $file->getClientOriginalName("webp");
                $capa=$id . "_" . $capa;
                $file->createwebp($caminhoDestino,$capa);
                $img=imagem($caminhoDestino.$capa);
                $img->resize(640,640);
            }
            if (request()->has("arquivo")) {
                $file = request()->file("arquivo");
        
                // Salvar a imagem em um diretório
                $caminhoDestino = __DIR__ . "/../public_html/musics/";
                $arquivo = $file->getClientOriginalName();
                $arquivo=$id . "_" . $arquivo;
                $file->move($caminhoDestino,$arquivo);
            }
            $tipo="post_musica";
            $excluido="false";
            $acessos_d=json_encode([]);
            $views_id=1;
            $rss=$conn->query("SELECT id FROM views ORDER BY id DESC LIMIT 1");
            if ($rss->num_rows>0){
                $views_id=p($rss)[0]["id"]+1;
            }
            $acessos=0;
            $d = new DateTime();
            $d = $d->format('Y-m-d H:i:s');
            $d=["o"=>$d];
            $d=json_encode($d);
            $conn->prepare("INSERT INTO post_musica(usuario,titulo,capa,arquivo,acessos,views_id,id,d) VALUES(?,?,?,?,?,?,?,?)",[$usuario,$titulo,$capa,$arquivo,$acessos,$views_id,$id,$d]);
            $conn->prepare("INSERT INTO views(usuario,tipo,acessos_d,id,id_post,excluido) VALUES(?,?,?,?,?,?)",[$usuario,$tipo,$acessos_d,$views_id,$id,$excluido]);
            response()->json(["result"=>"true","usuario"=>$usuario]);
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/musicas_cadastro/main.html'));
        }
    } else {
        r404();
    }
});
Route::get("/admin/musicas_lista",function(){
    $usuario=get_user();
    if ($usuario){
        include(__DIR__ . '/../public_html/templates/main/main.html');
    } else {
        header("location:/erro?origin=/");
    }
});
Route::post("/admin/musicas_lista",function(){
    $usuario=get_user();
    if ($usuario){
        function gpa(){
            $usuario=get_user();
            $cargo=cargo($usuario);
            $conn=new sqli("anjoov00_posts");
            $s;
            $num;
            $pg=isset($_GET["pg"]) ? request()->query("pg") : null;
            if ($cargo=="admin"){
                if ($pg){
                    $n=($pg-1)*10;
                    $s=$conn->query("SELECT * FROM post_musica ORDER BY id DESC LIMIT $n,10");
                } else {
                    $s=$conn->query("SELECT * FROM post_musica ORDER BY id DESC LIMIT 10");
                } 
                $num=$conn->query("SELECT COUNT(*) AS num FROM post_musica");
            } else {
                if ($pg){
                    $n=($pg-1)*10;
                    $s=$conn->query("SELECT * FROM post_musica WHERE usuario='$usuario' ORDER BY id DESC LIMIT $n,10");
                } else {
                    $s=$conn->query("SELECT * FROM post_musica WHERE usuario='$usuario' ORDER BY id DESC LIMIT 10");
                } 
                $num=$conn->query("SELECT COUNT(*) AS num FROM post_musica WHERE usuario='$usuario'");
            }
            $r=p($s);
            $num=p($num)[0]["num"];
            response()->json(["noticias"=>$r,"n_registros"=>$num,"usuario"=>$usuario]);
        }
        if (request("type")=="info"){
            gpa();
        } else if (request("type")=="option"){
            $conn=new sqli("anjoov00_posts");
            $id=request("id");
            $result=p($conn->prepare("SELECT * FROM post_musica WHERE id=?",[$id]));
            if (isset($result[0]["capa"])){
                unlink(__DIR__ . "/../public_html/images/".$result[0]["capa"]);
            }
            if (isset($result[0]["arquivo"])){
                unlink(__DIR__ . "/../public_html/musics/".$result[0]["arquivo"]);
            }
            if ($cargo=="admin"){
                $conn->prepare("DELETE FROM post_musica WHERE id=?",[$id]);
            } else {
                $conn->prepare("DELETE FROM post_musica WHERE id=? AND usuario=?",[$id,$usuario]);
            }
            gpa();
        } else {
            response()->json(file_get_contents(__DIR__ . '/../public_html/templates/admin/musicas_lista/main.html'));
        }
    } else {
        r404();
    }
});