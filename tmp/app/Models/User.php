<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens;
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $table = 'users';
    protected $fillable = ['name', 'email', 'email_verified_at','password', 'role', 'phone', 'verification_code'];

    public function Doctors()
    {
        return $this->hasOne(Doctors::class);
    }
    public function Patients()
    {
        return $this->hasOne(User::class);
    }
}
