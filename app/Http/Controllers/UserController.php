<?php

namespace App\Http\Controllers;

use App\Item;
use App\Statistic;
use App\User;
use Auth;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Intervention\Image\Facades\Image;

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

        $statistic= Statistic::where('user_id', '=', $id)->get();
//        dd($statistic);

        return view('profile.index', compact('user', 'statistic'));
    }

    /**
     * @param $id
     */
    public function buyItem(Request $request,$id)
    {
        $user = Auth::user();
        $item = Item::find($id);
        if ($user->cash > $item->price) {
            $user
                ->items()
                ->attach($item->id);
            $request->session()->flash('alert-success', 'Item was successful bought!');
        } else {
            $request->session()->flash('alert-danger', 'Not enough money!');
}

        return redirect('/shop');

    }

    public function showItems($id)
    {
        $user = User::findOrFail($id);
        $items = $user->items()->get();
        return view('profile.items', compact('items'));
    }

    protected function moveUploads($request)
    {
        $destinationPath = 'resource/img/';
        $fileName = Input::file('profilePicture')->getClientOriginalName();
        $file = Input::file('profilePicture');
        $file->move($destinationPath, $fileName);
        $path = $destinationPath . $fileName;
//        Image::make($path)->resize(200,200)->save($path);
        $data = $request->all();
        $data['profilePicture'] = $path;

        return $data;
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
        $data = $this -> moveUploads($request);
        User::findOrFail($id)->update($data);
        return redirect('/profile/'. $id);
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
