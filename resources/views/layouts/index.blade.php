<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet'
          type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>

    <!-- Styles -->
    <link href="{{ url("https://bootswatch.com/cosmo/bootstrap.min.css") }}" rel="stylesheet">
    <link href="{{ url("/resource/css/stylesheet.css") }}" rel="stylesheet">
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
                <a class="navbar-brand" href="{{ url('/') }}">Home</a>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="{{ url('/shop') }}">Shop</a></li>
                    <li><a href="{{ url('/about') }}">About</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Game <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="{{ url('/game') }}">Play now</a></li>
                            <li><a href="{{ url('/news') }}">Getting Started</a></li>
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
                                <li><a href="{{ url('/statistic') }}">Statistic</a></li>
                                <li><a href="{{ url('/items', Auth::user()->id) }}">My Items</a></li>
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>
                    @endif
                    @if (!Auth::user())
                        <li>
                            <form class="navbar-form" name="loginForm" method="POST" action="{{ url('/login') }}">
                                <div class="form-group" style="height: 30px; vertical-align: baseline;" >
                                    <input type="text" required placeholder="E-mail" class="form-control"/>
                                    <input type="password" required placeholder="Password" class="form-control"/>
                                </div>
                                <button type="submit">Login</button>
                            </form>
                        </li>
                            <li><a href="{{ url('/register')}}">Register</a></li>
                        @endif
                </ul>
            </div>
        </div>
    </nav>


</header>
    @yield('content')
<!-- JavaScripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
{{-- <script src="{{ elixir('js/app.js') }}"></script> --}}
</body>
</html>
