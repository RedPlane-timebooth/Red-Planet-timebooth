@extends('layouts.index')

@section('content')
                <div class="panel-heading">Send message</div>
                {!! Form::open(['url'=> 'send']) !!}
                <div class="form-group">
                    {!! Form::label('message', 'Content') !!}
                    {!! Form::textarea('message', null, ['class' => 'form-control']) !!}
                </div>
                <div class="form-group">
                    {!! Form::submit('Send',['class' => 'btn btn-default btn-primary pull-right']) !!}
                </div>
                {!! Form::close() !!}

@endsection