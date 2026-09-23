<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class AdminQuestionController extends Controller
{
    //
    public function index()
    {
        $questions = Question::orderBy('groupe_age')
          ->orderBy('order')
          ->get();

        return response()->json($questions);
    }

    // Ajouter une question
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string',
            'groupe_age' => 'required|string',
            'order' => 'required|integer',
        ]);

        $question = Question::create([
            'titre' => $request->titre,
            'groupe_age' => $request->groupe_age,
            'order' => $request->order,
        ]);

        return response()->json($question, 201);
    }

    // Modifier une question
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'titre' => 'required|string',
            'groupe_age' => 'required|string',
            'order' => 'required|integer',
        ]);

        $question->update([
            'titre' => $request->titre,
            'groupe_age' => $request->groupe_age,
            'order' => $request->order,
        ]);

        return response()->json($question);
    }

    // Supprimer une question
    public function destroy(Question $question)
    {
        $question->delete();

        return response()->json([
            'message' => 'Question supprimée'
        ]);
    }
}

