<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class AuthControler extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[@$!%*?&]/',
            'role' => 'nullable|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'guest',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['message' => 'User registered successfully', 'user' => $user, 'access_token' => $token], 201);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|exists:users,email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'], 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['message' => 'Login successful', 'access_token' => $token, 'token_type' => 'Bearer']);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Email not found'], 404);
        }
        $token = bin2hex(random_bytes(60));
        DB::table('password_resets')->insert([
            'user_id' => $user->id,
            'token' => $token,
            'created_at' => now(),
        ]);
        $link = "http://localhost:3000/reset-password?token=$token";

        Mail::raw("Reset your password: $link", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject("Reset Password");
        });
        return response()->json(['message' => 'Password reset token sent to email']);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[@$!%*?&]/',
        ]);
        $user = $request->user();
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }
        $user->update(['password' => Hash::make($request->new_password)]);
        return response()->json(['message' => 'Password changed successfully']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|min:8|regex:/[a-z]/|regex:/[A-Z]/|regex:/[0-9]/|regex:/[@$!%*?&]/',
        ]);
        $passwordReset = DB::table('password_resets')->where('token', $request->token)->first();
        if (!$passwordReset) {
            return response()->json(['message' => 'Invalid token'], 400);
        }
        $user = User::find($passwordReset->user_id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->update(['password' => Hash::make($request->password)]);
        DB::table('password_resets')->where('token', $request->token)->delete();
        return response()->json(['message' => 'Password has been reset successfully'], 200);
    }
}