<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    protected $fillable =
        [
            'user_id',
            'total_score',
            'total_games',
            'win_games',
            'lose_games'
        ];
}
