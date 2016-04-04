@extends('layouts.index')

@section('content')
    @foreach($items as $item)
        <div class="col-md-3 pull-left">
            <h2 class="text-center">{{ $item->name }}</h2>
            <img class="preview center-block" src="{{url($item->img_address) }}">
            <p class="text-center">{{$item->description}}</p>
        </div>
    @endforeach
@endsection