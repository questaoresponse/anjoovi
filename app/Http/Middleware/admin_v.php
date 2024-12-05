<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class admin_v
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        include(__DIR__ . "/../../../function.php");
        $urlPath = $request->getPathInfo();
        if (!(session()->has("key_init"))){
            $t = 16; $ba = random_bytes($t); $ca = bin2hex($ba); session(["key_init"=>$ca]);
        }
//     if (str_starts_with($urlPath, '/admin')) {
//         // O prefixo da rota é "/admin"
//         // Execute alguma lógica específica para rotas com o prefixo "/admin"
//         if ($request->isMethod("get")){
//         $route= $request->path();
//         if ($route!="admin"){
//         // if (session()->has("key") && descrip(session("key"),$c)) {
//         //     return $next($request);
//         // } else {
//         //     return redirect("/admin");
//         // }
//         //response()->file(__DIR__ . "/../../../rp/admin/index.html")
//         //return redirect("/admin"); // Redirecionar para a página de login se não estiver autenticado.
//     }
//     return $next($request);
//     }
//     return $next($request);
// }
return $next($request);
}

}
