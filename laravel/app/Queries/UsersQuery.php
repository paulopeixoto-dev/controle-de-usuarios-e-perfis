<?php

namespace App\Queries;

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Response;

class UsersQuery
{
    public function buscaInformacoes($user)
    {
        // 1º Passo -> Busca id do usuário
        $idUsuario = User::where('user', $user)
            ->value('id');

        // 2º Passo -> Query responsável por buscar dados do usuário
        $query = User::where('id', $idUsuario)->get();

        // 3º Passo -> retorna resposta
        return $query;
    }
}
