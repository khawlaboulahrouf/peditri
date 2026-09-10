<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEnfantRequest;
use App\Models\Enfant;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class EnfantController extends Controller
{
    use AuthorizesRequests;
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

    function show(Enfant $enfant)
    {
        $this->authorize('view', $enfant);

        return response()->json([
            'enfant' =>$enfant
        ]);
    }

    public function update(StoreEnfantRequest $request, Enfant $enfant)
    {
        $this->authorize('update', $enfant);

        $enfant->update([
            'prenom' => $request->prenom,
            'date_naissance' => $request->date_naissance,
        ]);

        return response()->json([
            'message' => 'Profil enfant modifié avec succès',
            'enfant' => $enfant
        ]);
    }

    public function destroy(Enfant $enfant)
    {
        $this->authorize('delete', $enfant);
        $enfant->delete();

        return response()->json([
            'message' => 'Profil enfant supprimé avec succès',
        ]);
    }
}
