@extends('layouts.index')

@section('content')
        <h1>{{ $user -> name }}</h1>
        <p>{{ $user -> username }}</p>
        <p>{{ $user -> email }}</p>
@endsection