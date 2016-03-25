@extends('layouts.adminPanel')

@section('content')


            <h1>{{ $article->title }}</h1>
            <button>
                <a href="{{ url('admin/news/{id?}/update') }}">Update item</a>
            </button>
            <article class="fullArticle">{!! $article->body !!}</article>

@endsection