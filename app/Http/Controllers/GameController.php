<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class GameController extends Controller
{

    /**
     * GameController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = \Auth::user();
        $userItems = $user->items()->get();
        $items = $userItems->toArray();
        $userArray = $user->toArray();
        $data = array_merge($items,$userArray);
        return $data;
        return view('game.index', compact('data'));
    }
}
