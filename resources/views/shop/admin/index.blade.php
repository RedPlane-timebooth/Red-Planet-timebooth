@extends('layouts.adminPanel')

@section('content')

    @if (count($items))
        <h1>All Items</h1>
        @foreach($items as $item)
            <div class="col-xl-3 pull-left">
                <h2>
                    <a href="{{ url('admin/shop', $item -> id) }}">{{ $item->name }}</a>
                </h2>
                <img src="{{$item->img_address }}">
                <p class="preview">{{ $item->price }}</p>
                <a class="btn btn-default btn-primary" href="{{ url('/admin/shop/'. $item -> id . '/edit') }}">Edit</a>
                {!! Form::open(['action' => ['ItemController@destroy', $item->id], 'method' => 'delete', 'class' => 'delete']) !!}
                {!! Form::submit('Delete', ['class'=>'btn btn-danger btn-mini']) !!}
                {!! Form::close() !!}
            </div>
        @endforeach
    @else
        <h1>Sorry ths section is empty yet</h1>
    @endif
@endsection