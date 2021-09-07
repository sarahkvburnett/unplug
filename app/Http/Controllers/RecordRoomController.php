<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class RecordRoomController extends Controller
{

    public function reset(Record $record, $id): JsonResponse {
        DB::table('record_checks as rc')
            ->join('checks as c', 'c.id', '=', 'rc.check_id')
            ->where('c.room_id', $id)
            ->where('record_id', $record->id)
            ->update([ 'rc.value' => 0 ]);
        $record->fresh();
        return response()->json($record->toArray());
    }

    public function complete(Record $record, $id): JsonResponse {
        DB::table('record_checks as rc')
            ->join('checks as c', 'c.id', '=', 'rc.check_id')
            ->where('c.room_id', $id)
            ->where('record_id', $record->id)
            ->update([ 'rc.value' => 1 ]);
        $record->fresh();
        return response()->json($record->toArray());
    }

}
