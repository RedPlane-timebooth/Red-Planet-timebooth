@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
        </div>

        <div class="row">
            <div class="col-md-4 col-md-offset-2">

                @include('heading')

                <div class="panel panel-default text-center">

                    <a class="" href="{{ URL::to('/game') }}">
                        <div class="panel-heading text-muted">
                            Start Game
                        </div>
                    </a>

                    <a class="" href="{{ URL::to('/profile') }}">
                        <div class="panel-heading text-muted">
                            Profile
                        </div>
                    </a>

                    <a class="" href="{{ URL::to('/shop') }}">
                        <div class="panel-heading text-muted">
                            Shop
                        </div>
                    </a>

                    <a id=exit class="" href="{{ '#' }}">
                        <div class="panel-heading text-muted">
                            Exit
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <script>
        setTimeout(function () {
            $('#exit').on("click", function () {
                close();
                return false;
            })
        }, 0);
    </script>
@endsection
