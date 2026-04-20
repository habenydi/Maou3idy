<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use PhpParser\Builder\Function_;
use PhpParser\Node\Expr\FuncCall;

class Doctors extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $table = 'doctors';
    protected $fillable = ['clinic_name', 'specialty', 'phone', 'city', 'user_id'];
    public function User()
    {
        return $this->belongsTo(User::class);
    }
    public function Doctor_patients()
    {
        return $this->hasMany(Doctor_patients::class);
    }
}
