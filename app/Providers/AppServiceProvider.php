<?php

namespace App\Providers;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Inclua seu arquivo em todas as rotas
        include(__DIR__ . '/../../routes/session.php');
        include(__DIR__ . '/include.php');
        include(__DIR__ . "/../../function.php");
        Blade::directive('include_base', function ($route) {
            // Coloque o código da sua diretiva Blade aqui
            include(__DIR__ . '/../../' . $route);
            /*return "<?php echo 'Minha diretiva funcionou com argumento: ' . $expression; ?>";*/
        });
    }
}
