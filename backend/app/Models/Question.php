<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Question extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'titre',
        'groupe_age',
        'order',
    ];

    public function reponses()
    {
        return $this->hasmany(Response::class);
    }
}
