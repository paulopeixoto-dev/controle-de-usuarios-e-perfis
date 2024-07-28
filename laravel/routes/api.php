<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/ping', function () {
    return response()->json(['pong' => true]);
});
