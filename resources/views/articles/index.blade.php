@extends('layouts.app')

@section('content')

    @if (count($articles))
<h1>Lasted news</h1>
    @foreach($articles as $article)
        <h2>
            <a href="{{ url('/news', $article -> id) }}">{{ $article->title }}</a> </h2>
        <p class="preview">{{ $article->body }}</p>
    @endforeach
        @else
        <h1>Sorry ths section is empty yet</h1>
    @endif
@endsection