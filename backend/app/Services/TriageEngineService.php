<?php

namespace App\Services;

use App\Models\Question;
use App\Models\Enfant;
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

        $question = Question::where('group_age' , $groupAge)
           ->orderBy('order')
           ->first();
        return [
            'triage' => $triage,
            'question' => $question,
        ];
    }
}
