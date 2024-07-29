<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            "id"            => $this->id,
            "name"          => $this->name,
            "user"          => $this->user,
            "permgroup_id"  => $this->permgroup_id,
            "perfil"        => $this->group->id,
            "permissoes"    => $this->group->items,
        ];
    }
}
