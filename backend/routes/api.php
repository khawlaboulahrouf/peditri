<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EnfantController;
use Laravel\Sanctum\Sanctum;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register',[AuthController::class, 'register']);

Route::post('/login',[AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->post('/enfants',[EnfantController::class, 'store']);
Route::middleware('auth:sanctum')->get('/enfants', [EnfantController::class, 'index']);
Route::middleware('auth:sanctum')->get('/enfants/{enfant}', [EnfantController::class, 'show']);
Route::middleware('auth:sanctum')->put('/enfants/{enfant}', [EnfantController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/enfants/{enfant}', [EnfantController::class, 'destroy']);
