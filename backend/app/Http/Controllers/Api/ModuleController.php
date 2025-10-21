<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserSubmodule;
use App\Models\Submodule;

class ModuleController extends Controller
{
    /**
     * Return systems → modules → submodules the current user can access.
     * If the token is missing/invalid, return 401 so the frontend can
     * clear local storage and redirect to login.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // IDs of submodules granted to this user
        $allowedSubmoduleIds = UserSubmodule::where('user_id', $user->id)->pluck('submodule_id');

        // Load submodules with their module & system relationships
        $subs = Submodule::with(['module.system'])
            ->whereIn('id', $allowedSubmoduleIds)
            ->orderBy('id')
            ->get();

        // Build systems → modules → submodules shape
        $bySystem = [];
        foreach ($subs as $sm) {
            $sys = $sm->module->system;
            $mod = $sm->module;

            if (!isset($bySystem[$sys->id])) {
                $bySystem[$sys->id] = [
                    'system_id'   => $sys->id,
                    'system_name' => $sys->name,
                    'modules'     => [],
                ];
            }

            // find or create module bucket inside the system
            $modulesArr =& $bySystem[$sys->id]['modules'];
            $modIndex = null;
            foreach ($modulesArr as $idx => $m) {
                if ($m['module_id'] === $mod->id) { $modIndex = $idx; break; }
            }
            if ($modIndex === null) {
                $modulesArr[] = [
                    'module_id'   => $mod->id,
                    'module_name' => $mod->name,
                    'submodules'  => [],
                ];
                $modIndex = array_key_last($modulesArr);
            }

            // push submodule
            $modulesArr[$modIndex]['submodules'][] = [
                'id'    => $sm->id,
                'name'  => $sm->name,
                'route' => $sm->route ?? null,
            ];
        }

        return response()->json(array_values($bySystem));
    }
}
