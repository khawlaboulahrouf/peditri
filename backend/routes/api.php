<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EnfantController;
use App\Http\Controllers\Api\TriageController;
use App\Http\Controllers\Api\EtablissementController;
use App\Http\Controllers\Api\AdminQuestionController;
use App\Http\Controllers\Api\AdminEtablissementController;
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
Route::middleware('auth:sanctum')->post('/enfants/{enfant}/triages',[TriageController::class, 'store']);
Route::middleware('auth:sanctum')->post('/triages/{triage}/responses',[TriageController::class, 'answer']);
Route::middleware('auth:sanctum')->get('/etablissements',[EtablissementController::class,'index']);
// Route::middleware(['auth:sanctum', 'admin'])->get('/admin/test', function () {
//     return response()->json([
//         'message' => 'Bienvenue Admin'
//     ]);
// });
// Route::middleware(['auth:sanctum', 'admin'])->get(
//     '/admin/questions',
//     [AdminQuestionController::class, 'index']
// );
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    Route::get('/test', function () {
        return response()->json([
            'message' => 'Bienvenue Admin'
        ]);
    });

    Route::get('/questions', [AdminQuestionController::class, 'index']);

    Route::post('/questions', [AdminQuestionController::class, 'store']);

    Route::put('/questions/{question}', [AdminQuestionController::class, 'update']);

    Route::delete('/questions/{question}', [AdminQuestionController::class, 'destroy']);

    Route::get('/etablissements', [AdminEtablissementController::class, 'index']);

Route::post('/etablissements', [AdminEtablissementController::class, 'store']);

Route::put('/etablissements/{etablissement}', [AdminEtablissementController::class, 'update']);

Route::delete('/etablissements/{etablissement}', [AdminEtablissementController::class, 'destroy']);
});
