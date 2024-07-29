<?php

namespace App\Http\Requests\Permgroup;

use Illuminate\Foundation\Http\FormRequest;

class PermgroupInsertRequest extends FormRequest
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
            'name' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'O campo Nome é obrigatório!',
        ];
    }
}
