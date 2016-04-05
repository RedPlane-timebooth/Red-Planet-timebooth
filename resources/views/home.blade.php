@extends('layouts.index')

@section('content')
    <div class="row">
        <main class="container col-md-offset-2 col-md-8">
            <div align="center" class="embed-responsive embed-responsive-16by9 ">
                <video autoplay class="embed-responsive-item">
                    <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4">
                </video>
            </div>
        </main>
    </div>
    <br/>
    <br/>
    <div class="row">
        <div class="col-md-offset-2 col-md-8 text-info">
            <table class="table table-hover text-center table-bordered table-responsive">
                <caption class="well text-center info"> Leaderboard</caption>
                <thead>
                <tr class="muted text-center text-white">
                    <th class="text-center">#</th>
                    <th class="text-center">Username</th>
                    <th class="text-center">Points</th>
                </tr>
                </thead>
                <tbody>
                <tr class="muted text-center">
                    <td>1</td>
                    <td>Daniel</td>
                    <td>1241412</td>
                </tr>
                <tr class="muted text-center">
                    <td>1</td>
                    <td>Daniel</td>
                    <td>1241412</td>
                </tr>
                <tr class="muted text-center">
                    <td>1</td>
                    <td>Daniel</td>
                    <td>1241412</td>
                </tr>
                <tr class="muted text-center">
                    <td>1</td>
                    <td>Daniel</td>
                    <td>1241412</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    @if($articles)
        @foreach($articles as $article)
            <div class="topNews">
                <h2>{{ $article-> title }}</h2>
                <p>{{ $article-> body }}</p>
            </div>
        @endforeach
    @endif
    @if($articles)
        <div class="topUsers">
            @foreach($topUsers as $user)
                <span class="userName">{{ $user->name }}</span>
                <span class="userScore">{{ $user->total_score }}</span>
            @endforeach
        </div>
    @endif
@endsection
