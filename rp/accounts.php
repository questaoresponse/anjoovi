<?php
use Illuminate\Support\Facades\Route;
// namespace App\Http\Controllers;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;


// class accounts extends Controller
// {
//     //
//     public function main(){
    
        // Route::get('/', function(){
        //     $usuario="n";
        // $url;
        // include(__DIR__ . "/../function.php");
        // if (session()->has("key") && descrip(session("key"),$c)){
        //     $usuario=descrip(session("key"),$c);
        //     return redirect("https://anjoovi.com.br");
        // } else{
        //     return view("admin.admin_login.index");
        // }
        // if (!session()->has("key_init")){
        //     $t = 16; $ba = random_bytes($t); $ca = bin2hex($ba); session(["key_init"=>$ca]);
        // }
        // });
        // Route::post('/',function(){
        //     include(__DIR__ . "/../function.php");
        //     $dados=request()->all();
        //     function resp($texto){
        //         return response($texto, 200)
        //         ->header('Content-Type', 'text/plain');
        //     }
        //     try{
        //     function cript($usuario,$c){
        //         $k=crip($usuario,$c);
        //         session(["key"=>$k]);
        //     }
        //     $type=$dados["type"];
        //     if ($type=="login"){
        //         $email=$dados["email"];
        //         $senha=$dados["senha"];
        //         $conn=new mysqli("localhost:3306", $ub,$sb,"anjoov00_users_conteudo");
        //         $conn->query("CREATE TABLE IF NOT EXISTS user(nome TEXT, usuario TEXT, email TEXT, senha TEXT,data_n TEXT)");
        //         $s=$conn->prepare("SELECT usuario,email,senha FROM user WHERE (usuario=? || email=?) AND senha=?");
        //         $s->bind_param("sss",$email,$email,$senha);$s->execute();$result=$s->get_result();
        //         if ($result->num_rows>0){
        //             $usuario=p($result)[0]["usuario"];
        //             cript($usuario,$c);
        //             return response()->json("true");
        //         } else {
        //             return response()->json("false");
        //         }
        //     } else if ($type=="cadastro"){
        //         $nome=$dados["nome"];
        //         $usuario=$dados["usuario"];
        //         $email=$dados["email"];
        //         $senha=$dados["senha"];
        //         $month=$dados["month"];
        //         $day=$dados["day"];
        //         $year=$dados["year"];
        //         $conn=new mysqli("localhost:3306", $ub,$sb,"anjoov00_users_conteudo");
        //         $s=$conn->prepare("SELECT * FROM user WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$result=$s->get_result();
        //         if ($result->num_rows>0){
        //             return response()->json("false");
        //         } else {
        //             $data = new DateTime("$year-$month-$day");
        //             $data_str= $data->format('d/m/Y');
        //             $s=$conn->prepare("INSERT INTO user(nome,usuario,email,senha,data_n) VALUES(?,?,?,?,?)");$s->bind_param("sssss",$nome,$usuario,$email,$senha,$data_n);$s->execute();
        //             cript($usuario,$c);
        //             return response()->json("true");
        //         }
        //         }
        //     } catch (Exception $e){
        //         return resp($e);
        //     }
          
        // });
    // Route::get("/",function(){
    //     return view("erro.404");
    // });
    Route::post("/",function(){
        $dados=request()->all();
        $type=$dados["type"];
        $key=$dados["data"];
        switch ($type){
        case 'has':
            return response()->json(session()->has($key)); break;
        case 'get':
            return response()->json(session($key)); break;
        case 'set':
            session([...$key]); return response()->json(); break;
        case 'forget':
            session()->forget($key); return response()->json(); break;
        };
        // session([...$dados]);

    });