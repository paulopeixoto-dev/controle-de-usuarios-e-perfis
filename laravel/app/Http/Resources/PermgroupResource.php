<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PermgroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $permissionItems = $this->items;

        // Lista de slugs que vamos considerar
        $allSlugs = [
            'criar_usuario',
            'deletar_usuario',
            'editar_outro_usuario',
            'editar_proprio_usuario',
            'visualizar_todos_usuario',
            'visualizar_permissoes',
            'criar_perfil',
            'editar_perfil',
        ];

        // Iniciando todos os slugs como false
        $formattedPermissions = [];
        foreach ($allSlugs as $slug) {
            $formattedPermissions[$slug] = false;
        }

        // Ajustando os slugs que estão presentes na resposta
        foreach ($permissionItems as $item) {
            if (in_array($item->slug, $allSlugs)) {
                $formattedPermissions[$item->slug] = true;
            }
        }

        // Mesclar permissões formatadas com os dados básicos do permgroup
        return array_merge([
            "id"   => $this->id,
            "name" => $this->name,
        ], $formattedPermissions);
    }
}
