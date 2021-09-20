<?php

namespace App\Http\Controllers;

use App\Models\Check;
use App\Models\Record;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;

class RecordController extends Controller
{
    public function exists(){
        $hasCurrentRecord = Record::where('status', 'Pending')->exists();
        return view('app')->with('hasCurrentRecord', $hasCurrentRecord);
    }

    public function findOrCreate(): JsonResponse {
        try {
            //Fetch existing record
            $record = Record::where('status', 'Pending')->firstOrFail();
            return response()->json($record->toArray());
        } catch(ModelNotFoundException  $e) {
            //Create new record
            $record = Record::create(['status' => 'Pending']);
            $checks = Check::all()->toArray();
            $recordChecks = [];
            foreach($checks as $check){
                $recordCheck = $check;
                $recordCheck['check_id'] = $recordCheck['id'];
                $recordCheck['value'] = 0;
                unset($recordCheck['id']);
                $recordChecks[] = $recordCheck;
            };
            $record->checks()->createMany($recordChecks);
            $record = Record::where('status', 'Pending')->firstOrFail();
            return response()->json($record->toArray());
        }
    }

    public function reset(Record $record): JsonResponse {
        foreach($record->checks as $check){
            $check->value = 0;
        }
        $record->push();
        return response()->json($record->toArray());

    }

    public function complete(Record $record): JsonResponse {
        foreach($record->checks as $check){
            $check->value = 1;
        }
        $record->push();
        return response()->json($record->toArray());
    }

    public function submit(Record $record): JsonResponse {
        $record->status = 'Complete';
        $record->save();
        return response()->json($record->toArray());
    }

}
