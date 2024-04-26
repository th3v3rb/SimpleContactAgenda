<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    protected $table = 'contacts';
    protected $fillable = [
        'contact',
        'contact_type_id',
        'person_id',
        'is_main',
        'note',
        'is_active'
    ];
}
