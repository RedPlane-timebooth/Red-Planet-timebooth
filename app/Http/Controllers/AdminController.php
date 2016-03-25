<?php

namespace App\Http\Controllers;

use Closure;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests;
use Illuminate\Http\Request;

class AdminController extends Controller
{


    /**
     * AdminController constructor.
     */
    public function __construct()
    {
        $this->middleware(['auth','admin']);
    }

    public function index()
    {
        return view('admin.index');
    }

    public function show()
    {
        return view('admin.index');
    }

    public function create()
    {
        return view('admin.index');
    }

    public function edit()
    {
        return view('admin.index');
    }

    public function update()
    {
        return view('admin.index');
    }

    public function store()
    {
        return view('admin.index');
    }

    public function delete()
    {
        return view('admin.index');
    }


}
