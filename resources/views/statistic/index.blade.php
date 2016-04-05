@extends('layouts.index')

@section('content')
    <div class="col-md-offset-2 col-md-8 text-info">
        <table class="table table-hover text-center table-bordered table-responsive">
            <caption class="well text-center info"> Statistics</caption>
            <thead>
            <tr class="muted text-center text-white">
                <th class="text-center">#</th>
                <th class="text-center">Username</th>
                <th class="text-center">Total Points</th>
                <th class="text-center">Total Games</th>
                <th class="text-center">Win Games</th>
                <th class="text-center">Lose Games</th>
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