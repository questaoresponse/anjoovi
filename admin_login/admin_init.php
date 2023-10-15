<?php
function get_time(){
    $conn = new mysqli("localhost:3306", "cpses_anyj8yi6ea");
    $ip=$_SERVER['REMOTE_ADDR'];
    if ($conn->connect_error) {
    }
    verificar($conn,"ip");
    $conn = new mysqli("localhost:3306", "cpses_anyj8yi6ea",null,"ip");
    if ($conn->connect_error) {
    }
    $result=$conn->query("SELECT * FROM ips WHERE ip='$ip'");
    if ($result->num_rows>0){
        $resultados = array();
            while ($row = $result->fetch_assoc()) {
                $resultados[] = $row;
        }
        if ($resultados[0]["n"]==0){
            $startDate = DateTime::createFromFormat('Y-m-d H:i:s', $resultados[0]["d"]);
            $endDate = new DateTime();
            $interval=get_sec($startDate,$endDate);
            if ($interval<0){
            $stmt=$conn->prepare("DELETE FROM ips WHERE ip=?");
            $stmt->bind_param("s",$ip);
            $stmt->execute();
            return false;
            }
            return ["type"=>"time","data"=>$interval];
        }else{
            return ["type"=>"message","data"=>$resultados[0]["n"]];
        }
    }
    return false;
}
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
$r=get_time();
!$r || $r["type"]=="message" ? include(__DIR__ . "/admin.php") : include(__DIR__ . "/admin-count.php");
?>