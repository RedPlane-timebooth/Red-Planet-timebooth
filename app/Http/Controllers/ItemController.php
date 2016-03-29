<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Item;
use Illuminate\Http\Request;

use App\Http\Requests;

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
        $shop = Item::all();
        return view('shop.index', compact('shop'));
    }
    /**
     * @param $param
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show()
    {
        return view('shop.item', compact('item'));
    }
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        return view('shop.create');
    }
    /**
     * @param ItemRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(ItemRequest $request)
    {
        Item::create($request->all());
        return redirect('shop');
    }
    public function edit()
    {
        return view('shop.edit', compact('item'));
    }
    public function update(Item $item,ItemRequest $request)
    {
        $item -> update($request->all());
        return redirect('shop');
    }

    public function delete()
    {

    }
}
