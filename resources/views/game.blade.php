@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
        </div>

        <div class="row">
            <div class="col-md-4 col-md-offset-2">

                @include('heading')

                <div class="panel panel-default text-center">

                    <a class="" href="{{ URL::to('/game/start') }}">
                        <div class="panel-heading text-muted">
                            Start new game
                        </div>
                    </a>

                    <a class="" href="{{ URL::to('/game/options') }}">
                        <div class="panel-heading text-muted">
                            Game Options
                        </div>
                    </a>

                    <a class="" href="{{ URL::to('/home') }}">
                        <div class="panel-heading text-muted">
                            Exit Game
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
@endsection