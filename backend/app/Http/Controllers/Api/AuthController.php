<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Throwable;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'username'     => ['required', 'string'],
            'password'     => ['required', 'string'],
            'company_code' => ['required', 'string'],
        ]);

        try {
            $user = \App\Models\User::where('username', $data['username'])->first();
        } catch (Throwable $e) {
            return response()->json([
                'error'   => 'schema_not_ready',
                'message' => 'Run migrations & seeders first (users table missing).',
            ], 503);
        }

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        if (property_exists($user, 'is_active') && $user->is_active === 0) {
            return response()->json(['error' => 'inactive_user'], 403);
        }

        // Validate company
        try {
            $company = \App\Models\Company::where('code', $data['company_code'])->first();
        } catch (Throwable $e) {
            $company = null;
        }
        if (!$company) {
            return response()->json(['error' => 'invalid_company'], 422);
        }

        // Enforce that the user's company matches the selected company if set
        if (!empty($user->company_id) && (int)$user->company_id !== (int)$company->id) {
            return response()->json(['error' => 'company_mismatch'], 403);
        }

        $token = $user->createToken('webtoken')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => [
                'id'         => $user->id,
                'username'   => $user->username,
                'full_name'  => $user->full_name ?? null,
                'company_id' => $user->company_id ?? null,
            ],
            'company' => [
                'id'            => $company->id,
                'name'          => $company->name,
                'code'          => $company->code,
                'primary_color' => $company->primary_color ?? '#1E5128',
                'accent_color'  => $company->accent_color  ?? '#D8E9A8',
                'logo_url'      => $company->logo_url,
            ],
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }
        return response()->json(['ok' => true], 200);
    }
}
