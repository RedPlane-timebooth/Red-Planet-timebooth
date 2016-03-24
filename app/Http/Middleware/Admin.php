<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Controller;
use Closure;
use Illuminate\Support\Facades\Auth;

class Admin extends Controller
{

    public function handle($request, Closure $next)
    {

        if ( Auth::check() && Auth::user()->isAdmin() )
        {
            return $next($request);
        }

        return redirect('/admin');

    }

}