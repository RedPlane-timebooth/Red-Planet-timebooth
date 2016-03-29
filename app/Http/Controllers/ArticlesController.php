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
     * ArticlesController constructor.
     */
    public function __construct()
    {
        $this->middleware('admin', ['except' => ['index', 'show']]);
    }

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
    public function show(Article $article)
    {
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
    public function edit(Article $article)
    {
        return view('articles.edit', compact('article'));
    }
    public function update(Article $article, ArticleRequest $request)
    {
        $article -> update($request->all());
        return redirect('news');
    }

    public function destroy($id)
    {
        Article::where('id', '=', $id)->delete();

        return view('articles.index');
    }
}