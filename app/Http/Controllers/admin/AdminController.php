<?php

namespace App\Http\Controllers\Admin; //admin add

use App\Article;
use App\Http\Controllers\Controller; // using controller class

class AdminController extends Controller
{
    public function index()
    {

        return \View::make('admin.index');
    }
}
