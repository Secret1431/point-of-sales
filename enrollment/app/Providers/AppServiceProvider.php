<?php

namespace App\Providers;

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
        RateLimiter::for('auth-strict', function (Request $request) {
            return Limit::perRequest(5)->by($request->ip());
        });

        RateLimiter::for('api', function (Request $request) {
            return Limit::perRequest(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
