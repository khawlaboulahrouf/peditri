<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enfant;
use App\Services\TriageEngineService;
// use App\Models\Triage;
// use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TriageController extends Controller
{
    use AuthorizesRequests;

    public function store(
        Enfant $enfant,
        TriageEngineService $triageService
    ){
        $this->authorize('view', $enfant);
        $result = $triageService->startTriage($enfant);

        return response()->json([
            'message' => 'Triage démarré avec succès',
            'triage' => $result['triage'],
            'question' => $result['question'],
        ], 201);
    }
}



// {
//     //
//     use AuthorizesRequests;

//     public function store(Request $request, Enfant $enfant)
//     {
//         $this->authorize('view' , $enfant);
//         $triage = Triage::create([
//             'enfant_id' => $enfant->id,
//             'date_debut' => now(),
//         ]);
//         return response()->json([
//             'message' => 'Triage démarré avec succès',
//             'triage' => $triage
//         ], 201);
//     }
// }
