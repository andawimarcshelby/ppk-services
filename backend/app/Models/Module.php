<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'system_id',
        'name',
        'code',
        'icon',
    ];

    protected $casts = [
        'system_id' => 'integer',
        'name'      => 'string',
        'code'      => 'string',
        'icon'      => 'string',
    ];

    public function system()
    {
        return $this->belongsTo(System::class);
    }

    public function submodules()
    {
        return $this->hasMany(Submodule::class);
    }
}
