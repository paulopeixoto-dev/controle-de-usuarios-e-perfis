<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class AuthLoginRequest extends FormRequest
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
            'user' => 'required',
            'password' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'user.required' => 'O campo Usuário é obrigatório!',
            'password.required' => 'O campo Senha é obrigatório!'
        ];
    }
}
