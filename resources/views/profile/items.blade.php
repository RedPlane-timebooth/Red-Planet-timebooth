@extends('layouts.index')

@section('content')
<div class="container">
    @foreach($items as $item)
        <div class="col-md-3 col-sm-6 col-xs-10 col-md-offset-1 pull-left well">
            <h2 class="text-center">{{ $item->name }}</h2>
            <img class="preview center-block" src="{{url($item->img_address) }}">
            <p class="text-center">{{$item->description}}</p>
        </div>
    @endforeach
</div>
@endsection