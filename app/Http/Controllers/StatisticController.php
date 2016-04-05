<?php

namespace App\Http\Controllers;

use App\Statistic;
use Illuminate\Http\Request;

use App\Http\Requests;

class StatisticController extends Controller
{
    /**
     * ArticlesController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $all = Statistic::with('users')->paginate(15);

//        return $all;
        return view('statistic.index', compact('all'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param $data []
     * @return \Illuminate\Http\Response
     */
    public function store()
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $data []
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update($data, $id)
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
