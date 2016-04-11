@extends('layouts.index')

@section('content')
    <div class="row">
        <div class="container col-md-offset-2 col-md-8 opacity">
            <div align="center" class="embed-responsive embed-responsive-16by9 ">
                <iframe class="embed-responsive-item"
                        src="http://www.youtube.com/embed/O36FceRAUwE?autoplay=1&controls=0&loop=1">
                </iframe>
            </div>
        </div>
    </div>
    <br/>
    <br/>
    <div class="row">
    @if($articles)
        <div class="col-md-offset-2 col-md-8 text-info">
            <table class="table table-striped-dark text-center table-bordered table-responsive">
                <thead>
                <tr>
                    <th colspan="3" class="text-center panel-title">Leaderboard</th>
                </tr>
                <tr class="muted text-center text-white">
                    <th class="text-center">#</th>
                    <th class="text-center">Username</th>
                    <th class="text-center">Points</th>
                </tr>
                </thead>
                <tbody>
                <?php $number = 1 ?>
                @foreach($topUsers as $user)
                    <tr>
                        <td>{{ $number++ }}</td>
                        <td class="userName">{{ $user->name }}</td>
                        <td class="userScore">{{ $user->total_score }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            </div>
        </div>
    @endif
    @if($articles)
        <div id="topNews" class="container center-block">
            @foreach($articles as $article)
                <article class="topNews col-md-offset-1 col-md-5 well">
                    <h2 class="page-header">{{ $article->title }}</h2>
                    <p>{{ $article->short }}</p>
                </article>
            @endforeach
        </div>
    @endif
@endsection
