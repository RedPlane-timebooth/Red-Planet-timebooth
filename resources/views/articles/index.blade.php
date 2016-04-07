@extends('layouts.index')

@section('content')
    <section class="container">
        @if (count($articles))
            <h1>Lasted news</h1>
            <section>
                {!! Form::open(['url' => '/news/search', 'class'=>'form navbar-form navbar-right searchform']) !!}
                {!! Form::text('search', null, ['required', 'class'=>'form-control', 'placeholder'=>'Search article']) !!}
                {!! Form::submit('Search', ['class'=>'btn btn-default']) !!}
                {!! Form::close() !!}
            </section>
                @foreach($articles as $article)
                    <h2>
                        <a href="{{ url('/news', $article -> id) }}">{{ $article->title }}</a>
                    </h2>
                    <p class="preview">{{ $article->short }}</p>
                @endforeach
            @else
            <h1>Sorry ths section is empty yet</h1>
        @endif
    </section>
@endsection