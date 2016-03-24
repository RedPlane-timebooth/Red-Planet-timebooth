<?php
namespace App\Http\Controllers;
use App\Article;
use App\Http\Requests\ArticleRequest;
use App\Http\Requests;
/**
 * Class ArticlesController
 * @package App\Http\Controllers
 */
class ArticlesController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $articles = Article::latest('published_at')->get();
        return view('articles.index', compact('articles'));
    }
    /**
     * @param $param
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show($param)
    {
        $article = Article::findOrFail($param);
        return view('articles.article', compact('article'));
    }
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        return view('articles.create');
    }
    /**
     * @param ArticleRequest $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(ArticleRequest $request)
    {
        Article::create($request->all());
        return redirect('news');
    }
    public function edit($id)
    {
        $article = Article::findOrFail($id);
        return view('articles.edit', compact('article'));
    }
    public function update($id, ArticleRequest $request)
    {
        $article = Article::findOrFail($id);
        $article -> update($request->all());
        return redirect('news');
    }
}