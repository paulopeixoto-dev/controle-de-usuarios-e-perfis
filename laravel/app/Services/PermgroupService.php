<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Models\Permgroup;
use App\Models\Permitem;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class PermgroupService
{
    public function insert($request)
    {
        // ============= Verificar se usuário tem permissao para criar uma permissao ===========
        if (!auth()->user()->hasPermission('criar_perfil')) {
            return ['message' => 'Você não tem permissão para criar uma nova permissão', 'usuario' => null, 'token' => null, 'status' => Response::HTTP_FORBIDDEN];
        }

        $dados = $request->all();

        $newGroup = Permgroup::create($dados);

        if ($dados['criar_usuario']) {
            $item = Permitem::where('slug', 'criar_usuario')->first();
            $newGroup->items()->attach($item);
        }

        if ($dados['deletar_usuario']) {
            $item = Permitem::where('slug', 'deletar_usuario')->first();
            $newGroup->items()->attach($item);
        }

        if ($dados['editar_outro_usuario']) {
            $item = Permitem::where('slug', 'editar_outro_usuario')->first();
            $newGroup->items()->attach($item);
        }

        if ($dados['editar_proprio_usuario']) {
            $item = Permitem::where('slug', 'editar_proprio_usuario')->first();
            $newGroup->items()->attach($item);
        }

        if ($dados['visualizar_todos_usuario']) {
            $item = Permitem::where('slug', 'visualizar_todos_usuario')->first();
            $newGroup->items()->attach($item);
        }

        if ($dados['visualizar_permissoes']) {
            $item = Permitem::where('slug', 'visualizar_permissoes')->first();
            $newGroup->items()->attach($item);
        }

        if ($dados['criar_perfil']) {
            $item = Permitem::where('slug', 'criar_perfil')->first();
            $newGroup->items()->attach($item);
        }

        if ($dados['editar_perfil']) {
            $item = Permitem::where('slug', 'editar_perfil')->first();
            $newGroup->items()->attach($item);
        }

        // Retornando os dados
        return [
            'message' => 'Perfil Criado com Sucesso!',
            'status' => Response::HTTP_OK
        ];
    }

    public function update($request, $id)
    {
        // ============= Verificar se usuário tem permissao para criar uma permissao ===========
        if (!auth()->user()->hasPermission('editar_perfil')) {
            return ['message' => 'Você não tem permissão para editar permissão', 'usuario' => null, 'token' => null, 'status' => Response::HTTP_FORBIDDEN];
        }

        $user = auth()->user();
        $dados = $request->all();

        $EditGroup = Permgroup::find($id);

        $EditGroup->name = $dados['name'];
        $EditGroup->items()->detach();
        $EditGroup->save();

        if ($dados['criar_usuario']) {
            $item = Permitem::where('slug', 'criar_usuario')->first();
            $EditGroup->items()->attach($item);
        }

        if ($dados['deletar_usuario']) {
            $item = Permitem::where('slug', 'deletar_usuario')->first();
            $EditGroup->items()->attach($item);
        }

        if ($dados['editar_outro_usuario']) {
            $item = Permitem::where('slug', 'editar_outro_usuario')->first();
            $EditGroup->items()->attach($item);
        }

        if ($dados['editar_proprio_usuario']) {
            $item = Permitem::where('slug', 'editar_proprio_usuario')->first();
            $EditGroup->items()->attach($item);
        }

        if ($dados['visualizar_todos_usuario']) {
            $item = Permitem::where('slug', 'visualizar_todos_usuario')->first();
            $EditGroup->items()->attach($item);
        }

        if ($dados['visualizar_permissoes']) {
            $item = Permitem::where('slug', 'visualizar_permissoes')->first();
            $EditGroup->items()->attach($item);
        }

        if ($dados['criar_perfil']) {
            $item = Permitem::where('slug', 'criar_perfil')->first();
            $EditGroup->items()->attach($item);
        }

        if ($dados['editar_perfil']) {
            $item = Permitem::where('slug', 'editar_perfil')->first();
            $EditGroup->items()->attach($item);
        }

        // Retornando os dados
        return [
            'message' => 'Perfil Alterado com Sucesso!',
            'status' => Response::HTTP_OK
        ];
    }

    public function id($id)
    {
        return [
            'data' => Permgroup::find($id),
            'status' => Response::HTTP_OK
        ];
    }

    public function getItemsForGroup($id)
    {
        return [
            'data' => Permgroup::find($id)->items,
            'status' => Response::HTTP_OK
        ];
    }

    public function getItemsForGroupUser($id)
    {
        $user = User::find($id);

        return [
            'data' => Permgroup::find($user->permgroup_id),
            'status' => Response::HTTP_OK
        ];
    }

}
