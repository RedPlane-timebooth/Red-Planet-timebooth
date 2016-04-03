@extends('layouts.index')

@section('content')

    @if (count($items))
        <h1>Lasted news</h1>
        @foreach($items as $item)
            <div class="col-md-3 pull-left">
                <h2>
                    <a href="{{ url('/shop', $item -> id) }}">{{ $item->name }}</a>
                </h2>
                <img class="preview" src="{{url($item->img_address) }}">
                <p>{{ $item->price }}</p>
                <a href="#" class="btn btn-info">Buy</a>
            </div>
        @endforeach
    @else
        <h1>Sorry ths section is empty yet</h1>
    @endif
@endsection