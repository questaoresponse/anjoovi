<?php
try {
    // $ffi = FFI::cdef(
    //     "const char* saudacao();",   // Define a assinatura da função
    //     "/../server/teste.so"       // Caminho para a DLL (ou .so)
    // );
    dl("/../server/teste.so");
    // Chamar a função da DLL
    echo saudacao();
} catch (Exception $e){
    echo $e->getMessage();
}
?>