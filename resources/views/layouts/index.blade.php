<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="{{ url("/resource/css/scss/font-awesome.css") }} rel='stylesheet'" type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>

    <!-- Styles -->
    <link href="{{ url("/resource/css/bootstrap.min.css") }}" rel="stylesheet">
    <link href="{{ url("/resource/css/scss/stylesheet.css") }}" rel="stylesheet">
    <link href="{{ url("/node_modules/hover.css/css/hover.css") }}" rel="stylesheet" media="all">

    <style>
        body {
            font-family: 'Lato';
        }

        .fa-btn {
            margin-right: 6px;
        }
    </style>
</head>
<body>
<header>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand hvr-underline-from-center" href="{{ url('/') }}">Home</a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="{{ url('/shop') }}" class="hvr-underline-from-center">Shop</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle hvr-underline-from-center" data-toggle="dropdown" role="button" aria-expanded="false">Game <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="{{ url('/game') }}" class="hvr-underline-from-center">Play now</a></li>
                            <li><a href="{{ url('/news') }}" class="hvr-underline-from-center">Getting Started</a></li>
                            <li><a href="{{ url('/statistic') }}">Statistic</a></li>
                            {{--or tutorial here--}}
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    @if (Auth::user())
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle hvr-underline-from-center" data-toggle="dropdown"
                               role="button"
                               aria-expanded="false">
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu transperentBackground" role="menu" id="account">
                                <li><a href="{{ url('/profile', Auth::user()->id) }}">Profile</a></li>
                                <li><a href="{{ url('/items', Auth::user()->id) }}">My Items</a></li>
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>
                    @else
                        <li>
                            <form class="navbar-form" name="loginForm" role="form" method="POST" action="{{ url('/login') }}">
                                    {!! csrf_field() !!}

                                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                        <div class="col-md-4">
                                            <input type="email" class="form-control" name="email" placeholder="E-Mail Address" value="{{ old('email') }}">
                                        </div>
                                    </div>

                                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                        <div class="col-md-4">
                                            <input type="password" class="form-control" name="password" placeholder="Password">

                                        </div>
                                    </div>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-btn fa-sign-in"></i>Login
                                </button>
                            </form>
                        </li>
                            <li><a class="hvr-underline-from-center" href="{{ url('/register')}}">Register</a></li>
                        @endif
                </ul>
            </div>
        </div>
    </nav>


</header>
<main class="container-fluid">
    @yield('content')
</main>
            <!-- JavaScripts -->
<script src="{{url('/resource/js/jquery.min.js')}}"></script>
<script src="{{url('/resource/js/bootstrap.min.js')}}"></script>
{{-- <script src="{{ elixir('js/app.js') }}"></script> --}}
</body>
</html>
