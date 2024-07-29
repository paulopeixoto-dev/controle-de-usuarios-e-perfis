<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserUpdateRequest;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function getAll()
    {
        $res = $this->userService->getAll(); // Buscar usuários
        return response()->json($res, $res['status']); // Retornando resposta
    }

    public function update(UserUpdateRequest $request)
    {
        $res = $this->userService->update($request); // Buscar usuários
        return response()->json($res, $res['status']); // Retornando resposta
    }

    public function delete($id)
    {
        $res = $this->userService->delete($id); // Metódo responsável por deletar usuário
        return response()->json($res, $res['status']);
    }

}
