<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Room extends Model
{
    public function checks(): BelongsToMany {
        return $this->belongsToMany(Check::class);
    }

}
