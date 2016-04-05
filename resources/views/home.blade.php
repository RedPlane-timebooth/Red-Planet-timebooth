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

    @if($articles)
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
        <table>
            @foreach($articles as $article)
                <tr class="muted text-center">
                    <td><h2>{{ $article-> title }}</h2></td>
                    <td>{{ $article-> body }}</td>
                </tr>
            @endforeach
        </table>
    @endif
@endsection
