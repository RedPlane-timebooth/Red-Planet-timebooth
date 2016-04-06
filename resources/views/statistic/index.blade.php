@extends('layouts.index')

@section('content')
    <div class="col-md-offset-2 col-md-8 text-info">
        <table class="table table-hover text-center table-bordered table-responsive">
            <caption class="well text-center info"> Statistics</caption>

            <thead>
            <tr>
                <th colspan="6">
                {!! Form::open() !!}
                    {!! Form::label('Search by Username') !!}
                    {!! Form::input('search', 'search') !!}
                    {!! Form::submit('Search')!!}
                {!! Form::close() !!}
                </th>
            </tr>
            <tr class="muted text-center text-white">
                <th class="text-center">#</th>
                <th class="text-center">{{link_to_route('statistic.index', 'Username', ['sortBy' => 'user_id', 'sortDirection' => $sortDirection]) }}</th>
                <th class="text-center">{{link_to_route('statistic.index', 'Total Points', ['sortBy' => 'total_score', 'sortDirection' => $sortDirection]) }}</th>
                <th class="text-center">{{link_to_route('statistic.index', 'Total Games', ['sortBy' => 'total_games', 'sortDirection' => $sortDirection]) }}</th>
                <th class="text-center">{{link_to_route('statistic.index', 'Win Points', ['sortBy' => 'win_games', 'sortDirection' => $sortDirection]) }}</th>
                <th class="text-center">{{link_to_route('statistic.index', 'Lose Points', ['sortBy' => 'lose_games', 'sortDirection' => $sortDirection]) }}</th>
            </tr>
            </thead>
            <tbody>
            <?php
                $number = $all->firstItem()?>
            @foreach($all as $row)
                <tr>
                    <td>{{ $number++ }}</td>
                    <td>{{ $row->users[0]['name'] }}</td>
                    <td>{{ $row->total_score }}</td>
                    <td>{{ $row->total_games }}</td>
                    <td>{{ $row->win_games }}</td>
                    <td>{{ $row->lose_games }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
        {!! $all->links() !!}
    </div>
@endsection