<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $farmsId     = Company::where('code', 'PPK-FARMS')->value('id');
        $fisheriesId = Company::where('code', 'PPK-FISHERIES')->value('id');

        if (!$farmsId || !$fisheriesId) {
            $this->command->warn('Companies not found. Run CompanySeeder first.');
            return;
        }

        $rows = [
            [
                'username'   => 'alice',
                'name'       => 'Alice Example',      // <- add name for default users table
                'full_name'  => 'Alice Example',
                'email'      => 'alice@ppk.local',
                'password'   => Hash::make('Passw0rd!'),
                'company_id' => $farmsId,
                'is_active'  => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'username'   => 'bob',
                'name'       => 'Bob Example',        // <- add name for default users table
                'full_name'  => 'Bob Example',
                'email'      => 'bob@ppk.local',
                'password'   => Hash::make('Passw0rd!'),
                'company_id' => $fisheriesId,
                'is_active'  => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        // Upsert keyed on username
        User::upsert($rows, ['username'], [
            'name', 'full_name', 'email', 'password', 'company_id', 'is_active', 'updated_at'
        ]);
    }
}
