<?php

namespace App\Http\Controllers;

use App\Item;
use App\User;
use Auth;
use Illuminate\Http\Request;

use App\Http\Requests;

class UserController extends Controller
{
    /**
     * UserController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
//        return $user;

        return view('profile.index', compact('user'));
    }

    /**
     * @param $id
     */
    public function buyItem($id)
    {
        $user = Auth::user();
        $item = Item::find($id);
        $user
            ->items()
            ->attach($item->id);

        return redirect('/shop');

    }

    public function showItems($id)
    {
        $user = User::findOrFail($id);
        $items = $user->items()->get();

        return view('profile.items', compact('items'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
