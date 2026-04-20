<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Jobs\DeleteUserParametly;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
	public function Index()
	{
		return response()->json(User::all(), 200);
	}

	public function me(Request $request)
	{
		return response()->json($request->user(), 200);
	}
	
	public function show(Request $request, int $id)
	{
		$authUser = $request->user(); // 👈 logged-in user
		$user = User::findOrFail($id);

		// Only admin OR same user can access
		if ($authUser->role !== 'admin' && $authUser->id !== $user->id) {
			return response()->json([
				'message' => 'Unauthorized'
			], 403);
		}

		return response()->json($user, 200);
	}

	public function Store(StoreUserRequest $request)
	{
		$data = $request->validated();
		$user = User::create($data);
		return response()->json($user, 201);
	}

	public function Update(StoreUserRequest $request, int $id)
	{
		$user= User::findOrFail($id);
		if ($user->id !== $id || $user->role !== 'admin') {
			return response()->json(['message' => 'Unauthorized'], 403);
		}
		if (isset($request->password)) {
			$request->merge(['password' => Hash::make($request->password)]);
		}
		$user->update($request->validated());
		return response()->json($user, 201);
	}

	public function Remove(int $id)
	{
		$user = User::findOrFail($id);
		$user->dates = now();
		$user->delete();
		DeleteUserParametly::dispatch($user)->delay(now()->addMinute());
		return response()->json(['delete'=> $id], 200);
	}
}
