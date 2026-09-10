<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEnfantRequest;
use App\Models\Enfant;
use Illuminate\Http\Request;

class EnfantController extends Controller
{
    //
    public function index(Request $request)
    {
        $enfants = $request->user()->enfants;

        return response()->json([
            'enfants' => $enfants
        ]);
    }


    public function store(StoreEnfantRequest $request)
    {
        $enfant = Enfant::create([
            'prenom' => $request->prenom,
            'date_naissance' => $request->date_naissance,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Profil enfant crée avec succès',
            'enfant' => $enfant
        ], 201);
    }
}
