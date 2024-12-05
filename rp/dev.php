<?php
Route::get('/dev', function(){
    $usuario="n";
    $url;
    include(__DIR__ . "/../function.php");
    if (session()->has("key_admin") && descrip2(session("key_admin"))){
        $usuario="anjoovi";
        return view("dev.dev_inicio.index",compact("usuario"));
    } else{
        return view("dev.dev_login.index");
    }
    if (!session()->has("key_init")){
        $t = 16; $ba = random_bytes($t); $ca = bin2hex($ba); session(["key_init"=>$ca]);
    }
});
Route::post('/dev',function(){
    include(__DIR__ . "/../function.php");
    $dados=request()->all();
    function resp($texto){
        return response($texto, 200)
        ->header('Content-Type', 'text/plain');
    }
    try{
    function cript($usuario,$c){
        $k=crip($usuario,$c);
        session(["key_admin"=>$k]);
    }
    $type=$dados["type"];
    if ($type=="login"){
        $email=$dados["email"];
        $senha=$dados["senha"];
        $conn=new mysqli("localhost:3306", $ub,$sb,"anjoov00_users_conteudo");
        $conn->query("CREATE TABLE IF NOT EXISTS user(nome TEXT, usuario TEXT, email TEXT, senha TEXT,data_n TEXT)");
        $s=$conn->prepare("SELECT usuario,email,senha FROM user WHERE (usuario=? || email=?) AND senha=?");
        $s->bind_param("sss",$email,$email,$senha);$s->execute();$result=$s->get_result();
        if ($result->num_rows>0){
            $usuario=p($result)[0]["usuario"];
            cript($usuario,$c);
            return response()->json("true");
        } else {
            return response()->json("false");
        }
    } else if ($type=="cadastro"){
        $nome=$dados["nome"];
        $usuario=$dados["usuario"];
        $email=$dados["email"];
        $senha=$dados["senha"];
        $month=$dados["month"];
        $day=$dados["day"];
        $year=$dados["year"];
        $conn=new mysqli("localhost:3306", $ub,$sb,"anjoov00_users_conteudo");
        $s=$conn->prepare("SELECT * FROM user WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
        if ($result->num_rows>0){
            return response()->json("false");
        } else {
            $data = new DateTime("$year-$month-$day");
            $data_str= $data->format('d/m/Y');
            $s=$conn->prepare("INSERT INTO user(nome,usuario,email,senha,data_n) VALUES(?,?,?,?,?)");$s->bind_param("sssss",$nome,$usuario,$email,$senha,$data_n);$s->execute();
            cript($usuario,$c);
            return response()->json("true");
        }
        }
    } catch (Exception $e){
        return resp($e);
    }
  
});
Route::get("/dev/noticias_cadastro",function (){
    include(__DIR__ . "/../function.php");
    include(__DIR__ . "/dev_v.php");
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
    $result=$conn->query("SELECT nome FROM categorias");
    $r;
    if ($result->num_rows>0){
        $r=p($result);
    } else {
        $r=[];
    }
    $select_options=$r;
    $usuario=descrip(session("key_admin"),$c);
    return view("dev.noticias_cadastro.index",compact("select_options","usuario"));
});
Route::post("/dev/noticias_cadastro",function(Request $request){
    include(__DIR__ . "/../function.php");
    function resp($texto){
        return response($texto, 200)
        ->header('Content-Type', 'text/plain');
    }
    $dados=request()->all();
    $type=request()->query("type");
    $usuario = descrip2(session("key_admin"));
    $categoria=$dados["categoria"];
    $destaque=$dados["destaque"];
    $titulo=$dados["titulo"];
    $subtitulo=$dados["subtitulo"];
    $acessos=0;
    $texto;
    $imagem;
    $id=$type=="cadastro" ? null : $dados["id"];
    $texto=isset($dados["texto"]) ? $dados["texto"] : "n";
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
    $conn->query("CREATE TABLE IF NOT EXISTS post(usuario TEXT, categoria TEXT, destaque TEXT, titulo TEXT, subtitulo TEXT, texto TEXT, imagem TEXT, acessos INT, id INT, lixeira TEXT)");
    if ($type=="cadastro"){
        $result=$conn->query("SELECT id FROM post");
        $id;
        if ($result->num_rows==0){
            $id=1;
        } else {
            $id=p($result);
            $id=end($id)["id"]+1;
        }
    }
    if (($type=="cadastro" || isset($dados["imagem_edit"])) && request()->has("imagem")) {
        if (request()->has("imagem")) {
            $file = request()->file("imagem");
    
            // Salvar a imagem em um diretório
            $caminhoDestino = __DIR__ . "/../public_html/images/";
            $imagem = $file->getClientOriginalName();
            $imagem=$id . "_" . $imagem;
            $file->move($caminhoDestino,$imagem);
    
            // Agora a imagem foi salva no diretório especificado
        }
    } else {
        $imagem=$type=="cadastro" ? "n" : $imagem=$dados["imagem"];
    }
    if ($type=="cadastro"){
    $s=$conn->prepare("INSERT INTO post(usuario,categoria,destaque,titulo,subtitulo,texto,imagem,acessos,id,lixeira) VALUES (?,?,?,?,?,?,?,?,?,?)");
    $lixeira="false";
    $s->bind_param("sssssssiis",$usuario,$categoria,$destaque,$titulo,$subtitulo,$texto,$imagem,$acessos,$id,$lixeira);
    $s->execute();
    } else if ($type=="edit"){
    $s=$conn->prepare("UPDATE post SET categoria=?,destaque=?,titulo=?,subtitulo=?,texto=?,imagem=?,acessos=? WHERE usuario=? AND id=?");
    $s->bind_param("ssssssisi",$categoria,$destaque,$titulo,$subtitulo,$texto,$imagem,$acessos,$usuario,$id);
    $s->execute();
    }
    return response()->json("true");
});
Route::get("/dev/noticias_edit",function(){
    include(__DIR__ . "/../function.php");
    include(__DIR__ . "/dev_v.php");
    $usuario=descrip2(session("key_admin"));
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
    $id=request()->query("id");
    $id=intval($id);
    $s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND id=?");$s->bind_param("si",$usuario,$id);$s->execute();$result=$s->get_result();
    $r=p($result);
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
    $result=$conn->query("SELECT nome FROM categorias");
    $r2;
    if ($result->num_rows>0){
        $r2=p($result);
    }else{
        $r2=[];
    }
    $select_options=$r2;
    return view("dev.noticias_edit.index",compact("select_options","r","usuario"));
});
Route::get("/dev/noticias_lista",function(){
    include(__DIR__ . "/../function.php");
    include(__DIR__ . "/dev_v.php");
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
    $usuario=descrip(session("key_admin"),$c);
    $s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND lixeira='false'");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
    $r=[];
    if ($result->num_rows>0){
        while ($row = $result->fetch_assoc()) { $r[] = $row; }
    }
    return view("dev.noticias_lista.index",compact("r","usuario"));
});
Route::post("/dev/noticias_lista",function(){
    include(__DIR__ . "/../function.php");
    $usuario=descrip2(session("key_admin"));
    $id=request("id");
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
    $s=$conn->prepare("SELECT * FROM post WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
    // unlink(__DIR__ . "/../images/" . p($result)[0]["imagem"]);
    //$s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?");$s->bind_param("is",$id,$usuario);$s->execute();
    $s=$conn->prepare("UPDATE post SET lixeira='true' WHERE usuario=? AND id=?");$s->bind_param("si",$usuario,$id);$s->execute();$result=$s->get_result();
    $s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND lixeira='false'");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
    $r=[]; while ($row = $result->fetch_assoc()) { $r[] = $row; }; return response()->json($r);

});
Route::get("/dev/noticias_lixeira",function(){
    include(__DIR__ . "/../function.php");
    include(__DIR__ . "/dev_v.php");
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
    $usuario=descrip2(session("key_admin"));
    $s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND lixeira='true'");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
    $r=[];
    if ($result->num_rows>0){
        while ($row = $result->fetch_assoc()) { $r[] = $row; }
    }
    return view("dev.noticias_lixeira.index",compact("r","usuario"));
});
Route::post("/dev/noticias_lixeira",function(){
    include(__DIR__ . "/../function.php");
    $dados=request()->all();
    $type=request()->query("type");
    if ($type=="repor"){
        $id=$dados["id"];
        $usuario=descrip2(session("key_admin"));
        $id=intval($id);
        $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
        $s=$conn->prepare("UPDATE post SET lixeira='false' WHERE id=? AND usuario=?");$s->bind_param("is",$id,$usuario);$s->execute();
        $s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND lixeira='true'");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
        $r=p($result);
        return response()->json($r);
    }
    if ($type=="remove"){
        $id=$dados["id"];
        $usuario=descrip2(session("key_admin"));
        $id=intval($id);
        $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_posts");
        $s=$conn->prepare("DELETE FROM post WHERE id=? AND usuario=?");$s->bind_param("is",$id,$usuario);$s->execute();
        $s=$conn->prepare("SELECT * FROM post WHERE usuario=? AND lixeira='true'");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
        $r=p($result);
        return response()->json($r);
    }
});
Route::get("/dev/categorias_cadastro",function(){
    include(__DIR__ . "/../function.php");
    include(__DIR__ . "/dev_v.php");
    include(__DIR__ . "/../require.php");
    $usuario=descrip2(session("key_admin"));
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
    $result=$conn->query("SELECT * FROM categorias");
    $r=[];
    while ($row = $result->fetch_assoc()) { $r[] = $row; }
    return view("dev.categorias_cadastro.index",compact("r","usuario"));
});
Route::post("/dev/categorias_cadastro",function(){
    include(__DIR__ . '/../function.php');
    $dados=request()->all();
    function resp($texto){
        return response($texto, 200)
        ->header('Content-Type', 'text/plain');
    }
    if ($dados["type"]=="cadastro"){
        $nome=$dados["nome"];
        $descricao=$dados["descricao"];
        $link=$dados["link"];
        $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
        $conn->query("CREATE TABLE IF NOT EXISTS categorias(id INT,nome TEXT,descricao TEXT,link TEXT)");
        $result=$conn->query("SELECT id FROM categorias");
        $id;
        if ($result->num_rows==0){
            $id=1;
        } else {
            $id=p($result);
            $id=end($id)["id"]+1;
        }
        $s=$conn->prepare("INSERT INTO categorias(id,nome,descricao,link) VALUES(?,?,?,?)");
        $s->bind_param("isss",$id,$nome,$descricao,$link);
        $s->execute();
        $result=$conn->query("SELECT * FROM categorias");
        $r=p($result);
        return response()->json($r);
    } else if ($dados["type"]=="remove"){
        $id=request()->query("id");
        $id=intval($id);
        $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
        $s=$conn->prepare("DELETE FROM categorias WHERE id=?");
        $s->bind_param("i",$id);
        $s->execute();
        $result=$conn->query("SELECT * FROM categorias");
        $r=p($result);
        return response()->json($r);
    }
});
Route::get("/dev/categorias_edit",function(){
    include(__DIR__ . "/../function.php");
    include(__DIR__ . "/dev_v.php");
    include(__DIR__ . "/../require.php");
    $id=request()->query("id");
    $id=intval($id);
    $usuario=descrip2(session("key_admin"));
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_config");
    $result=$conn->query("SELECT * FROM categorias");
    $all=[];
    if ($result->num_rows>0){
        while ($row = $result->fetch_assoc()) { $all[] = $row; }
    } else {
        return view("erro.404");
    }
    $conn = new mysqli("localhost:3306", $ub, $sb,"anjoov00_config");
    $s=$conn->prepare("SELECT * FROM categorias WHERE id=?");
    $s->bind_param("i",$id);
    $s->execute();
    $result=$s->get_result();
    $r=[];
    while ($row = $result->fetch_assoc()) { $r[] = $row; }
    return view("dev.categorias_edit.index",compact("all","r","usuario"));
});
Route::get("/dev/settings",function(){
    include(__DIR__ . "/../function.php");
    include(__DIR__ . "/dev_v.php");
    $usuario=descrip2(session("key_admin"));
    $conn = new mysqli("localhost:3306", $ub, $sb,"anjoov00_users_conteudo");
    $s=$conn->prepare("SELECT * FROM user WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$config=$s->get_result();
    $config=p($config)[0];
    return view("dev.settings.index",compact("usuario","config"));
});
Route::post("/dev/settings",function(){
    include(__DIR__ . "/../function.php");
    $type=request()->query("type");
    $usuario=descrip2(session("key_admin"));
    $conn = new mysqli("localhost:3306", $ub, $sb,"anjoov00_users_conteudo");
    $s=$conn->prepare("SELECT * FROM user WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$config=$s->get_result();
    $config=p($config)[0];
    if ($type=="logo"){
        if (isset($config["logo"])){
            unlink(__DIR__ . "/../public_html/images/".$config["logo"]);
        }
        $logo;
        if (request()->has("logo")) {
            $file = request()->file("logo");
            $caminhoDestino = __DIR__ . "/../public_html/images/";
            $logo = $file->getClientOriginalName();
            $logo=$usuario . "_logo_" . $logo;
            $file->move($caminhoDestino,$logo);
        }
        $s=$conn->prepare("UPDATE user SET logo=? WHERE usuario=?");
        $s->bind_param("ss",$logo,$usuario);
        $s->execute();
        return response()->json("true");
    }
    if ($type=="banner"){
        if (isset($config["banner"])){
            unlink(__DIR__ . "/../public_html/images/".$config["banner"]);
        }
        $banner;
        if (request()->has("banner")) {
            $file = request()->file("banner");
            $caminhoDestino = __DIR__ . "/../public_html/images/";
            $banner = $file->getClientOriginalName();
            $banner=$usuario . "_banner_" . $banner;
            $file->move($caminhoDestino,$banner);
        }
        $s=$conn->prepare("UPDATE user SET banner=? WHERE usuario=?");
        $s->bind_param("ss",$banner,$usuario);
        $s->execute();
        return response()->json("true");
    }
});
Route::get("/dev/sair",function(){
    include(__DIR__ . '/../function.php');
    include(__DIR__ . "/dev_v.php");
    session()->forget("key_admin");
    return redirect("/");
});