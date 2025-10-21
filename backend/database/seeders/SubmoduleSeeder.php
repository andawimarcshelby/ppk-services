<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use App\Models\Module;
use App\Models\Submodule;

class SubmoduleSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // Resolve module IDs by code
        $byCode = fn($code) => Module::where('code', $code)->value('id');

        $OPS_PRODUCTION = $byCode('OPS_PRODUCTION');
        $OPS_INVENTORY  = $byCode('OPS_INVENTORY');
        $OPS_LOGISTICS  = $byCode('OPS_LOGISTICS');
        $ADMIN_USERS    = $byCode('ADMIN_USERS');
        $ADMIN_ROLES    = $byCode('ADMIN_ROLES');
        $ADMIN_AUDIT    = $byCode('ADMIN_AUDIT');

        if (!$OPS_PRODUCTION || !$OPS_INVENTORY || !$OPS_LOGISTICS || !$ADMIN_USERS || !$ADMIN_ROLES || !$ADMIN_AUDIT) {
            $this->command->warn('Some modules missing. Run ModuleSeeder first.');
            return;
        }

        $rows = [
            // OPS_PRODUCTION
            [
                'module_id'  => $OPS_PRODUCTION,
                'name'       => 'Schedules',
                'code'       => 'OPS_PROD_SCHEDULES',
                'route'      => '/ops/production/schedules',
                'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'module_id'  => $OPS_PRODUCTION,
                'name'       => 'Reports',
                'code'       => 'OPS_PROD_REPORTS',
                'route'      => '/ops/production/reports',
                'created_at' => $now, 'updated_at' => $now,
            ],

            // OPS_INVENTORY
            [
                'module_id'  => $OPS_INVENTORY,
                'name'       => 'Stocks',
                'code'       => 'OPS_INV_STOCKS',
                'route'      => '/ops/inventory/stocks',
                'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'module_id'  => $OPS_INVENTORY,
                'name'       => 'Movements',
                'code'       => 'OPS_INV_MOVEMENTS',
                'route'      => '/ops/inventory/movements',
                'created_at' => $now, 'updated_at' => $now,
            ],

            // OPS_LOGISTICS
            [
                'module_id'  => $OPS_LOGISTICS,
                'name'       => 'Dispatch',
                'code'       => 'OPS_LOG_DISPATCH',
                'route'      => '/ops/logistics/dispatch',
                'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'module_id'  => $OPS_LOGISTICS,
                'name'       => 'Deliveries',
                'code'       => 'OPS_LOG_DELIVERIES',
                'route'      => '/ops/logistics/deliveries',
                'created_at' => $now, 'updated_at' => $now,
            ],

            // ADMIN_USERS
            [
                'module_id'  => $ADMIN_USERS,
                'name'       => 'Users',
                'code'       => 'ADMIN_USERS_LIST',
                'route'      => '/admin/users',
                'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'module_id'  => $ADMIN_USERS,
                'name'       => 'Permissions',
                'code'       => 'ADMIN_USERS_PERMS',
                'route'      => '/admin/users/permissions',
                'created_at' => $now, 'updated_at' => $now,
            ],

            // ADMIN_ROLES
            [
                'module_id'  => $ADMIN_ROLES,
                'name'       => 'Roles',
                'code'       => 'ADMIN_ROLES_LIST',
                'route'      => '/admin/roles',
                'created_at' => $now, 'updated_at' => $now,
            ],
            [
                'module_id'  => $ADMIN_ROLES,
                'name'       => 'Role Assignments',
                'code'       => 'ADMIN_ROLES_ASSIGN',
                'route'      => '/admin/roles/assignments',
                'created_at' => $now, 'updated_at' => $now,
            ],

            // ADMIN_AUDIT
            [
                'module_id'  => $ADMIN_AUDIT,
                'name'       => 'Audit Trail',
                'code'       => 'ADMIN_AUDIT_TRAIL',
                'route'      => '/admin/audit',
                'created_at' => $now, 'updated_at' => $now,
            ],
        ];

        // Upsert by unique code so re-running is safe
        Submodule::upsert($rows, ['code'], ['module_id','name','route','updated_at']);
    }
}
