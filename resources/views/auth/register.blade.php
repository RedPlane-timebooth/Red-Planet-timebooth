@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-3">
                <div class="panel panel-default" style="background: rgba(255,0,0,  0.1);">
                    <div class="panel-body">
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal col-md-10 col-md-offset-1"
                              role="form" method="POST" action="{{ url('/register') }}">
                            {!! csrf_field() !!}

                            <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">

                                <div>
                                    <input type="text" class="form-control" name="name" value="{{ old('name') }}"
                                           placeholder="Name">

                                    @if ($errors->has('name'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">

                                <div>
                                    <input type="email" placeholder="E-Mail Address"
                                           class="form-control"
                                           name="email" value="{{ old('email') }}">

                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">

                                <div>
                                    <input type="password" class="form-control"
                                           name="password" placeholder="Password"
                                           autocomplete="off">

                                    @if ($errors->has('password'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">

                                <div>
                                    <input type="password" class="form-control" name="password_confirmation"
                                           placeholder="Confirm Password" autocomplete="off">

                                    @if ($errors->has('password_confirmation'))
                                        <span class="help-block">
                                        <strong>{{ $errors->first('password_confirmation') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-default btn-block">
                                    <i class="fa fa-btn fa-user"></i> Register Now
                                </button>
                            </div>

                            <div class="form-group">
                                <a href="{{ url('/login') }}">
                                    <button type="button" class="btn btn-default btn-block">
                                        Back
                                    </button>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
