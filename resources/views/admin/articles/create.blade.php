@extends('layouts.adminPanel')

@section('content')

    @include('errors.list')

    {!! Form::open(['url' => 'news']) !!}
        @include('articles._form', ['submitButtonText' => 'Add article'])
    {!! Form::close() !!}

@endsection