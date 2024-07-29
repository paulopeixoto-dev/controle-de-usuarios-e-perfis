<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }
    public function login(AuthLoginRequest $request)
    {
        $res = $this->authService->login($request); // Autenticação
        return response()->json($res, $res['status']); // Retornando resposta
    }

    public function register(AuthRegisterRequest $request)
    {
        $res = $this->authService->register($request); // Cadastro
        return response()->json($res, $res['status']); // Retornando resposta
    }
    public function validateToken()
    {
        $res = $this->authService->validateToken(); // Valida Token
        return response()->json($res, $res['status']); // Retornando resposta
    }
    public function logout(Request $request)
    {
        $res = $this->authService->logout($request); // Consulta para realizar invalidação do token
        return response()->json($res, $res['status']); // Retornando resposta
    }
}
