@extends('layouts.adminPanel')

@section('content')

            <h1>{{ $article->title }}</h1>
            <article class="fullArticle">{!! $article->body !!}</article>

@endsection