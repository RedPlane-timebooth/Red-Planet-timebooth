@extends('layouts.index')

@section('content')
    <div class="videoContainer">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/7jTyvm27EsE" frameborder="0" allowfullscreen></iframe>
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
