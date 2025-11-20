<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'business_type',
        'dob',
        'state',
        'bio',
        'tier_id',
        'views',
        'image',
        'about',
        'role',
        'featured',
        'featured_valid',
        'password',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];

    public function industry()
    {
        return $this->belongsTo(Industry::class, 'business_type', 'industryId');
    }

    public function region()
    {
        return $this->belongsTo(Region::class, 'state', 'regionId');
    }

    public function tier()
    {
        return $this->belongsTo(Tier::class, 'tier_id', 'id');
        //                  ↑ Model     ↑ foreign_key  ↑ primary_key
    }

    public function services()
    {
        return $this->hasMany(Service::class, 'user_id');
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class, 'user_id');
    }

    public function offers()
    {
        return $this->hasMany(Offer::class, 'user_id');
    }

    public function getUpdatedAtAttribute($value)
    {
        return date('d M y - h:i A', strtotime($value));
    }

    public function getCreatedAtAttribute($value)
    {
        return date('d M y - h:i A', strtotime($value));
    }
}
