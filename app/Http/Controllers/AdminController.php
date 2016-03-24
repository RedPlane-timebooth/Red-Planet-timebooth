<?php

namespace App\Http\Controllers;

use Closure;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests;
use Illuminate\Http\Request;

class AdminController
{


    /**
     * AdminController constructor.
     */
    public function __construct()
    {
        $this->middleware(['admin']);
    }

    public function index()
    {
        return view('admin.index');
    }
}
