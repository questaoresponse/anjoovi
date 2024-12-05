<?php
Route::post("/inicio_header",function(){
    $logo=null;
    $usuario=get_user();
    if ($usuario){
        $conn = new sqli("anjoov00_users_conteudo");
        $config=$conn->prepare("SELECT logo FROM user WHERE usuario=?",[$usuario]);
        $logo=p($config)[0]["logo"];
    };
    echo json_encode(["logo"=>$logo,"usuario"=>$usuario]);
});
Route::post("/erro",function(){
    if (request("type")!="info"){
        echo json_encode(file_get_contents(__DIR__ . '/../public_html/templates/erro/404.html'));
    }
});
Route::get('/', function () {
    resp("index.html");
    // include(__DIR__ . "/inicio.php");
    // return view('welcome');
    // $logo;
    // include(__DIR__ . "/../public_html/templates/pagina_inicial/index.php");
    // include(__DIR__ . "/../public_html/templates/main/main.html");
    //return 'true';
    //return view('pagina_inicial.index',compact('usuario','r','logo','canal'));
});
Route::post('/',function () {
    $start_time = microtime(true);
    $usuario=get_user();
    if (request("type")=="info"){
    if (!session()->has("key_init")){
        $t = 16; $ba = random_bytes($t); $ca = bin2hex($ba); session(["key_init"=>$ca]);
    }
    $conn=new sqli("anjoov00_posts");
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
    $result1=$conn->query("SELECT * FROM post WHERE lixeira='false' ORDER BY id DESC LIMIT 48");
    $result2=$conn->query("SELECT * FROM post_musica ORDER BY id DESC LIMIT 48");
    $res1=p($result1);
    $res2=p($result2);
    function cp($a, $b) {
        return  $b['views_id'] - $a['views_id'];
    }
    $r=array_merge($res1,$res2);
    usort($r,'cp');
    $r=count($r)>48 ? array_slice($r,0,48) : $r;
    // $rss=$conn->query("SELECT COUNT(*) AS num FROM post WHERE lixeira='false'");
    // $n=p($rss)[0]["num"];
    //print_r($r);
    // $r=array_slice($r,$n>=48 ? $n-48 : 0,$n);
    $c=[];
    $canal=[];
    $result=$conn->query("SELECT d,id,views_id FROM post_24");
    $r2=p($result);
    if ($result->num_rows>0){
    $t;
    foreach ($r2 as $rs){
        $dataInicial = new DateTime();
        $formato = "Y-m-d H:i:s"; // Formato da string de data
        $d=json_decode($rs["d"],true);
        $dataFinal = DateTime::createFromFormat($formato, $d);
        $diferenca = $dataInicial->diff($dataFinal);
        if ($diferenca->days>=1) {
            $id=$rs["id"];
                $views_id=$rs["views_id"];
                $conn->query("DELETE FROM post_24 WHERE id=$id");
                $conn->query("UPDATE views SET excluido='true' WHERE excluido='false' AND tipo='post_24' AND id=$views_id");
        }
    }
    $rp1 = $conn->query("SELECT DISTINCT usuario FROM post_24 ORDER BY id DESC LIMIT 20");
    $valores = [];
    while ($row = $rp1->fetch_assoc()) {
        $valores[] = "'" . $row['usuario'] . "'";
    }
    $vs = implode(", ", $valores);
    $r2=p($conn->query("SELECT * FROM post_24 WHERE usuario IN ($vs) ORDER BY id DESC"));

    foreach ($r2 as $r22){
            if (!in_array($r22["usuario"],$c)){
                array_push($c,$r22["usuario"]);
            }
    } foreach ($c as $cs){
        $conn=new sqli("anjoov00_users_conteudo");
        $result=$conn->query("SELECT nome,usuario,logo FROM user WHERE usuario='$cs'");
        $rs=p($result);
        array_push($canal,$rs[0]);
    }
    };
    $end_time = microtime(true);
    $execution_time = ($end_time - $start_time);
    $time=number_format($execution_time, 4);
    echo json_encode(["canal"=>$canal,"posts"=>$r,"st"=>$r2,"time"=>$time,"usuario"=>$usuario]);
    } else {
        echo json_encode(file_get_contents(__DIR__ . "/../public_html/templates/pagina_inicial/main.html"));
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
        $usuario=get_user();
        $ps=request()->query("q");
        if (substr($ps,0,1)=="@"){
            $p = substr($ps,1,strlen($ps));
            $conn = new sqli("anjoov00_users_conteudo");
            $result = $conn->prepare("SELECT nome,usuario,logo,n_posts FROM user WHERE usuario=?",[$p]);
            $canal=p($result);
            $r=[];
            // return view("busca.index",compact("r","usuario","logo","canal"));
            $end_time = microtime(true);
            $execution_time = ($end_time - $start_time);
            $time=number_format($execution_time, 4);
            echo json_encode(["posts"=>$r,"canal"=>$canal,"n_registros"=>$result->num_rows,"time"=>$time]);
        } else {
            $n=0;
            $conn = new sqli("anjoov00_posts");
            $p = '%' . $ps . '%' ;
            // $s = $conn->prepare("SELECT * FROM post  WHERE LOWER(titulo) LIKE LOWER(?) AND lixeira='false' ORDER BY id DESC LIMIT 15");
            $result = $conn->prepare("SELECT *  FROM post  WHERE LOWER(titulo) LIKE LOWER(?) AND lixeira='false' ORDER BY id DESC LIMIT 15",[$p]);
            $r=p($result);
            $result = $conn->prepare("SELECT COUNT(*) AS num  FROM post  WHERE LOWER(titulo) LIKE LOWER(?) AND lixeira='false'",[$p]);
            $n+=p($result)[0]["num"];
            $conn = new sqli("anjoov00_users_conteudo");
            $result = $conn->prepare("SELECT nome,usuario,logo,n_posts FROM user  WHERE LOWER(nome) LIKE LOWER(?) OR LOWER(usuario) LIKE LOWER(?) ORDER BY id DESC LIMIT 5",[$p,$p]);
            $canal=p($result);
            $result = $conn->prepare("SELECT COUNT(*) AS num FROM user  WHERE LOWER(nome) LIKE LOWER(?) OR LOWER(usuario) LIKE LOWER(?)",[$p,$p]);
            $conn=new sqli("anjoov00_posts");
            for ($i=0;$i<count($canal);$i++){
                $c=$canal[$i];
                $n2=0;
                $qs=$conn->prepare("SELECT COUNT(*) AS num FROM post WHERE usuario=? AND lixeira='false'",[$c["usuario"]]);
                if ($qs->num_rows>0){
                    $n2=$n2+p($qs)[0]["num"];
                }
                $qs=$conn->prepare("SELECT COUNT(*) AS num FROM post_musica WHERE usuario=?",[$c["usuario"]]);
                if ($qs->num_rows>0){
                    $n2=$n2+p($qs)[0]["num"];
                }
                $canal[$i]["n_posts"]=$n2;
            }
            $n+=p($result)[0]["num"];
            // echo $n;
            $end_time = microtime(true);
            $execution_time = ($end_time - $start_time);
            $time=number_format($execution_time, 4);
            echo json_encode(["posts"=>$r,"canal"=>$canal,"n_registros"=>$n,"time"=>$time]);
            // return view("busca.index",compact("r","usuario","logo","canal"));
        }
    } else {
        r404();
    }
    } else {
        echo json_encode(file_get_contents(__DIR__ . '/../public_html/templates/busca/main.html'));
    }
});
Route::get("/editorias",function(){
    
    include(__DIR__ . "/inicio.php");
    $conn = new sqli("anjoov00_config");
    $result=$conn->query("SELECT * FROM categorias");
    $r;
    if ($result->num_rows>0){
        $r=p($result);
    }else{
        $r=[];
    }
    $usuario=get_user();
    return view("editorias.index",compact("r","usuario","logo"));
});
Route::get("/noticia",function(){
    // $usuario=get_user() || header("location: /admin");
    // include(__DIR__ . '/../../nextjs/templates/main/main.html');
    // resp("noticia.html");
});
Route::post("/noticia",function(){
    $usuario=get_user();
    if (request("type")=="info"){
    // include(__DIR__ . "/inicio.php");
    if (isset($_GET["id"])){
        $id=request()->query("id");
        $id=intval($id);
        $conn = new sqli("anjoov00_posts");
        $result=$conn->prepare("SELECT * FROM post WHERE id=? AND lixeira='false'",[$id]);
        $r=[];
        if ($result->num_rows>0){
            $r=p($result);
            $r[0]["acessos"]++;
            $acessos=$r[0]["acessos"];
            $views_id=$r[0]["views_id"];
            $acessos_d=json_decode(p($conn->prepare("SELECT acessos_d FROM views WHERE id=? AND tipo='post'",[$views_id]))[0]["acessos_d"],true);
            $d = new DateTime();
            $d = $d->format('Y-m-d H:i:s');
            $json=[];
            $json[$d]=$usuario;
            $acessos_d[]=$json;
            $acessos_d=json_encode($acessos_d);
            $conn->prepare("UPDATE post SET acessos=? WHERE id=? AND lixeira='false'",[$acessos,$id]);
            $conn->prepare("UPDATE views SET acessos_d=? WHERE id=? AND tipo='post'",[$acessos_d,$views_id]);
            response()->json(["usuario"=>$usuario,"post"=>$r]);
            // return view("noticia.index",compact("r","usuario","logo"));
            // include(__DIR__ . '/../public_html/templates/noticia/index.php');
        } else {
            r404();
        }
    } else {
        r404();
    }
    } else {
        echo json_encode(file_get_contents(__DIR__ . '/../public_html/templates/noticia/main.html'));
    }
});
Route::get("/categoria",function(){
    
    include(__DIR__ . "/inicio.php");
    $usuario=get_user();
    if (isset($_GET["name"])){
        $name=request()->query("name");
        $conn = new sqli("anjoov00_config");
        $result=$conn->prepare("SELECT * FROM categorias WHERE link=?",[$name]);
        if ($result->num_rows>0){
            $rc=p($result);
            $categoria=$rc[0]["nome"];
            $conn = new sqli("anjoov00_posts");
            $result=$conn->prepare("SELECT * FROM post WHERE categoria=? AND lixeira='false'",[$categoria]);
            $r=p($result);
            return view("categoria.index",compact("r","usuario","logo"));
        } else {
            r404();
        }
    } else {
        return r404();
    }
});
Route::get(["/@{name}","/@{name}/{parte}"],function($name,$parte=null){
    // $usuario=get_user() || header("location:/admin");
    resp("Canal.html");
    // include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post(["/@{name}","/@{name}/{parte}"],function($name,$parte=null){
    if (request("type")=="info"){
    $name=urldecode($name);
    $conn = new sqli("anjoov00_users_conteudo");
    // $name=request()->query("name");
    $usuario=get_user();
    $result=$conn->prepare("SELECT nome,usuario,logo,banner,n_posts FROM user WHERE usuario=?",[$name]);
    if ($result->num_rows>0){
        $inscrito=false;
        if (isset($usuario)){
            $s=$conn->query("SELECT inscritos FROM user WHERE usuario='$usuario'");
            $r=json_decode(p($s)[0]["inscritos"],true);
            $inscrito=isset($r[$name]);
        }
        $s=$conn->query("SELECT n_inscritos FROM inscritos WHERE usuario='$name'");
        $conn = new sqli("anjoov00_posts");
        $s=p($s)[0];
        $info=p($result);
        $info[0]["n_inscritos"]=$s["n_inscritos"];
        $n2=0;
        $qs=$conn->prepare("SELECT COUNT(*) AS num FROM post WHERE usuario=? AND lixeira='false'",[$name]);
        if ($qs->num_rows>0){
            $n2=$n2+p($qs)[0]["num"];
        }
        $qs=$conn->prepare("SELECT COUNT(*) AS num FROM post_musica WHERE usuario=?",[$name]);
        if ($qs->num_rows>0){
            $n2=$n2+p($qs)[0]["num"];
        }
        $info[0]["n_posts"]=$n2;
        $num=$info[0]["n_posts"];
        $result=$conn->prepare("SELECT usuario,titulo,id,views_id,imagem FROM post WHERE usuario=? AND lixeira='false' ORDER BY id DESC LIMIT 48",[$name]);
        $posts=p($result);
        $musicas=p($conn->prepare("SELECT usuario,titulo,id,views_id,capa FROM post_musica WHERE usuario=? ORDER BY id DESC LIMIT 48",[$name]));
        // $posts=$result->num_rows>0 ? p($result) : [];
        // $posts =$result->num_rows>0 ? array_slice($posts, , 12) : [];
        $conn = new sqli("anjoov00_users_conteudo");
        $result=$conn->query("SELECT n_posts FROM user WHERE usuario='$name'");
        $n=p($result)[0]["n_posts"];
        response()->json(["name"=>$info[0]["usuario"],"posts"=>$posts,"n"=>$num,"info"=>$info[0],"inscrito"=>$inscrito,"usuario"=>$usuario,"musicas"=>$musicas]);
        //return view('canal.index',compact("info","posts","num","usuario","logo"));
        // return 
    } else {
        r404();
    }
    } else {
        echo json_encode(file_get_contents(__DIR__ . '/../public_html/templates/canal/main.html'));
    }
});
Route::post("/canal",function(){
    $name=request()->query("name");
    $conn = new sqli("anjoov00_users_conteudo");
    $usuario=get_user();
    if ($usuario){
        if ($usuario==$name){
            response()->json(["result"=>p($conn->prepare("SELECT n_inscritos FROM inscritos WHERE usuario=?",[$usuario]))[0]["n_inscritos"],"usuario"=>$usuario]);
        } else {
            $s=$conn->prepare("SELECT inscritos,n_inscritos FROM user WHERE usuario=?",[$usuario]);
            $s=p($s)[0];
            $n_inscritos=$s["n_inscritos"];
            $inscritos=json_decode($s["inscritos"],true);
            if (isset($inscritos[$name])){
                unset($inscritos[$name]);
                $inscritos=json_encode($inscritos);
                $n_inscritos=intval($n_inscritos)-1;
                $s=$conn->prepare("UPDATE user SET inscritos=?, n_inscritos=? WHERE usuario=?",[$inscritos,$n_inscritos,$usuario]);
                $s=$conn->query("SELECT * FROM inscritos WHERE usuario='$name'");
                $s=p($s)[0];
                $inscritos=json_decode($s["inscritos"],true);
                unset($inscritos[$usuario]);
                $n_inscritos=intval($s["n_inscritos"])-1;
                $inscritos=json_encode($inscritos);
                $s=$conn->prepare("UPDATE inscritos SET inscritos=?,n_inscritos=? WHERE usuario=?",[$inscritos,$n_inscritos,$name]);
                response()->json(["result"=>$n_inscritos,"usuario"=>$usuario]);
            } else {
                $inscritos[$name]="true";
                $inscritos=json_encode($inscritos);
                $n_inscritos=intval($n_inscritos)+1;
                $s=$conn->prepare("UPDATE user SET inscritos=?, n_inscritos=? WHERE usuario=?",[$inscritos,$n_inscritos,$usuario]);
                $s=$conn->prepare("SELECT * FROM inscritos WHERE usuario=?",[$name]);
                $s=p($s)[0];
                $inscritos=json_decode($s["inscritos"],true);
                $inscritos[$usuario]="true";
                $n_inscritos=intval($s["n_inscritos"])+1;
                $inscritos=json_encode($inscritos);
                $s=$conn->prepare("UPDATE inscritos SET inscritos=?,n_inscritos=? WHERE usuario=?",[$inscritos,$n_inscritos,$name]);
                response()->json(["result"=>$n_inscritos,"usuario"=>$usuario]);
            };
        };
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
});
Route::get("/ajeitar",function(){
    // require(__DIR__ . "/../function.php");
    // $conn = new sqli("anjoov00_users_conteudo");
    // $s=$conn->query("SELECT * FROM user");
    // $r=p($s);
    // $t=[];
    $conn=new sqli("anjoov00_users_conteudo");
    $users=p($conn->query("SELECT usuario,n_posts FROM user"));
    foreach($users as $user){
        $usuario=$user["usuario"];
        $conn=new sqli("anjoov00_posts");
        $num=p($conn->prepare("SELECT COUNT(*) AS num FROM post WHERE lixeira='false' AND usuario=?",[$usuario]))[0]["num"];
        $conn=new sqli("anjoov00_users_conteudo");
        $conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$num,$usuario]);
    }
    // $sj=json_encode([]);
    // $s=$conn->prepare("UPDATE user SET inscritos=?,n_inscritos=0",[$sj]);
    // $s=$conn->prepare("UPDATE inscritos SET inscritos=?,n_inscritos=0",[$sj]);
    // $nn=0;
    // foreach ($r as $user){
    //     $nn++;
    //     $usuario=$user["usuario"];
    //     $id=$nn;
    //     $conn->query("UPDATE user SET id=$id WHERE usuario='$usuario'");
    //     $s=$conn->prepare("UPDATE user SET inscritos=? WHERE usuario=?");
    //     $conn = new sqli("anjoov00_posts");
    //     $result=$conn->prepare("SELECT COUNT(*) AS num FROM post WHERE usuario=? AND lixeira='false'",[$usuario]);
    //     $num=p($result)[0]["num"];
    //     $t[$usuario]=$num;
    //     $nome=$user["nome"];
    //     $s=$conn->prepare("UPDATE post SET nome=? WHERE usuario=?",[$nome,$usuario]);
    //     $conn = new sqli("anjoov00_users_conteudo");
    //     $s=$conn->prepare("UPDATE user SET n_posts=? WHERE usuario=?",[$num,$usuario]);
    // }
    // $conn = new sqli("anjoov00_posts");
    // $result=$conn->query("SELECT * FROM post");
    // $r=p($result);
    // foreach ($r as $p){
    //     $id=$p["id"];
    //     date_default_timezone_set('GMT'); 
    //     $d = new DateTime();
    //     $d = $d->format('Y-m-d H:i:s');
    //     $d=["o"=>$d];
    //     $d=json_encode($d);
    //     $s=$conn->prepare("UPDATE post SET d=? WHERE id=?",[$d,$id]);
    // }
    // $conn = new sqli("anjoov00_posts");
    // $result=$conn->query("SELECT * FROM post");
    // $r=p($result);
    // foreach ($r as $p){
    //     if ($p["imagem"]!="n" && $p["imagem"]!=""){
    //     $img=imagem(__DIR__ . '/../public_html/images/' . $p["imagem"]);
    //     $img->resize(1280,720);
    //     }
    // }
    return response()->json(["teste"=>true]);
});
Route::get('/inscricoes', function () {
    $usuario=get_user() || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/inscricoes",function(){
    // return view('welcome');
    // $logo;
    $usuario=get_user();
    if ($usuario){
        if (request("type")=="info"){
            $conn=new sqli("anjoov00_users_conteudo");
            $r=$conn->query("SELECT inscritos FROM user WHERE usuario='$usuario'");
            $r=json_decode(p($r)[0]["inscritos"],true);
            $rk=array_keys($r);
            $posts=[];
            $r=[];
            $r2=[];
            $canal=[];
            function pmo($a,$b){
                return $b["views_id"] - $a["views_id"];
            }
            foreach($rk as $nome){
            $conn=new sqli("anjoov00_posts");
            $result=$conn->query("SELECT * FROM post WHERE lixeira='false' AND usuario='$nome' ORDER BY id DESC LIMIT 10");
            $result2=$conn->query("SELECT * FROM post_musica WHERE usuario='$nome' ORDER BY id DESC LIMIT 10");
            $rs=p($result);
            $rs2=p($result2);
            $rs=array_merge($rs,$rs2);
            $n=count($rs);
            usort($rs,"pmo");
            $rs=$n>10 ? array_slice($rs,0,10) : $rs;
            $c=[];
            $r=array_merge($r,$rs);
            $result=$conn->query("SELECT d,id,views_id FROM post_24 WHERE usuario='$nome' ORDER BY id DESC");
            $r2s=p($result);
            $t;
            foreach ($r2s as $rs){
                $dataInicial = new DateTime();
                $formato = "Y-m-d H:i:s"; // Formato da string de data
                $d=json_decode($rs["d"],true);
                $dataFinal = DateTime::createFromFormat($formato, $d);
                $diferenca = $dataInicial->diff($dataFinal);
                if ($diferenca->days>=1) {
                    $id=$rs["id"];
                    $views_id=$rs["views_id"];
                    $conn->query("DELETE FROM post_24 WHERE id=$id");
                    $conn->query("UPDATE views SET excluido='true' WHERE excluido='false' AND tipo='post_24' AND id=$views_id");
                }
            }
            $result=$conn->query("SELECT * FROM post_24 WHERE usuario='$nome'");
            $r2s=p($result);
            foreach($r2s as $s){
                array_push($r2,$s);
            }
            foreach ($r2s as $r22){
                    if (!in_array($r22["usuario"],$c)){
                        array_push($c,$r22["usuario"]);
                    }
            } foreach ($c as $cs){
                $conn=new sqli("anjoov00_users_conteudo");
                $result=$conn->query("SELECT nome,usuario,logo FROM user WHERE usuario='$cs'");
                $rs=p($result);
                array_push($canal,$rs[0]);
            }
            // include_base("public_html/templates/pagina_inicial/index.php");
            // $conn=new sqli("anjoov00_users_conteudo");
            // $logo=$conn->query("SELECT logo FROM user WHERE usuario='$usuario'");
            // $logo=p($logo)[0];
            };
            function cp($a, $b) {
                return  $b['views_id'] - $a['views_id'];
            }
            usort($r,'cp');
            $r=$n>48 ? array_slice($r,0,48) : $rs;
            echo json_encode(["canal"=>$canal,"posts"=>$r,"st"=>$r2,"usuario"=>$usuario]);
        } else {
            echo json_encode(file_get_contents(__DIR__ . '/../public_html/templates/inscricoes/main.html'));
        }
    } else {
        echo json_encode(["header_location"=>"/admin"]);
    };
    //return 'true';
    //return view('pagina_inicial.index',compact('usuario','r','logo','canal'));
});

