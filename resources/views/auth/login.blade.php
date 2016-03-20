@extends('layouts.app')

@section('content')
    <div class="container" >
        <div class="row">
            <div class="col-md-4 col-md-offset-3">
                <div class="panel panel-default" style="background: rgba(255,0,0,  0.1);">
                    <div class="panel-body">
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal col-md-8 col-md-offset-2" role="form" method="POST" action="{{ url('/login') }}">
                            {!! csrf_field() !!}

                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">

                                <div>
                                    <input type="email" class="form-control" name="email"
                                           placeholder="Email" value="{{ old('email') }}" autocomplete="off">

                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">

                                <div>
                                    <input type="password" placeholder="Password"
                                           class="form-control" name="password">

                                    @if ($errors->has('password'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group hidden">
                                <div>
                                    <div class="checkbox">
                                        <label>
                                            <input checked=checked type="checkbox" name="remember"> Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-default btn-block">
                                    <i class="fa fa-btn fa-sign-in"></i> Login
                                </button>
                            </div>

                            <div class="form-group">
                                <a href="{{ url('/register') }}">
                                    <button type="button" class="btn btn-default btn-block">
                                        <i class="fa fa-btn fa-user"></i> Register Now
                                    </button>
                                </a>
                            </div>

                            <div>
                                <a class="btn " href="{{ url('/password/reset') }}">
                                    Forgot Your Password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
