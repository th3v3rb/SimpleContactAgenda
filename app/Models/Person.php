<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;
    protected $table = 'people';
    public $incrementing = true;
    protected $fillable = [
        'social_reason',
        'document',
        'document_type_id',
        'person_type_id',
        'birthday',
        'city',
        'address',
        'is_active',
    ];
}
