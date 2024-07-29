<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Permgroup\PermgroupInsertRequest;
use App\Http\Resources\PermgroupResource;
use Illuminate\Http\Request;

use App\Models\Permgroup;
use App\Models\Permitem;
use App\Models\User;

use App\Services\PermgroupService;

use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
class PermgroupController extends Controller
{

    protected $permgroupService;

    public function __construct(PermgroupService $permgroupService)
    {
        $this->permgroupService = $permgroupService;
    }

    public function index(Request $request){
        return PermgroupResource::collection(Permgroup::withCount('users')->get());
    }

    public function insert(PermgroupInsertRequest $request){

        $res = $this->permgroupService->insert($request); // Criar Permissão
        return response()->json($res, $res['status']); // Retornando resposta

    }

    public function update(PermgroupInsertRequest $request, $id){

        $res = $this->permgroupService->update($request, $id); // Editar Permissão
        return response()->json($res, $res['status']); // Retornando resposta

    }

    public function id($id){

        $res = $this->permgroupService->id($id); // Buscar Permissão
        return response()->json($res, $res['status']); // Retornando resposta

    }

    public function getItemsForGroup($id){

        $res = $this->permgroupService->getItemsForGroup($id);
        return response()->json($res, $res['status']); // Retornando resposta

    }

    public function getItemsForGroupUser($id){

        $res = $this->permgroupService->getItemsForGroupUser($id);
        return response()->json($res, $res['status']); // Retornando resposta

    }

}
