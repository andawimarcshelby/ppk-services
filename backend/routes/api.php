<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\HealthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Base path is /api (e.g., /api/validate).
*/

Route::get('/validate', [HealthController::class, 'validateEndpoint']);
Route::get('/companies', [CompanyController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'me']);
    Route::get('/modules', [ModuleController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
