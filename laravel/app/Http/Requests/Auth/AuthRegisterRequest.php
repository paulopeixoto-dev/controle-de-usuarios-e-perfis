<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class AuthRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user' => 'required|unique:users,user',
            'name' => 'required',
            'password' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'user.required' => 'O campo Usuário é obrigatório!',
            'user.unique' => 'O usuário já está cadastrado!',
            'name.required' => 'O campo Nome é obrigatório!',
            'password.required' => 'O campo Senha é obrigatório!'
        ];
    }
}
