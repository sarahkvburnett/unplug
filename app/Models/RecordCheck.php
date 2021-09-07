<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class RecordCheck extends Model
{

    protected $fillable = ['id', 'value', 'check_id'];
    protected $with = ['check'];

    public function record(): BelongsTo {
        return $this->belongsTo(Record::class);
    }

    public function check(): BelongsTo {
        return $this->belongsTo(Check::class);
    }

    public function room(): HasOneThrough {
        return $this->hasOneThrough(Room::class, Check::class);
    }


}
