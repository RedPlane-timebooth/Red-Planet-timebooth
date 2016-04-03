<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Item;
use Auth;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Session;
use Storage;

class ItemController extends Controller
{
    /**
     * ItemController constructor.
     */
    public function __construct()
    {
        $this->middleware('admin',['except' => ['index', 'show']]);
    }


    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $items = Item::all();
        if (Auth::user()){
            if (Auth::user()->isAdmin()){
                return view('shop.admin.index', compact('items'));
            }
        }
        return view('shop.index', compact('items'));
    }
    /**
     * @param $param
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show(Item $item)
    {
        if (Auth::user()){
            if (Auth::user()->isAdmin()){
                return view('shop.admin.item', compact('item'));
            }
        }
        return view('shop.item', compact('item'));
    }
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $categories = [];
        return view('shop.admin.create', compact('categories'));
    }

    protected function moveUploads($request)
    {
        $destinationPath = 'resource/img/';
        $fileName = Input::file('img_address')->getClientOriginalName();
        $file = Input::file('img_address');
        $file->move($destinationPath, $fileName);
        $path = $destinationPath . $fileName;
        $data = $request->all();
        $data['img_address'] = $path;

        return $data;
    }
    /**
     * @param ItemRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(ItemRequest $request)
    {
        $data = $this -> moveUploads($request);
        Item::create($data);
        return redirect('admin/shop');
    }
    public function edit(Item $item)
    {
        $categories = [];
        return view('shop.admin.edit', compact('item', 'categories'));
    }
    public function update(Item $item,ItemRequest $request)
    {
        $data = $this -> moveUploads($request);
        $item -> update($data);
        return redirect('admin/shop');
    }

    public function destroy(Item $item)
    {
        Item::where('id', '=', $item ->id)->delete();

        return redirect('admin/shop');
    }
}
