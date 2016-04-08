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
        $data['user']['username'] = $user->username;
        $data['user']['level'] = $user->level;
        foreach ($userItems as $key => $item) {
            $data['items'][$key]['type'] = $item->name;
            $data['items'][$key]['level'] = $item->level;
        }

        return $data;
        return view('game.index', compact('data'));
    }
}
