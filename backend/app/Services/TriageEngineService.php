<?php

namespace App\Services;

use App\Models\Question;
use App\Models\Enfant;
use App\Models\Response;
use App\Models\Triage;
use Carbon\Carbon;
class TriageEngineService
{
    public function startTriage(Enfant $enfant): array
    {
        $triage = Triage::create([
            'enfant_id' => $enfant->id,
            'date_debut' => now(),
        ]);

        $age = Carbon::parse($enfant->date_naissance)->age;

        if($age <= 2){
            $groupAge = '0-2';
        }elseif($age <=5){
            $groupAge = '3-5';
        }else{
            $groupAge = '6-12';
        }

        $question = Question::where('groupe_age' , $groupAge)
           ->orderBy('order')
           ->first();
        return [
            'triage' => $triage,
            'question' => $question,
        ];
    }
    public function answerQuestion($triage ,$question , $label)
    {
        if($label === 'Oui'){
            $status = 'MEDIUM';
        }else{
            $status = 'LOW';
        }

        $response = Response::create([
            'triage_id' => $triage->id,
            'question_id' => $question->id,
            'label' => $label,
            'status' => $status,
        ]);

        $nextQuestion = Question::where('groupe_age', $question->groupe_age)
            ->where('order', '>' , $question->order)
            ->orderby('order')
            ->first();


        return [
            'response' => $response,
            'next_question' => $nextQuestion,
        ];
    }
}
