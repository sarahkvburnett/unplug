<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Check extends Model
{
    protected $with = ['room', 'category'];

    public function room(){
        return $this->belongsTo(Room::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

}
