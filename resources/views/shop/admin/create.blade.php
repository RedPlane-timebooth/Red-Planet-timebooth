@extends('layouts.adminPanel')

@section('content')

    @include('errors.list')

    {!! Form::open(['url' => 'admin/shop', 'files'=>true]) !!}
    @include('shop.admin._formItems', ['submitButtonText' => 'Add item'])
    {!! Form::close() !!}

@endsection