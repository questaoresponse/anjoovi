<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
// Route::get('/', function () {
//     $dominio = request()->getHost();
//     return "Você está acessando o domínio: $dominio";
// include(__DIR__ . '/main.php');
// Route::domain('anjoovi.com.br')->group(__DIR__ . '/main.php');
// include(__DIR__ . '/main.php');
Route::domain('www.anjoovi.com')->group(__DIR__ . '/main.php');
Route::domain('about.anjoovi.com')->group(__DIR__ . '/about.php');
Route::domain('www.about.anjoovi.com')->group(__DIR__ . '/about.php');
Route::domain('help.anjoovi.com.br')->group(__DIR__ . '/help.php');
Route::domain('www.help.anjoovi.com')->group(__DIR__ . '/help.php');
Route::domain('accounts.anjoovi.com')->group(__DIR__ . '/accounts.php');
Route::domain('www.accounts.anjoovi.com')->group(__DIR__ . '/accounts.php');
//Route::domain('accounts.anjoovi.com.br')->group(teste2());
//Route::domain('anjoovi.com.br')->group(teste());
// Route::domain('www.anjoovi.com.br')->group(teste());
// Route::group(['prefix' => 'admin', 'middleware' => ['verificar.sessao']], function () {
//     // Suas rotas do grupo "admin" aqui
// });