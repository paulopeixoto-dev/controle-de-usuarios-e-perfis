<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
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
