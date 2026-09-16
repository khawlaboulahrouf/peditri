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

        Question::firstOrCreate([
            'titre' => 'Votre enfant a-t-il de la fièvre ?',
            'groupe_age' => '0-2',
            'order' => 1,
        ]);
        Question::firstOrCreate([
            'titre' => 'Votre enfant a-t-il de la fièvre ?',
            'groupe_age' => '3-5',
            'order' => 1,
        ]);
        Question::firstOrCreate([
            'titre' => 'Votre enfant a-t-il de la fièvre ?',
            'groupe_age' => '6-12',
            'order' => 1,
        ]);

        Question::firstOrCreate([
            'titre' => 'Votre enfant a-t-il des difficultés a respire ?',
            'groupe_age' => '0-2',
            'order' => 2
        ]);
        Question::firstOrCreate([
            'titre' => 'Votre enfant a-t-il des difficultés a respire ?',
            'groupe_age' => '3-5',
            'order' => 2,
        ]);
        Question::firstOrCreate([
            'titre' => 'Votre enfant a-t-il des difficultés a respire ?',
            'groupe_age' => '6-12',
            'order' => 2,
        ]);
    }
}
