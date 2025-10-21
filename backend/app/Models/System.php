<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class System extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
    ];

    protected $casts = [
        'name' => 'string',
        'code' => 'string',
    ];

    // Will be used once Module model exists (next steps)
    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}
