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

        $id = $this->route('id');

        // ESSA REGRA PERMITE O USUARIO MUDAR PROPRIO USUARIO, SE ELE ENVIAR O MESMO NAO VAI TER PROBLEMA
        // SE ENVIAR UM QUE JA EXISTE VAI BARRAR, E SE ENVIAR UM QUE NÃO FOI USADO NAO VAI TER PROBLEMA

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
