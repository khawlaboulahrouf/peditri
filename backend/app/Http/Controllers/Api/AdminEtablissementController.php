<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Etablissement;
use Illuminate\Http\Request;

class AdminEtablissementController extends Controller
{
    //
    // Afficher tous les établissements
    public function index()
    {
        return response()->json(Etablissement::all());
    }

    // Ajouter un établissement
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'type' => 'required|in:pediatre,urgence',
            'adresse' => 'required|string',
            'telephone' => 'nullable|string',
            'ville' => 'required|string',
        ]);

        $etablissement = Etablissement::create($request->only([
            'nom',
            'type',
            'adresse',
            'telephone',
            'ville',
        ]));

        return response()->json($etablissement, 201);
    }

    // Modifier un établissement
    public function update(Request $request, Etablissement $etablissement)
    {
        $request->validate([
            'nom' => 'required|string',
            'type' => 'required|in:pediatre,urgence',
            'adresse' => 'required|string',
            'telephone' => 'nullable|string',
            'ville' => 'required|string',
        ]);

        $etablissement->update($request->only([
            'nom',
            'type',
            'adresse',
            'telephone',
            'ville',
        ]));

        return response()->json($etablissement);
    }

    // Supprimer un établissement
    public function destroy(Etablissement $etablissement)
    {
        $etablissement->delete();

        return response()->json([
            'message' => 'Établissement supprimé'
        ]);
    }
}
