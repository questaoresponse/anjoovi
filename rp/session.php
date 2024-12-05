<?php
function session2($key=null){
    $a=is_array($key);
    if ($key){
        if ($a){
            $data=["type"=>"set","key"=>[...$key],"_token"=>csrf_token()];
            return post("http://accounts.anjoovi.com.br",$data);
        } else {
            $data=["type"=>"get","key"=>$key,"_token"=>csrf_token()];
            return post("http://accounts.anjoovi.com.br",$data);
        }
    } else {
        return new sc();
    }
}
function post($url,$dados){
$ch = curl_init($url);curl_setopt($ch, CURLOPT_POST, true);curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($dados));curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);$response = curl_exec($ch);
if (curl_errno($ch)) { echo 'Erro na requisição cURL: ' . curl_error($ch); } curl_close($ch);$response = mb_convert_encoding($response, 'UTF-8', 'auto');return json_decode($response);
}
class sc{
    public $url="http://accounts.anjoovi.com.br";
    public function __construct() {
        // $a=is_array($key);
        // if ($key){
        //     if ($a){
        //         $data=["type"=>"set","key"=>[...$key],"_token"=>csrf_token()];
        //         return post($this->url,$data);
        //     } else {
        //         $data=["type"=>"get","key"=>$key,"_token"=>csrf_token()];
        //         return post($this->url,$data);
        //     }
        // }
    }
    public function has($key){
        $data=["type"=>"has","key"=>$key,"_token"=>csrf_token()];
        return post($this->url,$data);
    }
    public function forget($key){
        $data=["type"=>"forget","key"=>$key,"_token"=>csrf_token()];
        return post($this->url,$data);
    }
}
?>