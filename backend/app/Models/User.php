<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'full_name',
        'email',
        'password',
        'company_id',
        'is_active',
        'name', // keep default column too
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active'         => 'boolean',
        'password'          => 'hashed',
    ];

    /**
     * Permissions relationship — submodules assigned to this user.
     */
    public function submodules()
    {
        return $this->belongsToMany(Submodule::class, 'user_submodule')
            ->withPivot(['granted_at', 'created_by']);
    }
}
