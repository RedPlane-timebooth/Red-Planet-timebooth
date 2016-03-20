@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-offset-2">
                @include('heading')
            </div>
        </div>

        <div class="row">
            <div class="col-md-4 col-md-offset-3">
                <ul class="list-group panel panel-default text-center">
                    <li class="panel-heading list-group-item">
                        <a class="panel-heading text-muted" href="{{ URL::to('/game/start') }}">
                            Start new game
                        </a>
                    </li>
                    <li class="panel-heading list-group-item">
                        <a class="panel-heading text-muted" href="{{ URL::to('/game/start') }}">
                            Join game
                        </a>
                    </li>
                    <li class="panel-heading list-group-item">
                        <a class="panel-heading text-muted" href="{{ URL::to('/game/options') }}">
                            Game Options
                        </a>
                    </li>
                    <li class="panel-heading list-group-item">
                        <a class="panel-heading text-muted" href="{{ URL::to('/home') }}">
                            Exit Game
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
@endsection