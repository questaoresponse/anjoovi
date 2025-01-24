<?php
try {
    // $ffi = FFI::cdef(
    //     "const char* saudacao();",   // Define a assinatura da função
    //     "/teste.so"       // Caminho para a DLL (ou .so)
    // );
    // // Chamar a função da DLL
    // echo $ffi->saudacao();
} catch (Exception $e){
    echo $e->getMessage();
}
?>