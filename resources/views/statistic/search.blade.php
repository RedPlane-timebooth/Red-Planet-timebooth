@extends('layouts.index')
@if (count($articles) === 0)
    ... html showing no articles found
@elseif (count($articles) >= 1)
    ... print out results
    @foreach($articles as $article)
        print article
    @endforeach
@endif