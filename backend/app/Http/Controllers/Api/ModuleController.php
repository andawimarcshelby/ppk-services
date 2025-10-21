<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModuleController extends Controller
{
    /**
     * GET /api/modules
     * Returns: [
     *   {
     *     "system_id": 1,
     *     "system_name": "Admin",
     *     "modules": [
     *       {
     *         "module_id": 10,
     *         "module_name": "User Management",
     *         "submodules": [{ "id": 100, "name": "Users", "route": "/admin/users" }]
     *       }
     *     ]
     *   }
     * ]
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Get submodule IDs permitted for this user
        $permSubIds = $user->submodules()->pluck('submodules.id');

        if ($permSubIds->isEmpty()) {
            return response()->json([]); // user has no permissions
        }

        // Pull the rows we need in one query then group in PHP
        $rows = DB::table('systems as sys')
            ->join('modules as mod', 'mod.system_id', '=', 'sys.id')
            ->join('submodules as sm', 'sm.module_id', '=', 'mod.id')
            ->whereIn('sm.id', $permSubIds)
            ->orderBy('sys.name')
            ->orderBy('mod.name')
            ->orderBy('sm.name')
            ->get([
                'sys.id  as system_id',
                'sys.name as system_name',
                'mod.id  as module_id',
                'mod.name as module_name',
                'sm.id   as submodule_id',
                'sm.name as submodule_name',
                'sm.route as submodule_route',
            ]);

        // Build hierarchical structure
        $systems = [];
        foreach ($rows as $r) {
            if (!isset($systems[$r->system_id])) {
                $systems[$r->system_id] = [
                    'system_id'   => (int)$r->system_id,
                    'system_name' => $r->system_name,
                    'modules'     => [],
                ];
            }

            // Ensure module exists under system
            if (!isset($systems[$r->system_id]['modules'][$r->module_id])) {
                $systems[$r->system_id]['modules'][$r->module_id] = [
                    'module_id'   => (int)$r->module_id,
                    'module_name' => $r->module_name,
                    'submodules'  => [],
                ];
            }

            // Push submodule
            $systems[$r->system_id]['modules'][$r->module_id]['submodules'][] = [
                'id'    => (int)$r->submodule_id,
                'name'  => $r->submodule_name,
                'route' => $r->submodule_route,
            ];
        }

        // Re-index modules arrays (remove associative keys)
        $result = array_map(function ($sys) {
            $sys['modules'] = array_values($sys['modules']);
            return $sys;
        }, array_values($systems));

        return response()->json($result);
    }
}
