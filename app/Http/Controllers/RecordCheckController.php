<?php

namespace App\Http\Controllers;

use App\Models\Check;
use App\Models\Record;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecordCheckController extends Controller
{

    public function reset(Record $record, Check $check): JsonResponse {
        $check->value = 0;
        $check->save();
        return response()->json($record->toArray());
    }

    public function complete(Record $record, Check $check): JsonResponse {
        $check->value = 1;
        $check->save();
        return response()->json($record->toArray());
    }

}
