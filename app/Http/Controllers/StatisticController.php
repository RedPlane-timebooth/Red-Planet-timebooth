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

        return view('statistic.index', compact('all', 'sortDirection'));
    }

    public function search(Request $request)
    {
        // Gets the query string from our form submission
        $query = $request->input('search');
        // Returns an array of articles that have the query string located somewhere within
        // our articles titles. Paginates them so we can break up lots of search results.
        $user = DB::table('users')->where('username', 'LIKE', '%' . $query . '%')->first()->get();

        // returns a view and passes the view the list of articles and the original query.
        return view('statistic.search', compact('user', 'query'));
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
