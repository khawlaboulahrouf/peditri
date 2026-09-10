<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enfant extends Model
{
    use HasFactory;

    protected $fillable = [
        'prenom' ,
        'date_naissance' ,
        'user_id' ,

    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
