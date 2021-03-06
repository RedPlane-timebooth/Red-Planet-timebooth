<?php
namespace App\Http\Controllers;
use App\Article;
use App\Http\Requests\ArticleRequest;
use App\Http\Requests;
use Auth;
use Request;

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
        $this->middleware('admin', ['except' => ['index', 'show', 'search']]);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $articles = Article::latest('published_at')->get();
        if (Auth::user()){
            if (Auth::user()->isAdmin()){
                return view('articles.admin.index', compact('articles'));
            }
        }
        return view('articles.index', compact('articles'));
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

    public function search()
    {
        $query = Request::input('search');
        $articles = Article::where('title', 'LIKE', '%' . $query . '%')->paginate(10);
        return view('articles.index', compact('articles'));
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