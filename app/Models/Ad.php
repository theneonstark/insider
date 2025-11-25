<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'region_id',
        'industry_id',
        'title',
        'link',
        'image',
        'start_date',
        'end_date',
        'active',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id', 'regionId');
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class, 'industry_id', 'industryId');
    }
}
