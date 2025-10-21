<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class HealthController extends Controller
{
    public function validateEndpoint()
    {
        return response()->json([
            'status' => 'ok',
            'app'    => 'PPK Services INC',
            'time'   => now()->toISOString(),
        ]);
    }
}
