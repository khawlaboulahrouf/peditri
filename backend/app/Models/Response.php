<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Response extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'triage_id',
        'question_id',
        'label',
        'status',
    ];

    public function triage()
    {
        return $this->belongsTo(Triage::class);
    }
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
