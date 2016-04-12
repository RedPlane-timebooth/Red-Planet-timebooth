<?php

namespace App\Http\Controllers;

use App\Statistic;
use App\User;
use DB;
use Illuminate\Http\Request;


class StatisticController extends Controller
{
    /**
     * ArticlesController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if ($request->input('sortDirection') === 'DESC')
        {
            $sortDirection = 'ASC';
        } else {
            $sortDirection = 'DESC';
        }
        $sortBy = $request->input('sortBy', 'user_id');

        if ($request->input('search')) {
            $query = $request->input('search');
            $all = Statistic::where('name', 'LIKE', '%' . $query . '%')
                ->join('users', 'users.id', '=', 'user_id')
                ->paginate(10);
        } else {
            $all = Statistic::orderBy($sortBy, $sortDirection)
                ->join('users', 'users.id', '=', 'user_id')
                ->paginate(10);
        }

        // returns a view and passes the view the list of articles and the original query.
        return view('statistic.index', compact('all', 'sortDirection'));
    }
}
