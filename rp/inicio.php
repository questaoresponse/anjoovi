<?php
$logo=null;
if (descrip2(session("key"))){
    $usuario=descrip2(session("key"));
    $conn = new mysqli("localhost:3306", $ub,$sb,"anjoov00_users_conteudo");
    $s=$conn->prepare("SELECT logo FROM user WHERE usuario=?");$s->bind_param("s",$usuario);$s->execute();$config=$s->get_result();
    $logo=p($config)[0];
};