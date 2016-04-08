@extends('layouts.index')

@section('content')
    <section class="container">
        <div>
            {!! Form::open(['url' => '/news/search', 'class'=>'form navbar-form pull-right searchform']) !!}
            {!! Form::text('search', null, ['required', 'class'=>'form-control', 'placeholder'=>'Search article']) !!}
            {!! Form::submit('Search', ['class'=>'btn btn-default']) !!}
            {!! Form::close() !!}
        </div>
        @if (count($articles))
            <h1 class="page-header left clearfix">Lasted news</h1>
            <article class="center-block clearfix">
                @foreach($articles as $article)
                <section class="well">
                    <h2>
                        <a href="{{ url('/news', $article -> id) }}">{{ $article->title }}</a>
                    </h2>
                    <p class="preview">{{ $article->short }}</p>
                </section>
                @endforeach
            </article>
            @else
            <h1>Sorry ths section is empty yet</h1>
        @endif
    </section>
@endsection