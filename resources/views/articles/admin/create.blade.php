@extends('layouts.adminPanel')

@section('content')

    @include('errors.list')

    {!! Form::open(['action' => 'admin/news]) !!}
        @include('articles.admin._formArticles', ['submitButtonText' => 'Add article'])
    {!! Form::close() !!}

@endsection