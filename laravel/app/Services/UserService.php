<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class UserService
{
   public function getAll()
    {

        // ============= Buscar todos os usuários ===========
        $usuarios = UserResource::collection(User::where(function($query) {
                // ============= Se usuário não tem permissão, só traz o usuário dele  ===========
                if(!auth()->user()->hasPermission('visualizar_todos_usuario')) $query->where('id', auth()->user()->id);
            })->get());

        return [
            'data' => $usuarios,
            'status' => Response::HTTP_OK
        ];
    }

    public function update($request)
    {
        // ============= Verificar se usuário tem permissao para editar o proprio usuário ===========
        if(auth()->user()->id == $request->id && !auth()->user()->hasPermission('editar_proprio_usuario')){
            return ['message' => 'Usuário não tem permissão para editar o próprio usuário', 'usuario' => null, 'token' => null, 'status' => Response::HTTP_FORBIDDEN];
        }

        // ============= Verificar se usuário tem permissao para editar o proprio usuário ===========
        if(auth()->user()->id != $request->id && !auth()->user()->hasPermission('editar_outro_usuario')){
            return ['message' => 'Você não tem permissão para editar outro usuário', 'usuario' => null, 'token' => null, 'status' => Response::HTTP_FORBIDDEN];
        }

        // Buscando o Usuário
        $usuario = User::find($request->id);

        // Alterando as informações
        $usuario->user = $request->user;
        $usuario->name = $request->name;

        // Se passou a senha ela é alterada
        if($request->password) $usuario->password = Hash::make($request->password, ['rounds' => 12]);

        $usuario->permgroup_id = $request->perfil;

        // Salvando as informações
        $usuario->save();

        // Retornando os dados
        return [
            'message' => 'Usuário Alterado com Sucesso!',
            'usuario' => $usuario,
            'status' => Response::HTTP_OK
        ];
    }

    public function delete($id)
    {
        // ============= Verificar se é o mesmo usuário ===========
        if(auth()->user()->id == $id ){
            return ['message' => 'Não é possível deletar o próprio usuário', 'usuario' => null, 'token' => null, 'status' => Response::HTTP_FORBIDDEN];
        }

        // ============= Verificar se usuário tem permissao para deletar outro usuário ===========
        if(auth()->user()->id != $id && !auth()->user()->hasPermission('deletar_usuario')){
            return ['message' => 'Você não tem permissão para deletar outro usuário', 'usuario' => null, 'token' => null, 'status' => Response::HTTP_FORBIDDEN];
        }

        // Buscando o Usuário
        $usuario = User::find($id);

        // Deletando usuário
        $usuario->delete();

        // Retornando os dados
        return [
            'message' => 'Usuário Deletado com Sucesso!',
            'usuario' => $usuario,
            'status' => Response::HTTP_OK
        ];
    }


}
