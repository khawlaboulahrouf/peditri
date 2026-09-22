<?php

namespace App\Models;
use illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etablissement extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'nom',
        'type',
        'adresse',
        'telephone',
        'ville',
    ];
}
