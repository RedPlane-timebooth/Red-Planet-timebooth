@extends('layouts.index')

@section('content')
    <section class="container well">
            <h1 class="page-header">{{ $article->title }}</h1>
            <article class="fullArticle">{!! $article->body !!}</article>
    </section>
@endsection