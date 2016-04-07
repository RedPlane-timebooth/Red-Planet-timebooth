@extends('layouts.index')

@section('content')
    <section class="container">
            <h1>{{ $article->title }}</h1>
            <article class="fullArticle">{!! $article->body !!}</article>
    </section>
@endsection