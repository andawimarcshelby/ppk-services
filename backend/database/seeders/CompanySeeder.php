<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use Illuminate\Support\Carbon;

class CompanySeeder extends Seeder
{
    /**
     * Seed the application's companies table.
     */
    public function run(): void
    {
        $now = Carbon::now();

        // Idempotent insert/update by unique "code"
        Company::upsert([
            [
                'name'          => 'PPK Farms',
                'code'          => 'PPK-FARMS',
                'primary_color' => '#1E5128', // palette primary
                'accent_color'  => '#D8E9A8', // palette accent
                'logo_url'      => null,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
            [
                'name'          => 'PPK Fisheries',
                'code'          => 'PPK-FISHERIES',
                'primary_color' => '#1E5128',
                'accent_color'  => '#D8E9A8',
                'logo_url'      => null,
                'created_at'    => $now,
                'updated_at'    => $now,
            ],
        ], ['code'], ['name', 'primary_color', 'accent_color', 'logo_url', 'updated_at']);
    }
}
