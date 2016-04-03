@extends('layouts.adminPanel')

@section('content')
    <h1>Edit: {{$item -> name}}</h1>
    @include('errors.list')

    {!! Form::model($item,['method' => 'PUT','action' => ['ItemController@update', $item -> id], 'files' => true]) !!}
    @include('shop.admin._formItems', ['submitButtonText' => 'Update item'])
    {!! Form::close() !!}

@endsection
