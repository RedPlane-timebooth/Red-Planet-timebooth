@extends('layouts.adminPanel')

@section('content')
<h1>Edit: {{$article -> title}}</h1>
    @include('errors.list')

    {!! Form::model($article,['method' => 'PATCH','action' => ['ArticlesController@update', $article -> id]]) !!}
        @include('articles.admin._formArticles', ['submitButtonText' => 'Update article'])
        <div class="form-group">
            {!! Form::label('Show on homepage') !!}
            {!! Form::checkbox('homepage',1) !!}
        </div>
    {!! Form::close() !!}

@endsection
