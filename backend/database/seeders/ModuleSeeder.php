<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\System;
use App\Models\Module;
use Illuminate\Support\Carbon;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $opsId   = System::where('code', 'OPS')->value('id');
        $adminId = System::where('code', 'ADMIN')->value('id');

        if (!$opsId || !$adminId) {
            $this->command->warn('Systems not found. Run SystemSeeder first.');
            return;
        }

        $rows = [
            // OPS
            [
                'system_id'   => $opsId,
                'name'        => 'Production',
                'code'        => 'OPS_PRODUCTION',
                'icon'        => 'ri:settings-3-line',
                'created_at'  => $now,
                'updated_at'  => $now,
            ],
            [
                'system_id'   => $opsId,
                'name'        => 'Inventory',
                'code'        => 'OPS_INVENTORY',
                'icon'        => 'ri:archive-2-line',
                'created_at'  => $now,
                'updated_at'  => $now,
            ],
            [
                'system_id'   => $opsId,
                'name'        => 'Logistics',
                'code'        => 'OPS_LOGISTICS',
                'icon'        => 'ri:truck-line',
                'created_at'  => $now,
                'updated_at'  => $now,
            ],

            // ADMIN
            [
                'system_id'   => $adminId,
                'name'        => 'User Management',
                'code'        => 'ADMIN_USERS',
                'icon'        => 'ri:user-settings-line',
                'created_at'  => $now,
                'updated_at'  => $now,
            ],
            [
                'system_id'   => $adminId,
                'name'        => 'Roles',
                'code'        => 'ADMIN_ROLES',
                'icon'        => 'ri:key-2-line',
                'created_at'  => $now,
                'updated_at'  => $now,
            ],
            [
                'system_id'   => $adminId,
                'name'        => 'Audit Logs',
                'code'        => 'ADMIN_AUDIT',
                'icon'        => 'ri:file-list-2-line',
                'created_at'  => $now,
                'updated_at'  => $now,
            ],
        ];

        // Idempotent: unique by code; update name/icon on re-run
        Module::upsert($rows, ['code'], ['system_id','name','icon','updated_at']);
    }
}
