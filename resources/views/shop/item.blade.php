@extends('layouts.index')

@section('content')
    <section class="container">
        <h1>{{ $item->name }}</h1>
        <img src="{{ $item->img_address }}">
        <p>{{ $item->description }}</p>
    </section>
@endsection