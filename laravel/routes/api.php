<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PermgroupController;
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

Route::prefix("/users")->middleware('jwt.auth')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('/getall', 'getAll');
        Route::put('/update/{id}', 'update');
        Route::delete('/delete/{id}', 'delete');
    });
});

Route::prefix("/permission_groups")->middleware('jwt.auth')->group(function () {
    Route::controller(PermgroupController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('/{id}', 'id');
        Route::delete('/{id}/delete', 'delete');
        Route::get('/items/{id}', 'getItemsForGroup');
        Route::get('/items/user/{id}', 'getItemsForGroupUser');
        Route::put('/{id}', 'update');
        Route::post('/', 'insert');
    });
});


