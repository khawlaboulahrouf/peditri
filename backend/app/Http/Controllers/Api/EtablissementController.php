<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Etablissement;

class EtablissementController extends Controller
{
    public function index(Request $request)
    {
        $query = Etablissement::query();

        if ($request->type) {
            $query->where('type', $request->type);
        }

        return response()->json(
            $query->get()
        );
    }
}
