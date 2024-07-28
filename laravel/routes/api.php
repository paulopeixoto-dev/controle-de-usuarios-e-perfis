<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/ping', function () {
    return response()->json(['pong' => true]);
});

// Módulo de Autenticação
Route::prefix("/auth")->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('/login', 'login');
        Route::post('/register', 'register');
        Route::post('/logout', 'logout')->middleware('jwt.auth');
        Route::get('/validate', 'validateToken')->middleware('jwt.auth');
    });
});
