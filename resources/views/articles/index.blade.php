@extends('layouts.index')

@section('content')

    @if (count($articles))
<h1>Lasted news</h1>
    @foreach($articles as $article)
        <h2>
            <a href="{{ url('/news', $article -> id) }}">{{ $article->title }}</a>
            {!! Form::open(['action' => ['ArticlesController@destroy', $article->id], 'method' => 'delete', 'class' => 'delete']) !!}
            {!! Form::submit('Delete', ['class'=>'btn btn-danger btn-mini pull-right']) !!}
            {!! Form::close() !!}
            <a class="btn btn-default btn-primary pull-right" href="{{ url('/news/'. $article -> id . '/edit') }}">Edit</a>
        </h2>
        <p class="preview">{{ $article->body }}</p>
    @endforeach
        @else
        <h1>Sorry ths section is empty yet</h1>
    @endif
@endsection