<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Triage extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'enfant_id',
        'resultat',
        'date_debut',
        'date_fin',
    ];

    public function enfant()
    {
        return $this->belongsTo(Enfant::class);
    }
    public function response()
    {
        return $this->hasMany(Response::class);
    }
}
