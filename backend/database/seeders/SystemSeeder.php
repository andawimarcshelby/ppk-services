<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\System;
use Illuminate\Support\Carbon;

class SystemSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        System::upsert([
            [
                'name'       => 'Operations',
                'code'       => 'OPS',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name'       => 'Admin',
                'code'       => 'ADMIN',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['code'], ['name', 'updated_at']);
    }
}
