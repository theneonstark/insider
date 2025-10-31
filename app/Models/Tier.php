<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tier extends Model
{
    use HasFactory;

    protected $table = 'tiers'; // agar table name 'tiers' hai
    protected $fillable = ['tier_name'];

    // ✅ Relation with User

    public function users()
    {
        return $this->hasMany(User::class, 'tier_id');
    }
}
