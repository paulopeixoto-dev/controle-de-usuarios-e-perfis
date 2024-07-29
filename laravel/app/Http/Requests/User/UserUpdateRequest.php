<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
        // Pegando o id do usuário passando como parametro na rota
        $id = $this->route('id');

        // Esta regra permite que o usuário atualize o próprio nome de usuário (user).
        // Se o mesmo nome de usuário for enviado, não haverá problemas.
        // Se um nome de usuário já existente for enviado, a validação falhará.
        // Se um nome de usuário novo (não utilizado) for enviado, não haverá problemas.

        return [
            'user' => [
                'required',
                Rule::unique('users', 'user')->ignore($id),
            ],
            'name' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'user.required' => 'O campo Usuário é obrigatório!',
            'user.unique' => 'O usuário já está cadastrado!',
            'name.required' => 'O campo Nome é obrigatório!',
        ];
    }
}
