<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function login($request)
    {
        // 1º Passo -> Pegando credenciais
        $token = JWTAuth::attempt([
            'user' => $request->user,
            'password' => $request->password
        ]);

        // 2º Passo -> Autenticando e gerando token
        if ($token) {
            return [
                'message' => 'Autenticação realizada com sucesso!',
                'usuario' => new UserResource(auth()->user()),
                'token' => $token,
                'status' => Response::HTTP_OK
            ];
        }

        // Retornando caso usuário não seja encontrado
        return ['message' => 'Usuário ou senha inválidos!', 'usuario' => null, 'token' => null, 'status' => Response::HTTP_FORBIDDEN];
    }

    public function register($request)
    {
        //1° Passo -> Salvar o usuário gerando o Hash password
        $dados = $request->all();
        $dados['password'] = Hash::make($dados['password'], ['rounds' => 12]);
        $dados['permgroup_id'] = 2; //Por padrão o usuário já começa nesse grupo
        if(isset($dados['perfil'])){
            $dados['permgroup_id'] = $dados['perfil'];
        }
        $newUser = User::create($dados);

        // 2° Passo -> Efetuar o login com o usuário cadastrado
        $token = JWTAuth::attempt([
            'user' => $request->user,
            'password' => $request->password
        ]);

        if ($token) {
            return [
                'message' => 'Usuário cadastrado com sucesso!',
                'usuario' => auth()->user(),
                'token' => $token,
                'status' => Response::HTTP_OK
            ];
        }

        // Retornando caso de erro
        return ['message' => 'Usuário não foi cadastrado!', 'usuario' => null, 'token' => null, 'status' => Response::HTTP_FORBIDDEN];
    }

    public function logout($request)
    {
        Auth::logout();

        return ['message' => 'Logout realizado com sucesso!', 'status' => Response::HTTP_OK];
    }

    public function validateToken()
    {
        return [
            'message' => 'O Token está válido!',
            'usuario' => auth()->user(),
            'status' => Response::HTTP_OK
        ];
    }

}
