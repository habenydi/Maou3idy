<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthControler;
use App\Models\User;


Route::post('/register', [AuthControler::class, 'register']);
Route::post('/login', [AuthControler::class, 'login']);
Route::post('/forgot-password', [AuthControler::class, 'forgotPassword']);
Route::post('/reset-password', [AuthControler::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/verify-code', [AuthControler::class, 'verifyCode']);
    Route::post('/logout', [AuthControler::class, 'logout']);
    Route::post('/change-password', [AuthControler::class, 'changePassword']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/{id}', [UserController::class, 'show']); // Read single user
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete user
    Route::get('user/', [UserController::class, 'me']);
    Route::put('user/', [UserController::class, 'update']);
});

// Route::post('/forgot-password', [AuthControler::class, 'forgotPassword']); // Forgot password
// // Route::middleware('auth:sanctum')->post('/reset-password', [AuthControler::class, 'resetPassword']); // Reset password
// Route::middleware('auth:sanctum')->post('/user/change-password', [AuthControler::class, 'changePassword']); // Change password with auth
// Route::post('/reset-password', [AuthControler::class, 'resetPassword']); // Reset password without auth
// Route::post('/verify-email', [AuthControler::class, 'verifyEmail']); // Email verification
// Route::post('/verify-code', [AuthControler::class, 'verifyCode'])->middleware('auth:sanctum');
// Route::post('/register', [AuthControler::class, 'register']); // User registration
// Route::post('/login', [AuthControler::class, 'login']);       // User login
// Route::post('/logout', [AuthControler::class, 'logout']);     // User logout
