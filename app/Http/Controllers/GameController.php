<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

class GameController extends Controller
{

    /**
     * GameController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth',['except' => ['update']]);
    }

    public function index()
    {
        $user = \Auth::user();
        $userItems = $user->items()->get();
        $data['user']['id'] = $user->id;
        $data['user']['name'] = $user->name;
        $data['user']['level'] = $user->level;
        foreach ($userItems as $key => $item) {
            $data['items'][$key]['type'] = $item->name;
            $data['items'][$key]['level'] = $item->level;
        }
        $data = \GuzzleHttp\json_encode($data);
        //return $data;
        return view('game.index', compact('data'));
    }

    public function update()
    {
        $data = Input::json();
        $userData = $data->get('user');
        $user = User::findOrFail($userData['id']);
        $gameUserItems = $data->get('items');
        $dbUserItems = $user->items()->get();
        $itemToRemove = [];
        $found = false;
        $key = null;
        foreach ($dbUserItems as $dbUserItem) {
            foreach ($gameUserItems as $key => $gameUserItem) {
                if($dbUserItem->name == $gameUserItem['type']){
                    $found = true;
                    unset($gameUserItems[$key]);
                }
            }
            if (!$found) {
                $itemToRemove[]= $dbUserItem->id;
            }
        $found = false;
        }
//        dd($itemToRemove);
        $user->update($data->get('user'));
        $user->items()->detach($itemToRemove);
//        return $json;
    }
}
