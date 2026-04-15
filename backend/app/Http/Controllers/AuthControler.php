<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\ChangePasswordUserRequest;
use App\Http\Requests\ForgotPasswordUserRequest;
use Illuminate\Testing\Fluent\Concerns\Has;
use App\Http\Requests\ResetPasswordUserRequest;

class AuthControler extends Controller
{
    public function register(RegisterUserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'guest',
        ]);
        $verificationCode = rand(100000, 999999);
        DB::table('email_verifications')->insert([
            'user_id' => $user->id,
            'code' => Hash::make((string)$verificationCode),
            'created_at' => now(),
            'expires_at' => now()->addMinutes(60),
        ]);
        Mail::raw("Your verification code is: $verificationCode", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject("Email Verification");
        });
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['message' => 'User registered successfully, please verify your email', 'user' => $user, 'access_token' => $token], 201);
    }
    public function login(LoginUserRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials '], 401);
        }
        if (!$user->email_verified_at) {
            return response()->json(['message' => 'Please verify your email before logging in'], 403);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['message' => 'Login successful', 'access_token' => $token, 'token_type' => 'Bearer']);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
    public function forgotPassword(ForgotPasswordUserRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Email not found'], 404);
        }
        $token = bin2hex(random_bytes(60));
        DB::table('password_resets')->insert([
            'user_id' => $user->id,
            'token' => Hash::make($token),
            'expires_at' => now()->addMinutes(60),
            'created_at' => now(),
        ]);
        $link = "http://localhost:3000/reset-password?token=$token";

        Mail::raw("Reset your password: $link", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject("Reset Password");
        });
        return response()->json(['message' => 'Password reset token sent to email']);
    }

    public function changePassword(ChangePasswordUserRequest $request)
    {
        $user = $request->user();
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }
        $user->update(['password' => Hash::make($request->new_password)]);
        return response()->json(['message' => 'Password changed successfully'], 200);
    }
    public function resetPassword(ResetPasswordUserRequest $request)
    {
        $passwordReset = DB::table('password_resets')
            ->get()
            ->first(fn($reset) => Hash::check((string) $request->token, $reset->token));
        if (!$passwordReset) {
            return response()->json(['message' => 'Invalid token'], 400);
        }
        if (now()->greaterThan($passwordReset->expires_at)) {
            DB::table('password_resets')->where('user_id', $passwordReset->user_id)->delete();
            return response()->json(['message' => 'Token expired'], 400);
        }
        $user = User::find($passwordReset->user_id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->update(['password' => Hash::make($request->password)]);
        DB::table('password_resets')->where('user_id', $passwordReset->user_id)->delete();
        return response()->json(['message' => 'Password has been reset successfully'], 200);
    }
    public function verifyCode(Request $request)
    {
        $request->validate(['code' => 'required|digits:6']);

        $verification = DB::table('email_verifications')
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$verification) {
            return response()->json(['message' => 'No verification code found'], 404);
        }

        if (now()->greaterThan($verification->expires_at)) {
            DB::table('email_verifications')->where('user_id', $request->user()->id)->delete();
            return response()->json(['message' => 'Verification code expired'], 400);
        }

        if (!Hash::check((string) $request->code, $verification->code)) {
            return response()->json(['message' => 'Invalid verification code'], 400);
        }

        $user = User::find($verification->user_id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->update(['email_verified_at' => now()]);
        DB::table('email_verifications')->where('user_id', $request->user()->id)->delete();
        return response()->json(['message' => 'Email verified successfully']);
    }
}