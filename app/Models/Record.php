<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Record extends Model
{
    protected $fillable = ['status'];
    protected $with = ['checks'];

    public function checks(): HasMany {
        return $this->hasMany(RecordCheck::class);
    }

    public function toArray(): array {
        $this->refresh();
        $relations = $this->relationsToArray()['checks'];
        $checks = [];
        $checks['checks']['details']['total'] = count($relations);

        $arranged = [];
        foreach ($relations as $relation){
            $floor = $relation['check']['room']['floor'];
            $room = $relation['check']['room']['id'];
            $arranged[$floor][$room]['details'] = $relation['check']['room'];

            $check = [];
            $check['id'] = $relation['id'];
            $check['created_at'] = $relation['created_at'];
            $check['updated_at'] = $relation['updated_at'];
            $check['value'] = $relation['value'];
            $check['check_id'] = $relation['check_id'];
            $check['name'] = $relation['check']['name'];
            $check['label'] = $relation['check']['label'];
            $check['category'] = $relation['check']['category'];
            $arranged[$floor][$room]['checks'][] = $check;
        }

        foreach ($arranged as $key => $floor){
            $newFloor = [];
            $newFloor['floor'] = $key;
            foreach ($floor as $room){
                $newFloor["rooms"][] = $room;
            }
            $checks['checks']['floors'][] = $newFloor;
        }

        $checks['checks']['floors'] = array_reverse( $checks['checks']['floors']);

        return array_merge($this->attributesToArray(),$checks);
    }

}
