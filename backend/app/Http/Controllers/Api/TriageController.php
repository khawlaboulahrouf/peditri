<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enfant;
use App\Models\Question;
use App\Models\Triage;
use Illuminate\Http\Request;
use App\Services\TriageEngineService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TriageController extends Controller
{
    use AuthorizesRequests;

    public function store( Enfant $enfant,TriageEngineService $triageService){
        $this->authorize('view', $enfant);
        $result = $triageService->startTriage($enfant);

        return response()->json([
            'message' => 'Triage démarré avec succès',
            'triage' => $result['triage'],
            'question' => $result['question'],
        ], 201);
    }

    public function answer(Request $request, Triage $triage ,TriageEngineService $triageService)
    {
        $request -> validate([
            'question_id' => 'required|exists:questions,id',
            'label' => 'required|string',
        ]);

       $question = Question::findOrFail($request->question_id);
       $result = $triageService->answerQuestion($triage , $question , $request->label);

       return response()->json([
         'message' => 'Réponse enregistrée avec succès' ,
         'response' => $result['response'],
         'next_question' =>$result['next_question']
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
