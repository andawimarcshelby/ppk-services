<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Submodule;

class UserSubmoduleSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $aliceId = User::where('username', 'alice')->value('id');
        $bobId   = User::where('username', 'bob')->value('id');

        if (!$aliceId || !$bobId) {
            $this->command->warn('Users not found. Run UserSeeder first.');
            return;
        }

        // Helper to resolve submodule id by code
        $sid = fn (string $code) => Submodule::where('code', $code)->value('id');

        // Submodules we’ll grant
        $permCodesAlice = [
            'OPS_PROD_SCHEDULES',   // Ops → Production → Schedules
            'OPS_PROD_REPORTS',     // Ops → Production → Reports
            'ADMIN_USERS_LIST',     // Admin → User Management → Users
        ];

        $permCodesBob = [
            'OPS_INV_STOCKS',       // Ops → Inventory → Stocks
            'OPS_LOG_DELIVERIES',   // Ops → Logistics → Deliveries
            'ADMIN_USERS_LIST',     // Admin → User Management → Users
        ];

        $rows = [];

        foreach ($permCodesAlice as $code) {
            $subId = $sid($code);
            if ($subId) {
                $rows[] = [
                    'user_id'       => $aliceId,
                    'submodule_id'  => $subId,
                    'granted_at'    => $now,
                    'created_by'    => null,
                ];
            }
        }

        foreach ($permCodesBob as $code) {
            $subId = $sid($code);
            if ($subId) {
                $rows[] = [
                    'user_id'       => $bobId,
                    'submodule_id'  => $subId,
                    'granted_at'    => $now,
                    'created_by'    => null,
                ];
            }
        }

        if (empty($rows)) {
            $this->command->warn('No submodules resolved. Run SubmoduleSeeder first.');
            return;
        }

        // Idempotent write on composite key (user_id, submodule_id)
        DB::table('user_submodule')->upsert(
            $rows,
            ['user_id', 'submodule_id'],
            ['granted_at', 'created_by']
        );
    }
}
