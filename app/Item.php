<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable =
        [
            'name',
            'description',
            'img_address',
            'price',
            'available',
            'category_id'
        ];
}
