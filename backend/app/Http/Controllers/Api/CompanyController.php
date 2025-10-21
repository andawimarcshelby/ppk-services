<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Throwable;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Will work after we add migrations/seeders
            $companies = \App\Models\Company::select(
                'id','name','code','primary_color','accent_color','logo_url'
            )->orderBy('name')->get();

            return response()->json($companies, 200);
        } catch (Throwable $e) {
            // Fallback data so the login dropdown works before seeding
            return response()->json([
                'fallback' => true,
                'data' => [
                    [
                        'id' => 1,
                        'name' => 'PPK Farms',
                        'code' => 'PPK-FARMS',
                        'primary_color' => '#1E5128',
                        'accent_color'  => '#D8E9A8',
                        'logo_url'      => null,
                    ],
                    [
                        'id' => 2,
                        'name' => 'PPK Fisheries',
                        'code' => 'PPK-FISHERIES',
                        'primary_color' => '#1E5128',
                        'accent_color'  => '#D8E9A8',
                        'logo_url'      => null,
                    ],
                ],
                'message' => 'Using fallback companies until migrations & seeders are applied.',
            ], 200);
        }
    }
}
