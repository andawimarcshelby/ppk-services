<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submodule extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id',
        'name',
        'code',
        'route',
    ];

    protected $casts = [
        'module_id' => 'integer',
        'name'      => 'string',
        'code'      => 'string',
        'route'     => 'string',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_submodule')
            ->withPivot(['granted_at', 'created_by']);
    }
}
