@extends('layouts.adminPanel')

@section('content')
<h1>Edit: {{$article -> title}}</h1>
    @include('errors.list')

    {!! Form::model($article,['method' => 'PATCH','action' => ['ArticlesController@update', $article -> id]]) !!}
    @include('articles.admin._formArticles', ['submitButtonText' => 'Update article'])
    {!! Form::close() !!}

@endsection
