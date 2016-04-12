@extends('layouts.index')

@section('content')
    <section class="container well">
        <h1>{{ $item->name }}</h1>
        <div class="clearfix">
        <img src="{{ '/' . $item->img_address }}" class="pull-left col-sm-3">
        <h3 class="col-sm-offset-3 text-justify">{{ $item->description }}</h3>
        <h3 class="col-sm-3 text-center pull-right col-sm-offset-3 price" ></h3>
        </div>
        <div class="col-sm-offset-3 clearfix">
            <a href="{{url('/buyItem', $item->id)}}" class="btn btn-info center-block clearfix "><h4>Buy ($ {{ $item->price }})</h4></a>
        </div>

    </section>
@endsection