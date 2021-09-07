<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('record/find', 'RecordController@findOrCreate');
Route::post('record/find', 'RecordController@findOrCreate');
Route::get('record/{record}/reset', 'RecordController@reset');
Route::post('record/{record}/reset', 'RecordController@reset');
Route::get('record/{record}/complete', 'RecordController@complete');
Route::post('record/{record}/complete', 'RecordController@complete');

Route::post('record/{record}/floor/{id}/reset', 'RecordFloorController@reset');
Route::post('record/{record}/floor/{id}/complete', 'RecordFloorController@complete');

Route::post('record/{record}/room/{id}/reset', 'RecordRoomController@reset');
Route::post('record/{record}/room/{id}/complete', 'RecordRoomController@complete');

Route::post('record/{record}/check/{check}/reset', 'RecordCheckController@reset');
Route::post('record/{record}/check/{check}/complete', 'RecordCheckController@complete');
