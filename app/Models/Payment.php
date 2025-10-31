<?php
// app/Models/Payment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'user_id',
        'payment_intent_id',
        'plan_title',
        'amount',
        'currency',
        'status',
        'stripe_data'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'stripe_data' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}