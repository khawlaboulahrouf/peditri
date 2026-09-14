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
        'group_age',
        'order',
    ];

    public function responses()
    {
        return $this->hasmany(Response::class);
    }
}
