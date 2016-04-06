<?php

namespace App\Http\Controllers;

use App\Statistic;
use Illuminate\Http\Request;


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
    public function index(Request $request)
    {
        $query = Statistic::with('users');
        if ($request->input('sortDirection') === 'DESC')
        {
            $sortDirection = 'ASC';
        } else {
            $sortDirection = 'DESC';
        }
        $sortBy = $request->input('sortBy', 'user_id');
        $all = $query->orderBy($sortBy, $sortDirection)->paginate(15);

//            ->paginate(15);

        return view('statistic.index', compact('all', 'sortDirection'));
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
