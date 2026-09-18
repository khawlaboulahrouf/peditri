<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $questions = [
            'O-2' => [
                 'Votre enfant a-t-il de la fièvre ?',
                'Votre enfant a-t-il des difficultés à respirer ?',
                'Votre enfant refuse-t-il de boire ou de manger ?',
                'Votre enfant vomit-il plusieurs fois ?',
                'Votre enfant est-il très somnolent ou difficile à réveiller ?',
                'Votre enfant a-t-il un comportement inhabituel ?',
            ],
            '3-5' => [
                 'Votre enfant a-t-il de la fièvre ?',
                'Votre enfant a-t-il des difficultés à respirer ?',
                'Votre enfant refuse-t-il de boire ou de manger ?',
                'Votre enfant vomit-il plusieurs fois ?',
                'Votre enfant est-il très somnolent ou difficile à réveiller ?',
                'Votre enfant a-t-il un comportement inhabituel ?',
            ],
            '6-12' => [
                 'Votre enfant a-t-il de la fièvre ?',
                'Votre enfant a-t-il des difficultés à respirer ?',
                'Votre enfant refuse-t-il de boire ou de manger ?',
                'Votre enfant vomit-il plusieurs fois ?',
                'Votre enfant est-il très somnolent ou difficile à réveiller ?',
                'Votre enfant a-t-il un comportement inhabituel ?',
            ],
        ];

        foreach ($questions as $groupeAge => $listeQuestions) {
            foreach ($listeQuestions as $index =>$titre){
                Question::firstOrCreate([
                    'titre' => $titre,
                    'groupe_age' => $groupeAge,
                    'order' => $index + 1,
                ]);
            }
        }

    //     Question::firstOrCreate([
    //         'titre' => 'Votre enfant a-t-il de la fièvre ?',
    //         'groupe_age' => '0-2',
    //         'order' => 1,
    //     ]);
    //     Question::firstOrCreate([
    //         'titre' => 'Votre enfant a-t-il de la fièvre ?',
    //         'groupe_age' => '3-5',
    //         'order' => 1,
    //     ]);
    //     Question::firstOrCreate([
    //         'titre' => 'Votre enfant a-t-il de la fièvre ?',
    //         'groupe_age' => '6-12',
    //         'order' => 1,
    //     ]);

    //     Question::firstOrCreate([
    //         'titre' => 'Votre enfant a-t-il des difficultés a respire ?',
    //         'groupe_age' => '0-2',
    //         'order' => 2
    //     ]);
    //     Question::firstOrCreate([
    //         'titre' => 'Votre enfant a-t-il des difficultés a respire ?',
    //         'groupe_age' => '3-5',
    //         'order' => 2,
    //     ]);
    //     Question::firstOrCreate([
    //         'titre' => 'Votre enfant a-t-il des difficultés a respire ?',
    //         'groupe_age' => '6-12',
    //         'order' => 2,
    //     ]);
    }
}
