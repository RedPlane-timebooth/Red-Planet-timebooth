<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>

    <!-- Styles -->
    <link href="{{ url("/resource/css/bootstrap.min.css") }}" rel="stylesheet">
    <link href="{{ url("/resource/css/scss/stylesheet.css") }}" rel="stylesheet">

    <style>
        body {
            font-family: 'Lato';
        }

        .fa-btn {
            margin-right: 6px;
        }
    </style>
</head>
<body id="app-layout">
<header>
    <nav id="nav" class="navbar navbar-default">
        {{--<div class="container col-sm-12">--}}
        <div class="navbar-header">

            <!-- Collapsed Hamburger -->
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>

        <div class="collapse navbar-collapse" id="app-navbar-collapse">
            <!-- Left Side Of Navbar -->
            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a href="{{ url('/admin/news') }}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">News<span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="{{ url('/admin/news') }}">All</a></li>
                        <li><a href="{{ url('/admin/news/create') }}">Create Article</a></li>
                    </ul>
                </li>
                <li><a href="{{ url('/admin/games') }}">Games</a></li>
                <li class="dropdown">
                    <a href="{{ url('/admin/shop') }}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Shop<span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="{{ url('/admin/shop') }}">All</a></li>
                        <li><a href="{{ url('/admin/shop/create') }}">Create Item</a></li>
                    </ul>
                </li>
                <li><a href="{{ url('admin/about') }}">About Us</a></li>
                @if (Auth::user())
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            {{ Auth::user()->name }} <span class="caret"></span>
                        </a>

                        <ul class="dropdown-menu" role="menu">
                            <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                        </ul>
                    </li>
                @endif
            </ul>

            <!-- Right Side Of Navbar -->

        </div>
    </nav>
</header>
<main class="container-fluid">
    @yield('content')
</main>
<!-- JavaScripts -->
<script src="{{url('/resource/js/jquery.min.js')}}"></script>
<script src="{{url('/resource/js/bootstrap.min.js')}}"></script>
</body>
</html>
