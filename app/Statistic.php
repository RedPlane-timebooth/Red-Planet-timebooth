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

    public function users()
    {
        return $this -> hasMany(\App\User::class, 'id');
    }
}
