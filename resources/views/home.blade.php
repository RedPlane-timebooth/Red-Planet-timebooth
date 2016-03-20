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

                <ul  class="list-group panel panel-default text-center">
                    <li class="panel-heading list-group-item" >
                        <a class="panel-heading text-muted" href="{{ URL::to('/game') }}">
                            Start Game
                        </a>
                    </li>
                    <li class="panel-heading list-group-item" >
                        <a class="panel-heading text-muted" href="{{ URL::to('/profile') }}">
                            Profile
                        </a>
                    </li>
                    <li class="panel-heading list-group-item" >
                        <a class="panel-heading text-muted" href="{{ URL::to('/shop') }}">
                            Shop
                        </a>
                    </li>
                    <li class="panel-heading list-group-item">
                        <a id=exit class="panel-heading text-muted" href="{{ '#' }}">
                            Exit
                        </a>
                    </li>
                </ul>
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
