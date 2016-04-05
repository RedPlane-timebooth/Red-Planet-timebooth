<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }
    /**
     * @param $param
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show(Article $article)
    {
        if (Auth::user()){
            if (Auth::user()->isAdmin()){
                return view('articles.admin.article', compact('article'));
            }
        }
        return view('articles.article', compact('article'));
    }
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        return view('articles.admin.create');
    }
    /**
     * @param ArticleRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(ArticleRequest $request)
    {
        Article::create($request->all());
        return redirect('/admin/news');
    }
    public function edit(Article $article)
    {
        return view('articles.admin.edit', compact('article'));
    }
    public function update(Article $article, ArticleRequest $request)
    {
        $article -> update($request->all());
        return redirect('/admin/news');
    }

    public function destroy(Article $article)
    {
        Article::where('id', '=', $article->id)->delete();

        return redirect('/admin/news');
    }
}
