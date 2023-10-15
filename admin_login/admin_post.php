<?php
function get_sec($data2,$data1){
    $data2=$data2->format('Y-m-d H:i:s');
    $data1 = new DateTime();
    $data1=$data1->format('Y-m-d H:i:s');
    $data2=strtotime($data2);
    $data1=strtotime($data1);
    return $data2-$data1;
}
function verificar($conn,$database_name){
    $result = $conn->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database_name'");
    
    if ($result->num_rows == 0) {
        // O banco de dados não existe, então crie-o
        $sql = "CREATE DATABASE $database_name";
    
        if ($conn->query($sql) === TRUE) {
        } else {
        }
    } else {
    }
}
    // Verifica se a solicitação é do tipo POST

    // Recupere os dados do formulário usando a variável $_POST
    $email = $_POST["email"];
    $senha = $_POST["password"];

    // Faça o que desejar com os dados, como salvá-los em um banco de dados ou exibi-los
    $ip = $_SERVER['REMOTE_ADDR'];
    if ($email=="t@gmail.com" && $senha=="1"){
        $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_ip");
        $conn->query("CREATE TABLE IF NOT EXISTS ips_logados(ip TEXT,usuario TEXT)");
        $s=$conn->prepare("INSERT INTO ips_logados(ip,usuario) VALUES(?,?)");
        $n="anjoovi";
        $s->bind_param("ss",$ip,$n);
        $s->execute();
        echo "true";
    }else{
        $erro;
        $erro_json;
        $conn = new mysqli("localhost:3306", "anjoov00_root");
        if ($conn->connect_error) {
        }
        verificar($conn,"anjoov00_ip");
        $conn = new mysqli("localhost:3306", "anjoov00_root","cpses_anyj8yi6ea","anjoov00_ip");
        if ($conn->connect_error) {
        }
        //$conn->query("DROP TABLE ips");
        $result = $conn->query("CREATE TABLE IF NOT EXISTS ips(ip VARCHAR(255),n INT,d VARCHAR(255))");
        $stmt = $conn->prepare("SELECT ip,n,d FROM ips WHERE ip = ?");
        $stmt->bind_param("s", $ip);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows==0){
            $v=3;
            $d="null";
            $stmt=$conn->prepare("INSERT INTO ips(ip,n,d) VALUES (?,?,?)");
            $stmt->bind_param("sis",$ip,$v,$d);
            $stmt->execute();
            $erro=3;
            $erro_json=[ "type" => "message","data"=>$erro];
        }else{
            $resultados = array();
            while ($row = $result->fetch_assoc()) {
                $resultados[] = $row;
            }
            if ($resultados[0]["n"]>1){
                $data="null";
                $erro=$resultados[0]["n"]-1;
                $erro_json=[ "type" => "message","data"=>$erro];
                $stmt=$conn->prepare("UPDATE ips SET n=?,d=? WHERE ip=?");
                $stmt->bind_param("iss",$erro,$data,$ip);
                $stmt->execute();
            } else if ($resultados[0]["n"]==1){
                $startDate = new Datetime();
                $startDate->add(new DateInterval('PT3M'));
                $data=$startDate->format('Y-m-d H:i:s');
                $endDate = new DateTime();
                $interval=get_sec($startDate,$endDate);
                $erro_json=[ "type" => "time","data"=>$interval];
                $erro=0;
                $stmt=$conn->prepare("UPDATE ips SET n=?,d=? WHERE ip=?");
                $stmt->bind_param("iss",$erro,$data,$ip);
                $stmt->execute();
            } else if ($resultados[0]["n"]==0){
                $startDate = DateTime::createFromFormat('Y-m-d H:i:s', $resultados[0]["d"]);
                $endDate = new DateTime();
                $interval=get_sec($startDate,$endDate);
                $erro_json=[ "type" => "time","data"=>$interval];
                //include(__DIR__ . "/admin-count.php");
                if ($interval<0){
                    $stmt=$conn->prepare("DELETE FROM ips WHERE ip=?");
                    $stmt->bind_param("s",$ip);
                    $stmt->execute();
                    //header("Location: /admin");
                    // exit;
                }
            }
        }
        $erro_string=$erro_json ? json_encode($erro_json) : true;
        echo $erro_string;
        // include(__DIR__ . '/admin-error.php');
    }
?>