// Route::post("/inscricoes",function(){
//     
//     $id=request("id");
//     $conn=new sqli("anjoov00_posts");
//     $s=$conn->query("SELECT acessos FROM post_24 WHERE id=$id");
//     $acessos=p($s)[0]["acessos"]+1;
//     $s=$conn->prepare("UPDATE post_24 SET acessos=? WHERE id=?",[$acessos,$id]);
// });
Route::get("/m_inscricoes",function(){
    $usuario=get_user() || header("location:/admin");
    include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/m_inscricoes",function(){
    
    $usuario=get_user();
    if ($usuario){
        if (request("type")=="info"){
            $conn = new sqli("anjoov00_users_conteudo");
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
            echo json_encode(["cis"=>$cis]);
        } else {
            echo json_encode(file_get_contents(__DIR__ . '/../public_html/templates/m_inscricoes/main.html'));
        }
    } else {
        echo json_encode(["header_location"=>"/admin"]);
    }
});
Route::get("/stories/{id}",function($id){
    $usuario=get_user() || header("location: /admin");
    resp("/stories/[id].html");
    // include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/stories/{id}",function($id){
    $usuario=get_user();
    if ($usuario){
    if (request("type")=="info"){
        $id=intval($id);
        $conn = new sqli("anjoov00_posts");
        $s=$conn->query("SELECT usuario FROM post_24 WHERE id=$id");
        $s=p($s)[0]["usuario"];
        $posts=p($conn->query("SELECT * FROM post_24 WHERE usuario='$s'"));
        response()->json(["id"=>$id,"posts"=>$posts,"usuario"=>$usuario]);
    } else if (request("type")=="option"){
        $conn=new sqli("anjoov00_posts");
        $s=$conn->query("SELECT * FROM post_24 WHERE id=$id");
        $result=p($s)[0];
        $acessos=$result["acessos"]+1;
        $views_id=$result["views_id"];
        $s=$conn->prepare("UPDATE post_24 SET acessos=? WHERE id=?",[$acessos,$id]);
        $d = new DateTime();
        $d = $d->format('Y-m-d H:i:s');
        $json=[];
        $json[$d]=$usuario;
        $acessos_d=json_decode(p($conn->prepare("SELECT acessos_d FROM views WHERE id=? AND tipo='post_24'",[$views_id]))[0]['acessos_d'],true);
        $acessos_d[]=$json;
        $acessos_d=json_encode($acessos_d);
        $conn->prepare("UPDATE views SET acessos_d=? WHERE id=? AND tipo='post_24'",[$acessos_d,$views_id]);
        response()->json(["result"=>"true","usuario"=>$usuario]);
    } else {
        response()->json(file_get_contents(__DIR__ . '/../public_html/templates/stories/main.html'));
    } 
    } else {
        response()->json(["header_location"=>"/admin"]);
    }
});
Route::get("/ajeitar2",function(){
    $conn=new sqli("anjoov00_posts");
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
Route::get("/musica",function(){
    // $usuario=get_user() || ("location: /admin");
    resp("musica.html");
    // include(__DIR__ . '/../public_html/templates/main/main.html');
});
Route::post("/musica",function(){
    $usuario=get_user();
    if (request("type")=="info"){
        if (isset($_GET["id"])){
            $conn=new sqli("anjoov00_posts");
            $id=intval(request()->query("id"));
            $result=$conn->prepare("SELECT * FROM post_musica WHERE id=?",[$id]);
            if ($result->num_rows>0){
                $result=p($result)[0];
                $acessos=$result["acessos"]+1;
                $views_id=$result["views_id"];
                $titulo=$result["titulo"];
                $capa=$result["capa"];
                $arquivo=$result["arquivo"];
                $conn->prepare("UPDATE post_musica SET acessos=? WHERE id=?",[$acessos,$id]);
                $acessos_d=json_decode(p($conn->prepare("SELECT acessos_d FROM views WHERE id=?",[$views_id]))[0]["acessos_d"],true);
                $d=new DateTime();
                $d = $d->format('Y-m-d H:i:s');
                $json[$d]=$usuario;
                $acessos_d[]=$json;
                $acessos_d=json_encode($acessos_d);
                $conn->prepare("UPDATE views SET acessos_d=? WHERE id=? AND tipo='post_musica'",[$acessos_d,$views_id]);
                response()->json(["titulo"=>$titulo,"capa"=>$capa,"arquivo"=>$arquivo,"usuario"=>$usuario]);
            } else {
                r404();
            }
        } else {
            r404();
        }
    } else {
        response()->json(file_get_contents(__DIR__ . '/../public_html/templates/musica/main.html'));
    }
    // } else {
    //     response()->json(["header_location"=>"/admin"]);
    // }
});
Route::post("/comentarios",function(){
    $usuario=get_user();
    if (request("type")=="option"){
        $dados=request()->all();
        $tipo=$dados["tipo"];
        $post_id=$dados["post_id"];
        $conn=new sqli("anjoov00_posts");
        if (request("operation")=="get_comentarios"){
            $count=p($conn->prepare("SELECT COUNT(*) AS num FROM comment WHERE tipo=? AND post_id=?",[$tipo,$post_id]))[0]["num"];
            $result=$conn->prepare("SELECT usuario,texto,d FROM comment WHERE tipo=? AND post_id=? ORDER BY id DESC LIMIT 50",[$tipo,$post_id]);
            $comentarios=p($result);
            $logos=[];
            $conn=new sqli("anjoov00_users_conteudo");
            foreach($comentarios as $comentario){
                $user=$comentario["usuario"];
                if (!isset($logos[$user])){
                    $logos[$user]=p($conn->prepare("SELECT logo FROM user WHERE usuario=?",[$user]))[0]["logo"];
                }
            }
            response()->json(["comentarios"=>$comentarios,"logos"=>$logos,"count"=>$count,"usuario"=>$usuario]);
        } else {
            if (!$usuario){
                response()->json(["header_location"=>"/admin"]);
            } else {
                $texto=$dados["texto"];
                $result=$conn->prepare("SELECT id FROM comment WHERE tipo=? AND post_id=? ORDER BY id DESC LIMIT 1",[$tipo,$post_id]);
                $id=1;
                if ($result->num_rows>0){
                    $id=p($result)[0]["id"];
                };
                $d = new DateTime();
                $d = $d->format('Y-m-d H:i:s');
                $d=json_encode($d);
                $conn->prepare("INSERT INTO comment(usuario,tipo,texto,d,post_id,id) VALUES(?,?,?,?,?,?)",[$usuario,$tipo,$texto,$d,$post_id,$id]);
                response()->json(["result"=>"true","usuario"=>$usuario]);
            }
        }
    }
});
Route::post("/view",function(){
    if (same_site()){
    $usuario=get_user();
    $dados=request()->all();
    $tipo=$dados["tipo"];
    $conn=new sqli("anjoov00_posts");
    $token;
    if (!session()->has("token_view")){
        $token=uniqid();
        session(["token_view"=>$token]);
    } else {
        $token=session("token_view");
    }
    $d=new DateTime();
    $result=p($conn->query("SELECT * FROM views_atual"));
    foreach($result as $v){
        $dv=$v["d"];
        $dv=DateTime::createFromFormat('Y-m-d H:i:s', $dv);
        $dv->modify('+10 seconds');
        if ($d>$dv){
            $conn->prepare("DELETE FROM views_atual WHERE id=?",[$v["id"]]);
        }
    }
    if ($dados["operator"]=="delete"){
        $conn->prepare("DELETE FROM views_atual WHERE id=?",[$token]);
    } else {
        $result=$conn->prepare("SELECT * FROM views_atual WHERE id=?",[$token]);
        $d=$d->format("Y-m-d H:i:s");
        if ($result->num_rows==0){
            $conn->prepare("INSERT INTO views_atual(usuario,tipo,d,id) VALUES(?,?,?,?)",[$usuario,$tipo,$d,$token]);
        } else {
            $conn->prepare("UPDATE views_atual SET d=? WHERE id=?",[$d,$token]);
        }
    };
    // if ($dados["operator"]=="new"){
    //     $d=new DateTime();
    //     $d=$d->format("Y-m-d H:i:s");
    //     $conn->prepare("INSERT INTO views_atual(usuario,tipo,d,id) VALUES(?,?,?,?)",[$usuario,$tipo,$d,$token]);
    // } else {
    //     $conn->prepare("DELETE FROM views_atual WHERE id=?",[$token]);
    // }
    //echo json_encode("true");
    };
});
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
        echo json_encode(["result"=>"true","n"=>$diretorioDaPasta]);
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
        echo json_encode(["result"=>"true"]);
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
        
                    echo json_encode(["result"=>"true"]);
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
Route::post("/ajeitar",function(){
    $conn=new sqli("anjoov00_posts");
    $rs=$conn->query("SELECT * FROM post");
    $rs2=$conn->query("SELECT usuario,capa,id FROM post_musica");
    $rs3=$conn->query("SELECT usuario,imagem,id FROM post_24");
    $conn=new sqli("anjoov00_users_conteudo");
    $rs4=$conn->query("SELECT logo,banner FROM user");
    $conn=new sqli("anjoov00_posts");
    function create($img){
        $absolute=__DIR__ . '/../public_html/images/';
        $path;
        $c1=pathinfo($absolute . $img)["filename"] . ".jpeg";
        $c2=pathinfo($absolute . $img)["filename"] . ".jpg";
        $c3=pathinfo($absolute . $img)["filename"] . ".webp";
        if (is_file($absolute . $c1)){
            $path=$c1;
        }
        if (is_file($absolute . $c2)){
            $path=$c2;
        }
        if (is_file($absolute . $c3)){
            $path=$c3;
            return false;
        }
        // echo $img . "&" . $path;
        // echo $path;
        // $file=imagecreatefromwebp($absolute . $path);
        // imagewebp($file, $absolute . $path, 80); // O terceiro parâmetro é a qualidade (de 0 a 100)
        // imagedestroy($file);
        $caminhoImagemOriginal=$absolute . $path;

        list($largura, $altura, $tipo) = getimagesize($caminhoImagemOriginal);

        switch ($tipo) {
            case IMAGETYPE_JPEG:
                $imagemOriginal = imagecreatefromjpeg($caminhoImagemOriginal);
                break;
            case IMAGETYPE_PNG:
                $imagemOriginal = imagecreatefrompng($caminhoImagemOriginal);
                break;
            case IMAGETYPE_GIF:
                $imagemOriginal = imagecreatefromgif($caminhoImagemOriginal);
                break;
            case IMAGETYPE_WEBP:
                $imagemOriginal = imagecreatefromwebp($caminhoImagemOriginal);
                break;
            default:
                // Se o tipo não for suportado, você pode lidar com isso ou emitir uma mensagem de erro
                // die('Tipo de imagem não suportado.' . $path);
                // echo $path;
        }

        // Criar uma nova imagem em branco (formato WebP)
        $novaImagem = imagecreatetruecolor($largura, $altura);

        // Copiar a imagem original para a nova imagem
        imagecopy($novaImagem, $imagemOriginal, 0, 0, 0, 0, $largura, $altura);

        // Caminho para salvar a nova imagem WebP
        $caminhoImagemWebP = $absolute . pathinfo($absolute . $path)["filename"] . ".webp";

        // Salvar a imagem como WebP
        imagewebp($novaImagem, $caminhoImagemWebP, 80); // 80 é a qualidade (de 0 a 100)

        // Liberar a memória
        imagedestroy($imagemOriginal);
        imagedestroy($novaImagem);
        if ($path!=$c3){
            unlink($absolute . $path);
        }
    }
    $p=p($rs);
    $absolute=__DIR__ . '/../public_html/images/';
    $e=[];
    foreach ($p as $a){
        // if (strpos($a["imagem"],".jpg")!=false){
        array_push($e,substr($a["imagem"], -4));
        // }
        $img=pathinfo($absolute . $a["imagem"])["filename"] . ".webp";
        create($img);
        $conn->prepare("UPDATE post SET imagem=? WHERE id=?",[$img,$a["id"]]);

    }
    // print_r($e);
    $p2=p($rs2);
    foreach ($p2 as $a){
        $img=pathinfo($absolute . $a["capa"])["filename"] . ".webp";
        create($img);
        $conn->prepare("UPDATE post_musica SET capa=? WHERE id=?",[$img,$a["id"]]);
    }
    $p3=p($rs3);
    foreach ($p3 as $a){
        $img=pathinfo($absolute . $a["imagem"])["filename"] . ".webp";
        create($img);
        $conn->prepare("UPDATE post_24 SET imagem=? WHERE id=?",[$img,$a["id"]]);
    }
    // $p4=p($rs4);
    // foreach ($p4 as $a){
    //     $logo=pathinfo($absolute . $a["logo"])["filename"] . ".webp";
    //     create($logo);
    //     $banner=pathinfo($absolute . $a["banner"])["filename"] . ".webp";
    //     create($banner);
    //     $conn->prepare("UPDATE logo,banner SET logo=?,banner=? WHERE id=?",[$logo,$banner,$a["id"]]);
    // }
}); 
include(__DIR__ . '/admin.php');