<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CompanySeeder::class,
            UserSeeder::class,
            SystemSeeder::class,
            ModuleSeeder::class,
            SubmoduleSeeder::class,
            UserSubmoduleSeeder::class,
        ]);
    }
}
