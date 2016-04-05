@extends('layouts.index')

@section('content')
    <table>
    @foreach($all as $row)
        <tr>
            <td>{{ $row->users[0]['name'] }}</td>
            <td>{{ $row->total_score }}</td>
            <td>{{ $row->total_games }}</td>
            <td>{{ $row->win_games }}</td>
            <td>{{ $row->lose_games }}</td>
        </tr>
    @endforeach
    </table>
@endsection