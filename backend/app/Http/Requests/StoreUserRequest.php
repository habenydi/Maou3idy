<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		if ($this->isMethod('post'))
			return [
			'name' => 'required|string|max:20',
			'email' => 'required|string|email|unique:users,email',
			'password'=> [
				'required',
				'string',
				'min:8',             // Minimum length of 8 characters
				'regex:/[a-z]/',      // Must contain at least one lowercase letter
				'regex:/[A-Z]/',      // Must contain at least one uppercase letter
				'regex:/[0-9]/',      // Must contain at least one digit
				'regex:/[@$!%*?&]/', // Must contain a special character
			],
			'role' => 'required|string',
			'phone' => 'nullable|string'
			];
		if ($this->isMethod('put'))
			return [
			'name' => 'sometimes|string|max:20',
			'email' => 'sometimes|string|email|unique:users,email',
			'password'=> [
				'nullable',
				'string',
				'min:8',             // Minimum length of 8 characters
				'regex:/[a-z]/',      // Must contain at least one lowercase letter
				'regex:/[A-Z]/',      // Must contain at least one uppercase letter
				'regex:/[0-9]/',      // Must contain at least one digit
				'regex:/[@$!%*?&]/', // Must contain a special character
			],
			'role' => 'nullable|string',
			'phone' => 'nullable|string'
			];
		return [];
	}
}
