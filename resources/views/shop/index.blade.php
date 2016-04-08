@extends('layouts.index')

@section('content')
<div class="container">
    @if (count($items))
        <h1>All items</h1>
        @foreach($items as $item)
            <div class="col-md-3 col-sm-6 col-xs-10 col-md-offset-1 pull-left well">
                <h2 class="text-center">
                    <a href="{{ url('/shop', $item -> id) }}">{{ $item->name }}</a>
                </h2>
                <img class="preview center-block" src="{{url($item->img_address) }}">
                <p>{{ $item->price }}</p>
                <a href="{{url('/buyItem', $item->id)}}" class="btn btn-info center-block">Buy</a>
            </div>
        @endforeach
    @else
        <h1>Sorry ths section is empty yet</h1>
    @endif
</div>
@endsection