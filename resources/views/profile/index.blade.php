@extends('layouts.index')

@section('content')
        <section class="well container">
                <h1 class="page-header text-center">My Profile</h1>
            <div class="clearfix">
            <div class="col-md-4 pull-left">
                <div class="panel panel-info ">
                    <div class="panel-heading">
                        <h2 class="panel-title">My photo</h2>
                    </div>
                    <div class="panel-body">
                        <img class="preview" src="{{ '/' . $user->profilePicture }}">
                        {!! Form::model($user,['method' => 'PUT','action' => ['UserController@update', $user -> id], 'files' => true]) !!}
                        <div class="uploadProfilePic clearfix" >
                            {!! Form::label('profilePicture', 'Upload Image') !!}
                            {!! Form::file('profilePicture',['class' => 'form-control pull-left']) !!}
                            {!! Form::submit('Save',['class' => 'pull-left']) !!}
                        </div>
                        {!! Form::close() !!}
                    </div>
                </div>
            </div>
            <div class=" col-md-7 col-md-offset-1 pull-left">
                <div class="panel panel-info">
                    <div class="panel-heading container-fluid">
                        <h2 class="panel-title">Account info</h2>
                    </div>
                    <div class="panel-body">
                        <h3 class="panel-title">My username<span class="label">{{ $user -> name }}</span></h3>
                    </div>
                    <div class="panel-body">
                        <h3 class="panel-title">My e-mail<span class="label">{{ $user -> email }}</span></h3>
                    </div>
                    <div class="panel-body">
                        <h3 class="panel-title">My level<span class="label">{{ $user -> level }}</span></h3>
                    </div>
                    <div class="panel-body">
                        <h3 class="panel-title">My cash<span class="label">{{ $user -> cash }}</span></h3>
                    </div>
                </div>
            </div>
            </div>

                <div class="panel panel-info clearfix">
                    <div class="panel-heading container-fluid">
                        <h2 class="panel-title">My statistic</h2>
                    </div>
                    <div class="panel-body">
                        <span class="panel-title col-md-3 text-center">Total score</span>
                        <span class="panel-title col-md-3 text-center">Total games</span>
                        <span class="panel-title col-md-3 text-center">Win games</span>
                        <span class="panel-title col-md-3 text-center">Lose games</span>
                    </div>
                    <div class="panel">
                        <span class="label col-md-3 text-center">{{ $statistic[0]['total_score'] }}</span>
                        <span class="label col-md-3 text-center">{{ $statistic[0]['total_games'] }}</span>
                        <span class="label col-md-3 text-center">{{ $statistic[0]['win_games'] }}</span>
                        <span class="label col-md-3 text-center">{{ $statistic[0]['lose_games'] }}</span>
                    </div>
                </div>
        </section>
@endsection